import { describe, expect, it } from "vitest";
import { calculateMastery, masteryLabel } from "./mastery";

describe("cálculo de domínio", () => {
  it("mantém um módulo sem actividade como não iniciado", () => {
    expect(calculateMastery({ attempts: 0, correct: 0, completionPercent: 0 })).toBe(0);
    expect(masteryLabel(0)).toBe("Não iniciado");
  });

  it("valoriza acerto, prática e conclusão sem ultrapassar 100", () => {
    const mastery = calculateMastery({ attempts: 10, correct: 10, completionPercent: 100, daysSinceLastStudy: 0 });
    expect(mastery).toBe(100);
    expect(masteryLabel(mastery)).toBe("Dominado");
  });

  it("reduz o domínio quando o desempenho e a recência são baixos", () => {
    const mastery = calculateMastery({ attempts: 4, correct: 1, completionPercent: 20, daysSinceLastStudy: 10 });
    expect(mastery).toBeLessThan(30);
  });
});
