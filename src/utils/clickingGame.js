import { useCallback, useEffect, useState } from "react";
import { stripUnsafeText } from "./textSanitize";

export const CLICKERZ_SCORE_KEY = "clickerz-clicking-game-score";
export const CLICKERZ_LEADERBOARD_KEY = "clickerz-clicking-game-leaderboard";
export const CLICKERZ_SCORE_EVENT = "clickerz-clicking-game-score-change";
export const CLICKERZ_LEADERBOARD_ENDPOINT = "/api/clicking-leaderboard";

const MAX_LEADERBOARD_ENTRIES = 25;
const MAX_SCORE = 1_000_000_000;

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
  return new Date(time).toISOString();
}

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function parseStoredNumber(value) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function readJson(key, fallback) {
  if (!canUseStorage()) return fallback;

  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

const clickCountFormatter = new Intl.NumberFormat("en-US");

export function formatClickCount(value) {
  return clickCountFormatter.format(value ?? 0);
}

export function readClickScore() {
  if (!canUseStorage()) return 0;
  return parseStoredNumber(window.localStorage.getItem(CLICKERZ_SCORE_KEY));
}

export function writeClickScore(score) {
  const safeScore = Math.max(0, Math.round(Number(score) || 0));

  if (canUseStorage()) {
    window.localStorage.setItem(CLICKERZ_SCORE_KEY, String(safeScore));
    window.dispatchEvent(new CustomEvent(CLICKERZ_SCORE_EVENT, { detail: safeScore }));
  }

  return safeScore;
}

export function addClickScore(amount = 1) {
  return writeClickScore(readClickScore() + amount);
}

export function readClickLeaderboard() {
  return normalizeLeaderboardRows(readJson(CLICKERZ_LEADERBOARD_KEY, []));
}

function normalizeLeaderboardRows(rows) {
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

export async function fetchSharedClickLeaderboard() {
  try {
    const res = await fetch(CLICKERZ_LEADERBOARD_ENDPOINT, { method: "GET" });
    if (!res.ok) throw new Error("Could not load shared leaderboard.");

    const payload = await res.json();
    const rows = normalizeLeaderboardRows(payload?.rows);
    writeJson(CLICKERZ_LEADERBOARD_KEY, rows);
    return rows;
  } catch {
    return readClickLeaderboard();
  }
}

export async function saveClickLeaderboardEntry(name, score) {
  const trimmedName = sanitizeName(name);
  const safeScore = sanitizeScore(score);
  if (safeScore === null || safeScore < 1) {
    throw new Error("Score must be a positive number.");
  }
  const res = await fetch(CLICKERZ_LEADERBOARD_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: trimmedName,
      score: safeScore,
    }),
  });

  if (!res.ok) throw new Error("Could not save score to shared leaderboard.");

  const payload = await res.json();
  const nextRows = normalizeLeaderboardRows(payload?.rows);
  writeJson(CLICKERZ_LEADERBOARD_KEY, nextRows);
  return nextRows;
}

export function useClickerzScore() {
  const [score, setScore] = useState(readClickScore);

  useEffect(() => {
    const handleScoreChange = (event) => {
      setScore(typeof event.detail === "number" ? event.detail : readClickScore());
    };
    const handleStorageChange = (event) => {
      if (event.key === CLICKERZ_SCORE_KEY) setScore(readClickScore());
    };

    window.addEventListener(CLICKERZ_SCORE_EVENT, handleScoreChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener(CLICKERZ_SCORE_EVENT, handleScoreChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const addScore = useCallback((amount = 1) => addClickScore(amount), []);

  return { score, addScore };
}
