import { writeFile } from "node:fs/promises";
import { OFFICIAL_PDF_COVERAGE } from "../server/content.ts";

const outputPath = new URL("../docs/cobertura_exactas.md", import.meta.url);
const disciplineNames = {
  matematica: "Matemática",
  fisica: "Física",
  quimica: "Química",
  geometria: "Desenho e Geometria Descritiva",
  portugues: "Língua Portuguesa",
};
const escapeCell = (value) => value.replace(/\|/g, "\\|").replace(/\n/g, " ");
const sections = Object.entries(disciplineNames).map(([disciplineId, title]) => {
  const entries = OFFICIAL_PDF_COVERAGE.filter((entry) => entry.disciplineId === disciplineId);
  const rows = entries.map((entry) => `| ${entry.sourceReference} | ${escapeCell(entry.sourceText)} | \`${entry.moduleId}\` | \`${entry.lessonId}\` | \`${escapeCell(entry.topic)}\` | \`${entry.questionId}\` |`).join("\n");
  return `## ${title}\n\n| Ref. PDF | Texto exacto do subtema | Módulo LUANDA PREP | Aula | Sessão temática | Questão de treino |\n| --- | --- | --- | --- | --- | --- |\n${rows}`;
});

const totals = Object.entries(disciplineNames)
  .map(([disciplineId, title]) => `| ${title} | ${OFFICIAL_PDF_COVERAGE.filter((entry) => entry.disciplineId === disciplineId).length} |`)
  .join("\n");

const document = `# Matriz de cobertura linha a linha — Preparatório de Engenharia Informática

> **Fonte curricular:** \`exactas.pdf\` — Universidade Agostinho Neto, Subcomissão de Ciências Exactas, tópicos para o exame de acesso 2026/2027. Esta matriz é gerada a partir de \`server/officialPdfSubtopics.ts\`, cuja origem rastreável está em \`docs/source/exactas_programa_2026_2027.txt\`. Todas as questões indicadas são **questões de treino** do LUANDA PREP, não enunciados oficiais.

## Método de validação

Cada linha da tabela corresponde a um subtema canónico do programa oficial, identificado pela referência impressa no PDF. A matriz associa esse subtema a um único módulo, uma aula, uma sessão temática com definição e exemplo e uma questão de treino. O teste \`server/content.test.ts\` exige equivalência exacta entre \`OFFICIAL_PDF_SUBTOPICS\` e \`OFFICIAL_PDF_COVERAGE\`, incluindo identificador, referência, texto, disciplina, módulo e questão.

| Disciplina | Subtemas canónicos mapeados |
| --- | ---: |
${totals}
| **Total** | **${OFFICIAL_PDF_COVERAGE.length}** |

${sections.join("\n\n")}

## Controlo de actualização

Sempre que o programa oficial for revisto, actualize o texto extraído, execute \`node scripts/extract-exactas-subtopics.mjs\`, confirme o mapeamento de módulo de cada subtema, e execute \`pnpm tsx scripts/generate-coverage-matrix.mjs && pnpm check && pnpm test\`. A publicação só deve prosseguir depois de a matriz, as sessões e as questões de treino passarem na validação 1:1.
`;

await writeFile(outputPath, document);
console.log(`Matriz gerada com ${OFFICIAL_PDF_COVERAGE.length} linhas: ${outputPath.pathname}`);
