import type { LessonMeta } from "./index";

const lesson: LessonMeta = {
  slug: "10-negation",
  title: "否定与反证法",
  order: 10,
  duration: "约 30 分钟",
  introduction:
    "数学中，「不是」「并非」「不可能」随处可见。"
    + "在 Lean 里，`¬ P`（非 P）定义为 `P → False`——即「P 会导致矛盾」。\n\n"
    + "这个定义非常优雅：要否定 P，就证明 P 不可能为真。\n\n"
    + "本关目标：证明**换质换位律**——`(P → Q) → (¬ Q → ¬ P)`。\n"
    + "意思是：如果 P 推 Q，那么 Q 不成立时 P 也不成立。\n\n"
    + "你会学到：\n"
    + "- `¬ P` 就是 `P → False`，所以 `intro` 和 `apply` 对它都管用\n"
    + "- 有矛盾时，`exfalso` 可以把任何目标变成 `False`",
  goal: "(P → Q) → (¬ Q → ¬ P)",
  hypotheses: ["P Q : Prop"],
  initialCode: "example (P Q : Prop) : (P → Q) → (¬ Q → ¬ P) :=\n  by",
  hints: [
    "先用 `intro hpq` 引入前提 P→Q，再用 `intro hnq` 引入前提 ¬Q。",
    "现在目标变成 `¬ P`。展开定义就是 `P → False`。一样用 `intro hP` 引入 P 的证明。",
    "目标现在是 `False`。手里有三个条件：`hpq: P → Q`、`hnq: ¬ Q`、`hP: P`。"
      + "`apply hnq` 把目标从 `False` 变成 `Q`（因为 hnq 是 `Q → False`）。",
    "目标变成 `Q`。手里有 `hpq: P → Q` 和 `hP: P`。`apply hpq` 然后 `exact hP`。",
    "另一种思路：当你同时有 `hnq : ¬ Q` 和「Q 的证明」时，可以直接 `apply hnq`。"
      + "这就是 ¬ 的使用方式——把它当作 `→ False` 来处理。",
  ],
  solution:
    "example (P Q : Prop) : (P → Q) → (¬ Q → ¬ P) :=\n  by\n"
    + "    intro hpq\n"
    + "    intro hnq\n"
    + "    intro hP\n"
    + "    apply hnq\n"
    + "    apply hpq\n"
    + "    exact hP",
  conclusion:
    "恭喜！你完成了全部十节课！\n\n"
    + "你学会了 Lean 4 命题逻辑的核心策略：\n"
    + "- **intro / exact** — 处理 → 和 ∀\n"
    + "- **rcases / ⟨⟩** — 拆解和构造 ∧ 与 ∃\n"
    + "- **constructor** — 处理 ↔\n"
    + "- **left / right** — 处理 ∨ 的证明\n"
    + "- **apply** — 反向推理\n"
    + "- **induction** — 数学归纳法\n"
    + "- **simp / rw / rfl** — 等式化简\n"
    + "- **¬ 即 → False** — 否定的本质\n\n"
    + "接下来你可以：\n"
    + "1. 安装 VS Code + Lean 4，在自己的电脑上写证明\n"
    + "2. 去 [Mathematics in Lean](https://leanprover-community.github.io/mathematics_in_lean/) 继续学习\n"
    + "3. 玩 [Natural Number Game](https://adam.math.hhu.de/) 挑战更多关卡",
  newTactics: [
    { name: "exfalso", desc: "当上下文中有矛盾时，把当前目标替换为 False" },
  ],
  newConcepts: [
    { name: "否定 (¬)", desc: "¬ P 定义为 P → False。否定 P 就是证明 P 会导致矛盾" },
    { name: "换质换位 (contrapositive)", desc: "(P→Q) → (¬Q→¬P)，反证法的基础" },
  ],
};

export default lesson;
