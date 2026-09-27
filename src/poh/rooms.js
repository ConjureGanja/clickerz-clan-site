/**
 * Buildable Old School RuneScape player-owned house rooms.
 *
 * Fetched 2026-09-26 from the OSRS Wiki MediaWiki API
 * (https://oldschool.runescape.wiki/api.php, action=parse, prop=wikitext).
 * User-Agent: G-I-Clickerz-POH-Planner/1.0.
 *
 * Door sides
 * ----------
 * Each room page's `{{Infobox Room}}` has a `doors` parameter. Letters are
 * compass sides in the room's default orientation:
 *   n = north (top), e = east (right), s = south (bottom), w = west (left).
 * Module:Infobox Room draws that diagram (north on top). The same codes are
 * what this file stores in `doors`.
 *
 * The overview page groups rooms with `{{POH room}}`, whose door codes live
 * in Template:POH room/doors. Those codes match the infoboxes, except the
 * dungeon corridor (see that room's doorSourceNote).
 *
 * Furniture anchors
 * -----------------
 * `hotspots[].anchor` is a point in the default orientation, viewBox 0–100,
 * y growing south. The wiki lists hotspot names, not tile coordinates, so
 * `anchorVerified` is false unless a room page states the position relative
 * to the door. After the room list is built, `furniture.js` replaces each
 * hotspot's tiers with the wiki build table (level, materials, coin cost).
 *
 * Floor slots
 * -----------
 * `placement.floors` is where the game allows the room. The upper floor can
 * only be started above a built staircase, and only over indoor rooms. The
 * dungeon can only be started under a built dungeon entrance.
 */

import { FURNITURE } from "./furniture.js";

const POH = "https://oldschool.runescape.wiki/w/Player-owned_house";

const DOOR_LETTERS = { n: "N", e: "E", s: "S", w: "W" };

export function doorsFromCode(code) {
  return code.split("").map((letter) => {
    const side = DOOR_LETTERS[letter];
    if (!side) throw new Error(`Unknown door letter "${letter}" in "${code}"`);
    return side;
  });
}

const ANCHOR_UNVERIFIED =
  "The wiki lists this hotspot by name but does not publish its tile coordinates. The anchor is the illustration position in the default door orientation.";

function tier(id, name, level, source, verified = false) {
  return {
    id,
    name,
    level,
    source,
    // False means the label is the intended max build for the drawing, but the
    // exact top-tier row was not copied out of the wiki table in this pass.
    verified,
  };
}

function hotspot(id, name, anchor, maxTier, extra = {}) {
  return {
    id,
    name,
    anchor,
    anchorVerified: extra.anchorVerified ?? false,
    anchorNote: extra.anchorNote ?? ANCHOR_UNVERIFIED,
    tiers: [maxTier],
  };
}

function room(definition) {
  return {
    doorsVerified: true,
    doorSourceNote:
      "Door sides are the Infobox Room `doors` parameter on this room's wiki page (n/e/s/w, north at the top), as rendered by Module:Infobox Room.",
    uniqueGroup: null,
    ...definition,
    doors: doorsFromCode(definition.doorCode),
  };
}

const GROUND_OR_UPPER = {
  floors: ["ground", "upper"],
  outdoor: false,
  note: "Indoor room. It can be built on the ground floor, or upstairs once that block of the upper floor is connected to a staircase and sits on indoor rooms.",
};

const GROUND_OUTDOOR = {
  floors: ["ground"],
  outdoor: true,
  note: "Outdoor room. Gardens can only be built on the ground floor.",
};

const DUNGEON_ONLY = {
  floors: ["dungeon"],
  outdoor: false,
  note: "Basement only. Start it under a garden or formal garden whose centrepiece is a dungeon entrance, then build out in any direction.",
};

