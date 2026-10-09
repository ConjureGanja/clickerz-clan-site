// ─────────────────────────────────────────────────────────────
// Bingo task pool — every tile a card can hold.
//
// Think of this file as the clan bank: each entry is an item we own,
// and a bingo card is just an inventory of 16–35 items pulled out of it.
// To add a new task: drop a .webp into public/bingo/ named after the id,
// then add one line below. Nothing else needs to change.
//
// tier → which kind of player the task suits:
//   low  = early game / new members
//   mid  = mid game (slayer, mid bosses, minigames)
//   high = end game (raids, GWD, top-tier bosses)
// Item renders come from the Old School RuneScape Wiki (CC BY-NC-SA 3.0).
// ─────────────────────────────────────────────────────────────

const RAW_TASKS = [
  // ── Default card (order = the clan's original 6×4 layout) ──
  { id: "totem", t: "Complete Totem", h: "Finish a Vale Totem build", tier: "mid", cat: "Skilling" },
  { id: "whip", t: "Abyssal Whip", h: "Abyssal demon drop", tier: "mid", cat: "Drop" },
  { id: "jar", t: "Any Jar Drop", h: "Any boss jar", tier: "high", cat: "Drop" },
  { id: "bryo", t: "Bryo Essence", h: "Bryophyta drop", tier: "low", cat: "Drop" },
  { id: "thiev", t: "500K Thieving XP", h: "Gain 500k xp", tier: "low", cat: "Skilling" },
  { id: "venator", t: "3 Venator Shards", h: "Phantom Muspah", tier: "high", cat: "Drop" },
  { id: "cseed", t: "Any Crystal Seed", h: "Gauntlet / Zalcano", tier: "mid", cat: "Drop" },
  { id: "corp", t: "Corp Unique", h: "Any sigil or spirit shield", tier: "high", cat: "Drop" },
  { id: "fishxp", t: "500K Fishing XP", h: "Gain 500k xp", tier: "low", cat: "Skilling" },
  { id: "basjaw", t: "Basilisk Jaw", h: "Basilisk Knight drop", tier: "mid", cat: "Drop" },
  { id: "brim", t: "10 Brimstone Keys", h: "Konar slayer tasks", tier: "mid", cat: "Slayer" },
  { id: "rcxp", t: "500K Runecraft XP", h: "Gain 500k xp", tier: "low", cat: "Skilling" },
  { id: "gmaul", t: "Granite Maul", h: "Gargoyle drop", tier: "mid", cat: "Slayer" },
  { id: "medboots", t: "Medium Clue Boots", h: "Ranger, holy, wizard, spiked", tier: "low", cat: "Clue" },
  { id: "slayhead", t: "Slayer Head", h: "Any boss/slayer head", tier: "mid", cat: "Slayer" },
  { id: "dkrings", t: "All DK Rings", h: "Berserker, archer, seers, warrior", tier: "mid", cat: "Drop" },
  { id: "zulrah", t: "Zulrah Unique", h: "Fang, visage, onyx, scales jar", tier: "mid", cat: "Drop" },
  { id: "lootkeys", t: "Get 5 Loot Keys", h: "Wilderness PvP / PvM", tier: "mid", cat: "Wilderness" },
  { id: "gwd", t: "GWD Unique", h: "Any God Wars unique", tier: "high", cat: "Drop" },
  { id: "5m", t: "5M Drop", h: "Single drop worth 5m+", tier: "high", cat: "Drop" },
  { id: "grail", t: "Crystal Grail", h: "Song of the Elves reward", tier: "mid", cat: "Quest" },
  { id: "marks", t: "20 Marks of Grace", h: "Rooftop agility", tier: "low", cat: "Skilling" },
  { id: "craftxp", t: "500K Crafting XP", h: "Gain 500k xp", tier: "low", cat: "Skilling" },
  { id: "pet", t: "Any Pet", h: "Boss, skilling or minigame", tier: "high", cat: "Pet" },

  // ── Low level ──
  { id: "begclue", t: "10 Beginner Clues", h: "Complete 10 caskets", tier: "low", cat: "Clue" },
  { id: "easyclue", t: "Easy Clue Unique", h: "Any easy-tier unique", tier: "low", cat: "Clue" },
  { id: "fishbarrel", t: "Fish Barrel", h: "Tempoross reward", tier: "low", cat: "Minigame" },
  { id: "dmed", t: "Dragon Med Helm", h: "Any source", tier: "low", cat: "Drop" },
  { id: "moleclaw", t: "5 Mole Claws", h: "Giant Mole", tier: "low", cat: "Drop" },
  { id: "obor", t: "Obor Club", h: "Obor unique", tier: "low", cat: "Drop" },
  { id: "ddef", t: "Dragon Defender", h: "Warriors' Guild", tier: "low", cat: "Minigame" },
  { id: "tome", t: "Tome of Fire", h: "Wintertodt unique", tier: "low", cat: "Minigame" },
  { id: "needle", t: "Abyssal Needle", h: "Guardians of the Rift", tier: "low", cat: "Minigame" },
  { id: "rogue", t: "Rogue Outfit Piece", h: "Rogues' Den", tier: "low", cat: "Minigame" },
  { id: "graceful", t: "Full Graceful", h: "Buy every piece", tier: "low", cat: "Skilling" },
  { id: "torso", t: "Fighter Torso", h: "Barbarian Assault", tier: "low", cat: "Minigame" },
  { id: "agilxp", t: "500K Agility XP", h: "Gain 500k xp", tier: "low", cat: "Skilling" },
  { id: "warhelm", t: "Warrior Helm", h: "Fremennik Isles / DKs", tier: "low", cat: "Drop" },
  { id: "glory", t: "Craft a Glory", h: "Make an amulet of glory", tier: "low", cat: "Skilling" },
  { id: "runepouch", t: "Rune Pouch", h: "Buy or get from LMS", tier: "low", cat: "Minigame" },
  { id: "cudgel", t: "Sarachnis Cudgel", h: "Sarachnis unique", tier: "low", cat: "Drop" },

  // ── Mid level ──
  { id: "barrows", t: "Any Barrows Item", h: "Barrows chest", tier: "mid", cat: "Drop" },
  { id: "daxe", t: "Dragon Axe", h: "DKs or wildy bosses", tier: "mid", cat: "Drop" },
  { id: "wildyring", t: "Wildy Boss Ring", h: "Tyrannical / treasonous", tier: "mid", cat: "Wilderness" },
  { id: "tentacle", t: "Kraken Tentacle", h: "Kraken drop", tier: "mid", cat: "Slayer" },
  { id: "trident", t: "Trident of the Seas", h: "Cave kraken / Kraken", tier: "mid", cat: "Slayer" },
  { id: "occult", t: "Occult Necklace", h: "Smoke devil drop", tier: "mid", cat: "Slayer" },
  { id: "dwh", t: "Dragon Warhammer", h: "Lizardman shaman", tier: "mid", cat: "Drop" },
  { id: "bmask", t: "Black Mask", h: "Cave horror drop", tier: "mid", cat: "Slayer" },
  { id: "hardclue", t: "Hard Clue Unique", h: "Any hard-tier unique", tier: "mid", cat: "Clue" },
  { id: "moons", t: "Moons of Peril Unique", h: "Any Moons armour", tier: "mid", cat: "Drop" },
  { id: "zenyte", t: "Zenyte Shard", h: "Demonic gorillas", tier: "mid", cat: "Drop" },
  { id: "dpick", t: "Dragon Pickaxe", h: "Any source", tier: "mid", cat: "Drop" },
  { id: "slayxp", t: "500K Slayer XP", h: "Gain 500k xp", tier: "mid", cat: "Skilling" },
  { id: "ashards", t: "5 Ancient Shards", h: "Catacombs of Kourend", tier: "mid", cat: "Slayer" },
  { id: "adagger", t: "Abyssal Dagger", h: "Unsired / Sire", tier: "mid", cat: "Drop" },
  { id: "dchain", t: "Dragon Chainbody", h: "KQ / dust devils", tier: "mid", cat: "Drop" },
  { id: "dfh", t: "Dragon Full Helm", h: "Rare drop table", tier: "mid", cat: "Drop" },
  { id: "bgloves", t: "Barrows Gloves", h: "Recipe for Disaster", tier: "mid", cat: "Quest" },
  { id: "firecape", t: "Fire Cape", h: "TzHaar Fight Cave", tier: "mid", cat: "Minigame" },
  { id: "smoulder", t: "Cerberus Stone", h: "Smouldering stone", tier: "mid", cat: "Slayer" },

  // ── High level ──
  { id: "cox", t: "CoX Purple", h: "Chambers of Xeric", tier: "high", cat: "Raid" },
  { id: "tob", t: "ToB Purple", h: "Theatre of Blood", tier: "high", cat: "Raid" },
  { id: "toa", t: "ToA Purple", h: "Tombs of Amascut", tier: "high", cat: "Raid" },
  { id: "nex", t: "Nex Unique", h: "Torva, Nihil horn, Zaryte", tier: "high", cat: "Drop" },
  { id: "nm", t: "Nightmare Unique", h: "Inquisitor, orb, harmonised", tier: "high", cat: "Drop" },
  { id: "dbneck", t: "Dragonbone Necklace", h: "Vorkath unique", tier: "high", cat: "Drop" },
  { id: "hclaw", t: "Hydra's Claw", h: "Alchemical Hydra", tier: "high", cat: "Slayer" },
  { id: "cerb", t: "Cerberus Crystal", h: "Any crystal", tier: "high", cat: "Slayer" },
  { id: "infernal", t: "Infernal Cape", h: "The Inferno", tier: "high", cat: "Minigame" },
  { id: "quiver", t: "Dizana's Quiver", h: "Fortis Colosseum", tier: "high", cat: "Minigame" },
  { id: "virtus", t: "Any Virtus Piece", h: "DT2 bosses", tier: "high", cat: "Drop" },
  { id: "vestige", t: "Any DT2 Vestige", h: "DT2 bosses", tier: "high", cat: "Drop" },
  { id: "eseed", t: "Enhanced Seed", h: "Corrupted Gauntlet", tier: "high", cat: "Drop" },
  { id: "3a", t: "Any 3rd Age", h: "Clue scroll reward", tier: "high", cat: "Clue" },
  { id: "arax", t: "Araxxor Unique", h: "Fang, eye, jar, pet", tier: "high", cat: "Drop" },
  { id: "synapse", t: "Tormented Synapse", h: "Tormented Demons", tier: "high", cat: "Drop" },
  { id: "eliteclue", t: "Elite Clue Unique", h: "Any elite-tier unique", tier: "high", cat: "Clue" },
];

// Every image lives at public/bingo/<id>.webp, so the path is derived, not typed 78 times.
export const TASKS = RAW_TASKS.map((task) => ({ ...task, img: `/bingo/${task.id}.webp` }));

// id → task lookup. Like the GE item index: jump straight to the item instead of scrolling the list.
export const TASK_BY_ID = Object.fromEntries(TASKS.map((task) => [task.id, task]));

// The first 24 entries are the clan's original card.
export const DEFAULT_TASK_IDS = TASKS.slice(0, 24).map((task) => task.id);

// Tasks that need more than one of something. Everything else completes at 1.
export const DEFAULT_TARGETS = {
  venator: 3,
  brim: 10,
  lootkeys: 5,
  marks: 20,
  moleclaw: 5,
  begclue: 10,
  ashards: 5,
};

// Colors differ in lightness as well as hue so they stay readable for colour-blind members.
export const TIERS = {
  low: { label: "Low", color: "#6cc070" },
  mid: { label: "Mid", color: "#5aa9ff" },
  high: { label: "High", color: "#ff7a45" },
};

export const CARD_SIZES = [
  { cols: 6, rows: 4 },
  { cols: 5, rows: 5 },
  { cols: 4, rows: 4 },
  { cols: 7, rows: 5 },
];
