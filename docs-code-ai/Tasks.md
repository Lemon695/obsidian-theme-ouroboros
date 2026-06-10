# Tasks — Ouroboros Obsidian Theme

> 创建于：2026-05-21 | 最后更新：2026-05-21

---

## ▶ 当前冲刺（本次会话目标）

当前里程碑：M12 分析修复 + Bullet Threading 吸收 已完成 ✅（M12-1/2/3/4 全部交付，build+check 通过）。下一步等待用户指派（活体视觉 QA：bullet-threading / clean-embeds 两个新 fixture 需真实 vault 肉眼验证）。

- [x] M12-1 Bug 修复批：BUG-003 代码块边框失效、BUG-004 重复 mask 死代码、BUG-005 死变量、BUG-006 callout 死过渡
- [x] M12-2 优化批：tag hover 去 translateY 抖动；cjk-mode 断行规则收窄到内容区
- [x] M12-3 Bullet threading（吸收 Logseq 社区 snippet；默认开；accent 单色；6 级；编辑器限定；ADR-020）
- [x] M12-4 Clean embeds（吸收 Minimal embed-strict；opt-in toggle + per-note cssclass）

- [x] M9-1 (O1，吸收 Minimal) 暴露阅读栏宽为 Style Settings 可调项（含修复 `--line-width` 未绑定的隐性 no-op）
- [x] M9-2 (O2) 通用「标题编号 / 章节感」可选开关（CSS counter，独立 class-toggle）
- [x] M9-3 (O3，吸收 AnuPpuccin) 代码块语言标签 / 复制态 / diff 增强
- [x] M9-4 (O4) 标签 pill 嵌套层级视觉
- [x] M9-5 (O5) Graph view 暖纸调色 + 当前笔记高亮
- [x] M9-6 (O6) 动效性能审查 + reduce-motion 复核

> ✅ M8 + M9 已全部完成并通过 build+check。下一里程碑 M10 差异化新功能（N1–N8）。全量路线图见下方 M8–M11。开发顺序：M8 → M9 → M10 → M11，每个里程碑完成后停下报告，不自动跨里程碑。

---

## 已发现问题队列（由前置分析归档）

| 优先级 | 问题 | 对应任务 | 状态 |
|--------|------|----------|------|
| P0 | Style Settings `@settings` 块存在 tab 缩进，YAML 可能解析失败 | M1-2 / BUG-001 | 已修复 |
| P0 | `h1-color` / `h6-color` 使用非法默认值 `'#'` | M1-2 / BUG-001 | 已修复 |
| P0 | `check-theme.mjs` 未覆盖 Style Settings 解析风险 | M1-3 | 已完成 |
| P0 | 文档提到 `sync:vault`，但 package scripts 未声明且同步脚本缺失 | M1-4 / BUG-002 | 已修复 |
| P1 | 缺少 preview 视觉回归样例 | M1-5 | 已完成 |
| P1 | Todoist、移动端按钮、Calendar/Git 等存在硬编码 UI 前景色/插件色 | M2-2 / M2-3 | 已完成第一轮迁移 |
| P1 | 缺少 surface/shadow/text-on-accent 等组件 token | M2-1 | 已完成 |
| P1 | `src/08-plugin-compat.css` 与 README 支持列表可能不一致 | M5-4 | 已审计 |
| P2 | 移动端 FAB 依赖 `nth-last-of-type`，选择器较脆 | M5-4 / M5-5 | 已公开记录在 known limitations |
| P2 | Focus mode 可发现性不足 | M4-5 | 已完成 |
| P2 | 现代 Obsidian Bases / Properties View / Quick Switcher 覆盖不足 | M3 | 已完成 |
| P2 | 当前主题缺少一组完整、可切换的全局审美风格包，Style Settings 主要停留在单项调整 | M6-1 | 已完成 |
| P2 | Dataview/cards/table 等内容 helper classes 不足，难以快速构建高质量库页 | M6-2 | 已完成 |
| P3 | File Explorer folder 层级可读性仍可增强，但不应走高饱和彩虹文件夹路线 | M6-3 | 已完成 |
| P3 | 图片、figure、gallery 场景缺少系统化样式 | M6-4 | 已完成 |
| P3 | Focus mode 仍可继续向 keyboard-first 工作台升级 | M6-5 | 已完成 |
| P3 | Publish / Export / Print 尚未形成独立质量门禁 | M6-6 | 已完成 |
| P1 | M1-M6 完成后缺少“已同步到测试库 + 可追溯手动 QA 证据”的发布候选门禁 | M7 | 已完成 |
| P0 | `--clean-lowercase` 在大小写不敏感文件系统上会把刚同步的 `Ouroboros` 目录识别为 `ouroboros` 并删除 | M7-3b | 已修复 |

---

## 总体进度

| 里程碑 | 状态 | 完成率 |
|--------|------|--------|
| M1 可靠性与文档体系修复 | 已完成 | 100% |
| M2 Design Tokens v2 | 已完成 | 100% |
| M3 现代 Obsidian UI 覆盖 | 已完成 | 100% |
| M4 Knowledge Workflow UI | 已完成 | 100% |
| M5 视觉回归与发布质量 | 已完成 | 100% |
| M6 审美系统升级与竞品优点吸收 | 已完成 | 100% |
| M7 Release Candidate 实测门禁 | 已完成 | 100% |
| M8 一致性 Bug 修复 | 已完成 | 100% |
| M9 现有功能优化 | 已完成 | 100% |
| M10 差异化新功能 | 已完成 | 100% |
| M11 竞品吸收对照验收 | 已完成 | 100% |
| M12 分析修复 + Bullet Threading 吸收 | 已完成 | 100% |

---

## M1 — 可靠性与文档体系修复

**目标**：文档体系就位，阻断使用/开发的问题先暴露并可自动检查。

**完成标准**：
- `npm run build` 通过
- `npm run check` 通过
- Style Settings `@settings` 块可解析
- 文档与 package scripts 不矛盾

### 任务列表

