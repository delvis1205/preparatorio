import { describe, expect, it } from "vitest";
import { getTopicSessionQualityIssues, getTrainingQuestionQualityIssues } from "./curriculumQuality";

describe("proteção de qualidade curricular", () => {
  it("rejeita uma sessão com texto-padrão e campos sem explicação específica", () => {
    const issues = getTopicSessionQualityIssues({
      topic: "Funções quadráticas",
      definition: "É um tópico oficial de Matemática.",
      explanation: "Reconheça a ideia central e aplique o método adequado ao tópico.",
      example: "Construa uma resolução curta.",
      answer: "Identifique o conceito e os dados relevantes.",
      practiceAction: "Pratique novamente.",
      checkpoint: "O que compreendeu?",
    });

    expect(issues.some((issue) => issue.includes("texto-padrão detectado"))).toBe(true);
  });

  it("rejeita uma questão sem explicação ou resposta de referência", () => {
    const issues = getTrainingQuestionQualityIssues({
      id: "teste-1",
      moduleId: "mat-1",
      topic: "Progressões aritméticas",
      prompt: "Resolva.",
      explanation: "",
      options: [],
      type: "short_answer",
    });

    expect(issues).toContain("enunciado demasiado curto");
    expect(issues).toContain("explicação ausente");
    expect(issues).toContain("resposta de referência ausente");
  });
});
