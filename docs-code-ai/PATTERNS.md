# 项目设计模式 — Ouroboros Obsidian Theme

## 注册门槛

满足以下任一条件时，才创建新条目：

- 同类问题在项目中出现 ≥ 2 次，且用了相同解法
- 这个解法不直觉，需要说明为什么不用更简单方案
- 这个解法有常见错误实现，需要写「不要这样做」
- 该模式会影响后续 AI/开发者如何扩展主题

---

## P-001 源码分层由文件名前缀决定

**场景**：新增或移动 CSS 规则时，需要决定放在哪个 `src/*.css` 文件。  
**解法**：按加载顺序和职责放置：`00` token，`01` foundation，`02-04` 内容表面，`05-06` 插件，`07` settings，`08` metadata，`09` animations。  
**不要这样做**：不要为了方便把所有新规则堆进 `01-foundation.css`；会让插件和动效边界失控。  
**当前使用位置**：全部 `src/*.css`。

---

## P-002 Style Settings 是 YAML，必须自动校验

**场景**：新增用户设置项、变量或 body class。  
**解法**：把 `/* @settings ... */` 当 YAML 解析；禁止 tab；禁止非法默认值。  
**不要这样做**：不要只靠肉眼看配置缩进；一个 tab 就可能让设置面板失败。  
**当前使用位置**：`src/07-style-settings.css`。

---

## P-003 主题变量优先，硬编码色必须有理由

**场景**：新增插件适配、按钮、状态色、hover 色。  
**解法**：优先使用 `var(--text-normal)`、`var(--background-primary-alt)`、`var(--color-*-rgb)`、`color-mix()`。  
**不要这样做**：不要直接写 `#ffffff`、`white`、插件品牌色或一次性 RGB；会破坏深浅色和 accent presets。  
**当前使用位置**：应推广到 `src/05-plugins-primary.css`、`src/06-plugins-secondary.css`。

---

## P-004 内容样式必须同时覆盖 Reading View 和 Live Preview

**场景**：标题、链接、标签、列表、quote、callout、task 等 Markdown 内容样式。  
**解法**：成对选择 `.markdown-rendered ...` 与 `.markdown-source-view.mod-cm6 ...` / `.HyperMD-*`。  
**不要这样做**：不要只写 `.markdown-rendered h2`，否则编辑时视觉不一致。  
**当前使用位置**：`src/01-foundation.css` heading/link/tag/quote 区域。

---

## P-005 Component tokens 先于局部硬编码

**场景**：按钮、浮层、插件卡片、强调色前景文字反复需要同类视觉值。  
**解法**：先在 `src/00-header.css` 创建 component token，例如 `--text-on-accent`、`--shadow-popover`，再在具体 UI 中引用。  
**不要这样做**：不要在每个插件区域重复写 `white`、品牌色 hex 或独立阴影值。  
**当前使用位置**：`src/00-header.css`，`src/03-mobile.css`，`src/05-plugins-primary.css`，`src/06-plugins-secondary.css`。

---

## P-006 现代核心工作台 UI 先确认 DOM 再覆盖

**场景**：新增 Obsidian 新核心视图或复杂内置插件样式，例如 Bases、Properties View、Quick Switcher。  
**解法**：先用本机 Obsidian app 资源或 live DOM 确认 selector/变量，再在对应层新增 scoped 样式；复杂工作台 UI 可放入 `src/05-plugins-primary.css`，并更新 preview/README/compat metadata。  
**不要这样做**：不要凭旧截图猜类名，也不要把大段特定 DOM 规则塞进 `src/01-foundation.css`。  
**当前使用位置**：`src/05-plugins-primary.css` 的 Bases 区、`src/01-foundation.css` 的 Properties、prompt/suggestion、tree/search 区；后续 M4 继续复用。

---

## P-007 自定义 Callout 应保持 Markdown 原生语义

**场景**：新增面向知识工作流的 callout 类型，例如 decision、risk、principle、insight、cycle。

**解法**：使用 Obsidian 原生 `[!type]` 与 `.callout[data-callout='type']`；先设置 `--callout-color` 和共享 workflow 样式，再少量区分语义色。

