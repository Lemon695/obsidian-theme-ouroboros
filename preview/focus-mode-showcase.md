---
tags:
  - ouroboros/preview
  - theme/focus-mode
aliases:
  - Ouroboros Focus Mode Showcase
status: draft
created: 2026-05-21
---

# Focus Mode Showcase

Use this note to test the global **Focus mode** and **Keyboard mode** Style Settings toggles. These are app-level body classes, so this note does not enable them by itself.

## Setup

1. Open Style Settings → Ouroboros Theme → New Features.
2. Enable **Focus mode**.
3. Enable **Keyboard mode** for the combined Focus + Keyboard pass.
4. Keep this note open in Reading View and Live Preview.
5. Test with left sidebar, right sidebar, ribbon, status bar, Command Palette, and Quick Switcher visible before enabling the mode.

## Expected behavior

- A small “Focus mode” hint appears near the top-right after enabling the mode.
- Left and right sidebars are dimmed, not gone; they remain discoverable as edge recovery rails.
- Hovering either sidebar restores it to full opacity.
- Tabbing into a sidebar or ribbon restores it via `:focus-within`.
- The ribbon remains slightly visible and recovers on hover/focus.
- The status bar remains faintly visible and recovers on hover/focus.
- Main reading content remains calm and uninterrupted.
- Focus mode edge rails remain visible without covering content.
- Keyboard mode adds a small keyboard hint and stronger focus rings.
- Command Palette / Quick Switcher show navigation instructions and a clearer selected row.

## Recovery checks

- Move the pointer to the left sidebar area: File Explorer / Search should become readable again.
- Move the pointer to the right sidebar area: Backlinks / Outline should become readable again.
- Move the pointer to the ribbon: icons should become readable again.
- Use keyboard navigation to focus a sidebar item: the rail should recover without a mouse.
- Open Command Palette (`Cmd/Ctrl+P`) and Quick Switcher (`Cmd/Ctrl+O`): selected rows, match text, hotkey pills, and Enter hint should remain readable.
- Disable Keyboard mode: command/switcher keyboard hints and stronger focus rings should return to normal.
- Disable Focus mode in Style Settings: all chrome should return to normal.

> [!principle]
> Focus mode must never strand the user. Any chrome that gets dimmed needs a visible recovery path.


## Keyboard mode pass

- [ ] The global Keyboard mode hint is visible when Focus mode is off.
- [ ] Focus + Keyboard mode uses the combined prompt hint.
- [ ] `Tab` focus rings are stronger but not visually noisy.
- [ ] Command Palette / Quick Switcher selected rows show a quiet accent rail and Enter marker.
- [ ] `Esc` returns to the focused note without leaving sidebars stranded.
