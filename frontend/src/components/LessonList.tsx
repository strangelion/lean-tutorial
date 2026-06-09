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
  {
    slug: "11-sets",
    title: "集合的基本操作",
    order: 11,
    description:
      "进入集合论！学会 Set 类型、∈、⊆，用 intro 展开集合关系。",
    duration: "约 35 分钟",
  },
  {
    slug: "12-set-ops",
    title: "集合的运算与性质",
    order: 12,
    description:
      "学习 ∪ 和 ∩，用 ext 策略证明集合相等，证明交集的交换律。",
    duration: "约 30 分钟",
  },
  {
    slug: "13-functions",
    title: "函数与映射",
    order: 13,
    description:
      "掌握 Injective、Surjective、Bijective 的定义，学会 have 策略。",
    duration: "约 35 分钟",
  },
  {
    slug: "14-groups-intro",
    title: "群的定义与基本性质",
    order: 14,
    description:
      "进入群论！手动定义群结构，用 calc 块做等式推导，证明逆元的性质。",
    duration: "约 40 分钟",
  },
  {
    slug: "15-subgroups",
    title: "子群与子群判定",
    order: 15,
    description:
      "定义 IsSubgroup，学会 refine ⟨?_, ?_⟩ 策略，证明子群的交集仍是子群。",
    duration: "约 35 分钟",
  },
  {
    slug: "16-groups-more",
    title: "群的更多性质",
    order: 16,
    description:
      "证明左消去律，体验群论证明的「舞蹈」——插单位元、插逆元、重结合。",
    duration: "约 35 分钟",
  },
  {
    slug: "17-rings-intro",
    title: "环的定义与基本性质",
    order: 17,
    description:
      "进入环论！两个运算 + 分配律。证明 0 * a = 0 这个看似平凡却关键的结论。",
    duration: "约 40 分钟",
  },
  {
    slug: "18-rings-more",
    title: "环的更多性质",
    order: 18,
    description:
      "最后一课！证明 (-a) * b = -(a * b)，完成从命题逻辑到抽象代数的旅程。",
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
