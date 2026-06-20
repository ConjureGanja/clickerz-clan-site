const LEADERBOARD_KEY = "clickerz-clicking-game-leaderboard";
const MAX_LEADERBOARD_ENTRIES = 25;

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function normalizeRows(rows) {
  if (!Array.isArray(rows)) return [];

  return rows
    .filter((row) => row && typeof row.name === "string" && Number.isFinite(row.score))
    .map((row) => ({
      id: String(row.id || `${row.name}-${row.score}`),
      name: row.name.trim().slice(0, 24) || "Anonymous Clicker",
      score: Math.max(0, Math.round(row.score)),
      date: row.date || new Date().toISOString(),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_LEADERBOARD_ENTRIES);
}

async function readLeaderboard(env) {
  const stored = await env.CLICKERZ_LEADERBOARD?.get(LEADERBOARD_KEY, "json");
  return normalizeRows(stored);
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

export async function onRequestGet(context) {
  const missing = bindingMissing(context.env);
  if (missing) return missing;

  const rows = await readLeaderboard(context.env);
  return jsonResponse({ rows });
}

export async function onRequestPost(context) {
  const missing = bindingMissing(context.env);
  if (missing) return missing;

  let body;
  try {
    body = await context.request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body." }, 400);
  }

  const name = String(body?.name || "").trim().slice(0, 24) || "Anonymous Clicker";
  const score = Math.max(0, Math.round(Number(body?.score) || 0));

  if (!Number.isFinite(score)) {
    return jsonResponse({ error: "Invalid score." }, 400);
  }

  const rows = await readLeaderboard(context.env);
  const nextRows = normalizeRows([
    ...rows,
    {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name,
      score,
      date: new Date().toISOString(),
    },
  ]);

  await writeLeaderboard(context.env, nextRows);
  return jsonResponse({ rows: nextRows });
}
