---
cssclasses:
---

# Active Path Showcase

> Verifies the N3 current-path / active-note emphasis. The current note gets a
> warm, low-noise cue while everything else stays muted — so you can always tell
> which tab and pane are focused without the chrome getting loud.
>
> DOM honesty: Obsidian's core status bar has **no native breadcrumb** element,
> so this feature emphasizes the two real "current path" surfaces — the
> view-header breadcrumb path and the tab title — instead of faking one.

## How to test

1. Open Style Settings → New Features → **Active path emphasis** (on by default).
2. Open this note inside a nested folder so the **view-header breadcrumb** shows
   `folder › subfolder › Active Path Showcase`. The parent segments and the
   `›` separators should read as quiet path context; the current title leans warm.
3. Open two or three tabs. Only the **active tab** title should pick up the warm
   accent tint and a thin 2px accent rail along its top edge. Inactive tabs stay
   muted — the tab strip as a whole should still feel calm.
4. Split the workspace into two panes and click between them. The **active pane's**
   view-header title should warm up, marking which pane has focus.
5. Switch accent presets (moss / amber / sage / ink-blue / clay / slate). The warm
   cue should follow the chosen accent every time — it is `color-mix`-ed from
   `--interactive-accent`, never a hard-coded blue.
6. Toggle the feature off: the active tab, pane title, and breadcrumb should fall
   back to the default muted chrome with no warm cue.

## What stays low-noise

- Only the **current** item is emphasized (`.is-active` tab, `.mod-active` pane).
- Parent breadcrumb segments and inactive tabs keep `--text-muted`.
- The cue is a soft tint + a hairline rail, not a saturated fill — consistent with
  the theme's "decoration serves reading" identity.
