# CLAUDE.md — Ouroboros Theme AI 开发协议

> 项目：Ouroboros Obsidian Theme  
> 创建：2026-05-21  
> 来源：参考 `NEW-PROJECT-KICKSTART-TEMPLATE v4-2` 的文档体系与启动协议，已改写为 **Obsidian 主题项目** 专用版本。  
> 最高规则：这是 Obsidian Theme，不是 Obsidian Plugin；不要套用 `main.ts / ModuleManager / PluginModule / i18n` 插件架构。

---

## 0. 会话启动协议（每次新会话必须执行，不可跳过）

开始任何工作前，按顺序执行：

1. 读 `docs-code-ai/ouroboros-theme-skeleton.md`（重建主题架构认知）
2. 读 `docs-code-ai/Tasks.md` → 查看「当前冲刺」区块（确认本次目标）
3. 读 `docs-code-ai/` 中**最新月份**的 `YYYY-MM——记忆文档.md` 最新会话总结（当前为 `2026-06——记忆文档.md`）
4. 若 `docs-code-ai/CONTEXT-HANDOFF.md` 存在，优先读它（上次会话被中断）
5. 读 `src/00-header.css` 与本次涉及的 `src/*.css` 文件，确认当前真实实现

完成后输出：

```markdown
📋 会话初始化完成
当前里程碑：M? — [名称]
上次完成：[任务名]
本次目标：[任务名]
已检查源码：[文件列表]
```

不允许在完成以上步骤之前开始编写任何代码。

---

## 1. 文档体系表格

| 路径 | 类型 | 作用 | 何时更新 |
|------|------|------|----------|
| `CLAUDE.md` | 规范 | AI 协作约定、主题架构规则、Checklist | 协作流程或强制规则变化时 |
| `docs-code-ai/Tasks.md` | 任务 | 里程碑任务、当前冲刺、修改日志 | 完成/新增/调整任务时 |
| `docs-code-ai/YYYY-MM——记忆文档.md` | 记忆 | 会话总结、关键决策、修改日志、坑点（按月分文件，读写最新月份） | 每轮工作结束前 |
| `docs-code-ai/BUG-TRACKER.md` | Bug | Bug 注册表、根因、修复状态、防回归 | 发现或修复 Bug 时 |
| `docs-code-ai/DECISION-LOG.md` | 决策 | 文档导航 + ADR 决策记录 | 架构/设计/验证策略变化时 |
| `docs-code-ai/ouroboros-theme-skeleton.md` | 架构 | 主题骨架速查、文件职责、CSS 层级 | 架构、文件职责、模块边界变化时 |
| `docs-code-ai/PATTERNS.md` | 模式 | 可复用设计/CSS/验证模式 | 出现可复用模式或反模式时 |
| `docs-code-ai/CONTEXT-HANDOFF.md` | 交接 | 会话中断快照，下一轮优先读取 | 中断时写入；正常结束前清理或标记为空 |

---

## 2. 文档同步规则

| 触发条件 | 必须更新的文档 | 动作说明 |
|----------|----------------|----------|
| 完成一个子任务 | `Tasks.md` + `记忆文档.md` | 勾选 checkbox；追加修改日志一行 |
| 发现 Bug | `BUG-TRACKER.md` | 新增条目（状态=待修复） |
| 修复 Bug | `BUG-TRACKER.md` | 状态=已修复，填根因+验证证据 |
| 做架构/设计决策 | `DECISION-LOG.md` | 新增 ADR 条目 |
| 发现项目级设计模式 | `PATTERNS.md` | 新增 P-XXX 条目 |
| 架构/文件职责/接口变更 | `ouroboros-theme-skeleton.md` | 同步更新受影响区块，更新版本号 |
| 新建长期文档 | `DECISION-LOG.md` | 在导航索引新增一行 |
| 会话被中断 | `CONTEXT-HANDOFF.md` | 写入中断快照 |
| 会话正常结束前 | `记忆文档.md` + `CONTEXT-HANDOFF.md` | 追加总结；将 handoff 标为“无中断任务”或删除 |
| 完成整个里程碑 | `Tasks.md` + skeleton 版本号 | 更新完成率和对应里程碑标记 |

---

## 3. 架构约定（主题项目版）

### 3.1 必须遵守

