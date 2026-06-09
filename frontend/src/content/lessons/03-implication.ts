import type { LessonMeta } from "./index";

const lesson: LessonMeta = {
  slug: "03-implication",
  title: "蕴涵与全称量词",
  order: 3,
  duration: "约 30 分钟",
  introduction:
    "数学中我们常说「对任意 x，都有 ...」。这在 Lean 里用 **∀** 表示。\n\n"
    + "本关要证明一个「显然」的命题：**对任意命题 a，a → a**。\n"
    + "说白了就是：不管 a 是什么命题，如果 a 成立，那么 a 成立。\n\n"
    + "这里出现了两个量词：`∀ a : Prop` 和 `a → a`。\n"
    + "有趣的是，**intro 对两者都管用**——你马上会看到。",
  goal: "∀ a : Prop, a → a",
  hypotheses: [],
  initialCode: "example : ∀ a : Prop, a → a :=\n  by",
  hints: [
    "用 `intro a` 引入命题变量 a。这一步相当于说「取任意一个命题，叫它 a」。",
    "现在目标变成了 `a → a`。和第一关一样，用 `intro h` 引入前提 h: a。",
    "目标变成了 a，手里有 h: a，用 `exact h` 完成。",
  ],
  solution:
    "example : ∀ a : Prop, a → a :=\n  by\n    intro a\n    intro h\n    exact h",
  conclusion:
    "好极了！\n\n"
    + "你发现了：**intro 既能处理 → 也能处理 ∀**。\n"
    + "因为从证明的角度看，「如果 A 则 B」和「对所有 x，P(x)」"
    + "都是同一个思路——把假设拿进来，然后证明结论。\n\n"
    + "你已经掌握了 Lean 证明的三个基本功：intro、exact、rcases。"
    + "下一关我们学怎么构造「且」和「双向蕴涵」。",
  newTactics: [
    { name: "intro (对 ∀)", desc: "intro 也可以引入 ∀ 量词，和引入 → 的前提一样" },
  ],
  newConcepts: [
    { name: "全称量词 (∀)", desc: "「对所有」——∀ x, P(x) 表示对任意 x，P(x) 成立" },
    { name: "Prop 宇宙", desc: "a : Prop 说明 a 是一个命题，intro 可以引入任意类型" },
  ],
};

export default lesson;
