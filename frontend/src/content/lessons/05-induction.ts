import type { LessonMeta } from "./index";

const lesson: LessonMeta = {
  slug: "05-induction",
  title: "归纳法入门",
  order: 5,
  duration: "约 45 分钟",
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
};

export default lesson;