**不要这样做**：不要为了每个 callout 新增插件依赖、JS、复杂 DOM 假组件或 Style Settings 开关；会降低 vault 可移植性。

**当前使用位置**：`src/01-foundation.css` 的 Custom Callout Types 区块，`preview/core-showcase.md` 的 callout 样例。

---

## P-008 Canvas 以现代容器 selector 为主，旧 selector 只做兼容

**场景**：修改 Canvas 节点、分组、边、控件、minimap 或颜色选择器样式。

**解法**：优先覆盖 `.canvas-node-container`、`.canvas-node-group`、`.canvas-edges path.canvas-display-path`、`.canvas-path-label`、`.canvas-control-group`、`.canvas-card-menu`、`.canvas-minimap` 等现代 selector；必要时保留 `.canvas-edge`、`.canvas-node.canvas-node-group` 作为兼容。

**不要这样做**：不要只改 `.canvas-node` 或 `.canvas-edge`，这些选择器无法完整表达现代 Canvas 的真实视觉容器与边标签状态。

**当前使用位置**：`src/05-plugins-primary.css` 的 Canvas View 区块，`preview/canvas-workflow.canvas`。

---

## P-009 Reading mode 同时支持全局 class-toggle 与 note-level cssclasses

**场景**：新增阅读模式，例如 research-reading、longform-reading。

**解法**：在 Style Settings 中提供 `body.<mode>` class-toggle，同时让 `.markdown-preview-view.<mode>` / `.markdown-source-view.<mode>` 支持单篇 note 的 `cssclasses`；preview 中必须提供带 `cssclasses` 的样例。

**不要这样做**：不要只提供全局开关，让整个 vault 被迫进入特殊阅读模式；也不要只靠 note class，导致用户在 Style Settings 中找不到功能。

**当前使用位置**：`src/01-foundation.css` 的 Research / Longform reading mode，`src/07-style-settings.css`，`preview/research-reading-showcase.md`，`preview/longform-reading-showcase.md`。

---

## P-010 Focus/隐藏模式必须有可见恢复入口

**场景**：主题功能会隐藏、弱化或移动 Obsidian chrome，例如 ribbon、sidebar、status bar。

**解法**：使用 dimming + visible rail + `:hover` / `:focus-within` recovery；保留 `pointer-events: auto`，并提供 preview 手动 QA。

**不要这样做**：不要把导航入口设为 `opacity: 0` 且 `pointer-events: none`，这会让用户无法通过鼠标或键盘找回界面。

**当前使用位置**：`src/01-foundation.css` 的 Focus Mode 区块，`preview/focus-mode-showcase.md`。

---

## P-011 Preview checklist 先于截图和发布声明

**场景**：准备更新 README 截图、发布说明、插件兼容声明或对外功能 claims。

**解法**：先按 `preview/CHECKLIST.md` 运行 build/sync、文件级 preview、Style Settings 变体、light/dark、mobile/accessibility 和 plugin/workbench pass；把证据或已知问题写在 checklist，再同步 README/screenshot。

**不要这样做**：不要先更新截图或 README claims，再事后凭印象补 QA；这会让文档超过真实验证范围。

**当前使用位置**：`preview/CHECKLIST.md`，M5 release-quality 流程。

---

## P-012 Screenshot / README / preview 三方同步

**场景**：替换主题截图、更新 README/README_CN 功能声明、调整插件支持列表或发布说明。

**解法**：让 README/README_CN 引用同一个 `screenshot.png`，保留高清源图路径；再用 `preview/CHECKLIST.md` 的 README / screenshot sync pass 检查图片尺寸、alt text、功能声明和 preview 覆盖。

**不要这样做**：不要让 README 用一张图、社区主题根截图用另一张图，也不要把未被 preview 覆盖的功能写成已完整 QA。

**当前使用位置**：`README.md`，`README_CN.md`，`screenshot.png`，`_resources/img/image-comparison-v1.png`，`preview/CHECKLIST.md`。

---

## P-013 Visual QA 与 Release gate 分离

**场景**：主题进入发布准备，既需要人工视觉检查，也需要版本、tag、GitHub Release、community metadata 与发布后 smoke。

