# Ouroboros（衔尾蛇）

中文说明 | [English](./README.md)

Ouroboros 是一个为 [Obsidian](https://obsidian.md) 设计的干净、温暖、专注的主题。它的视觉灵感来自 Things 的秩序感、Flexoki 的纸面暖色，以及真实知识工作场景：阅读、写作、研究、规划、任务管理和插件密集型 vault 维护。

它的目标不是把 Obsidian 做成高噪音仪表盘，而是在内容表面保持足够安静，只把强调色用于状态、焦点和层级提示，让用户能够长时间工作而不疲劳。

## 主题亮点

- 为亮色与暗色模式分别打磨的暖调配色，整体观感接近纸面阅读
- 优化排版、间距、表格、标注框、代码块、标签、元数据、命令面板、侧栏和搜索结果
- 通过 Style Settings 提供强调色预设、界面密度、标题样式、链接样式、CJK 排版、代码/高亮效果、减少动画和阅读模式等可调选项
- 可恢复 Focus mode 与 Keyboard mode：降低界面噪音，同时保留可见边缘提示、hover/focus 恢复、更强 focus ring 与 command/switcher 提示
- 提供 decision、risk、principle、insight、cycle 等语义化知识工作流标注框
- 覆盖现代 Obsidian 核心视图：Bases、Properties、Command Palette、Quick Switcher、File Explorer 导航轨、Bookmarks、Search、Outline 和 Canvas
- 优化 Canvas 节点、分组、边线、标签、控制栏、颜色选择器和 minimap 的现代视觉
- 提供 Research reading mode，优化引用、脚注、标注、高亮和证据表格
- 提供 Publish / Print / PDF 导出支持，覆盖链接、脚注、表格、代码块、callout 和 figure
- 提供 Longform reading mode，优化长文、章节、场景分隔、编辑式引语和持续阅读节奏
- 对移动端做了针对性调整，在小屏设备和触控场景中也更顺手

## 截图

![Ouroboros 亮色与暗色对比](./screenshot.png)

截图资源保持同步，便于社区主题列表、README 和发布材料使用：

- `screenshot.png`：512×288 社区主题 / README 预览图。
- `_resources/img/image-comparison-v1.png`：用于重新生成 `screenshot.png` 的高清源图。

## 安装方式

### 从 Obsidian 社区主题安装

1. 在 Obsidian 中打开 **设置**。
2. 进入 **外观** -> **主题**。
3. 点击 **管理**，搜索 `Ouroboros`。
4. 点击 **安装并使用**。

### 手动安装

1. 从 [GitHub Releases](https://github.com/Lemon695/obsidian-theme-ouroboros/releases) 下载最新版本。
2. 解压后取出 `theme.css` 和 `manifest.json`。
3. 将它们复制到你的 vault 中 `.obsidian/themes/Ouroboros/` 目录。
4. 打开 **设置** -> **外观** -> **主题**，选择 `Ouroboros`。

## 自定义

Ouroboros 通过 Style Settings 插件和 CSS 变量暴露了较完整的自定义能力。

你可以调整的内容包括：

- 风格包：Classic Paper、Things Warm、Research Desk、Longform Book、Night Ink、Low Contrast Calm
- 强调色预设：moss、amber、sage、ink-blue、clay、slate
- 纸张色温：warm / cool 纸面（light 与 dark）
- 界面密度预设：compact UI、airy reading
- 阅读栏宽：Narrow / Standard / Relaxed / Wide 四档加高级自定义宽度，已绑定到 Obsidian 的可读行宽（readable line length）
- 阅读字体：可选的衬线 / 西文正文字体档（系统无衬线 / Iowan-Palatino 衬线 / Georgia 现代衬线 / Inter 人文无衬线），只作用于正文与编辑区，界面 chrome 保持无衬线；CJK 模式与风格包优先级更高，会覆盖此选择
- 标题编号：可选的 CSS counter 大纲编号（1、1.1、1.1.1），覆盖 H1–H4，阅读视图与 Live Preview 一致
- 代码块：阅读视图的语言标签角标、更清晰的复制按钮 hover/active 态、更强但克制的 diff 对比
- 嵌套标签：为 `#parent/child` 标签提供克制的层级提示，并在 Tags 侧栏显示更清晰的嵌套引导线
- Graph view：暖纸背景、更亮的焦点/当前节点与 accent 高亮环，并弱化连线噪音
- 高亮笔：8 种低饱和 `<mark class="red|orange|yellow|green|cyan|blue|purple|pink">` 颜色（阅读视图）
- 当前路径强化：为 active tab、当前面板标题与当前面包屑段提供暖色低噪声提示，仅强调当前项
- Daily / periodic 仪表盘：`dashboard` cssclass 把 Dataview/Tasks 块变成安静的纸面 widget 面板（可与 `cards` 组合）
- 任务优先级色板：可选开关，把 Tasks 插件优先级（highest…lowest）映射到暖色 progress 五色 ramp 作为克制的左轨，并给 due chip 暖色——紧迫度按「暖→冷」呈现
- 纸张分层窗格：可选开关，把编辑区标签组变成抬升的纸张（细边框 + 轻阴影 + 圆角），当前窗格用 accent 边轻微抬升；侧栏保持扁平
- 打字机聚焦：Focus mode 子开关，编辑时淡化非当前行、突出当前行，并给居中留白（仅 Live Preview）
- 内容 helper classes：`cards`、`cards-cover`、`cards-compact`、`table-wide`、`table-small`、`table-clean`
- File Explorer / Bookmarks / Outline 的低噪声导航轨与当前路径高亮
- 图片 / figure / gallery helper：`img-grid`、`img-wide`、`img-frame`、`figure-note`
- Publish / Print / PDF 导出 polish：链接、脚注、表格、代码、callout 和 figure
- 内链和外链下划线显示方式
- 花式代码块与高亮样式
- 可恢复 Focus mode、Keyboard mode 与减少动画模式
- 面向资料/引用密集型笔记的 Research reading mode
- 面向长文、章节草稿和散文写作的 Longform reading mode
- CJK 排版和衬线字体切换
- 各级标题的字号、字重和颜色
- 标签、高亮、行内代码和进度条颜色

## 插件与核心视图支持

兼容声明采用分级和保守口径。

当前已覆盖的核心/插件表面：

- Bases（核心）
- Properties / File properties / All properties（核心）
- Command Palette / Quick Switcher（核心）
- Bookmarks / Search / Outline / File Explorer（核心）
- Canvas（核心）
- Dataview
- Calendar / Full Calendar
- Tasks
- Kanban
- Obsidian Git

selector-level 集成：

- Todoist Sync
- Excalidraw
- Hover Editor
- Banners
- Checklist
- Outliner
- Timeline

legacy selector-only：

- DB Folder（`.db-table-view`；M5-4 审计时未在 Obsidian 社区插件目录中确认到官方插件 id）

未列出的插件会尽量继承 Obsidian 核心 token，但暂不算作已经明确声明兼容支持的范围。

## 已知限制

已知限制与不支持插件声明，简版如下：

- selector-level 集成需要在你的 vault 中自行验证，不承诺完整插件布局一致。
- DB Folder 仅保留 legacy selector，不会在确认官方插件 id 和 live DOM 前写入主题元数据。
- 移动端 FAB 以及 Bases、Canvas、Properties、prompt/suggestions、Full Calendar 等版本敏感表面，发布前需要手动 QA。
- 不在兼容审计里的插件会尽量继承核心 token，但不属于专门支持声明。

## 兼容性

- 最低 Obsidian 版本：`1.0.0`
- 当前主题版本：`1.0.2`
- 同时支持亮色与暗色模式
- CSS-only 主题，不依赖 JavaScript 插件

## 开发

仓库中已经包含用于构建发布版本的模块化源码。

1. 克隆本仓库。
2. 在 [`src/`](./src/) 中修改源码文件。
3. 运行 `npm run build` 重新生成 `theme.css`。
4. 运行 `npm run check` 校验版本信息、Style Settings 语法和构建产物。
5. 更新截图或扩展兼容性声明前，先在 Obsidian 中自行核对实际显示效果。

### 源码结构

- `src/00-header.css`：主题头部注释和根变量
- `src/01-foundation.css`：核心配色、风格包、排版、布局、应用界面、Properties、prompt/suggestion、tree/search、阅读模式和 Focus mode
- `src/02-code.css`：代码块和语法高亮
- `src/03-mobile.css`：移动端样式调整
- `src/04-tasks-and-progress.css`：任务状态和进度样式
- `src/05-plugins-primary.css`：主要插件和工作台集成样式，包括 Dataview helper、Bases 与 Canvas
- `src/06-plugins-secondary.css`：次要插件集成样式
- `src/07-style-settings.css`：Style Settings 配置定义
- `src/08-plugin-compat.css`：插件兼容性元数据
- `src/09-animations.css`：动效和动画控制

## 贡献

欢迎提交 issue 或 pull request。如果你发现样式问题、视觉回归或插件兼容性问题，请附上截图、Obsidian 版本、系统/设备、已启用的 Style Settings 选项和复现信息。

## 致谢

Ouroboros 的灵感来自：

- [Things Theme](https://github.com/colineckert/obsidian-things) by @colineckert
- [Things App](https://culturedcode.com/things/) by Cultured Code
- [Flexoki](https://github.com/kepano/flexoki) by @kepano，提供了温暖、适合长时间阅读的配色系统灵感

## 许可证

本主题基于 [MIT License](LICENSE) 发布。
