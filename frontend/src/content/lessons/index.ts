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
import lesson11 from "./11-sets";
import lesson12 from "./12-set-ops";
import lesson13 from "./13-functions";
import lesson14 from "./14-groups-intro";
import lesson15 from "./15-subgroups";
import lesson16 from "./16-groups-more";
import lesson17 from "./17-rings-intro";
import lesson18 from "./18-rings-more";

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
  "11-sets": lesson11,
  "12-set-ops": lesson12,
  "13-functions": lesson13,
  "14-groups-intro": lesson14,
  "15-subgroups": lesson15,
  "16-groups-more": lesson16,
  "17-rings-intro": lesson17,
  "18-rings-more": lesson18,
};

export function getLesson(slug: string | undefined): LessonMeta | undefined {
  if (!slug) return undefined;
  return LESSONS[slug];
}

export function getAllLessons(): LessonMeta[] {
  return Object.values(LESSONS).sort((a, b) => a.order - b.order);
}
