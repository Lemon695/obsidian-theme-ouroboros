# Plugin Compatibility Audit — Ouroboros

> Milestone: M5-4 / M5-5
> Last updated: 2026-05-21
> Purpose: keep README support claims, Obsidian Hub metadata, preview QA, known limitations, and fragile selector risk aligned.

This document is a release gate companion. It does not promise that every plugin state is visually perfect; it defines the support tier, the evidence surface, and the risk notes for each claimed integration.

---

## 0. Evidence sources

- Local theme source: `src/01-foundation.css`, `src/03-mobile.css`, `src/05-plugins-primary.css`, `src/06-plugins-secondary.css`, `src/08-plugin-compat.css`.
- Local preview evidence: `preview/core-showcase.md`, `preview/plugin-showcase.md`, `preview/canvas-workflow.canvas`, `preview/CHECKLIST.md`.
- Known limitations: `docs-code-ai/KNOWN-LIMITATIONS.md`.
- Official plugin id check: `https://raw.githubusercontent.com/obsidianmd/obsidian-releases/master/community-plugins.json` fetched on 2026-05-21.
- Official theme release reference: `https://github.com/obsidianmd/obsidian-sample-theme`.

---

## 1. Support tier definitions

| Tier | Meaning | Public wording |
|------|---------|----------------|
| Tier A — Preview-covered | Theme has explicit CSS and a preview/checklist path for visual QA. | Dedicated styling / preview-covered. |
| Tier B — Selector-level | Theme has explicit CSS selectors, but not all plugin states are represented by preview fixtures. | Selector-level integration; verify in your vault. |
| Tier C — Core-token / companion | Theme relies mainly on Obsidian tokens or exists to enable settings, not as a full plugin surface. | Compatible / companion, not a visual feature claim. |
| Legacy / fragile | Selector exists, but the current official plugin id is missing or the DOM selector is especially brittle. | Legacy selector-only; verify before release. |

Release rule: README can list Tier A and Tier B integrations, but must keep conservative wording and link back to this audit. Legacy/fragile items must not be treated as fully QA-covered.

---

## 2. Public support matrix

| Surface | Official id / view | Tier | Source coverage | Preview evidence | Risk |
|---------|--------------------|------|-----------------|------------------|------|
| Bases | core `bases` | A | `src/05-plugins-primary.css` `.bases-*` and `data-type='bases'` | `preview/plugin-showcase.md` | High: newer core DOM and `.bases-*` classes may change. |
| Properties / File properties / All properties | core view, no community id | A | `src/01-foundation.css` `.metadata-*`, `data-property-type`, `data-type='properties'` | `preview/core-showcase.md` | Medium: Obsidian metadata DOM can evolve. |
| Command Palette / Quick Switcher | core `command-palette`, `switcher` | A | `src/01-foundation.css` `.prompt`, `.suggestion-*` | `preview/core-showcase.md` | Medium: shared suggestion selectors affect autocomplete. |
| Bookmarks / Search / Outline / File Explorer | core `bookmarks`, `global-search`, `outline`, `file-explorer` | A | `src/01-foundation.css` tree/search selectors | `preview/core-showcase.md` | Low-medium: shared tree selectors affect backlinks/outgoing links. |
| Canvas | core `canvas` | A | `src/05-plugins-primary.css` `.canvas-*`, SVG edge selectors, controls, minimap | `preview/canvas-workflow.canvas` | High: Canvas DOM/SVG structure is complex and version-sensitive. |
| Dataview | `dataview` | A | `src/05-plugins-primary.css` Dataview table/list/inline selectors | `preview/plugin-showcase.md` | Medium: plugin output differs by query type. |
| Calendar | `calendar` | A | `src/05-plugins-primary.css` Calendar selectors | `preview/plugin-showcase.md` | Low-medium: small sidebar states should be checked manually. |
| Full Calendar | `obsidian-full-calendar` | A | `src/05-plugins-primary.css` `.fc-*` selectors | `preview/plugin-showcase.md` | Medium: FullCalendar upstream class changes can affect controls. |
| Tasks | `obsidian-tasks-plugin` | A | `src/05-plugins-primary.css` Tasks selectors plus task/progress base styles | `preview/plugin-showcase.md`, `preview/tasks-showcase.md` | Medium: query output and metadata chips vary. |
| Kanban | `obsidian-kanban` | A | `src/06-plugins-secondary.css` `.kanban-plugin*` selectors | `preview/plugin-showcase.md` | Medium: board/lane/card DOM can change. |
| Obsidian Git | `obsidian-git` | A | `src/06-plugins-secondary.css` source-control/git selectors | `preview/plugin-showcase.md` | Medium: plugin view labels/classes change across releases. |
| Todoist Sync | `todoist-sync-plugin` | B | `src/05-plugins-primary.css` `.todoist-*`, `.task-metadata` selectors | Combined selector-level section in `preview/plugin-showcase.md` | Medium-high: plugin-specific class names and task metadata vary. |
| Excalidraw | `obsidian-excalidraw-plugin` | B | `src/05-plugins-primary.css` Excalidraw selectors | Not fully fixture-backed | Medium: iframe/canvas internals are plugin-owned. |
| Hover Editor | `obsidian-hover-editor` | B | `src/05-plugins-primary.css` `.popover.hover-editor` | Not fully fixture-backed | Medium: popover/header DOM may change. |
| Banners | `obsidian-banners` | B | `src/05-plugins-primary.css` `.obsidian-banner-*` | Not fully fixture-backed | Medium: plugin has multiple banner layouts. |
| Checklist | `obsidian-checklist-plugin` | B | `src/06-plugins-secondary.css` `.checklist-plugin-main` | Combined selector-level section in `preview/plugin-showcase.md` | Medium: plugin layout modes vary. |
| Outliner | `obsidian-outliner` | B | `src/06-plugins-secondary.css` indentation/list selectors | Not fully fixture-backed | Low-medium: mostly inherits lists and guides. |
| Timeline | `obsidian-timeline` | B | `src/06-plugins-secondary.css` Timeline selectors | Combined selector-level section in `preview/plugin-showcase.md` | Medium: multiple timeline plugins exist; this targets official id. |
| Style Settings | `obsidian-style-settings` | C | `src/07-style-settings.css` `@settings` block | `npm run check` validates syntax | Low: companion plugin, not a visual surface. |
| DB Folder | no official id found on 2026-05-21 | Legacy / fragile | `src/06-plugins-secondary.css` `.db-table-view` | Combined selector-level section in `preview/plugin-showcase.md` | High: keep as legacy selector-only until an official id is confirmed. |

