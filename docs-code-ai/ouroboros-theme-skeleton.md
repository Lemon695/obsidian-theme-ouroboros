# Ouroboros Obsidian Theme 骨架架构

> 版本：v16 | 最后更新：2026-06-10 | 对应里程碑：M12
> ⚠️ 若当前代码里程碑与此文档相差 > 1 个版本，此文档可能已过时。

---

## ① 项目是什么（用户视角）

我在 Obsidian 中启用 Ouroboros 主题后，获得一个温暖、克制、适合长时间阅读和知识管理的界面。
我可以通过 Style Settings 调整 accent、界面密度、标题、链接、CJK 排版、focus mode、reduce motion、bullet threading（大纲连线）、clean embeds（无缝嵌入）等。
当我使用 Bases、Dataview、Tasks、Canvas、Calendar、Kanban、Git 等核心视图/插件时，它们应与主题的暖纸感、圆角、边框、字体节奏保持一致。

核心价值：**让 Obsidian 在长时间写作、阅读、任务管理和知识工作流中保持低噪音、高秩序、可持续审美。**

---

## ② 整体架构分层

```text
Layer 0  发布/构建层
  package.json / manifest.json / versions.json
  build-theme.mjs / check-theme.mjs
  - 构建 theme.css
  - 校验版本一致性和产物同步

Layer 1  设计令牌层
  src/00-header.css
  - 主题头部
  - 基础色、语义色、字体、间距、圆角、默认 Style Settings 变量

Layer 2  核心 Obsidian UI 层
  src/01-foundation.css
  - light/dark 变量映射
  - heading / paragraph / list / table / tag / link
  - sidebar / tab / menu / modal / input / status bar
  - callout / properties / graph / embed / focus mode

Layer 3  内容与交互表面层
  src/02-code.css
  src/03-mobile.css
  src/04-tasks-and-progress.css
  src/09-animations.css
  - code / syntax / diff
  - mobile floating action button
  - checkbox states / progress
  - keyframes / reduce motion

Layer 4  插件兼容与用户配置层
  src/05-plugins-primary.css
  src/06-plugins-secondary.css
  src/07-style-settings.css
  src/08-plugin-compat.css
  - primary/secondary plugin support
  - Style Settings @settings
  - Obsidian Hub compatibility metadata
  - plugin compatibility audit and fragile selector registry
  - known limitations / unsupported plugin claims
```

---

## ③ 主要 UI 组件 ASCII 交互图

### 主题阅读卡片/浮层

```text
默认状态                         Hover / Active
┌──────────────────────┐          ┌──────────────────────┐
│ title                │          │ title                │
│ muted metadata       │          │ accent edge / glow   │
│ content              │          │ content              │
└──────────────────────┘          └──────────────────────┘
暖纸背景 + thin border             accent 只用于状态，不大面积铺色
```

### Callout

```text
普通 callout                       知识工作流 callout
┌│─────────────────────┐          ┌│─────────────────────┐
││ icon title          │          ││ decision / risk     │
││ content             │          ││ content             │
└│─────────────────────┘          └│─────────────────────┘
inset left bar                     workflow color + soft surface
```


### Bookmarks / Search / Outline

```text
Sidebar tree                       Search result card
┌ folder/bookmark       3 ┐        ┌ file title           │
│  nested child          │        │ matched text highlight│
│  active item           │        │ path / destination    │
└ subtle indent guide ───┘        └ warm card + calm hover┘
```

### Command Palette / Quick Switcher

```text
Prompt frame                      Selected suggestion
┌────────────────────────┐        ┌│ command title      ⌘P │
│ Search command/file... │        ││ highlighted match     │
├────────────────────────┤        └│ note/path             │
│ suggestion list        │        accent rail + quiet fill
└────────────────────────┘
```

### Properties / Metadata

