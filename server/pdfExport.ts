import PDFDocument from 'pdfkit';
import { CURRICULUM, TRAINING_QUESTIONS } from './content';

export interface PdfExportOptions {
  moduleId?: string;
  discipline?: string;
  includeAnswers?: boolean;
}

export function generateModuleStudyGuidePdf(options: PdfExportOptions): PDFKit.PDFDocument {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 50, bottom: 50, left: 50, right: 50 },
    bufferPages: true,
  });

  const disciplineFilter = options.discipline ? options.discipline.toLowerCase() : null;
  const targetModules = CURRICULUM.filter((m) => {
    if (options.moduleId && m.id !== options.moduleId) return false;
    if (disciplineFilter && m.discipline.toLowerCase() !== disciplineFilter) return false;
    return true;
  });

  const modulesToExport = targetModules.length > 0 ? targetModules : CURRICULUM;
  const includeAnswers = options.includeAnswers ?? true;

  // Header / Watermark helper on each page
  const addWatermarkAndHeaders = () => {
    const range = doc.bufferedPageRange();
    for (let i = range.start; i < range.start + range.count; i++) {
      doc.switchToPage(i);
      doc.save();

      // Watermark diagonal
      doc.fontSize(38).fillColor('#E2E8F0', 0.16);
      doc.rotate(-30, { origin: [300, 400] });
      doc.text('LUANDA PREP — DELVIS DE MORAIS', 80, 300, { align: 'center', width: 500 });
      doc.restore();

      // Running header
      doc.fontSize(8).fillColor('#64748B');
      doc.text('LUANDA PREP — Engenharia Informática (UAN)', 50, 25, { align: 'left' });
      doc.text('Autor: Delvis de Morais (Morásio Digital)', 50, 25, { align: 'right' });
      doc.moveTo(50, 35).lineTo(545, 35).strokeColor('#CBD5E1').lineWidth(0.5).stroke();

      // Running footer
      doc.fontSize(8).fillColor('#64748B');
      doc.text('Contacto: +244 973 929 712 | Guia Gratuito de Estudo', 50, 790, { align: 'left' });
      doc.text(`Página ${i + 1}`, 500, 790, { align: 'right' });
    }
  };

  // Cover Page
  doc.rect(0, 0, 595.28, 841.89).fill('#0A36A8');
  doc.fontSize(26).fillColor('#FFFFFF').text('LUANDA PREP', 50, 180, { align: 'center' });
  doc.fontSize(15).fillColor('#FFCC5C').text('Guia Oficial de Estudo e Caderno de Exercícios', 50, 225, { align: 'center' });
  doc.fontSize(11).fillColor('#E2E8F0').text('Preparatório para o Exame de Admissão em Engenharia Informática — UAN', 50, 255, { align: 'center' });

  doc.rect(80, 320, 435, 230).fillAndStroke('#1E40AF', '#3B82F6');
  doc.fontSize(11).fillColor('#FFFFFF');
  doc.text('ESTRUTURA DESTE GUIA INSTITUCIONAL:', 105, 345);
  doc.fontSize(10).fillColor('#E2E8F0');
  doc.text('• Sumário estruturado por disciplinas e módulos', 105, 370);
  doc.text('• Resumo teórico essencial e objetivos oficiais', 105, 395);
  doc.text('• Exemplos guiados com resolução passo a passo', 105, 420);
  doc.text('• Caderno de questões práticas para treino manual', 105, 445);
  doc.text(includeAnswers ? '• Gabarito completo com explicações e erros comuns' : '• Caderno de resolução limpa para simulados', 105, 470);

  doc.fontSize(10).fillColor('#FFFFFF').text('Elaborado e criado por: Delvis de Morais (Morásio Digital)', 50, 620, { align: 'center' });
  doc.fontSize(9).fillColor('#CBD5E1').text('WhatsApp de Suporte: +244 973 929 712 | Sítio: https://shre.ink/preparatorioexame', 50, 645, { align: 'center' });

  // Table of Contents Page (Sumário)
  doc.addPage();
  doc.y = 50;
  doc.fontSize(16).fillColor('#0A36A8').text('Sumário do Guia de Estudo', { underline: true });
  doc.y += 10;
  doc.fontSize(9).fillColor('#475569').text(`Este documento cobre ${modulesToExport.length} módulos do programa oficial de Engenharia Informática. Cada secção contém conceitos teóricos e exercícios para resolução manual.`);
  doc.y += 15;

  let tocIndex = 1;
  for (const mod of modulesToExport) {
    if (doc.y > 720) {
      doc.addPage();
      doc.y = 50;
    }
    doc.fontSize(10).fillColor('#0F172A').text(`${tocIndex}. [${mod.discipline}] ${mod.title}`);
    doc.fontSize(8).fillColor('#64748B').text(`    Tópicos: ${mod.officialTopics.join(" · ")}`, { lineGap: 6 });
    tocIndex++;
  }

  // Iterate over modules
  for (const mod of modulesToExport) {
    doc.addPage();
    doc.y = 50;

    // Module Title Banner
    doc.rect(50, doc.y, 495, 45).fill('#F1F5F9');
    doc.fontSize(13).fillColor('#0A36A8').text(`Módulo: ${mod.title}`, 65, doc.y + 10, { width: 465 });
    doc.fontSize(9).fillColor('#475569').text(`Disciplina: ${mod.discipline} | Nível: ${mod.difficulty} | Duração est.: ${mod.estimatedMinutes} min`, 65, doc.y + 28);
    doc.y += 60;

    // Overview / Description
    doc.fontSize(11).fillColor('#0F172A').text('1. Síntese Teórica e Objetivos do Módulo', { underline: true });
    doc.y += 6;
    doc.fontSize(9).fillColor('#334155').text(mod.description, { lineGap: 4 });
    doc.y += 10;

    if (mod.lesson) {
      doc.fontSize(10).fillColor('#0F172A').text(`Aula Principal: ${mod.lesson.title}`);
      doc.y += 4;
      doc.fontSize(9).fillColor('#475569').text(mod.lesson.explanation, { lineGap: 3 });
      doc.y += 6;

      if (mod.lesson.formula) {
        doc.fontSize(9).fillColor('#0A36A8').text(`Fórmula Chave: ${mod.lesson.formula}`);
        doc.y += 4;
      }

      if (mod.lesson.examples && mod.lesson.examples.length > 0) {
        doc.fontSize(10).fillColor('#0F172A').text('Exemplo Resolvido:');
        doc.y += 4;
        const ex = mod.lesson.examples[0];
        doc.fontSize(9).fillColor('#1E293B').text(`• ${ex.title}: ${ex.prompt}`);
        doc.text(`  Resolução: ${ex.walkthrough}`, { indent: 10 });
        doc.y += 6;
      }
    }

    // Official topics
    if (mod.officialTopics && mod.officialTopics.length > 0) {
      doc.fontSize(11).fillColor('#0F172A').text('2. Tópicos Oficiais (exactas.pdf)', { underline: true });
      doc.y += 6;
      for (const t of mod.officialTopics) {
        doc.fontSize(9).fillColor('#334155').text(`• ${t}`);
        doc.y += 3;
      }
      doc.y += 10;
    }

    // Questions for this module
    const questions = TRAINING_QUESTIONS.filter((q) => q.moduleId === mod.id);
    if (questions.length > 0) {
      doc.fontSize(11).fillColor('#0F172A').text('3. Caderno de Exercícios Práticos', { underline: true });
      doc.y += 6;
      doc.fontSize(9).fillColor('#64748B').text('Resolva cada questão manualmente no espaço abaixo antes de conferir a solução.');
      doc.y += 10;

      let qIdx = 1;
      for (const q of questions) {
        if (doc.y > 640) {
          doc.addPage();
          doc.y = 50;
        }

        doc.fontSize(10).fillColor('#0A36A8').text(`Questão ${qIdx} (${q.type.toUpperCase()}): Tópico — ${q.topic}`);
        doc.y += 4;
        doc.fontSize(9).fillColor('#0F172A').text(q.prompt, { lineGap: 3 });
        doc.y += 6;

        if (q.options && q.options.length > 0) {
          for (const opt of q.options) {
            doc.fontSize(9).fillColor('#334155').text(`   ${opt}`);
            doc.y += 2;
          }
          doc.y += 4;
        }

        // Manual resolution box
        doc.fontSize(8).fillColor('#94A3B8').text('Espaço para rascunho e resolução manual:');
        doc.rect(50, doc.y + 2, 495, 50).strokeColor('#CBD5E1').lineWidth(0.5).stroke();
        doc.y += 56;

        if (includeAnswers) {
          if (doc.y > 680) {
            doc.addPage();
            doc.y = 50;
          }
          const correctText = q.options && q.options[q.correctOption] ? q.options[q.correctOption] : (q.correctAnswer || 'Ver explicação');
          doc.fontSize(9).fillColor('#047857').text(`[Gabarito] Resposta Correta: ${correctText}`);
          doc.fontSize(9).fillColor('#334155').text(`Explicação: ${q.explanation}`);
          doc.y += 8;
        }

        qIdx++;
      }
    }
  }

  // Final summary page
  doc.addPage();
  doc.y = 100;
  doc.fontSize(18).fillColor('#0A36A8').text('Mensagem do Autor', { align: 'center' });
  doc.y += 15;
  doc.fontSize(10).fillColor('#334155').text(
    'O LUANDA PREP foi idealizado para apoiar todos os candidatos ao Exame de Admissão em Engenharia Informática da UAN. Treine com consistência, resolva os guias manualmente e utilize a plataforma online em https://shre.ink/preparatorioexame para simulações e tutoria com Inteligência Artificial.',
    { align: 'center', lineGap: 6, width: 495 }
  );
  doc.y += 30;
  doc.fontSize(11).fillColor('#0F172A').text('Autor: Delvis de Morais (Morásio Digital)', { align: 'center' });
  doc.fontSize(10).text('Contacto Oficial / WhatsApp: +244 973 929 712', { align: 'center' });
  doc.fontSize(9).fillColor('#64748B').text('Dados de Apoio Voluntário (BAI e BFA em nome de Delvis de Jesus Manuel de Morais).', { align: 'center' });

  // Add watermarks & headers/footers to all pages
  addWatermarkAndHeaders();

  return doc;
}
