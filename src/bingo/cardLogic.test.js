import process from "node:process";
import { decodeCard, defaultCard, encodeCard, extractShareCode, MAX_SHARE_CODE_LENGTH, normalizeCard } from "./cardLogic.js";

const failures = [];

function expect(condition, message) {
  if (!condition) failures.push(message);
}

const card = defaultCard();
card.tiles[0].count = 1;
const decoded = decodeCard(encodeCard(card));
expect(decoded.name === card.name && decoded.cols === 6 && decoded.rows === 4, "share codes round-trip the default card");
expect(decoded.tiles[0].count === 1, "share codes keep tile progress");

const link = "https://clickerz.cc/bingo#card=abcDEF_12-zz";
expect(extractShareCode(link) === "abcDEF_12-zz", "share links keep only the card code");
expect(extractShareCode("abcDEF_12-zz") === "abcDEF_12-zz", "bare codes are accepted");
expect(extractShareCode("https://clickerz.cc/bingo") === "", "links without a card are rejected");

const title = "龍".repeat(40);
const hint = "龍".repeat(60);
const name = "龍".repeat(60);
const fullCard = {
  name,
  cols: 7,
  rows: 5,
  tiles: Array.from({ length: 35 }, () => ({
    taskId: "eliteclue",
    count: 12,
    target: 20,
    title,
    hint,
  })),
};
const fullCode = encodeCard(fullCard);
expect(fullCode.length > 12000 && fullCode.length <= MAX_SHARE_CODE_LENGTH, "a max 7x5 non-ASCII card fits the share limit");
const fullDecoded = decodeCard(fullCode);
expect(fullDecoded.cols === 7 && fullDecoded.rows === 5 && fullDecoded.tiles.length === 35, "a max 7x5 card keeps its grid");
expect(fullDecoded.name === name, "a max 7x5 card keeps a 60-character name");
expect(
  fullDecoded.tiles.every((tile) => tile.title === title && tile.hint === hint && tile.count === 12 && tile.target === 20 && tile.taskId === "eliteclue"),
  "a max 7x5 non-ASCII card round-trips titles, hints, and progress",
);
expect(extractShareCode(`https://clickerz.cc/bingo#card=${fullCode}`) === fullCode, "long share links are extracted whole");

const normalized = normalizeCard(fullCard);
expect(
  normalized
    && normalized.name === name
    && normalized.tiles.length === 35
    && normalized.tiles.every((tile) => tile.title === title && tile.hint === hint && tile.count === 12),
  "stored max cards normalize without a share-string length check",
);

let rejected = false;
try {
  decodeCard("x".repeat(MAX_SHARE_CODE_LENGTH + 1));
} catch {
  rejected = true;
}
expect(rejected, "oversized share codes are rejected");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("ok bingo cards");
