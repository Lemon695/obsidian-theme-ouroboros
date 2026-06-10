---
cssclasses:
---

# Reading Width Showcase

> Verifies that the readable line column actually responds to the Style Settings
> **Reading width** controls and that Obsidian's native `--file-line-width` is wired
> to the theme's `--line-width`. Toggle Obsidian → Settings → Editor → **Readable line
> length** ON before testing.

## Why this matters

Before M9-1 the theme set `--line-width` but never bound it to Obsidian's
`--file-line-width`, so the tier, the reading modes, and the style packs had no
effect on the actual column width. This note is the regression fixture for that fix.

## How to test

1. Enable **Readable line length** in Obsidian's editor settings.
2. Open Style Settings → Design Tweaks → **Reading width**.
3. Step the **Reading column width** tier through Narrow → Standard → Relaxed → Wide.
   The paragraph block below should visibly widen at each step.
4. Type a value into **Reading column width (advanced)**, e.g. `30rem` or `820px`.
   The advanced value should override the tier. Clear it to fall back to the tier.
5. Enable **Airy reading density**, then a reading mode (Research / Longform), then a
   style pack (Research Desk / Longform Book). Each should override the tier with its
   own width — this is the deterministic precedence: mode/pack > advanced > tier > base.

## Precedence (deterministic)

```text
reading mode / style pack   →   strongest (body.<class>)
        ▲
advanced custom width        →   --line-width-custom
        ▲
tier select                  →   --line-width-tier
        ▲
base default (42rem)         →   weakest
```

## Body copy for width inspection

The readable line length keeps prose at a comfortable measure. Lorem ipsum dolor sit
amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id est laborum.

阅读栏宽用于把正文控制在舒适的视觉宽度内。汉字与西文混排时，过宽的行宽会增加回视成本，
过窄又会打断意群，因此提供 Narrow / Standard / Relaxed / Wide 四档与高级自定义宽度，
方便不同屏幕和阅读习惯下取得平衡。
