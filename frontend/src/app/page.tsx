import Link from "next/link";
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
      "一切皆有类型。理解 Type 和 Prop，用 #check 探索类型世界。",
    duration: "约 25 分钟",
  },
  {
    slug: "03-implication",
    title: "蕴涵与全称量词",
    order: 3,
    description:
      "学习 intro、apply 策略，掌握 → 和 ∀ 的证明方法。",
    duration: "约 30 分钟",
  },
  {
    slug: "04-conjunction",
    title: "合取与存在量词",
    order: 4,
    description:
      "学习 constructor、cases 策略，掌握 ∧ 和 ∃ 的证明方法。",
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
];

export default function HomePage() {
  const progress = getProgress();
  const completedCount = LESSONS.filter((l) =>
    progress.completedLessons.includes(l.slug),
  ).length;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Lean 4 交互式中文教程
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          零基础入门形式化证明 —— 在浏览器里写数学证明，无需安装任何软件。
        </p>
        <div className="mt-4 flex justify-center gap-3 text-sm">
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
            已学 {completedCount} / {LESSONS.length} 课
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
            全中文界面
          </span>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          怎么使用这个教程？
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700">
          <div className="flex gap-2">
            <span className="text-blue-500 font-bold shrink-0">1.</span>
            <span>
              选择一个课程，阅读左侧的知识讲解和证明目标。
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-blue-500 font-bold shrink-0">2.</span>
            <span>
              在右侧编辑器中编写 Lean 证明代码，点击 <strong>运行 ▶</strong> {" "}
              按钮提交。
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-blue-500 font-bold shrink-0">3.</span>
            <span>
              根据反馈修改代码，直到看到 <strong>✅ 证明通过！</strong>{" "}
              即可进入下一课。
            </span>
          </div>
        </div>
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-900">
          <strong>提示：</strong>
          每课编辑器里已经预先写好了部分代码。你需要在{" "}
          <code className="bg-amber-100 px-1 rounded">by</code>{" "}
          后面填入证明策略。不会写？看看左侧的提示和参考解答。
        </div>
      </div>

      {/* Lesson list */}
      <div className="space-y-3">
        {LESSONS.map((lesson) => {
          const done = progress.completedLessons.includes(lesson.slug);
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

      {/* CTA */}
      <div className="mt-10 p-6 bg-blue-50 border border-blue-200 rounded-lg text-center">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          准备好开始了吗？
        </h2>
        <p className="text-gray-600 mb-4 text-sm">
          不需要安装任何工具，打开浏览器就能写 Lean 证明。
        </p>
        <Link
          href="/learn/01-intro"
          className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          开始第一课
        </Link>
      </div>
    </div>
  );
}
