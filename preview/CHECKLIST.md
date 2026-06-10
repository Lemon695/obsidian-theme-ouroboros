# Ouroboros Preview QA Checklist

> Milestone: M5-1 / M6 — repeatable visual regression checklist
> Scope: theme source build, preview fixtures, Obsidian manual pass, Style Settings variants, and release-readiness notes.

Use this file as the manual release gate before updating README screenshots or publishing a release. Keep concrete evidence beside each run instead of relying on memory.

For release-candidate runs, copy the command summary and final decision into `QA-RUN.md`; that file is the compact evidence handoff before broad vault sync.

---

## 0. Run header

| Field | Value |
|-------|-------|
| Date |  |
| Tester |  |
| Commit / build |  |
| Obsidian version |  |
| OS / device |  |
| Test vault path |  |
| Theme variant | Light / Dark / Both |
| Style Settings preset | Default / Style Pack / Content Helpers / Navigation Rails / Image Helpers / Publish Print / Accent / Compact / Airy / CJK / Focus / Keyboard / Reduce Motion |
| Result | Pass / Conditional / Fail |

Notes / evidence:

- Screenshots:
- Console errors:
- Known issues carried forward:

---

## 1. Preflight build and sync gate

- [ ] Working tree only contains the intended release-candidate changes.
- [ ] `npm run build` passes.
- [ ] `npm run check` passes.
- [ ] `preview/QA-RUN.md` has the current run target, command summary, manual QA evidence, and release decision status.
- [ ] `theme.css` is generated from `src/*.css`; no direct hand-edit of `theme.css`.
- [ ] Preview files are synced to a disposable vault:

```bash
npm run sync:vault -- /path/to/test-vault --preview
```

- [ ] The theme is selected in Obsidian and the vault reloads without visible CSS parse errors.
- [ ] DevTools console has no theme-related errors.

Evidence:

```text

```

---

## 2. Required preview file coverage

Open every file below after syncing preview assets. Mark each row only after checking both Reading View and Live Preview when applicable.

