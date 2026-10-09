// Browser storage for the bingo tool — same pattern as the POH planner.
// localStorage is like a bank booth: usually open, but sometimes closed
// (private windows, blocked storage). Reads never throw; writes report failure.

import { normalizeCard } from "./cardLogic";

const KEY = "clickerz-bingo-v1";

export function readStore() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const card = normalizeCard(parsed?.card);
    if (!card) return null;
    const versions = Array.isArray(parsed.versions)
      ? parsed.versions
          .map((v) => ({ ...v, card: normalizeCard(v?.card) }))
          .filter((v) => v.card && typeof v.id === "string")
      : [];
    const activeVersion = versions.some((v) => v.id === parsed.activeVersion) ? parsed.activeVersion : null;
    return { card, versions, activeVersion };
  } catch {
    return null;
  }
}

/** Returns false when storage is unavailable so the UI can say so. */
export function writeStore(store) {
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
    return true;
  } catch {
    return false;
  }
}
