"use client";

import { useParams } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import LeanEditor from "@/components/LeanEditor";
import GoalDisplay from "@/components/GoalDisplay";
import LessonNav from "@/components/LessonNav";
import ProgressBar from "@/components/ProgressBar";
import { getProgress, markLessonCompleted } from "@/lib/progress";
import type { UserProgress } from "@/lib/progress";

interface LessonMeta {
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

const LESSONS: Record<string, LessonMeta> = {
  "01-intro": {
    slug: "01-intro",
    title: "欢迎来到 Lean",
    order: 1,
    duration: "约 5 分钟",
    introduction:
      "欢迎！这是你的第一个 Lean 证明。\n\n"
      + "Lean 是一种**交互式定理证明器**——你可以像写代码一样写数学证明，"
      + "计算机会帮你检查每一步是否正确。\n\n"
      + "本关我们要证明一个最简单不过的命题：**如果 S 成立，那么 S 成立**。"
      + "听起来很废话？没错——但重点是学会两个最基本的操作：\n"
      + "- 把「如果 P 则 Q」的假设 P 拿出来（这叫 **intro**）\n"
      + "- 用手里已有的东西直接完成证明（这叫 **exact**）\n\n"
      + "右侧编辑器里已经帮你写好了框架。"
      + "你只需要理解每一行在干什么，然后点击 **运行 ▶** 即可。",
    goal: "S → S",
    hypotheses: ["S : Type"],
    initialCode:
      "example : S → S :=\n  by\n    intro hS\n    exact hS",
    hints: [
      "`intro hS` 的意思是：引入前提 S，给它起名叫 `hS`。现在我们的目标从「S → S」变成了「S」——因为前面已经有假设 hS: S 了。",
      "`exact hS` 的意思是：我们的目标刚好就是 `hS`，直接用！",
    ],
    solution: "example : S → S :=\n  by\n    intro hS\n    exact hS",
    conclusion:
      "恭喜！你完成了第一个 Lean 证明。\n\n"
      + "你学到了两个最基本的证明策略：\n"
      + "- **intro** — 把「如果 A 则 B」变成「假设 A，证明 B」\n"
      + "- **exact** — 当目标和手里已有的某个条件完全一样时，直接用\n\n"
      + "每一关你都会学到一两个新策略，积少成多。下一关见！",
    newTactics: [
      { name: "intro", desc: "引入一个前提（假设），把 → 左边的东西拿到手里" },
      { name: "exact", desc: "当你手里有和目标一模一样的东西时，直接用它完成证明" },
    ],
    newConcepts: [
      { name: "命题 (Prop)", desc: "可以判断真假的东西，比如「1+1=2」「S → S」" },
      { name: "蕴涵 (→)", desc: "「如果 A 则 B」，用 intro 处理它" },
    ],
  },

  "02-types": {
    slug: "02-types",
    title: "类型与命题",
    order: 2,
    duration: "约 5 分钟",
    introduction:
      "上一关我们证明了「S → S」，但 S 是什么？为什么 S 既是「类型」又是「命题」？\n\n"
      + "在 Lean 里，**命题就是类型**。`P ∧ Q → P` 这个命题，"
      + "其实也是一个类型——如果你能构造出这个类型的一个元素（写一个证明），"
      + "你就证明了它。\n\n"
      + "本关的目标：证明 **「如果 P 且 Q，那么 P」**。\n"
      + "这比上一关多了一个新东西：`∧`（合取/「且」）。\n"
      + "我们需要学会怎么把 `P ∧ Q` 拆开，拿出里面的 P。",
    goal: "P ∧ Q → P",
    hypotheses: ["P Q : Prop"],
    initialCode:
      "example (P Q : Prop) : P ∧ Q → P :=\n  by",
    hints: [
      "第一步和上一关一样：用 `intro h` 把前提 P ∧ Q 拿到手里。",
      "现在你手里有 `h : P ∧ Q`，需要把它拆开。用 `rcases h with ⟨hp, hq⟩` —— 这会把 h 拆成两个独立的条件：hp: P 和 hq: Q。",
      "你的目标是 P。正好手里有 hp: P，直接 `exact hp` 即可。",
    ],
    solution:
      "example (P Q : Prop) : P ∧ Q → P :=\n  by\n    intro h\n    rcases h with ⟨hp, hq⟩\n    exact hp",
    conclusion:
      "做得漂亮！\n\n"
      + "你学会了处理「且」的方法：\n"
      + "- `∧` 表示「且」，`P ∧ Q` 是一个同时包含 P 和 Q 的「包裹」\n"
      + "- `rcases ... with ⟨...⟩` 用来拆开这个包裹\n"
      + "- 尖括号 `⟨ ⟩` 在 VS Code 里输入 `\\<` 和 `\\>`，但我们网页编辑器可以直接复制粘贴\n\n"
      + "下一关我们要学更强大的东西：全称量词 ∀。",
    newTactics: [
      { name: "rcases", desc: "拆解一个结构（如 ∧），把里面的各部分拿出来" },
    ],
    newConcepts: [
      { name: "合取 (∧)", desc: "「且」——P ∧ Q 表示 P 和 Q 同时成立" },
      { name: "Prop", desc: "命题类型。P : Prop 表示 P 是一个命题" },
      { name: "⟨⟩ 模式匹配", desc: "用来拆解结构。⟨hp, hq⟩ 表示把 P∧Q 拆成 hp 和 hq" },
    ],
  },

  "03-implication": {
    slug: "03-implication",
    title: "蕴涵与全称量词",
    order: 3,
    duration: "约 5 分钟",
    introduction:
      "数学中我们常说「对任意 x，都有 ...」。这在 Lean 里用 **∀** 表示。\n\n"
      + "本关要证明一个「显然」的命题：**任意命题 α，α → α**。\n"
      + "说白了就是：不管 α 是什么命题，如果 α 成立，那么 α 成立。\n\n"
      + "这里出现了两个量词：`∀ α : Prop` 和 `α → α`。\n"
      + "有趣的是，**intro 对两者都管用**——你马上会看到。",
    goal: "∀ α : Prop, α → α",
    hypotheses: [],
    initialCode: "example : ∀ α : Prop, α → α :=\n  by",
    hints: [
      "用 `intro α` 引入命题变量 α。这一步相当于说「取任意一个命题，叫它 α」。",
      "现在目标变成了 `α → α`。和第一关一样，用 `intro h` 引入前提 h: α。",
      "目标变成了 α，手里有 h: α，用 `exact h` 完成。",
    ],
    solution:
      "example : ∀ α : Prop, α → α :=\n  by\n    intro α\n    intro h\n    exact h",
    conclusion:
      "好极了！\n\n"
      + "你发现了：**intro 既能处理 → 也能处理 ∀**。\n"
      + "因为从证明的角度看，「如果 A 则 B」和「对所有 x，P(x)」"
      + "都是同一个思路——把假设拿进来，然后证明结论。\n\n"
      + "你已经掌握了 Lean 证明的三个基本功：intro、exact、rcases。"
      + "下一关我们学怎么构造「且」和「双向蕴涵」。",
    newTactics: [
      { name: "intro (对 ∀)", desc: "intro 也可以引入 ∀ 量词，和引入 → 的前提一样" },
    ],
    newConcepts: [
      { name: "全称量词 (∀)", desc: "「对所有」——∀ x, P(x) 表示对任意 x，P(x) 成立" },
      { name: "Prop 宇宙", desc: "α : Prop 说明 α 也是命题，intro 可以引入任意类型" },
    ],
  },

  "04-conjunction": {
    slug: "04-conjunction",
    title: "合取与双向蕴涵",
    order: 4,
    duration: "约 10 分钟",
    introduction:
      "数学里经常要证明「A 当且仅当 B」。在 Lean 里这写成 `A ↔ B`。\n\n"
      + "`P ↔ Q` 其实就是 `(P → Q) ∧ (Q → P)` 的简写"
      + "——即「P 推 Q」且「Q 推 P」。\n\n"
      + "本关目标：证明 **P 且 Q 等价于 Q 且 P**（「且」交换律）。\n"
      + "这很直观吧？但要写出形式化证明，你需要学会：\n"
      + "- 怎么证明一个 ↔ （用 **constructor** 拆成两个方向）\n"
      + "- 怎么构造一个 ∧（用 **⟨...⟩** 把两样东西包起来）",
    goal: "P ∧ Q ↔ Q ∧ P",
    hypotheses: ["P Q : Prop"],
    initialCode: "example (P Q : Prop) : P ∧ Q ↔ Q ∧ P :=\n  by",
    hints: [
      "`constructor` 把 ↔ 拆成两个目标：(1) P∧Q → Q∧P 和 (2) Q∧P → P∧Q。",
      "先证方向一：`intro h` 拿到 P∧Q，`rcases h with ⟨hp, hq⟩` 拆开，"
        + "然后 `exact ⟨hq, hp⟩` 把 hq 和 hq 包成 Q∧P。",
      "方向二几乎一样，只是换一下顺序。两部分的证明都可以写成一行。",
      "注意 `·` 是一个缩进点，表示下一个子目标。在编辑器里可以不用，但推荐加上。",
    ],
    solution:
      "example (P Q : Prop) : P ∧ Q ↔ Q ∧ P :=\n  by\n"
      + "    constructor\n"
      + "    · intro h; rcases h with ⟨hp, hq⟩; exact ⟨hq, hp⟩\n"
      + "    · intro h; rcases h with ⟨hq, hp⟩; exact ⟨hp, hq⟩",
    conclusion:
      "厉害！你已经能证明交换律了。\n\n"
      + "你学到了三个新东西：\n"
      + "- **constructor** — 处理 ↔ 和 ∧ 的证明\n"
      + "- **⟨...⟩ 构造** — 把多个条件打包成一个 ∧ 命题\n"
      + "- **· 子目标** — 当 proof 有多个目标时，用 · 分隔\n\n"
      + "最后一关我们要挑战数学归纳法——这是真正威力巨大的工具！",
    newTactics: [
      { name: "constructor", desc: "把 ↔ 或 ∧ 的证明拆成多个子目标" },
      { name: "⟨⟩ 构造", desc: "构造一个合取命题。⟨hq, hp⟩ 表示「hq 并且 hp」" },
    ],
    newConcepts: [
      { name: "双向蕴涵 (↔)", desc: "「当且仅当」——P ↔ Q 等于 (P→Q) ∧ (Q→P)" },
      { name: "子目标 (·)", desc: "当一个证明分成多部分时，用 · 或缩进来表示每部分" },
    ],
  },

  "05-induction": {
    slug: "05-induction",
    title: "归纳法入门",
    order: 5,
    duration: "约 10 分钟",
    introduction:
      "数学归纳法是形式化证明中最强大的武器。\n\n"
      + "本关目标：**对所有自然数 n，n + 0 = n**。\n"
      + "这看起来也太简单了？但注意：n + 0 = n 并不是「显然」的定义——"
      + "在 Peano 公理体系下，加法的定义是递归的，"
      + "我们必须用归纳法来证明这个等式。\n\n"
      + "归纳法分两步：\n"
      + "1. **基础 (zero)**：证明 n=0 时成立\n"
      + "2. **归纳步 (succ)**：假设 n=k 时成立，证明 n=k+1 时成立\n\n"
      + "Lean 的 `induction` 策略会自动生成这两个子目标，"
      + "并给你归纳假设 `ih`。",
    goal: "∀ n : Nat, n + 0 = n",
    hypotheses: [],
    initialCode: "example (n : Nat) : n + 0 = n :=\n  by",
    hints: [
      "用 `induction n with` 对 n 做归纳。会出现两个分支：`zero` 和 `succ n ih`。",
      "基本情况 `zero`：目标变成 `0 + 0 = 0`。根据加法定义 `Nat.add_zero`，这可以直接用 `rfl` 证明。",
      "归纳步 `succ n ih`：目标是 `(n+1) + 0 = n+1`。"
        + "用 `rw [Nat.add_succ]` 把左边展开，得到 `(n + 0) + 1`。"
        + "然后用 `rw [ih]` 把 `n + 0` 换成 `n`，目标变成 `n + 1 = n + 1`，用 `rfl`。",
      "`Nat.add_succ` 是 Mathlib 里的引理：`a + (b+1) = (a+b) + 1`。",
    ],
    solution:
      "example (n : Nat) : n + 0 = n :=\n  by\n"
      + "    induction n with\n"
      + "    | zero => rfl\n"
      + "    | succ n ih =>\n"
      + "      rw [Nat.add_succ, ih]",
    conclusion:
      "恭喜！你完成了全部五节课！\n\n"
      + "你掌握了 Lean 4 证明的核心策略：\n"
      + "- **intro / exact** — 处理 → 和 ∀\n"
      + "- **rcases / ⟨⟩** — 拆解和构造 ∧\n"
      + "- **constructor** — 处理 ↔\n"
      + "- **induction** — 数学归纳法\n"
      + "- **rw / rfl** — 等式重写和定义等式\n\n"
      + "接下来你可以做什么？\n"
      + "1. 安装 VS Code + Lean 4，在自己的电脑上写证明\n"
      + "2. 去 [Mathematics in Lean](https://leanprover-community.github.io/mathematics_in_lean/) 学习更多\n"
      + "3. 玩 [Natural Number Game](https://adam.math.hhu.de/) 挑战更多关卡",
    newTactics: [
      { name: "induction", desc: "数学归纳法。对 Nat 自动生成 zero 和 succ 两个分支" },
      { name: "rw", desc: "等式重写。用已知等式替换表达式中的一部分" },
      { name: "rfl", desc: "证明两边定义相等的等式（如 0+0=0, x=x）" },
    ],
    newConcepts: [
      { name: "归纳假设 (ih)", desc: "在归纳步骤中，「假设对 n 成立」这个前提" },
      { name: "Peano 公理", desc: "自然数由 zero 和 succ 两种方式构成" },
      { name: "Nat.add_succ", desc: "Mathlib 中的引理：a + succ b = succ (a + b)" },
    ],
  },
};

const LESSON_LIST = Object.values(LESSONS).sort((a, b) => a.order - b.order);

export default function LessonPage() {
  const { slug } = useParams<{ slug: string }>();
  const lesson = LESSONS[slug || ""];
  const [completed, setCompleted] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const [progress, setProgress] = useState<UserProgress>({
    completedLessons: [],
    completedExercises: {},
  });

  useEffect(() => {
    setProgress(getProgress());
  }, [slug]);

  const completedCount = LESSON_LIST.filter((l) =>
    progress.completedLessons.includes(l.slug),
  ).length;

  const handleSuccess = useCallback(() => {
    setCompleted(true);
    if (lesson) {
      markLessonCompleted(lesson.slug);
    }
  }, [lesson]);

  if (!lesson) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">未找到课程</h1>
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          返回首页
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <ProgressBar current={completedCount} total={LESSON_LIST.length} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left column: lesson content */}
        <div className="lg:col-span-3 space-y-5">
          {/* Header */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-gray-400">
                第 {lesson.order} 课
              </span>
              <span className="text-xs text-gray-400">{lesson.duration}</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {lesson.title}
            </h1>
          </div>

          {/* Introduction (like NNG's Introduction) */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Introduction
            </h2>
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {lesson.introduction}
            </div>
          </div>

          {/* New tactics & concepts (like NNG's inventory) */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              本关学到的新东西
            </h2>

            {lesson.newTactics.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-green-700 mb-2">
                  策略 (Tactics)
                </h3>
                <div className="space-y-2">
                  {lesson.newTactics.map((t) => (
                    <div
                      key={t.name}
                      className="flex gap-2 text-sm border-l-2 border-green-300 pl-3"
                    >
                      <code className="text-green-700 font-mono font-semibold shrink-0">
                        {t.name}
                      </code>
                      <span className="text-gray-600">{t.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {lesson.newConcepts.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-blue-700 mb-2">
                  概念 (Concepts)
                </h3>
                <div className="space-y-2">
                  {lesson.newConcepts.map((c) => (
                    <div
                      key={c.name}
                      className="flex gap-2 text-sm border-l-2 border-blue-300 pl-3"
                    >
                      <code className="text-blue-700 font-mono font-semibold shrink-0">
                        {c.name}
                      </code>
                      <span className="text-gray-600">{c.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Goal */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              证明目标
            </h2>
            <GoalDisplay
              goal={lesson.goal}
              hypotheses={
                lesson.hypotheses.length > 0
                  ? lesson.hypotheses
                  : undefined
              }
            />
          </div>

          {/* Step-by-step hints (like NNG's Hint) */}
          <div className="bg-white border border-amber-200 rounded-lg p-5">
            <h2 className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-3">
              分步提示
            </h2>
            <ol className="space-y-2.5">
              {lesson.hints.map((hint, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm text-gray-700"
                >
                  <span className="text-amber-500 font-bold shrink-0">
                    {i + 1}.
                  </span>
                  <span>{hint}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Solution (collapsible) */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              {showSolution ? "收起参考解答 ▲" : "查看参考解答 ▼"}
            </button>
            {showSolution && (
              <pre className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-md text-sm font-mono text-gray-800 overflow-x-auto">
                {lesson.solution}
              </pre>
            )}
          </div>

          {/* Conclusion (like NNG's Conclusion) */}
          {completed && (
            <div className="bg-green-50 border border-green-300 rounded-lg p-6">
              <h2 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-3">
                Conclusion
              </h2>
              <div className="text-sm text-green-800 leading-relaxed whitespace-pre-line">
                {lesson.conclusion}
              </div>
            </div>
          )}
        </div>

        {/* Right column: editor */}
        <div className="lg:col-span-2">
          <div className="sticky top-4 space-y-4">
            {/* Quick usage guide */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs text-blue-800 leading-relaxed">
              <strong>怎么玩：</strong>
              编辑器里有预写代码。
              直接点 <strong>运行 ▶</strong> 看效果，
              或修改代码后运行。
              卡住了看左侧的提示。
            </div>
            <LeanEditor
              initialCode={lesson.initialCode}
              exerciseId={lesson.slug}
              lessonSlug={lesson.slug}
              onSuccess={handleSuccess}
            />
          </div>
        </div>
      </div>

      <LessonNav lessons={LESSON_LIST} currentSlug={lesson.slug} />
    </div>
  );
}
