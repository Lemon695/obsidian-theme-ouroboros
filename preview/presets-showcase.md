---
tags:
  - theme/presets
  - theme/m6
cssclasses:
  - ouroboros-preview
aliases:
  - Ouroboros Preset Showcase
---

# Style Pack Showcase

Use this note to test **M6-1 Preset 风格包** in Style Settings.

Open **Style Settings → Ouroboros Theme → Design Tweaks → Style packs** and enable one style pack at a time:

1. Classic Paper style pack
2. Things Warm style pack
3. Research Desk style pack
4. Longform Book style pack
5. Night Ink style pack
6. Low Contrast Calm style pack

> [!principle] Rule
> Enable only one style pack at a time. If multiple packs are enabled, the lower pack in the Style Settings list wins. Accent presets can still override the accent color only.

## Palette checks

| Surface | Expected behavior |
| --- | --- |
| Primary background | Warm, calm, readable in light and dark mode |
| Secondary background | Clear enough for sidebars and cards, never harsh |
| Border/UI line | Visible without becoming a grid |
| Accent | Supports selected states, links, focus rings, buttons, Canvas connectors |
| Text muted/faint | Still readable for metadata, captions, and tree hierarchy |

## Content rhythm

A style pack should change atmosphere without changing the theme identity. Ouroboros should still feel like a quiet knowledge-work theme, not a loud dashboard.

- Internal link: [[core-showcase]]
- External link: [Obsidian](https://obsidian.md)
- Tags: #style-pack #preview #m6
- Inline code: `body.preset-research-desk`
- Highlight: ==important but quiet==

> A good preset changes the room, not the job.

### Research snippet

> [!insight] Source-heavy notes
> Research Desk should make citations, footnotes, evidence tables, and quote blocks feel stable enough for long analysis sessions.[^1]

| Claim | Evidence | Confidence |
| --- | --- | --- |
| Style packs work through body classes | Style Settings class toggles add body classes | High |
| Accent overrides remain possible | Accent preset classes are declared after style packs | High |
| Dark mode needs separate tuning | Night Ink has explicit dark-mode palette values | High |

### Longform snippet

The Longform Book pack should make prose feel more manuscript-like while keeping Obsidian UI controls practical. Check paragraph rhythm, title weight, headings, blockquotes, and inline highlights in both Reading View and Live Preview.

---

## Manual pass

- [ ] Default theme still looks unchanged when no style pack is enabled.
- [ ] Each style pack changes background, text, UI border, and accent consistently.
- [ ] Light and dark mode are both readable.
- [ ] Accent presets still override only the accent after a style pack is enabled.
- [ ] Research / Longform / Focus toggles remain usable with every style pack.
- [ ] No table, callout, code, tag, or link state loses contrast.

[^1]: Pair this with `research-reading-showcase.md` for research-mode regression checks.