**解法**：先用 `preview/CHECKLIST.md` 完成视觉和交互证据，再用 `docs-code-ai/RELEASE-CHECKLIST.md` 完成版本同步、制品、tag、发布、社区目录和回滚计划。

**不要这样做**：不要把“看过 preview”当成“可以发布”，也不要在未完成 M5-5 或未通过插件兼容审计的情况下发布带有过度插件兼容承诺的版本。

**当前使用位置**：`preview/CHECKLIST.md`，`docs-code-ai/RELEASE-CHECKLIST.md`，M5 release-quality 流程。

---

## P-014 插件 claim 需要官方 id、分级和审计行

**场景**：新增、删除或调整 README/README_CN、`src/08-plugin-compat.css`、preview 中的插件/核心视图支持声明。

**解法**：先在 `docs-code-ai/PLUGIN-COMPATIBILITY-AUDIT.md` 添加或更新一行，明确 official id / view、Tier、CSS source coverage、preview evidence 和 risk；再同步 `src/08-plugin-compat.css`、README/README_CN、preview/checklist，并把 required id 或 fragile selector 加入 `check-theme.mjs`。

**不要这样做**：不要只因为插件继承了核心 token 就加入 `@plugins` metadata；不要把 selector-level 或 legacy selector 写成 full preview support。

**当前使用位置**：`docs-code-ai/PLUGIN-COMPATIBILITY-AUDIT.md`，`src/08-plugin-compat.css`，`check-theme.mjs`，README/README_CN 的插件支持区块。

---

## P-015 Known limitations 是发布文案的事实来源

**场景**：发布说明、README 支持范围、unsupported plugin list、fragile selector 风险或用户兼容 issue triage。

**解法**：把用户需要知道的限制写入 `docs-code-ai/KNOWN-LIMITATIONS.md`，把维护证据写入 `docs-code-ai/PLUGIN-COMPATIBILITY-AUDIT.md`；release notes 复制/改写 known limitations 第 1 节。

**不要这样做**：不要只在内部审计里记录限制，也不要在 README 中删除限制而不提供稳定 selector、官方 id、live DOM 和 preview QA 证据。

**当前使用位置**：`docs-code-ai/KNOWN-LIMITATIONS.md`，README/README_CN Known limitations 区块，`docs-code-ai/RELEASE-CHECKLIST.md` release notes gate，`check-theme.mjs`。

---

## P-016 用 token 间接化 + var() fallback 构建确定性优先级链

**场景**：一个可配置值（阅读宽度、阅读字体）有多个来源，且需要明确"谁覆盖谁"——基础默认、Style Settings 档位、Style Settings 高级自定义、reading mode/style pack。

**解法**：用嵌套 `var(--specific, var(--less-specific, <base>))` 把来源串成 fallback 链，并把最终变量定义在低特异性 `body{}`；更强的来源（`body.<mode>` / `body.<pack>`）用更高特异性直接覆写最终变量，自然胜出。例：`--line-width: var(--line-width-custom, var(--line-width-tier, 42rem))`（M9-1）、`--font-text-theme: var(--reading-font, var(--font-system-ui))`（M10-8）。Style Settings 选项值可用 `var(--token)` 引用具名 token（避免在 `@settings` YAML 写带逗号/引号的字体栈）。

**不要这样做**：不要给每个来源加 `!important` 抢优先级，也不要用 JS/多 class 组合模拟覆盖；fallback 链 + 特异性级联已经是确定性的。不要忘了给链尾留 base 默认，否则变量未写时整条失效。

**当前使用位置**：`src/00-header.css` 的 `--line-width` / `--file-line-width` / `--font-text-theme`，`src/01-foundation.css` 的 reading mode / style pack 覆写，`preview/reading-width-showcase.md`、`preview/reading-font-showcase.md`。

---

## P-017 子开关用「双 class 依赖」表达，不新增布尔标志

**场景**：一个功能是另一个功能的可选子模式，只在父功能开启时才生效，例如 CJK 衬线（依赖 CJK 模式）、typewriter 聚焦（依赖 Focus mode）。

**解法**：用 `body.<parent>.<child>` 双 class 选择器表达依赖；子开关仍是独立 Style Settings class-toggle，但样式只在父 class 同时存在时命中。Style Settings 描述里注明 "Requires <parent> on"。

