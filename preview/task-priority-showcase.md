---
cssclasses: []
---

# Task Priority Showcase

> Verifies the N5 task priority palette (opt-in). Enable **Style Settings →
> Features → New Features → Task priority palette**, then open this note with the
> **Tasks** plugin installed. Tasks-plugin priorities are mapped to the warm
> progress 5-color ramp as a quiet left rail, so a priority list reads
> warm-to-cool — urgent at the top, calm at the bottom — like a Things workbench.
>
> Mapping (reuses the existing progress palette, no new colors):
>
> | Priority | Token | Hue |
> |----------|-------|-----|
> | highest 🔺 | `--progress-color-1` | warm red |
> | high ⏫ | `--progress-color-2` | amber |
> | medium 🔼 | `--progress-color-3` | yellow |
> | low 🔽 | `--progress-color-4` | green |
> | lowest ⏬ | `--progress-color-5` | cool slate |
>
> DOM honesty: a CSS-only theme cannot compute date proximity. The Tasks plugin
> emits `data-task-priority` (reliable) but no runtime "overdue / today" class, so
> urgency is carried by the priority ramp and a warm due chip — never by
> fabricated date math. Tasks with no priority (`data-task-priority="none"`) stay
> intentionally unstyled so the list stays quiet.

## Priority ramp (Tasks query)

```tasks
not done
sort by priority
group by priority
```

## Inline priority examples

- [ ] Ship the release candidate 🔺 📅 2026-06-05
- [ ] Draft the changelog ⏫ 📅 2026-06-08
- [ ] Review preview fixtures 🔼
- [ ] Tidy the docs index 🔽
- [ ] Archive old screenshots ⏬
- [ ] A task with no priority stays quiet

## How to test

1. Turn **Task priority palette** on in Style Settings. With the toggle off,
   every task should look identical to the calm default (no rails, neutral due
   chips) — confirm the feature is fully opt-in.
2. Open this note in **Reading View** with the Tasks plugin installed. The
   `tasks` query block should render priority groups, each list item carrying a
   thin left rail whose color follows the ramp above (warm red → cool slate).
3. Confirm the unprioritized task has **no** rail.
4. The due chip (`📅`) should read warm — separated from neutral start /
   scheduled / recurring chips — without claiming the date is near or overdue.
5. Check light and dark mode: rails stay low-saturation paper-friendly cues, and
   no priority reads as a loud alert block.
6. Switch accent presets and paper temperature: the ramp is driven by the
   progress palette, so it stays stable and does not fight the accent.
