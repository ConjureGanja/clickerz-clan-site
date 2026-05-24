import { useCallback, useEffect, useState } from "react";

export const CLICKERZ_SCORE_KEY = "clickerz-clicking-game-score";
export const CLICKERZ_LEADERBOARD_KEY = "clickerz-clicking-game-leaderboard";
export const CLICKERZ_SCORE_EVENT = "clickerz-clicking-game-score-change";
export const CLICKERZ_AUDIO_SRC = "/audio/clickerz-clicking-game.mp3";

const MAX_LEADERBOARD_ENTRIES = 25;

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

export function formatClickCount(value) {
  return new Intl.NumberFormat("en-US").format(value ?? 0);
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
  const rows = readJson(CLICKERZ_LEADERBOARD_KEY, []);

  if (!Array.isArray(rows)) return [];

  return rows
    .filter((row) => row && typeof row.name === "string" && Number.isFinite(row.score))
    .map((row) => ({
      id: String(row.id || `${row.name}-${row.score}`),
      name: row.name.slice(0, 24),
      score: Math.max(0, Math.round(row.score)),
      date: row.date || new Date().toISOString(),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_LEADERBOARD_ENTRIES);
}

export function saveClickLeaderboardEntry(name, score) {
  const trimmedName = name.trim().slice(0, 24) || "Anonymous Clicker";
  const newEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    name: trimmedName,
    score: Math.max(0, Math.round(Number(score) || 0)),
    date: new Date().toISOString(),
  };
  const nextRows = [...readClickLeaderboard(), newEntry]
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_LEADERBOARD_ENTRIES);

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
