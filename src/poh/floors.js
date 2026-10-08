/**
 * Upper floor and dungeon placement.
 *
 * Upstairs: the first room of each connected block must sit on a ground room
 * with a staircase built (skill hall or quest hall). Every upstairs room must
 * also sit on an indoor ground room. Outdoor gardens and the outdoor
 * menagerie cannot hold a floor above them.
 *
 * Dungeon: the first room of each connected block must sit under a ground
 * room with a dungeon entrance built. After that, rooms may extend any
 * orthogonal direction, including cells with nothing above them.
 */

import { pieceHasRole } from "./tiers.js";

const STEPS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

export function roomAllowedOnFloor(room, floorId) {
  if (!room?.placement?.floors?.includes(floorId)) return false;
  if (floorId === "upper" && room.placement.outdoor) return false;
  return true;
}

export function components(pieces) {
  const byKey = new Map(pieces.map((piece) => [`${piece.x},${piece.y}`, piece]));
  const seen = new Set();
  const groups = [];
  for (const piece of pieces) {
    const start = `${piece.x},${piece.y}`;
    if (seen.has(start)) continue;
    const group = [];
    const stack = [piece];
    seen.add(start);
    while (stack.length) {
      const current = stack.pop();
      group.push(current);
      for (const [dx, dy] of STEPS) {
        const key = `${current.x + dx},${current.y + dy}`;
        if (seen.has(key) || !byKey.has(key)) continue;
        seen.add(key);
        stack.push(byKey.get(key));
      }
    }
    groups.push(group);
  }
  return groups;
}

function groundAt(ground, x, y) {
  return ground.find((piece) => piece.x === x && piece.y === y) || null;
}

export function floorProblems(floors, roomById) {
  const messages = [];
  const seen = new Set();
  const add = (message) => {
    if (seen.has(message)) return;
    seen.add(message);
    messages.push(message);
  };
  const ground = floors.ground || [];
  const upper = floors.upper || [];
  const dungeon = floors.dungeon || [];

  for (const piece of upper) {
    const room = roomById[piece.roomId];
    if (!roomAllowedOnFloor(room, "upper")) {
      add(`${room?.name || "That room"} cannot be built upstairs.`);
    }
    const below = groundAt(ground, piece.x, piece.y);
    const belowRoom = below ? roomById[below.roomId] : null;
    if (!below || !belowRoom || !belowRoom.placement.floors.includes("ground") || belowRoom.placement.outdoor) {
      add("Upper rooms can only sit on indoor ground-floor rooms. Gardens, the formal garden, the superior garden, and the outdoor menagerie cannot hold a floor above them.");
    }
  }

  for (const group of components(upper)) {
    const anchored = group.some((piece) => {
      const below = groundAt(ground, piece.x, piece.y);
      const belowRoom = below ? roomById[below.roomId] : null;
      return pieceHasRole(below, belowRoom, "stairs");
    });
    if (!anchored) {
      add("Start the upper floor on top of a skill hall or quest hall that has a staircase built, then build out from that room.");
    }
  }

  for (const piece of dungeon) {
    const room = roomById[piece.roomId];
    if (!roomAllowedOnFloor(room, "dungeon")) {
      add(`${room?.name || "That room"} cannot be built in the dungeon.`);
    }
  }

  for (const group of components(dungeon)) {
    const anchored = group.some((piece) => {
      const above = groundAt(ground, piece.x, piece.y);
      const aboveRoom = above ? roomById[above.roomId] : null;
      return pieceHasRole(above, aboveRoom, "dungeon-entrance");
    });
    if (!anchored) {
      add("Start the dungeon directly under a garden or formal garden whose centrepiece is a dungeon entrance. After that it can extend in any direction, even where nothing is built above.");
    }
  }

  return messages;
}

/** Hint painted on an empty or filled cell of the upper floor or dungeon. */
export function cellHint(floorId, ground, roomById, x, y) {
  if (floorId === "upper") {
    const below = groundAt(ground, x, y);
    const room = below ? roomById[below.roomId] : null;
    if (!room || !room.placement.floors.includes("ground") || room.placement.outdoor) return null;
    if (pieceHasRole(below, room, "stairs")) return "stairs";
    return "support";
  }
  if (floorId === "dungeon") {
    const above = groundAt(ground, x, y);
    const room = above ? roomById[above.roomId] : null;
    if (room && pieceHasRole(above, room, "dungeon-entrance")) return "entrance";
  }
  return null;
}
