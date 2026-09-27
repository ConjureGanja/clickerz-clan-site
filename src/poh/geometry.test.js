import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { GI_CLICKERZ_LAYOUT, cloneLayout } from "./exampleLayout.js";
import { cellHint, floorProblems } from "./floors.js";
import { edgeState, layoutStats, rotatePoint, rotatedSides } from "./geometry.js";
import { ROOM_BY_ID, ROOMS } from "./rooms.js";
import { pieceHasRole, selectedTier } from "./tiers.js";

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

const chapelRoom = ROOM_BY_ID.chapel;
const gilded = chapelRoom.hotspots.find((spot) => spot.id === "altar").tiers.find((tier) => tier.name === "Gilded altar");
expect(gilded?.level === 75 && gilded.materials.some((item) => item.name === "Marble block"), "gilded altar should keep the wiki level and materials");
expect(ROOM_BY_ID["skill-hall"].hotspots.find((spot) => spot.id === "stair").tiers.every((tier) => tier.role === "stairs"), "hall stair options are staircases");
expect(ROOM_BY_ID.garden.hotspots.find((spot) => spot.id === "centrepiece").tiers.some((tier) => tier.role === "dungeon-entrance"), "garden centrepiece includes a dungeon entrance");
expect(selectedTier({ }, ROOM_BY_ID.garden.hotspots.find((spot) => spot.id === "centrepiece")).name === "Exit portal", "garden centrepiece defaults to the exit portal");
expect(selectedTier({}, ROOM_BY_ID["quest-hall"].hotspots.find((spot) => spot.id === "stair")) == null, "stairs start unbuilt");

for (const room of ROOMS) {
  for (const spot of room.hotspots) {
    if (room.id === "study" && spot.id === "tea") continue;
    expect(spot.tiers.length > 0 && spot.tiers.every((tier) => tier.verified && typeof tier.level === "number"), `${room.id}:${spot.id} is missing wiki tiers`);
  }
}

const exampleStats = layoutStats(GI_CLICKERZ_LAYOUT.floors, ROOM_BY_ID);
expect(exampleStats.count === 9, "example still has 9 rooms");
expect(exampleStats.level >= 99, `example furniture should reach the magical cape rack, got ${exampleStats.level}`);
expect(exampleStats.cost > 661000, "example cost should include furniture");

function withFloors(mutate) {
  const layout = cloneLayout(GI_CLICKERZ_LAYOUT);
  mutate(layout);
  return floorProblems(layout.floors, ROOM_BY_ID);
}

expect(withFloors((layout) => {
  layout.floors.upper = [{ uid: "u1", roomId: "parlour", x: 4, y: 3, rotation: 0 }];
}).some((message) => /indoor|staircase/i.test(message)), "cannot start upstairs over the garden");

expect(withFloors((layout) => {
  layout.floors.upper = [{ uid: "u1", roomId: "parlour", x: 4, y: 5, rotation: 0 }];
}).some((message) => /staircase/i.test(message)), "quest hall needs a staircase before upstairs");

expect(withFloors((layout) => {
  const hall = layout.floors.ground.find((piece) => piece.roomId === "quest-hall");
  hall.built = { stair: "oak-staircase" };
  layout.floors.upper = [{ uid: "u1", roomId: "parlour", x: 4, y: 5, rotation: 0 }];
}).length === 0, "upstairs can start on a quest hall with stairs");

expect(withFloors((layout) => {
  const hall = layout.floors.ground.find((piece) => piece.roomId === "quest-hall");
  hall.built = { stair: "oak-staircase" };
  layout.floors.upper = [
    { uid: "u1", roomId: "parlour", x: 4, y: 5, rotation: 0 },
    { uid: "u2", roomId: "bedroom", x: 3, y: 5, rotation: 0 },
  ];
}).length === 0, "upstairs can extend over the costume room");

expect(withFloors((layout) => {
  const hall = layout.floors.ground.find((piece) => piece.roomId === "quest-hall");
  hall.built = { stair: "oak-staircase" };
  layout.floors.upper = [
    { uid: "u1", roomId: "parlour", x: 4, y: 5, rotation: 0 },
    { uid: "u2", roomId: "bedroom", x: 4, y: 4, rotation: 0 },
    { uid: "u3", roomId: "kitchen", x: 4, y: 3, rotation: 0 },
  ];
}).some((message) => /indoor|outdoor/i.test(message)), "cannot build upstairs over the superior garden");

expect(withFloors((layout) => {
  layout.floors.dungeon = [{ uid: "d1", roomId: "dungeon-corridor", x: 4, y: 3, rotation: 0 }];
}).some((message) => /dungeon entrance/i.test(message)), "dungeon cannot start without an entrance");

expect(withFloors((layout) => {
  const garden = layout.floors.ground.find((piece) => piece.roomId === "garden");
  garden.built = { centrepiece: "dungeon-entrance" };
  layout.floors.dungeon = [
    { uid: "d1", roomId: "dungeon-corridor", x: 4, y: 3, rotation: 0 },
    { uid: "d2", roomId: "dungeon-junction", x: 4, y: 2, rotation: 0 },
  ];
}).length === 0, "dungeon can extend onto a tile with nothing above");

expect(withFloors((layout) => {
  const garden = layout.floors.ground.find((piece) => piece.roomId === "garden");
  garden.built = { centrepiece: "dungeon-entrance" };
  layout.floors.dungeon = [
    { uid: "d1", roomId: "oubliette", x: 4, y: 3, rotation: 0 },
    { uid: "d2", roomId: "treasure-room", x: 0, y: 0, rotation: 0 },
  ];
}).some((message) => /dungeon entrance/i.test(message)), "a disconnected dungeon wing needs its own entrance");

expect(withFloors((layout) => {
  const hall = layout.floors.ground.find((piece) => piece.roomId === "quest-hall");
  hall.built = { stair: "" };
  layout.floors.upper = [{ uid: "u1", roomId: "parlour", x: 4, y: 5, rotation: 0 }];
}).some((message) => /staircase/i.test(message)), "clearing the only staircase blocks the upper floor");

const hinted = cellHint("upper", GI_CLICKERZ_LAYOUT.floors.ground, ROOM_BY_ID, 4, 5);
expect(hinted === "support", "quest hall without a staircase can hold an upper room but is not the stair anchor");
expect(pieceHasRole(
  { built: { stair: "marble-staircase" } },
  ROOM_BY_ID["skill-hall"],
  "stairs",
), "a selected marble staircase counts");

const stairLayout = cloneLayout(GI_CLICKERZ_LAYOUT);
stairLayout.floors.ground.find((piece) => piece.roomId === "quest-hall").built = { stair: "marble-spiral" };
expect(cellHint("upper", stairLayout.floors.ground, ROOM_BY_ID, 4, 5) === "stairs", "built stairs mark the cell above");
expect(cellHint("dungeon", [{ ...GI_CLICKERZ_LAYOUT.floors.ground.find((piece) => piece.uid === "eg"), built: { centrepiece: "dungeon-entrance" } }], ROOM_BY_ID, 4, 3) === "entrance", "dungeon entrance marks the cell below");

const report = ROOMS.map((room) => `${room.name}\t${room.level}\t${room.cost}\t${room.doors.join("")}\t${room.placement.floors.join("+")}`).join("\n");
fs.writeFileSync("/tmp/poh-room-report.tsv", report);

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`ok ${ROOMS.length} rooms`);