- [x] M1-1 创建主题项目 AI 文档体系（CLAUDE.md + docs-code-ai/）
- [x] M1-2 修复 `src/07-style-settings.css` 的 `@settings` YAML 解析问题
- [x] M1-3 扩展 `check-theme.mjs`：加入 Style Settings YAML / tab / invalid default 检查
- [x] M1-4 补齐 `sync:vault` script 与 `sync-theme-to-vault.mjs`
- [x] M1-5 补 preview 基础样例结构

---

## M2 — Design Tokens v2

**目标**：把散落的视觉值收敛为稳定 token，提升深浅色、accent、插件适配一致性。

### 任务列表

- [x] M2-1 设计 surface / shadow / foreground tokens
- [x] M2-2 将 Todoist 硬编码 UI 色迁移到 token/语义色
- [x] M2-3 将 mobile FAB / Calendar / Git / Canvas 的 `white` 等前景色迁移到 `--text-on-accent`
- [x] M2-4 更新文档说明与任务状态

---

## M3 — 现代 Obsidian UI 覆盖

**目标**：补齐新版本 Obsidian 的关键界面。

### 任务列表

- [x] M3-1 Bases table/list/card/filter/sort/group chips
- [x] M3-2 Properties View：File properties / All properties
- [x] M3-3 Command Palette / Quick Switcher selected/match/shortcut states
- [x] M3-4 Bookmarks / Search / Outline 统一层级与空状态

---

## M4 — Knowledge Workflow UI

**目标**：增强知识管理场景识别度。

### 任务列表

- [x] M4-1 新增 callout：decision / risk / principle / insight / cycle
- [x] M4-2 Canvas node/group/edge/minimap 视觉升级
- [x] M4-3 Research reading mode
- [x] M4-4 Longform reading mode
- [x] M4-5 Focus mode 可发现性与恢复机制升级

---

## M5 — 视觉回归与发布质量

**目标**：形成可重复发布检查。

### 任务列表

- [x] M5-1 preview checklist
- [x] M5-2 README/README_CN 与 screenshot 同步
- [x] M5-3 release checklist
- [x] M5-4 插件兼容声明与脆弱选择器审计
- [x] M5-5 已知限制与不支持插件清单

---

## M6 — 审美系统升级与竞品优点吸收

**目标**：把 Ouroboros 从“基础可用、覆盖完整”推进到“可持续使用、有审美系统、有知识库页面能力”的阶段。吸收 Minimal 的可配置性、AnuPpuccin 的层级/文件夹表达、Shimmering Focus 的低噪声专注体验、Border 的界面边界质感，但不复制其高饱和、花哨或 dashboard 化表达。

**完成标准**：
- `npm run build` 通过
- `npm run check` 通过
- preview 增加对应手动视觉回归样例
- README/README_CN/preview checklist 能说明新能力和验证路径
- 新 UI 能在 light/dark 下工作，并与已有 M1-M5 token/reading/focus 系统兼容

### 任务列表

- [x] M6-1 Preset 风格包
  - [x] Classic Paper：默认纸感、低噪声、日常 vault
  - [x] Things Warm：更偏任务/计划的暖色工作台
  - [x] Research Desk：资料、引用、表格、证据链笔记
  - [x] Longform Book：长文、章节草稿、散文/书稿
  - [x] Night Ink：深色高可读、低眩光夜间写作
  - [x] Low Contrast Calm：低疲劳、低对比长时间使用
- [x] M6-2 Cards / Table / Dataview helper classes
  - [x] `.cards` / `.cards-cover` / `.cards-compact`
  - [x] `.table-wide` / `.table-small` / `.table-clean`
  - [x] Dataview table/list/card 常见输出适配
- [x] M6-3 Folder Accent 导航增强
  - [x] muted folder rail
  - [x] current path highlight
  - [x] 不使用高饱和彩虹文件夹作为默认审美
- [x] M6-4 Image / Figure / Gallery 系统
  - [x] `.img-grid` / `.img-wide` / `.img-frame`
  - [x] `.figure-note` / caption polish
  - [x] mobile 下不破版
- [x] M6-5 Focus Mode 2.0 / Keyboard Mode
  - [x] keyboard-first 状态提示
  - [x] workspace chrome 更细腻的 hover/focus 恢复
  - [x] command/switcher 搜索状态联动
- [x] M6-6 Publish / Export / Print 支持
  - [x] Obsidian Publish 基础样式
  - [x] print / PDF export 的脚注、引用、表格、代码样式
  - [x] preview checklist 增加导出门禁

---

## M7 — Release Candidate 实测门禁

**目标**：把“主题已开发完成”推进到“可发布候选可审计”。M7 先锁定 Dev01 测试库，不直接触发全部 vault 写入；所有 release/全库部署判断必须从 `preview/QA-RUN.md` 与 `preview/CHECKLIST.md` 找到证据。

**完成标准**：
- Dev01 测试库存在最新 `Ouroboros` 主题目录与 preview 文件
- `preview/QA-RUN.md` 记录本次 run 的命令、目标路径、手动 QA 矩阵与部署决策
- `npm run build` / `npm run check` / `node --check check-theme.mjs` 通过
- broad vault deployment 在视觉签收前保持 deferred

### 任务列表

- [x] M7-1 Dev01 测试库同步门禁
  - [x] 主题文件目标：`/Users/su/Documents/Obsidian/Dev01/.obsidian/themes/Ouroboros`
  - [x] preview 目标：`/Users/su/Documents/Obsidian/Dev01/Theme Preview/Ouroboros/preview`
  - [x] 保持主题目录名 `Ouroboros`，不回退到 lowercase `ouroboros`
- [x] M7-2 QA-RUN 证据文件
  - [x] 新增 `preview/QA-RUN.md`
  - [x] 写入自动命令、Dev01 目标路径、manual QA matrix、release decision
  - [x] 明确 all-vault deployment 在视觉签收前 deferred
- [x] M7-3 自动检查覆盖 QA 证据链
  - [x] `check-theme.mjs` 检查 `preview/QA-RUN.md`
  - [x] `preview/README.md` 纳入 QA-RUN
  - [x] `preview/CHECKLIST.md` 要求当前 run summary
- [x] M7-3b 同步脚本大小写安全修复
  - [x] 用目录 entry 精确大小写判断替代 `existsSync(lowercasePath)`
  - [x] 如果旧目录真实命名为 `ouroboros`，先重命名到临时目录再重命名为 `Ouroboros`
  - [x] 在大小写不敏感文件系统上避免删除刚写入的 uppercase 主题目录