```text
Note metadata panel              File / All Properties side view
┌──────────────────────┐        ┌────────────────────┐
│ Properties           │        │ key        value    │
│ key       value pill │        │ tag        #pill    │
│ date      2026-05-21 │        │ warning    !        │
└──────────────────────┘        └────────────────────┘
metadata variables first          compact core UI, not plugin chrome
```

### Bases 工作台

```text
Table / Filter / Sort             Cards / List
┌ filter chip ─ sort chip ┐       ┌────────────┐ ┌────────────┐
│ property │ value        │       │ cover      │ │ title      │
├──────────┬──────────────┤       │ title      │ │ metadata   │
│ row      │ selected ring│       └────────────┘ └────────────┘
└──────────┴──────────────┘       raised surface + quiet hover
core view, but maintained like a high-frequency plugin surface
```

### Canvas node

```text
默认节点 / group / edge            选中 / focused
┌──────────────────────┐          ┌──────────────────────┐
│ note/media card      │─────────▶│ accent ring + label  │
└──────────────────────┘          └──────────────────────┘
  dashed group frame                  minimap / controls = floating panels
modern .canvas-node-container         .canvas-edges path + labels
```

### Research reading

```text
source-heavy note                  references card
┌──────────────────────┐          ┌──────────────────────┐
│ claim + citation¹    │          │ REFERENCES           │
│ quoted evidence      │          │ 1. source note       │
│ evidence table       │          │ 2. comparison        │
└──────────────────────┘          └──────────────────────┘
global body.research-reading        note cssclasses: research-reading
```

### Longform reading

```text
chapter draft                      scene break
┌──────────────────────┐          ─────── ✦ ───────
│ Chapter title        │
│ lead paragraph       │          paragraph cadence
│ sustained prose      │          editorial quote
└──────────────────────┘
global body.longform-reading        note cssclasses: longform-reading
```

### Recoverable Focus mode

```text
dimmed chrome                      hover / keyboard focus
│ faint left rail │ note │ rail │   │ sidebar readable │ note │
        focus hint                         pointer + focus recovery
body.focus-mode keeps pointer-events:auto, never strands the user
```

---

## ④ 复杂逻辑的决策流程图

### 新增 UI 样式时

```text
用户提出 UI/功能需求
    │
    ▼
是否是核心 Obsidian UI？ ── 简单基础面 ──> src/01-foundation.css
    │             复杂工作台/Bases ──> src/05-plugins-primary.css
    │ 否
    ▼
是否是代码/移动/任务/动效？ ── 是 ──> src/02/03/04/09
    │ 否
    ▼
是否是插件？ ── 高频 ──> src/05-plugins-primary.css
    │             小众/冲突 ──> src/06-plugins-secondary.css
    ▼
是否需要用户开关？ ── 是 ──> src/07-style-settings.css + body class
    │
    ▼
npm run build && npm run check
```

### 新增颜色时

```text
需要新颜色
    │
    ▼
是否已有语义色可表达？ ── 是 ──> 使用 --color-*
    │ 否
    ▼
是否是长期复用 token？ ── 是 ──> src/00-header.css 新增变量
    │ 否
    ▼
是否只是局部透明混合？ ── 是 ──> color-mix()/rgba(var(--color-*-rgb), x)
```

---

## ⑤ UI 状态表

| 状态名 | 触发条件 | 显示内容/行为 |
|--------|----------|---------------|
| default | 普通显示 | 暖纸背景、低对比边框、内容优先 |
| hover | 鼠标悬停 | `background-modifier-hover`，少量位移或亮度变化 |
| active/selected | 当前项、选中项 | accent 边框/背景/细环，不大面积高饱和 |
| focus-visible | 键盘焦点 | 2px accent outline，保证可访问性 |
| disabled/faint | 弱化信息 | `text-faint` / `ui3` |
| dark | `body.theme-dark` | 暖黑灰，不使用纯黑作为默认背景 |
| compact | `body.compact-ui` | 减小 input height、圆角和列表 padding |
| airy | `body.airy-reading` | 增加 line width 与 line height |
| research | `body.research-reading` 或 note `cssclasses: [research-reading]` | 强化引用、脚注、标注、证据表格和研究阅读行距 |
| longform | `body.longform-reading` 或 note `cssclasses: [longform-reading]` | 强化章节、段落节奏、首段、场景分隔和沉浸阅读 |
| focus mode | `body.focus-mode` | 降低 chrome 噪音，同时保留 hint、edge rails、hover/focus recovery |
| reduce motion | `prefers-reduced-motion` 或 `body.reduce-motion` | 动画时长近零，禁止循环动效 |

