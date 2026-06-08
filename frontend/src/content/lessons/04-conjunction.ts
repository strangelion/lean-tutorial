import type { LessonMeta } from "./index";

const lesson: LessonMeta = {
  slug: "04-conjunction",
  title: "合取与双向蕴涵",
  order: 4,
  duration: "约 30 分钟",
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
};

export default lesson;