- **必须只修改 `src/` 源文件**，禁止直接编辑 `theme.css`；改完运行 `npm run build` 生成产物。
- **必须保持 `src/*.css` 文件名排序即加载顺序**：`00` 变量 → `01` 基础 → `02-04` 内容表面 → `05-06` 插件 → `07` 设置 → `08` 兼容元数据 → `09` 动效。
- **必须把颜色、字体、圆角、间距、阴影等长期变量放在 `src/00-header.css`**，不要散落在各文件。
- **必须使用 Obsidian/CSS 变量**，禁止在 UI 规则中新增未说明的硬编码颜色。
- **必须同时覆盖阅读视图和 Live Preview**。标题、列表、链接、标签、callout、任务等内容样式不能只写 `.markdown-rendered`。
- **必须让新增动效尊重 `prefers-reduced-motion` 与 `body.reduce-motion`**。
- **必须在新增 Style Settings 项后验证 `@settings` YAML 可解析**。
- **必须在新增插件样式后更新 `src/08-plugin-compat.css`、README/README_CN 和 preview 样例**。
- **必须保持深色/浅色、accent presets、compact/airy、CJK 模式都可用**。
- **必须运行 `npm run build && npm run check` 后才允许说“完成”**。

### 3.2 绝对禁止

- 禁止直接编辑 `theme.css`。
- 禁止使用纯黑 `#000` 或纯白 `#fff` 作为主题 UI 颜色；SVG mask / 技术图形色若必须使用，需注释说明。
- 禁止在 `@settings` YAML 块中使用 tab 缩进。
- 禁止把插件项目的 `main.ts / ModuleManager / PluginModule / i18n` 架构套到主题项目。
- 禁止新增依赖，除非用户明确要求。
- 禁止修改版本号，除非任务明确是发布/版本升级。
- 禁止执行 `git push`。
- 禁止使用 `git add .` 或 `git add -A`；需要提交时必须指定文件名。
- 禁止覆盖用户已有未提交修改；改动前先看 `git status --short`。

### 3.3 主题 5 层架构

```text
Layer 0  发布/构建层
  package.json / manifest.json / versions.json / build-theme.mjs / check-theme.mjs
  职责：版本一致性、构建顺序、发布产物校验。

Layer 1  设计令牌层
  src/00-header.css
  职责：颜色、字体、间距、圆角、语义 token 的唯一来源。

Layer 2  核心 Obsidian UI 层
  src/01-foundation.css
  职责：主题色映射、阅读排版、应用 chrome、Callout、Properties、Graph、菜单、焦点态。

Layer 3  内容/交互表面层
  src/02-code.css / src/03-mobile.css / src/04-tasks-and-progress.css / src/09-animations.css
  职责：代码、移动端、任务状态、进度条、动效。

Layer 4  插件兼容与用户配置层
  src/05-plugins-primary.css / src/06-plugins-secondary.css / src/07-style-settings.css / src/08-plugin-compat.css
  职责：插件 UI 适配、Style Settings 配置、兼容声明。
```

---

## 4. 关键文件速查表

| 文件路径 | 职责 | 什么时候改 |
|----------|------|-----------|
| `src/00-header.css` | 全局变量、主题头、默认 token | 新增颜色/字体/间距/圆角/阴影/token 时 |
| `src/01-foundation.css` | 核心 UI、阅读排版、Properties、Callout、Graph | 修改 Obsidian 基础界面或阅读体验时 |
| `src/02-code.css` | inline code、code block、syntax、diff | 修改代码块/高亮/行号时 |
| `src/03-mobile.css` | 移动端 FAB 与响应式补丁 | 移动端交互或按钮位置变化时 |
| `src/04-tasks-and-progress.css` | checkbox 状态、任务图标、progress | 新增任务符号或进度条样式时 |
| `src/05-plugins-primary.css` | 高频插件样式 | Dataview/Tasks/Canvas 等主插件支持变化时 |
| `src/06-plugins-secondary.css` | 次级插件样式 | Kanban/Git/Timeline 等支持变化时 |
| `src/07-style-settings.css` | Style Settings `@settings` | 新增/修改用户开关或变量时 |
| `src/08-plugin-compat.css` | Obsidian Hub 插件兼容声明 | 新增/删除插件支持时 |
| `src/09-animations.css` | keyframes、动效、reduce motion | 新增动画或转场时 |
| `build-theme.mjs` | 合并 `src/*.css` → `theme.css` | 构建流程变化时 |
| `check-theme.mjs` | 校验版本与产物同步 | 新增自动化质量门禁时 |
| `docs-code-ai/Tasks.md` | 当前任务/里程碑 | 每个子任务完成后 |
| `docs-code-ai/ouroboros-theme-skeleton.md` | 主题架构速查 | 架构/文件职责变化时 |

---

## 5. 新增功能 Checklist

> ⛔ 门控规则：`npm run build` + `npm run check` 通过后，必须完成以下全部相关项，才允许输出「完成」。