---

## ⑥ 核心算法说明

本项目目前没有 TypeScript 算法层。核心“算法”是构建和校验脚本：

```text
buildThemeOutput(): string
输入：src/*.css 文件，按文件名排序
输出：拼接后的 theme.css 内容
约束：不要手改 theme.css；构建输出必须可复现
纯函数：基本是（读取文件由外层完成）
```

```text
check-theme.mjs
输入：package.json / manifest.json / versions.json / theme.css / src/00-header.css
输出：失败列表或 Theme checks passed
约束：应逐步扩展为主题质量门禁
```

---

## ⑦ 关键文件速查表

| 文件路径 | 职责 | 什么时候改 |
|----------|------|-----------|
| `src/00-header.css` | 全局 token | 新增变量或 accent 时 |
| `src/01-foundation.css` | 核心 UI | 基础界面/阅读体验变化时 |
| `src/02-code.css` | 代码块 | code/syntax/diff 变化时 |
| `src/03-mobile.css` | 移动端 | mobile FAB/响应式变化时 |
| `src/04-tasks-and-progress.css` | 任务与进度 | checkbox/progress 变化时 |
| `src/05-plugins-primary.css` | 高频插件 | Dataview/Tasks/Canvas 等变化时 |
| `src/06-plugins-secondary.css` | 次级插件 | Kanban/Git/Timeline 等变化时 |
| `src/07-style-settings.css` | Style Settings | 新增用户配置时 |
| `src/08-plugin-compat.css` | 插件兼容声明 | 新增插件支持时 |
| `src/09-animations.css` | 动效 | 新增/修改动画时 |

---

## ⑧ 样式命名速查

```text
主题不强制 BEM，但新增自定义主题组件建议使用：
.ouroboros-<component>
.ouroboros-<component>__<element>
.ouroboros-<component>--<state>

Style Settings body class：
body.<feature-name>
body.no-<plugin>-styles
body.accent-<name>
```

示例：

```css
body.ouroboros-dashboard-mode .markdown-rendered table { ... }
.ouroboros-callout-cycle { ... }
```

---

## ⑨ 核心数据流

```text
开发者修改 src/*.css
    │
    ▼
npm run build
    │
    ▼
build-theme.mjs 按文件名排序拼接
    │
    ▼
theme.css
    │
    ▼
npm run check
    │
    ├── version/header/versions 校验
    ├── theme.css 是否过期
    └── 后续扩展：Style Settings / hardcoded color / docs sync 校验
```


---

## ⑩ Component Tokens v2

M2 新增组件 token，作为插件和浮层 UI 的第一轮收敛层：

```css
--surface-raised
--surface-overlay
--surface-sunken
--shadow-soft
--shadow-popover
--shadow-floating
--text-on-accent
--text-on-danger
--text-on-success
```

使用规则：

- accent 背景上的文字使用 `--text-on-accent`，不要写 `white`。
- 插件优先级/状态色使用 `--color-red` / `--color-orange` / `--color-blue` / `--color-purple` 等语义色。
- 插件状态背景使用 `rgba(var(--color-*-rgb), alpha)`。
- 阴影先复用 shadow token，再考虑局部微调。

---

## ⑪ M3-1 Bases 覆盖范围

Bases 样式位于 `src/05-plugins-primary.css` 的 `/* Bases */` 区块，覆盖：

