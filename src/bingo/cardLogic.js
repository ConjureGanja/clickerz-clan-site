// ─────────────────────────────────────────────────────────────
// Pure card helpers — no React, no DOM.
//
// Keeping the rules here (instead of inside the component) is like keeping
// the drop table separate from the boss fight: you can change how loot is
// rolled without touching the combat code, and each part is easy to test.
// ─────────────────────────────────────────────────────────────

import { DEFAULT_TARGETS, DEFAULT_TASK_IDS, TASKS, TASK_BY_ID } from "./tasks";

export const ALL_TIERS = { low: true, mid: true, high: true };

/** A fresh tile for a task. `title`/`hint` stay empty unless someone renames the tile. */
export function makeTile(taskId) {
  return { taskId, title: "", hint: "", target: DEFAULT_TARGETS[taskId] || 1, count: 0 };
}

export function defaultCard() {
  return { name: "Clickerz Clan Bingo", cols: 6, rows: 4, tiles: DEFAULT_TASK_IDS.map(makeTile) };
}

export function cloneCard(card) {
  return { ...card, tiles: card.tiles.map((tile) => ({ ...tile })) };
}

export const isDone = (tile) => tile.count >= tile.target;

/**
 * Fisher–Yates shuffle. Like dealing a properly shuffled deck:
 * every order is equally likely (a naive sort(() => Math.random() - 0.5) is not).
 */
export function shuffled(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Pick `count` task ids from the allowed tiers, skipping ids in `avoid` when possible.
 * If the filtered pool is too small, repeats are allowed so the card always fills.
 */
export function randomTaskIds(count, tiers = ALL_TIERS, avoid = []) {
  if (count <= 0) return [];
  let pool = TASKS.filter((task) => tiers[task.tier]);
  if (!pool.length) pool = TASKS;
  const fresh = shuffled(pool.filter((task) => !avoid.includes(task.id)));
  const ids = fresh.slice(0, count).map((task) => task.id);
  while (ids.length < count) ids.push(pool[Math.floor(Math.random() * pool.length)].id);
  return ids;
}

/** Resize a card, keeping existing tiles in order and rolling new ones for any extra slots. */
export function resizeCard(card, cols, rows, tiers) {
  const size = cols * rows;
  const kept = card.tiles.slice(0, size);
  const extra = randomTaskIds(size - kept.length, tiers, kept.map((tile) => tile.taskId)).map(makeTile);
  return { ...card, cols, rows, tiles: [...kept, ...extra] };
}

/**
 * Find completed rows, columns and (on square cards) diagonals.
 * Returns how many lines are finished and a Set of tile indexes that belong to one.
 */
export function completedLines(card) {
  const { cols, rows, tiles } = card;
  const lines = [];
  for (let r = 0; r < rows; r += 1) lines.push(Array.from({ length: cols }, (_, c) => r * cols + c));
  for (let c = 0; c < cols; c += 1) lines.push(Array.from({ length: rows }, (_, r) => r * cols + c));
  if (cols === rows) {
    lines.push(Array.from({ length: cols }, (_, k) => k * cols + k));
    lines.push(Array.from({ length: cols }, (_, k) => k * cols + (cols - 1 - k)));
  }
  const hit = new Set();
  let count = 0;
  for (const line of lines) {
    if (line.every((i) => tiles[i] && isDone(tiles[i]))) {
      count += 1;
      line.forEach((i) => hit.add(i));
    }
  }
  return { count, hit };
}

// ── Share codes ──────────────────────────────────────────────
// A share code is the card squeezed into URL-safe base64 — like a RuneLite
// loadout string you can paste anywhere. Short keys keep links small.

function toBase64Url(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  bytes.forEach((b) => { binary += String.fromCharCode(b); });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(code) {
  const b64 = code.trim().replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(b64 + "===".slice((b64.length + 3) % 4));
  return new TextDecoder().decode(Uint8Array.from(binary, (ch) => ch.charCodeAt(0)));
}

export function encodeCard(card) {
  const compact = {
    n: card.name,
    c: card.cols,
    r: card.rows,
    t: card.tiles.map((tile) => [tile.taskId, tile.count, tile.target, tile.title || "", tile.hint || ""]),
  };
  return toBase64Url(JSON.stringify(compact));
}

/**
 * Decode a share code. Everything is clamped and validated, because a code
 * is untrusted text someone pasted — never assume it's well formed.
 */
export function decodeCard(code) {
  const data = JSON.parse(fromBase64Url(code));
  if (!data || !Array.isArray(data.t)) throw new Error("Not a bingo card code");
  const cols = clampInt(data.c, 2, 8);
  const rows = clampInt(data.r, 2, 8);
  const tiles = data.t.slice(0, cols * rows).map((entry) => {
    const [taskId, count, target, title, hint] = Array.isArray(entry) ? entry : [];
    const safeTarget = clampInt(target, 1, 999);
    return {
      taskId: TASK_BY_ID[taskId] ? taskId : TASKS[0].id,
      count: clampInt(count, 0, safeTarget),
      target: safeTarget,
      title: String(title || "").slice(0, 40),
      hint: String(hint || "").slice(0, 60),
    };
  });
  const card = { name: String(data.n || "Shared Bingo").slice(0, 60), cols, rows, tiles };
  // Pad a short code so the grid is never missing tiles.
  return tiles.length < cols * rows ? resizeCard({ ...card, cols: 0, rows: 0 }, cols, rows, ALL_TIERS) : card;
}

/** Keep a stored or decoded card in a shape the UI can trust. */
export function normalizeCard(card) {
  if (!card || !Array.isArray(card.tiles) || !card.cols || !card.rows) return null;
  try {
    return decodeCard(encodeCard(card));
  } catch {
    return null;
  }
}

function clampInt(value, min, max) {
  const n = Number.parseInt(value, 10);
  if (Number.isNaN(n)) return min;
  return Math.min(max, Math.max(min, n));
}
