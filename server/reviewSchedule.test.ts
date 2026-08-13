import { describe, expect, it } from "vitest";
import { buildSpacedReviewSchedule } from "./routers/learning";

describe("revisão espaçada", () => {
  it("agenda erros para o dia seguinte e acertos para três dias depois", () => {
    const now = new Date("2026-08-12T12:00:00.000Z");
    const schedule = buildSpacedReviewSchedule([
      { questionId: "q-1", moduleId: "m-1", topic: "Álgebra", isCorrect: false, createdAt: new Date("2026-08-11T08:00:00.000Z") },
      { questionId: "q-2", moduleId: "m-2", topic: "Funções", isCorrect: true, createdAt: new Date("2026-08-11T08:00:00.000Z") },
    ], now);
    expect(schedule.find((item) => item.topic === "Álgebra")?.due).toBe(true);
    expect(schedule.find((item) => item.topic === "Funções")?.due).toBe(false);
  });
});
