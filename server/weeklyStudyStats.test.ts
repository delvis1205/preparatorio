import { describe, expect, it } from "vitest";
import { buildWeeklyStudyStats } from "./routers/learning";

describe("buildWeeklyStudyStats", () => {
  it("agrega a duração por dia nos últimos sete dias", () => {
    const now = new Date("2026-08-13T15:00:00.000Z");
    const stats = buildWeeklyStudyStats([
      { durationSeconds: 900, createdAt: new Date("2026-08-13T08:00:00.000Z") },
      { durationSeconds: 600, createdAt: new Date("2026-08-13T10:00:00.000Z") },
      { durationSeconds: 1200, createdAt: new Date("2026-08-10T18:00:00.000Z") },
      { durationSeconds: 9999, createdAt: new Date("2026-08-01T18:00:00.000Z") },
    ], now);

    expect(stats).toHaveLength(7);
    expect(stats[6]).toMatchObject({ date: "2026-08-13", seconds: 1500, minutes: 25, sessions: 2 });
    expect(stats[3]).toMatchObject({ date: "2026-08-10", seconds: 1200, minutes: 20, sessions: 1 });
    expect(stats.every((day) => day.date !== "2026-08-01")).toBe(true);
  });
});
