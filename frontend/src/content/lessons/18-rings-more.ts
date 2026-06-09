import type { LessonMeta } from "./index";

const lesson: LessonMeta = {
  slug: "18-rings-more",
  title: "环的更多性质",
  order: 18,
  duration: "约 30 分钟",
  introduction:
    "最后一课！我们证明环中的另一条经典性质：**负元乘法的符号规则**。\n\n"
    + "具体目标：`(-a) * b = -(a * b)`\n\n"
    + "直观上，「负 a 乘以 b」应该等于「a 乘以 b 的相反数」。\n"
    + "这和中学代数中 `(-a) * b = -(a * b)` 的规则一致。\n\n"
    + "这个证明用到的技巧和前几课密切相关——分配律 + 加法群性质。\n"
    + "你已经有了一切所需工具！",
  goal: "(-a) * b = -(a * b)",
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
    + "example (a b : R) : (-a) * b = -(a * b) :=\n  by",
  hints: [
    "要证 `(-a) * b = -(a * b)`。在环中，`x = -y` 的一个充分条件是 `x + y = 0`。"
      + "所以策略是证 `(-a) * b + (a * b) = 0`。",
    "`calc (-a) * b + (a * b) = ((-a) + a) * b := by rw [right_distrib]`，"
      + "用右分配律把两项合并。",
    "`((-a) + a) * b` 中的 `(-a) + a` 是什么？根据加法交换律和 `add_neg`，`(-a) + a = a + (-a) = 0`。",
    "`rw [add_comm (-a) a, add_neg a]` 得到 `0 * b`。而 `0 * b = 0`——这已经在第 17 课说明过。这里我们直接用 `rw` 一个环公理或 `sorry`。",
    "实际上在基本环公理中我们不一定有 `0 * b = 0`，但可以通过同样的技巧证明：`0 * b = (0+0)*b = 0*b+0*b`，消去得 `0*b=0`。"
      + "这里我们用 `calc` 完整写出。",
  ],
  solution:
    "example (a b : R) : (-a) * b = -(a * b) :=\n  by\n"
    + "    -- prove that (-a)*b + (a*b) = 0 first\n"
    + "    have h : (-a) * b + (a * b) = 0 := by\n"
    + "      calc\n"
    + "        (-a) * b + (a * b) = ((-a) + a) * b := by rw [right_distrib]\n"
    + "        _ = (a + (-a)) * b := by rw [add_comm]\n"
    + "        _ = 0 * b := by rw [add_neg]\n"
    + "        _ = 0 := by\n"
    + "          calc\n"
    + "            0 * b = (0 + 0) * b := by rw [add_zero]\n"
    + "            _ = 0 * b + 0 * b := by rw [right_distrib]\n"
    + "            _ = 0 := by\n"
    + "              -- subtract 0*b from both sides\n"
    + "              rw [← add_zero (0 * b), ← add_neg (0 * b), add_assoc, add_neg, add_zero]\n"
    + "    -- now from h we can deduce the goal\n"
    + "    calc\n"
    + "      (-a) * b = ((-a) * b) + 0 := by rw [add_zero]\n"
    + "      _ = ((-a) * b) + ((a * b) + (-(a * b))) := by rw [add_neg]\n"
    + "      _ = ((-a) * b + (a * b)) + (-(a * b)) := by rw [add_assoc]\n"
    + "      _ = 0 + (-(a * b)) := by rw [h]\n"
    + "      _ = -(a * b) := by rw [add_comm 0, add_zero]",
  conclusion:
    "恭喜！你完成了全部 18 课！\n\n"
    + "从命题逻辑入门，到集合和函数，再到群和环的抽象代数结构——"
    + "你已经掌握了 Lean 4 定理证明的核心方法论。\n\n"
    + "回顾整个学习路径：\n"
    + "- **第 1-10 课**：命题逻辑和基础策略（intro, exact, apply, induction, simp...）\n"
    + "- **第 11-13 课**：集合论和函数性质（Set, ∈, ⊆, Injective, Surjective）\n"
    + "- **第 14-16 课**：群论（Group 公理，子群，消去律）\n"
    + "- **第 17-18 课**：环论（Ring 公理，0*a=0，负元乘法）\n\n"
    + "接下来你可以：\n"
    + "1. 安装 VS Code + Lean 4，在自己的电脑上继续探索\n"
    + "2. 阅读 [Mathematics in Lean](https://leanprover-community.github.io/mathematics_in_lean/)\n"
    + "3. 尝试形式化更多经典定理\n"
    + "4. 去 [Lean Zulip](https://leanprover.zulipchat.com/) 参与社区讨论",
  newTactics: [],
  newConcepts: [
    { name: "add_comm", desc: "加法交换律。a + b = b + a" },
    { name: "add_neg", desc: "加法逆元。a + (-a) = 0" },
    { name: "环中的符号规则", desc: "(-a)*b = -(a*b)。从分配律和加法群公理可证" },
  ],
};

export default lesson;