| Preview file | Primary coverage | Required checks | Result |
|--------------|------------------|-----------------|--------|
| `core-showcase.md` | Typography, links, tags, callouts, tables, code, properties/frontmatter, core panes | Headings have calm hierarchy; workflow callouts are distinct; properties/frontmatter remain readable; command palette / quick switcher / sidebar notes in the file still match current UI |  |
| `tasks-showcase.md` | Checkbox states and progress bars | Every custom checkbox state is legible in light/dark; progress bars do not over-saturate; task rows keep alignment |  |
| `plugin-showcase.md` | Dataview, Tasks, Kanban, Calendar, Canvas, Git, Bases and plugin-facing surfaces | Plugin cards/tables use theme tokens; Bases notes still reflect current supported states; no hard-coded bright foreground clashes |  |
| `canvas-workflow.canvas` | Canvas nodes, groups, edges, labels, controls, color picker, minimap | Node cards and groups are readable; selected/focused edge states are visible; controls/minimap are quiet but discoverable |  |
| `presets-showcase.md` | M6 style pack palettes, text rhythm, accent override checks | Each pack changes atmosphere while preserving contrast; accent presets still override accent-only values |  |
| `reading-width-showcase.md` | M9 reading width tier + advanced custom width | With Readable line length ON, the tier visibly widens the column; advanced custom width overrides the tier; reading modes/style packs override both |  |
| `reading-font-showcase.md` | M10 reading font profile (serif/Western `variable-select`) | Stepping Reading font changes body + Live Preview editor typeface; sidebars/tabs/ribbon/Settings stay sans; CJK mode and style packs override the select; light/dark legible |  |
| `numbered-headings-showcase.md` | M9 numbered-headings toggle | H1–H4 show `1`, `1.1`, … in Reading View and Live Preview; numbering resets per note; callout headings stay unnumbered and do not advance the counter |  |
| `code-block-showcase.md` | M9 code-block language labels, copy hover, diff contrast | Curated language pills appear top-right and fade on hover; copy button has clear hover/active; diff lines read clearly with a calm accent rail; unmapped languages show no pill |  |
| `nested-tags-showcase.md` | M9 nested-tag cue and tag-pane guides | Nested `#a/b` tags show a quiet left rail + softer fill vs top-level tags (Reading View); Tags sidebar shows nesting guide rails |  |
| `graph-view-showcase.md` | M9 graph view refinements | Warm-paper background; focused/current node is brighter with an accent ring (local graph); links are quiet; node/ring/link colors follow accent presets |  |
| `highlight-pens-showcase.md` | M10 multi-color highlight pens | Eight `<mark class="...">` colors read as calm tinted bands (not neon) in light/dark; plain `==highlight==` keeps the default color |  |
| `accent-paper-showcase.md` | M10 expanded accents + paper temperature | ink-blue/clay/slate accents follow through links/buttons/selection/graph; warm/cool paper shifts surfaces while keeping ink contrast; both resolve deterministically when over-selected |  |
| `active-path-showcase.md` | M10 current-path / active-note emphasis | Only the active tab/pane title and breadcrumb current segment warm up (follows accent); inactive tabs and parent path stay muted; toggling off restores plain chrome |  |
| `dashboard-showcase.md` | M10 daily/periodic dashboard layout | `cssclasses: [dashboard]` turns Dataview/Tasks blocks into calm paper panels with muted widget headers; composes with `cards`; stays paper-toned (no saturated dashboard) in light/dark |  |
| `task-priority-showcase.md` | M10 task priority palette (opt-in) | With the toggle on, Tasks priorities show a warm-to-cool left rail (highest→lowest reuses progress 1→5); unprioritized tasks stay rail-free; due chip reads warm; toggling off restores the calm default in light/dark |  |
| `paper-panes-showcase.md` | M10 paper panes (opt-in) | With the toggle on and the editor split, each tab group reads as a raised sheet (thin border, soft shadow, rounded, clipped); active pane lifts with accent edge; sidebars stay flat; no double scrollbar; toggling off restores flat chrome in light/dark |  |
| `typewriter-focus-showcase.md` | M10 typewriter focus (Focus-mode sub-toggle) | Requires Focus mode; in Live Preview the focused editor dims inactive lines and keeps the active line sharp, with centered composition room; Reading View untouched; reduce-motion keeps the dim without the fade; light/dark legible |  |
| `bullet-threading-showcase.md` | M12 bullet threading (default-on) | In Live Preview the cursor's list line gets a rounded accent elbow and every ancestor column shows a vertical thread; bullets along the path tint accent; tasks keep checkboxes clear; source mode re-anchors; Reading View untouched; toggling off removes all threads; light/dark + accent presets legible |  |
| `clean-embeds-showcase.md` | M12 clean embeds (opt-in) | With the toggle or the `embed-clean` cssclass, transclusions lose border/background/title and flow with the host note; hover shows a quiet accent rail and the open-link icon; nested embeds stay flat; removing the class restores the card in light/dark |  |
| `content-helpers-showcase.md` | M6 cards/table/Dataview helper classes | Cards wrap cleanly; table-wide/table-small/table-clean remain readable; Dataview table/list views can return to normal by removing classes |  |
| `navigation-showcase.md` | M6 File Explorer, Bookmarks, Search, Outline, Backlinks navigation rails | Folder rails are muted; active file and parent path are visible; no rainbow-folder look appears by default |  |
| `image-figure-gallery-showcase.md` | M6 image / figure / gallery helpers | `img-grid`, `img-wide`, `img-frame`, and `figure-note` are readable, responsive, and reversible |  |
| `research-reading-showcase.md` | Research reading mode | `cssclasses: [research-reading]` works; citations, footnotes, references card, annotation callouts, evidence tables and highlights scan cleanly |  |
| `longform-reading-showcase.md` | Longform reading mode | Chapter rhythm, lead paragraph, drop cap, scene breaks, editorial quote and image/callout spacing feel book-like, not academic |  |
| `focus-mode-showcase.md` | Focus mode 2.0 / Keyboard mode recovery | Focus hint and edge rails appear; ribbon/sidebar/status rails stay discoverable; keyboard focus, Command Palette and Quick Switcher hints work; exit path is obvious |  |
| `publish-print-showcase.md` | M6 Publish / Print / PDF export | Print preview hides chrome; dark mode exports readable light paper; external URLs, footnotes, tables, code, callouts and figures remain readable |  |

Regression notes:

- _Fill during QA._

---

## 3. Light / dark global pass

### Light mode

- [ ] Background surface keeps the Ouroboros warm-paper identity without muddy contrast.
- [ ] Text, muted text, links, tags, callouts and table borders meet comfortable reading contrast.
- [ ] Hover/selected states are visible without looking like generic admin UI.
- [ ] Accent is used as state/edge/ring, not as large saturated blocks.

### Dark mode