- `.workspace-leaf-content[data-type='bases']` core view 容器；
- `.bases-embed` / `.block-language-base` 嵌入块；
- `.bases-header` / `.bases-toolbar` / `.bases-toolbar-menu`；
- `.bases-query-container` filter group / expression；
- `.base-toolbar-sort-item` / `.base-toolbar-groupby-item` sort/group chip；
- `.bases-table-container` / `.bases-thead` / `.bases-tbody` / selection/focus；
- `.bases-view[data-view-type='cards']` cards；
- `.bases-view[data-view-type='list']` list。

维护规则：更新前先确认本机 Obsidian app 资源或 live DOM 中仍存在这些 selector；若类名变化，优先修源码区块和 `preview/plugin-showcase.md`，再构建 `theme.css`。

---

## ⑫ M3-2 Properties 覆盖范围

Properties 样式位于 `src/01-foundation.css` 的 Note metadata / Properties 区块，覆盖：

- `.metadata-container` 基础变量与暖纸面板；
- `.workspace-leaf-content[data-type='properties']` / `all-properties` / `file-properties` 侧栏视图；
- `.metadata-properties-heading` 标题与折叠入口；
- `.metadata-property` hover / focus / selected；
- `.metadata-property-key` 与 `.metadata-property-value` 的低噪音阅读层级；
- tag/link pills、invalid pill、warning/error 状态；
- mobile / workspace drawer compact properties。

维护规则：优先调整 `--metadata-*` 变量；只有变量无法表达时才增加 scoped selector。不要把 Properties 迁移到插件层。

---

## ⑬ M3-3 Prompt / Suggestion 覆盖范围

Command Palette / Quick Switcher 样式位于 `src/01-foundation.css` 的 prompt/suggestion 区块，覆盖：

- `.prompt` frame、border、shadow；
- `input.prompt-input` 与 `.prompt-input-container`；
- `.prompt-results` / `.prompt-instructions` / `.prompt-instruction-command`；
- `.suggestion-item` hover / selected / mobile-tap；
- `.suggestion-highlight` 与 autocomplete matched text；
- `.suggestion-hotkey` keyboard pill；
- `.suggestion-empty` / `.suggestion-empty-suggestion`；
- `.suggestion-icon` / `.suggestion-flair` / `.suggestion-aux` selected states。

维护规则：`.suggestion-*` 是共享基础 selector，修改后必须至少检查 Command Palette、Quick Switcher、属性建议和编辑器 autocomplete。
---

## ⑭ M3-4 Tree / Search 覆盖范围

Bookmarks / Search / Outline 样式位于 `src/01-foundation.css` 的 Sidebar navigation / Search / Outline 区块，覆盖：

- `.workspace-leaf-content[data-type='bookmarks']` / `search` / `outline` view content；
- `.tree-item-self` / `.tree-item-children` / `.tree-item-inner` / `.tree-item-flair`；
- `.nav-file-tag` 与 `.view-action.mod-bookmarked`；
- `.search-input-container` / `.search-result` / `.search-result-file-title`；
- `.search-result-file-matches` / `.search-result-file-match` / `.search-result-file-matched-text`；
- `.search-empty-state` / `.empty-state-container` / `.empty-state-action`。

维护规则：tree/search 是共享侧栏基础；修改后要检查 Bookmarks、Search、Outline、File Explorer、Backlinks、Outgoing Links。

---

## ⑮ M4-1 Knowledge Workflow Callout 覆盖范围

知识工作流 callout 样式位于 `src/01-foundation.css` 的 `Custom Callout Types` 区块，覆盖：

- `.callout[data-callout='decision']`：决策记录，purple；
- `.callout[data-callout='risk']`：风险/不确定性，orange；
- `.callout[data-callout='principle']`：原则/规则，blue；
- `.callout[data-callout='insight']`：洞察/摘录后的结论，yellow；
- `.callout[data-callout='cycle']`：迭代循环/复盘闭环，green；
- 五类 workflow callout 的共享 background、border、left rail、title、icon、content 层级。

