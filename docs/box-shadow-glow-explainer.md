# CSS Box Shadow Glow Effect

A technique for creating pulsing neon glows using layered box shadows.

## Full Example

```jsx
// Pulse value oscillates between 0.7 and 1.3
const pulse = Math.sin(frame * 0.1) * 0.3 + 1;

<div
  style={{
    width: 150,
    height: 150,
    borderRadius: "50%",
    backgroundColor: "#4ecdc4",
    boxShadow: `
      0 0 20px #4ecdc4,
      0 0 40px #4ecdc4,
      0 0 60px #4ecdc4,
      0 0 ${80 * pulse}px #4ecdc4
    `,
    transform: `scale(${pulse})`,
  }}
/>
```

## The Box Shadow Breakdown

```css
box-shadow:
  0 0 20px #4ecdc4,
  0 0 40px #4ecdc4,
  0 0 60px #4ecdc4,
  0 0 80px #4ecdc4;
```

## Syntax

Each shadow follows: `offsetX offsetY blurRadius color`

- **offsetX / offsetY**: Set to `0` for centered glow (no directional shadow)
- **blurRadius**: Controls how far the glow spreads
- **color**: The glow color (`#4ecdc4` = cyan/teal)

## Why Layer Multiple Shadows?

A single large blur looks flat and unrealistic. Stacking shadows with progressively larger blur radii mimics real light falloff—brighter near the source, fading outward.

| Layer | Blur | Purpose |
|-------|------|---------|
| 1 | 20px | Tight inner glow |
| 2 | 40px | Medium spread |
| 3 | 60px | Wider diffusion |
| 4 | 80px | Soft outer halo |

## Adding Animation

In the full example above, the outermost layer uses a dynamic value `${80 * pulse}px` where `pulse` oscillates between 0.7–1.3 via `Math.sin()`. This makes the glow expand and contract, creating a breathing effect.

The `transform: scale(${pulse})` on the div itself adds to the effect by also pulsing the shape size in sync with the glow.

## Tips

- **More layers** = smoother gradient, but higher render cost
- **Matching colors** creates a unified glow; different colors create chromatic effects
- **Combine with `filter: blur()`** on child elements for extra diffusion
