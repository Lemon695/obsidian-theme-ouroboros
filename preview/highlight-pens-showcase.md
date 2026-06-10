---
cssclasses:
---

# Highlight Pens Showcase

> Verifies the N1 multi-color highlight pens. Colors are low-saturation and
> paper-friendly (no neon). Apply with `<mark class="green">…</mark>` in Reading
> View, or via a highlight plugin that emits these classes. `==text==` in Live
> Preview stays the default highlight (it can't carry a per-instance class).

## How to test

1. Read this note in Reading View.
2. Each colored highlight below should read as a calm tinted band with normal,
   legible text — not a fluorescent block.
3. Check both light and dark mode; dark uses a slightly stronger tint.
4. A plain `==highlight==` should still use the default highlight color.

## The eight pens

- <mark class="red">red pen</mark> — for warnings or removals
- <mark class="orange">orange pen</mark> — for caution
- <mark class="yellow">yellow pen</mark> — the classic default
- <mark class="green">green pen</mark> — for confirmations
- <mark class="cyan">cyan pen</mark> — for references
- <mark class="blue">blue pen</mark> — for definitions
- <mark class="purple">purple pen</mark> — for questions
- <mark class="pink">pink pen</mark> — for emphasis

## In prose

A sentence can carry a <mark class="green">confirmed claim</mark>, a
<mark class="red">contested point</mark>, and a <mark class="blue">key term</mark>
without any of them shouting over the body text.

Plain default highlight for comparison: ==this uses the theme default==.
