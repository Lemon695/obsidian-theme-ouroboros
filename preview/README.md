# Ouroboros Preview Notes

> Purpose: quick visual regression files for the Ouroboros theme. Copy into a vault with `npm run sync:vault -- /path/to/vault --preview`.

## Suggested workflow

0. Use `CHECKLIST.md` as the release-quality manual QA gate before screenshots or release notes; summarize the concrete run in `QA-RUN.md`; unresolved gaps should be copied into `../docs-code-ai/KNOWN-LIMITATIONS.md`.
1. Run `npm run build && npm run check`.
2. Sync to a test vault: `npm run sync:vault -- /path/to/vault --preview`.
3. Open these notes in Obsidian.
4. Check light and dark mode.
5. Check Style Settings toggles and note cssclasses: style packs, `cards`, `table-wide`, navigation rails/current-path highlights, image/figure/gallery helpers, accent presets, compact UI, airy reading, reading width tier/advanced, numbered headings, code language labels, nested tags, accent presets (incl. ink-blue/clay/slate), paper temperature, CJK mode, fancy code, fancy highlight, Research reading, Longform reading, Focus mode, Keyboard mode, Publish/Print export, and reduce motion.

## Files

| Note | Covers |
|------|--------|
| `CHECKLIST.md` | M5 release-quality preview QA checklist covering build/sync, all preview fixtures, Style Settings variants, light/dark, mobile/accessibility, plugin workbench checks, known limitations, and sign-off evidence |
| `QA-RUN.md` | M7 release-candidate run record for Dev01 sync evidence, automated gates, manual visual QA matrix, and all-vault deployment decision |
| `core-showcase.md` | typography, links, tags, callouts, tables, code, properties/frontmatter |
| `presets-showcase.md` | M6 style packs, palette contrast, text rhythm, and accent override behavior |
| `reading-width-showcase.md` | M9 reading column width tier + advanced custom width, `--file-line-width` binding, mode/pack precedence |
| `reading-font-showcase.md` | M10 reading font profile (serif/Western `variable-select`, body+editor only, UI chrome stays sans, CJK/style-pack precedence) |
| `numbered-headings-showcase.md` | M9 numbered-headings toggle: H1–H4 CSS-counter numbering in Reading View + Live Preview, per-note reset, callout exclusion |
| `code-block-showcase.md` | M9 code-block language labels, copy-button hover/active, and stronger diff contrast |
| `nested-tags-showcase.md` | M9 nested-tag cue (left rail + softer fill, Reading View) and tag-pane nesting guides |
| `graph-view-showcase.md` | M9 graph warm-paper wash, brighter focused node, current-note ring, quieter links |
| `highlight-pens-showcase.md` | M10 multi-color highlight pens (`<mark class="...">`, 8 low-saturation colors, Reading View) |
| `accent-paper-showcase.md` | M10 expanded accent palette (ink-blue/clay/slate) and paper-temperature (warm/cool) checks |
| `active-path-showcase.md` | M10 current-path / active-note emphasis (warm active tab + rail, active pane title, quieter breadcrumb) |
| `dashboard-showcase.md` | M10 daily/periodic dashboard layout (`cssclasses: [dashboard]`, Dataview/Tasks blocks as calm paper panels, composes with cards) |
| `task-priority-showcase.md` | M10 task priority palette (opt-in; Tasks-plugin `data-task-priority` mapped to the warm progress 5-color ramp, warm due chip) |
| `paper-panes-showcase.md` | M10 paper panes (opt-in; editor tab groups as raised paper sheets — thin border, soft shadow, rounded corners, active-pane accent lift) |
| `typewriter-focus-showcase.md` | M10 typewriter focus (Focus-mode sub-toggle; dim inactive lines + emphasize the active line + centered composition room, Live Preview only) |
| `bullet-threading-showcase.md` | M12 bullet threading (default-on; rounded accent thread from ancestor bullets to the active list line, editor only, 6 levels) |
| `clean-embeds-showcase.md` | M12 clean embeds (opt-in toggle or per-note `embed-clean` cssclass; transclusions lose card chrome, hover accent rail) |
| `content-helpers-showcase.md` | M6 cards, table-wide/table-small/table-clean, Dataview table/list helper classes |
| `navigation-showcase.md` | M6 File Explorer folder rails, current-path highlight, Bookmarks/Search/Outline tree navigation |
| `image-figure-gallery-showcase.md` | M6 `img-grid`, `img-wide`, `img-frame`, `figure-note`, captions, and local SVG gallery assets |
| `research-reading-showcase.md` | Research reading mode, citations, footnotes, annotations, highlights, evidence tables |
| `longform-reading-showcase.md` | Longform reading mode, chapter rhythm, scene breaks, prose spacing, editorial quotes |
| `focus-mode-showcase.md` | Focus mode 2.0, Keyboard mode, hover recovery, keyboard focus recovery, command/switcher hints, status/ribbon rails |
| `publish-print-showcase.md` | M6 Publish / Print / PDF export, links, footnotes, tables, code, callouts, figures |
| `tasks-showcase.md` | checkbox states, custom task icons, progress bars |
| `plugin-showcase.md` | Dataview, Tasks, Kanban, Calendar, Canvas, Git and plugin-facing surfaces |
| `canvas-workflow.canvas` | Canvas nodes, groups, edges, labels, controls, color picker, and minimap |
