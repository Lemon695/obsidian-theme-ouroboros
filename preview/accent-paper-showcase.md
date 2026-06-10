---
cssclasses:
---

# Accent & Paper Temperature Showcase

> Verifies the N2 expanded accent palette (ink-blue / clay / slate, on top of the
> existing moss / amber / sage) and the paper-temperature controls (warm / cool).
> All values are token-driven and paper-harmonious — no high-saturation accents.

## How to test

1. Open Style Settings → Design Tweaks → **Accent presets**.
2. Step through Moss → Amber → Sage → Ink Blue → Clay → Slate. Links, buttons,
   selected states, checkboxes, and graph nodes should all follow the chosen accent.
3. Enable two accents at once: the one **lowest** in the list should win (deterministic).
4. Open **Paper temperature** → toggle **Warm paper**: surfaces should read creamier.
   Toggle **Cool paper** instead: surfaces should read cooler/more neutral. Enabling
   both should resolve to Cool (deterministic).
5. Check every combination in both light and dark mode — text contrast must stay
   comfortable on every paper temperature.

## Accent-driven elements

- A [[reading-width-showcase|wiki link]] and an [external link](https://obsidian.md).
- A `> [!info]` callout and inline `code` pick up accent-tinted edges.

> [!tip] Accent on callouts
> Callout accents, selection rings, and buttons should all shift together when you
> change the accent preset — nothing should stay stuck on the default blue.

## Paper surfaces

The note background, sidebars, code block surfaces, and card fills are all paper
surfaces. Under **Warm paper** they lean cream; under **Cool paper** they lean neutral.
The ink (text) color stays constant so reading comfort is preserved.
