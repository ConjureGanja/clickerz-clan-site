import { floorProblems, roomAllowedOnFloor } from "./floors.js";
import { GI_CLICKERZ_LAYOUT } from "./exampleLayout.js";
import { GRID_SIZE, ROOM_BY_ID } from "./rooms.js";
import { cleanBuilt } from "./tiers.js";

export function newUid() {
  const bytes = new Uint8Array(4);
  globalThis.crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export function normalizeLayout(input, makeUid = newUid) {
  if (!input || typeof input !== "object") return null;
  const source = input.layout && input.layout.floors ? input.layout : input;
  if (!source.floors || !Array.isArray(source.floors.ground)) return null;
  let invalidFloorRoom = false;
  const cleanList = (list, floorId) =>
    (Array.isArray(list) ? list : [])
      .filter((piece) => (
        piece &&
        typeof piece.roomId === "string" &&
        Object.hasOwn(ROOM_BY_ID, piece.roomId)
      ))
      .map((piece) => {
        const room = ROOM_BY_ID[piece.roomId];
        if (!roomAllowedOnFloor(room, floorId)) {
          invalidFloorRoom = true;
          return null;
        }
        const { x, y } = piece;
        if (!Number.isInteger(x) || !Number.isInteger(y)) return null;
        const rotation = Number(piece.rotation);
        const built = cleanBuilt(piece.built, room);
        return {
          uid: String(piece.uid || makeUid()),
          roomId: piece.roomId,
          x,
          y,
          rotation: Number.isInteger(rotation) ? ((rotation % 4) + 4) % 4 : 0,
          ...(built ? { built } : {}),
        };
      })
      .filter((piece) => (
        piece &&
        piece.x >= 0 &&
        piece.y >= 0 &&
        piece.x < GRID_SIZE &&
        piece.y < GRID_SIZE
      ));

  const floors = {
    ground: cleanList(source.floors.ground, "ground"),
    upper: cleanList(source.floors.upper, "upper"),
    dungeon: cleanList(source.floors.dungeon, "dungeon"),
  };
  if (invalidFloorRoom) return null;
  if (floorProblems(floors, ROOM_BY_ID).length) return null;

  return {
    version: 1,
    name: typeof source.name === "string" && source.name.trim() ? source.name.trim() : "Imported layout",
    presetId: source.presetId || null,
    activeFloor: ["ground", "upper", "dungeon"].includes(source.activeFloor) ? source.activeFloor : "ground",
    floors,
    flow: source.presetId === "gi-clickerz" ? GI_CLICKERZ_LAYOUT.flow : [],
  };
}
