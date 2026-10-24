import { stripUnsafeText } from "../utils/textSanitize.js";
import { floorProblems, roomAllowedOnFloor } from "./floors.js";
import { GI_CLICKERZ_LAYOUT } from "./exampleLayout.js";
import { GRID_SIZE, ROOM_BY_ID } from "./rooms.js";
import { cleanBuilt } from "./tiers.js";

export function newUid() {
  const bytes = new Uint8Array(4);
  globalThis.crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

const MAX_NAME_LENGTH = 80;
const MAX_PIECES_PER_FLOOR = GRID_SIZE * GRID_SIZE;
const MAX_SCANNED_PIECES = MAX_PIECES_PER_FLOOR * 8;

function cleanName(name) {
  if (typeof name !== "string") return "Imported layout";
  const cleaned = stripUnsafeText(name).trim().slice(0, MAX_NAME_LENGTH);
  return cleaned || "Imported layout";
}

function uniqueUid(preferred, makeUid, seenUids) {
  let uid = stripUnsafeText(preferred).trim().slice(0, 64);
  if (!uid || seenUids.has(uid)) {
    const generated = String(makeUid() || "");
    uid = !generated || seenUids.has(generated) ? `room-${seenUids.size}` : generated;
  }
  while (seenUids.has(uid)) uid = `${uid}-${seenUids.size}`;
  seenUids.add(uid);
  return uid;
}

export function normalizeLayout(input, makeUid = newUid) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const source = input.layout && input.layout.floors ? input.layout : input;
  if (!source.floors || !Array.isArray(source.floors.ground)) return null;
  let invalidFloorRoom = false;
  const seenUids = new Set();
  const cleanList = (list, floorId) => {
    const sourceList = Array.isArray(list) ? list.slice(0, MAX_SCANNED_PIECES) : [];
    const seenCells = new Set();
    const cleaned = [];
    for (const piece of sourceList) {
      if (!piece || typeof piece.roomId !== "string" || !Object.hasOwn(ROOM_BY_ID, piece.roomId)) continue;
      const room = ROOM_BY_ID[piece.roomId];
      if (!roomAllowedOnFloor(room, floorId)) {
        invalidFloorRoom = true;
        continue;
      }
      const { x, y } = piece;
      if (!Number.isInteger(x) || !Number.isInteger(y)) continue;
      if (x < 0 || y < 0 || x >= GRID_SIZE || y >= GRID_SIZE) continue;
      const cell = `${x},${y}`;
      if (seenCells.has(cell)) continue;
      seenCells.add(cell);
      const rotation = Number(piece.rotation);
      const built = cleanBuilt(piece.built, room);
      cleaned.push({
        uid: uniqueUid(piece.uid, makeUid, seenUids),
        roomId: piece.roomId,
        x,
        y,
        rotation: Number.isInteger(rotation) ? ((rotation % 4) + 4) % 4 : 0,
        ...(built ? { built } : {}),
      });
    }
    return cleaned;
  };

  const floors = {
    ground: cleanList(source.floors.ground, "ground"),
    upper: cleanList(source.floors.upper, "upper"),
    dungeon: cleanList(source.floors.dungeon, "dungeon"),
  };
  if (invalidFloorRoom) return null;
  if (floorProblems(floors, ROOM_BY_ID).length) return null;

  return {
    version: 1,
    name: cleanName(source.name),
    presetId: typeof source.presetId === "string" && source.presetId.trim() ? source.presetId.trim().slice(0, 40) : null,
    activeFloor: ["ground", "upper", "dungeon"].includes(source.activeFloor) ? source.activeFloor : "ground",
    floors,
    flow: source.presetId === "gi-clickerz" ? GI_CLICKERZ_LAYOUT.flow : [],
  };
}
