import { cachedFetch } from "./apiCache";

const WOM_BASE = "https://api.wiseoldman.net/v2";
const WOM_GROUP_ID = 21596;
const COMPETITIONS_TTL = 5 * 60 * 1000;
const WINNERS_TTL = 5 * 60 * 1000;

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
 * Fetches the clan's competition list (cached and shared across pages).
 * @returns {Promise<object[]>}
 */
export function fetchGroupCompetitions() {
  return cachedFetch(
    `wom:competitions:${WOM_GROUP_ID}`,
    COMPETITIONS_TTL,
    async () => {
      const res = await fetch(`${WOM_BASE}/groups/${WOM_GROUP_ID}/competitions?limit=20`);
      if (!res.ok) throw new Error(`WOM competitions ${res.status}`);
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    },
  );
}

/**
 * Fetches competition details including participations (sorted by gained desc).
 * @param {object} competition - Competition object with an id property
 * @returns {Promise<{ comp: object, participations: object[] }>}
 */
export function fetchCompetitionWinners(competition) {
  return cachedFetch(
    `wom:competition:${competition.id}`,
    WINNERS_TTL,
    async () => {
      try {
        const res = await fetch(`${WOM_BASE}/competitions/${competition.id}`);
        const detail = await res.json();
        return { comp: competition, participations: detail.participations ?? [] };
      } catch {
        return { comp: competition, participations: [] };
      }
    },
  );
}
