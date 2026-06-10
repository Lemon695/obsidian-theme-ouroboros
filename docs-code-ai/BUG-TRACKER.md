# Bug 追踪文档 — Ouroboros Obsidian Theme

## 严重级别判断标准

| 级别 | 标准 |
|------|------|
| Critical | 主题无法加载 / `theme.css` 构建错误 / Style Settings 整体不可用 |
| High | 核心 UI 或阅读体验明显损坏，无简单绕过方法 |
| Medium | 插件或局部 UI 异常，有绕过方法，或视觉错误影响使用 |
| Low | 轻微视觉瑕疵、文案问题、边缘 case |

---

## Bug 注册表

| 编号 | 标题 | 级别 | 发现时间 | 状态 |
|------|------|------|----------|------|
| BUG-001 | Style Settings `@settings` 块含 tab，YAML 可能解析失败 | High | 2026-05-21 | 已修复 |
| BUG-002 | 文档提到 `npm run sync:vault`，但 package scripts 当前未声明 | Medium | 2026-05-21 | 已修复 |
| BUG-003 | fancy-code 代码块边框从未渲染（`border: <颜色token>` 缺 style） | Medium | 2026-06-10 | 已修复 |
| BUG-004 | `data-task='<'` 重复声明 `-webkit-mask-image`，首条时钟图标为死代码 | Low | 2026-06-10 | 已修复 |
| BUG-005 | `--max-width: 88%` 为全库无引用的死变量 | Low | 2026-06-10 | 已修复 |
| BUG-006 | callout 折叠 max-height 过渡为死代码，且 `overflow:hidden` 有裁剪悬浮层风险 | Low | 2026-06-10 | 已修复 |
| BUG-007 | 子弹线程被原生「突出显示当前行」背景遮挡（负 z-index 沉底） | Medium | 2026-06-10 | 已修复 |

---

## Bug 详情

### BUG-001 Style Settings `@settings` 块含 tab，YAML 可能解析失败

**编号**：BUG-001  
**标题**：Style Settings `@settings` 块含 tab，YAML 可能解析失败  
**严重级别**：High  
**发现时间**：2026-05-21  
**复现步骤**：
1. 抽取 `src/07-style-settings.css` 中 `/* @settings ... */` 块。
2. 使用 YAML parser 解析。
3. 出现 tab 相关 ScannerError。

**根本原因**：`@settings` 块存在 tab 缩进；YAML 不允许 tab 作为缩进。  
**影响范围**：Style Settings 插件配置面板可能整体或局部不可用。  
**修复方案**：已替换 tab 为 spaces；已将 `h1-color` / `h6-color` 改为合法 hex 默认值；已把 Style Settings 检查加入 `check-theme.mjs`。  
**防止回归**：`npm run check` 现在会检查 `@settings` 块存在、禁止 tab、禁止 `default: '#'`、检查重复 id 与缺失字段。  
**状态**：已修复  
**提交 Hash**：  
**总结**：Style Settings 是主题用户配置入口，必须作为构建检查的一部分。

### BUG-002 文档提到 `npm run sync:vault`，但 package scripts 当前未声明

**编号**：BUG-002  
**标题**：文档提到 `npm run sync:vault`，但 package scripts 当前未声明  
**严重级别**：Medium  
**发现时间**：2026-05-21  
**复现步骤**：
1. 查看旧开发说明中的构建流程。
2. 查看 `package.json` scripts。
3. 发现文档命令不存在。

**根本原因**：同步脚本/文档与 package scripts 不一致。  
**影响范围**：开发者按文档同步到 vault 会失败。  
**修复方案**：已新增 `sync-theme-to-vault.mjs`，并在 `package.json` 增加 `sync:vault` script。  
**防止回归**：`sync:vault` 现在以 package script 为准，可用 `npm run sync:vault -- /path/to/vault [--preview]`。  
**状态**：已修复  
**提交 Hash**：  
**总结**：开发命令必须以 `package.json` 为准。

---

## Bug 模板（新增时复制）

### BUG-XXX 标题

**编号**：BUG-XXX  
**标题**：  
**严重级别**：Critical / High / Medium / Low  
**发现时间**：  
**复现步骤**：
1.
2.

**根本原因**：  
**影响范围**：  
**修复方案**：  
**防止回归**：  
**状态**：待修复 / 修复中 / 已修复  
**提交 Hash**：  
**总结**：

