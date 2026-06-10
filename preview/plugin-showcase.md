---
tags:
  - ouroboros/preview
  - theme/plugins
---

# Plugin Showcase

Use this note with common plugins enabled. If a plugin is unavailable, use the checklist as a manual visual QA guide.

## Dataview

```dataview
TABLE status, rating, created
FROM #ouroboros/preview
SORT file.name ASC
```

Expected:
- table border and header match core table styling
- links use accent color
- tags render as compact pills
- horizontal overflow remains usable


## Bases (Core)

Open or create a `.base` file in Obsidian 1.9+ and test Table, Cards, and List views. Add at least one filter, one sort, and one group-by rule.

Expected:
- table container uses warm surface, quiet header, readable hover, selected/focused cell ring
- filter expressions render as compact chips with visible focus states
- sort and group-by rows look like controlled chips, not raw form controls
- cards have raised surface, soft border, cover area, title hierarchy, and hover lift
- list view keeps indentation guides subtle and row hover low-noise
- embedded `base` code blocks inherit the same border radius and surface treatment

## Tasks Plugin

```tasks
not done
tag includes ouroboros/preview
```

Expected:
- group headings have quiet accent markers
- metadata chips do not overpower task text
- hover states stay subtle

## Calendar / Full Calendar

Open the Calendar sidebar and Full Calendar view if installed.

Expected:
- today/selected state uses accent consistently
- weekend and event colors remain semantic
- buttons share theme radius and border treatment

## Kanban

Open a Kanban board.

Expected:
- lane backgrounds and cards match warm paper surfaces
- add-card actions are visible but low-noise
- disable switch `no-kanban-styles` can opt out

## Canvas

Open `canvas-workflow.canvas`, then create or edit a Canvas with note, media, and group nodes. Select nodes and edges, drag a group, open the card menu/color picker, and toggle the minimap.

Expected:
- dot grid is visible but quiet, including the modern SVG-dot background
- note/media nodes read as warm cards with soft elevation and themed-color support
- selected/focused nodes use a clear accent ring without a saturated block fill
- group frames use dashed low-noise boundaries and readable group labels
- edges, arrowheads, and edge labels stay readable in light/dark and show a stronger hover/focus state
- minimap, controls, card menu, submenu, and color picker match floating panels

## Obsidian Git

Open the source control panel.

Expected:
- added/modified/deleted file states use semantic colors
- commit button reads as primary action
- diff added/removed states are readable in light/dark

## Selector-level plugin surfaces

Use this section when Todoist Sync, Excalidraw, Hover Editor, Banners, Checklist, Outliner, Timeline, or a legacy DB Folder-style table is installed.

Expected:
- plugin metadata and action buttons use theme variables
- selector-level integrations do not make stronger claims than `docs-code-ai/PLUGIN-COMPATIBILITY-AUDIT.md`
- legacy DB Folder coverage is limited to `.db-table-view` and should be treated as selector-only
- unsupported plugin states inherit Obsidian core tokens instead of introducing bright hardcoded colors
