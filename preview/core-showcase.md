---
tags:
  - ouroboros/preview
  - theme/core
aliases:
  - Ouroboros Core Showcase
status: draft
rating: 5
created: 2026-05-21
---

# Ouroboros Core Showcase

Internal link: [[tasks-showcase]]  
External link: [Obsidian](https://obsidian.md)  
Tags: #theme/preview #ouroboros

## Heading Hierarchy

### Level 3 Heading

#### Level 4 Heading

##### Level 5 Heading

###### Level 6 Heading

Body text should feel warm, quiet, and readable for long sessions. **Bold text** and *italic text* should remain legible without overpowering normal text. ==Highlighted text== should be visible in both reading and live preview.

> Blockquotes should use the theme quote color, with enough contrast in light and dark mode.

## Callouts

> [!note]
> A regular note callout.

> [!warning]
> A warning callout with a stronger semantic tint.

> [!figure]
> Figure captions should be quiet and centered.

> [!annotation]
> Annotation callouts should feel like margin notes.

> [!synopsis]
> Synopsis/tldr callouts should read as summary blocks.

> [!decision]
> Decision callouts record the selected path, owner, and tradeoff.

> [!risk]
> Risk callouts highlight uncertainty, impact, mitigation, and review timing.

> [!principle]
> Principle callouts preserve reusable rules that should guide later work.

> [!insight]
> Insight callouts capture a distilled observation without turning it into a task.

> [!cycle]
> Cycle callouts describe an iterative loop: observe → decide → act → review.


## Bookmarks / Search / Outline

Open the Bookmarks, Search, and Outline core panes. Test nested bookmarks, an empty outline, a search with no results, and a search with multiple file matches.

Expected:
- side panes share a quiet warm secondary background
- nested tree levels have subtle indentation guides
- active/selected rows use a light card surface and low-noise border
- count flairs and file tags read as small pills
- search result groups have warm cards, readable match highlights, and calm hover states
- empty states use dashed panels and helpful low-noise actions

## Command Palette / Quick Switcher

Open Command Palette (`Cmd/Ctrl+P`) and Quick Switcher (`Cmd/Ctrl+O`). Search for partial words that produce highlighted matches, commands with hotkeys, no-result states, and file suggestions with path notes.

Expected:
- prompt frame feels like a focused command surface with warm panel and soft popover shadow
- input row has clear separation without heavy chrome
- selected suggestion uses a quiet accent rail/background, not a full saturated block
- matched text is highlighted but still readable in light/dark
- hotkeys render as compact keyboard pills
- no-results state is centered, calm, and distinguishable from normal suggestions

## Properties / Metadata

Use this note's frontmatter in Reading View, Live Preview, File Properties, and All Properties. Add one text property, one tag property, one date/datetime property, and one invalid/unknown property if possible.

Expected:
- property container reads as a warm panel, not a raw YAML editor
- key column remains legible without fake uppercase noise
- value field has a subtle border, clear focus ring, and calm hover state
- tag/link pills match theme tokens and remain readable in light/dark
- empty-property and warning/error states are visible without overpowering the note
- sidebar File Properties / All Properties remain compact and aligned

## Table

| Item | Status | Notes |
|------|--------|-------|
| Theme token | Ready | Uses CSS variables |
| Style Settings | Check | YAML must parse |
| Preview | Draft | Used for visual regression |

## Code

Inline `code` should sit inside a subtle pill.

```css
.markdown-rendered h2,
.markdown-source-view.mod-cm6 .HyperMD-header-2 {
  color: var(--h2-color);
}
```

```diff
+ added token
- removed hardcoded color
@@ check-theme.mjs @@
```

## Image Placeholder

Images should have subtle radius and shadow when present.
