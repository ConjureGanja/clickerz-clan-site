import process from "node:process";
import { normalizeLeaderboardRows } from "./clicking-leaderboard.js";

const failures = [];

function expect(condition, message) {
  if (!condition) failures.push(message);
}

const rows = normalizeLeaderboardRows([
  { id: "ok", name: "  Clicker\u0000 ", score: 12.4, date: "2026-01-02T00:00:00.000Z" },
  { id: "ok", name: "Second", score: 9, date: "not-a-date" },
  { name: "\u202Ehidden", score: 3, date: "2026-01-03T00:00:00.000Z" },
  { id: "zero", name: "Zero", score: 0 },
  { id: "huge", name: "Huge", score: 1e20 },
  { id: "bad", name: "Bad", score: "nope" },
  null,
]);

expect(rows.length === 4, `expected 4 kept rows, got ${rows.length}`);
expect(rows[0].id === "huge" && rows[0].score === 1_000_000_000, "scores are capped and sorted");
expect(rows.filter((row) => row.id === "ok").length === 1, "duplicate ids are rewritten");
expect(rows.every((row) => !row.name.includes("\u0000") && !row.name.includes("\u202E")), "names drop control and bidi characters");
expect(rows.find((row) => row.name === "Second")?.date === null, "invalid dates are dropped");
expect(rows.find((row) => row.name === "Clicker")?.score === 12, "fractional scores round");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("ok clicking leaderboard");