**不要这样做**：不要新增一个 `--child-enabled: 0/1` 变量或在 JS 里联动；CSS-only 主题用选择器特异性就能表达依赖。也不要让子开关在父功能关闭时产生孤立副作用。

**当前使用位置**：`src/01-foundation.css` 的 `body.cjk-mode.cjk-serif`、`body.focus-mode.typewriter-focus`，`src/07-style-settings.css` 对应 toggle，`preview/typewriter-focus-showcase.md`。

---

## P-018 每个差异化功能配一个 check-theme `validate*` 回归门禁

**场景**：新增一个用户可见的差异化功能（highlight pens、accent 扩展、active-path、dashboard、task priority、paper panes、typewriter、reading font 等）。

**解法**：在 `check-theme.mjs` 写一个 `validateX(...)` 函数，断言四类资产同时存在：关键 CSS 选择器/token、Style Settings id、README EN/CN 引用、preview fixture 含 2 个哨兵词；用 `failures.push(...validateX(...))` 注册。让"改坏即 `npm run check` 失败"。

**不要这样做**：不要只靠 preview 肉眼检查就认为功能"交付"；没有门禁的功能会随重构静默腐烂。不要让门禁只查 CSS 而漏掉 README/preview 同步（声明漂移正是要防的）。

**当前使用位置**：`check-theme.mjs` 的 `validateReadingWidth` / `validateReadingFont` / `validateCodeBlocks` / `validateNestedTags` / `validateGraphView` / `validateHighlightPens` / `validateAccentPaper` / `validateActivePath` / `validateDashboard` / `validateTaskPriorityPalette` / `validatePaperPanes` / `validateTypewriterFocus` 等。

---

## P-019 DOM 诚实：只对真实稳定的 hook 着色，不伪造运行时状态

**场景**：差异化功能触及"需要运行时状态"的边界——逐段着色、per-node 颜色、当前路径、日期临近、滚动锁定。

**解法**：先确认 DOM 中真实、稳定存在的 hook；做不到的（日期数学、滚动监听、不存在的 per-segment span）改为交付可达成的近似，并在 preview fixture 显式标注边界 + "需要 JS 插件"。例：N5 用优先级 ramp 替代日期临近、N7 用聚焦淡化+居中留白替代 scroll-lock、M9-4 用 `a.tag[href*='/']` 替代逐段着色。详见 [ADR-019]。

**不要这样做**：不要用静态 CSS 假装实现运行时功能（伪造 overdue class、假 scroll-lock、检测多选互斥）；CSS 无运行时状态，这类样式会在真实 vault 静默失效，也无法回归验证（B4 教训）。

**当前使用位置**：`src/01-foundation.css` 的 nested tags / graph / active-path / typewriter，`src/05-plugins-primary.css` 的 task priority，对应 preview fixture 的 DOM-honesty 说明段。

---

## P-020 跨功能伪元素避让：自定义属性载体 + `min()` 消费，不直接 cap 别人的伪元素

**场景**：功能 A 画的伪元素（如 bullet threading 的 tail/elbow）在某类行（任务行）上需要缩短/避让，但 `::before` / `::after` 是共享槽位，直接写 `.HyperMD-task-line::after { max-height: ... }` 会污染其他功能（active-line、callout 图标等）在同一槽位画的伪元素。

**解法**：在目标行上只设置无副作用的自定义属性（`.HyperMD-task-line { --x-tail-max: 0.275em; }`），由功能 A 自己的绘制规则用 `min(正常值, var(--x-tail-max, 兜底))` 消费。未定义时 fallback 让 `min()` 退化为正常值。自定义属性不渲染任何东西，谁消费谁生效。

**不要这样做**：不要按元素+伪元素直接 cap 尺寸（上游 gist 的 `.HyperMD-task-line::after { max-height }` 写法）；不要为避让复制整套高特异性选择器链。

**当前使用位置**：`src/01-foundation.css` M12 bullet threading（`--ouroboros-thread-tail-max` / `--ouroboros-thread-elbow-max`）。

---

## P-XXX 模板（新增时复制）

**场景**：  
**解法**：  
**不要这样做**：  
**当前使用位置**：