### BUG-003 fancy-code 代码块边框从未渲染

**编号**：BUG-003
**标题**：fancy-code 代码块边框从未渲染（`border: <颜色token>` 缺 style）
**严重级别**：Medium
**发现时间**：2026-06-10（M12 前置分析）
**复现步骤**：开启 fancy-code，观察 Live Preview 代码块与阅读视图 pre——声明的边框不出现。
**根本原因**：`src/02-code.css` 四处写 `border: var(--codeblock-border)` / `border-left: var(--codeblock-border)`，而 `--codeblock-border` 的值是颜色（`var(--color-base-30)`）；`border` 简写未给 style 时 border-style 保持 `none`，整条声明无渲染效果。
**影响范围**：fancy-code 的代码块头部、左右边框、阅读视图 pre 外框。
**修复方案**：统一改为 `1px solid var(--codeblock-border)`（4 处）。
**防止回归**：`check-theme.mjs` 新增 `validateM12FixRegressions`，检测无 style 的 `border: var(--codeblock-border);` 写法。
**状态**：已修复
**总结**：颜色 token 进 border 简写是典型静默失效，必须配自动门禁。

### BUG-004 `data-task='<'` 重复 mask-image 死代码

**编号**：BUG-004
**严重级别**：Low
**发现时间**：2026-06-10
**根本原因**：`src/04-tasks-and-progress.css` 同一规则块连写两条 `-webkit-mask-image`（时钟图标紧跟日历图标），首条永远被覆盖。
**修复方案**：删除首条时钟图标声明，保留日历（scheduled 语义正确）。
**状态**：已修复

### BUG-005 `--max-width` 死变量

**编号**：BUG-005
**严重级别**：Low
**发现时间**：2026-06-10
**根本原因**：`src/00-header.css` 定义 `--max-width: 88%`，全部源码无任何 `var(--max-width)` 引用（疑为 Things 上游遗留）。
**修复方案**：删除；`validateM12FixRegressions` 防止重新引入。
**状态**：已修复

### BUG-006 callout 折叠 max-height 过渡死代码

**编号**：BUG-006
**严重级别**：Low
**发现时间**：2026-06-10
**根本原因**：Obsidian 对折叠 callout 的内容做 display 级切换，`max-height` transition 永远不可见；且展开态未设 max-height，本身无从过渡。规则附带的 `overflow: hidden` 还可能裁剪 callout 内的悬浮控件。
**修复方案**：删除 `src/09-animations.css` 中该块（折叠反馈由 01-foundation 的 fold 图标旋转承载）；`validateM12FixRegressions` 防回归。
**状态**：已修复

### BUG-007 子弹线程被原生「突出显示当前行」背景遮挡

**编号**：BUG-007
**标题**：子弹线程被原生「突出显示当前行」背景遮挡（负 z-index 沉底）
**严重级别**：Medium
**发现时间**：2026-06-10（用户活体 QA 反馈）
**复现步骤**：开启 Obsidian 原生「编辑器 → 突出显示当前行」+ 主题 bullet-threading；光标停在第 3 级列表行，整行背景出现，线程在该行内的 elbow/途径线段不可见。
**根本原因**：线程伪元素沿用上游 gist 的 `z-index: -99`。`.cm-line` 是 `position: relative` 但 `z-index: auto`，不构成层叠上下文，负 z 伪元素被提到外层层叠上下文的"负 z 层"（最底）绘制；而行自身背景（当前行高亮、引用底色）绘制顺序靠后，凡有背景的行都会盖住线程。
**影响范围**：bullet-threading × 原生当前行高亮 / 引用块内列表 等任何"行有背景"的组合。
**修复方案**：① 三处线程伪元素 `z-index: -99` → `0`（画在本行背景之上）；② `body.bullet-threading` 作用域内 `.list-bullet / .list-number / .task-list-item-checkbox` 提升 `position: relative; z-index: 1`，保住"线不压标记"的原始意图。层级：行背景 < 线程(0) < 列表标记(1) < 正文。
**防止回归**：`validateBulletThreading` 新增两条断言——`01-foundation.css` 禁止出现 `z-index: -99`、必须存在标记提升规则。
**状态**：已修复
**总结**：吸收社区 snippet 时连同其层级假设一起继承了；负 z-index 只在"行无背景"的前提下成立，组合原生功能即破。

