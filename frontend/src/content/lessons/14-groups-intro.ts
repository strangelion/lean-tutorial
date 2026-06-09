import type { LessonMeta } from "./index";

const lesson: LessonMeta = {
  slug: "14-groups-intro",
  title: "群的定义与基本性质",
  order: 14,
  duration: "约 40 分钟",
  introduction:
    "群 (Group) 是现代代数的基石。一个群由一个集合 G 和一个二元运算 `*` 组成，满足三条公理：\n\n"
    + "1. **结合律**：`(a * b) * c = a * (b * c)`\n"
    + "2. **单位元**：存在 `1`，使得 `1 * a = a` 且 `a * 1 = a`\n"
    + "3. **逆元**：每个元素 `a` 有逆 `a⁻¹`，使得 `a⁻¹ * a = 1` 且 `a * a⁻¹ = 1`\n\n"
    + "本关目标：证明 `a⁻¹ * (a * b) = b`——这体现了「逆元的本质就是撤销操作」。\n\n"
    + "我们会在课程中**手动定义**群的结构（用 `variable` + `notation`），"
    + "这样你能真正理解每个公理是如何被使用的。",
  goal: "a⁻¹ * (a * b) = b",
  hypotheses: [
    "G : Type",
    "mul : G → G → G",
    "one : G",
    "inv : G → G",
    "mul_assoc : ∀ a b c : G, (a * b) * c = a * (b * c)",
    "one_mul : ∀ a : G, 1 * a = a",
    "mul_one : ∀ a : G, a * 1 = a",
    "mul_inv_left : ∀ a : G, a⁻¹ * a = 1",
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
    + "variable (mul_assoc : ∀ a b c : G, (a * b) * c = a * (b * c))\n"
    + "variable (one_mul : ∀ a : G, 1 * a = a)\n"
    + "variable (mul_one : ∀ a : G, a * 1 = a)\n"
    + "variable (mul_inv_left : ∀ a : G, a⁻¹ * a = 1)\n"
    + "\n"
    + "example (a b : G) : a⁻¹ * (a * b) = b :=\n  by",
  hints: [
    "用 `calc` 块来做等式链式推导。从左边 `a⁻¹ * (a * b)` 开始。",
    "第一步，用结合律把括号重新分组：`rw [mul_assoc]` 或 `rw [← mul_assoc]`。"
      + "`a⁻¹ * (a * b)` 中括号在右边，用 `rw [← mul_assoc (inv a) a b]` 变成 `(a⁻¹ * a) * b`。",
    "现在 `(a⁻¹ * a) * b`。用 `rw [mul_inv_left a]` 把 `a⁻¹ * a` 替换为 `1`，得到 `1 * b`。",
    "最后 `rw [one_mul b]`，`1 * b` 变成 `b`。完成！",
    "calc 的语法：calc 后面每一行是 `expr = expr := by ...`，"
      + "可以用 rw 也可以用 simp 等。最后一行 `_ = b := by rw [one_mul]`。",
  ],
  solution:
    "example (a b : G) : a⁻¹ * (a * b) = b :=\n  by\n"
    + "    calc\n"
    + "      a⁻¹ * (a * b) = (a⁻¹ * a) * b := by rw [← mul_assoc]\n"
    + "      _ = 1 * b := by rw [mul_inv_left]\n"
    + "      _ = b := by rw [one_mul]",
  conclusion:
    "漂亮！你用 `calc` 做了第一个群论证明。\n\n"
    + "你学到了：\n"
    + "- **群公理**在 Lean 中如何用 `variable` 和 `notation` 定义\n"
    + "- **calc** 块——做等式链式推导的标准方式\n"
    + "- **rw [← ...]**——反向重写，用于把括号「收」回来"
    + "- 逆元的本质：`a⁻¹ * a` 消掉变成 `1`\n\n"
    + "这个证明虽然只有三步，但展示了群论证明的核心模式：\n"
    + "结合律重分组 → 逆元消去 → 单位元化简。\n\n"
    + "下一课我们学习子群！",
  newTactics: [
    { name: "calc", desc: "链式等式证明块。`calc a = b := by ... _ = c := by ...`" },
    { name: "rw [← ...]", desc: "反向重写。`rw [← mul_assoc]` 把 a*(b*c) 变成 (a*b)*c" },
  ],
  newConcepts: [
    { name: "群 (Group)", desc: "集合 + 满足结合律/单位元/逆元的二元运算" },
    { name: "notation", desc: "自定义符号。`notation a * b => mul a b` 让代码像数学" },
    { name: "calc 块", desc: "逐步等式推导，每行列出一个等式和它的证明理由" },
  ],
};

export default lesson;