- [x] M7-4 手动视觉签收
  - [x] 在 Obsidian Dev01 打开 `Theme Preview/Ouroboros/preview`
  - [x] 完成 light/dark、Style Settings、插件面、移动窄宽、Print/PDF 签收
  - [x] 把截图/问题/最终决策写回 `preview/QA-RUN.md`

---

## M8 — 一致性 Bug 修复（专家评估第一批）

**目标**：消除 Style Settings 面板与实际渲染脱节、信息架构分裂、发布元数据不真实等一致性问题，零运行时风险优先。

**完成标准**：`npm run build` 通过；`npm run check` 通过；Style Settings 面板默认值与实际 CSS 默认渲染一致；accent 三色聚合在同一分组。

### 任务列表

- [x] M8-1 (B1) `h2/h3/h4/h5-color` Style Settings default → `#100F0F`（对齐 `var(--tx1)`）；保留 `h1=#100F0F`、`h6=#6F6E69` 不变
- [x] M8-2 (B3) `accent-sage` 移回 `accent-presets` 分组，与 moss/amber 聚合；保持 body class 名不变（不破坏已启用用户）
- [x] M8-3 (B4) style packs / accent 互斥：JS-less 主题无法原生单选，落地为确定性级联 + 强化 style-packs / accent-presets 两处「只开一个」措辞（未加无意义的运行时静态检查）
- [x] M8-4 (B2+B5) `manifest.json` minAppVersion → `1.4.0`（用户确认基线）；`versions.json` 收敛为 `{"1.0.2":"1.4.0"}`，按用户要求**不做降级回退**（< 1.4.0 的 app 不再被分发旧主题版本）

---

## M9 — 现有功能优化（吸收 Minimal / AnuPpuccin）

**目标**：把已具备但偏弱的能力打磨到竞品水准，吸收 Minimal 的可配置性与 AnuPpuccin 的代码/层级表达，但不引入高饱和或花哨。

**完成标准**：每子任务 light/dark 可用、与既有 token/reading/focus 系统兼容、preview 增样例、README 同步、build+check 通过。

### 任务列表

- [x] M9-1 (O1，吸收 Minimal) 暴露阅读栏宽：把 `--line-width` 绑定到 Obsidian 原生 `--file-line-width`（修复此前从未被消费的隐性 no-op），并新增 Style Settings「Reading width」分组：档位 `variable-select`（Narrow/Standard/Relaxed/Wide）+ 高级 `variable-text` 自定义宽度，解析优先级 custom → tier → 42rem，reading mode/style pack 仍以更高特异性覆盖；新增 `preview/reading-width-showcase.md`、CHECKLIST 行与 `check-theme.mjs` 绑定回归门禁，README/README_CN 同步
- [x] M9-2 (O2) 通用「标题编号 / 章节感」可选开关：新增 `numbered-headings` class-toggle，用 CSS counter 给 H1–H4 自动编号（1 / 1.1 / 1.1.1 / 1.1.1.1），阅读视图与 Live Preview 双覆盖、按笔记重置、排除 callout/blockquote 内标题以保持计数准确；Live Preview 编号锚定在 `.cm-line`（非会被隐藏的 `#` marker）；新增 preview、CHECKLIST 行、check-theme 门禁、README/README_CN 同步
- [x] M9-3 (O3，吸收 AnuPpuccin) 代码块增强：用 curated 语言名替换原 `attr(class)`「language-xxx」丑标签（角标挂 `code::before`，避开 pre 的两个 pseudo 与 fancy-code 冲突，hover 淡出让出复制按钮，~24 种语言映射，未映射不显示空角标，Reading View only 因 Live Preview fence 已显示语言，新增 `code-language-label` 默认开 class-toggle）；复制按钮默认 hover/active 态从 fancy-code 提为通用；diff 行加左侧 accent rail + 更强 tint（语义低饱和绿/红/青）；新增 code-block preview、CHECKLIST 行、check-theme 门禁、README/README_CN 同步
- [x] M9-4 (O4) 标签 pill：`#nested/tag` 层级视觉。Obsidian 把整条路径渲染为单节点、无 per-segment span，故无法逐段着色；改用 `a.tag[href*='/']`（仅阅读视图可检测嵌套）给嵌套标签加左 rail + 更柔填充使深层标签更克制，并为 Tags 侧栏 `.tree-item-children` 加嵌套引导线、折叠父级 count 变灰；新增 nested-tags preview、CHECKLIST、check-theme 门禁、README/README_CN 同步
- [x] M9-5 (O5) Graph view 暖纸调色 + 当前笔记高亮环，弱化连线噪音。图节点为 canvas 渲染、CSS 只能向 Obsidian 喂颜色（无法画 per-node DOM）；改 graph 背景为暖纸 wash、`color-fill-focused` 由变暗改为 `--interactive-accent-hover` 变亮、新增 `.graph-view.color-circle`（local graph 当前笔记高亮环 hook = accent）、`color-line` 降到 60% 透明弱化连线；全部跟随 accent presets；新增 graph-view preview、CHECKLIST、check-theme 门禁、README/README_CN 同步
- [x] M9-6 (O6) 动效性能审查：审计发现 `.search-empty-state` 在常驻空状态上跑 infinite pulse（永久重绘/耗电），改为仅 `.is-loading` 转瞬态保留 infinite、空状态改一次性 fade-in；`will-change` 经审查**故意不加**（短时一次性 transform/opacity 动画已是合成层友好，加 will-change 会钉住 GPU 层增内存）；reduce-motion 双通道（OS preference + body.reduce-motion）补 `scroll-behavior: auto`、infinite→1 次迭代、`!important` 强化；新增 check-theme `validateMotionAudit` 门禁、CHECKLIST reduce-motion 行加强

---

## M10 — 差异化新功能（吸收 Things / Border / Shimmering Focus / Catppuccin）

**目标**：在不稀释暖纸克制身份的前提下，新增 8 项差异化能力，全部走 token、禁高饱和、可被 reduce-motion/focus 系统兼容。

