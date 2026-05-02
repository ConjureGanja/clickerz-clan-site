const WOM_BASE = "https://api.wiseoldman.net/v2";

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
    const res = await fetch(`${WOM_BASE}/competitions/${competition.id}`);
    const detail = await res.json();
    return { comp: competition, participations: detail.participations ?? [] };
  } catch {
    return { comp: competition, participations: [] };
  }
}
