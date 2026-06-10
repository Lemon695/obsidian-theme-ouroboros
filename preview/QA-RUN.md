# Ouroboros Release Candidate QA Run

> Milestone: M7 — Release Candidate 实测门禁
> Purpose: keep one concrete run record beside the preview fixtures before broad vault deployment.

This file is the bridge between automated checks and manual Obsidian visual QA. Use `CHECKLIST.md` for the full pass; summarize the actual evidence here so release decisions do not depend on memory.

---

## 0. Current run snapshot

| Field | Value |
|-------|-------|
| Run date | 2026-05-21 |
| Run type | Dev01 release-candidate sync |
| Source branch | `feature/code-v20260521` |
| Theme source at first sync | `af260ec` + M7 QA gate files |
| Test vault | `/Users/su/Documents/Obsidian/Dev01` |
| Theme target | `/Users/su/Documents/Obsidian/Dev01/.obsidian/themes/Ouroboros` |
| Preview target | `/Users/su/Documents/Obsidian/Dev01/Theme Preview/Ouroboros/preview` |
| Broad vault deployment | Deferred until this file has manual visual evidence |

---

## 1. Automated gate evidence

Run these before visual sign-off:

```bash
npm run build
npm run check
node --check check-theme.mjs
node --check sync-theme-to-vault.mjs
git diff --check
node sync-theme-to-vault.mjs /Users/su/Documents/Obsidian/Dev01 --preview --clean-lowercase
node sync-theme-to-vault.mjs /Users/su/Documents/Obsidian/Dev01 --dry-run --preview
```

Result log:

```text
2026-05-21 automated preflight:
- npm run build: passed; theme.css built from 10 source files.
- npm run check: passed; Theme checks passed.
- node --check check-theme.mjs: passed.
- node --check sync-theme-to-vault.mjs: passed.
- Temporary lowercase-theme sync simulation: passed; exact directory entry normalized from `ouroboros` to `Ouroboros`.
- node sync-theme-to-vault.mjs /Users/su/Documents/Obsidian/Dev01 --preview --clean-lowercase: passed after fixing case-insensitive lowercase cleanup guard.
- node sync-theme-to-vault.mjs /Users/su/Documents/Obsidian/Dev01 --dry-run --preview: passed; target paths reported without writes.
- Verified target files: .obsidian/themes/Ouroboros/theme.css and manifest.json exist.
- Verified preview evidence file: Theme Preview/Ouroboros/preview/QA-RUN.md exists.
```

---

## 2. Manual QA matrix

Open the synced preview folder in Obsidian and record concrete evidence.

| Area | Required evidence | Result |
|------|-------------------|--------|
| Light / dark global pass | Normal notes, sidebars, selected rows, callouts, tables, code | Pass — `core-showcase` light smoke and `content-helpers-showcase` / `publish-print-showcase` dark smoke were readable. |
| Style packs | Classic Paper, Things Warm, Research Desk, Longform Book, Night Ink, Low Contrast Calm | Pass — parser/check gate covers all six; live Night Ink toggle smoke with Focus/Keyboard stayed readable. |
| Content helpers | `cards`, `cards-cover`, `cards-compact`, `table-wide`, `table-small`, `table-clean` | Pass — `content-helpers-showcase` rendered Dataview cards and helper tables in light, dark, and narrow window. |
| Navigation | File Explorer, Bookmarks, Search, Outline rails and current-path highlight | Pass — left ribbon/sidebar/status surfaces stayed visible in normal and Focus/Keyboard smoke; no rainbow-folder styling observed. |
| Images / figures | `img-grid`, `img-wide`, `img-frame`, `figure-note`, mobile/narrow width | Pass — `image-figure-gallery-showcase` dark smoke showed framed figure, SVG gallery assets, and caption hierarchy without overflow. |
| Focus / keyboard | Focus mode recovery, Keyboard mode focus rings, Command Palette / Quick Switcher hints | Pass — temporary Style Settings data enabled `preset-night-ink`, `focus-mode`, and `keyboard-mode`; Command Palette and Quick Switcher hints/selected rows were visible; settings restored after QA. |
| Publish / print | Print preview, PDF export, external URLs, footnotes, tables, code, callouts, figures | Pass with note — `publish-print-showcase` dark visual smoke and automated `@media print` checks passed; no PDF file generated in this run. |
| Plugin surfaces | Bases, Dataview, Tasks, Kanban, Calendar, Canvas, Git | Pass — `plugin-showcase` Dataview/Tasks fixtures rendered; remaining plugin-specific rows are conservative checklist claims backed by compatibility docs. |
| Mobile / accessibility | Narrow window, touch target spacing, no horizontal overflow, reduced motion | Pass — Obsidian window narrowed to roughly 900px; content helpers and focus surfaces remained readable without visible horizontal overflow. |

Evidence links / screenshots:

- Live Obsidian 1.12.7 visual evidence observed through Computer Use app-state screenshots for `core-showcase`, `content-helpers-showcase`, `image-figure-gallery-showcase`, `publish-print-showcase`, `focus-mode-showcase`, Quick Switcher, Command Palette, and `plugin-showcase`.
- `screencapture -x preview/qa-evidence/2026-05-21-m7-content-helpers-dark.png` could not export a PNG in this environment (`could not create image from display`), so no binary screenshot artifact was committed.
- Dev01 temporary QA settings restored after smoke: `appearance.json` returned to `{"cssTheme":"Ouroboros","theme":"moonstone"}` and Style Settings data returned to its pre-run absent state.

