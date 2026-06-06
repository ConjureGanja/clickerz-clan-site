export const WOM_GROUP_ID = 21596;
export const WOM_BASE = "https://api.wiseoldman.net/v2";
export const RUNEPROFILE_BASE = "https://api.runeprofile.com/v1";
export const RUNEPROFILE_CLAN_NAME = "Clickerz";
export const RUNEPROFILE_SITE = "https://runeprofile.com";

const DEFAULT_ACTIVITY_TYPES = [
  "valuable_drop",
  "quest_completed",
  "achievement_diary_tier_completed",
  "combat_achievement_tier_completed",
  "xp_milestone",
  "maxed",
  "new_item_obtained",
];

const RUNEPROFILE_SUMMARY_CONCURRENCY = 4;
const RUNEPROFILE_SUMMARY_MAX_REQUESTS = 50;
const runeProfileSummaryCache = new Map();

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    const statusText = response.statusText || "Unknown status";
    throw new Error(`Request failed for ${url}: ${response.status} ${statusText}`);
  }

  return response.json();
}

export function formatCompactNumber(value, suffix = "") {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "—";
  }

  const numericValue = Number(value);
  const absoluteValue = Math.abs(numericValue);

  if (absoluteValue >= 1_000_000_000) {
    return `${(numericValue / 1_000_000_000).toFixed(1)}B${suffix}`;
  }

  if (absoluteValue >= 1_000_000) {
    return `${(numericValue / 1_000_000).toFixed(1)}M${suffix}`;
  }

  if (absoluteValue >= 1_000) {
    return `${(numericValue / 1_000).toFixed(1)}k${suffix}`;
  }

  return `${numericValue.toLocaleString()}${suffix}`;
}

export function formatPercentage(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "—";
  }

  return `${(Number(value) * 100).toFixed(1)}%`;
}

export function formatMetricName(metric) {
  return String(metric ?? "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function formatRelativeTime(value) {
  if (!value) {
    return "Recently";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.max(1, Math.round(diffMs / 60000));

  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  }

  const diffHours = Math.round(diffMinutes / 60);

  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }

  const diffDays = Math.round(diffHours / 24);

  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }

  return date.toLocaleDateString();
}

export function describeClanActivity(activity) {
  const itemName = activity.enriched?.itemName ?? "Unknown item";
  const questName = activity.enriched?.questName ?? "Unknown quest";
  const areaName = activity.enriched?.areaName ?? "Achievement diary";
  const tierName = activity.enriched?.tierName ?? "New tier";

  switch (activity.type) {
    case "valuable_drop":
      return {
        icon: "💰",
        title: itemName,
        detail: `Valued around ${formatCompactNumber(activity.data.value, " gp")}`,
      };
    case "quest_completed":
      return {
        icon: "📜",
        title: questName,
        detail: "Quest completed",
      };
    case "achievement_diary_tier_completed":
      return {
        icon: "🗺️",
        title: `${tierName} ${areaName}`,
        detail: "Diary tier cleared",
      };
    case "combat_achievement_tier_completed":
      return {
        icon: "⚔️",
        title: `${tierName} combat achievements`,
        detail: "New combat tier progress",
      };
    case "xp_milestone":
      return {
        icon: "✨",
        title: `${formatMetricName(activity.data.name)} milestone`,
        detail: `${formatCompactNumber(activity.data.xp, " xp")} total XP`,
      };
    case "new_item_obtained":
      return {
        icon: "📦",
        title: itemName,
        detail: "New collection log slot",
      };
    case "maxed":
      return {
        icon: "👑",
        title: "Maxed account",
        detail: "Reached the ultimate flex",
      };
    default:
      return {
        icon: "⭐",
        title: "Clan update",
        detail: "Fresh progress tracked on RuneProfile",
      };
  }
}

function toRows(entries, formatter) {
  if (!Array.isArray(entries)) {
    return [];
  }

  return entries.map((entry, index) => formatter(entry, index));
}

function sumProgress(items) {
  return items.reduce(
    (totals, item) => ({
      completed: totals.completed + (item.completed ?? 0),
      total: totals.total + (item.total ?? 0),
    }),
    { completed: 0, total: 0 },
  );
}

function getDisplayName(player) {
  return player?.displayName ?? player?.username ?? player?.name ?? null;
}

function getGroupMemberNames(groupInfo) {
  const memberships = [
    ...(Array.isArray(groupInfo?.memberships) ? groupInfo.memberships : []),
    ...(Array.isArray(groupInfo?.group?.memberships) ? groupInfo.group.memberships : []),
  ];

  return memberships
    .map((membership) => getDisplayName(membership.player) ?? getDisplayName(membership))
    .filter(Boolean);
}

