# Known Limitations and Unsupported Plugin Claims — Ouroboros

> Milestone: M5-5
> Last updated: 2026-05-21
> Purpose: public release companion for unsupported plugins, fragile selectors, selector-level integrations, and manual QA requirements.

This file is intentionally conservative. It does not mean the theme will break with every item below; it means Ouroboros does not currently make a full preview-covered support claim for that area.

Use this document together with:

- `docs-code-ai/PLUGIN-COMPATIBILITY-AUDIT.md` — exact plugin ids, support tiers, and fragile selector registry.
- `preview/CHECKLIST.md` — manual visual QA gate.
- `docs-code-ai/RELEASE-CHECKLIST.md` — release operation gate and release-notes sign-off.

---

## 1. Release-note summary

Copy or adapt this block for release notes until a live QA pass proves otherwise:

```text
Known limitations:
- Selector-level integrations such as Todoist Sync, Excalidraw, Hover Editor, Banners, Checklist, Outliner, and Timeline should be verified in your own vault before relying on exact plugin layout parity.
- DB Folder is legacy selector-only (`.db-table-view`) and is not listed in theme metadata until an official plugin id and live DOM are confirmed.
- Mobile FAB styling depends on Obsidian mobile toolbar order via `.view-action:nth-last-of-type(2)` and requires manual mobile QA before release.
- Bases, Canvas, Properties, prompt/suggestion surfaces, and Full Calendar are version-sensitive and should be checked against the target Obsidian/plugin version.
- Plugins not listed in the compatibility audit inherit core Obsidian tokens where possible, but they are not dedicated support claims.
```

---

## 2. Support status definitions

| Status | Meaning | Public wording |
|--------|---------|----------------|
| Preview-covered | Explicit CSS plus preview/checklist coverage exists. | Dedicated styling / preview-covered. |
| Selector-level | Explicit selectors exist, but rich plugin-state fixtures are incomplete. | Selector-level integration; verify in your vault. |
| Legacy selector-only | A selector remains for old or ambiguous plugin DOM, but no official id / live DOM is confirmed. | Legacy selector-only; not metadata-listed. |
| Unsupported / not claimed | No dedicated theme CSS or QA claim exists. | Inherits core tokens where possible; unsupported as a dedicated integration. |

---

## 3. Known limitations

| Area | Status | User-visible risk | Required action before public release |
|------|--------|-------------------|---------------------------------------|
| Bullet threading | By-design scope cap | Editor only (Reading View has no cursor); covers 6 indent levels; x-offsets assume Obsidian's default ~2em/level indent (tab size 4); on active list lines the threading elbow takes the `::before` slot, superseding the `active-line` rail. | Document in release notes; users with custom tab size retune `--ouroboros-thread-indent`; toggle off via Style Settings if undesired. |
| Mobile FAB | Fragile selector | `.view-action:nth-last-of-type(2)` depends on mobile toolbar ordering; Obsidian mobile changes can target the wrong action. | Run mobile/narrow-window QA and keep release notes caveat unless a stable semantic class is confirmed. |
| DB Folder | Legacy selector-only | `.db-table-view` may still catch DB Folder-style tables, but no official id was confirmed during M5-4. | Do not add DB Folder to `src/08-plugin-compat.css`; verify live DOM before changing wording. |
| Tier B selector-level plugins | Selector-level | Todoist Sync, Excalidraw, Hover Editor, Banners, Checklist, Outliner, and Timeline have CSS hooks but not complete fixture coverage. | Keep README wording as selector-level; ask issue reporters for screenshots and plugin versions. |
| Bases | Version-sensitive preview-covered | Newer core view; `.bases-*` classes or `data-type='bases'` can change. | Inspect live DOM and run `preview/plugin-showcase.md` before release. |
| Canvas | Version-sensitive preview-covered | Complex nested SVG/control DOM can change across Obsidian releases. | Run `preview/canvas-workflow.canvas` in light/dark and inspect controls/minimap/edges. |
| Properties / metadata | Version-sensitive preview-covered | `.metadata-*` and `data-property-*` selectors can change. | Check File Properties and All Properties against the release target app. |
| Prompt / suggestions | Shared selector surface | `.prompt` and `.suggestion-*` affect Command Palette, Quick Switcher, autocomplete, and metadata suggestions. | Test command palette, quick switcher, and property suggestions together. |
| Full Calendar | Third-party class family | `.fc-*` comes from FullCalendar upstream and may change with plugin updates. | Verify toolbar/buttons/calendar cells after plugin updates. |
| Unlisted plugins | Unsupported / not claimed | They may inherit base Obsidian tokens, but no dedicated layout/state QA exists. | Do not describe them as supported unless a compatibility audit row is added. |

---

## 4. Unsupported / not claimed plugin list

The following plugin ids appeared in older compatibility metadata or common Obsidian workflows, but are **not** dedicated support claims for this release:

| Plugin id / family | Current status | Notes |
|--------------------|----------------|-------|
| `sliding-panes-obsidian` | Unsupported / not claimed | Removed from metadata; no current dedicated CSS or preview evidence. |
| `obsidian-codemirror-options` | Unsupported / not claimed | Editor styling should inherit core CodeMirror tokens only. |
| `obsidian-hider` | Unsupported / not claimed | Theme already has CSS-only Focus mode; plugin-specific UI is not covered. |
| `mysnippets-plugin` | Unsupported / not claimed | Snippet manager UI is not part of current QA. |
| `cmenu-plugin` | Unsupported / not claimed | Custom menu plugin UI is not part of current QA. |
| `readwise-official` | Unsupported / not claimed | Imported content should inherit Markdown/content styles; plugin settings/UI are not covered. |
| `tag-wrangler` | Unsupported / not claimed | Tag display inherits core tag styles; plugin-specific modals are not covered. |
| `templater-obsidian` | Unsupported / not claimed | Generated Markdown inherits theme styles; plugin settings/UI are not covered. |
| `obsidian-system-dark-mode` | Unsupported / not claimed | Theme supports light/dark modes directly; plugin-specific controls are not covered. |
| DB Folder / DB table plugins | Legacy selector-only | `.db-table-view` remains as a legacy hook, but this is not a full plugin support claim. |
| Any plugin absent from `PLUGIN-COMPATIBILITY-AUDIT.md` | Unsupported / not claimed | Inherits Obsidian core variables where possible; add an audit row before public support claims. |

---

## 5. Issue-report checklist

When a user reports a limitation or asks for a new plugin claim, request:

- Obsidian app version.
- Plugin name, plugin id, and plugin version.
- OS/device and light/dark mode.
- Enabled Style Settings toggles.
- Screenshot or screen recording of the broken state.
- Minimal note/canvas/query needed to reproduce.
- Whether the issue appears in default Obsidian theme.

Do not add the plugin to README or `src/08-plugin-compat.css` until the issue has a source selector, a support tier, a preview/checklist path, and a risk note in `PLUGIN-COMPATIBILITY-AUDIT.md`.

---

## 6. M5-5 sign-off

- [x] Public known limitations file exists.
- [x] README/README_CN link to this file.
- [x] Release checklist includes this file as an artifact and release-notes input.
- [x] Preview checklist points plugin gaps into this file.
- [x] `check-theme.mjs` validates the file and README links.