维护规则：保持 Obsidian 标准 `[!type]` 语法，不引入插件依赖；新增同类 workflow callout 时复用 `--ouroboros-workflow-callout-rgb` 与共享选择器组，并同步 `preview/core-showcase.md`。

---

## ⑯ M4-2 Canvas 覆盖范围

Canvas 样式位于 `src/05-plugins-primary.css` 的 `Canvas View` 区块，覆盖：

- `.workspace-leaf-content[data-type='canvas'] .view-content` 与 `.canvas-wrapper` 的 Canvas 变量、暖纸点阵和背景；
- `.canvas-background circle` 的现代 SVG dot pattern；
- `.canvas-node-container` node card、hover、selected/focused、dragging、themed node；
- `.canvas-node-label`、`.canvas-node-placeholder`、`.canvas-icon-placeholder`、`.canvas-node-content.*`；
- `.canvas-node-group`、`.canvas-node-group .canvas-node-content`、`.canvas-group-label` 的分组边界和标签；
- `.canvas-edges path.canvas-display-path`、`.canvas-edges polygon.canvas-path-end`、`.canvas-path-label` 的边线、箭头和边标签；
- `.canvas-control-group`、`.canvas-card-menu`、`.canvas-menu`、`.canvas-submenu`、`.canvas-color-picker-item`；
- `.canvas-minimap`、`.canvas-minimap rect/path`、`.canvas-minimap-viewport`；
- `.canvas-edge`、`.canvas-node.canvas-node-group` 等旧版兼容 selector。

维护规则：更新前先从本机 Obsidian app 资源或 live DOM 确认 Canvas selector；视觉上保持“安静知识地图”，accent 只用于选中、焦点、连接点、active control，不大面积铺色。手动 QA 使用 `preview/canvas-workflow.canvas`。

---

## ⑰ M4-3 Research Reading Mode 覆盖范围

Research reading mode 样式位于 `src/01-foundation.css`，入口位于 `src/07-style-settings.css` 的 `research-reading` class-toggle，同时支持单篇 note：

```yaml
cssclasses:
  - research-reading
```

覆盖范围：

- `body.research-reading` / `.markdown-preview-view.research-reading` / `.markdown-source-view.mod-cm6.research-reading` 的阅读宽度、行距和研究色变量；
- `h2` / `h3` 的研究笔记章节层级；
- blockquote / Live Preview quote line 的证据引用样式；
- `mark` / `cm-highlight` 的低噪音 marker 高亮；
- external link / internal link 的 citation/navigation 区分；
- footnote chip 与 `.footnotes` / `section.footnotes` references card；
- research table header 与 annotation/synopsis callout 的研究阅读强化。

维护规则：M4-3 服务 source-heavy notes，不要和 M4-4 Longform reading mode 混同；新增阅读模式时复用 P-009，同时提供全局 Style Settings 开关与 note-level `cssclasses` 样例。

---

## ⑱ M4-4 Longform Reading Mode 覆盖范围

Longform reading mode 样式位于 `src/01-foundation.css`，入口位于 `src/07-style-settings.css` 的 `longform-reading` class-toggle，同时支持单篇 note：

```yaml
cssclasses:
  - longform-reading
```

覆盖范围：

- `body.longform-reading` / `.markdown-preview-view.longform-reading` / `.markdown-source-view.mod-cm6.longform-reading` 的长文宽度、行距和暖色变量；
- H1 / H2 chapter heading 居中与章节停顿；
- H3 interlude / scene label；
- lead paragraph 与首字 drop cap；
- editorial blockquote 与 Live Preview quote line；
- `hr` scene break ornament；
- 列表、图片、callout 的长文间距。

维护规则：Longform 服务 essays / chapters / drafts；不要复制 M4-3 的 citation、footnote、references card 或 evidence table 逻辑。手动 QA 使用 `preview/longform-reading-showcase.md`。

