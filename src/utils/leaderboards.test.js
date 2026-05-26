import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  describeClanActivity,
  formatCompactNumber,
  formatMetricName,
  formatPercentage,
  formatRelativeTime,
} from "./leaderboards";

describe("leaderboard formatting helpers", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-26T12:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("formats compact numbers and percentages", () => {
    expect(formatCompactNumber(null)).toBe("—");
    expect(formatCompactNumber(1_250, " xp")).toBe("1.3k xp");
    expect(formatCompactNumber(2_500_000, " gp")).toBe("2.5M gp");
    expect(formatCompactNumber(3_400_000_000)).toBe("3.4B");
    expect(formatPercentage(undefined)).toBe("—");
    expect(formatPercentage(0.456)).toBe("45.6%");
  });

  it("formats metric names and relative timestamps", () => {
    expect(formatMetricName("attack_xp")).toBe("Attack Xp");
    expect(formatRelativeTime()).toBe("Recently");
    expect(formatRelativeTime("not-a-date")).toBe("Recently");
    expect(formatRelativeTime("2026-05-26T11:45:00.000Z")).toBe("15m ago");
    expect(formatRelativeTime("2026-05-26T07:00:00.000Z")).toBe("5h ago");
    expect(formatRelativeTime("2026-05-23T12:00:00.000Z")).toBe("3d ago");
  });

  it("describes known clan activity types with safe fallbacks", () => {
    expect(
      describeClanActivity({
        type: "valuable_drop",
        data: { value: 12_500_000 },
        enriched: { itemName: "Twisted bow" },
      }),
    ).toEqual({
      icon: "💰",
      title: "Twisted bow",
      detail: "Valued around 12.5M gp",
    });

    expect(
      describeClanActivity({
        type: "xp_milestone",
        data: { name: "strength", xp: 99_000 },
        enriched: {},
      }),
    ).toEqual({
      icon: "✨",
      title: "Strength milestone",
      detail: "99.0k xp total XP",
    });

    expect(describeClanActivity({ type: "unknown", data: {}, enriched: {} })).toEqual({
      icon: "⭐",
      title: "Clan update",
      detail: "Fresh progress tracked on RuneProfile",
    });
  });
});
