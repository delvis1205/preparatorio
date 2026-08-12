import { describe, expect, it } from "vitest";
import { CURRICULUM } from "./content";

describe("currículo pedagógico", () => {
  it("oferece um exemplo guiado e uma verificação rápida em cada aula", () => {
    for (const module of CURRICULUM) {
      expect(module.lesson.examples?.length, `${module.id} deve ter exemplo`).toBeGreaterThan(0);
      expect(module.lesson.quickCheck?.prompt, `${module.id} deve ter verificação`).toBeTruthy();
      expect(module.lesson.quickCheck?.answer, `${module.id} deve ter resposta de verificação`).toBeTruthy();
    }
  });

  it("mantém o currículo distribuído pelas três disciplinas da preparação", () => {
    expect(new Set(CURRICULUM.map((module) => module.disciplineId))).toEqual(new Set(["matematica", "portugues", "cultura"]));
  });
});
