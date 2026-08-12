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

  it("inclui definições e perguntas de compreensão em todos os módulos", () => {
    for (const module of CURRICULUM) {
      expect(module.lesson.concepts?.length, `${module.id} deve ter definições`).toBeGreaterThanOrEqual(2);
      expect(module.lesson.conceptQuestions?.length, `${module.id} deve ter perguntas conceituais`).toBeGreaterThanOrEqual(2);
      expect(module.lesson.examples?.filter((item) => item.title.startsWith("Pergunta de compreensão")).length, `${module.id} deve exibir perguntas`).toBeGreaterThanOrEqual(2);
    }
  });

  it("mantém o currículo distribuído pelas três disciplinas da preparação", () => {
    expect(new Set(CURRICULUM.map((module) => module.disciplineId))).toEqual(new Set(["matematica", "portugues", "cultura"]));
  });
});
