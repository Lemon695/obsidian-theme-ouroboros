---
tags:
  - ouroboros/preview
  - theme/research-reading
aliases:
  - Ouroboros Research Reading Showcase
cssclasses:
  - research-reading
status: draft
created: 2026-05-21
---

# Research Reading Showcase

This note uses `cssclasses: [research-reading]` so it can test Research Reading Mode without forcing the whole vault into that mode. It should feel like a quiet research desk: readable prose, useful citation affordances, calm tables, and annotations that support synthesis instead of becoming visual noise.

## Abstract

> Research reading mode is designed for source-heavy notes, literature reviews, product teardowns, technical investigations, and long synthesis drafts. It should make references, highlights, quotes, and evidence tables easier to scan while preserving Ouroboros' warm paper tone.

## Source trail

When reading source-heavy material, external links such as [Obsidian Help](https://help.obsidian.md), [Flexoki](https://github.com/kepano/flexoki), and [Things](https://culturedcode.com/things/) should be visibly citable but not look like bright buttons. Internal links such as [[core-showcase]] and [[plugin-showcase]] should still read as normal vault navigation.

A research note often needs highlighted claims. ==This highlighted sentence should look like an intentional marker stroke rather than a full neon rectangle.== The mode should also keep **bold emphasis** and *italic nuance* readable inside dense paragraphs.[^citation-shape]

> [!synopsis]
> Use synopsis blocks to compress a paper, source, or product surface into a one-screen summary.

> [!annotation]
> Annotation blocks should feel like evidence-side comments. They should remain calm enough to sit between quoted material and synthesis paragraphs.

> [!insight]
> Research mode should make insight callouts feel like distilled observations, not task cards.

## Evidence table

| Claim | Source | Confidence | Note |
|------|--------|------------|------|
| Semantic callouts improve retrieval | Vault practice | Medium | Useful when naming is consistent |
| Canvas can act as a knowledge map | Visual QA | Medium | Needs node/edge/minimap polish |
| Footnotes should stay readable | Markdown preview | High | References should not disappear into faint text |

## Footnotes and references

A paragraph can carry multiple references without breaking the line rhythm.[^citation-shape] It can also include a second reference for comparison.[^second-source]

[^citation-shape]: Footnote chips should be small but discoverable, and the reference section should become a quiet card at the bottom of the note.
[^second-source]: This second footnote verifies spacing, reference card rhythm, and back-reference readability.
