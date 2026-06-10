---
cssclasses:
---

# Numbered Headings Showcase

> Verifies the optional **Numbered headings** toggle (Style Settings → Headings →
> Numbered headings). Numbers are generated with CSS counters (no plugin needed),
> reset per note, and cover H1–H4 in both Reading View and Live Preview.

## How to test

1. Open Style Settings → Headings → enable **Numbered headings**.
2. Read this note in Reading View: headings below should show `1`, `1.1`, `1.1.1`, …
3. Switch to Live Preview (edit mode): the same numbers should appear before each
   heading even when the line is not being edited (numbers are anchored on the line,
   not on the `#` markers Obsidian hides).
4. Confirm the heading inside the callout is **not** numbered and does not advance the
   counter.
5. Toggle the setting off: numbers disappear, headings return to normal.

## First Section

Body text under the first top-level section. The heading above should read `1 First Section`.

### A Subsection

This H3 should read `1.1.1`? No — H2 is skipped here on purpose to confirm levels.

## Second Section

This H2 should read `2 Second Section` (a fresh H1 was not added, so H1 counter stays at 1
only if an H1 exists above; here the document H1 is the title, so adjust expectations to
your own outline).

### Methods

`2.1` style numbering for this H3's parent chain.

#### Sub-method detail

The deepest numbered level, H4, should read with four segments.

> [!note] Callout heading check
> ### This heading is inside a callout
> It must stay **unnumbered** and must not bump the outline counter for the headings
> that follow it.

## Third Section

Confirms the counter continued correctly past the callout — this should be the next
sequential top-level number, proving the callout heading was excluded.