function buildSpotlight(summary) {
  const diaryProgress = sumProgress(summary.achievementDiaries ?? []);
  const combatProgress = sumProgress(summary.combatAchievements ?? []);

  return {
    name: summary.username,
    accountType: summary.accountType?.name ?? "Main",
    totalLevel: summary.skills?.totalLevel ?? 0,
    totalXp: summary.skills?.totalXp ?? 0,
    questPoints: summary.quests?.earnedPoints ?? 0,
    questCompleted: summary.quests?.completed ?? 0,
    questTotal: summary.quests?.total ?? 0,
    questRate:
      summary.quests?.total > 0
        ? (summary.quests.completed ?? 0) / summary.quests.total
        : 0,
    clogObtained: summary.collectionLog?.obtained ?? 0,
    clogTotal: summary.collectionLog?.total ?? 0,
    clogRate:
      summary.collectionLog?.total > 0
        ? (summary.collectionLog.obtained ?? 0) / summary.collectionLog.total
        : 0,
    diaryCompleted: diaryProgress.completed,
    diaryTotal: diaryProgress.total,
    diaryRate: diaryProgress.total > 0 ? diaryProgress.completed / diaryProgress.total : 0,
    combatCompleted: combatProgress.completed,
    combatTotal: combatProgress.total,
    combatRate:
      combatProgress.total > 0 ? combatProgress.completed / combatProgress.total : 0,
    updatedAt: summary.updatedAt,
  };
}

async function fetchRuneProfileSummaries(usernames) {
  const uniqueNames = [...new Set(usernames.map((username) => username?.trim()).filter(Boolean))]
    .slice(0, RUNEPROFILE_SUMMARY_MAX_REQUESTS);

  if (uniqueNames.length === 0) {
    return [];
  }

  const results = [];

  for (let batchStartIndex = 0; batchStartIndex < uniqueNames.length; batchStartIndex += RUNEPROFILE_SUMMARY_CONCURRENCY) {
    const batch = uniqueNames.slice(batchStartIndex, batchStartIndex + RUNEPROFILE_SUMMARY_CONCURRENCY);
    const batchResults = await Promise.allSettled(
      batch.map((username) => {
        const cacheKey = username.toLowerCase();
        const cachedSummaryRequest = runeProfileSummaryCache.get(cacheKey);

        if (cachedSummaryRequest) {
          return cachedSummaryRequest;
        }

        const summaryRequest = fetchJson(`${RUNEPROFILE_BASE}/accounts/${encodeURIComponent(username)}`)
          .catch((error) => {
            runeProfileSummaryCache.delete(cacheKey);
            throw error;
          });
        runeProfileSummaryCache.set(cacheKey, summaryRequest);
        return summaryRequest;
      }),
    );

    results.push(...batchResults);
  }

  return results
    .filter((result) => result.status === "fulfilled")
    .map((result) => buildSpotlight(result.value));
}

async function fetchRuneProfileClanActivities(limit = 12) {
  const activityTypes = encodeURIComponent(DEFAULT_ACTIVITY_TYPES.join(","));
  const clanName = encodeURIComponent(RUNEPROFILE_CLAN_NAME);
  const data = await fetchJson(
    `${RUNEPROFILE_BASE}/clans/${clanName}/activities?limit=${limit}&activityTypes=${activityTypes}`,
  );

  return Array.isArray(data.activities) ? data.activities : [];
}

