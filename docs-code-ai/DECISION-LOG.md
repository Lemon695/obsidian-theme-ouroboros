# 文档导航索引 & 架构决策日志 — Ouroboros Obsidian Theme

## 文档导航

| 文档路径 | 类型 | 作用 | 最后更新 |
|----------|------|------|----------|
| `CLAUDE.md` | 规范 | AI 协作约定 + 主题架构规范 + Checklist | 2026-05-21 |
| `docs-code-ai/Tasks.md` | 任务 | 里程碑任务列表 + 当前冲刺 | 2026-05-21 |
| `docs-code-ai/2026-05——记忆文档.md` | 记忆 | 每轮修改日志 + 架构笔记 | 2026-05-21 |
| `docs-code-ai/BUG-TRACKER.md` | Bug | Bug 注册表 + 详情 | 2026-05-21 |
| `docs-code-ai/DECISION-LOG.md` | 决策 | 本文件，文档导航 + ADR | 2026-06-02 |
| `docs-code-ai/ouroboros-theme-skeleton.md` | 架构 | 骨架架构速查（最重要） | 2026-05-21 |
| `docs-code-ai/PATTERNS.md` | 模式 | 项目级设计模式速查 | 2026-06-02 |
| `docs-code-ai/CONTEXT-HANDOFF.md` | 交接 | 会话中断快照（临时文档） | 2026-05-21 |

---

## 架构决策记录（ADR）

### ADR-001 — 将插件启动模板改写为主题项目文档体系

**背景**：参考模板是 Obsidian 插件项目模板，包含 `PluginModule`、`ModuleManager`、i18n、TypeScript 测试等插件架构。Ouroboros 是 CSS 主题项目。  
**决策**：保留模板的文档体系、启动协议、任务/bug/ADR/模式/handoff 机制；把代码架构改写为主题 5 层架构。  
**理由**：主题项目的真实复杂度在 CSS 令牌、Obsidian DOM、Style Settings、插件兼容和视觉验证，不在 TypeScript 模块生命周期。  
**代替方案**：照搬插件架构 — 未选，因为会制造不存在的 `main.ts`/模块层。  
**结果**：创建 `CLAUDE.md` 与 `docs-code-ai/`，后续工作以 M1-M5 推进。

### ADR-002 — M1 先做可靠性，不直接做新 UI

**背景**：初步分析发现 Style Settings YAML 解析风险、文档命令不一致、preview 缺口等基础问题。  
**决策**：M1 先修可靠性与文档体系；M2 起再做 Design Tokens v2 和 UI 扩展。  
**理由**：设置面板和检查脚本是后续所有 UI 升级的安全网。  
**代替方案**：直接加 Bases/Properties/Callout UI — 未选，因为会把问题堆在不稳定基础上。  
**结果**：M1 已完成并成为后续 M2/M3 的质量门禁基础。

### ADR-003 — 引入 Component Tokens v2

**背景**：Todoist、移动端 FAB、Calendar、Git、Canvas 等区域存在硬编码 `white`、插件色 hex 和重复透明色，影响深浅色与 accent preset 一致性。  
**决策**：在 `src/00-header.css` 增加 surface/shadow/text-on-* 组件 token；第一轮迁移高风险硬编码 UI 色到语义 token。  
**理由**：主题后续 UI 扩展需要稳定可复用的视觉语言，不能每个插件局部自定义。  
**代替方案**：只修当前颜色、不抽 token — 未选，因为会继续产生重复硬编码。  
**结果**：M2 完成第一轮 token 收敛，后续 M5 继续做兼容声明与脆弱选择器审计。


### ADR-004 — Bases 作为核心工作台 UI 纳入 primary 样式层

**背景**：Obsidian Bases 是核心插件/核心视图，包含 table、cards、list、filter、sort、group 等高密度工作台 UI，默认样式容易与 Ouroboros 的暖纸感和低噪音视觉语言脱节。  
**决策**：不为 Bases 建新源码文件；将其作为现代核心工作台 UI 放入 `src/05-plugins-primary.css`，并同步 README 与 `src/08-plugin-compat.css` core metadata。  
**理由**：它虽是 core plugin，但 UI 结构和插件工作台相似，和 Dataview/Canvas 等高频复杂视图共享 surface、shadow、chip、selection token 更利于维护。  
**代替方案**：放入 `src/01-foundation.css` — 未选，因为会让核心基础层混入大量特定 Bases DOM 规则。  
**结果**：M3-1 完成 Bases table/list/card/filter/sort/group chips 覆盖。

