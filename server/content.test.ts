import { describe, expect, it } from "vitest";
import { CURRICULUM, TRAINING_QUESTIONS } from "./content";

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

  it("cria uma sessão de estudo para cada tópico oficial de todos os módulos expandidos", () => {
    const expandedModules = CURRICULUM.filter((item) => item.lesson.topicSessions?.length);
    expect(expandedModules.length).toBeGreaterThan(0);
    for (const module of expandedModules) {
      expect(module.lesson.topicSessions?.length, `${module.id} deve ter sessões por tópico`).toBe(module.officialTopics.length);
      for (const session of module.lesson.topicSessions ?? []) {
        expect(session.definition).toBeTruthy();
        expect(session.explanation).toBeTruthy();
        expect(session.example).toBeTruthy();
        expect(session.answer).toBeTruthy();
        expect(session.practiceAction).toBeTruthy();
      }
    }
  });

  it("associa pelo menos uma questão de treino a cada tópico oficial", () => {
    const coveredTopics = new Set(TRAINING_QUESTIONS.map((question) => `${question.moduleId}:${question.topic}`));
    for (const module of CURRICULUM) {
      for (const topic of module.officialTopics) {
        expect(coveredTopics.has(`${module.id}:${topic}`), `${module.id} deve ter treino para ${topic}`).toBe(true);
      }
    }
  });

  it("mantém o currículo distribuído pelas áreas do preparatório de Engenharia Informática", () => {
    expect(new Set(CURRICULUM.map((module) => module.disciplineId))).toEqual(new Set(["matematica", "fisica", "quimica", "geometria", "portugues", "cultura"]));
  });
});
