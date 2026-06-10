---
cssclasses: [dashboard]
---

# Dashboard Showcase

> Verifies the N4 daily / periodic-note dashboard layout. Add
> `cssclasses: [dashboard]` to a daily or periodic note and each Dataview / Tasks
> block becomes a calm paper panel, so the page reads like a quiet board — no
> high-saturation dashboard chrome.
>
> DOM honesty: Obsidian does not wrap "a heading plus the blocks that follow it"
> into one groupable element, so this helper panels each block on its own rather
> than column-flowing the whole note (which would orphan headings). Reuse the
> `cards` helper for true multi-column widget content.

## Today

```dataview
TASK
WHERE !completed AND due = date(today)
```

## Recently created

```dataview
TABLE file.cday AS Created
FROM ""
SORT file.cday DESC
LIMIT 5
```

> [!tip] Composes with cards
> Set `cssclasses: [dashboard, cards]` and each panel still renders its Dataview
> table as a card grid inside the widget — no duplicated layout logic.

## How to test

1. Open this note in **Reading View** with Dataview installed. Each query block
   should sit on a raised paper panel with a thin border and soft shadow.
2. The `## Today` / `## Recently created` headings should read as small, muted,
   uppercase widget labels with a thin accent tick on the left — not full H2s.
3. Switch accent presets: the heading tick should follow the chosen accent.
4. Add `cards` to the `cssclasses` list: panel content should flow into a quiet
   card grid inside each widget.
5. Check light and dark mode — panels stay paper-toned, ink contrast comfortable,
   and nothing reads as a saturated dashboard block.
6. A `> [!tip]` callout keeps its own surface (no double frame) and just shares
   the panel spacing rhythm.