### ADR-005 — Properties View 使用 metadata 变量优先覆盖

**背景**：Properties View / File Properties / All Properties 是 Obsidian 现代核心元数据界面，已有稳定的 `--metadata-*` 变量和 `.metadata-*` selector。
**决策**：将 Properties 覆盖保留在 `src/01-foundation.css`；优先覆盖 `--metadata-*` 变量，再用少量 scoped selector 补齐 focus、selected、empty、warning/error、tags/link pill 和 sidebar compact 状态。
**理由**：Properties 属于核心 UI，不应进入插件层；使用变量优先能减少 DOM 变动带来的维护成本。
**代替方案**：复制大量 Obsidian 默认 `.metadata-*` DOM 规则 — 未选，因为后续版本变动时更脆弱。
**结果**：M3-2 完成 Properties View / metadata panel 覆盖。

### ADR-006 — Prompt/Suggestion 作为核心操作入口统一处理

**背景**：Command Palette、Quick Switcher、自动补全、属性建议等都复用 Obsidian 的 `.prompt` 与 `.suggestion-*` 基础结构。
**决策**：在 `src/01-foundation.css` 统一覆盖 prompt frame、input、instructions、selected suggestion、highlight、hotkey、empty state；选中项使用 quiet accent rail/background。
**理由**：核心操作入口出现频率高，统一处理能避免命令面板、快速切换器和自动补全出现互相割裂的视觉状态。
**代替方案**：只针对 Command Palette / Quick Switcher 写窄选择器 — 未选，因为会遗漏共享 suggestion 状态。
**结果**：M3-3 完成 Command Palette / Quick Switcher selected/match/shortcut states 覆盖。

### ADR-007 — Tree/Search 侧栏共享层级样式

**背景**：Bookmarks、Search、Outline、Backlinks、File Explorer 等侧栏大量复用 `.tree-item-*`、`.search-result-*` 和 empty-state 基础结构。
**决策**：在 `src/01-foundation.css` 统一 tree row、flair、nested guide、search result card、match highlight 和 empty state，而不是为每个 pane 写一套重复规则。
**理由**：共享层级样式能保证核心侧栏一致，并减少后续维护时的 selector 分裂。
**代替方案**：为 Bookmarks / Search / Outline 各写独立深选择器 — 未选，因为会重复且容易与 File Explorer / Backlinks 状态冲突。
**结果**：M3-4 完成，M3 现代 Obsidian UI 覆盖闭环。

### ADR-008 — 知识工作流 Callout 保持标准 Markdown 语法

**背景**：M4 需要增强知识管理场景识别度，首先补齐 `decision`、`risk`、`principle`、`insight`、`cycle` 五类高频知识工作流块。

**决策**：这些类型使用 Obsidian 标准 `[!type]` callout 语法，通过 `src/01-foundation.css` 的 `[data-callout]` 选择器提供语义样式；不新增插件依赖、不新增 Style Settings 开关。

**理由**：Callout 是 Markdown 内容体验的一部分，默认可用比配置项更重要；共享一套 workflow 样式组能保证视觉一致并减少后续维护成本。

**代替方案**：为每类 callout 单独提供复杂卡片 UI 或 Style Settings 开关 — 未选，因为会增加设置面板噪音并削弱标准 Markdown 可移植性。

**结果**：M4-1 完成，五类知识工作流 callout 已进入 preview 和任务文档。

### ADR-009 — Canvas 视觉升级以现代容器 selector 为主、旧 selector 兼容

**背景**：Obsidian Canvas 的当前 DOM 已围绕 `.canvas-node-container`、`.canvas-edges`、`.canvas-control-group`、`.canvas-card-menu`、`.canvas-minimap` 等结构组织，旧主题只覆盖了较粗的 `.canvas-node` / `.canvas-edge` 规则。

**决策**：M4-2 以本机 `obsidian.asar` 确认的现代 Canvas selector 为主，升级 node、group、edge、edge label、controls、card menu、color picker、minimap 和 selection 状态；同时保留旧 selector 作为兼容层。

**理由**：Canvas 是核心插件中的复杂工作台，现代 selector 能覆盖真实节点容器和边路径状态；保留旧 selector 可降低不同 Obsidian 版本之间的回归风险。

**代替方案**：只微调旧 `.canvas-node` / `.canvas-edge` — 未选，因为这些选择器已经不足以覆盖现代 Canvas 的节点容器、路径标签、控件组和 minimap 细节。

**结果**：M4-2 完成，Canvas 视觉从基础卡片升级为可测试的知识地图表面。

### ADR-010 — Research reading mode 同时支持全局开关与单篇 note class

