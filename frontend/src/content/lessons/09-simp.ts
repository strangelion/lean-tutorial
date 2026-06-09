import type { LessonMeta } from "./index";

const lesson: LessonMeta = {
  slug: "09-simp",
  title: "simp：让机器帮你化简",
  order: 9,
  duration: "约 25 分钟",
  introduction:
    "回到自然数。还记得第 5 课我们做了 `n + 0 = n` 的归纳证明吗？\n"
    + "那次是左边的 +0 情况——这次我们来证右边：`0 + n = n`。\n\n"
    + "看起来一样？其实不一样！加法的定义是递归在**第二个**参数上的，"
    + "所以 `n + 0` 是定义直接给的，而 `0 + n` 必须用归纳法。\n\n"
    + "但这次我们有新武器：`simp`。\n"
    + "`simp` 是一个智能化简策略——它知道很多基础引理（如 `Nat.add_zero`、`Nat.add_succ`），\n"
    + "能自动帮你做重写。第 5 课手动写的 `rw`，`simp` 一行搞定。",
  goal: "∀ n : Nat, 0 + n = n",
  hypotheses: [],
  initialCode: "example : ∀ n : Nat, 0 + n = n :=\n  by",
  hints: [
    "和第五课一样，用 `intro n` 把 n 引入，然后 `induction n with` 做归纳。",
    "基本情况 `zero`：目标 `0 + 0 = 0`。直接用 `rfl`——加法定义第一句就说了 0+0=0。",
    "归纳步 `succ n ih`：目标是 `0 + (n+1) = n+1`。用 `simp [ih]` 一行搞定。",
    "`simp [ih]` 做了两件事：(1) 用 `Nat.add_succ` 把左边展开，(2) 用归纳假设 `ih` 代换。比第五课的 `rw [Nat.add_succ, ih]` 更省事。",
  ],
  solution:
    "example : ∀ n : Nat, 0 + n = n :=\n  by\n"
    + "    intro n\n"
    + "    induction n with\n"
    + "    | zero => rfl\n"
    + "    | succ n ih => simp [ih]",
  conclusion:
    "好极了！\n\n"
    + "`simp` 的优势：\n"
    + "- 它内置了大量 `@[simp]` 标记的引理（如 `Nat.add_zero`、`Nat.add_succ`）\n"
    + "- `simp [ih]` 表示在化简时也使用归纳假设\n"
    + "- 对比第五课：`rw [Nat.add_succ, ih]` vs `simp [ih]`\n\n"
    + "`simp` 不能代替所有证明，但在等式重写场景下常常能省很多功夫。\n"
    + "最后一关：我们来学「否定」——数学中最重要的推理模式之一。",
  newTactics: [
    { name: "simp", desc: "智能化简。自动使用已标记的引理（如 Nat.add_succ）进行重写" },
  ],
  newConcepts: [
    { name: "@[simp] 引理", desc: "被标记为 simp 的引理，simp 策略会自动调用它们" },
    { name: "加法不对称", desc: "n+0=n 由加法定义直接可得，0+n=n 则需要归纳法" },
  ],
};

export default lesson;
