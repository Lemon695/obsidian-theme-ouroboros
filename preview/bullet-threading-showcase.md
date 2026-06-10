---
cssclasses: []
---

# Bullet Threading Showcase

> Verifies the M12 bullet threading feature (Logseq-style outline cue,
> absorbed from the community bullet-threading snippet). Enabled by default;
> escape via **Style Settings → Ouroboros Theme → New Features → Bullet
> threading**. When the cursor sits on a list line, a rounded accent thread
> connects every ancestor bullet down to the active line, ending in a curved
> elbow into its bullet.
>
> Scope and DOM-honesty notes:
>
> - **Editor only (Live Preview + source mode)** — Reading View has no cursor,
>   so a CSS-only theme cannot know the "current" item there. Reading View is
>   intentionally untouched.
> - Covers **6 indent levels**; deeper levels keep the native indent guides.
> - Offsets assume Obsidian's default ~2em-per-level editor indent (tab size
>   4). A different tab size can be retuned via `--ouroboros-thread-indent`.
> - The thread color follows the accent (`--ouroboros-thread-color` is mixed
>   from `--interactive-accent`), so every accent preset and style pack keeps
>   a coherent thread.
> - The thread is static — no animation, nothing for reduce-motion to remove.
> - With **Highlight active line** also on, list lines show the threading
>   elbow instead of the active-line rail (both target `::before`; the more
>   specific threading rule wins — known, documented trade-off).

## How to verify

Open this note in **Live Preview** and click through the outline below. The
thread should follow the cursor: vertical runs at each ancestor column, a
rounded elbow turning into the active bullet, and accent-tinted bullets along
the path.

- Level one item — click here first: no elbow (top level), bullet tints only
	- Level two item — elbow curves in from the level-one column
		- Level three item — thread passes through level two
			- Level four item — three vertical runs plus the elbow
		- Level three sibling — pass-through lines stay straight
	- Level two sibling under the same parent
- Second level-one item
	- Tasks keep the thread clear of checkboxes:
		- [ ] open task at level three
		- [x] done task at level three
- Third level-one item with a longer body to confirm the tail spans wrapped
	lines without drifting away from the bullet column

## Source mode

Switch to source mode (Live Preview off): the thread re-anchors to the raw
`-` markers with the tighter source-mode offsets.