**背景**：Research reading mode 面向 source-heavy notes、技术调研、产品拆解和长篇综合笔记，使用者既可能希望全局启用，也可能只在少数研究笔记中启用。

**决策**：使用 `research-reading` 作为 Style Settings class-toggle，同时支持 `cssclasses: [research-reading]` 的 note-level 启用；样式放在 `src/01-foundation.css`，覆盖引用、脚注、引用块、研究表格、标注框、高亮和 Live Preview 行距。

**理由**：研究阅读是 Markdown 内容体验，而不是插件表面；全局开关保证可发现性，note-level class 保证不会把整个 vault 都变成研究模式。

**代替方案**：只提供全局 Style Settings 开关 — 未选，因为研究阅读通常是局部笔记场景；只提供 note class — 未选，因为用户不容易发现功能。

**结果**：M4-3 完成，Research reading mode 有 CSS、设置入口和 preview 样例。

### ADR-011 — Longform reading mode 只处理长文节奏，不重复研究引用逻辑

**背景**：M4-3 已经为 source-heavy notes 提供 Research reading mode，M4-4 需要服务 essays、chapters、serialized drafts 和反思性长文。

**决策**：新增 `longform-reading` 作为 Style Settings class-toggle 和 note-level `cssclasses`，样式只处理长文宽度、行距、章节标题、首段、drop cap、scene break、引语、图片与 callout 间距；不复制 citation/footnote/evidence table 强化。

**理由**：研究阅读和长文阅读的目标不同；前者帮助扫描证据，后者帮助沉浸阅读。如果两者混在一起，会让长文模式变成学术模板而不是章节阅读表面。

**代替方案**：把 Research reading mode 扩展成万能阅读模式 — 未选，因为会让功能语义失焦，也不利于用户按 note 类型选择。

**结果**：M4-4 完成，Longform reading mode 有 CSS、设置入口和 preview 样例。

### ADR-012 — Focus mode 必须可恢复，不能完全隐藏交互入口

**背景**：原 Focus mode 将 ribbon、左右侧栏和 status bar 设为 `opacity: 0` 且 `pointer-events: none`，导致用户缺少发现和恢复路径，尤其对键盘用户不友好。

**决策**：M4-5 将 Focus mode 改为 recoverable dimming：保留低透明度 edge rails，增加固定 hint，允许 ribbon/sidebar/status 通过 hover 和 `:focus-within` 恢复；禁止把这些入口改回不可交互隐藏。

**理由**：Focus mode 的目标是降低噪音，不是让用户失去导航和退出路径。CSS-only 模式必须把恢复机制做在视觉和 pointer/focus 行为里。

**代替方案**：继续完全隐藏 sidebars/ribbon/status — 未选，因为可发现性和可访问性差；新增 JS 快捷键提示 — 未选，因为主题应保持 CSS-only。

**结果**：M4-5 完成，M4 Knowledge Workflow UI 全部闭环。


### ADR-013 — Preview checklist 作为截图与发布前置门禁

**背景**：M1-M4 已积累多个 preview 样例与 UI 模式，但如果没有统一 pass/fail 清单，后续 README 截图、插件兼容声明和发布说明容易超过实际验证范围。

**决策**：M5-1 新增 `preview/CHECKLIST.md`，将 build/check、sync、全部 preview fixture、Style Settings 变体、light/dark、核心 UI、知识工作流、插件 workbench、mobile/accessibility 和 sign-off evidence 统一为发布前手动 QA 门禁。

**理由**：主题视觉质量不能只靠自动 CSS 校验；手动 checklist 能把“看过哪些界面、用什么设置、有什么证据”变成可重复流程，给 M5-2/M5-3/M5-4 提供边界。

**代替方案**：继续依赖 `preview/README.md` 的简短建议流程 — 未选，因为它没有覆盖文件级结果、Style Settings 变体和 release-blocking regression flags。

**结果**：M5-1 完成，M5 后续 README/screenshot 与 release checklist 必须以 `preview/CHECKLIST.md` 的覆盖范围为准。


### ADR-014 — README claims 必须绑定 screenshot 与 preview 证据

**背景**：M1-M4 新增了多个现代核心 UI、阅读模式和知识工作流表面，但 README 若只罗列功能，容易和截图、preview fixture、插件兼容范围产生漂移。

**决策**：M5-2 将 README/README_CN 的截图统一指向根目录 `screenshot.png`，保留 `_resources/img/image-comparison-v1.png` 作为高清源图；同时新增 Preview QA 区块和 checklist 截图同步项，要求对外功能声明能映射到 preview fixture 或明确为保守兼容说明。

