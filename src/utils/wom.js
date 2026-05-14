export const WOM_BASE = "https://api.wiseoldman.net/v2";
export const WOM_REFRESH_INTERVAL_MS = 5 * 60 * 1000;

function withSearchParams(path, params = {}) {
  const url = new URL(`${WOM_BASE}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });
  return url.toString();
}

async function parseJsonSafe(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function womGet(path, params = {}, fetchOptions = {}) {
  const res = await fetch(withSearchParams(path, params), {
    cache: "no-store",
    ...fetchOptions,
  });

  const data = await parseJsonSafe(res);
  if (!res.ok) {
    throw new Error(
      `WOM request failed (${res.status})${data?.message ? `: ${data.message}` : ""}`
    );
  }
  return data;
}

export function asArray(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.data)) return data.data;
  return [];
}

export function getPlayerDisplayName(entry) {
  return (
    entry?.player?.displayName ??
    entry?.player?.username ??
    entry?.player?.name ??
    "Unknown"
  );
}

export function getHiscoreValue(entry, metric) {
  if (metric === "overall") {
    return entry?.data?.level ?? entry?.level ?? 0;
  }
  return entry?.data?.value ?? entry?.value ?? 0;
}

export function getGainedValue(entry, metric) {
  if (metric === "ehb") {
    return entry?.gainedEhb ?? entry?.data?.gained ?? entry?.gained ?? 0;
  }
  if (metric === "ehp") {
    return entry?.gainedEhp ?? entry?.data?.gained ?? entry?.gained ?? 0;
  }
  return (
    entry?.gainedExperience ??
    entry?.gained ??
    entry?.data?.gained ??
    entry?.data?.value ??
    0
  );
}

export function formatLabel(value, fallback = "") {
  if (!value) return fallback;
  return String(value)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getAchievementDisplayName(achievement) {
  const raw = achievement?.name ?? achievement?.type ?? achievement?.metric;
  return formatLabel(raw, "Milestone");
}

export async function fetchGroup(groupId, fetchOptions = {}) {
  return womGet(`/groups/${groupId}`, {}, fetchOptions);
}

export async function fetchGroupHiscores(groupId, metric, limit = 10, fetchOptions = {}) {
  const data = await womGet(
    `/groups/${groupId}/hiscores`,
    { metric, limit },
    fetchOptions
  );
  return asArray(data);
}

export async function fetchGroupGains(
  groupId,
  { period = "week", metric = "overall", limit = 10 } = {},
  fetchOptions = {}
) {
  const data = await womGet(
    `/groups/${groupId}/gains`,
    { period, metric, limit },
    fetchOptions
  );
  return asArray(data);
}

export async function fetchGroupAchievements(groupId, limit = 20, fetchOptions = {}) {
  const data = await womGet(
    `/groups/${groupId}/achievements`,
    { limit },
    fetchOptions
  );
  return asArray(data);
}

export async function fetchGroupRecords(
  groupId,
  { period = "week", limit = 10 } = {},
  fetchOptions = {}
) {
  const data = await womGet(
    `/groups/${groupId}/records`,
    { period, limit },
    fetchOptions
  );
  return asArray(data);
}

export async function fetchGroupCompetitions(groupId, limit = 20, fetchOptions = {}) {
  const data = await womGet(
    `/groups/${groupId}/competitions`,
    { limit },
    fetchOptions
  );
  return asArray(data);
}

/**
 * Formats a gained XP or kill count value into a human-readable string.
 * @param {number|null|undefined} value
 * @param {boolean} isSkill - true for XP, false for kill count
 * @returns {string}
 */
export function formatGained(value, isSkill) {
  if (value === null || value === undefined) return "0";
  const n = Number(value);
  if (isSkill) {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M xp";
    if (n >= 1_000) return (n / 1_000).toFixed(1) + "k xp";
    return n.toLocaleString() + " xp";
  }
  return n.toLocaleString() + " kc";
}

/**
 * Fetches competition details including participations (sorted by gained desc).
 * @param {object} competition - Competition object with an id property
 * @returns {Promise<{ comp: object, participations: object[] }>}
 */
export async function fetchCompetitionWinners(competition) {
  try {
    const detail = await womGet(`/competitions/${competition.id}`);
    return { comp: competition, participations: detail?.participations ?? [] };
  } catch {
    return { comp: competition, participations: [] };
  }
}
