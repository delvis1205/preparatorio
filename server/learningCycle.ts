import type { TrainingQuestion } from "./content";

export type StudyPlanTask = {
  id: string;
  label: string;
  minutes: number;
  done: boolean;
  moduleId?: string;
};

const weeklyTaskIds = ["week-1", "week-2", "week-3", "week-4", "week-5", "week-6"];

export function isWeeklyStudyPlan(tasks: StudyPlanTask[]) {
  return weeklyTaskIds.every((id) => tasks.some((task) => task.id === id));
}

export function luandaDateKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Luanda",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const value = (type: "year" | "month" | "day") => parts.find((part) => part.type === type)?.value ?? "00";
  return `${value("year")}-${value("month")}-${value("day")}`;
}

export function selectDailyQuestion<T extends Pick<TrainingQuestion, "id">>(userId: number, dateKey: string, questions: T[]) {
  if (!questions.length) return undefined;
  const seed = Array.from(`${userId}:${dateKey}`).reduce((total, character) => total + character.charCodeAt(0), 0);
  return questions[seed % questions.length];
}