Known issues promoted to docs:

- None from this smoke. Existing selector/plugin caveats remain in `docs-code-ai/KNOWN-LIMITATIONS.md` and `docs-code-ai/PLUGIN-COMPATIBILITY-AUDIT.md`.

---

## 3. Release decision

| Decision | Owner | Date | Notes |
|----------|-------|------|-------|
| Continue visual QA | Codex / OMX | 2026-05-21 | Completed for release-candidate smoke; repeat full checklist before public release if screenshots change. |
| Ready for all-vault sync | Codex / OMX | 2026-05-21 | Yes — M7 gate permits `build-v1.sh --dry-run --preview` first, then explicit all-vault sync if paths look correct. |
| Ready for version/tag/release | Codex / OMX | 2026-05-21 | Conditional — ready after all-vault sync decision and final release checklist/version decision. |

Release rule: do not run all-vault deployment from `build-v1.sh` until this run has at least one completed manual visual pass or an explicit override note.

---

## 4. M11 differentiation regression confirmation (2026-06-02)

> Milestone: M11-3 — 竞品吸收对照验收收尾。
> Scope: confirm the M8 consistency fixes and the M9/M10 differentiation features added since the M7 run are present, build-clean, and gate-covered before a release-candidate decision.

### 4.1 Automated gate evidence

```text
2026-06-02 M11-3 automated regression:
- npm run build: passed; Built theme.css from 10 source files.
- npm run check: passed; Theme checks passed.
- node --check check-theme.mjs: passed.
- node --check sync-theme-to-vault.mjs: passed.
- node --check build-theme.mjs: passed.
- git diff --check: no whitespace/conflict errors.
- Preview fixtures present: 24 *-showcase.md files.
- Regression gates registered: 25 validate* functions in check-theme.mjs.
- Built theme.css size: 247,310 bytes from 10 source files.
```

### 4.2 New differentiation surfaces since the M7 manual matrix

These M9/M10 features did not exist at the 2026-05-21 manual pass. Each is build-clean
and gate-covered (automated), but still needs a **live Obsidian visual pass** before
screenshots or release notes claim them. This list is the honest pending-QA boundary.

| Feature (milestone) | Style Settings / class | Preview fixture | Gate | Manual visual pass |
|---------------------|------------------------|-----------------|------|--------------------|
| Reading width (M9-1) | `line-width-tier` / `line-width-custom` | `reading-width-showcase.md` | `validateReadingWidth` | Pending |
| Numbered headings (M9-2) | `numbered-headings` | `numbered-headings-showcase.md` | `validateNumberedHeadings` | Pending |
| Code block labels/diff (M9-3) | `code-language-label` | `code-block-showcase.md` | `validateCodeBlocks` | Pending |
| Nested tags (M9-4) | — (auto) | `nested-tags-showcase.md` | `validateNestedTags` | Pending |
| Graph view (M9-5) | — (auto) | `graph-view-showcase.md` | `validateGraphView` | Pending |
| Highlight pens (M10-1) | `<mark class>` | `highlight-pens-showcase.md` | `validateHighlightPens` | Pending |
| Accent + paper temp (M10-2) | `accent-ink-blue/clay/slate`, `paper-warm/cool` | `accent-paper-showcase.md` | `validateAccentPaper` | Pending |
| Active path (M10-3) | `active-path-emphasis` | `active-path-showcase.md` | `validateActivePath` | Pending |
| Dashboard (M10-4) | `dashboard` cssclass | `dashboard-showcase.md` | `validateDashboard` | Pending |
| Task priority (M10-5) | `task-priority-palette` | `task-priority-showcase.md` | `validateTaskPriorityPalette` | Pending |
| Paper panes (M10-6) | `paper-panes` | `paper-panes-showcase.md` | `validatePaperPanes` | Pending |
| Typewriter focus (M10-7) | `typewriter-focus` (sub of `focus-mode`) | `typewriter-focus-showcase.md` | `validateTypewriterFocus` | Pending |
| Reading font (M10-8) | `reading-font` | `reading-font-showcase.md` | `validateReadingFont` | Pending |

### 4.3 Absorption traceability (M11-1 / M11-2)

- Absorption table in `docs-code-ai/Tasks.md` M11 block: 7/7 rows checked, each with delivered
  task + preview fixture + gate + README EN/CN evidence + absorption boundary.
- Boundaries fixed as `docs-code-ai/DECISION-LOG.md` ADR-018 (absorb capability, not over-reach
  aesthetics/interaction) and ADR-019 (DOM honesty: no faked runtime state), plus
  `docs-code-ai/PATTERNS.md` P-016…P-019.

### 4.4 M11 release decision

| Decision | Owner | Date | Notes |
|----------|-------|------|-------|
| Automated regression green | Claude / Lemon695 | 2026-06-02 | build + check + node --check + git diff --check all pass; 24 fixtures, 25 gates. |
| Manual visual pass for M9/M10 surfaces | Lemon695 | Pending | Run the 13 pending rows in §4.2 against a live vault (use `CHECKLIST.md`) before updating screenshots or release notes. |
| Ready for version/tag/release | Lemon695 | Conditional | Hold until §4.2 manual passes complete and version/tag decision is made; theme version stays `1.0.2` until an explicit release task. |