- [ ] Primary and secondary surfaces separate clearly without harsh black/gray bands.
- [ ] Code, tables, callouts and plugins retain depth without halo artifacts.
- [ ] Muted labels remain readable in sidebars, Properties, Bases and Canvas controls.
- [ ] Workflow colors remain semantic but subdued.

Evidence:

```text

```

---

## 4. Style Settings variant pass

Check these variants in a clean vault profile. Reset to default between high-risk checks if needed.

| Variant | What to toggle | Pass criteria | Result |
|---------|----------------|---------------|--------|
| Default | No custom Style Settings | Theme looks complete without user setup |  |
| Style packs | Check all six style packs one at a time | Palette, text, borders, links, tags, callouts, and tables stay readable in light/dark |  |
| Content helpers | Enable `cards`, `cards-cover`, `cards-compact`, `table-wide`, `table-small`, `table-clean` | Dataview card grids and helper tables are readable, reversible, and responsive |  |
| Navigation rails | Expand nested File Explorer / Bookmarks / Outline trees | Muted rails, current-path hints, keyboard focus, and active markers are visible but low-noise |  |
| Image helpers | Enable `img-grid`, `img-wide`, `img-frame`, `figure-note` | Images frame quietly; adjacent embeds form a gallery; captions stay muted; mobile does not overflow |  |
| Accent preset | Switch at least two accent presets after enabling one style pack | Accent rings, selected states, buttons and Canvas connectors update consistently without resetting the pack |  |
| Compact UI | Enable compact density | Sidebar, tabs, panes, prompts and plugin cards compress without overlap |  |
| Airy reading | Enable airy reading / spacing controls | Reading width and paragraph rhythm improve without breaking callouts/tables |  |
| Reading width | Step the width tier and set an advanced custom width (Readable line length ON) | Tier widens/narrows the column; advanced value overrides the tier; clearing it falls back to the tier; modes/packs still win |  |
| Numbered headings | Enable numbered headings, view a multi-level note in Reading View and Live Preview | H1–H4 numbered, reset per note, callout headings excluded; toggling off fully removes numbers |  |
| CJK mode | Enable CJK typography mode | Chinese paragraphs, headings and punctuation spacing remain balanced |  |
| Fancy code/highlight | Enable code/highlight options | Code blocks and inline highlights stay legible in both themes |  |
| Code language labels | Default on; toggle off and on | Language pills appear on fenced blocks in Reading View, fade on hover, and fully disappear when off; unmapped languages show no pill |  |
| Research reading | Enable globally and compare note-level class | Global toggle and `cssclasses` version share the same visual language |  |
| Longform reading | Enable globally and compare note-level class | Global toggle and `cssclasses` version share the same visual language |  |
| Focus mode | Enable focus mode | Chrome is dimmed, not lost; rails/hint/hover/focus recovery work |  |
| Keyboard mode | Enable keyboard mode alone and with focus mode | Focus rings, prompt hints, selected suggestion states, and Enter/Esc affordances are readable |  |
| Publish / Print | Open print preview and, when available, Obsidian Publish | Chrome is hidden in print; URLs/footnotes/tables/code/callouts/figures are readable; Publish sidebars inherit theme tokens |  |
| Reduce motion | Enable reduce motion / OS reduced motion | Transitions are quiet, infinite loading pulses stop, smooth scrolling is disabled, and no essential state depends on animation |  |

Notes:

- _Fill during QA._

---

## 5. Core Obsidian UI pass

- [ ] File Explorer / Bookmarks / Search / Outline tree hierarchy is consistent.
- [ ] M6 navigation rails are muted, and the active file plus parent folder path are visible without rainbow-folder styling.
- [ ] Search result match highlights are visible but not loud.
- [ ] Command Palette and Quick Switcher prompt selected row, match text and hotkey pills are aligned.
- [ ] Properties / File properties / All properties show keys, values, tags, links, invalid/warning states and empty states clearly.
- [ ] Menus, modals, inputs and buttons follow the same radius, border and shadow language.
- [ ] Status bar remains readable in normal mode and recoverable in Focus mode.

Evidence:

```text

```

---

## 6. Knowledge workflow pass

- [ ] `[!decision]` reads as a durable decision record.
- [ ] `[!risk]` reads as a warning/risk block without alarming saturation.
- [ ] `[!principle]` reads as a rule/principle block.
- [ ] `[!insight]` reads as a distilled insight or learning.
- [ ] `[!cycle]` reads as an iteration/retro loop.
- [ ] Canvas workflow map looks like a quiet knowledge map, not a dashboard widget.
- [ ] Research and Longform modes remain visually distinct: research scans evidence; longform supports immersion.

