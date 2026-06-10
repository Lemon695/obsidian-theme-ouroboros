---
tags:
  - theme/content-helpers
  - theme/m6
cssclasses:
  - cards
  - cards-cover
  - cards-compact
  - table-wide
  - table-small
  - table-clean
aliases:
  - Ouroboros Content Helpers Showcase
---

# Content Helpers Showcase

This note tests **M6-2 Cards / Table / Dataview helper classes**.

Enabled `cssclasses` in this fixture:

- `cards`
- `cards-cover`
- `cards-compact`
- `table-wide`
- `table-small`
- `table-clean`

> [!principle] Usage rule
> These are note-level helper classes. Use them on index, dashboard, library, research, or collection notes instead of changing the entire theme globally.

## Dataview card grid

```dataview
TABLE status, rating, created, tags
FROM #ouroboros/preview
SORT file.name ASC
```

Expected with `cards`:

- Dataview table rows render as quiet cards.
- The first cell becomes the card title area.
- Links keep accent color without turning into loud buttons.
- Tags/date/status cells stay compact and readable.
- `cards-compact` reduces width, gap, and padding for dense library pages.

## Dataview list cards

```dataview
LIST rows.file.link
FROM #ouroboros/preview
GROUP BY choice(contains(file.tags, "theme/m6"), "M6", "General")
```

Expected:

- Dataview list items use card surfaces.
- Nested result groups keep readable hierarchy.
- Empty or loading states remain quiet.

## Wide small clean table

| Area | Helper | Expected effect | Risk to watch |
| --- | --- | --- | --- |
| Research index | `table-wide` | Wider table rhythm without stretching every note | Too wide on small windows |
| Dense status matrix | `table-small` | Smaller padding and compact numeric rhythm | Text becoming cramped |
| Publish-ready appendix | `table-clean` | Row-focused separators with fewer vertical grid lines | Lost column hierarchy |
| Library cards | `cards` | Turns Dataview table/list output into card grids | Overusing cards for prose notes |
| Cover gallery | `cards-cover` | First-cell images act as covers | Missing image fallback |
| Dense collection | `cards-compact` | More cards per row | Small touch targets on mobile |

## Pairing guide

| Goal | Classes |
| --- | --- |
| Visual collection index | `cards cards-cover` |
| Dense project tracker | `cards cards-compact table-small` |
| Research evidence table | `table-wide table-clean` |
| Appendix / release matrix | `table-wide table-small table-clean` |

---

## Manual pass

- [ ] Toggle light/dark mode and verify card surface contrast.
- [ ] Disable `cards-compact` and confirm card spacing becomes more comfortable.
- [ ] Remove `cards` and confirm Dataview returns to normal table/list styling.
- [ ] Remove `table-clean` and confirm grid borders return.
- [ ] Test mobile/narrow pane: cards should wrap; wide tables should scroll rather than break the pane.
