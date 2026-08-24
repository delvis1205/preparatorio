import { describe, it, expect } from "vitest";
import { generateModuleStudyGuidePdf } from "./pdfExport";

describe("PDF Study Guide Export", () => {
  it("gera um documento PDF com sucesso para um módulo específico", () => {
    const doc = generateModuleStudyGuidePdf({ moduleId: "mat-polinomios", includeAnswers: true });
    expect(doc).toBeDefined();
    // Verify it is a PDFDocument instance
    expect(typeof doc.pipe).toBe("function");
    expect(typeof doc.end).toBe("function");
  });

  it("gera um documento PDF filtrado por disciplina sem erros", () => {
    const doc = generateModuleStudyGuidePdf({ discipline: "Matemática", includeAnswers: false });
    expect(doc).toBeDefined();
    expect(typeof doc.pipe).toBe("function");
  });
});