Evidence:

```text

```

---

## 7. Plugin / workbench pass

- [ ] Bases table/list/card/filter/sort/group chips retain alignment and selected states.
- [ ] Dataview tables and inline fields keep readable row rhythm.
- [ ] Dataview `cards` / `cards-cover` / `cards-compact` helpers wrap cleanly and stay reversible by removing note cssclasses.
- [ ] Table helper classes `table-wide` / `table-small` / `table-clean` preserve contrast and mobile overflow behavior.
- [ ] Image helper classes `img-grid` / `img-wide` / `img-frame` / `figure-note` preserve caption readability and mobile overflow behavior.
- [ ] Print/PDF export hides app chrome and keeps URLs, footnotes, tables, code blocks, callouts and figures readable.
- [ ] Obsidian Publish-like surfaces inherit theme sidebars, search, navigation and markdown tokens.
- [ ] Tasks plugin states and progress bars match `tasks-showcase.md`.
- [ ] Kanban cards/lists use theme surfaces and do not inherit clashing plugin colors.
- [ ] Calendar, Full Calendar, and Git surfaces avoid hard-coded bright foreground color regressions.
- [ ] Canvas controls, minimap, node colors and selection rings pass in both light and dark.
- [ ] Selector-level integrations match `docs-code-ai/PLUGIN-COMPATIBILITY-AUDIT.md` and do not make full-preview claims.
- [ ] Legacy DB Folder coverage is treated as `.db-table-view` selector-only.
- [ ] Any plugin not directly styled degrades gracefully to core Obsidian tokens.
- [ ] Plugin gaps and unsupported claims match `docs-code-ai/KNOWN-LIMITATIONS.md`.

Known plugin gaps to copy into `docs-code-ai/KNOWN-LIMITATIONS.md`:

- _Fill during QA; release notes should copy/adapt `docs-code-ai/KNOWN-LIMITATIONS.md` section 1._

---

## 8. Mobile and accessibility pass

Run this on a mobile device or by narrowing the Obsidian window when device testing is unavailable.

- [ ] Mobile toolbar/FAB foreground has enough contrast against accent surfaces.
- [ ] Touch targets remain large enough after compact settings.
- [ ] Long note reading does not create horizontal scrolling.
- [ ] Canvas and Bases remain usable or degrade gracefully in narrow width.
- [ ] Focus visible states are present for keyboard navigation.
- [ ] Keyboard mode strengthens focus rings without overwhelming sidebars or prompts.
- [ ] Command Palette / Quick Switcher show keyboard instructions and selected-row Enter affordance.
- [ ] Reduced motion does not hide state changes.
- [ ] No interaction path requires hover only; Focus mode has focus-based recovery.

Evidence:

```text

```

---

## 9. README / screenshot sync pass

Run this whenever screenshots, README claims, or release copy change.

- [ ] `README.md` and `README_CN.md` embed `screenshot.png` with descriptive alt text.
- [ ] `screenshot.png` is 512×288 and represents the same scene as `_resources/img/image-comparison-v1.png`.
- [ ] README feature claims are covered by preview fixtures or marked as conservative compatibility / known-limitations notes.
- [ ] Development instructions use relative repo links, not local absolute paths.
- [ ] Preview QA instructions point to `preview/CHECKLIST.md` and `npm run sync:vault -- /path/to/vault --preview`.
- [ ] If screenshot content changed, note the source image and validation result in release notes.

Evidence:

```text

```

---

## 10. Regression flags and sign-off

A release-quality pass must stop if any item below is true.

- [ ] Style Settings panel fails to load or omits new toggles.
- [ ] `npm run check` fails.
- [ ] Light or dark mode makes normal text, sidebar labels or selected rows unreadable.
- [ ] Focus mode hides navigation with no visible recovery path.
- [ ] Canvas nodes/edges become unreadable in either theme.
- [ ] README screenshots or feature claims no longer match preview files.
- [ ] Plugin compatibility claims exceed what `plugin-showcase.md`, this checklist, `PLUGIN-COMPATIBILITY-AUDIT.md`, and `KNOWN-LIMITATIONS.md` cover.

Final sign-off:

| Role | Name | Result | Notes |
|------|------|--------|-------|
| Visual QA |  |  |  |
| Release owner |  |  |  |

Next gate: after visual sign-off, use `docs-code-ai/RELEASE-CHECKLIST.md` for version, tag, GitHub Release, community-theme metadata, and post-release smoke checks.
