import { describe, expect, it } from "vitest";
import { isWeeklyStudyPlan, luandaDateKey, selectDailyQuestion } from "./learningCycle";

describe("learning cycle helpers", () => {
  it("reconhece somente o plano que contém as seis etapas do ciclo semanal", () => {
    expect(isWeeklyStudyPlan([{ id: "week-1", label: "Aprender", minutes: 30, done: false }])).toBe(false);
    expect(isWeeklyStudyPlan(Array.from({ length: 6 }, (_, index) => ({ id: `week-${index + 1}`, label: "Etapa", minutes: 30, done: false })))).toBe(true);
  });

  it("selecciona a mesma questão para o mesmo estudante e data", () => {
    const questions = [{ id: "q-1" }, { id: "q-2" }, { id: "q-3" }];
    expect(selectDailyQuestion(7, "2026-08-12", questions)?.id).toBe(selectDailyQuestion(7, "2026-08-12", questions)?.id);
    expect(luandaDateKey(new Date("2026-08-12T23:30:00.000Z"))).toBe("2026-08-13");
  });
});
