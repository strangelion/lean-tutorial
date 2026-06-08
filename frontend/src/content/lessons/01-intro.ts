import type { LessonMeta } from "./index";

const lesson: LessonMeta = {
  slug: "01-intro",
  title: "欢迎来到 Lean",
  order: 1,
  duration: "约 15 分钟",
  introduction:
    "欢迎！这是你的第一个 Lean 证明。\n\n"
    + "Lean 是一种**交互式定理证明器**——你可以像写代码一样写数学证明，"
    + "计算机会帮你检查每一步是否正确。\n\n"
    + "本关我们要证明一个最简单不过的命题：**如果 S 成立，那么 S 成立**。"
    + "听起来很废话？没错——但重点是学会两个最基本的操作：\n"
    + "- 把「如果 P 则 Q」的假设 P 拿出来（这叫 **intro**）\n"
    + "- 用手里已有的东西直接完成证明（这叫 **exact**）\n\n"
    + "右侧编辑器里已经帮你写好了框架。"
    + "你只需要理解每一行在干什么，然后点击 **运行 ▶** 即可。",
  goal: "S → S",
  hypotheses: ["S : Type"],
  initialCode:
    "example : S → S :=\n  by\n    intro hS\n    exact hS",
  hints: [
    "`intro hS` 的意思是：引入前提 S，给它起名叫 `hS`。现在我们的目标从「S → S」变成了「S」——因为前面已经有假设 hS: S 了。",
    "`exact hS` 的意思是：我们的目标刚好就是 `hS`，直接用！",
  ],
  solution: "example : S → S :=\n  by\n    intro hS\n    exact hS",
  conclusion:
    "恭喜！你完成了第一个 Lean 证明。\n\n"
    + "你学到了两个最基本的证明策略：\n"
    + "- **intro** — 把「如果 A 则 B」变成「假设 A，证明 B」\n"
    + "- **exact** — 当目标和手里已有的某个条件完全一样时，直接用\n\n"
    + "每一关你都会学到一两个新策略，积少成多。下一关见！",
  newTactics: [
    { name: "intro", desc: "引入一个前提（假设），把 → 左边的东西拿到手里" },
    { name: "exact", desc: "当你手里有和目标一模一样的东西时，直接用它完成证明" },
  ],
  newConcepts: [
    { name: "命题 (Prop)", desc: "可以判断真假的东西，比如「1+1=2」「S → S」" },
    { name: "蕴涵 (→)", desc: "「如果 A 则 B」，用 intro 处理它" },
  ],
};

export default lesson;
