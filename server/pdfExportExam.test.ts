import { describe, it, expect } from "vitest";
import { generateSimulatedExamPdf, generateErrorSheetPdf } from "./pdfExport";

describe("PDF Simulated Exam and Error Sheet Export", () => {
  it("gera uma prova de simulado PDF com sucesso", () => {
    const doc = generateSimulatedExamPdf({ questionIds: ["q-mat-1", "q-mat-2"], includeAnswers: true, title: "Simulado de Teste" });
    expect(doc).toBeDefined();
    expect(typeof doc.pipe).toBe("function");
    expect(typeof doc.end).toBe("function");
  });

  it("gera uma ficha de erros PDF com sucesso", () => {
    const doc = generateErrorSheetPdf({ questionIds: ["q-mat-1"] });
    expect(doc).toBeDefined();
    expect(typeof doc.pipe).toBe("function");
  });
});
