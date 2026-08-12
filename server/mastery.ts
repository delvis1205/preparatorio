export function calculateMastery(input: {
  attempts: number;
  correct: number;
  completionPercent: number;
  daysSinceLastStudy?: number;
}) {
  if (input.attempts === 0 && input.completionPercent === 0) return 0;

  const accuracy = input.attempts ? input.correct / input.attempts : 0;
  const practiceWeight = Math.min(input.attempts / 8, 1);
  const recencyFactor = Math.max(0.65, 1 - Math.max(input.daysSinceLastStudy ?? 0, 0) * 0.025);
  const raw = (accuracy * 70 + input.completionPercent * 0.2 + practiceWeight * 10) * recencyFactor;
  return Math.max(0, Math.min(100, Math.round(raw)));
}

export function masteryLabel(mastery: number) {
  if (mastery === 0) return "Não iniciado";
  if (mastery <= 30) return "Inicial";
  if (mastery <= 50) return "Básico";
  if (mastery <= 70) return "Em desenvolvimento";
  if (mastery <= 85) return "Bom";
  if (mastery <= 95) return "Muito bom";
  return "Dominado";
}