---

## 3. `src/08-plugin-compat.css` policy

`src/08-plugin-compat.css` should stay conservative and use official ids only. Current required community ids are:

```text
dataview
calendar
obsidian-full-calendar
obsidian-tasks-plugin
todoist-sync-plugin
obsidian-excalidraw-plugin
obsidian-hover-editor
obsidian-banners
obsidian-checklist-plugin
obsidian-kanban
obsidian-outliner
obsidian-timeline
obsidian-git
obsidian-style-settings
```

Do not add plugin ids just because a plugin inherits Obsidian default styles. Add an id only when one of these is true:

1. The plugin has explicit CSS in `src/05-plugins-primary.css` or `src/06-plugins-secondary.css`.
2. The plugin is a required companion for an exposed theme feature, such as `obsidian-style-settings`.
3. A preview/checklist path or compatibility audit note exists.

---

## 4. Fragile selector registry

| Selector / family | File | Risk | Mitigation |
|-------------------|------|------|------------|
| `.view-action:nth-last-of-type(2)` | `src/03-mobile.css` | High: depends on Obsidian mobile toolbar order, not a stable semantic class. | Keep documented comment; test mobile before release; do not expand claims beyond mobile FAB visual polish. |
| `.bases-*` and `data-type='bases'` | `src/05-plugins-primary.css` | High: Bases is newer and may change DOM/class names. | Use `preview/plugin-showcase.md`; inspect live DOM before future Bases edits. |
| `.canvas-*`, `.canvas-edges path`, `.canvas-minimap*` | `src/05-plugins-primary.css` | High: Canvas uses nested SVG and interaction layers. | Keep old selector fallbacks where present; use `preview/canvas-workflow.canvas`. |
| `.metadata-*`, `data-property-type`, `data-property-count` | `src/01-foundation.css` | Medium: Properties View has modern DOM and app variables. | Prefer `--metadata-*` variables before deeper DOM selectors. |
| `.prompt` / `.suggestion-*` | `src/01-foundation.css` | Medium: shared by command palette, quick switcher, autocomplete, and metadata suggestions. | Test command palette, quick switcher, and property suggestions together. |
| `.fc-*` | `src/05-plugins-primary.css` | Medium: FullCalendar upstream class names are third-party. | Keep styles broad and token-based; verify if Full Calendar updates. |
| `.db-table-view` | `src/06-plugins-secondary.css` | High: legacy DB Folder selector with no current official plugin id found. | Keep selector-only; do not list in `@plugins`; mark legacy in README/audit. |

---

## 5. README wording rules

- Use “dedicated styling” for Tier A and Tier B only when the plugin/core surface appears in this audit.
- Use “preview-covered” only for surfaces with explicit preview/checklist coverage.
- Use “legacy selector-only” for DB Folder until an official id and live DOM are verified.
- Do not claim support for plugins removed from `src/08-plugin-compat.css` unless a new audit row is added.
- If a plugin is added to README, update this audit, `src/08-plugin-compat.css`, `preview/plugin-showcase.md`, and `check-theme.mjs` in the same change.

---

## 6. M5-5 known limitations mapping

M5-5 moved release-facing caveats into `docs-code-ai/KNOWN-LIMITATIONS.md`. Keep this mapping in sync with that public limitations file:

| Audit risk | Public limitations destination | Release-note status |
|------------|--------------------------------|---------------------|
| Mobile FAB uses `.view-action:nth-last-of-type(2)` | `KNOWN-LIMITATIONS.md` section 3 | Must mention until a stable mobile action selector is confirmed. |
| DB Folder legacy `.db-table-view` only | `KNOWN-LIMITATIONS.md` sections 3 and 4 | Must mention until an official id and live DOM are confirmed. |
| Tier B selector-level plugins lack complete fixtures | `KNOWN-LIMITATIONS.md` sections 1, 3, and 4 | Must remain selector-level wording in README/release notes. |
| Bases / Canvas / Properties / prompt / Full Calendar are version-sensitive | `KNOWN-LIMITATIONS.md` section 3 | Must be manually QA'd against the release target app/plugin versions. |
| Plugins absent from this audit | `KNOWN-LIMITATIONS.md` section 4 | Unsupported / not claimed as dedicated integrations. |
