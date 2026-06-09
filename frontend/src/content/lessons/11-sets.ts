import type { LessonMeta } from "./index";

const lesson: LessonMeta = {
  slug: "11-sets",
  title: "集合的基本操作",
  order: 11,
  duration: "约 35 分钟",
  introduction:
    "你已经掌握了命题逻辑的证明策略。从这一课开始，我们进入**集合论**。\n\n"
    + "在 Lean 中，`Set α` 定义为 `α → Prop`——一个集合就是把每个元素映射到一个命题"
    + "（「这个元素属于集合」是真还是假）。\n\n"
    + "`x ∈ A` 读作「x 属于 A」，本质上就是 `A x`——把 A 当作谓词应用到 x 上。\n\n"
    + "本关目标：证明集合包含关系的**自反性**——任意集合都是自己的子集。\n"
    + "即 `A ⊆ A`。你将学到：\n"
    + "- `Set` 类型和 `∈` 符号的含义\n"
    + "- `⊆` 的定义：`A ⊆ B ↔ ∀ x, x ∈ A → x ∈ B`\n"
    + "- 用 `intro` 展开定义，层层推进",
  goal: "A ⊆ A",
  hypotheses: ["A : Set Nat"],
  initialCode: "example (A : Set Nat) : A ⊆ A :=\n  by",
  hints: [
    "`A ⊆ A` 的定义是 `∀ x, x ∈ A → x ∈ A`。所以先用 `intro x` 引入任意元素 x。",
    "现在目标变成 `x ∈ A → x ∈ A`。这又是一个蕴涵，继续用 `intro hx`。hx 就是 `x ∈ A` 的证明。",
    "目标现在是 `x ∈ A`。手里已经有 `hx : x ∈ A`，直接用 `exact hx`！",
    "这个证明虽然简单，但它展示了集合论的核心模式：把集合关系展开成命题逻辑来处理。",
  ],
  solution:
    "example (A : Set Nat) : A ⊆ A :=\n  by\n"
    + "    intro x\n"
    + "    intro hx\n"
    + "    exact hx",
  conclusion:
    "完成！你证明了「每个集合都是自己的子集」——这是集合论中最基本的性质。\n\n"
    + "关键收获：\n"
    + "- `Set α` = `α → Prop`：集合就是谓词\n"
    + "- `x ∈ A` = `A x`：属于关系就是函数应用\n"
    + "- `A ⊆ B` = `∀ x, x ∈ A → x ∈ B`：子集关系展开后就是全称量词加蕴涵\n\n"
    + "下一课我们将学习集合的并、交运算。",
  newTactics: [],
  newConcepts: [
    { name: "Set α", desc: "类型 α 的集合，定义为 α → Prop。集合就是谓词" },
    { name: "∈ (属于)", desc: "x ∈ A 表示 x 是集合 A 的元素。本质上是 A x" },
    { name: "⊆ (子集)", desc: "A ⊆ B 定义为 ∀ x, x ∈ A → x ∈ B" },
  ],
};

export default lesson;
