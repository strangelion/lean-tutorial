"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getProgress } from "@/lib/progress";

const LESSONS = [
  {
    slug: "01-intro",
    title: "欢迎来到 Lean",
    order: 1,
    description:
      "什么是形式化证明？Lean 能做什么？在浏览器中体验你的第一个证明。",
    duration: "约 15 分钟",
  },
  {
    slug: "02-types",
    title: "类型与命题",
    order: 2,
    description:
      "一切皆有类型。理解 Type 和 Prop，学会用 rcases 拆解「且」。",
    duration: "约 25 分钟",
  },
  {
    slug: "03-implication",
    title: "蕴涵与全称量词",
    order: 3,
    description:
      "学习 intro 处理 ∀ 和 →，掌握最核心的证明策略。",
    duration: "约 30 分钟",
  },
  {
    slug: "04-conjunction",
    title: "合取与双向蕴涵",
    order: 4,
    description:
      "学习 constructor、⟨⟩ 构造策略，掌握 ↔ 的证明方法。",
    duration: "约 30 分钟",
  },
  {
    slug: "05-induction",
    title: "归纳法入门",
    order: 5,
    description:
      "数学归纳法的形式化：induction 策略、rfl 和 rw 重写。",
    duration: "约 45 分钟",
  },
  {
    slug: "06-or",
    title: "析取：「或」的逻辑",
    order: 6,
    description:
      "学习 left、right 策略，用 rcases 分情况讨论 ∨。",
    duration: "约 25 分钟",
  },
  {
    slug: "07-exists",
    title: "存在量词：有没有这样的东西？",
    order: 7,
    description:
      "学习 refine 策略，用「见证」证明 ∃ 命题。",
    duration: "约 25 分钟",
  },
  {
    slug: "08-apply",
    title: "apply：反向推理的艺术",
    order: 8,
    description:
      "学会从目标反推——apply 把大目标拆成小目标。",
    duration: "约 30 分钟",
  },
  {
    slug: "09-simp",
    title: "simp：让机器帮你化简",
    order: 9,
    description:
      "用 simp 智能化简等式，巩固归纳法。比手动 rw 更省力。",
    duration: "约 25 分钟",
  },
  {
    slug: "10-negation",
    title: "否定与反证法",
    order: 10,
    description:
      "理解 ¬ P = P → False。掌握换质换位律和反证法的形式化。",
    duration: "约 30 分钟",
  },
];

export default function LessonList() {
  const [completedSlugs, setCompletedSlugs] = useState<string[]>([]);

  useEffect(() => {
    setCompletedSlugs(getProgress().completedLessons);
  }, []);

  return (
    <div className="space-y-3">
      {LESSONS.map((lesson) => {
          const done = completedSlugs.includes(lesson.slug);
          return (
            <Link
              key={lesson.slug}
              href={`/learn/${lesson.slug}`}
              className={`block p-5 rounded-lg border transition-all hover:shadow-md ${
                done
                  ? "border-green-200 bg-green-50"
                  : "border-gray-200 bg-white hover:border-blue-300"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-400">
                      第 {lesson.order} 课
                    </span>
                    {done && (
                      <span className="text-xs text-green-600">已学完</span>
                    )}
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {lesson.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {lesson.description}
                  </p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap ml-3">
                  {lesson.duration}
                </span>
              </div>
            </Link>
          );
        })}
    </div>
  );
}