export const ROOMS = [
  room({
    id: "parlour",
    name: "Parlour",
    shortName: "Parlour",
    level: 1,
    cost: 1000,
    doorCode: "esw",
    source: "https://oldschool.runescape.wiki/w/Parlour",
    placement: GROUND_OR_UPPER,
    floorColor: "#5c4636",
    hotspots: [
      hotspot("bookcase", "Bookcase", { x: 22, y: 22 }, tier("mahogany-bookcase", "Mahogany bookcase", null, "https://oldschool.runescape.wiki/w/Parlour")),
      hotspot("chair", "Chair", { x: 50, y: 64 }, tier("teak-armchair", "Teak armchair", null, "https://oldschool.runescape.wiki/w/Parlour")),
      hotspot("curtain", "Curtains", { x: 78, y: 28 }, tier("opulent-curtains", "Opulent curtains", null, "https://oldschool.runescape.wiki/w/Parlour")),
      hotspot("fireplace", "Fireplace", { x: 50, y: 20 }, tier("marble-fireplace", "Marble fireplace", null, "https://oldschool.runescape.wiki/w/Parlour")),
      hotspot("rug", "Rug", { x: 50, y: 58 }, tier("opulent-rug", "Opulent rug", null, "https://oldschool.runescape.wiki/w/Parlour")),
    ],
  }),
  room({
    id: "garden",
    name: "Garden",
    shortName: "Entry garden",
    level: 1,
    cost: 1000,
    doorCode: "nesw",
    source: "https://oldschool.runescape.wiki/w/Garden",
    placement: GROUND_OUTDOOR,
    floorColor: "#3e7a3a",
    hasExitPortal: true,
    hotspots: [
      hotspot("big-plant-1", "Big plant 1", { x: 22, y: 28 }, tier("dungeon-entrance", "Dungeon entrance", null, "https://oldschool.runescape.wiki/w/Garden")),
      hotspot("big-plant-2", "Big plant 2", { x: 78, y: 30 }, tier("dungeon-entrance", "Dungeon entrance", null, "https://oldschool.runescape.wiki/w/Garden")),
      hotspot("big-tree", "Big tree", { x: 24, y: 72 }, tier("yew-tree", "Yew tree", null, "https://oldschool.runescape.wiki/w/Garden")),
      hotspot(
        "centrepiece",
        "Centrepiece (exit portal)",
        { x: 68, y: 70 },
        tier("exit-portal", "Exit portal", 1, "https://oldschool.runescape.wiki/w/Garden"),
        {
          anchorNote:
            "The exit portal is the garden centrepiece. The wiki does not state which corner it occupies before you rotate the room. It is drawn toward the south-east so rotation 0 matches the G I Clickerz guide (portal SE, spawn just north-west of it). Players always appear north-west of the portal in world directions.",
        },
      ),
      hotspot("small-plant-1", "Small plant 1", { x: 40, y: 36 }, tier("roses", "Roses", null, "https://oldschool.runescape.wiki/w/Garden")),
      hotspot("small-plant-2", "Small plant 2", { x: 58, y: 40 }, tier("roses", "Roses", null, "https://oldschool.runescape.wiki/w/Garden")),
      hotspot("tree", "Tree", { x: 30, y: 48 }, tier("oak-tree", "Oak tree", null, "https://oldschool.runescape.wiki/w/Garden")),
      hotspot("tip-jar", "Tip jar", { x: 78, y: 78 }, tier("tip-jar", "Tip jar", null, "https://oldschool.runescape.wiki/w/Garden")),
    ],
  }),
  room({
    id: "kitchen",
    name: "Kitchen",
    shortName: "Kitchen",
    level: 5,
    cost: 5000,
    doorCode: "es",
    source: "https://oldschool.runescape.wiki/w/Kitchen",
    placement: GROUND_OR_UPPER,
    floorColor: "#6a5340",
    hotspots: [
      hotspot("barrel", "Barrel", { x: 28, y: 72 }, tier("beer-barrel", "Beer barrel", null, "https://oldschool.runescape.wiki/w/Kitchen")),
      hotspot("cat-basket", "Cat basket", { x: 72, y: 28 }, tier("cushioned-basket", "Cushioned basket", null, "https://oldschool.runescape.wiki/w/Kitchen")),
      hotspot("larder", "Larder", { x: 28, y: 28 }, tier("oak-larder", "Oak larder", null, "https://oldschool.runescape.wiki/w/Kitchen")),
      hotspot("shelf", "Shelf", { x: 50, y: 22 }, tier("oak-shelf", "Oak shelf", null, "https://oldschool.runescape.wiki/w/Kitchen")),
      hotspot("sink", "Sink", { x: 72, y: 48 }, tier("pump-and-drain", "Pump and drain", null, "https://oldschool.runescape.wiki/w/Kitchen")),
      hotspot("spice-rack", "Spice rack", { x: 22, y: 50 }, tier("teak-spice-rack", "Teak spice rack", null, "https://oldschool.runescape.wiki/w/Kitchen")),
      hotspot("stove", "Stove", { x: 50, y: 72 }, tier("fancy-range", "Fancy range", null, "https://oldschool.runescape.wiki/w/Kitchen")),
      hotspot("table", "Kitchen table", { x: 50, y: 48 }, tier("oak-kitchen-table", "Oak kitchen table", null, "https://oldschool.runescape.wiki/w/Kitchen")),
    ],
  }),
  room({
    id: "dining-room",
    name: "Dining room",
    shortName: "Dining room",
    level: 10,
    cost: 5000,
    doorCode: "esw",
    source: "https://oldschool.runescape.wiki/w/Dining_room",
    placement: GROUND_OR_UPPER,
    floorColor: "#5a4034",
    hotspots: [
      hotspot("bell-pull", "Bell pull", { x: 78, y: 28 }, tier("bell-pull", "Bell pull", null, "https://oldschool.runescape.wiki/w/Dining_room")),
      hotspot("curtain", "Curtains", { x: 22, y: 28 }, tier("opulent-curtains", "Opulent curtains", null, "https://oldschool.runescape.wiki/w/Dining_room")),
      hotspot("decoration", "Decoration", { x: 50, y: 22 }, tier("oak-decoration", "Oak decoration", null, "https://oldschool.runescape.wiki/w/Dining_room")),
      hotspot("fireplace", "Fireplace", { x: 50, y: 36 }, tier("marble-fireplace", "Marble fireplace", null, "https://oldschool.runescape.wiki/w/Dining_room")),
      hotspot("seating", "Seating", { x: 34, y: 62 }, tier("carved-teak-bench", "Carved teak bench", null, "https://oldschool.runescape.wiki/w/Dining_room")),
      hotspot("table", "Table", { x: 56, y: 64 }, tier("mahogany-table", "Mahogany table", null, "https://oldschool.runescape.wiki/w/Dining_room")),
    ],
  }),
  room({
    id: "workshop",
    name: "Workshop",
    shortName: "Workshop",
    level: 15,
    cost: 10000,
    doorCode: "ns",
    source: "https://oldschool.runescape.wiki/w/Workshop",
    placement: GROUND_OR_UPPER,
    floorColor: "#4e5562",
    hotspots: [
      hotspot("clockmaking", "Clockmaking", { x: 28, y: 36 }, tier("clockwork-bench", "Clockwork bench", null, "https://oldschool.runescape.wiki/w/Workshop")),
      hotspot("heraldry", "Heraldry", { x: 72, y: 36 }, tier("banner-easel", "Banner easel", null, "https://oldschool.runescape.wiki/w/Workshop")),
      hotspot(
        "repair",
        "Repair",
        { x: 50, y: 76 },
        tier("armour-stand", "Armour stand", 55, "https://oldschool.runescape.wiki/w/Workshop", true),
        {
          anchorNote:
            "Drawn on the south side of the default north–south hallway (Infobox doors `ns`). A 90° clockwise rotation moves this stand onto the west door, which is the 'repair stand near the door you'll use' step in the G I Clickerz guide. The wiki repair table lists the armour stand at level 55; it does not state which end of the room the hotspot sits on.",
        },
      ),
      hotspot("tool", "Tool store", { x: 26, y: 58 }, tier("marble-tool-store", "Tool store 5", null, "https://oldschool.runescape.wiki/w/Workshop")),
      hotspot("workbench", "Workbench", { x: 70, y: 58 }, tier("workbench-5", "Workbench", null, "https://oldschool.runescape.wiki/w/Workshop")),
    ],
  }),
  room({
    id: "bedroom",
    name: "Bedroom",
    shortName: "Bedroom",
    level: 20,
    cost: 10000,
    doorCode: "es",
    source: "https://oldschool.runescape.wiki/w/Bedroom",
    placement: GROUND_OR_UPPER,
    floorColor: "#6b4e68",
    hotspots: [
      hotspot("bed", "Bed", { x: 36, y: 32 }, tier("four-poster", "Four-poster bed", null, "https://oldschool.runescape.wiki/w/Bedroom")),
      hotspot("corner", "Corner", { x: 72, y: 28 }, tier("oak-clock", "Oak clock", null, "https://oldschool.runescape.wiki/w/Bedroom")),
      hotspot("curtain", "Curtains", { x: 22, y: 50 }, tier("opulent-curtains", "Opulent curtains", null, "https://oldschool.runescape.wiki/w/Bedroom")),
      hotspot("dresser", "Dresser", { x: 72, y: 55 }, tier("oak-dresser", "Oak dresser", null, "https://oldschool.runescape.wiki/w/Bedroom")),
      hotspot("fireplace", "Fireplace", { x: 50, y: 22 }, tier("marble-fireplace", "Marble fireplace", null, "https://oldschool.runescape.wiki/w/Bedroom")),
      hotspot("rug", "Rug", { x: 48, y: 62 }, tier("opulent-rug", "Opulent rug", null, "https://oldschool.runescape.wiki/w/Bedroom")),
      hotspot("wardrobe", "Wardrobe", { x: 24, y: 74 }, tier("gilded-wardrobe", "Gilded wardrobe", null, "https://oldschool.runescape.wiki/w/Bedroom")),
    ],
  }),
  room({
    id: "skill-hall",
    name: "Skill hall",
    shortName: "Skill hall",
    level: 25,
    cost: 15000,
    doorCode: "nesw",
    source: "https://oldschool.runescape.wiki/w/Hall_(skill_trophies)",
    placement: GROUND_OR_UPPER,
    floorColor: "#3d4a5c",
    hotspots: [
      hotspot("armour", "Armour", { x: 26, y: 30 }, tier("gold-armour", "Gold decorative armour", null, "https://oldschool.runescape.wiki/w/Hall_(skill_trophies)")),
      hotspot("head-trophy", "Head trophy", { x: 74, y: 28 }, tier("mounted-head", "Mounted head", null, "https://oldschool.runescape.wiki/w/Hall_(skill_trophies)")),
      hotspot("fishing-trophy", "Fishing trophy", { x: 74, y: 70 }, tier("mounted-bass", "Mounted bass", null, "https://oldschool.runescape.wiki/w/Hall_(skill_trophies)")),
      hotspot("rug", "Rug", { x: 50, y: 52 }, tier("opulent-rug", "Opulent rug", null, "https://oldschool.runescape.wiki/w/Hall_(skill_trophies)")),
      hotspot("rune-case", "Rune case", { x: 26, y: 70 }, tier("rune-case-2", "Rune case", null, "https://oldschool.runescape.wiki/w/Hall_(skill_trophies)")),
      hotspot("stair", "Stairs", { x: 50, y: 28 }, tier("marble-spiral", "Marble spiral staircase", null, "https://oldschool.runescape.wiki/w/Hall_(skill_trophies)")),
    ],
  }),
  room({
    id: "league-hall",
    name: "League hall",
    shortName: "League hall",
    level: 27,
    cost: 15000,
    doorCode: "esw",
    source: "https://oldschool.runescape.wiki/w/League_hall",
    placement: GROUND_OR_UPPER,
    uniqueGroup: "league-hall",
    floorColor: "#3c3f66",
    hotspots: [
      hotspot("banner", "Banner stand", { x: 22, y: 28 }, tier("banner-stand", "Banner stand", null, "https://oldschool.runescape.wiki/w/League_hall")),
      hotspot("rug", "Rug", { x: 50, y: 58 }, tier("opulent-rug", "Opulent rug", null, "https://oldschool.runescape.wiki/w/League_hall")),
      hotspot("outfit", "Outfit stand", { x: 30, y: 70 }, tier("outfit-stand", "Outfit stand", null, "https://oldschool.runescape.wiki/w/League_hall")),
      hotspot("pedestal", "Pedestal", { x: 50, y: 34 }, tier("pedestal", "League pedestal", null, "https://oldschool.runescape.wiki/w/League_hall")),
      hotspot("scroll", "Accomplishment scroll", { x: 74, y: 30 }, tier("accomplishment-scroll", "Accomplishment scroll", null, "https://oldschool.runescape.wiki/w/League_hall")),
      hotspot("statue", "Statue", { x: 78, y: 68 }, tier("league-statue", "League statue", null, "https://oldschool.runescape.wiki/w/League_hall")),
      hotspot("trophy-case", "Trophy case", { x: 50, y: 20 }, tier("trophy-case", "Trophy case", null, "https://oldschool.runescape.wiki/w/League_hall")),
    ],
  }),
  room({
    id: "games-room",
    name: "Games room",
    shortName: "Games room",
    level: 30,
    cost: 25000,
    doorCode: "esw",
    source: "https://oldschool.runescape.wiki/w/Games_room",
    placement: GROUND_OR_UPPER,
    uniqueGroup: "games-room",
    floorColor: "#3f5a48",
    hotspots: [
      hotspot("elemental-balance", "Elemental balance", { x: 28, y: 36 }, tier("elemental-balance", "Elemental balance", null, "https://oldschool.runescape.wiki/w/Games_room")),
      hotspot("game", "Game", { x: 62, y: 40 }, tier("runeversi", "Runeversi", null, "https://oldschool.runescape.wiki/w/Games_room")),
      hotspot("prize-chest", "Prize chest", { x: 76, y: 70 }, tier("prize-chest", "Prize chest", null, "https://oldschool.runescape.wiki/w/Games_room")),
      hotspot("ranging", "Ranging game", { x: 30, y: 70 }, tier("archery-target", "Archery target", null, "https://oldschool.runescape.wiki/w/Games_room")),
      hotspot("stone", "Stone", { x: 50, y: 24 }, tier("attack-stone", "Attack stone", null, "https://oldschool.runescape.wiki/w/Games_room")),
    ],
  }),
  room({
    id: "combat-room",
    name: "Combat room",
    shortName: "Combat room",
    level: 32,
    cost: 25000,
    doorCode: "esw",
    source: "https://oldschool.runescape.wiki/w/Combat_room",
    placement: GROUND_OR_UPPER,
    floorColor: "#5a3a3a",
    hotspots: [
      hotspot("dummy", "Combat dummy", { x: 24, y: 32 }, tier("combat-dummy", "Combat dummy", null, "https://oldschool.runescape.wiki/w/Combat_room")),
      hotspot("ring", "Combat ring", { x: 52, y: 54 }, tier("magical-balance", "Combat ring", null, "https://oldschool.runescape.wiki/w/Combat_room")),
      hotspot("decoration", "Decoration", { x: 76, y: 28 }, tier("oak-decoration", "Oak decoration", null, "https://oldschool.runescape.wiki/w/Combat_room")),
      hotspot("storage", "Storage", { x: 76, y: 72 }, tier("gilded-box", "Storage chest", null, "https://oldschool.runescape.wiki/w/Combat_room")),
    ],
  }),
  room({
    id: "quest-hall",
    name: "Quest hall",
    shortName: "Quest hall",
    level: 35,
    cost: 25000,
    doorCode: "nesw",
    source: "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)",
    placement: GROUND_OR_UPPER,
    floorColor: "#2f4a3c",
    hotspots: [
      hotspot("bookcase", "Bookcase", { x: 22, y: 26 }, tier("mahogany-bookcase", "Mahogany bookcase", null, "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)")),
      hotspot("guild-trophy", "Guild trophy", { x: 50, y: 24 }, tier("mounted-glory", "Mounted amulet of glory", null, "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)")),
      hotspot("landscape", "Landscape", { x: 78, y: 28 }, tier("landscape", "Landscape", null, "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)")),
      hotspot("map", "Map", { x: 78, y: 70 }, tier("map", "Map", null, "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)")),
      hotspot("portrait", "Portrait", { x: 22, y: 70 }, tier("portrait", "Portrait", null, "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)")),
      hotspot("rug", "Rug", { x: 50, y: 56 }, tier("opulent-rug", "Opulent rug", null, "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)")),
      hotspot("stair", "Stairs", { x: 34, y: 46 }, tier("marble-spiral", "Marble spiral staircase", null, "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)")),
      hotspot("sword", "Sword", { x: 66, y: 72 }, tier("mounted-sword", "Mounted sword", null, "https://oldschool.runescape.wiki/w/Hall_(quest_trophies)")),
    ],
  }),
  room({
    id: "menagerie-indoor",
    name: "Menagerie (indoor)",
    shortName: "Menagerie",
    level: 37,
    cost: 30000,
    doorCode: "nesw",
    source: "https://oldschool.runescape.wiki/w/Menagerie",
    placement: {
      floors: ["ground", "upper"],
      outdoor: false,
      note: "Indoor menagerie. The wiki page has one Infobox Room with versions Indoor and Outdoor, both using doors = nesw. Only one menagerie can exist; building the other variant moves this room. Switching indoor/outdoor is done from a door hotspot, not the house viewer.",
    },
    uniqueGroup: "menagerie",
    floorColor: "#5a4a38",
    hotspots: menagerieHotspots("https://oldschool.runescape.wiki/w/Menagerie", false),
  }),
  room({
    id: "menagerie-outdoor",
    name: "Menagerie (outdoor)",
    shortName: "Menagerie",
    level: 37,
    cost: 30000,
    doorCode: "nesw",
    source: "https://oldschool.runescape.wiki/w/Menagerie",
    placement: {
      floors: ["ground"],
      outdoor: true,
      note: "Outdoor menagerie. Same door code as the indoor variant (infobox doors = nesw, not split per version). Ground floor only, like other outdoor rooms. Only one menagerie can exist at a time.",
    },
    uniqueGroup: "menagerie",
    floorColor: "#3f7a40",
    hotspots: menagerieHotspots("https://oldschool.runescape.wiki/w/Menagerie", true),
  }),
  room({
    id: "study",
    name: "Study",
    shortName: "Study",
    level: 40,
    cost: 50000,
    doorCode: "esw",
    source: "https://oldschool.runescape.wiki/w/Study",
    placement: GROUND_OR_UPPER,
    floorColor: "#2c3f66",
    hotspots: [
      hotspot("bookcase", "Bookcase", { x: 22, y: 70 }, tier("mahogany-bookcase", "Mahogany bookcase", null, "https://oldschool.runescape.wiki/w/Study")),
      hotspot("crystal-ball", "Crystal ball", { x: 74, y: 68 }, tier("crystal-ball", "Crystal ball", null, "https://oldschool.runescape.wiki/w/Study")),
      hotspot("globe", "Globe", { x: 28, y: 40 }, tier("globe", "Globe", null, "https://oldschool.runescape.wiki/w/Study")),
      hotspot(
        "lectern",
        "Lectern",
        { x: 50, y: 28 },
        tier("marble-lectern", "Marble lectern", 77, "https://oldschool.runescape.wiki/w/Study", true),
      ),
      hotspot("telescope", "Telescope", { x: 74, y: 36 }, tier("telescope", "Telescope", null, "https://oldschool.runescape.wiki/w/Study")),
      hotspot(
        "tea",
        "Tea (from shelves / lectern supplies)",
        { x: 36, y: 62 },
        tier("tea", "Cup of tea", null, POH),
        {
          anchorNote:
            "The study page's hotspots are bookcase, crystal ball, globe, lectern, telescope, and wall chart. Tea is made with kitchen supplies and is drawn here as the clan guide's lectern/tea marker, not as its own study hotspot.",
        },
      ),
      hotspot("wall-chart", "Wall chart", { x: 22, y: 24 }, tier("wall-chart", "Wall chart", null, "https://oldschool.runescape.wiki/w/Study")),
    ],
  }),
  room({
    id: "costume-room",
    name: "Costume room",
    shortName: "Costume room",
    level: 42,
    cost: 50000,
    doorCode: "s",
    source: "https://oldschool.runescape.wiki/w/Costume_room",
    placement: {
      ...GROUND_OR_UPPER,
      note: "Indoor room with a single door (infobox doors = s). Only one costume room is allowed. In game it cannot be removed until stored items are taken out. The planner does not enforce that removal rule.",
    },
    uniqueGroup: "costume-room",
    floorColor: "#4a3b55",
    hotspots: [
      hotspot("armour-case", "Armour case", { x: 28, y: 32 }, tier("mahogany-armour-case", "Mahogany armour case", 82, "https://oldschool.runescape.wiki/w/Costume_room", true)),
      hotspot("cape-rack", "Cape rack", { x: 50, y: 26 }, tier("magical-cape-rack", "Magical cape rack", 99, "https://oldschool.runescape.wiki/w/Costume_room", true)),
      hotspot("fancy-dress", "Fancy dress box", { x: 74, y: 34 }, tier("mahogany-fancy-dress-box", "Mahogany fancy dress box", 80, "https://oldschool.runescape.wiki/w/Costume_room", true)),
      hotspot("magic-wardrobe", "Magic wardrobe", { x: 26, y: 62 }, tier("marble-magic-wardrobe", "Marble magic wardrobe", 96, "https://oldschool.runescape.wiki/w/Costume_room", true)),
      hotspot("toy-box", "Toy box", { x: 74, y: 62 }, tier("mahogany-toy-box", "Mahogany toy box", 86, "https://oldschool.runescape.wiki/w/Costume_room", true)),
      hotspot("treasure-chest", "Treasure chest", { x: 50, y: 70 }, tier("mahogany-treasure-chest", "Mahogany treasure chest", 84, "https://oldschool.runescape.wiki/w/Costume_room", true)),
    ],
  }),
  room({
    id: "chapel",
    name: "Chapel",
    shortName: "Chapel",
    level: 45,
    cost: 50000,
    doorCode: "es",
    source: "https://oldschool.runescape.wiki/w/Chapel",
    placement: GROUND_OR_UPPER,
    floorColor: "#1d3d72",
    hotspots: [
      hotspot(
        "altar",
        "Altar",
        { x: 50, y: 22 },
        tier("gilded-altar", "Gilded altar", 75, "https://oldschool.runescape.wiki/w/Chapel", true),
        {
          anchorNote:
            "Default doors are east and south (infobox `doors = es`), so the solid walls are north and west. The altar is drawn on the north wall. That is the orientation that makes a 270° clockwise rotation put the altar on the west wall and a door on the north — the G I Clickerz chapel (altar sideways to the entry door). The chapel wiki page does not publish altar tile coordinates; this anchor is derived from that rotation requirement, not measured from the game cache.",
        },
      ),
      hotspot("lamp", "Lamps", { x: 30, y: 36 }, tier("marble-burner", "Marble incense burner", null, "https://oldschool.runescape.wiki/w/Chapel"), {
        anchorNote: "The chapel has two lamp hotspots that are built as one purchase. Both burners are drawn flanking the altar. Tile coordinates are not on the wiki.",
      }),
      hotspot("icon", "Icon", { x: 24, y: 70 }, tier("gilded-icon", "Icon", null, "https://oldschool.runescape.wiki/w/Chapel")),
      hotspot("statue", "Statue", { x: 76, y: 48 }, tier("statue", "Statue", null, "https://oldschool.runescape.wiki/w/Chapel")),
      hotspot("musical", "Musical", { x: 76, y: 72 }, tier("organ", "Organ", null, "https://oldschool.runescape.wiki/w/Chapel")),
      hotspot("rug", "Rug", { x: 48, y: 58 }, tier("opulent-rug", "Opulent rug", null, "https://oldschool.runescape.wiki/w/Chapel")),
      hotspot("window", "Window", { x: 22, y: 48 }, tier("window", "Stained window", null, "https://oldschool.runescape.wiki/w/Chapel")),
    ],
  }),
  room({
    id: "portal-chamber",
    name: "Portal chamber",
    shortName: "Portals",
    level: 50,
    cost: 100000,
    doorCode: "s",
    source: "https://oldschool.runescape.wiki/w/Portal_chamber",
    placement: GROUND_OR_UPPER,
    floorColor: "#2a2748",
    hotspots: [
      hotspot("centrepiece", "Centrepiece", { x: 50, y: 52 }, tier("scrying-pool", "Scrying pool", null, "https://oldschool.runescape.wiki/w/Portal_chamber")),
      hotspot(
        "portal1",
        "Portal 1",
        { x: 22, y: 50 },
        tier("marble-portal", "Marble portal", 80, "https://oldschool.runescape.wiki/w/Portal_chamber", true),
        {
          anchorVerified: true,
          anchorNote:
            "Wiki (Portal chamber § Directing a portal): the centrepiece lists portals 1 to 3. Location 1 is the portal to the left of the door when walking in. The default door is south, so walking in faces north and the left-hand portal is on the west wall. Marble portal is level 80; a Raging echoes scroll can restyle an existing marble portal and is not a separate construction level.",
        },
      ),
      hotspot(
        "portal2",
        "Portal 2",
        { x: 50, y: 24 },
        tier("marble-portal", "Marble portal", 80, "https://oldschool.runescape.wiki/w/Portal_chamber", true),
        {
          anchorNote:
            "The wiki names portal 1 (left of the door) and portal 3 (right of the door) but does not spell out portal 2's wall. With the only door on the south, the remaining wall opposite the door is north, so portal 2 is drawn there.",
        },
      ),
      hotspot(
        "portal3",
        "Portal 3",
        { x: 78, y: 50 },
        tier("marble-portal", "Marble portal", 80, "https://oldschool.runescape.wiki/w/Portal_chamber", true),
        {
          anchorVerified: true,
          anchorNote:
            "Wiki: location 3 is the portal to the right of the door when walking in. Default door is south, so the right-hand portal is on the east wall.",
        },
      ),
    ],
  }),
  room({
    id: "formal-garden",
    name: "Formal garden",
    shortName: "Formal garden",
    level: 55,
    cost: 75000,
    doorCode: "nesw",
    source: "https://oldschool.runescape.wiki/w/Formal_garden",
    placement: GROUND_OUTDOOR,
    floorColor: "#2f6b45",
    hasExitPortal: true,
    hotspots: [
      hotspot("big-plant", "Big plant", { x: 24, y: 30 }, tier("sunflower", "Sunflower", null, "https://oldschool.runescape.wiki/w/Formal_garden")),
      hotspot("big-plant-2", "Big plant 2", { x: 76, y: 30 }, tier("sunflower", "Sunflower", null, "https://oldschool.runescape.wiki/w/Formal_garden")),
      hotspot(
        "centrepiece",
        "Centrepiece (exit portal)",
        { x: 62, y: 64 },
        tier("exit-portal", "Exit portal", null, "https://oldschool.runescape.wiki/w/Formal_garden"),
        {
          anchorNote:
            "Formal gardens can hold the exit portal in the centrepiece space. The wiki does not state the default corner. Drawn south-east, same convention as the entry garden.",
        },
      ),
      hotspot("fencing", "Fencing", { x: 50, y: 18 }, tier("marble-wall", "Marble wall", null, "https://oldschool.runescape.wiki/w/Formal_garden")),
      hotspot("hedging", "Hedging", { x: 18, y: 50 }, tier("box-hedge", "Box hedge", null, "https://oldschool.runescape.wiki/w/Formal_garden")),
      hotspot("small-plant", "Small plant", { x: 36, y: 42 }, tier("rose", "Rose", null, "https://oldschool.runescape.wiki/w/Formal_garden")),
      hotspot("small-plant-2", "Small plant 2", { x: 64, y: 40 }, tier("rose", "Rose", null, "https://oldschool.runescape.wiki/w/Formal_garden")),
      hotspot("tip-jar", "Tip jar", { x: 78, y: 74 }, tier("tip-jar", "Tip jar", null, "https://oldschool.runescape.wiki/w/Formal_garden")),
    ],
  }),
  room({
    id: "throne-room",
    name: "Throne room",
    shortName: "Throne room",
    level: 60,
    cost: 150000,
    doorCode: "s",
    source: "https://oldschool.runescape.wiki/w/Throne_room",
    placement: GROUND_OR_UPPER,
    floorColor: "#6a2430",
    hotspots: [
      hotspot("decoration", "Decoration", { x: 22, y: 36 }, tier("oak-decoration", "Decoration", null, "https://oldschool.runescape.wiki/w/Throne_room")),
      hotspot("floor", "Floor", { x: 50, y: 62 }, tier("floor-decoration", "Floor decoration", null, "https://oldschool.runescape.wiki/w/Throne_room")),
      hotspot("lever", "Lever", { x: 78, y: 36 }, tier("lever", "Challenge lever", null, "https://oldschool.runescape.wiki/w/Throne_room")),
      hotspot("seating", "Seating", { x: 30, y: 70 }, tier("throne-bench", "Seating", null, "https://oldschool.runescape.wiki/w/Throne_room")),
      hotspot("throne", "Throne", { x: 50, y: 28 }, tier("gilded-throne", "Gilded throne", null, "https://oldschool.runescape.wiki/w/Throne_room")),
      hotspot("trapdoor", "Trapdoor", { x: 68, y: 70 }, tier("trapdoor", "Oubliette trapdoor", null, "https://oldschool.runescape.wiki/w/Throne_room")),
    ],
  }),
  room({
    id: "oubliette",
    name: "Oubliette",
    shortName: "Oubliette",
    level: 65,
    cost: 150000,
    doorCode: "nesw",
    source: "https://oldschool.runescape.wiki/w/Oubliette",
    placement: DUNGEON_ONLY,
    floorColor: "#3a2a28",
    hotspots: [
      hotspot("decoration", "Decoration", { x: 22, y: 28 }, tier("decorative-blood", "Decorative blood", null, "https://oldschool.runescape.wiki/w/Oubliette")),
      hotspot("floor", "Floor", { x: 50, y: 50 }, tier("floor", "Floor space", null, "https://oldschool.runescape.wiki/w/Oubliette")),
      hotspot("guard", "Guard", { x: 28, y: 70 }, tier("guard", "Guard", null, "https://oldschool.runescape.wiki/w/Oubliette")),
      hotspot("ladder", "Ladder", { x: 72, y: 30 }, tier("ladder", "Ladder", null, "https://oldschool.runescape.wiki/w/Oubliette")),
      hotspot("lighting", "Lighting", { x: 74, y: 70 }, tier("lighting", "Lighting", null, "https://oldschool.runescape.wiki/w/Oubliette")),
      hotspot("prison", "Prison", { x: 50, y: 48 }, tier("cage", "Cage", null, "https://oldschool.runescape.wiki/w/Oubliette")),
    ],
  }),
  room({
    id: "superior-garden",
    name: "Superior garden",
    shortName: "Superior garden",
    level: 65,
    cost: 75000,
    doorCode: "nesw",
    source: "https://oldschool.runescape.wiki/w/Superior_garden",
    placement: {
      ...GROUND_OUTDOOR,
      note: "Outdoor room, ground floor only. A house can have more than one superior garden. Teleports from a spirit tree or fairy ring arrive at the first superior garden that was built.",
    },
    floorColor: "#2f7a3c",
    hotspots: [
      hotspot("fence", "Fence", { x: 50, y: 16 }, tier("marble-wall", "Marble wall", null, "https://oldschool.runescape.wiki/w/Superior_garden")),
      hotspot(
        "pool",
        "Pool",
        { x: 76, y: 48 },
        tier("ornate-pool", "Ornate rejuvenation pool", 90, "https://oldschool.runescape.wiki/w/Superior_garden", true),
        {
          anchorNote:
            "Drawn on the east side so rotation 0 matches the G I Clickerz guide (pool on the east wall, beside the entry garden). Ornate rejuvenation pool is level 90 on the superior garden page. The wiki does not publish which wall the pool hotspot occupies before rotation.",
        },
      ),
      hotspot(
        "teleport",
        "Teleport space",
        { x: 24, y: 36 },
        tier("spirit-tree-fairy", "Spirit tree & fairy ring", 95, POH, true),
        {
          anchorNote:
            "Spirit tree & fairy ring is the max teleport in this space (level 95 on the Player-owned house 'Max houses' table; the crystal saw cannot be used). Drawn on the west side, opposite the pool, per the clan guide. Wall choice is not stated on the wiki.",
        },
      ),
      hotspot("theme", "Theme", { x: 28, y: 68 }, tier("volcanic-theme", "Theme", null, "https://oldschool.runescape.wiki/w/Superior_garden")),
      hotspot("topiary", "Topiary", { x: 48, y: 70 }, tier("topiary", "Topiary", null, "https://oldschool.runescape.wiki/w/Superior_garden")),
      hotspot("seating", "Seating", { x: 70, y: 74 }, tier("teak-bench", "Seating", null, "https://oldschool.runescape.wiki/w/Superior_garden")),
      hotspot("seating-2", "Seating 2", { x: 58, y: 28 }, tier("teak-bench", "Seating", null, "https://oldschool.runescape.wiki/w/Superior_garden")),
    ],
  }),
  room({
    id: "dungeon-corridor",
    name: "Dungeon corridor",
    shortName: "Corridor",
    level: 70,
    cost: 7500,
    doorCode: "ew",
    source: "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
    placement: DUNGEON_ONLY,
    floorColor: "#4a342c",
    doorSourceNote:
      "The Dungeon (Construction) infobox lists three versions. Corridor doors are `doors1 = ew` (east and west). Template:POH room/doors instead hardcodes 'dungeon corridor' as 1010, a north–south hallway — the same two-door corridor turned 90°. This planner's default orientation follows the room infobox (east–west).",
    hotspots: dungeonHotspots("corridor"),
  }),
  room({
    id: "dungeon-junction",
    name: "Dungeon junction",
    shortName: "Junction",
    level: 70,
    cost: 7500,
    doorCode: "nesw",
    source: "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
    placement: DUNGEON_ONLY,
    floorColor: "#4a342c",
    doorSourceNote:
      "Infobox version 'Cross' (`name2 = Dungeon cross`, `doors2 = nesw`). The page is also linked as Dungeon junction. Four doors, one on each side.",
    hotspots: dungeonHotspots("junction"),
  }),
  room({
    id: "dungeon-stairs",
    name: "Dungeon stairs",
    shortName: "D. stairs",
    level: 70,
    cost: 7500,
    doorCode: "nesw",
    source: "https://oldschool.runescape.wiki/w/Dungeon_(Construction)",
    placement: DUNGEON_ONLY,
    floorColor: "#4a342c",
    doorSourceNote:
      "Infobox version 'Stairs' (`doors3 = nesw`). Four doors. The staircase hotspot in this room lines up with a staircase built in the skill hall or quest hall above when both rooms face the same way.",
    hotspots: dungeonHotspots("stairs"),
  }),
  room({
    id: "portal-nexus",
    name: "Portal nexus",
    shortName: "Portal nexus",
    level: 72,
    cost: 200000,
    doorCode: "nesw",
    source: "https://oldschool.runescape.wiki/w/Portal_nexus",
    placement: {
      ...GROUND_OR_UPPER,
      note: "Indoor room with a door on every side (infobox doors = nesw). Only one portal nexus room can be built.",
    },
    uniqueGroup: "portal-nexus",
    floorColor: "#241833",
    hotspots: [
      hotspot("amulet", "Amulet", { x: 74, y: 28 }, tier("mounted-xeric", "Mounted xeric's talisman", null, "https://oldschool.runescape.wiki/w/Portal_nexus")),
      hotspot("curtain", "Curtains", { x: 26, y: 26 }, tier("opulent-curtains", "Opulent curtains", null, "https://oldschool.runescape.wiki/w/Portal_nexus")),
      hotspot("rug", "Rug", { x: 58, y: 62 }, tier("opulent-rug", "Opulent rug", null, "https://oldschool.runescape.wiki/w/Portal_nexus")),
      hotspot(
        "nexus",
        "Portal nexus",
        { x: 28, y: 52 },
        tier("crystalline-nexus", "Crystalline portal nexus", 92, "https://oldschool.runescape.wiki/w/Portal_nexus", true),
        {
          anchorNote:
            "Drawn on the west side so rotation 0 matches the G I Clickerz guide (nexus on the west wall, beside the entry garden). Crystalline portal nexus is level 92 on the portal nexus page. The wiki does not state which wall the hotspot starts on.",
        },
      ),
    ],
  }),
  room({
    id: "treasure-room",
    name: "Treasure room",
    shortName: "Treasure",
    level: 75,
    cost: 250000,
    doorCode: "s",
    source: "https://oldschool.runescape.wiki/w/Treasure_room",
    placement: DUNGEON_ONLY,
    floorColor: "#3a3224",
    hotspots: [
      hotspot("decoration", "Decoration", { x: 24, y: 32 }, tier("hanging-skeleton", "Hanging skeleton", null, "https://oldschool.runescape.wiki/w/Treasure_room")),
      hotspot("door", "Door", { x: 50, y: 78 }, tier("marble-door", "Marble door", 94, "https://oldschool.runescape.wiki/w/Treasure_room", true), {
        anchorNote: "The treasure room's only entrance is the south door (infobox doors = s). The marble door (level 94 on the treasure room page) is drawn in that doorway. It is a furniture hotspot on the entrance, separate from the room's door layout.",
      }),
      hotspot("lighting", "Lighting", { x: 76, y: 32 }, tier("lighting", "Lighting", null, "https://oldschool.runescape.wiki/w/Treasure_room")),
      hotspot("monster", "Monster", { x: 50, y: 48 }, tier("guardian", "Treasure guardian", null, "https://oldschool.runescape.wiki/w/Treasure_room")),
      hotspot("treasure", "Treasure", { x: 50, y: 28 }, tier("treasure-chest", "Treasure chest", null, "https://oldschool.runescape.wiki/w/Treasure_room")),
    ],
  }),
  room({
    id: "achievement-gallery",
    name: "Achievement gallery",
    shortName: "Gallery",
    level: 80,
    cost: 200000,
    doorCode: "ns",
    source: "https://oldschool.runescape.wiki/w/Achievement_gallery",
    placement: {
      ...GROUND_OR_UPPER,
      note: "Indoor hallway (infobox doors = ns, north and south only). Only one achievement gallery can be built. The crystal saw cannot be used to boost the room itself.",
    },
    uniqueGroup: "achievement-gallery",
    floorColor: "#6a2434",
    hotspots: [
      hotspot("adventure-log", "Adventure log", { x: 24, y: 58 }, tier("gilded-adventure-log", "Gilded adventure log", null, "https://oldschool.runescape.wiki/w/Achievement_gallery")),
      hotspot("altar", "Altar", { x: 74, y: 62 }, tier("occult-altar", "Occult altar", 90, "https://oldschool.runescape.wiki/w/Achievement_gallery", true)),
      hotspot("boss-lair", "Boss lair display", { x: 26, y: 32 }, tier("boss-lair", "Boss lair display", null, "https://oldschool.runescape.wiki/w/Achievement_gallery")),
      hotspot("display", "Display", { x: 74, y: 34 }, tier("display", "Display", null, "https://oldschool.runescape.wiki/w/Achievement_gallery")),
      hotspot(
        "jewellery-box",
        "Jewellery box",
        { x: 50, y: 30 },
        tier("ornate-jewellery-box", "Ornate jewellery box", 91, "https://oldschool.runescape.wiki/w/Achievement_gallery", true),
        {
          anchorNote:
            "Drawn at the north end of the default north–south hallway so rotation 0 faces the north door, matching the G I Clickerz guide. Ornate jewellery box is level 91 on the achievement gallery page. The wiki does not state which end of the hall the box occupies.",
        },
      ),
      hotspot("quest-list", "Quest list", { x: 50, y: 72 }, tier("quest-list", "Quest list", null, "https://oldschool.runescape.wiki/w/Achievement_gallery")),
    ],
  }),
];

