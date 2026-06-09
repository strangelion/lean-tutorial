import type { LessonMeta } from "./index";

const lesson: LessonMeta = {
  slug: "15-subgroups",
  title: "子群与子群判定",
  order: 15,
  duration: "约 35 分钟",
  introduction:
    "一个群的子集 H ⊆ G 称为**子群 (Subgroup)**，如果它本身也是一个群"
    + "（关于 G 中的同样运算）。\n\n"
    + "要检查 H 是否是子群，通常只需验证三条：\n"
    + "1. **包含单位元**：`1 ∈ H`\n"
    + "2. **封闭于乘法**：若 `a, b ∈ H`，则 `a * b ∈ H`\n"
    + "3. **封闭于逆元**：若 `a ∈ H`，则 `a⁻¹ ∈ H`\n\n"
    + "本关目标：两个子群的**交集仍是子群**。\n"
    + "即：如果 H₁ 和 H₂ 都是子群，那么 H₁ ∩ H₂ 也是子群。\n\n"
    + "这是子群论的基础构造——它保证了子群族有「最小的」子群。",
  goal: "IsSubgroup (H₁ ∩ H₂)",
  hypotheses: [
    "G : Type",
    "H₁ H₂ : Set G",
    "mul : G → G → G",
    "one : G",
    "inv : G → G",
    "h₁ : IsSubgroup H₁",
    "h₂ : IsSubgroup H₂",
  ],
  initialCode:
    "variable (G : Type)\n"
    + "variable (mul : G → G → G)\n"
    + "variable (one : G)\n"
    + "variable (inv : G → G)\n"
    + "notation:max a \"*\" b => mul a b\n"
    + "notation:max a \"⁻¹\" => inv a\n"
    + "notation:max \"1\" => one\n"
    + "\n"
    + "-- Lean's Set type: Set G = G → Prop, x ∈ H means H x\n"
    + "def IsSubgroup (H : Set G) : Prop :=\n"
    + "  one ∈ H ∧ (∀ a b, a ∈ H → b ∈ H → a * b ∈ H) ∧ (∀ a, a ∈ H → a⁻¹ ∈ H)\n"
    + "\n"
    + "variable (H₁ H₂ : Set G)\n"
    + "variable (h₁ : one ∈ H₁ ∧ (∀ a b, a ∈ H₁ → b ∈ H₁ → a * b ∈ H₁) ∧ (∀ a, a ∈ H₁ → a⁻¹ ∈ H₁))\n"
    + "variable (h₂ : one ∈ H₂ ∧ (∀ a b, a ∈ H₂ → b ∈ H₂ → a * b ∈ H₂) ∧ (∀ a, a ∈ H₂ → a⁻¹ ∈ H₂))\n"
    + "\n"
    + "example : one ∈ (H₁ ∩ H₂) ∧ (∀ a b, a ∈ (H₁ ∩ H₂) → b ∈ (H₁ ∩ H₂) → a * b ∈ (H₁ ∩ H₂)) ∧ (∀ a, a ∈ (H₁ ∩ H₂) → a⁻¹ ∈ (H₁ ∩ H₂)) :=\n  by",
  hints: [
    "现在目标是证明交集的三个条件（即 `IsSubgroup (H₁ ∩ H₂)` 展开后的形式）。第一个条件：`one ∈ H₁ ∩ H₂`。",
    "`one ∈ H₁ ∩ H₂` 展开就是 `one ∈ H₁ ∧ one ∈ H₂`。用 `constructor` 拆开，"
      + "然后分别从 `h₁.left` 和 `h₂.left` 获取 h₁ 和 h₂ 各自的单位元条件。",
    "第二个条件：对任意 a b，如果它们在交集中，它们的乘积也在交集中。"
      + "`rcases` 拆开 a b 在交集中的条件（各是两个命题的 ∧），然后再次用构造子。"
      + "乘法封闭性分别从 h₁ 和 h₂ 各自的封闭性得到。",
    "第三个条件类似：对任意 a 在交集中，a⁻¹ 也在交集中。拆开 a 的条件，分别用 h₁ 和 h₂ 的逆封闭性。",
  ],
  solution:
    "example : one ∈ (H₁ ∩ H₂) ∧ (∀ a b, a ∈ (H₁ ∩ H₂) → b ∈ (H₁ ∩ H₂) → a * b ∈ (H₁ ∩ H₂)) ∧ (∀ a, a ∈ (H₁ ∩ H₂) → a⁻¹ ∈ (H₁ ∩ H₂)) :=\n  by\n"
    + "    rcases h₁ with ⟨h₁_one, h₁_mul, h₁_inv⟩\n"
    + "    rcases h₂ with ⟨h₂_one, h₂_mul, h₂_inv⟩\n"
    + "    refine ⟨?_, ?_, ?_⟩\n"
    + "    · -- one in intersection\n"
    + "      exact ⟨h₁_one, h₂_one⟩\n"
    + "    · -- closure under multiplication\n"
    + "      intro a b ha hb\n"
    + "      rcases ha with ⟨ha₁, ha₂⟩\n"
    + "      rcases hb with ⟨hb₁, hb₂⟩\n"
    + "      exact ⟨h₁_mul a b ha₁ hb₁, h₂_mul a b ha₂ hb₂⟩\n"
    + "    · -- closure under inverse\n"
    + "      intro a ha\n"
    + "      rcases ha with ⟨ha₁, ha₂⟩\n"
    + "      exact ⟨h₁_inv a ha₁, h₂_inv a ha₂⟩",
  conclusion:
    "非常好！你证明了「子群的交集仍是子群」。\n\n"
    + "核心技巧：\n"
    + "- 用 `rcases` 把一个「三重 ∧」拆成三个独立的条件\n"
    + "- 用 `refine ⟨?_, ?_, ?_⟩` 把目标拆成三个子目标，依次证明\n"
    + "- 交集元素的处理：`ha : a ∈ H₁ ∩ H₂` 可以 `rcases` 成 `⟨ha₁, ha₂⟩`\n\n"
    + "这种「拆开→分别处理→重新组合」的模式在形式化证明中非常常见。",
  newTactics: [
    { name: "refine ⟨?_, ?_⟩", desc: "把包含多个部分的目标拆分成若干子目标，用 `?_` 占位" },
  ],
  newConcepts: [
    { name: "子群 (Subgroup)", desc: "群的子集，自身在该运算下也是群" },
    { name: "子群判定条件", desc: "包含单位元 + 乘法封闭 + 逆元封闭" },
    { name: "IsSubgroup", desc: "用 Set α 和命题定义的子群谓词" },
  ],
};

export default lesson;
