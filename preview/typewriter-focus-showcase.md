---
cssclasses: []
---

# Typewriter Focus Showcase

> Verifies the N7 typewriter focus sub-mode (Shimmering Focus influence). Turn
> on **Focus mode** first, then enable **Style Settings → Features → New
> Features → Typewriter focus**. While the editor is focused, inactive lines dim
> and the active line (where the cursor sits) stays full opacity, so your eye
> centers on what you are typing. The editor also gains generous top/bottom room
> so you can keep the active line near the middle of the screen.
>
> Scope and DOM-honesty notes:
>
> - It is a **sub-toggle of Focus mode** (`body.focus-mode.typewriter-focus`),
>   like CJK serif requires CJK mode. With Focus mode off, this does nothing.
> - **Live Preview / source only** — Reading View has no "active line" concept,
>   so it is intentionally untouched.
> - A CSS-only theme cannot **scroll-lock** the active line to the exact vertical
>   center on every keystroke — that needs JavaScript. This delivers the typing
>   focus (dim + emphasis) and centered composition room, not an auto-centering
>   scroll. Use a typewriter-scroll plugin if you need hard centering.
> - The dim uses a short opacity fade that reduce-motion neutralizes (the dim
>   state stays; only the transition is removed).

## Type here to see the effect

Open this note in **Live Preview**, click into the editor, and move the cursor
between these lines. Only the line with the cursor should stay sharp; the others
should fade back.

This is the second paragraph. As you arrow up and down, the active line should
brighten while the surrounding lines dim, keeping your attention on the current
sentence.

A third paragraph so there is enough text to scroll. With the extra vertical
room, you can scroll this line toward the middle of the window and keep writing
from a comfortable, centered position.

## How to test

1. Enable **Focus mode**, then **Typewriter focus**. With Focus mode off,
   confirm Typewriter focus has no effect (sub-toggle dependency).
2. Click into the editor (Live Preview). Inactive lines should dim to ~40%
   opacity; the active line should stay full opacity. Click outside the editor —
   all lines return to normal so reading is unaffected.
3. Arrow up/down through the paragraphs: the emphasis should follow the cursor.
4. Confirm there is generous space above the first line and below the last line,
   so the active line can sit near the screen center as you scroll.
5. Switch to **Reading View**: no dimming should occur (editor-only feature).
6. Turn on **Reduce motion**: the dim should still apply, but without the fade
   transition.
7. Check light and dark mode: dimmed text stays legible-but-recessed, and the
   active line keeps comfortable ink contrast.