function menagerieHotspots(source, outdoor) {
  return [
    hotspot("arena", "Arena", { x: 50, y: 36 }, tier("arena", "Pet arena", null, source)),
    hotspot("habitat", "Habitat", { x: 28, y: 28 }, tier(outdoor ? "garden-habitat" : "indoor-habitat", outdoor ? "Outdoor habitat" : "Indoor habitat", null, source)),
    hotspot("pet-feeder", "Pet feeder", { x: 74, y: 30 }, tier("oak-feeder", "Pet feeder", null, source)),
    hotspot("pet-house", "Pet house", { x: 28, y: 68 }, tier("mahogany-pet-house", "Pet house", null, source)),
    hotspot("pet-list", "Pet list", { x: 72, y: 68 }, tier("pet-list", "Pet list", null, source)),
    hotspot("scratching-post", "Scratching post", { x: 50, y: 70 }, tier("scratching-post", "Scratching post", null, source)),
  ];
}

function dungeonHotspots(kind) {
  const source = "https://oldschool.runescape.wiki/w/Dungeon_(Construction)";
  const shared = [
    hotspot("decoration", "Decoration", { x: 22, y: 28 }, tier("decorative-blood", "Decorative blood", null, source)),
    hotspot("door", "Door", { x: kind === "corridor" ? 92 : 50, y: kind === "corridor" ? 50 : 84 }, tier("marble-door", "Marble door", 94, source, true), {
      anchorNote: "Dungeon doors (oak / steel-plated / marble) are furniture built in a door space. Marble door is level 94 on the dungeon page. The doorway itself is the room door layout; the marble door is drawn in one of those openings.",
    }),
    hotspot("guard", "Guard", { x: 30, y: 62 }, tier("skeleton-guard", "Skeleton guard", null, source)),
    hotspot("lighting", "Lighting", { x: 72, y: 28 }, tier("candle", "Lighting", null, source)),
    hotspot("rug", "Rug", { x: 50, y: 50 }, tier("rug", "Rug", null, source)),
    hotspot("trap", "Trap", { x: 68, y: 68 }, tier("trap", "Trap", null, source)),
  ];
  if (kind === "stairs") {
    shared.push(hotspot("stair", "Stairs", { x: 50, y: 42 }, tier("marble-staircase", "Marble staircase", null, source)));
  }
  return shared;
}

