import type { LessonMeta } from "./index";

const lesson: LessonMeta = {
  slug: "08-apply",
  title: "apply：反向推理的艺术",
  order: 8,
  duration: "约 30 分钟",
  introduction:
    "目前为止，我们的证明都是从前提推到结论（前向推理）。"
    + "但数学家常常**反着来**：看到目标，问「什么东西能推出它？」\n\n"
    + "`apply` 就是干这个的——它把目标替换成另一个更容易的目标。\n\n"
    + "本关目标：证明 **蕴涵的传递性**。如果 P → Q 且 Q → R，那么 P → R。\n"
    + "直观上：P 推 Q，Q 推 R，所以 P 推 R。\n\n"
    + "用 `apply` 可以从目标 `R` 反推到 `Q`，再反推到 `P`——你就拿到了 P，完成。",
  goal: "P → R",
  hypotheses: ["P Q R : Prop", "hpq : P → Q", "hqr : Q → R", "hP : P"],
  initialCode:
    "example (P Q R : Prop) (hpq : P → Q) (hqr : Q → R) (hP : P) : R :=\n  by",
  hints: [
    "目标现在是 `R`。手里有 `hqr : Q → R`。用 `apply hqr` 试试。",
    "`apply hqr` 把目标从 `R` 变成了 `Q`（因为 `hqr` 说「如果 Q 则 R」）。",
    "目标变成 `Q` 了。手里有 `hpq : P → Q`，再 `apply hpq`——目标变成 `P`。",
    "目标变成 `P`。手上正好有 `hP : P`，`exact hP` 收工！",
  ],
  solution:
    "example (P Q R : Prop) (hpq : P → Q) (hqr : Q → R) (hP : P) : R :=\n  by\n"
    + "    apply hqr\n"
    + "    apply hpq\n"
    + "    exact hP",
  conclusion:
    "厉害！你已经掌握了 `apply` 的用法。\n\n"
    + "`apply h` 的原理：如果 `h : A → B`，且目标是 `B`，"
    + "那么 `apply h` 把目标替换成 `A`。\n\n"
    + "这就像倒着搭建多米诺骨牌：\n"
    + "- 目标是最右端（R）\n"
    + "- `apply hqr`：「推到 R 需要 Q」\n"
    + "- `apply hpq`：「推到 Q 需要 P」\n"
    + "- `exact hP`：「刚好有 P！」\n\n"
    + "`intro`（前向）和 `apply`（反向）是处理 → 的两大基本策略。\n"
    + "下一关我们学 `simp`——让机器帮你化简。",
  newTactics: [
    { name: "apply", desc: "把目标 B 替换成 A，前提是需要一个 A → B 的引理" },
  ],
  newConcepts: [
    { name: "反向推理 (backward)", desc: "从目标出发，找什么能推出它。和 intro 的前向推理互补" },
    { name: "传递性 (transitivity)", desc: "如果 A→B 且 B→C，则 A→C" },
  ],
};

export default lesson;
