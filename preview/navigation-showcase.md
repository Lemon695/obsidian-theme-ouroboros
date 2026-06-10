---
tags:
  - theme/navigation
  - theme/m6
cssclasses:
  - ouroboros-preview
aliases:
  - Ouroboros Navigation Showcase
---

# Navigation Showcase

This note tests **M6-3 Folder Accent 导航增强**.

The feature is intentionally quiet: it adds muted rails, current-path hints, and clearer active rows without turning the File Explorer into rainbow folders.

## Manual setup

1. Put this note inside a nested folder path, for example `Theme Preview/Ouroboros/preview/navigation-showcase.md`.
2. Open File Explorer and expand several parent folders around this note.
3. Open Bookmarks, Search, Outline, and Backlinks side panes.
4. Switch between light/dark mode and at least one M6 style pack.

## File Explorer checks

Expected:

- Folder children show a muted left rail.
- Hover/focus on a folder gently strengthens that rail.
- The active file row uses a quiet surface and a slim accent marker.
- Parent folders containing the active note receive a current-path hint.
- Folder icons/collapse chevrons use accent only on active/hover states.
- There is no high-saturation rainbow folder system by default.

## Bookmarks / Outline / Backlinks checks

Expected:

- Nested tree levels keep subtle indentation rails.
- Active/selected rows use the same quiet current-path language as File Explorer.
- Count flairs remain small pills.
- Backlink search-result matches keep calm hover behavior.

## Search checks

Search for `Ouroboros` or `theme/m6`.

Expected:

- Search result cards still use warm surfaces.
- Active result titles share the low-noise current-row treatment.
- Match highlights remain readable without overpowering the file title.

> [!principle]
> Navigation should answer “where am I?” without making the vault look like a dashboard.

---

## QA notes

- [ ] Nested folder rails are visible but not decorative.
- [ ] Current-path hint survives light/dark and style-pack changes.
- [ ] Keyboard focus states remain visible.
- [ ] Compact UI does not collapse rails or active markers.
- [ ] Mobile side pane remains readable.