**完成标准**：同 M9；新增 Style Settings 项更新 `07-style-settings.css` 且 `@settings` 可解析无 tab；新增插件面更新 `08-plugin-compat.css` 与兼容审计。

### 任务列表

- [x] M10-1 (N1) 多色高亮笔系统：8 色 `<mark class="red|orange|yellow|green|cyan|blue|purple|pink">` 低饱和高亮（Obsidian `--color-*-rgb`，light 0.2 / dark 0.28 透明），用 `--ouro-hl-rgb` 载体把 16 规则压到 10；阅读视图（`==…==` Live Preview 无法承载 per-instance class，已说明）；新增 highlight-pens preview、CHECKLIST、check-theme 门禁、README/README_CN 同步
- [x] M10-2 (N2，吸收 Catppuccin/Blue Topaz + California/Prism) Accent 调色板扩展：新增 ink-blue/clay/slate 三个 accent preset（token + body.accent-* class + Style Settings，沿用 moss/amber/sage 模式），并入「lowest wins」措辞；新增纸张色温 `paper-warm`/`paper-cool` 两档（light + dark 都覆盖，保持墨色不变、确定性级联）；新增 accent-paper preview、CHECKLIST、check-theme 门禁、README/README_CN 同步
- [x] M10-3 (N3) 当前路径 / 面包屑 / active note 强化：新增 `active-path-emphasis` class-toggle（默认开），仅当前项低噪声暖色——view-header 面包屑父段 muted/分隔符 faint/当前标题暖、active tab inner title 暖 + 2px accent 顶轨（其余 tab 保持 muted）、`.workspace-leaf.mod-active .view-header-title` 暖色标识聚焦面板；暖色经 `color-mix(accent 70%, text-normal)` 跟随 6 accent presets；DOM 诚实：core 状态栏无原生面包屑，故强化 view-header/tab 而非伪造；新增 active-path preview、CHECKLIST、check-theme `validateActivePath` 门禁、README/README_CN 同步
- [x] M10-4 (N4) Daily/Periodic Notes & Calendar 仪表盘页：新增 `dashboard` cssclass（内容 helper 模型，note 级，无全局 toggle）——H2→小号大写 muted widget 头 + accent 左 tick；dataview/dataviewjs/tasks 块→抬升纸面板（复用 `--surface-raised`/`--shadow-soft`/`--thin-border`/`--radius-l`）；callout 仅给间距不二次套框；`dashboard.cards` 组合时面板内仍出卡片网格；可靠的 per-block 面板（不冒险 column-flow 整页，DOM 诚实：Obsidian 不把"标题+其后块"包成可分组元素）；阅读视图为主 + Live Preview embed 块覆盖；新增 dashboard preview、CHECKLIST、check-theme `validateDashboard` 门禁、README/README_CN 同步
- [x] M10-5 (N5，吸收 Things) 任务 / 优先级色板二期：优先级、due 临近渐变，复用 progress 五色
- [x] M10-6 (N6，吸收 Border) Tabs / pane「纸张分层」质感：细边框 + 轻阴影，不加重界面噪音
- [x] M10-7 (N7，吸收 Shimmering Focus) Typewriter / 居中打字子模式，作为 focus-mode 子开关
- [x] M10-8 (N8，吸收 Minimal) 可选衬线正文 / 西文字体档（扩展现有 CJK serif 思路到西文），`variable-select` 字体栈

---

## M11 — 竞品吸收对照验收

**目标**：把「吸收 7 项竞品优点」转成可审计 checklist，逐条映射到 M9/M10 的交付任务并确认有 preview 验证证据，避免「声称吸收但无落地」。

### 吸收对照表

| 竞品 | 吸收点 | 交付任务 | 验收 |
|------|--------|----------|------|
| Minimal | 阅读宽度/字体可配 | M9-1 + M10-8 | [x] M9-1 阅读宽度 + M10-8 阅读字体档，均有 preview/门禁 |
| AnuPpuccin | 代码语言标签 / 层级 | M9-3（文件夹保持克制，已由 M6-3 守住） | [x] M9-3 curated 语言角标 `code-block-showcase.md` + `validateCodeBlocks`；嵌套层级 M9-4 `nested-tags-showcase.md` + `validateNestedTags`；文件夹克制 `navigation-showcase.md`（无彩虹文件夹）。README EN/CN「Code blocks/Nested tags/代码块/嵌套标签」均有 |
| Shimmering Focus | typewriter / 极简专注 | M10-7 | [x] `typewriter-focus-showcase.md` + `validateTypewriterFocus`；README EN/CN「Typewriter focus/打字机聚焦」。吸收边界：scroll-lock 需 JS，只交付聚焦淡化+居中留白（已在 fixture 标注） |
| Border | 界面边界 / 分层质感 | M10-6 | [x] `paper-panes-showcase.md` + `validatePaperPanes`；README EN/CN「Paper panes/纸张分层」。吸收边界：用 border+shadow 不用 margin，侧栏保持扁平 |
| Things | 任务/优先级暖色工作台 | M10-5 | [x] `task-priority-showcase.md` + `validateTaskPriorityPalette`；README EN/CN「Task priority palette/优先级」。吸收边界：JS-less 不算日期临近，紧迫度由优先级 ramp 承载 |
| Catppuccin / Blue Topaz | 多调色板切换 | M10-2 | [x] ink-blue/clay/slate 三 accent preset，`accent-paper-showcase.md` + `validateAccentPaper`；README EN/CN「Accent presets/accent」。吸收边界：低饱和暖纸身份，不复制高饱和糖果色 |
| California Coast / Prism | 柔和色温档 | M10-2（色温档思路） | [x] `paper-warm`/`paper-cool` 两档（light+dark），同 `accent-paper-showcase.md` + `validateAccentPaper`；README EN/CN「Paper temperature/色温」。吸收边界：仅微调纸面色温，保持墨色不变 |

### 任务列表