**理由**：Obsidian 主题的发布页、社区主题列表和 README 是用户第一入口，必须和真实截图资产、可复现预览样例、已验证范围保持一致。

**代替方案**：继续让 README 使用高清资源图、根 `screenshot.png` 只供社区主题列表使用 — 未选，因为会形成两套不同入口，后续容易忘记同步。

**结果**：M5-2 完成，截图、README 和 preview QA 门禁形成同一发布叙事。


### ADR-015 — Release checklist 分离视觉 QA 与发布操作

**背景**：M5-1 已建立 preview visual QA，M5-2 已同步 README 与 screenshot，但正式发布还需要版本同步、tag、GitHub Release、community theme metadata、发布后 smoke 和 rollback/hotfix 决策。

**决策**：新增 `docs-code-ai/RELEASE-CHECKLIST.md` 作为正式发布门禁；`preview/CHECKLIST.md` 继续负责视觉 QA，release checklist 负责版本、制品、tag、发布与发布后验证，并把 M5-4/M5-5 作为公开发布前阻断项。

**理由**：视觉验证和发布操作是两个不同风险面。拆开后可以让设计/视觉 QA 先完成，再由 release owner 用同一证据进入版本和发布流程。

**代替方案**：把所有 release 项塞进 `preview/CHECKLIST.md` — 未选，因为会让视觉 QA 文件过大，并混淆“看过界面”和“已经发布”的状态。

**结果**：M5-3 完成，发布流程具备可重复门禁和 post-release smoke 路径。

### ADR-016 — 插件兼容声明必须分级并可审计

**背景**：README、preview、`src/08-plugin-compat.css` 和实际 CSS selector 之间容易漂移；部分插件已有官方 id 和 preview 覆盖，部分只存在 selector-level 样式，还有 DB Folder 这类 legacy selector 无法在当前官方目录中确认 id。

**决策**：M5-4 新增 `docs-code-ai/PLUGIN-COMPATIBILITY-AUDIT.md` 作为插件声明源头；所有公开支持项按 Tier A preview-covered、Tier B selector-level、Tier C companion、Legacy selector-only 分级。`src/08-plugin-compat.css` 只保留已审计官方 id 或明确 companion id，并由 `check-theme.mjs` 校验 required ids、audit 覆盖和 fragile selector registry。

**理由**：主题发布时最容易过度承诺插件兼容。分级审计能让 README claims、Obsidian Hub metadata、preview QA 和风险说明保持同一事实来源。

**代替方案**：继续在 README 和 `@plugins` 中维护一个宽泛插件列表 — 未选，因为它无法区分 preview-covered、selector-level 与 legacy selector 风险，也无法自动阻断过度 claim。

**结果**：M5-4 完成，插件兼容声明进入 release gate；M5-5 将把审计中的限制转为公开 known limitations / unsupported plugin list。

### ADR-017 — 已知限制必须有 release-note 来源文件

**背景**：M5-4 已把插件支持声明分级，但 release notes、README 和 issue triage 仍需要一个直接面向用户的限制清单，否则 selector-level 与 legacy 风险容易在发布时被遗漏。

**决策**：新增 `docs-code-ai/KNOWN-LIMITATIONS.md`，把 mobile FAB fragile selector、DB Folder legacy selector-only、Tier B selector-level 插件、版本敏感核心表面、unsupported / not claimed 插件统一记录；`check-theme.mjs` 校验该文件、README 链接和 audit 回链。

**理由**：兼容审计回答“我们为什么这么声明”，known limitations 回答“用户发布前应该知道什么”。两者分离能让维护文档和发布文案都可复用。

**代替方案**：只把限制留在 `PLUGIN-COMPATIBILITY-AUDIT.md` — 未选，因为 audit 面向维护者，release notes 需要更短、更直接的用户口径。

**结果**：M5-5 完成，M5 发布质量闭环；下一步进入 release candidate 手动 QA / release checklist。

### ADR-018 — 竞品吸收只吸收「能力」，不复制「越界审美/交互」

**背景**：M9–M10 从 Minimal、AnuPpuccin、Shimmering Focus、Border、Things、Catppuccin/Blue Topaz、California/Prism 七个竞品吸收差异化能力。竞品各有强项，但也各有与 Ouroboros「暖纸克制、内容优先、低噪音」身份冲突的部分（高饱和糖果色、整页 dashboard 化、彩虹文件夹、需要 JS 的 scroll-lock/日期计算）。

