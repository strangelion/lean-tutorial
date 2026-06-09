# Lean Tutorial 项目技能

## 项目概述
- **名称**：Lean 中文交互式教程 (lean-tutorial)
- **路径**：`C:\Users\WangWenXuan\Documents\GitHub\lean-tutorial`
- **目标**：浏览器内学习 Lean 4 定理证明，全中文，零安装

## 技术架构

```
lean-tutorial/
├── frontend/                    # Next.js 16 + React 19 (Turbopack)
│   ├── src/
│   │   ├── app/                 # App Router 页面
│   │   │   ├── page.tsx         # 首页 (TOTAL_LESSONS=18)
│   │   │   ├── layout.tsx       # 根布局
│   │   │   ├── not-found.tsx    # 自定义 404
│   │   │   └── learn/[slug]/    # 课程页 (动态路由)
│   │   │       ├── page.tsx     # "use client" 课程页面
│   │   │       └── layout.tsx   # generateStaticParams
│   │   ├── components/
│   │   │   ├── LeanEditor.tsx   # Monaco Editor + 符号工具栏
│   │   │   ├── GoalDisplay.tsx  # 证明目标展示
│   │   │   ├── LessonList.tsx   # 首页课程列表 (硬编码18课)
│   │   │   ├── LessonNav.tsx    # 上一课/下一课导航
│   │   │   ├── ProgressBar.tsx  # 总进度条
│   │   │   └── ProgressBadge.tsx # 首页已学计数徽章
│   │   ├── content/lessons/     # 课程内容 (TS 文件)
│   │   │   ├── index.ts         # LessonMeta 接口 + 注册表 + getLesson/getAllLessons
│   │   │   └── NN-slug.ts       # 每课一个文件，export default LessonMeta
│   │   └── lib/
│   │       ├── lean-websocket.ts # WebSocket + 离线模拟 (simulateLean)
│   │       ├── lean4-monarch.ts  # Monarch tokenizer (Lean 4 语法高亮)
│   │       └── progress.ts       # localStorage 进度管理
│   ├── package.json
│   ├── next.config.ts
│   ├── Dockerfile
│   └── out/                      # Cloudflare Pages 静态导出
├── backend/
│   ├── server.py                 # FastAPI + WebSocket + Lean 4 子进程
│   ├── game_levels/              # 18 个 .lean 模板文件 (仅注释)
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml
├── README.md
└── .gitignore
```

## 核心设计决策

1. **不用 lean4game**: Elm + gVisor 维护成本过高
2. **不用 lean4monaco**: vscode npm 包 (>140MB) 导致 SSR 构建失败
3. **自建 Monarch tokenizer**: 轻量级 Lean 4 语法高亮
4. **离线模拟模式**: 前端内置 `simulateLean()` 函数，无后端时用正则匹配验证
5. **WebSocket 后端**: FastAPI 接收代码，调用 `lean` CLI 子进程执行，30s 超时

## 课程结构 (18 课)

| 课 | slug | 所属阶段 |
|----|------|----------|
| 1-10 | 01-intro ~ 10-negation | 命题逻辑基础 (intro/exact/∧/∨/→/∀/∃/¬/induction/simp) |
| 11-13 | 11-sets ~ 13-functions | 集合论与函数 (Set/∈/⊆/∪/∩/Injective/Surjective) |
| 14-16 | 14-groups-intro ~ 16-groups-more | 群论 (Group公理/子群/消去律) |
| 17-18 | 17-rings-intro ~ 18-rings-more | 环论 (Ring公理/0*a=0/符号规则) |

## LessonMeta 接口 (位于 index.ts)

```typescript
interface LessonMeta {
  slug: string;          // URL slug, e.g. "11-sets"
  title: string;         // 中文标题
  order: number;         // 排序号
  duration: string;      // "约 35 分钟"
  introduction: string;  // 知识讲解 (支持 \n 换行)
  goal: string;          // 证明目标, e.g. "A ⊆ A"
  hypotheses: string[];  // 前提条件, e.g. ["A : Set Nat"]
  initialCode: string;   // 预填代码
  hints: string[];       // 分步提示 (5条左右)
  solution: string;      // 参考解答
  conclusion: string;    // 课后总结
  newTactics: { name: string; desc: string }[];    // 本课新策略
  newConcepts: { name: string; desc: string }[];   // 本课新概念
}
```

## 添加/修改课程的完整流程

### 添加新课
1. 创建 `frontend/src/content/lessons/NN-slug.ts`，export default LessonMeta
2. 在 `frontend/src/content/lessons/index.ts` 中 import 并注册到 LESSONS 字典
3. 在 `frontend/src/components/LessonList.tsx` 的 LESSONS 数组中添加条目
4. 在 `frontend/src/app/page.tsx` 更新 `TOTAL_LESSONS` 数字
5. 在 `frontend/src/lib/lean-websocket.ts` 的 `simulateLean()` 中添加正则匹配模式
6. 可选：创建 `backend/game_levels/NN_slug.lean`（仅含注释目标）
7. 更新 `README.md` 课程表

### 修改现有课程
1. 编辑对应的 `frontend/src/content/lessons/NN-slug.ts`
2. 如果改了 solution，同步更新 `lean-websocket.ts` 中的正则
3. 如果改了标题或描述，同步更新 `LessonList.tsx`

### 验证
- `cd frontend && npm run build` — 确认编译通过
- `npm run dev` — 浏览器手动测试

## 离线模拟引擎

`simulateLean()` 位于 `frontend/src/lib/lean-websocket.ts`，用正则匹配验证用户提交的代码。每个课程的 solution 对应一个正则模式。添加新课时必须同步添加匹配规则。

## 运行命令

```bash
# 前端开发
cd frontend && npm run dev          # 开发模式 (localhost:3000)
cd frontend && npm run build        # 生产构建
cd frontend && npm run build:cloudflare  # Cloudflare Pages 构建

# 后端 (需要 conda 环境 lean-tutorial)
conda activate lean-tutorial
cd backend && python server.py      # WebSocket 服务 (localhost:8000)

# Docker
docker compose up --build
```