export async function fetchLeaderboardSnapshot() {
  const womRequests = await Promise.allSettled([
    fetchJson(`${WOM_BASE}/groups/${WOM_GROUP_ID}`),
    fetchJson(`${WOM_BASE}/groups/${WOM_GROUP_ID}/hiscores?metric=overall&limit=15`),
    fetchJson(`${WOM_BASE}/groups/${WOM_GROUP_ID}/hiscores?metric=ehb&limit=15`),
    fetchJson(`${WOM_BASE}/groups/${WOM_GROUP_ID}/hiscores?metric=ehp&limit=15`),
    fetchJson(`${WOM_BASE}/groups/${WOM_GROUP_ID}/gains?period=week&metric=overall&limit=10`),
    fetchJson(`${WOM_BASE}/groups/${WOM_GROUP_ID}/gains?period=week&metric=ehb&limit=10`),
    fetchJson(`${WOM_BASE}/groups/${WOM_GROUP_ID}/gains?period=month&metric=overall&limit=10`),
    fetchJson(`${WOM_BASE}/groups/${WOM_GROUP_ID}/gains?period=month&metric=ehb&limit=10`),
    fetchJson(`${WOM_BASE}/groups/${WOM_GROUP_ID}/achievements?limit=20`),
    fetchJson(`${WOM_BASE}/groups/${WOM_GROUP_ID}/records?period=week&limit=10`),
  ]);

  const [
    groupInfoResult,
    overallResult,
    ehbResult,
    ehpResult,
    weekOverallResult,
    weekEhbResult,
    monthOverallResult,
    monthEhbResult,
    achievementsResult,
    recordsResult,
  ] = womRequests;

  const hiscores = {
    overall: toRows(
      overallResult.status === "fulfilled" ? overallResult.value : [],
      (entry, index) => ({
        rank: index + 1,
        name: entry.player.displayName,
        value: `${(entry.data.level ?? 0).toLocaleString()} lvl`,
      }),
    ),
    ehb: toRows(
      ehbResult.status === "fulfilled" ? ehbResult.value : [],
      (entry, index) => ({
        rank: index + 1,
        name: entry.player.displayName,
        value: `${Math.round(entry.data.value ?? 0).toLocaleString()} EHB`,
      }),
    ),
    ehp: toRows(
      ehpResult.status === "fulfilled" ? ehpResult.value : [],
      (entry, index) => ({
        rank: index + 1,
        name: entry.player.displayName,
        value: `${Math.round(entry.data.value ?? 0).toLocaleString()} EHP`,
      }),
    ),
  };

  const mapGainers = (result, metric) =>
    toRows(result.status === "fulfilled" ? result.value : [], (entry, index) => ({
      rank: index + 1,
      name: entry.player.displayName,
      rawGained: Number(entry.data.gained ?? 0),
      change:
        metric === "overall"
          ? `+${formatCompactNumber(entry.data.gained, " xp")}`
          : `+${Number(entry.data.gained ?? 0).toFixed(1)} EHB`,
      value:
        metric === "overall"
          ? formatCompactNumber(entry.data.gained, " xp")
          : `${Number(entry.data.gained ?? 0).toFixed(1)} EHB`,
    }));

  const gainers = {
    weekXP: mapGainers(weekOverallResult, "overall"),
    weekEHB: mapGainers(weekEhbResult, "ehb"),
    monthXP: mapGainers(monthOverallResult, "overall"),
    monthEHB: mapGainers(monthEhbResult, "ehb"),
  };

  const groupInfo = groupInfoResult.status === "fulfilled" ? groupInfoResult.value : null;
  const achievements = achievementsResult.status === "fulfilled" && Array.isArray(achievementsResult.value)
    ? achievementsResult.value
    : [];
  const records = recordsResult.status === "fulfilled" && Array.isArray(recordsResult.value)
    ? recordsResult.value
    : [];

  const spotlightNames = [
    ...getGroupMemberNames(groupInfo),
    ...hiscores.overall.slice(0, 5).map((row) => row.name),
    ...hiscores.ehb.slice(0, 5).map((row) => row.name),
    ...gainers.weekXP.slice(0, 4).map((row) => row.name),
    ...gainers.monthXP.slice(0, 4).map((row) => row.name),
    ...achievements.map((achievement) => achievement.player?.displayName),
  ];

  const [activitiesResult, spotlightResult] = await Promise.allSettled([
    fetchRuneProfileClanActivities(12),
    fetchRuneProfileSummaries(spotlightNames),
  ]);

  const clanActivities = activitiesResult.status === "fulfilled" ? activitiesResult.value : [];
  const spotlights = spotlightResult.status === "fulfilled" ? spotlightResult.value : [];

  const biggestDrop = clanActivities
    .filter((activity) => activity.type === "valuable_drop")
    .sort((left, right) => (right.data.value ?? 0) - (left.data.value ?? 0))[0] ?? null;

  const totalWeeklyXp = gainers.weekXP.reduce((sum, row) => sum + (row.rawGained ?? 0), 0);

  return {
    groupInfo,
    hiscores,
    gainers,
    achievements,
    records,
    clanActivities,
    spotlights,
    summary: {
      totalWeeklyXp,
      biggestDrop,
      questLeader: [...spotlights].sort((left, right) => right.questPoints - left.questPoints)[0] ?? null,
    },
    errors: {
      wom: womRequests.every((result) => result.status === "rejected"),
      runeProfile:
        activitiesResult.status === "rejected" &&
        (spotlightResult.status === "rejected" || spotlights.length === 0),
    },
  };
}