---

## ⑲ M4-5 Focus Mode Recovery 覆盖范围

Focus mode 样式位于 `src/01-foundation.css` 的 `Focus Mode` 区块，入口位于 `src/07-style-settings.css` 的 `focus-mode` class-toggle。

覆盖范围：

- `body.focus-mode` 的 recovery rail 变量与左右 inset rail；
- `body.focus-mode::after` 的固定 hint；
- `.workspace-ribbon` faint rail 与 hover/focus recovery；
- `.workspace-split.mod-left-split` / `.workspace-split.mod-right-split` 的低透明度 side rails；
- `.status-bar` faint rail；
- `:hover` 与 `:focus-within` 恢复状态；
- Style Settings 描述与 `preview/focus-mode-showcase.md`。

维护规则：Focus mode 只能降低噪音，不能切断恢复路径。不要对 ribbon/sidebar/status 使用 `pointer-events: none` 的完全隐藏；任何更强隐藏都必须先提供替代 recovery affordance。

---

## ⑳ M5-1 Preview QA Checklist 覆盖范围

`preview/CHECKLIST.md` 是 M5 视觉回归与发布质量的手动门禁，覆盖：

- preflight：`npm run build`、`npm run check`、`npm run sync:vault -- /path/to/test-vault --preview`；
- preview fixtures：`core-showcase.md`、`tasks-showcase.md`、`plugin-showcase.md`、`canvas-workflow.canvas`、`research-reading-showcase.md`、`longform-reading-showcase.md`、`focus-mode-showcase.md`；
- light/dark 全局视觉 pass；
- Style Settings 变体：accent、compact、airy、CJK、fancy code/highlight、research、longform、focus、reduce motion；
- 核心 UI：File Explorer、Bookmarks、Search、Outline、Command Palette、Quick Switcher、Properties、menus/modals/inputs/status；
- 知识工作流：workflow callout、Canvas、Research reading、Longform reading、Focus recovery；
- 插件/workbench：Bases、Dataview、Tasks、Kanban、Calendar、Git、Canvas；
- mobile/accessibility 与 release-blocking regression flags；
- sign-off evidence：截图、console errors、known issues、release owner result。

维护规则：M5-2 README/screenshot、M5-3 release checklist、M5-4 plugin compatibility 和 M5-5 known limitations 都应以该 checklist 的实际验证范围为边界；不要让对外说明超过 checklist 已覆盖内容。

---

## ㉑ M5-2 README / Screenshot 同步范围

README/README_CN 是对外发布入口，当前同步规则：

- 两份 README 均引用根目录 `screenshot.png`，并使用描述性 alt text；
- `screenshot.png` 是 512×288 社区主题/README 预览图；
- `_resources/img/image-comparison-v1.png` 是高清源图，换图时应由源图重新生成根截图；
- README 的 Highlights / Plugin and core view support / Preview QA 必须反映 M1-M5 实际完成范围；
- 开发说明只使用相对路径，例如 `./src/` 与 `./preview/CHECKLIST.md`，不要写入本机绝对路径；
- `preview/CHECKLIST.md` 的 README / screenshot sync pass 是后续换图或改 README claims 的检查入口。

维护规则：对外 claims 必须映射到 preview fixture 或以保守兼容说明呈现；插件支持声明必须回链 `docs-code-ai/PLUGIN-COMPATIBILITY-AUDIT.md`，不要把 selector-level 或 legacy selector 写成完整 preview 支持。

---

## ㉒ M5-3 Release Checklist 覆盖范围

`docs-code-ai/RELEASE-CHECKLIST.md` 是正式发布操作门禁，覆盖：

