---
cssclasses:
---

# Nested Tags Showcase

> Verifies the M9-4 nested-tag treatment. Obsidian renders a path tag as a single
> node (no per-segment spans), so the cue is a quiet left rail + softer fill on
> **nested** tags, plus clearer nesting guides in the Tags sidebar. Inline detection
> is Reading-View-only (Live Preview tags carry no path attribute).

## How to test

1. Read this note in Reading View.
2. Top-level tags (#project, #idea) keep the standard pill.
3. Nested tags below should show a subtle left rail and a slightly softer fill, so the
   hierarchy reads without shouting:
   - #project/ouroboros
   - #project/ouroboros/theme
   - #area/research/citations
4. Open the **Tags** sidebar pane: nested tags should display with a quiet vertical
   guide rail indicating parent/child depth; collapsed parents mute their aggregate
   count.

## Inline tags in prose

A planning note tagged #project and #idea, with deeper structure under
#project/ouroboros and #project/ouroboros/theme, and a research branch
#area/research and #area/research/citations. Top-level and nested tags should be
visually distinguishable but both calm.

- Shallow: #status/active
- Deeper: #status/active/this-week
