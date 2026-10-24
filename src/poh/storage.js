import { stripUnsafeText } from "../utils/textSanitize.js";

const KEY = "clickerz-poh-planner-v1";
const MAX_STORE_CHARS = 1_500_000;
const MAX_SAVED = 24;

function cleanSaved(saved) {
  if (!Array.isArray(saved)) return [];
  const seen = new Set();
  const cleaned = [];
  for (const entry of saved.slice(0, MAX_SAVED)) {
    if (!entry || typeof entry.id !== "string" || !entry.layout || typeof entry.layout !== "object") continue;
    let id = stripUnsafeText(entry.id).trim().slice(0, 64);
    if (!id || seen.has(id)) id = `saved-${cleaned.length}`;
    while (seen.has(id)) id = `${id}-x`;
    seen.add(id);
    cleaned.push({
      id,
      name: typeof entry.name === "string" && stripUnsafeText(entry.name).trim()
        ? stripUnsafeText(entry.name).trim().slice(0, 80)
        : "Untitled layout",
      savedAt: typeof entry.savedAt === "string" ? entry.savedAt.slice(0, 40) : null,
      layout: entry.layout,
    });
  }
  return cleaned;
}

export function readStore() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw || raw.length > MAX_STORE_CHARS) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.current?.floors?.ground) return null;
    return {
      current: parsed.current,
      saved: cleanSaved(parsed.saved),
    };
  } catch {
    return null;
  }
}

export function writeStore(store) {
  try {
    const payload = JSON.stringify(store);
    if (payload.length > MAX_STORE_CHARS) return false;
    localStorage.setItem(KEY, payload);
    return true;
  } catch {
    return false;
  }
}