- [ ] 已确认改动只在当前任务范围内
- [ ] 没有直接编辑 `theme.css`
- [ ] 新增长期变量已放入 `src/00-header.css`
- [ ] UI 颜色使用主题变量 / semantic token / `color-mix()`
- [ ] 没有新增未说明的硬编码颜色
- [ ] reading view 与 Live Preview 都已覆盖
- [ ] light / dark 都考虑过
- [ ] accent presets 不会失效
- [ ] compact / airy 不会失效
- [ ] CJK 模式不被破坏
- [ ] 新增动画可被 `prefers-reduced-motion` 与 `body.reduce-motion` 关闭
- [ ] 新增 Style Settings 已更新 `src/07-style-settings.css`
- [ ] `@settings` YAML 可解析，无 tab 缩进
- [ ] 新增插件支持已更新 `src/08-plugin-compat.css`
- [ ] README / README_CN 已同步用户可见功能
- [ ] `docs-code-ai/ouroboros-theme-skeleton.md` 或架构文档已同步
- [ ] preview 样例已补充或说明为何无需补充
- [ ] `npm run build` 通过
- [ ] `npm run check` 通过
- [ ] 更新 `docs-code-ai/Tasks.md`
- [ ] 更新 `docs-code-ai/` 最新月份的 `YYYY-MM——记忆文档.md`

---

## 6. 修复 Bug Checklist

- [ ] 在 `BUG-TRACKER.md` 登记（状态=修复中），按严重级别分级
- [ ] 判断根因类别：变量/token、选择器、Obsidian DOM 变化、插件 DOM 变化、Style Settings 解析、构建同步
- [ ] 检查同类 Bug 是否在其他文件存在
- [ ] 最小范围修复，不顺手重构无关区域
- [ ] 若是 Style Settings，必须解析 `@settings` 块
- [ ] 若是插件兼容，确认是否需要 `body:not(.no-PLUGIN-styles)` 关闭开关
- [ ] 补充 preview 或自动检查，防止回归
- [ ] `npm run build && npm run check` 通过
- [ ] 更新 `BUG-TRACKER.md`（状态=已修复，填根因+验证证据）
- [ ] 更新 `Tasks.md` + 记忆文档修改日志

---

## 7. 上下文管理规则

完成每个子任务后，说明当前上下文状态：轻 / 中 / 重。

当估计上下文使用量超过 60% 时：

- 主动提醒：「⚠️ 上下文较重，建议完成当前任务后开启新会话」
- 完成当前子任务后停下，不自动开始下一个
- 写好 `docs-code-ai/CONTEXT-HANDOFF.md` 后停止

新会话：若 `CONTEXT-HANDOFF.md` 存在，优先读它，而不是完整历史。

---

## 8. 开发行为规范

### 先说再做

任何非平凡任务（新文件 / 跨 CSS 文件改动 / 构建脚本改动 / 文档体系改动）开始前，先输出执行计划（3-5 条）：

```markdown
📝 执行计划：
1. 修改 [文件] — [做什么]
2. 新建 [文件] — [做什么]
预计影响文件：N 个，验证：N 个命令
```

### 范围控制

只实现明确要求的内容。发现可改进但不在当前范围内的地方，不直接修改，列入：

```markdown
💡 发现可改进的地方（未修改）：
- [文件 + 行号]：[问题描述]
```

### 破坏性变更预警

以下变更执行前必须警告并等待确认：

- 删除已有功能样式或 Style Settings 开关
- 重命名 body class / CSS 变量 / 文件名
- 修改构建产物策略
- 删除 README 已声明的插件支持
- 删除任何现有文件

### 验证节奏

每个子任务标准流程：

1. 定义成功标准
2. 做最小改动
3. `npm run build`
4. `npm run check`
5. 更新任务/记忆/架构文档
6. 报告验证证据

### Git 检查点

需要提交时：

```bash
git add [具体文件，不用 git add .]
git commit -m "docs(M?-?): [描述]"
```

提交信息必须遵守 Lore Commit Protocol；禁止 `git push`。

---

## 9. 开发参考

### 当前主题方向

- Things App 式克制、有序、低噪音
- Flexoki 式暖纸感，不走冷白/纯黑
- 内容优先，装饰必须服务阅读和知识管理
- 通过 Style Settings 提供适度个性化，而不是无限配置

### 关键验证命令

```bash
npm run build
npm run check
```

### 当前里程碑

- 已完成：M1–M12 全部闭环（最新 M12：分析修复 + Bullet Threading / Clean Embeds 吸收，2026-06-10）
- 下一步：等待用户指派（活体视觉 QA / 发布 / 新方向；候选见 `CONTEXT-HANDOFF.md`）
- 详细任务：`docs-code-ai/Tasks.md`