- [x] M11-1 逐条勾选吸收对照表，确认每条有对应 preview fixture 与 README 说明（7/7 全部勾选，每条附交付任务 + preview fixture + check-theme 门禁 + README EN/CN 证据 + 吸收边界）
- [x] M11-2 更新 `DECISION-LOG.md` / `PATTERNS.md`：记录吸收边界（吸收能力但不复制高饱和/dashboard 化）——新增 ADR-018（吸收边界原则）、ADR-019（DOM 诚实硬约束）；新增 P-016（token 间接化优先级链）、P-017（子开关双 class 依赖）、P-018（每功能配 validate 门禁）、P-019（DOM 诚实）
- [x] M11-3 全量 `build + check` + preview 视觉回归收尾，回写发布候选证据——自动化门禁全绿（build + check + node --check ×3 + git diff --check，24 fixture / 25 validate 门禁 / theme.css 247,310 bytes）；在 `preview/QA-RUN.md` 新增「§4 M11 differentiation regression」run 记录，含 13 个 M9/M10 新表面的 pending 手动视觉清单（DOM 诚实：自动门禁绿 ≠ 已肉眼验证，活体视觉 QA 仍待人工）、吸收追溯与 M11 发布决策（版本保持 1.0.2，待显式发布任务）

---

## M12 — 分析修复 + Bullet Threading 吸收

**目标**：落地 2026-06-10 全量分析的结论——修复确认 Bug、消除交互瑕疵、吸收 bullet threading 与 clean embeds。
**完成标准**：`npm run build` + `npm run check`（含 3 个新增门禁）通过；BUG-TRACKER / KNOWN-LIMITATIONS / ADR / README / preview 全部同步。

### 任务列表

- [x] M12-1 Bug 修复批（BUG-003 / BUG-004 / BUG-005 / BUG-006，配 `validateM12FixRegressions` 门禁）
- [x] M12-2 优化批（tag hover 抖动、cjk-mode `overflow-wrap:anywhere` 收窄到 `.markdown-rendered` / `.cm-content`）
- [x] M12-3 Bullet threading：`bullet-threading` class-toggle 默认开；token `--ouroboros-thread-color/width/indent`；LP+源码双模式 anchor；tail/途径线/圆角 elbow/路径 bullet 着色；任务行避让 checkbox；`validateBulletThreading` 门禁 + `preview/bullet-threading-showcase.md`
- [x] M12-4 Clean embeds：`embed-clean` class-toggle（默认关）+ per-note cssclass；hover accent 轨保持可发现性；`validateCleanEmbeds` 门禁 + `preview/clean-embeds-showcase.md`

---

## 修改日志

