import type { LessonMeta } from "./index";

const lesson: LessonMeta = {
  slug: "17-rings-intro",
  title: "环的定义与基本性质",
  order: 17,
  duration: "约 40 分钟",
  introduction:
    "环 (Ring) 是比群更丰富的代数结构——它有两个运算：加法和乘法。\n\n"
    + "一个环 R 满足：\n"
    + "- **加法群**：`(R, +, 0, -)` 是交换群（即 Abelian group）\n"
    + "- **乘法半群**：`(R, *)` 满足结合律，有单位元 1\n"
    + "- **分配律**：`a * (b + c) = a*b + a*c` 和 `(a + b) * c = a*c + b*c`\n\n"
    + "本关目标：证明环中最基本的性质——**零乘任何元素得零**：`0 * a = 0`。\n\n"
    + "你会看到，分配律在环论证明中扮演核心角色。",
  goal: "0 * a = 0",
  hypotheses: [
    "R : Type",
    "add mul : R → R → R",
    "zero one : R",
    "neg : R → R",
    "add_assoc : ∀ a b c, (a + b) + c = a + (b + c)",
    "add_comm : ∀ a b, a + b = b + a",
    "add_zero : ∀ a, a + 0 = a",
    "add_neg : ∀ a, a + (-a) = 0",
    "mul_assoc : ∀ a b c, (a * b) * c = a * (b * c)",
    "one_mul : ∀ a, 1 * a = a",
    "mul_one : ∀ a, a * 1 = a",
    "left_distrib : ∀ a b c, a * (b + c) = a * b + a * c",
    "right_distrib : ∀ a b c, (a + b) * c = a * c + b * c",
  ],
  initialCode:
    "variable (R : Type)\n"
    + "variable (add mul : R → R → R)\n"
    + "variable (zero one : R)\n"
    + "variable (neg : R → R)\n"
    + "notation:max a \"+\" b => add a b\n"
    + "notation:max a \"*\" b => mul a b\n"
    + "notation:max \"-\" a => neg a\n"
    + "notation:max \"0\" => zero\n"
    + "notation:max \"1\" => one\n"
    + "\n"
    + "variable (add_assoc : ∀ a b c, (a + b) + c = a + (b + c))\n"
    + "variable (add_comm : ∀ a b, a + b = b + a)\n"
    + "variable (add_zero : ∀ a, a + 0 = a)\n"
    + "variable (add_neg : ∀ a, a + (-a) = 0)\n"
    + "variable (mul_assoc : ∀ a b c, (a * b) * c = a * (b * c))\n"
    + "variable (one_mul : ∀ a, 1 * a = a)\n"
    + "variable (mul_one : ∀ a, a * 1 = a)\n"
    + "variable (left_distrib : ∀ a b c, a * (b + c) = a * b + a * c)\n"
    + "variable (right_distrib : ∀ a b c, (a + b) * c = a * c + b * c)\n"
    + "\n"
    + "example (a : R) : 0 * a = 0 :=\n  by",
  hints: [
    "关键技巧：把 `0` 写成 `0 + 0`，然后利用分配律。`0 = 0 + 0` 由 `add_zero 0` 给出。",
    "`calc 0 * a = (0 + 0) * a := by rw [add_zero 0]` 把左边展开。",
    "然后 `(0 + 0) * a = 0 * a + 0 * a`，这来自 `right_distrib 0 0 a`。",
    "现在我们得到 `0 * a = 0 * a + 0 * a`。像群论中一样，两边同时加 `-(0*a)` 消去。",
    "`calc 0 = (0 * a) + (-(0 * a)) := by rw [add_neg] ...` 把结果串联起来。"
      + "最终得到 `0 * a = 0`。",
  ],
  solution:
    "example (a : R) : 0 * a = 0 :=\n  by\n"
    + "    have h : 0 * a = 0 * a + 0 * a := by\n"
    + "      calc\n"
    + "        0 * a = (0 + 0) * a := by rw [add_zero]\n"
    + "        _ = 0 * a + 0 * a := by rw [right_distrib]\n"
    + "    calc\n"
    + "      0 * a = (0 * a) + 0 := by rw [add_zero]\n"
    + "      _ = (0 * a) + ((0 * a) + (-(0 * a))) := by rw [add_neg]\n"
    + "      _ = ((0 * a) + (0 * a)) + (-(0 * a)) := by rw [← add_assoc]\n"
    + "      _ = (0 * a) + (-(0 * a)) := by rw [← h]\n"
    + "      _ = 0 := by rw [add_neg]",
  conclusion:
    "恭喜！你证明了环中最重要的恒等式之一：`0 * a = 0`。\n\n"
    + "这个证明展示了环论的核心技巧：\n"
    + "- 用 `add_zero` 插入零（群论中是插单位元，环论中是插加法零元）\n"
    + "- 用分配律把乘法分布到加法上\n"
    + "- 用 `add_neg` 消去相等的项\n\n"
    + "环 = 加法群 + 乘法 + 分配律，每个部分都有用。下一课最后一关！",
  newTactics: [],
  newConcepts: [
    { name: "环 (Ring)", desc: "集合 + 加法构成交换群 + 乘法满足结合律/分配律" },
    { name: "分配律", desc: "a*(b+c) = a*b + a*c。连接加法和乘法的桥梁" },
    { name: "加法零元 (0)", desc: "a + 0 = a。在环论中和乘法零元是同一个 0" },
  ],
};

export default lesson;
