---
cssclasses:
  - embed-clean
---

# Clean Embeds Showcase

> Verifies the M12 clean embeds feature (absorbing Minimal's `embed-strict`
> idea). Off by default. Two ways to enable:
>
> 1. Globally: **Style Settings → Ouroboros Theme → New Features → Clean
>    embeds** (`embed-clean` class toggle).
> 2. Per note: add `embed-clean` to the note's `cssclasses` property — this
>    fixture already carries it, so embeds below render clean immediately.
>
> Expected: embedded notes lose the card chrome (left accent bar, raised
> background, padding, title) and read as part of the host note. Hovering an
> embed shows a quiet accent rail on its left edge, and the open-link icon
> keeps its existing hover reveal, so embeds stay discoverable.

## How to verify

Embed any note from your test vault below and compare with the default look
(remove `embed-clean` from this note's properties to flip back):

![[core-showcase]]

With the default chrome, the block above renders as a raised card with a left
accent bar and a title; with clean embeds it should flow like a continuation
of this note — same background, no border, no embed title.

## Nested embeds

If the embedded note itself embeds another note, the nested embed should stay
flat as well instead of falling back to the darker card surface.
