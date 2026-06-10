---
cssclasses:
---

# Code Block Showcase

> Verifies the M9-3 code-block enhancements: curated **language labels**, a clearer
> **copy-button** hover/active state, and stronger but calm **diff** contrast.
> Check in Reading View (labels are Reading-View-only by design — Live Preview already
> shows the language in the ```` ```lang ```` fence text).

## How to test

1. Read this note in Reading View. Each fenced block below should show a small muted
   language pill in the top-right corner (JS, Python, JSON, Shell, …).
2. Hover a code block: the language pill fades out and the **Copy** button becomes the
   clear top-right control; hovering/clicking Copy shows the accent-tinted states.
3. The diff block should show green inserted / red deleted lines with a left accent rail
   and a calm tint — readable without neon saturation.
4. Toggle Style Settings → Features → **Code block language labels** off: the pills
   disappear; code blocks otherwise stay intact.
5. An unlabeled language (e.g. a made-up `flux` block) should show **no** pill rather
   than an empty one.

## JavaScript

```js
export function greet(name) {
  return `Hello, ${name}`;
}
```

## Python

```python
def greet(name: str) -> str:
    return f"Hello, {name}"
```

## JSON

```json
{ "theme": "Ouroboros", "version": "1.0.2" }
```

## Shell

```bash
npm run build && npm run check
```

## Unmapped language (should show no pill)

```flux
this language is intentionally unmapped
```

## Diff

```diff
@@ -1,4 +1,4 @@
 stable line of context
-const palette = "cold-white";
+const palette = "warm-paper";
 another stable line
```
