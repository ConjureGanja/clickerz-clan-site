// Browser storage for the bingo tool — same pattern as the POH planner.
// localStorage is like a bank booth: usually open, but sometimes closed
// (private windows, blocked storage). Reads never throw; writes report failure.

import { stripUnsafeText } from "../utils/textSanitize.js";
import { normalizeCard } from "./cardLogic";

const KEY = "clickerz-bingo-v1";
const MAX_VERSIONS = 24;
const MAX_STORE_CHARS = 1_500_000;

function cleanVersions(versions) {
  if (!Array.isArray(versions)) return [];
  const seen = new Set();
  const cleaned = [];
  for (const version of versions.slice(-80)) {
    const card = normalizeCard(version?.card);
    if (!card || typeof version?.id !== "string") continue;
    let id = stripUnsafeText(version.id).trim().slice(0, 64);
    if (!id || seen.has(id)) id = `v-${cleaned.length}`;
    while (seen.has(id)) id = `${id}-x`;
    seen.add(id);
    cleaned.push({
      id,
      name: stripUnsafeText(version.name || card.name || "Saved card").trim().slice(0, 60) || "Saved card",
      savedAt: Number.isFinite(Number(version.savedAt)) ? Number(version.savedAt) : 0,
      card,
    });
  }
  return cleaned
    .sort((a, b) => a.savedAt - b.savedAt)
    .slice(-MAX_VERSIONS);
}

export function readStore() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw || raw.length > MAX_STORE_CHARS) return null;
    const parsed = JSON.parse(raw);
    const card = normalizeCard(parsed?.card);
    if (!card) return null;
    const versions = cleanVersions(parsed.versions);
    const activeVersion = versions.some((v) => v.id === parsed.activeVersion) ? parsed.activeVersion : null;
    return { card, versions, activeVersion };
  } catch {
    return null;
  }
}

/** Returns false when storage is unavailable so the UI can say so. */
export function writeStore(store) {
  try {
    const versions = Array.isArray(store?.versions) ? store.versions.slice(-MAX_VERSIONS) : [];
    const payload = JSON.stringify({ ...store, versions });
    if (payload.length > MAX_STORE_CHARS) return false;
    localStorage.setItem(KEY, payload);
    return true;
  } catch {
    return false;
  }
}
