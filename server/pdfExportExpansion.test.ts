import { describe, expect, it } from "vitest";
import { generateLessonExpansionPdf } from "./pdfExport";

describe("exportação de aprofundamento LUANDA AI", () => {
  it("gera um PDF de aprofundamento complementar com os blocos pedagógicos", () => {
    const doc = generateLessonExpansionPdf({
      moduleTitle: "Polinómios",
      discipline: "Matemática",
      focus: "Multiplicação de polinómios",
      title: "Aplicar a distributiva com segurança",
      explanation: "Organize cada termo antes de multiplicar.",
      workedExample: "Multiplique cada termo do primeiro fator por cada termo do segundo.",
      selfCheck: "Que termos devem ser combinados no final?",
      answerGuide: "Apenas termos semelhantes, com a mesma parte literal.",
      savedAt: new Date("2026-08-24T08:00:00Z"),
    });
    expect(doc).toBeDefined();
    expect(typeof doc.pipe).toBe("function");
    expect(typeof doc.end).toBe("function");
  });
});
