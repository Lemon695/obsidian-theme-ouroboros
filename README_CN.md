# Ouroboros（衔尾蛇）

中文说明 | [English](./README.md)

Ouroboros 是一个为 [Obsidian](https://obsidian.md) 设计的简洁优雅主题，视觉灵感来自 Things 的克制感与秩序感。它希望在亮色和暗色模式下都提供温暖、清晰、专注的书写体验，同时保留足够的自定义空间，方便你按自己的习惯微调界面。

## 主题亮点

- 为亮色与暗色模式分别打磨的暖调配色，整体观感接近纸面阅读
- 优化了排版、间距、表格、标注框、代码块、标签和元数据等常用界面细节
- 通过 Style Settings 提供强调色预设、界面密度、标题样式和链接样式等可调选项
- 提供花式代码块、当前行高亮、专注模式、减少动画等可选功能
- 内置 CJK 排版选项，更适合中文、日文、韩文内容场景
- 包含任务状态、进度样式，以及面向知识管理工作流的细节优化
- 对移动端做了针对性调整，在小屏设备上也更顺手

## 截图

![](_resources/img/image-comparison-v1.png)

## 安装方式

### 从 Obsidian 社区主题安装

1. 在 Obsidian 中打开 **设置**。
2. 进入 **外观** -> **主题**。
3. 点击 **管理**，搜索 `Ouroboros`。
4. 点击 **安装并使用**。

### 手动安装

1. 从 [GitHub Releases](https://github.com/Lemon695/obsidian-theme-ouroboros/releases) 下载最新版本。
2. 解压后取出 `theme.css` 和 `manifest.json`。
3. 将它们复制到你的 vault 中 `.obsidian/themes/ouroboros/` 目录。
4. 打开 **设置** -> **外观** -> **主题**，选择 `Ouroboros`。

## 自定义

Ouroboros 通过 Style Settings 插件和 CSS 变量暴露了较完整的自定义能力。

你可以调整的内容包括：

- 强调色预设：moss、amber、sage
- 界面密度预设：compact UI、airy reading
- 内链和外链下划线显示方式
- 花式代码块与高亮样式
- 专注模式与减少动画模式
- CJK 排版和衬线字体切换
- 各级标题的字号、字重和颜色
- 标签、高亮、行内代码和进度条颜色

## 插件支持

主题针对多种常见社区插件提供了专门样式，包括：

- Dataview
- Calendar
- Tasks
- Todoist
- Excalidraw
- Full Calendar
- Hover Editor
- Banners
- Canvas
- Checklist
- Kanban
- Outliner
- DB Folder
- Timeline
- Obsidian Git

## 兼容性

- 最低 Obsidian 版本：`1.0.0`
- 当前主题版本：`1.0.2`
- 同时支持亮色与暗色模式

## 开发

仓库中已经包含用于构建发布版本的模块化源码。

1. 克隆本仓库。
2. 在 [`src/`](/Users/su/Code/Github/Lemon695/Obsidian-theme/obsidian-theme-ouroboros/src) 中修改源码文件。
3. 运行 `npm run build` 重新生成 `theme.css`。
4. 运行 `npm run check` 校验版本信息和构建结果。
5. 重新加载 Obsidian 查看效果。

### 源码结构

- `src/00-header.css`：主题头部注释和根变量
- `src/01-foundation.css`：核心配色、排版、布局和应用界面
- `src/02-code.css`：代码块和语法高亮
- `src/03-mobile.css`：移动端样式调整
- `src/04-tasks-and-progress.css`：任务状态和进度样式
- `src/05-plugins-primary.css`：主要插件集成样式
- `src/06-plugins-secondary.css`：次要插件集成样式
- `src/07-style-settings.css`：Style Settings 配置定义
- `src/08-plugin-compat.css`：插件兼容性元数据
- `src/09-animations.css`：动效和动画控制

## 贡献

欢迎提交 issue 或 pull request。如果你发现样式问题、视觉回归或插件兼容性问题，附上截图和复现信息会很有帮助。

## 致谢

Ouroboros 的灵感来自：

- [Things Theme](https://github.com/colineckert/obsidian-things) by @colineckert
- [Things App](https://culturedcode.com/things/) by Cultured Code

## 许可证

本主题基于 [MIT License](LICENSE) 发布。