- release candidate header 与 release notes draft；
- release-blocking policy：自动检查失败、版本不同步、截图漂移、README claims 超范围、未跑 preview QA、插件兼容/已知限制未完成等；
- 官方参考 snapshot：Obsidian sample theme 的 `theme.css` / `manifest.json` / screenshot / GitHub Release / `versions.json` 要求；
- scope freeze 与 repo hygiene；
- version bump gate：`npm run version` 同步 package、manifest、versions、header、theme；
- automated build/static validation；
- manual preview QA gate，调用 `preview/CHECKLIST.md`；
- release artifact checklist；
- Git tag / GitHub Release gate，匹配 `.github/workflows/release-version.yml` 上传 `manifest.json` 和 `theme.css`；
- community theme directory gate；
- post-release smoke check；
- rollback / hotfix plan 与 final sign-off。

维护规则：`preview/CHECKLIST.md` 是视觉证据，`RELEASE-CHECKLIST.md` 是发布操作证据；不要在普通功能里程碑中改版本号，除非正在执行 release checklist 的 version bump gate。

---

## ㉓ M5-4 Plugin Compatibility Audit 覆盖范围

`docs-code-ai/PLUGIN-COMPATIBILITY-AUDIT.md` 是插件支持声明的事实来源，覆盖：

- Tier A preview-covered：Bases、Properties、Command Palette / Quick Switcher、Bookmarks / Search / Outline / File Explorer、Canvas、Dataview、Calendar、Full Calendar、Tasks、Kanban、Obsidian Git；
- Tier B selector-level：Todoist Sync、Excalidraw、Hover Editor、Banners、Checklist、Outliner、Timeline；
- Tier C companion：Style Settings；
- Legacy selector-only：DB Folder，仅保留 `.db-table-view` selector，不进入 `src/08-plugin-compat.css` 的 `@plugins` metadata；
- fragile selector registry：`.view-action:nth-last-of-type(2)`、`.bases-*`、`.canvas-*`、`.metadata-*`、`.prompt/.suggestion-*`、`.fc-*`、`.db-table-view`；
- README/README_CN 的 public support wording 规则。

`check-theme.mjs` 已把插件兼容纳入静态检查：校验 required core/community ids、audit 文档中的 id 覆盖、禁止 legacy DB Folder id 进入 metadata，并要求 fragile selector registry 保持存在。

维护规则：新增插件 claim 时必须先更新 audit row，再同步 `src/08-plugin-compat.css`、README/README_CN、preview/checklist 和 `check-theme.mjs`；不要把 selector-level 或 legacy selector 写成 full preview support。M5-5 已将本审计中的限制转成 `docs-code-ai/KNOWN-LIMITATIONS.md`；后续删除限制必须有 live QA 和稳定 selector/id 证据。

---

## ㉔ M5-5 Known Limitations 覆盖范围

`docs-code-ai/KNOWN-LIMITATIONS.md` 是 release-facing 限制清单，覆盖：

- release notes 可复制的 known limitations block；
- support status definitions：preview-covered、selector-level、legacy selector-only、unsupported / not claimed；
- mobile FAB fragile selector：`.view-action:nth-last-of-type(2)`；
- DB Folder legacy selector-only：`.db-table-view`，不进入 `@plugins` metadata；
- Tier B selector-level 插件：Todoist Sync、Excalidraw、Hover Editor、Banners、Checklist、Outliner、Timeline；
- 版本敏感表面：Bases、Canvas、Properties、prompt/suggestions、Full Calendar；
- unsupported / not claimed plugin list：旧 metadata 中移除的插件 id 与所有未进入 audit 的插件；
- issue-report checklist：Obsidian 版本、插件 id/version、设备、Style Settings、截图、最小复现、默认主题对比。

`check-theme.mjs` 会校验 known limitations 文档、README/README_CN 链接、audit 回链和关键限制项。

维护规则：新增或删除 public limitation 时同步 `KNOWN-LIMITATIONS.md`、`PLUGIN-COMPATIBILITY-AUDIT.md`、README/README_CN、preview/release checklist 和 `check-theme.mjs`；release notes 必须复制或改写 known limitations 第 1 节。
