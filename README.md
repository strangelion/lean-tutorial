# Lean 中文交互式教程

浏览器内学习 Lean 4 定理证明 — 零基础入门，全中文交互式教程。

## 前置要求

| 工具 | 用途 | 安装方式 |
|------|------|----------|
| Node.js 22+ | 前端运行 | `winget install OpenJS.NodeJS` 或 [nodejs.org](https://nodejs.org) |
| Python 3.12+ | 后端服务 | Anaconda / miniconda |

> **不需要装 Lean 4！** 前端内置了离线模拟引擎，没有 Lean 后端也能正常使用。
> 装了 Lean 4 的话，后端会提供真正的代码验证。

## 完整本地开发流程

### 第一步：安装 Node.js 依赖

```powershell
cd frontend
npm install
```

### 第二步：创建 Python 虚拟环境并安装依赖

```powershell
# 创建 conda 环境（只需一次）
conda create -n lean-tutorial python=3.12 -y

# 激活环境
conda activate lean-tutorial

# 安装 Python 依赖（只需一次）
pip install fastapi uvicorn websockets

# 验证安装成功
python -c "import fastapi, uvicorn, websockets; print('OK')"
# 应输出: OK
```

> **conda 环境需要每次开新终端都重新激活。** 如果你在 PowerShell 里执行
> `python server.py` 报 `ModuleNotFoundError: No module named 'fastapi'`，
> 说明你没有先运行 `conda activate lean-tutorial`。详见下方
> [conda 快速入门](#conda-快速入门)。

### 第三步：启动项目（需要两个终端）

```powershell
# ===== 终端 1 — 启动 Python 后端 =====
conda activate lean-tutorial    # 激活环境（每次必做！）
cd backend
python server.py
# 看到 "Uvicorn running on http://0.0.0.0:8000" 表示成功

# ===== 终端 2 — 启动前端 =====
cd frontend
npm run dev
# 看到 "Ready in xxxms" 表示成功
```

浏览器打开 **http://localhost:3000**

> **后端是可选的**：不启动后端，前端离线模拟引擎也会即时反馈证明结果。
> 如果你不需要真实的 Lean 4 后端验证，只需启动前端即可。

### 第四步：开始学习

1. 首页阅读 **「怎么使用这个教程」** 了解三步行操作
2. 点击 **「开始第一课」** 进入课程
3. **左侧** 阅读知识讲解和分步提示，**右侧** 在编辑器中编写证明
4. 编辑器顶部有 Unicode 符号工具栏，点击即可插入 `⟨⟩` `→` `∀` `∧` 等
5. 点击 **运行 ▶** 提交代码，底部会显示「证明通过！」或错误提示
6. 卡住了？展开左侧的 **「查看参考解答」**

## 课程内容

| # | 标题 | 内容 | 时长 |
|---|------|------|------|
| 1 | 欢迎来到 Lean | 形式化证明初体验，intro、exact | 约 15 分钟 |
| 2 | 类型与命题 | Type / Prop、∧、rcases | 约 25 分钟 |
| 3 | 蕴涵与全称量词 | intro、∀、→ | 约 30 分钟 |
| 4 | 合取与双向蕴涵 | constructor、↔、⟨⟩ | 约 30 分钟 |
| 5 | 归纳法入门 | induction、rfl、rw | 约 45 分钟 |
| 6 | 析取：「或」的逻辑 | left、right、∨、分情况讨论 | 约 25 分钟 |
| 7 | 存在量词 | refine、∃、见证、?_ 洞 | 约 25 分钟 |
| 8 | apply：反向推理的艺术 | apply、反向推理、传递性 | 约 30 分钟 |
| 9 | simp：让机器帮你化简 | simp、Nat.add_succ、自动化简 | 约 25 分钟 |
| 10 | 否定与反证法 | ¬ = → False、换质换位律 | 约 30 分钟 |
| 11 | 集合的基本操作 | Set α、∈、⊆、extensionality | 约 35 分钟 |
| 12 | 集合的运算与性质 | ∪、∩、ext、交集的交换律 | 约 30 分钟 |
| 13 | 函数与映射 | Injective、Surjective、have | 约 35 分钟 |
| 14 | 群的定义与基本性质 | Mul、Inv、One、calc、notation | 约 40 分钟 |
| 15 | 子群与子群判定 | IsSubgroup、refine、交集子群 | 约 35 分钟 |
| 16 | 群的更多性质 | 消去律，calc 等式推导 | 约 35 分钟 |
| 17 | 环的定义与基本性质 | Ring、0*a=0、分配律 | 约 40 分钟 |
| 18 | 环的更多性质 | (-a)*b=-(a*b)、符号规则 | 约 30 分钟 |

## 技术栈

| 层 | 技术 |
|----|------|
| 前端 | Next.js 16, React 19, Tailwind CSS 4, Monaco Editor, TypeScript |
| 后端 | Python FastAPI, WebSocket |
| 证明引擎 | Lean 4 + 离线模拟 fallback（Monarch tokenizer） |
| 部署 | Docker Compose |

## Docker 部署

```bash
docker compose up --build
# 前端: http://localhost:3000
# 后端: ws://localhost:8000/ws
```

## Cloudflare Pages 部署

前端是纯静态站点，可直接部署到 Cloudflare Pages：

```bash
cd frontend

# 登录 Cloudflare（只需一次）
npx wrangler login

# 构建静态文件
npm run build:cloudflare

# 部署
npx wrangler pages deploy out/ --project-name lean-tutorial
```

离线模拟引擎在前端完全可用，Cloudflare 部署无需后端。

> **注意：** Cloudflare 部署只包含前端静态文件，不支持 WebSocket 后端。
> 如需完整后端功能，请使用 Docker 部署。

## conda 快速入门

conda 是 Python 的虚拟环境管理器，让每个项目有独立的 Python 和包。

```powershell
# 查看已有哪些环境
conda env list

# 激活 lean-tutorial 环境（每次开新终端都要执行！）
conda activate lean-tutorial

# 查看当前环境装了哪些包
pip list

# 退出当前环境
conda deactivate

# 删除环境（搞坏了重来）
conda env remove -n lean-tutorial
```

> **为什么用 conda 而不是 venv？**
> 这个项目约定 Python 虚拟环境统一用 conda，保持团队一致。

## 常见问题

### `ModuleNotFoundError: No module named 'fastapi'`

因为你激活了 conda 环境后又开了新终端，或者没激活环境就运行了 `python server.py`。

**解决方法**：在新终端里先执行 `conda activate lean-tutorial`，再执行 `python server.py`。

### 前端打开后编辑器空白

Monaco Editor 首次加载需要下载，等几秒即可。如果一直空白，刷新页面。

## License

MIT
