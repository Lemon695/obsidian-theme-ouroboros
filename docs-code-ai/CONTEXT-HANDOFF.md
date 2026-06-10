# 上下文交接文档（CONTEXT-HANDOFF.md）

> 写入时间：2026-06-10 | 状态：**M12 全部完成（M12-1/2/3/4），无中断任务、无进行中里程碑。** 下一步等待用户指派（活体视觉 QA / 发布 / 新方向）。

## 中断时正在做什么

无中断。M12（分析修复 + Bullet Threading / Clean Embeds 吸收）已完整交付并通过 build+check（30 门禁）。

## 已完成的部分（本批次）

- [x] M12-1 Bug 修复批：BUG-003（`border: <颜色token>` 缺 style 永不渲染，02-code 4 处）、BUG-004（`data-task='<'` 重复 mask）、BUG-005（`--max-width` 死变量）、BUG-006（callout max-height 死过渡）
- [x] M12-2 优化批：tag hover 去 translateY 抖动；cjk-mode `overflow-wrap:anywhere` 收窄到内容区
- [x] M12-3 Bullet threading：`bullet-threading` toggle 默认开，accent 单色线程 + 圆角 elbow，LP/源码双模式，6 级封顶，编辑器限定（ADR-020）
- [x] M12-4 Clean embeds：`embed-clean` toggle（默认关）+ per-note cssclass，hover accent 轨

## 下一步（无中断任务）

由用户指派。可能的后续（均需用户明确指示，不自动开始）：
- **活体视觉 QA**：`preview/bullet-threading-showcase.md`、`preview/clean-embeds-showcase.md` 两个新 fixture 需在真实 vault 肉眼验证（light/dark + accent presets + 源码模式 + 任务行避让），加上此前 QA-RUN §4.2 的 13 个 pending 表面。
- **发布**：版本仍是 1.0.2；发布需显式任务（走 `RELEASE-CHECKLIST.md`）。注意：**master 分支存在半完成版本升级**（manifest 1.0.3 / package 1.0.2 / versions.json 缺 1.0.3，master 上 check 失败），合并或发布时必须先对齐。
- **候选新方向**（来自 2026-06-10 分析，未实施）：标题级别 gutter 指示（Shimmering Focus）、stacked tabs 卡片化（Border）、keyboard/focus 模式提示文案中文化。

## 已知的坑 / 注意事项（本批次新增，必读）

- **祖先路径选择器代数**：最近深度 N 祖先 = `line-N:not(:has(~ line-N ~ .cm-active)):has(~ deeper.cm-active)`；同深度排除传递性处理浅层打断；各深度组途径线天然互斥，不依赖级联顺序。
- **不要直接 cap 任务行伪元素**：用任务行上的 `--ouroboros-thread-tail-max/elbow-max` 自定义属性 + 绘制规则 `min()` 消费，避免 gist 原版 `.HyperMD-task-line::after { max-height }` 式跨功能污染。
- **`::before` 槽位冲突**：threading elbow 与 `active-line` 轨在活动列表行共用 `::before`，threading 胜出——已登记 KNOWN-LIMITATIONS，属设计取舍。
- **负 z-index 伪元素会被行背景吞掉**（BUG-007，活体 QA 发现并已修复）：线程层级是 `z-index: 0` + 列表标记提升 `z: 1`；不要回退到上游 gist 的 `-99`（门禁已拦）。
- **`border: <颜色token>` 静默失效**：border 简写缺 style 整条无效且无报错（BUG-003），已配 `validateM12FixRegressions` 文本门禁。
- **threading 偏移假设默认 tab size**：`--ouroboros-thread-indent: 2em`；用户自定义 tab size 时需 snippet 调节。
- 历史坑点（line-width 绑定、LP 编号锚点、JS-less 无运行时状态、字体档 UI chrome 解耦等）已沉淀至 `2026-06——记忆文档.md` 与 PATTERNS P-016~019。
- 每个子任务完成后：`npm run build` → `npm run check` → 更新 `Tasks.md` + `2026-06——记忆文档.md` + 对应 preview/CHECKLIST + README/README_CN + `check-theme.mjs` 回归门禁。
- 不要直接编辑 `theme.css`；CSS 改动后必须 `npm run build`。

## 不要动的文件

- 未经用户要求，不修改版本号相关文件：`manifest.json`、`versions.json`、`package.json` version、`src/00-header.css` 版本头。
- 已通过 check 门禁的 preview fixture 与 `check-theme.mjs` 既有校验函数，不顺手重构。

## 测试状态

`npm run build`：通过（10 源文件）。
`npm run check`：通过（30 个 validate 门禁，含新增 `validateBulletThreading` / `validateCleanEmbeds` / `validateM12FixRegressions`）。

## Style Settings 当前新增 id（避免重名，M12 增量）

- 子弹线程：`bullet-threading`(class-toggle, **默认开**；token `--ouroboros-thread-color/width/indent`)
- 无缝嵌入：`embed-clean`(class-toggle, 默认关；亦可 per-note cssclass `embed-clean`)
- 其余 id 清单见 `2026-06——记忆文档.md` 2026-06-02 会话与 `07-style-settings.css`。
