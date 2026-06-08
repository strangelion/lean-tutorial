// lib/progress.ts - LocalStorage progress management

export interface UserProgress {
  completedLessons: string[];
  completedExercises: Record<string, string[]>;
}

const KEY = "lean-tutorial-progress";

export function getProgress(): UserProgress {
  if (typeof window === "undefined") {
    return { completedLessons: [], completedExercises: {} };
  }
  const raw = localStorage.getItem(KEY);
  return raw
    ? JSON.parse(raw)
    : { completedLessons: [], completedExercises: {} };
}

export function markLessonCompleted(slug: string): void {
  const p = getProgress();
  if (!p.completedLessons.includes(slug)) {
    p.completedLessons.push(slug);
    localStorage.setItem(KEY, JSON.stringify(p));
  }
}

export function markExerciseCompleted(
  lessonSlug: string,
  exerciseId: string,
): void {
  const p = getProgress();
  if (!p.completedExercises[lessonSlug]) {
    p.completedExercises[lessonSlug] = [];
  }
  if (!p.completedExercises[lessonSlug].includes(exerciseId)) {
    p.completedExercises[lessonSlug].push(exerciseId);
    localStorage.setItem(KEY, JSON.stringify(p));
  }
}

export function isLessonCompleted(slug: string): boolean {
  return getProgress().completedLessons.includes(slug);
}

export function isExerciseCompleted(
  lessonSlug: string,
  exerciseId: string,
): boolean {
  return getProgress().completedExercises[lessonSlug]?.includes(exerciseId) ?? false;
}