**决策**：M11 把每个吸收点正式约束为「吸收能力，不复制越界做法」，并在 M11-1 的吸收对照表中为每条记录显式的「吸收边界」。具体边界：Catppuccin/Blue Topaz 吸收"多调色板切换"但 accent preset 保持低饱和暖纸（不抄糖果色）；California/Prism 吸收"色温档"但只微调纸面、墨色不变；Things 吸收"优先级暖色工作台"但不算日期临近；Shimmering Focus 吸收"打字机聚焦"但不假装 CSS 能 scroll-lock；Border 吸收"分层质感"但用 border+shadow 不改盒模型、侧栏保持扁平；AnuPpuccin 吸收"语言标签/层级"但文件夹保持克制（无彩虹文件夹）；Minimal 吸收"宽度/字体可配"但字体档不波及 UI chrome。

**理由**：差异化的价值在于"我也能做到 X"，而不是"我变成了竞品 Y"。如果连同竞品的高饱和或 dashboard 化一起搬进来，会稀释主题身份，让所有"吸收"互相打架。把边界写进 ADR + 对照表，后续扩展时有明确的拒绝依据。

**代替方案**：直接照搬竞品视觉/交互以求"功能对等" — 未选，因为会让暖纸克制身份崩塌，且多个竞品的审美互不兼容。

**结果**：M11-1 完成，吸收对照表 7/7 全部勾选并附四类证据（交付任务 + preview fixture + check-theme `validate*` 门禁 + README EN/CN 说明）+ 吸收边界；M11-2 将边界固化为 ADR 与 PATTERNS。

### ADR-019 — DOM 诚实：CSS-only 主题不伪造运行时状态

**背景**：M9–M10 多个差异化功能触及"需要运行时状态"的边界：嵌套标签逐段着色（M9-4，Obsidian 把整条路径渲染为单节点）、Graph 节点 per-node 着色（M9-5，canvas 渲染）、面包屑当前路径（N3，core 无原生状态栏面包屑）、任务日期临近度（N5，Tasks 插件不输出 date-relative class）、typewriter scroll-lock（N7，需 JS 滚动）。

**决策**：确立"DOM 诚实"为差异化功能的硬约束——CSS-only 主题只对 DOM 中真实、稳定存在的 hook 着色，绝不伪造运行时计算的状态。做不到的部分（日期数学、滚动锁定、per-segment span）改为交付可达成的近似（优先级 ramp 替代日期临近、聚焦淡化+居中留白替代 scroll-lock），并在 preview fixture 中显式标注边界与"需要 JS 插件"的说明。

**理由**：CSS 没有运行时状态、不能计算日期、不能监听滚动。承诺这些会产生看似工作实则失效的样式（B4 教训：JS-less 主题无法做运行时单选互斥）。诚实标注边界比悄悄交付半成品更利于用户预期管理和后续维护。

**代替方案**：用静态 CSS 假装实现运行时功能（如伪造 overdue class、假 scroll-lock）— 未选，因为会在真实 vault 中静默失效，且无法回归验证。

**结果**：M9-4/M9-5/N3/N5/N7 均按此约束交付，每个相关 preview fixture 都含 DOM-honesty 说明；该约束写入 PATTERNS P-019 供后续复用。

### ADR-020 — Bullet threading 以「单色 accent + 6 级 + 编辑器限定」吸收，默认开启

**日期**：2026-06-10 | **里程碑**：M12

**背景**：用户要求把 Logseq 式 bullet threading（祖先 bullet 到当前行的圆角连线）纳入主题。社区成熟实现（itsonlyjames gist）支持 12 级缩进、按层级用 h1–h6 六色、含阅读视图 hover 模拟。

**决策**：
1. 只吸收「活动路径线程」能力：祖先 tail + 途径竖线 + 圆角 elbow + 路径 bullet 着色；
2. 线色统一为 accent 派生 token（`--ouroboros-thread-color`），不复制按层级多色（与暖纸低噪声方向冲突，ADR-018）；
3. 深度封顶 6 级（覆盖真实大纲的绝大多数场景，CSS 体积减半）；
4. 编辑器（Live Preview + 源码）限定，阅读视图不做 hover 模拟（无光标即无"当前项"，ADR-019 DOM 诚实；hover≠光标语义）；
5. 默认开启（用户主诉求，且线程只在光标附近出现、噪声低），Style Settings 可关。

**后果**：tab size 非默认值时偏移漂移（以 `--ouroboros-thread-indent` token 暴露调节口）；与 `active-line` 在列表行共用 `::before`，线程优先（登记 KNOWN-LIMITATIONS）。

