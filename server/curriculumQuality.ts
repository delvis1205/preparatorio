export const GENERIC_CURRICULUM_PATTERNS = [
  /é um tópico oficial de/i,
  /reconheça a ideia central/i,
  /destaque primeiro os dados/i,
  /identifique o conceito.*dados relevantes/i,
  /construa uma resolução curta/i,
  /use os conceitos estudados para responder/i,
  /aplique o método adequado ao tópico/i,
  /releia o conteúdo e pratique novamente/i,
];

type TopicSessionLike = {
  topic: string;
  definition?: string;
  explanation?: string;
  example?: string;
  answer?: string;
  practiceAction?: string;
  checkpoint?: string;
};

type TrainingQuestionLike = {
  id: string;
  moduleId: string;
  topic: string;
  prompt?: string;
  explanation?: string;
  correctAnswer?: unknown;
  correctOption?: number;
  options?: unknown[];
  type?: string;
};

const REQUIRED_SESSION_FIELDS: Array<keyof TopicSessionLike> = ["definition", "explanation", "example", "answer", "practiceAction", "checkpoint"];

function containsGenericPattern(value: string) {
  return GENERIC_CURRICULUM_PATTERNS.find((pattern) => pattern.test(value));
}

export function getTopicSessionQualityIssues(session: TopicSessionLike) {
  const issues: string[] = [];
  const content = REQUIRED_SESSION_FIELDS.map((field) => String(session[field] ?? "")).join(" ").trim();

  for (const field of REQUIRED_SESSION_FIELDS) {
    const value = String(session[field] ?? "").trim();
    if (!value) issues.push(`campo ausente: ${field}`);
  }

  if (content.length < 180) issues.push("conteúdo pedagógico insuficiente");
  const genericPattern = containsGenericPattern(content);
  if (genericPattern) issues.push(`texto-padrão detectado: ${genericPattern}`);

  return issues;
}

export function getTrainingQuestionQualityIssues(question: TrainingQuestionLike) {
  const issues: string[] = [];
  const prompt = String(question.prompt ?? "").trim();
  const explanation = String(question.explanation ?? "").trim();
  const combined = `${prompt} ${explanation}`.trim();

  if (!prompt) issues.push("enunciado ausente");
  if (prompt.length < 18) issues.push("enunciado demasiado curto");
  if (!explanation) issues.push("explicação ausente");
  if (explanation.length < 35) issues.push("explicação insuficiente");
  const hasTextAnswer = question.correctAnswer !== undefined && question.correctAnswer !== null && question.correctAnswer !== "";
  const hasOptionAnswer = typeof question.correctOption === "number" && question.correctOption >= 0 && question.correctOption < (question.options?.length ?? 0);
  if (!hasTextAnswer && !hasOptionAnswer) issues.push("resposta de referência ausente");
  if ((question.type === "multiple_choice" || question.type === "true_false") && (question.options?.length ?? 0) < 2) issues.push("alternativas insuficientes");

  const genericPattern = containsGenericPattern(combined);
  if (genericPattern) issues.push(`texto-padrão detectado: ${genericPattern}`);

  return issues;
}

export function getCurriculumQualityReport(
  modules: Array<{ id: string; lesson: { topicSessions?: TopicSessionLike[] } }>,
  questions: TrainingQuestionLike[],
) {
  const sessionIssues = modules.flatMap((module) => (module.lesson.topicSessions ?? []).flatMap((session) =>
    getTopicSessionQualityIssues(session).map((issue) => ({ moduleId: module.id, topic: session.topic, issue })),
  ));
  const questionIssues = questions.flatMap((question) =>
    getTrainingQuestionQualityIssues(question).map((issue) => ({ questionId: question.id, moduleId: question.moduleId, topic: question.topic, issue })),
  );

  return { sessionIssues, questionIssues, hasIssues: sessionIssues.length > 0 || questionIssues.length > 0 };
}
