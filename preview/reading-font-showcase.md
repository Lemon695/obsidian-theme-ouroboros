---
cssclasses:
---

# Reading Font Showcase

> Verifies the optional serif / Western body-font profile exposed through the
> Style Settings **reading-font** control. The selected stack applies to the body
> and editor reading surface only; the interface chrome stays system sans.

## Why this matters

The theme already exposed a CJK serif toggle (`cjk-serif`) for Chinese/Japanese/
Korean text. N8 extends that idea to Latin text with a curated `variable-select`
of reading fonts, so writers who prefer a serif measure for long prose can switch
without hand-editing `--font-text-theme`. The select feeds `--reading-font`, which
the base `--font-text-theme: var(--reading-font, var(--font-system-ui))` resolves.

## How to test

1. Open Style Settings → **Typography** → **Reading font**.
2. Step the select through the four options:
   - **System sans (default)** — the original `--font-system-ui` stack.
   - **Serif (Iowan / Palatino)** — `--font-western-serif`.
   - **Modern serif (Georgia)** — `--font-western-modern`.
   - **Humanist sans (Inter)** — `--font-western-humanist`.
   The body paragraphs and the Live Preview editor should change typeface at each
   step; the **sidebars, tab headers, ribbon, and Settings UI must stay sans**.
3. Turn on **CJK typography mode** (and optionally **CJK serif font**). CJK mode
   overrides the reading-font select — this is the documented precedence.
4. Turn on a style pack (e.g. **Longform Book**, which pins its own serif). The
   pack overrides the reading-font select too.

## Precedence (deterministic)

```text
CJK mode / style pack        →   strongest (body.<class> overrides --font-text-theme)
        ▲
reading-font select          →   --reading-font
        ▲
system sans fallback         →   --font-system-ui (weakest / default)
```

## Scope honesty

- The select changes only `--font-text-theme` (body) and `--font-editor-theme`
  (which follows it). `--font-interface-theme` is intentionally decoupled and stays
  `--font-system-ui`, so a serif reading font never turns the whole app serif.
- Each option is a font *stack* with platform fallbacks; the exact face depends on
  what is installed (e.g. Iowan Old Style on macOS, otherwise Palatino / Source
  Serif Pro / Georgia). This is a CSS font-family stack, not a bundled webfont.

## Body copy for typeface inspection

The reading font sets the rhythm of sustained prose. A humanist serif gives long
chapters a warmer, book-like measure, while a system sans keeps notes crisp and
neutral. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

正文字体决定长文的阅读节奏：衬线更适合沉浸式长篇，无衬线更利于速记与界面一致。
西文字体档只改正文与编辑区，界面 chrome 仍保持系统无衬线；CJK 模式与风格包优先级更高，
会覆盖此处的西文字体选择。
