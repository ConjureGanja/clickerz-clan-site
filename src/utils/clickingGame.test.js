import { describe, expect, it, vi } from "vitest";
import {
  CLICKERZ_LEADERBOARD_KEY,
  CLICKERZ_SCORE_EVENT,
  CLICKERZ_SCORE_KEY,
  addClickScore,
  formatClickCount,
  readClickLeaderboard,
  readClickScore,
  saveClickLeaderboardEntry,
  writeClickScore,
} from "./clickingGame";

describe("clicking game helpers", () => {
  it("formats click counts for display", () => {
    expect(formatClickCount(1234567)).toBe("1,234,567");
    expect(formatClickCount()).toBe("0");
  });

  it("reads, writes, and increments safe local click scores", () => {
    const scoreChange = vi.fn();
    window.addEventListener(CLICKERZ_SCORE_EVENT, scoreChange);

    expect(readClickScore()).toBe(0);
    expect(writeClickScore(3.7)).toBe(4);
    expect(localStorage.getItem(CLICKERZ_SCORE_KEY)).toBe("4");
    expect(addClickScore(6)).toBe(10);
    expect(scoreChange).toHaveBeenLastCalledWith(expect.objectContaining({ detail: 10 }));

    localStorage.setItem(CLICKERZ_SCORE_KEY, "-100");
    expect(readClickScore()).toBe(0);
  });

  it("normalizes, sorts, and limits stored leaderboard rows", () => {
    localStorage.setItem(
      CLICKERZ_LEADERBOARD_KEY,
      JSON.stringify([
        { id: "low", name: "Low Score", score: 5, date: "2026-01-01T00:00:00.000Z" },
        { id: "bad-score", name: "Invalid", score: "nope" },
        { id: "high", name: "High Score With A Very Long Name", score: 42.2 },
        null,
      ]),
    );

    expect(readClickLeaderboard()).toEqual([
      expect.objectContaining({
        id: "high",
        name: "High Score With A Very L",
        score: 42,
      }),
      expect.objectContaining({
        id: "low",
        name: "Low Score",
        score: 5,
      }),
    ]);
  });

  it("saves anonymous leaderboard entries with sanitized scores", () => {
    const rows = saveClickLeaderboardEntry("   ", -12);

    expect(rows[0]).toEqual(
      expect.objectContaining({
        name: "Anonymous Clicker",
        score: 0,
      }),
    );
  });
});