| 日期 | 里程碑 | 内容 | 影响文件 |
|------|--------|------|----------|
| 2026-06-10 | M12-3b | BUG-007 修复：线程 z-index -99→0 + 标记提升层，解决与原生当前行高亮的遮挡冲突；门禁加防回归断言 | `src/01-foundation.css`, `check-theme.mjs`, `docs-code-ai/BUG-TRACKER.md`, `theme.css` |
| 2026-06-10 | M12-3/4 | 新增 bullet threading（默认开，accent 线程+圆角 elbow，编辑器限定 6 级，ADR-020）与 clean embeds（opt-in，无外框转引）；新增 2 preview fixture + 2 validate 门禁 + README EN/CN 同步 | `src/00-header.css`, `src/01-foundation.css`, `src/07-style-settings.css`, `check-theme.mjs`, `preview/`, `README.md`, `README_CN.md`, `theme.css` |
| 2026-06-10 | M12-1/2 | 修复 BUG-003~006（代码块边框失效/重复 mask/死变量/callout 死过渡）+ tag hover 去抖动 + cjk-mode 断行收窄；新增 `validateM12FixRegressions` 防回归 | `src/00-header.css`, `src/01-foundation.css`, `src/02-code.css`, `src/04-tasks-and-progress.css`, `src/09-animations.css`, `check-theme.mjs`, `theme.css` |
| 2026-06-02 | M11-3 | M11 收尾（**M11 完成 3/3，整条 M8–M11 路线图闭环**）：全量自动化回归全绿——`npm run build` + `npm run check` + `node --check`（check-theme/sync/build 三脚本）+ `git diff --check`，统计 24 preview fixture / 25 validate 门禁 / theme.css 247,310 bytes（10 源文件）；在 `preview/QA-RUN.md` 追加「§4 M11 differentiation regression confirmation」run 记录，列出 13 个 M9/M10 自 M7 手动矩阵以来新增的差异化表面 + 各自 SS/preview/gate + pending 手动视觉 QA（DOM 诚实标注：自动门禁绿不等于活体肉眼验证）、吸收追溯（对照表 7/7 + ADR-018/019 + P-016~019）、M11 发布决策（版本保持 1.0.2，待显式发布任务）| `preview/QA-RUN.md`, `docs-code-ai/Tasks.md`, `docs-code-ai/2026-06——记忆文档.md`, `docs-code-ai/CONTEXT-HANDOFF.md` |
| 2026-06-02 | M11-2 | 把吸收边界固化进决策/模式文档：DECISION-LOG 新增 ADR-018（竞品吸收只吸收能力、不复制越界审美/交互，逐条边界）、ADR-019（DOM 诚实——CSS-only 不伪造运行时状态，做不到的交付近似并标注边界）；PATTERNS 新增 P-016（token 间接化 + var() fallback 确定性优先级链，line-width/reading-font 共用）、P-017（子开关双 class 依赖，cjk-serif/typewriter-focus）、P-018（每差异化功能配 check-theme validate* 回归门禁）、P-019（DOM 诚实只对真实 hook 着色）；更新文档导航表两行日期 | `docs-code-ai/DECISION-LOG.md`, `docs-code-ai/PATTERNS.md`, `docs-code-ai/Tasks.md`, `docs-code-ai/2026-06——记忆文档.md` |
| 2026-06-02 | M11-1 | 吸收对照表逐条验收：7 条竞品（Minimal/AnuPpuccin/Shimmering Focus/Border/Things/Catppuccin·Blue Topaz/California·Prism）全部勾选 ✅，每条核对到「交付任务 + preview fixture + check-theme 回归门禁 + README EN/CN 说明 + 吸收边界」四类证据；确认 8 个 showcase fixture 与 8 个 validate* 门禁齐备，无「声称吸收但无落地」缺口 | `docs-code-ai/Tasks.md`, `docs-code-ai/2026-06——记忆文档.md` |
| 2026-06-02 | M10-8 | 可选衬线/西文阅读字体档（吸收 Minimal，M10 收尾 8/8）：把 `--font-text-theme` 经 `var(--reading-font, var(--font-system-ui))` 间接化（默认解析值不变，零回归），新增 4 个西文字体栈 token（`--font-system-ui`/`--font-western-serif`/`--font-western-modern`/`--font-western-humanist`）；新增 Typography 分组 `reading-font` `variable-select`（System sans/Iowan-Palatino 衬线/Georgia 现代衬线/Inter 人文无衬线，选项值用 `var(--font-*)` 引用 token）；**UI chrome 解耦**——`--font-interface-theme` 钉死 `--font-system-ui`，选衬线只改正文+编辑区不波及侧栏/菜单/设置；沿用 M9-1 reading-width 优先级模式：CJK 模式 / style pack 用更高特异性直接覆写 `--font-text-theme` 仍胜出（CJK/包 > 字体档 > 系统默认）；新增 reading-font preview、CHECKLIST、check-theme `validateReadingFont` 门禁（守间接化 + 4 token + UI 解耦 + select + preview/README）；README/README_CN 同步；build+check 通过 | `src/00-header.css`, `src/07-style-settings.css`, `check-theme.mjs`, `preview/reading-font-showcase.md`, `preview/README.md`, `preview/CHECKLIST.md`, `README.md`, `README_CN.md`, `theme.css` |
| 2026-06-02 | M10-7 | Typewriter/居中打字（吸收 Shimmering Focus）：`typewriter-focus` class-toggle（默认关，focus-mode 子开关，类比 cjk-serif 依赖 cjk-mode）——`body.focus-mode.typewriter-focus` 下 `.cm-editor.cm-focused .cm-line` 淡化到 0.4、`.cm-line.cm-active` 复原 1（聚焦时才淡化，失焦阅读不受影响），`.cm-content` `padding-block: 30vh 40vh` 居中留白；仅 Live Preview/source（阅读视图无当前行）；DOM 诚实：CSS 无法 scroll-lock 自动居中（需 JS），只交付聚焦淡化 + 居中留白；opacity fade 被 reduce-motion 双通道中和（dim 状态保留）；新增 typewriter-focus preview、CHECKLIST、check-theme `validateTypewriterFocus` 门禁；README/README_CN 同步；build+check 通过 | `src/01-foundation.css`, `src/07-style-settings.css`, `check-theme.mjs`, `preview/typewriter-focus-showcase.md`, `preview/README.md`, `preview/CHECKLIST.md`, `README.md`, `README_CN.md`, `theme.css` |
| 2026-06-02 | M10-6 | Tabs/pane 纸张分层（吸收 Border）：`paper-panes` class-toggle（默认关，opt-in）——`.mod-root .workspace-tabs` 细边框 + `--shadow-soft` + `--radius-l` + `overflow:hidden`，加深 `.mod-root` 背景让纸张浮起；active 组 `:has(.workspace-leaf.mod-active)` 用新 token `--shadow-raised` 更强抬升 + accent 18% color-mix 边（跟随 presets，与 active-path 组合）；仅编辑区，侧栏保持扁平；无 margin（不改盒模型，避开版本敏感 split math），滚动留在内层 `.view-content`；新增 `--shadow-raised` 组件 token、paper-panes preview、CHECKLIST、check-theme `validatePaperPanes` 门禁；README/README_CN 同步；build+check 通过 | `src/00-header.css`, `src/01-foundation.css`, `src/07-style-settings.css`, `check-theme.mjs`, `preview/paper-panes-showcase.md`, `preview/README.md`, `preview/CHECKLIST.md`, `README.md`, `README_CN.md`, `theme.css` |
| 2026-06-02 | M10-5 | 任务优先级色板二期（吸收 Things）：`task-priority-palette` class-toggle（默认关，opt-in）——把 Tasks 插件 `data-task-priority`（highest…lowest）映射到暖→冷 progress 五色 ramp（highest→`--progress-color-1` 暖红 … lowest→`--progress-color-5` 冷蓝），inset 2px 左轨克制呈现；`none` 不上色保持安静；due chip 暖色（time-pressure 信号）；DOM 诚实：JS-less 无法算日期临近，紧迫度只由优先级 ramp + due 暖色承载，不伪造 overdue/today class；新增 task-priority preview、CHECKLIST、check-theme `validateTaskPriorityPalette` 门禁；README/README_CN 同步；build+check 通过 | `src/05-plugins-primary.css`, `src/07-style-settings.css`, `check-theme.mjs`, `preview/task-priority-showcase.md`, `preview/README.md`, `preview/CHECKLIST.md`, `README.md`, `README_CN.md`, `theme.css` |
| 2026-06-02 | M10-4 | Daily/Periodic 仪表盘：`dashboard` cssclass（内容 helper，无 toggle）——H2→muted widget 头 + accent tick；dataview/dataviewjs/tasks 块→纸面板（复用 surface/shadow token）；callout 不二次套框；`dashboard.cards` 组合出卡片网格；per-block 面板（DOM 诚实，不 column-flow）；新增 dashboard preview、CHECKLIST、check-theme `validateDashboard` 门禁；README/README_CN 同步；build+check 通过 | `src/05-plugins-primary.css`, `check-theme.mjs`, `preview/dashboard-showcase.md`, `preview/README.md`, `preview/CHECKLIST.md`, `README.md`, `README_CN.md`, `theme.css` |
| 2026-06-02 | M10-3 | 当前路径/active note 强化：`active-path-emphasis` class-toggle（默认开），仅当前项暖色（view-header 面包屑、active tab inner title + 2px accent 顶轨、`.mod-active` 面板标题），color-mix(accent) 跟随 presets；DOM 诚实（core 无状态栏面包屑）；新增 active-path preview、CHECKLIST、check-theme `validateActivePath` 门禁；README/README_CN 同步；build+check 通过 | `src/01-foundation.css`, `src/07-style-settings.css`, `check-theme.mjs`, `preview/active-path-showcase.md`, `preview/README.md`, `preview/CHECKLIST.md`, `README.md`, `README_CN.md`, `theme.css` |
| 2026-06-02 | M10-2 | Accent 扩展（ink-blue/clay/slate token+class+SS）+ 纸张色温 paper-warm/cool（light+dark）；新增 accent-paper preview、CHECKLIST、check-theme 门禁；README/README_CN 同步；build+check 通过 | `src/00-header.css`, `src/01-foundation.css`, `src/07-style-settings.css`, `check-theme.mjs`, `preview/accent-paper-showcase.md`, `preview/README.md`, `preview/CHECKLIST.md`, `README.md`, `README_CN.md`, `theme.css` |
| 2026-06-02 | M10-1 | 多色高亮笔：8 色 `<mark class>` 低饱和高亮，`--ouro-hl-rgb` 载体，light/dark 分级，阅读视图；新增 highlight-pens preview、CHECKLIST、check-theme 门禁；README/README_CN 同步；build+check 通过 | `src/01-foundation.css`, `check-theme.mjs`, `preview/highlight-pens-showcase.md`, `preview/README.md`, `preview/CHECKLIST.md`, `README.md`, `README_CN.md`, `theme.css` |
| 2026-06-02 | M9-6 | 动效性能审查：`.search-empty-state` 常驻 infinite pulse → 仅 `.is-loading` 保留、空状态改一次性 fade-in；will-change 故意不加（合成层友好）；reduce-motion 双通道补 scroll-behavior auto + infinite→1 + !important；新增 `validateMotionAudit` 门禁、CHECKLIST 强化；build+check 通过 | `src/09-animations.css`, `check-theme.mjs`, `preview/CHECKLIST.md`, `theme.css` |
| 2026-06-02 | M9-5 | Graph view：暖纸背景 wash、focused 节点变亮(accent-hover)、新增 color-circle 当前笔记高亮环、color-line 弱化到 60% 透明；跟随 accent presets；新增 graph-view preview、CHECKLIST、check-theme 门禁；README/README_CN 同步；build+check 通过 | `src/01-foundation.css`, `check-theme.mjs`, `preview/graph-view-showcase.md`, `preview/README.md`, `preview/CHECKLIST.md`, `README.md`, `README_CN.md`, `theme.css` |
| 2026-06-02 | M9-4 | 嵌套标签层级：`a.tag[href*='/']` 左 rail + 柔填充（仅阅读视图可检测嵌套）、Tags 侧栏嵌套引导线、折叠父级 count 变灰；新增 nested-tags preview、CHECKLIST、check-theme 门禁；README/README_CN 同步；build+check 通过 | `src/01-foundation.css`, `check-theme.mjs`, `preview/nested-tags-showcase.md`, `preview/README.md`, `preview/CHECKLIST.md`, `README.md`, `README_CN.md`, `theme.css` |
| 2026-06-02 | M9-3 | 代码块增强：curated 语言角标（替换 attr(class) 丑标签，挂 code::before、hover 淡出、~24 语言映射、未映射不显示）、复制按钮通用 hover/active、diff 行左 accent rail + 更强 tint；新增 code-block preview、CHECKLIST、check-theme 门禁；README/README_CN 同步；build+check 通过 | `src/02-code.css`, `src/07-style-settings.css`, `check-theme.mjs`, `preview/code-block-showcase.md`, `preview/README.md`, `preview/CHECKLIST.md`, `README.md`, `README_CN.md`, `theme.css` |
| 2026-06-02 | M9-2 | 新增 `numbered-headings` class-toggle：CSS counter 给 H1–H4 自动编号，阅读视图 + Live Preview 双覆盖、按笔记重置、排除 callout/blockquote 内标题；Live Preview 编号锚定 `.cm-line` 避免随 `#` marker 隐藏；新增 numbered-headings preview、CHECKLIST 行、check-theme 门禁；README/README_CN 同步；build+check 通过 | `src/01-foundation.css`, `src/07-style-settings.css`, `check-theme.mjs`, `preview/numbered-headings-showcase.md`, `preview/README.md`, `preview/CHECKLIST.md`, `README.md`, `README_CN.md`, `theme.css` |
| 2026-06-02 | M9-1 | 修复 `--line-width` 从未绑定 Obsidian `--file-line-width` 的隐性 no-op（此前 airy/research/longform/6 风格包的栏宽全部不生效）；新增 Style Settings「Reading width」档位 select + 高级 variable-text，解析 custom→tier→base；新增 reading-width preview、CHECKLIST 行、check-theme 绑定回归门禁；README/README_CN 同步；build+check 通过 | `src/00-header.css`, `src/07-style-settings.css`, `check-theme.mjs`, `preview/reading-width-showcase.md`, `preview/README.md`, `preview/CHECKLIST.md`, `README.md`, `README_CN.md`, `theme.css` |
| 2026-06-02 | M8 | 规划 M8–M11 全量路线图（专家评估的 Bug/优化/新增/竞品吸收）；完成 B1 标题色默认值对齐墨黑、B3 accent-sage 移回 accent-presets 分组、B4 style-packs/accent 只开一个措辞强化、B2/B5 minAppVersion→1.4.0 且 versions.json 不做降级回退；build+check 通过 | `docs-code-ai/Tasks.md`, `src/07-style-settings.css`, `manifest.json`, `versions.json`, `theme.css` |
| 2026-05-21 | M7 | 新增 Release Candidate QA run 证据文件、Dev01 同步目标、自动检查门禁，修复 `--clean-lowercase` 大小写误删风险，完成 Dev01 手动视觉签收，并把全库部署延后到签收之后 | `preview/QA-RUN.md`, `preview/README.md`, `preview/CHECKLIST.md`, `check-theme.mjs`, `sync-theme-to-vault.mjs`, `docs-code-ai/Tasks.md` |
| 2026-05-21 | M6-6 | 新增 Obsidian Publish 基础样式与 Print/PDF 导出规则，覆盖外链 URL、脚注、表格、代码、callout、figure 和导出门禁 | `src/01-foundation.css`, `check-theme.mjs`, `preview/publish-print-showcase.md`, `preview/CHECKLIST.md`, `README.md`, `README_CN.md`, `theme.css` |
| 2026-05-21 | M6-5 | 新增 Keyboard mode、Focus Mode 2.0 edge rails、prompt/switcher 键盘提示和更强 focus ring，并补自动检查 | `src/01-foundation.css`, `src/07-style-settings.css`, `check-theme.mjs`, `preview/focus-mode-showcase.md`, `README.md`, `README_CN.md`, `theme.css` |
| 2026-05-21 | M6-4 | 新增图片/figure/gallery helper：`img-grid`、`img-wide`、`img-frame`、`figure-note`，补本地 SVG preview 资产和图注/移动端检查 | `src/01-foundation.css`, `check-theme.mjs`, `preview/image-figure-gallery-showcase.md`, `preview/assets/`, `README.md`, `README_CN.md`, `theme.css` |
| 2026-05-21 | M6-3 | 新增 File Explorer / Bookmarks / Outline 低噪声导航轨、当前路径提示和 navigation preview，并避免默认彩虹文件夹风格 | `src/01-foundation.css`, `check-theme.mjs`, `preview/navigation-showcase.md`, `README.md`, `README_CN.md`, `theme.css` |
| 2026-05-21 | M6-2 | 新增内容 helper classes：Dataview card/list grids、cover/compact cards、wide/small/clean tables，并补 preview 与自动检查 | `src/01-foundation.css`, `src/05-plugins-primary.css`, `check-theme.mjs`, `preview/content-helpers-showcase.md`, `README.md`, `README_CN.md`, `theme.css` |
| 2026-05-21 | M6-1 | 新增 6 套 Style Settings 风格包、preset preview 与自动检查，修正安装文档主题目录大小写 | `src/01-foundation.css`, `src/07-style-settings.css`, `check-theme.mjs`, `preview/presets-showcase.md`, `README.md`, `README_CN.md`, `theme.css` |
| 2026-05-21 | M1 | 创建主题项目 AI 文档体系 | `CLAUDE.md`, `docs-code-ai/` |
| 2026-05-21 | M1 | 修复 Style Settings YAML/tab/非法默认值并加入自动检查 | `src/07-style-settings.css`, `check-theme.mjs`, `theme.css` |
| 2026-05-21 | M4-1 | 新增 decision / risk / principle / insight / cycle 知识工作流 callout | `src/01-foundation.css`, `preview/core-showcase.md`, `theme.css` |
| 2026-05-21 | M4-2 | 升级 Canvas node/group/edge/minimap 视觉并补 Canvas preview | `src/05-plugins-primary.css`, `src/08-plugin-compat.css`, `preview/`, `theme.css` |
| 2026-05-21 | M4-3 | 新增 Research reading mode 与研究阅读 preview | `src/01-foundation.css`, `src/07-style-settings.css`, `preview/research-reading-showcase.md`, `theme.css` |
| 2026-05-21 | M4-4 | 新增 Longform reading mode 与长文阅读 preview | `src/01-foundation.css`, `src/07-style-settings.css`, `preview/longform-reading-showcase.md`, `theme.css` |
| 2026-05-21 | M4-5 | 升级 Focus mode 可发现性与 hover/focus 恢复机制 | `src/01-foundation.css`, `src/07-style-settings.css`, `preview/focus-mode-showcase.md`, `theme.css` |
| 2026-05-21 | M5-1 | 新增 preview QA checklist，建立 release-quality 手动视觉回归门禁 | `preview/CHECKLIST.md`, `preview/README.md`, `docs-code-ai/` |
| 2026-05-21 | M5-2 | 同步 README/README_CN 功能说明、preview QA 指引与 screenshot 资产 | `README.md`, `README_CN.md`, `screenshot.png`, `preview/CHECKLIST.md`, `preview/README.md`, `docs-code-ai/` |
| 2026-05-21 | M5-3 | 新增 release checklist，串联版本、构建、preview QA、tag、GitHub Release 与发布后 smoke gate | `docs-code-ai/RELEASE-CHECKLIST.md`, `README.md`, `README_CN.md`, `preview/CHECKLIST.md`, `docs-code-ai/` |
| 2026-05-21 | M5-4 | 新增插件兼容审计，按 preview-covered / selector-level / companion / legacy 分级，并把官方 id 与脆弱 selector 纳入自动检查 | `src/08-plugin-compat.css`, `src/03-mobile.css`, `check-theme.mjs`, `docs-code-ai/PLUGIN-COMPATIBILITY-AUDIT.md`, `README.md`, `README_CN.md`, `preview/`, `theme.css` |
| 2026-05-21 | M5-5 | 新增已知限制与不支持插件清单，将 selector-level、legacy 和版本敏感风险转为 release notes 可复制口径 | `docs-code-ai/KNOWN-LIMITATIONS.md`, `check-theme.mjs`, `README.md`, `README_CN.md`, `preview/`, `docs-code-ai/` |
| 2026-05-21 | M1 | 补齐 vault 同步脚本与 preview 样例 | `package.json`, `sync-theme-to-vault.mjs`, `preview/` |
| 2026-05-21 | M2 | 新增组件 token 并迁移第一批硬编码 UI 色 | `src/00-header.css`, `src/01-foundation.css`, `src/03-mobile.css`, `src/05-plugins-primary.css`, `src/06-plugins-secondary.css`, `theme.css` |
| 2026-05-21 | M3 | 新增 Bases 表格/卡片/列表/筛选/排序/分组 UI 覆盖 | `src/05-plugins-primary.css`, `src/08-plugin-compat.css`, `preview/plugin-showcase.md`, `README.md`, `README_CN.md`, `theme.css` |
| 2026-05-21 | M3 | 新增 Properties View / metadata panel UI 覆盖 | `src/01-foundation.css`, `preview/core-showcase.md`, `theme.css` |
| 2026-05-21 | M3 | 新增 Command Palette / Quick Switcher prompt 与 suggestion 状态覆盖 | `src/01-foundation.css`, `preview/core-showcase.md`, `theme.css` |
| 2026-05-21 | M3 | 新增 Bookmarks / Search / Outline 层级、结果卡片与空状态覆盖 | `src/01-foundation.css`, `src/08-plugin-compat.css`, `preview/core-showcase.md`, `README.md`, `README_CN.md`, `theme.css` |
