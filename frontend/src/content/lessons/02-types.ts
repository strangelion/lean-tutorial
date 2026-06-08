import type { LessonMeta } from "./index";

const lesson: LessonMeta = {
  slug: "02-types",
  title: "类型与命题",
  order: 2,
  duration: "约 25 分钟",
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
};

export default lesson;
