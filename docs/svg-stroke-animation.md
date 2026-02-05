# SVG Stroke Animation (Trim Paths Effect)

Animate an SVG stroke to "draw" itself using `strokeDasharray` and `strokeDashoffset`.

## The Technique

Two SVG properties work together:

| Property | Purpose |
|----------|---------|
| `strokeDasharray` | Length of dashes and gaps |
| `strokeDashoffset` | How far to push the dash pattern along the path |

## The Trick

Set one dash equal to the shape's total length, then animate the offset:

```tsx
const circumference = 2 * Math.PI * radius;  // Total path length

<circle
  strokeDasharray={circumference}                      // One dash = full circle
  strokeDashoffset={circumference * (1 - progress)}   // Slide it into view
/>
```

## How It Works

Imagine the dash pattern sitting on a track. The offset pushes it backward:

```
progress = 0    →  offset = 100%  →  [----dash----]     (hidden before start)
progress = 0.5  →  offset = 50%   →  =====[----dash     (half visible)
progress = 1    →  offset = 0%    →  ==========]        (fully drawn)
```

The `(1 - progress)` inverts the direction so 0→1 draws forward.

## Calculating Path Lengths

| Shape | Formula |
|-------|---------|
| Circle | `2 * Math.PI * radius` |
| Rectangle | `2 * (width + height)` |
| Equilateral Triangle | `3 * sideLength` |
| Regular Polygon | `sides * sideLength` |
| Arbitrary Path | Use `path.getTotalLength()` in JS |

## Complete Example

```tsx
const drawProgress = interpolate(
  frame,
  [0, 2 * fps],    // 2 second animation
  [0, 1],          // 0% to 100%
  { extrapolateRight: "clamp" }
);

const radius = 100;
const circumference = 2 * Math.PI * radius;

<svg width="250" height="250">
  <circle
    cx="125"
    cy="125"
    r={radius}
    fill="none"
    stroke="#4ecdc4"
    strokeWidth="4"
    strokeDasharray={circumference}
    strokeDashoffset={circumference * (1 - drawProgress)}
    strokeLinecap="round"
  />
</svg>
```

## Variations

### Draw then un-draw (loop)

```tsx
const progress = interpolate(
  frame % (2 * fps),
  [0, fps, 2 * fps],
  [0, 1, 0]
);
```

### Start from a different point

Rotate the shape to change where drawing begins:

```tsx
style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
```

### Reverse direction

Remove the `(1 - progress)` inversion:

```tsx
strokeDashoffset={circumference * progress}  // Un-draws instead
```
