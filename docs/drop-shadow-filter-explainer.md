# CSS Drop Shadow Filter

A technique for creating glows that follow the actual shape of an element, including transparent areas and clip-paths.

## Full Example

```jsx
// Pulse value oscillates between 0.7 and 1.3
const pulse = Math.sin(frame * 0.1) * 0.3 + 1;

<div
  style={{
    width: 120,
    height: 120,
    backgroundColor: "#ff6b6b",
    borderRadius: 10,
    filter: `
      drop-shadow(0 0 ${20 * pulse}px #ff6b6b)
      drop-shadow(0 0 ${40 * pulse}px #ff6b6b)
    `,
  }}
/>
```

## The Drop Shadow Breakdown

```css
filter: drop-shadow(0 0 20px #ff6b6b) drop-shadow(0 0 40px #ff6b6b);
```

## Syntax

Each drop-shadow follows: `drop-shadow(offsetX offsetY blurRadius color)`

| Value | Meaning |
|-------|---------|
| `0` | **offsetX** — horizontal shift (0 = centered) |
| `0` | **offsetY** — vertical shift (0 = centered) |
| `20px` | **blurRadius** — how far the shadow spreads |
| `#ff6b6b` | **color** — the glow color (coral red) |

With both offsets at `0`, the shadow radiates equally in all directions, creating a glow effect rather than a directional shadow.

## Why Layer Multiple Drop Shadows?

Same principle as box-shadow — stacking shadows with progressively larger blur radii creates a more realistic, intense glow that mimics natural light falloff.

| Layer | Blur | Purpose |
|-------|------|---------|
| 1 | 20px | Tight inner glow |
| 2 | 40px | Wider outer halo |

## Drop Shadow vs Box Shadow

| Property | Applies To | Best For |
|----------|-----------|----------|
| `box-shadow` | Element's bounding box (rectangle) | Rectangular elements, cards, buttons |
| `drop-shadow` | Actual rendered pixels (follows shape) | Complex shapes, clip-paths, transparent PNGs |

### Example: Glowing Triangle

```jsx
<div
  style={{
    width: 150,
    height: 130,
    backgroundColor: "#ffe66d",
    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
    filter: `
      drop-shadow(0 0 15px #ffe66d)
      drop-shadow(0 0 30px #ffe66d)
    `,
  }}
/>
```

Using `box-shadow` here would glow around the rectangular bounding box. `drop-shadow` follows the triangular clip-path.

## Tips

- **Chain multiple filters** by space-separating them (no commas)
- **Performance**: `drop-shadow` is more expensive than `box-shadow` since it traces pixel boundaries
- **SVG elements**: `drop-shadow` works on SVG where `box-shadow` does not
- **Transparency**: `drop-shadow` respects alpha channels in images
