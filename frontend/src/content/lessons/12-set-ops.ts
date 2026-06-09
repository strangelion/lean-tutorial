import type { LessonMeta } from "./index";

const lesson: LessonMeta = {
  slug: "12-set-ops",
  title: "集合的运算与性质",
  order: 12,
  duration: "约 30 分钟",
  introduction:
    "有了集合的基本概念，我们来学习集合运算。\n\n"
    + "- **并集** `A ∪ B`：元素属于 A 或 属于 B\n"
    + "- **交集** `A ∩ B`：元素同时属于 A 和 B\n\n"
    + "本关目标：证明交集的**交换律**——`A ∩ B = B ∩ A`。\n\n"
    + "在 Lean 中，集合相等 `A = B` 用**外延公理**：两个集合相等当且仅当它们包含完全相同的元素。\n"
    + "也就是说，`A = B ↔ (∀ x, x ∈ A ↔ x ∈ B)`。\n\n"
    + "所以证明集合相等，就是对任意 x，证明 x ∈ A ∩ B ↔ x ∈ B ∩ A。\n"
    + "展开定义后，本质上就是证明 `∧` 的交换律——你已经会了！",
  goal: "A ∩ B = B ∩ A",
  hypotheses: ["A B : Set Nat"],
  initialCode: "example (A B : Set Nat) : A ∩ B = B ∩ A :=\n  by",
  hints: [
    "用 `ext x` 策略。它把集合相等的目标展开为：对任意元素 x，x ∈ A∩B ↔ x ∈ B∩A。",
    "现在目标是 `x ∈ A ∩ B ↔ x ∈ B ∩ A`。用 `constructor` 把它拆成两个方向。",
    "第一个方向 `x ∈ A ∩ B → x ∈ B ∩ A`：用 `intro h`，然后 `rcases h with ⟨hA, hB⟩` 拆开交集。",
    "现在要用 `hA : x ∈ A` 和 `hB : x ∈ B` 证明 `x ∈ B ∩ A`。`∩` 的构造用 `⟨⟩` 角度括号，即 `exact ⟨hB, hA⟩`。",
    "第二个方向完全对称：`intro h; rcases h with ⟨hB, hA⟩; exact ⟨hA, hB⟩`。",
  ],
  solution:
    "example (A B : Set Nat) : A ∩ B = B ∩ A :=\n  by\n"
    + "    ext x\n"
    + "    constructor\n"
    + "    · intro h\n"
    + "      rcases h with ⟨hA, hB⟩\n"
    + "      exact ⟨hB, hA⟩\n"
    + "    · intro h\n"
    + "      rcases h with ⟨hB, hA⟩\n"
    + "      exact ⟨hA, hB⟩",
  conclusion:
    "顺利！你证明了集合交集的交换律。\n\n"
    + "你学到了两个新策略：\n"
    + "- **ext** — 用外延公理展开集合相等（set extensionality）\n"
    + "- **∩ 的处理** — 和 ∧ 完全一样：用 `rcases` 拆、用 `⟨⟩` 构造\n\n"
    + "这体现了 Lean 的美妙之处：集合运算和命题逻辑使用同一套策略！\n\n"
    + "下一课我们学习函数的基本性质。",
  newTactics: [
    { name: "ext", desc: "外延性 (extensionality)：把集合等式 A = B 展开为 ∀ x, x ∈ A ↔ x ∈ B" },
  ],
  newConcepts: [
    { name: "∪ (并集)", desc: "A ∪ B = {x | x ∈ A ∨ x ∈ B}。用 left/right 构造，用 rcases 拆" },
    { name: "∩ (交集)", desc: "A ∩ B = {x | x ∈ A ∧ x ∈ B}。用 ⟨⟩ 构造，用 rcases 拆" },
    { name: "外延公理", desc: "两个集合相等 ⟺ 它们包含完全相同的元素" },
  ],
};

export default lesson;
