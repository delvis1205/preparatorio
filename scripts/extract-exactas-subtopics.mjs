import { readFile, writeFile } from "node:fs/promises";

const sourcePath = new URL("../docs/source/exactas_programa_2026_2027.txt", import.meta.url);
const jsonOutputPath = new URL("../docs/source/exactas_subtemas_extraidos.json", import.meta.url);
const tsOutputPath = new URL("../server/officialPdfSubtopics.ts", import.meta.url);
const source = await readFile(sourcePath, "utf8");

const blocks = [
  ["MATEMÁTICA", "FÍSICA", "matematica"],
  ["FÍSICA", "QUÍMICA", "fisica"],
  ["QUÍMICA", "DESENHO E GEOMETRIA DESCRITIVA", "quimica"],
  ["DESENHO E GEOMETRIA DESCRITIVA", "LÍNGUA PORTUGUESA", "geometria"],
];

const moduleBySection = {
  matematica: { 1: "mat-geometria-espacial", 2: "mat-conjuntos-condicoes", 3: "mat-coordenadas-vetores-espaco", 4: "mat-lugares-geometricos", 5: "mat-coordenadas-vetores-espaco", 6: "mat-potencias-radicais", 7: "mat-funcoes", 8: "mat-graficos-quadratica", 9: "mat-polinomios", 10: "mat-trigonometria", 11: "mat-coordenadas-vetores-espaco", 12: "mat-sucessoes", 13: "mat-estatistica-inducao", 14: "mat-estatistica-inducao", 15: "mat-funcoes", 16: "mat-exp-log-trig", 17: "mat-exp-log-trig", 18: "mat-limites", 19: "mat-derivadas", 20: "mat-integrais" },
  fisica: { 1: "fis-energia-trabalho", 2: "fis-energia-trabalho", 3: "fis-gases-termodinamica", 4: "fis-gases-termodinamica", 5: "fis-gases-termodinamica", 6: "fis-corrente-redes", 7: "fis-corrente-redes", 8: "fis-cinematica-newton", 9: "fis-cinematica-newton", 10: "fis-oscilacoes-ondas-luz", 11: "fis-oscilacoes-ondas-luz", 12: "fis-oscilacoes-ondas-luz", 13: "fis-dinamica-fluidos", 14: "fis-dinamica-fluidos", 15: "fis-dinamica-fluidos", 16: "fis-magnetismo-inducao", 17: "fis-magnetismo-inducao", 18: "fis-ca-ondas-em", 19: "fis-ca-ondas-em", 20: "fis-ca-ondas-em" },
  quimica: { 1: "qui-equacoes-cinetica-equilibrio", 2: "qui-equacoes-cinetica-equilibrio", 3: "qui-equacoes-cinetica-equilibrio", 4: "qui-acidos-bases", 5: "qui-acidos-bases", 6: "qui-atomo-ligacoes", 7: "qui-atomo-ligacoes", 8: "qui-eletroquimica-coordenacao", 9: "qui-eletroquimica-coordenacao", 10: "qui-carbono-organica", 11: "qui-carbono-organica", 12: "qui-funcoes-reacoes-organicas", 13: "qui-funcoes-reacoes-organicas", 14: "qui-biomoleculas-solucoes", 15: "qui-biomoleculas-solucoes" },
  geometria: { 1: "geo-projecoes", 2: "geo-dupla-projecao", 3: "geo-metodos-metricos", 4: "geo-formas-solidos" },
};

const cleanBlock = (value) => value
  .replace(/\f/g, " ")
  .replace(/Página \d+ de \d+/g, " ")
  .replace(/1\.1\.1\.1\.[123]/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const extracted = [];
for (const [start, end, disciplineId] of blocks) {
  const startIndex = source.indexOf(start);
  const endIndex = source.indexOf(end, startIndex + start.length);
  const block = cleanBlock(source.slice(startIndex + start.length, endIndex));
  const matcher = /(\d+)\.(\d+)(?:\.(\d+))?\.\s*(.*?)(?=\s+\d+\.\d+(?:\.\d+)?\.\s|\s+\d+\s*[–-]|$)/g;
  for (const match of block.matchAll(matcher)) {
    const [, section, subtopic, detail, rawText] = match;
    let sourceReference = detail ? `${section}.${subtopic}.${detail}` : `${section}.${subtopic}`;
    const sourceText = rawText.replace(/\s+/g, " ").trim();
    // O PDF imprime este item como 3.5 apesar de pertencer ao bloco 4; a
    // referência canónica restaura a sequência sem alterar o texto do subtema.
    if (disciplineId === "matematica" && sourceReference === "3.5" && sourceText.startsWith("Distância entre dois pontos no espaço")) {
      sourceReference = "4.5";
    }
    const moduleId = moduleBySection[disciplineId][Number(sourceReference.split(".")[0])];
    if (!moduleId) continue;
    if (sourceText) extracted.push({ disciplineId, sourceReference, sourceText, moduleId });
  }
}

const portugueseItems = [
  ["1", "Constituintes da frase.", "pt-sintaxe-regencia-discurso"], ["2", "Tempos e modos verbais.", "pt-gramatica"], ["3", "Pronominalização.", "pt-sintaxe-regencia-discurso"], ["4", "Frase.", "pt-frases"], ["5", "Regência nominal e verbal.", "pt-sintaxe-regencia-discurso"], ["6", "Relações lexicais: sinonímia, antonímia, homofonia, homografia e paronímia.", "pt-palavras"], ["7", "Pontuação.", "pt-gramatica"], ["8", "Acentuação.", "pt-gramatica"], ["9", "Classificação das orações.", "pt-sintaxe-regencia-discurso"], ["10", "Concordância.", "pt-sintaxe-regencia-discurso"], ["11", "Vozes activas e passiva.", "pt-sintaxe-regencia-discurso"], ["12", "Tipos de discurso.", "pt-sintaxe-regencia-discurso"], ["13", "Funções da linguagem.", "pt-comunicacao"], ["14", "Figuras de estilo.", "pt-literatura-angolana"], ["15", "Agostinho Neto.", "pt-literatura-angolana"], ["16", "António Jacinto.", "pt-literatura-angolana"], ["17", "Manuel Rui Monteiro.", "pt-literatura-angolana"], ["18", "Menas Abrantes.", "pt-literatura-angolana"], ["19", "Óscar Ribas.", "pt-literatura-angolana"], ["20", "Pepetela.", "pt-literatura-angolana"],
].map(([sourceReference, sourceText, moduleId]) => ({ disciplineId: "portugues", sourceReference: `PT.${sourceReference}`, sourceText, moduleId }));

const entries = [...extracted, ...portugueseItems].map((entry, index) => ({
  ...entry,
  sourceId: `${entry.disciplineId}-${String(index + 1).padStart(3, "0")}`,
}));

await writeFile(jsonOutputPath, `${JSON.stringify(entries, null, 2)}\n`);
await writeFile(tsOutputPath, `// Gerado por scripts/extract-exactas-subtopics.mjs a partir de docs/source/exactas_programa_2026_2027.txt.\nexport const OFFICIAL_PDF_SUBTOPICS = ${JSON.stringify(entries, null, 2)} as const;\n`);
console.log(`Extraídos ${entries.length} subtemas para ${jsonOutputPath.pathname} e ${tsOutputPath.pathname}`);
