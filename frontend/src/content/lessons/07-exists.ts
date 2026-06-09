import type { LessonMeta } from "./index";

const lesson: LessonMeta = {
  slug: "07-exists",
  title: "存在量词：有没有这样的东西？",
  order: 7,
  duration: "约 25 分钟",
  introduction:
    "数学里不只说「对所有 x...」，也常说「存在一个 x...」。\n"
    + "`∃ x, P x` 读作「存在 x 使得 P(x) 成立」。\n\n"
    + "本关目标：证明 **存在一个自然数 n，使得 n + 0 = 0**。\n"
    + "这太简单了——n = 0 就行。但关键是要学会：\n\n"
    + "- 怎么**构造**一个 ∃ 证明（提供「见证」`witness`）\n"
    + "- 怎么**使用**一个 ∃ 假设（用 `rcases` 把见证拿出来）\n\n"
    + "新策略 `refine` 比 `exact` 更灵活："
    + "它可以留下 `?_` 占位符表示「这个子目标等会儿再证」。",
  goal: "∃ n : Nat, n + 0 = 0",
  hypotheses: [],
  initialCode: "example : ∃ n : Nat, n + 0 = 0 :=\n  by",
  hints: [
    "用 `refine ⟨0, ?_⟩` 告诉 Lean：「见证」是 n = 0，然后我还要证明 0 + 0 = 0。",
    "`?_` 是一个「洞」——Lean 会把它变成一个新的子目标。运行后你会发现目标变成了 `0 + 0 = 0`。",
    "现在目标是 `0 + 0 = 0`。根据自然数加法的定义，零加任何数等于它本身。直接用 `rfl` 就完成了。",
  ],
  solution:
    "example : ∃ n : Nat, n + 0 = 0 :=\n  by\n    refine ⟨0, rfl⟩",
  conclusion:
    "漂亮！\n\n"
    + "证明 ∃ 的核心步骤：\n"
    + "- 用 `refine ⟨w, ?_⟩` 提供「见证」`w` 和留一个洞\n"
    + "- 然后证明这个 `w` 确实满足条件\n\n"
    + "`∃` 和 `∀` 是对偶的：\n"
    + "- ∀：对**所有** x，P(x) 成立 → 用 `intro`\n"
    + "- ∃：**存在**某个 x 使得 P(x) 成立 → 用 `refine ⟨..., ?_⟩`\n\n"
    + "下一关我们要学 `apply`——从目标反推的策略。",
  newTactics: [
    { name: "refine", desc: "部分构造证明。用 ?_ 表示「待填充的子目标」" },
    { name: "refine ⟨w, ?_⟩", desc: "对 ∃ 提供见证 w，留下一个需要证明的洞" },
  ],
  newConcepts: [
    { name: "存在量词 (∃)", desc: "「存在」——∃ x, P x 表示至少有一个 x 使 P(x) 成立" },
    { name: "见证 (witness)", desc: "证明 ∃ 时需要明确给出一个具体的值" },
    { name: "洞 (?_ 占位符)", desc: "告诉 Lean「这里我知道要填什么，具体证明等会儿再写」" },
  ],
};

export default lesson;