for (const builtRoom of ROOMS) {
  for (const spot of builtRoom.hotspots) {
    const tiers = FURNITURE[`${builtRoom.id}:${spot.id}`];
    if (tiers?.length) spot.tiers = tiers;
  }
}

export const ROOM_BY_ID = Object.fromEntries(ROOMS.map((entry) => [entry.id, entry]));

export const FLOORS = [
  {
    id: "upper",
    name: "Upper floor",
    implemented: true,
    note: "Start on top of a skill hall or quest hall with a staircase built, then build across other indoor rooms. Outdoor rooms cannot hold an upper floor.",
  },
  {
    id: "ground",
    name: "Ground floor",
    implemented: true,
    note: "The 9×9 yard. North is the top of the grid.",
  },
  {
    id: "dungeon",
    name: "Dungeon",
    implemented: true,
    note: "Start directly under a garden or formal garden with a dungeon entrance built. After that, rooms can extend in any direction.",
  },
];

export const GRID_SIZE = 9;

export function formatCoins(amount) {
  return `${amount.toLocaleString("en-GB")} gp`;
}

export function doorLabel(doors) {
  const order = ["N", "E", "S", "W"];
  const present = order.filter((side) => doors.includes(side));
  if (present.length === 4) return "Doors on all four sides";
  if (present.length === 0) return "No doors";
  return `Doors: ${present.join(", ")}`;
}
