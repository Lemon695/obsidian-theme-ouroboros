---
cssclasses: []
---

# Paper Panes Showcase

> Verifies the N6 paper-panes layering (opt-in, Border influence). Enable
> **Style Settings → Features → New Features → Paper panes**, then split the
> editor so several tab groups are visible at once. Each editor tab group
> (`.workspace-tabs`) becomes a raised paper sheet: a thin border, soft shadow,
> and rounded corners, sitting on a slightly deeper workspace background. The
> active sheet lifts a little more with a quiet accent-tinted edge.
>
> Scope and reliability notes:
>
> - Scoped to the main editor area (`.workspace-split.mod-root`) so the left and
>   right sidebars keep their flat, quiet chrome — depth is reserved for content.
> - Uses `border` + `box-shadow` + `overflow: hidden` only — no pane margins, so
>   the split box model is untouched (Obsidian's split sizing is version-
>   sensitive). Scrolling stays on the inner `.view-content`.
> - The active-pane lift reuses the `--shadow-raised` component token and an
>   accent `color-mix` edge, so it follows every accent preset and composes with
>   Active path emphasis instead of fighting it.

## How to test

1. Turn **Paper panes** on. With it off, panes should look flat exactly as the
   default chrome — confirm the feature is fully opt-in and reversible.
2. Split the editor (drag a tab to the right, or **Split right**) so two or more
   tab groups show side by side. Each group should read as a separate rounded
   sheet with a thin border and soft shadow, separated by a slightly deeper
   gutter.
3. Click between panes: the focused group should lift a little more and show a
   quiet accent-tinted border; inactive groups stay calm.
4. Switch accent presets — the active-sheet edge should follow the accent. Switch
   paper temperature (warm/cool) — sheets and gutter should stay paper-toned with
   comfortable ink contrast.
5. Check light and dark mode. In dark mode the border carries most of the
   separation (shadows are naturally subtler on dark surfaces); no sheet should
   read as a heavy or saturated card.
6. Confirm the **left/right sidebars stay flat** — only the editor area gets the
   sheet treatment.
7. Scroll a long note inside a pane: scrolling stays inside the sheet, the tab
   bar and content corners stay clipped to the radius, and no double scrollbar
   appears.
