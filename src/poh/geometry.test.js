import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { GI_CLICKERZ_LAYOUT } from "./exampleLayout.js";
import { edgeState, rotatePoint, rotatedSides } from "./geometry.js";
import { ROOM_BY_ID, ROOMS } from "./rooms.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const index = fs.readFileSync(path.join(here, "art/index.js"), "utf8");
const artByRoom = {};
for (const match of index.matchAll(/import (\w+) from "\.\/(\w+)";/g)) {
  artByRoom[match[1]] = match[2];
}
const componentToFile = artByRoom;
const roomToComponent = {};
for (const match of index.matchAll(/"([^"]+)": (\w+),/g)) {
  roomToComponent[match[1]] = match[2];
}
for (const match of index.matchAll(/^\s{2}(\w+): (\w+),/gm)) {
  roomToComponent[match[1]] = match[2];
}

const placed = GI_CLICKERZ_LAYOUT.floors.ground;
const failures = [];

function expect(condition, message) {
  if (!condition) failures.push(message);
}

function side(x, y, edge) {
  return edgeState(placed, ROOM_BY_ID, x, y, edge);
}

expect(ROOMS.length === 27, `expected 27 rooms, got ${ROOMS.length}`);
expect(new Set(ROOMS.map((room) => room.id)).size === ROOMS.length, "duplicate room ids");

for (const room of ROOMS) {
  expect(room.doors.length > 0, `${room.id} has no doors`);
  expect(room.doorsVerified === true, `${room.id} doors not marked verified`);
  expect(room.source.startsWith("https://oldschool.runescape.wiki/"), `${room.id} missing wiki source`);
  const component = roomToComponent[room.id];
  expect(component, `${room.id} missing art export`);
  const file = componentToFile[component];
  expect(file, `${room.id} art file not imported`);
  if (!file) continue;
  const source = fs.readFileSync(path.join(here, "art", `${file}.jsx`), "utf8");
  for (const spot of room.hotspots) {
    expect(source.includes(`data-hotspot="${spot.id}"`) || source.includes(`name="${spot.id}"`), `${room.id} art missing hotspot ${spot.id}`);
  }
}

const chapel = placed.find((piece) => piece.roomId === "chapel");
expect(JSON.stringify(rotatedSides(ROOM_BY_ID.chapel.doors, chapel.rotation)) === JSON.stringify(["N", "E"]), "chapel rotation should open north and east");
const altar = rotatePoint(50, 22, chapel.rotation);
expect(altar.x < 40 && Math.abs(altar.y - 50) < 8, `altar should land on the west wall, got ${altar.x},${altar.y}`);

expect(side(4, 3, "W") === "link", "garden should connect west to the pool");
expect(side(4, 3, "E") === "link", "garden should connect east to the nexus");
expect(side(4, 3, "S") === "link", "garden should connect south to the chapel");
expect(side(3, 3, "S") === "link", "pool room should connect south to the gallery");
expect(side(3, 4, "S") === "link", "gallery should connect south to the costume room");
expect(side(4, 4, "E") === "link", "chapel should connect east to the workshop");
expect(side(4, 5, "E") === "link", "quest hall should connect east to the study");
expect(side(4, 4, "S") === "mismatch", "chapel south wall should mismatch the quest hall door");
expect(side(5, 3, "S") === "mismatch", "nexus south door should mismatch the workshop wall");
expect(side(3, 5, "E") === "mismatch", "costume wall should mismatch the quest hall door");

const report = ROOMS.map((room) => `${room.name}\t${room.level}\t${room.cost}\t${room.doors.join("")}\t${room.placement.floors.join("+")}`).join("\n");
fs.writeFileSync("/tmp/poh-room-report.tsv", report);

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`ok ${ROOMS.length} rooms`);
