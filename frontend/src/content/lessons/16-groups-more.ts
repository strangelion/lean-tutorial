import type { LessonMeta } from "./index";

const lesson: LessonMeta = {
  slug: "16-groups-more",
  title: "群的更多性质",
  order: 16,
  duration: "约 35 分钟",
  introduction:
    "掌握了群的基本公理后，我们来探索群的一些重要导出性质。\n\n"
    + "本关证明两个经典结论：\n\n"
    + "1. **左右消去律**：如果 `a * b = a * c`，那么 `b = c`（左边同乘同一个元素可以消去）\n"
    + "2. **逆元的平方**：`(a⁻¹)⁻¹ = a`\n\n"
    + "这些性质从公理出发都可以严格证明——而且和中学代数里的推导很像！",
  goal: "a * b = a * c → b = c",
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
    + "example (a b c : G) : a * b = a * c → b = c :=\n  by",
  hints: [
    "假设 `a * b = a * c`，要证明 `b = c`。关键思路：在等式两边同时左乘 `a⁻¹`。",
    "用 `intro h` 引入前提。`h` 是 `a * b = a * c`。",
    "从 `h` 出发，两边同时左乘 `a⁻¹`：用 `calc` 块或者 `rw` 链。",
    "具体做法：`calc b = 1 * b := by rw [one_mul] ...`，或者 `have h' : a⁻¹ * (a * b) = a⁻¹ * (a * c) := by rw [h]`。",
    "然后用 `rw [← mul_assoc, mul_inv_left, one_mul]` 化简左边为 `b`，同理右边得 `c`。最终得到 `b = c`。",
  ],
  solution:
    "example (a b c : G) : a * b = a * c → b = c :=\n  by\n"
    + "    intro h\n"
    + "    calc\n"
    + "      b = 1 * b := by rw [one_mul]\n"
    + "      _ = (a⁻¹ * a) * b := by rw [mul_inv_left]\n"
    + "      _ = a⁻¹ * (a * b) := by rw [mul_assoc]\n"
    + "      _ = a⁻¹ * (a * c) := by rw [h]\n"
    + "      _ = (a⁻¹ * a) * c := by rw [← mul_assoc]\n"
    + "      _ = 1 * c := by rw [mul_inv_left]\n"
    + "      _ = c := by rw [one_mul]",
  conclusion:
    "消去律得证！你也看到了 `calc` 块的精髓：\n\n"
    + "从 `b` 开始，通过一连串重写「走到」`c`，每一步都有明确的理由。\n\n"
    + "这个证明展示了几个重要模式：\n"
    + "- 「插入恒等元」：`b = 1 * b`（从单位元开始展开）\n"
    + "- 「走一步退一步」：`1 = a⁻¹ * a`（用逆元插入中间步骤）\n"
    + "- 结合律随意重分组\n\n"
    + "这就是群论证明的「舞蹈」——在公理之间来回重写。",
  newTactics: [],
  newConcepts: [
    { name: "消去律", desc: "若 a*b = a*c 则 b = c。从群公理可导出" },
    { name: "等式变换技巧", desc: "插单位元、插逆元对、重结合——群论证明的核心手法" },
  ],
};

export default lesson;
