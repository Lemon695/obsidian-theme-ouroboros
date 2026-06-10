---
cssclasses:
---

# Graph View Showcase

> Verifies the M9-5 graph refinements. Graph nodes are canvas-rendered, so CSS only
> feeds **colors** to Obsidian's renderer (it cannot draw per-node DOM). What changed:
> a warm-paper background wash, a brighter focused/current node, an accent
> **current-note ring** (`color-circle`, local graph), and quieter links to cut edge
> noise.

## How to test

1. Open **Graph view** (global) and **Local graph** for this note.
2. Background: should read as warm paper, not a cool blue tint.
3. Local graph: the current note should sit inside an accent **highlight ring**, and the
   focused node should be brighter than its neighbours (not dimmed).
4. Links/edges should be quiet and low-noise; hovering a node should highlight its links
   in a warmer accent.
5. Switch accent presets (moss / amber / sage): node fill, focus ring, and highlighted
   links should follow the chosen accent.

## Linked notes (give the graph some nodes)

This note links to [[code-block-showcase]], [[nested-tags-showcase]],
[[reading-width-showcase]], and [[numbered-headings-showcase]] so the local graph has a
small neighbourhood to render.

Tags for tag-node coloring: #project/ouroboros and #area/research.
