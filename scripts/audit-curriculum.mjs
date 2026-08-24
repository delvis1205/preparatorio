import { CURRICULUM, TRAINING_QUESTIONS } from "../server/content.ts";

const patterns = {
  genericDefinition: /tópico oficial de|reconheça a ideia central/i,
  genericAnswer: /identifique o conceito|dados relevantes e a condição/i,
  genericExample: /construa uma resolução curta|destaque primeiro os dados/i,
};

const rows = CURRICULUM.map((module) => {
  const sessions = module.lesson.topicSessions ?? [];
  const moduleQuestions = TRAINING_QUESTIONS.filter((question) => question.moduleId === module.id);
  const genericSessions = sessions.filter((session) =>
    patterns.genericDefinition.test(session.definition) ||
    patterns.genericAnswer.test(session.answer) ||
    patterns.genericExample.test(session.example),
  ).length;
  const genericQuestions = moduleQuestions.filter((question) => patterns.genericAnswer.test(question.explanation)).length;
  const residualSessions = sessions.filter((session) => /é um tópico curricular de/i.test(session.definition)).length;
  const consolidationSessions = sessions.filter((session) => /integra o módulo/i.test(session.definition)).length;

  return {
    discipline: module.discipline,
    module: module.id,
    title: module.title,
    topics: module.officialTopics.length,
    sessions: sessions.length,
    genericSessions,
    residualSessions,
    consolidationSessions,
    questions: moduleQuestions.length,
    genericQuestions,
  };
});

console.table(rows);
console.log(JSON.stringify({
  totals: rows.reduce((total, row) => ({
    modules: total.modules + 1,
    topics: total.topics + row.topics,
    genericSessions: total.genericSessions + row.genericSessions,
    residualSessions: total.residualSessions + row.residualSessions,
    consolidationSessions: total.consolidationSessions + row.consolidationSessions,
    questions: total.questions + row.questions,
    genericQuestions: total.genericQuestions + row.genericQuestions,
  }), { modules: 0, topics: 0, genericSessions: 0, residualSessions: 0, consolidationSessions: 0, questions: 0, genericQuestions: 0 }),
  byDiscipline: Object.groupBy(rows, (row) => row.discipline),
  residualTopics: CURRICULUM.flatMap((module) => (module.lesson.topicSessions ?? [])
    .filter((session) => /integra o módulo/i.test(session.definition))
    .map((session) => ({ moduleId: module.id, disciplineId: module.disciplineId, topic: session.topic }))),
}, null, 2));
