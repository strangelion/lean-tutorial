import type { LessonMeta } from "./index";

const lesson: LessonMeta = {
  slug: "06-or",
  title: "析取：「或」的逻辑",
  order: 6,
  duration: "约 25 分钟",
  introduction:
    "前几关我们一直在和「且」(∧) 打交道。但数学中「或」(∨) 同样常见。\n\n"
    + "`P ∨ Q` 读作「P 或 Q」——只要 P 和 Q 中有一个成立，整个命题就成立。\n\n"
    + "本关目标：证明 **「P 或 Q」可以交换顺序**，即 `P ∨ Q → Q ∨ P`。\n\n"
    + "这需要学会两件事：\n"
    + "- 怎么**证明**一个「或」命题（用 `left` 或 `right` 选一边）\n"
    + "- 怎么**使用**一个「或」假设（用 `rcases` 分情况讨论）",
  goal: "P ∨ Q → Q ∨ P",
  hypotheses: ["P Q : Prop"],
  initialCode: "example (P Q : Prop) : P ∨ Q → Q ∨ P :=\n  by",
  hints: [
    "第一步和之前一样：`intro h` 把前提 `h : P ∨ Q` 拿到手里。",
    "现在 `h` 是一个「或」——它可能是 P 也可能是 Q。用 `rcases h with hP | hQ` 分两种情况讨论。竖线 `|` 表示「或者」。",
    "第一种情况 `hP : P`：目标变成 `Q ∨ P`。既然我们有 P，用 `right` 选择右边，然后 `exact hP`。",
    "第二种情况 `hQ : Q`：目标也是 `Q ∨ P`。用 `left` 选择左边，然后 `exact hQ`。",
    "注意 `left` 和 `right` 指的是你选 ∨ 的左边还是右边。`left` → 选 Q，`right` → 选 P。",
  ],
  solution:
    "example (P Q : Prop) : P ∨ Q → Q ∨ P :=\n  by\n"
    + "    intro h\n"
    + "    rcases h with hP | hQ\n"
    + "    · right; exact hP\n"
    + "    · left; exact hQ",
  conclusion:
    "干得漂亮！\n\n"
    + "`∨` 的证明模式：\n"
    + "- **证明** `A ∨ B`：选一边——`left` 去证 A，或 `right` 去证 B\n"
    + "- **使用** `h : A ∨ B`：`rcases h with hA | hB` 分情况讨论\n\n"
    + "这和 `∧` 恰好对称：∧ 用 `⟨⟩` 组合/拆解，∨ 用 `left`/`right` 证明、用 `|` 分情况。\n\n"
    + "`∨` 和 `∧` 是命题逻辑的两块基石。下一关我们学「存在量词」∃。",
  newTactics: [
    { name: "left", desc: "证明 A ∨ B 时，选择证明左边的 A" },
    { name: "right", desc: "证明 A ∨ B 时，选择证明右边的 B" },
    { name: "rcases ... with ... | ...", desc: "分情况讨论 ∨。竖线 | 分隔不同情况" },
  ],
  newConcepts: [
    { name: "析取 (∨)", desc: "「或」——P ∨ Q 表示 P 和 Q 至少一个成立" },
    { name: "分情况讨论", desc: "∨ 的本质：不能确定是哪一边，所以要两种情况都证" },
  ],
};

export default lesson;
