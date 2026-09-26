/**
 * Door geometry for the POH planner.
 *
 * Rotation is a count of 90° clockwise turns from the wiki's default
 * orientation (the `doors` string on each room's Infobox Room).
 * Screen axes: +x east, +y south, so north is the top of the grid.
 */

export const SIDES = ["N", "E", "S", "W"];

export const OPPOSITE = {
  N: "S",
  S: "N",
  E: "W",
  W: "E",
};

/** Tile step when leaving a room through a side. y grows south. */
export const DELTA = {
  N: [0, -1],
  E: [1, 0],
  S: [0, 1],
  W: [-1, 0],
};

export function normalizeRotation(rotation) {
  return ((rotation % 4) + 4) % 4;
}

/** Door sides after `rotation` clockwise quarter-turns. */
export function rotatedSides(doors, rotation) {
  const turns = normalizeRotation(rotation);
  return doors.map((side) => SIDES[(SIDES.indexOf(side) + turns) % 4]);
}

export function hasDoor(doors, rotation, side) {
  return rotatedSides(doors, rotation).includes(side);
}

/**
 * Rotate a point around the centre of a 0–100 room square.
 * Positive rotation is clockwise on a screen whose y axis points south.
 */
export function rotatePoint(x, y, rotation, origin = 50) {
  const turns = normalizeRotation(rotation);
  let dx = x - origin;
  let dy = y - origin;
  for (let i = 0; i < turns; i += 1) {
    const nextX = -dy;
    const nextY = dx;
    dx = nextX;
    dy = nextY;
  }
  return { x: dx + origin, y: dy + origin };
}

/**
 * Relationship between this room and the neighbour across `side`.
 * "link"      — both sides have a door
 * "mismatch"  — exactly one side has a door
 * "wall"      — both sides are walls (neighbour may be absent)
 * "open"      — this side is a door with no neighbour yet
 */
export function edgeState(placed, roomById, x, y, side) {
  const here = placed.find((room) => room.x === x && room.y === y);
  if (!here) return null;
  const definition = roomById[here.roomId];
  if (!definition) return null;
  const hereDoor = hasDoor(definition.doors, here.rotation, side);
  const [dx, dy] = DELTA[side];
  const there = placed.find((room) => room.x === x + dx && room.y === y + dy);
  if (!there) return hereDoor ? "open" : "wall";
  const neighbour = roomById[there.roomId];
  if (!neighbour) return hereDoor ? "open" : "wall";
  const thereDoor = hasDoor(neighbour.doors, there.rotation, OPPOSITE[side]);
  if (hereDoor && thereDoor) return "link";
  if (hereDoor !== thereDoor) return "mismatch";
  return "wall";
}

export function layoutStats(placed, roomById) {
  let cost = 0;
  let level = 0;
  let unknown = 0;
  for (const piece of placed) {
    const room = roomById[piece.roomId];
    if (!room) {
      unknown += 1;
      continue;
    }
    cost += room.cost;
    if (room.level > level) level = room.level;
  }
  return { cost, level, count: placed.length - unknown, unknown };
}
