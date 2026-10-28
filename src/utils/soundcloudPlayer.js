export const SOUNDCLOUD_PROFILE_URL = "https://soundcloud.com/clickerz-cc";
export const SOUNDCLOUD_ORIGIN = "https://w.soundcloud.com";
export const CLICKER_WIDGET_DOCK_ID = "clicker-widget-dock";
export const SOUNDCLOUD_PAGE_PATH = "/clicking-game";

const EMBED_PARAMS = [
  ["color", "#ffd700"],
  ["auto_play", "false"],
  ["hide_related", "true"],
  ["show_comments", "false"],
  ["show_user", "false"],
  ["show_reposts", "false"],
  ["show_teaser", "false"],
  ["visual", "false"],
  ["show_artwork", "false"],
  ["buying", "false"],
  ["liking", "false"],
  ["download", "false"],
  ["sharing", "false"],
  ["show_playcount", "false"],
];

const dockListeners = new Set();

export function normalizePathname(pathname) {
  if (typeof pathname !== "string" || pathname.length === 0) return "";
  const lowered = pathname.toLowerCase();
  if (lowered === "/") return "/";
  return lowered.replace(/\/+$/, "");
}

export function isSoundcloudPage(pathname) {
  return normalizePathname(pathname) === SOUNDCLOUD_PAGE_PATH;
}

export function buildSoundcloudEmbedSrc(profileUrl = SOUNDCLOUD_PROFILE_URL) {
  const params = new URLSearchParams([["url", profileUrl], ...EMBED_PARAMS]);
  return `${SOUNDCLOUD_ORIGIN}/player/?${params.toString()}`;
}

export const SOUNDCLOUD_EMBED_SRC = buildSoundcloudEmbedSrc();

export function readWidgetMessage(data) {
  if (!data) return null;
  if (typeof data === "string") {
    try {
      const parsed = JSON.parse(data);
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch {
      return null;
    }
  }
  return typeof data === "object" ? data : null;
}

export function widgetMethod(message) {
  return String(message?.method || "").toLowerCase();
}

export function widgetCommandPayload(method, value) {
  const payload = { method };
  if (value !== undefined) payload.value = value;
  return payload;
}

export function formatTrackDuration(durationMs) {
  const ms = Number(durationMs);
  if (!Number.isFinite(ms) || ms <= 0) return "";
  const total = Math.round(ms / 1000);
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function parseMaybeJson(value) {
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export function extractSoundList(value) {
  const parsed = parseMaybeJson(value);
  if (Array.isArray(parsed)) return parsed;
  if (Array.isArray(parsed?.collection)) return parsed.collection;
  if (Array.isArray(parsed?.sounds)) return parsed.sounds;
  return [];
}

export function normalizeSoundcloudTracks(value) {
  const source = extractSoundList(value);
  const seen = new Set();

  return source.map((sound, index) => {
    const titled = typeof sound?.title === "string" ? sound.title.trim() : "";
    const named = typeof sound?.name === "string" ? sound.name.trim() : "";
    const title = titled || named || `Track ${index + 1}`;
    let id = sound?.id != null && String(sound.id).trim() ? String(sound.id).trim() : `track-${index}`;
    if (seen.has(id)) id = `${id}-${index}`;
    seen.add(id);
    const durationMs = Number(sound?.duration);
    const permalinkUrl = typeof sound?.permalink_url === "string" ? sound.permalink_url : "";

    return {
      id,
      title,
      durationMs: Number.isFinite(durationMs) && durationMs > 0 ? durationMs : 0,
      durationLabel: formatTrackDuration(durationMs),
      permalinkUrl,
    };
  });
}

export function readSoundIndex(value) {
  if (typeof value === "number" && Number.isInteger(value) && value >= 0) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number.parseInt(value, 10);
    if (Number.isInteger(parsed) && parsed >= 0 && String(parsed) === value.trim()) return parsed;
  }
  return null;
}

export function dockPosition(slotRect, scrollX = 0, scrollY = 0) {
  return {
    top: Math.round(Number(slotRect?.top || 0) + Number(scrollY || 0)),
    left: Math.round(Number(slotRect?.left || 0) + Number(scrollX || 0)),
    width: Math.max(0, Math.round(Number(slotRect?.width || 0))),
  };
}

export function subscribeSoundcloudDock(listener) {
  dockListeners.add(listener);
  listener();
  return () => dockListeners.delete(listener);
}

export function notifySoundcloudDock() {
  dockListeners.forEach((listener) => listener());
}
