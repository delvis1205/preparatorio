import { describe, expect, it } from "vitest";
import { CURRICULUM, OFFICIAL_PDF_COVERAGE, TRAINING_QUESTIONS } from "./content";
import { OFFICIAL_PDF_SUBTOPICS } from "./officialPdfSubtopics";

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
    for (const module of CURRICULUM) {
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

  it("oferece formatos de treino de alternativa, verdadeiro/falso, numérico e resposta curta", () => {
    const formats = new Set(TRAINING_QUESTIONS.map((question) => question.type));
    expect(formats).toEqual(new Set(["multiple_choice", "true_false", "numeric", "short_answer"]));
    for (const question of TRAINING_QUESTIONS.filter((item) => item.type === "numeric" || item.type === "short_answer")) {
      expect(question.correctAnswer, `${question.id} deve ter resposta de referência`).toBeTruthy();
      expect(question.options).toHaveLength(0);
    }
  });

  it("mantém um registo canónico 1:1 que cobre cada subtema do PDF com sessão e treino", () => {
    expect(OFFICIAL_PDF_COVERAGE).toHaveLength(OFFICIAL_PDF_SUBTOPICS.length);
    expect(new Set(OFFICIAL_PDF_COVERAGE.map((entry) => entry.sourceId))).toEqual(new Set(OFFICIAL_PDF_SUBTOPICS.map((entry) => entry.sourceId)));
    for (const entry of OFFICIAL_PDF_COVERAGE) {
      const module = CURRICULUM.find((item) => item.id === entry.moduleId);
      const session = module?.lesson.topicSessions?.find((item) => item.topic === entry.topic);
      const source = OFFICIAL_PDF_SUBTOPICS.find((item) => item.sourceId === entry.sourceId);
      expect(source?.sourceText).toBe(entry.sourceText);
      expect(source?.sourceReference).toBe(entry.sourceReference);
      expect(source?.moduleId).toBe(entry.moduleId);
      expect(source?.disciplineId).toBe(entry.disciplineId);
      expect(module?.lesson.id).toBe(entry.lessonId);
      expect(session?.definition, `${entry.topic} deve ter definição`).toBeTruthy();
      expect(session?.example, `${entry.topic} deve ter exemplo`).toBeTruthy();
      expect(TRAINING_QUESTIONS.some((question) => question.id === entry.questionId && question.moduleId === entry.moduleId && question.topic === entry.sourceText), `${entry.sourceId} deve ter treino exacto`).toBe(true);
    }
  });

  it("mantém o currículo distribuído pelas áreas do preparatório de Engenharia Informática", () => {
    expect(new Set(CURRICULUM.map((module) => module.disciplineId))).toEqual(new Set(["matematica", "fisica", "quimica", "geometria", "portugues", "cultura"]));
  });
});
