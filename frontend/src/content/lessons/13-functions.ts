import type { LessonMeta } from "./index";

const lesson: LessonMeta = {
  slug: "13-functions",
  title: "函数与映射",
  order: 13,
  duration: "约 35 分钟",
  introduction:
    "函数是数学最基本的概念之一。这一课我们学习 Lean 中函数性质的描述方法。\n\n"
    + "给定函数 `f : α → β`：\n"
    + "- **单射 (injective)**：不同输入给不同输出。`∀ x y, f x = f y → x = y`\n"
    + "- **满射 (surjective)**：β 中每个元素都是某个输入的像。`∀ y, ∃ x, f x = y`\n"
    + "- **双射 (bijective)**：既是单射又是满射。\n\n"
    + "本关目标：如果 `f` 和 `g` 都是单射，那么它们的复合 `f ∘ g` 也是单射。\n\n"
    + "`f ∘ g` 的定义：`(f ∘ g) x = f (g x)`。在 Lean 中用 `Function.comp` 或 `.∘` 表示。",
  goal: "Injective g → Injective f → Injective (f ∘ g)",
  hypotheses: ["f : β → γ", "g : α → β"],
  initialCode:
    "example (f : β → γ) (g : α → β) :\n    Injective g → Injective f → Injective (f ∘ g) :=\n  by",
  hints: [
    "先引入两个前提：`intro hg`（g 是单射）和 `intro hf`（f 是单射）。",
    "现在要证明 `Injective (f ∘ g)`。Injective 的定义需要展开：`Injective h` 就是 `∀ x y, h x = h y → x = y`。"
      + "所以继续 `intro x y` 和 `intro h`。",
    "`h` 是 `(f ∘ g) x = (f ∘ g) y`。根据 ∘ 的定义，这等于 `f (g x) = f (g y)`。"
      + "用 `simp [Function.comp] at h` 或直接使用 `h`。",
    "现在 `hf : Injective f` 告诉我们：`f a = f b → a = b`。"
      + "h 给了 `f (g x) = f (g y)`，所以 `apply hf at h` 得到 `g x = g y`。",
    "再 `apply hg at h`，得到 `x = y`。这就是目标！用 `exact h`。",
  ],
  solution:
    "example (f : β → γ) (g : α → β) :\n    Injective g → Injective f → Injective (f ∘ g) :=\n  by\n"
    + "    intro hg\n"
    + "    intro hf\n"
    + "    intro x y\n"
    + "    intro h\n"
    + "    have hgf : f (g x) = f (g y) := h\n"
    + "    have hgx_eq : g x = g y := hf hgf\n"
    + "    exact hg hgx_eq",
  conclusion:
    "非常好！你证明了「单射的复合仍是单射」。\n\n"
    + "你学到了：\n"
    + "- **Injective / Surjective** 的定义和使用方式\n"
    + "- **have** 策略——给中间结果起名字（`have hname : statement := proof`）\n"
    + "- 函数复合 `f ∘ g` 的本质就是依次应用 g 和 f\n\n"
    + "集合和函数的技能已经齐备，接下来进入**代数结构**的世界！",
  newTactics: [
    { name: "have", desc: "引入一个中间结论：`have h : P := ...` 给证明分支起个名字" },
  ],
  newConcepts: [
    { name: "Injective", desc: "单射：f x = f y → x = y。不同输入不能有相同输出" },
    { name: "Surjective", desc: "满射：∀ y, ∃ x, f x = y。值域覆盖整个目标类型" },
    { name: "f ∘ g (复合)", desc: "(f ∘ g) x = f (g x)。先应用 g，再应用 f" },
  ],
};

export default lesson;
