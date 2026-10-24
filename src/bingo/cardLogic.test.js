import process from "node:process";
import { decodeCard, defaultCard, encodeCard, extractShareCode } from "./cardLogic.js";

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

let rejected = false;
try {
  decodeCard("x".repeat(12001));
} catch {
  rejected = true;
}
expect(rejected, "oversized share codes are rejected");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("ok bingo cards");
