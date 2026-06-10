---
tags:
  - theme/images
  - theme/gallery
  - theme/m6
cssclasses:
  - img-frame
  - img-grid
  - figure-note
aliases:
  - Ouroboros Image Figure Gallery Showcase
---

# Image / Figure / Gallery Showcase

This note tests **M6-4 Image / Figure / Gallery 系统**.

Enabled `cssclasses` in this fixture:

- `img-frame`
- `img-grid`
- `figure-note`

Temporarily add `img-wide` to this note when checking the wide-image pass.

## Framed figure with caption

![Warm paper figure caption](assets/figure-paper.svg)

Expected:

- `figure-note` turns image embeds with alt text into calm figure cards.
- Captions are centered, muted, and italic.
- `img-frame` adds a quiet surface frame instead of a heavy border.

## Gallery grid

![](assets/gallery-research.svg) ![](assets/gallery-ink.svg) ![](assets/figure-paper.svg)

Expected:

- `img-grid` turns adjacent image embeds into a responsive grid.
- Images crop evenly as thumbnails.
- On mobile/narrow panes, the grid collapses to one column.

## HTML figure fallback

<figure class="figure-note">
  <img src="assets/gallery-research.svg" alt="Research desk abstract" />
  <figcaption>HTML figure fallback: useful when you want explicit caption control.</figcaption>
</figure>

Expected:

- HTML `figure.figure-note` and `figcaption` receive the same low-noise styling.
- The image should not double-shadow inside the frame.

## Wide image pass

Add `img-wide` to this note's `cssclasses`, reload the note, and check the first figure again.

Expected:

- Single images can expand beyond normal reading width without overflowing the window.
- Mobile/narrow panes fall back to normal width.
- Wide images stay centered and preserve aspect ratio.

---

## Manual pass

- [ ] `img-frame` makes images feel intentional without heavy decoration.
- [ ] `figure-note` captions are visible only when wanted through alt text or HTML figcaption.
- [ ] `img-grid` wraps adjacent images cleanly.
- [ ] `img-wide` centers and constrains large images.
- [ ] Light/dark and M6 style packs keep image frames readable.
- [ ] Mobile/narrow panes do not overflow horizontally.
