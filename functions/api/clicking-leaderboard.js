import { stripUnsafeText } from "../../src/utils/textSanitize.js";

const LEADERBOARD_KEY = "clickerz-clicking-game-leaderboard";
const MAX_LEADERBOARD_ENTRIES = 25;
const MAX_SCORE = 1_000_000_000;
const MAX_BODY_BYTES = 2048;
const MIN_SUBMIT_INTERVAL_MS = 8000;
const RATE_LIMIT_TTL_SECONDS = 60;

const SECURITY_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: SECURITY_HEADERS,
  });
}

function sanitizeName(value) {
  const cleaned = stripUnsafeText(value).trim().slice(0, 24);
  return cleaned || "Anonymous Clicker";
}

function sanitizeScore(value) {
  const score = Number(value);
  if (!Number.isFinite(score)) return null;
  return Math.max(0, Math.min(MAX_SCORE, Math.round(score)));
}

function sanitizeDate(value) {
  if (typeof value !== "string" || value.length > 40) return null;
  const time = Date.parse(value);
  if (!Number.isFinite(time)) return null;
  const now = Date.now();
  if (time > now + 86_400_000 || time < Date.UTC(2024, 0, 1)) return null;
  return new Date(time).toISOString();
}

export function normalizeLeaderboardRows(rows) {
  if (!Array.isArray(rows)) return [];

  const seenIds = new Set();
  const cleaned = [];

  for (const row of rows) {
    if (!row || typeof row !== "object") continue;
    const score = sanitizeScore(row.score);
    if (score === null || score < 1) continue;

    const name = sanitizeName(row.name);
    let id = stripUnsafeText(row.id).trim().slice(0, 64);
    if (!id || seenIds.has(id)) id = `row-${seenIds.size}-${score}`;
    while (seenIds.has(id)) id = `${id}-x`;
    seenIds.add(id);

    cleaned.push({
      id,
      name,
      score,
      date: sanitizeDate(row.date),
    });
  }

  return cleaned
    .sort((a, b) => b.score - a.score || String(b.date || "").localeCompare(String(a.date || "")))
    .slice(0, MAX_LEADERBOARD_ENTRIES);
}

async function readLeaderboard(env) {
  const stored = await env.CLICKERZ_LEADERBOARD?.get(LEADERBOARD_KEY, "json");
  return normalizeLeaderboardRows(stored);
}

async function writeLeaderboard(env, rows) {
  await env.CLICKERZ_LEADERBOARD.put(LEADERBOARD_KEY, JSON.stringify(rows));
}

function bindingMissing(env) {
  if (env.CLICKERZ_LEADERBOARD) return null;
  return jsonResponse(
    { error: "Missing CLICKERZ_LEADERBOARD binding." },
    503,
  );
}

function clientKey(request) {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  return `clickerz-click-rate:${ip.slice(0, 64)}`;
}

async function rateLimited(env, request) {
  const key = clientKey(request);
  const previous = Number(await env.CLICKERZ_LEADERBOARD.get(key));
  const now = Date.now();
  if (Number.isFinite(previous) && now - previous < MIN_SUBMIT_INTERVAL_MS) return true;
  await env.CLICKERZ_LEADERBOARD.put(key, String(now), { expirationTtl: RATE_LIMIT_TTL_SECONDS });
  return false;
}

export async function onRequestGet(context) {
  const missing = bindingMissing(context.env);
  if (missing) return missing;

  try {
    const rows = await readLeaderboard(context.env);
    return jsonResponse({ rows });
  } catch {
    return jsonResponse({ error: "Could not load leaderboard." }, 500);
  }
}

export async function onRequestPost(context) {
  const missing = bindingMissing(context.env);
  if (missing) return missing;

  const type = context.request.headers.get("content-type") || "";
  if (!type.toLowerCase().includes("application/json")) {
    return jsonResponse({ error: "Expected application/json." }, 415);
  }

  const lengthHeader = Number(context.request.headers.get("content-length"));
  if (Number.isFinite(lengthHeader) && lengthHeader > MAX_BODY_BYTES) {
    return jsonResponse({ error: "Request body is too large." }, 413);
  }

  let raw = "";
  try {
    raw = await context.request.text();
  } catch {
    return jsonResponse({ error: "Could not read request body." }, 400);
  }
  if (raw.length > MAX_BODY_BYTES) {
    return jsonResponse({ error: "Request body is too large." }, 413);
  }

  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return jsonResponse({ error: "Invalid JSON body." }, 400);
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return jsonResponse({ error: "Score payload must be an object." }, 400);
  }

  const name = sanitizeName(body.name);
  const score = sanitizeScore(body.score);
  if (score === null || score < 1) {
    return jsonResponse({ error: "Score must be a positive number." }, 400);
  }

  try {
    if (await rateLimited(context.env, context.request)) {
      return jsonResponse({ error: "Please wait a few seconds before submitting again." }, 429);
    }

    const rows = await readLeaderboard(context.env);
    const nextRows = normalizeLeaderboardRows([
      ...rows,
      {
        id: crypto.randomUUID(),
        name,
        score,
        date: new Date().toISOString(),
      },
    ]);

    await writeLeaderboard(context.env, nextRows);
    return jsonResponse({ rows: nextRows });
  } catch {
    return jsonResponse({ error: "Could not save score." }, 500);
  }
}
