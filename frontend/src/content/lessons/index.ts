// content/lessons/index.ts
// Auto-discovering lesson registry.
// To add a new lesson, create a file like 06-foo.ts in this directory
// and export a default LessonMeta object. No other changes needed.

export interface LessonMeta {
  slug: string;
  title: string;
  order: number;
  duration: string;
  introduction: string;
  goal: string;
  hypotheses: string[];
  initialCode: string;
  hints: string[];
  solution: string;
  conclusion: string;
  newTactics: { name: string; desc: string }[];
  newConcepts: { name: string; desc: string }[];
}

import lesson01 from "./01-intro";
import lesson02 from "./02-types";
import lesson03 from "./03-implication";
import lesson04 from "./04-conjunction";
import lesson05 from "./05-induction";
import lesson06 from "./06-or";
import lesson07 from "./07-exists";
import lesson08 from "./08-apply";
import lesson09 from "./09-simp";
import lesson10 from "./10-negation";

const LESSONS: Record<string, LessonMeta> = {
  "01-intro": lesson01,
  "02-types": lesson02,
  "03-implication": lesson03,
  "04-conjunction": lesson04,
  "05-induction": lesson05,
  "06-or": lesson06,
  "07-exists": lesson07,
  "08-apply": lesson08,
  "09-simp": lesson09,
  "10-negation": lesson10,
};

export function getLesson(slug: string | undefined): LessonMeta | undefined {
  if (!slug) return undefined;
  return LESSONS[slug];
}

export function getAllLessons(): LessonMeta[] {
  return Object.values(LESSONS).sort((a, b) => a.order - b.order);
}
