import { describe, expect, it } from "vitest";
import { calculateStudyStreak } from "./routers/learning";

describe("sequência de estudo", () => {
  it("conta dias consecutivos de actividade, incluindo hoje", () => {
    const now = new Date("2026-08-12T12:00:00.000Z");
    expect(calculateStudyStreak([new Date("2026-08-12T08:00:00.000Z"), new Date("2026-08-11T10:00:00.000Z"), new Date("2026-08-10T09:00:00.000Z")], now)).toBe(3);
  });

  it("usa ontem como início quando ainda não houve actividade hoje", () => {
    const now = new Date("2026-08-12T12:00:00.000Z");
    expect(calculateStudyStreak([new Date("2026-08-11T10:00:00.000Z"), new Date("2026-08-10T09:00:00.000Z")], now)).toBe(2);
  });
});
