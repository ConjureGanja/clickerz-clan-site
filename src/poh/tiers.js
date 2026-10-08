/**
 * Which furniture tier a placed room is using.
 *
 * A missing `built` entry means the default: the highest option that is not a
 * staircase or a dungeon entrance. Garden and formal-garden centrepieces
 * default to the plain exit portal, which is how you enter the house.
 * Staircases and dungeon entrances stay unbuilt until a tier is chosen.
 * `built[hotspotId] === ""` means nothing is built in that hotspot.
 */

export function defaultTier(spot) {
  const usable = spot.tiers.filter((tier) => tier.role !== "stairs" && tier.role !== "dungeon-entrance");
  if (spot.id === "centrepiece") {
    const portal = usable.find((tier) => tier.name === "Exit portal");
    if (portal) return portal;
  }
  return usable.length ? usable[usable.length - 1] : null;
}

export function selectedTier(piece, spot) {
  if (!spot) return null;
  const built = piece?.built;
  if (built && Object.prototype.hasOwnProperty.call(built, spot.id)) {
    const choice = built[spot.id];
    if (choice === "" || choice == null) return null;
    return spot.tiers.find((tier) => tier.id === choice) || defaultTier(spot);
  }
  return defaultTier(spot);
}

export function pieceHasRole(piece, room, role) {
  if (!piece || !room) return false;
  return room.hotspots.some((spot) => selectedTier(piece, spot)?.role === role);
}

/** Shrink a drawing when the player picked a lower-level option than the default. */
export function tierScale(spot, tier) {
  const fallback = defaultTier(spot);
  if (!tier || !fallback || tier.id === fallback.id) return 1;
  const peak = Math.max(...spot.tiers.map((item) => item.level || 0), 1);
  if ((tier.level || 0) >= peak) return 1;
  return 0.72 + 0.28 * ((tier.level || 1) / peak);
}

export function cleanBuilt(built, room) {
  if (!built || typeof built !== "object" || !room) return undefined;
  const next = {};
  for (const spot of room.hotspots) {
    if (!Object.prototype.hasOwnProperty.call(built, spot.id)) continue;
    const value = built[spot.id];
    if (value === "") next[spot.id] = "";
    else if (typeof value === "string" && spot.tiers.some((tier) => tier.id === value)) next[spot.id] = value;
  }
  return Object.keys(next).length ? next : undefined;
}

export function formatMaterials(tier) {
  if (!tier?.materials?.length) return "No extra materials listed";
  return tier.materials
    .map((item) => {
      const qty = item.qty > 1 ? ` ×${item.qty.toLocaleString("en-GB")}` : "";
      const note = item.note ? ` (${item.note})` : "";
      return `${item.name}${qty}${note}`;
    })
    .join(", ");
}

export function formatTierCost(tier) {
  if (!tier) return "";
  if (typeof tier.cost === "number") return `${tier.cost.toLocaleString("en-GB")} gp`;
  if (tier.costLabel) return `${tier.costLabel} gp`;
  return "Cost not listed";
}

export function tierChoice(piece, spot) {
  const built = piece?.built;
  if (built && Object.prototype.hasOwnProperty.call(built, spot.id)) return built[spot.id] || "";
  return defaultTier(spot)?.id || "";
}
