# CSS Clip Path

A technique for masking elements to custom shapes using coordinate-based paths.

## Full Example

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

## The Clip Path Breakdown

```css
clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
```

## Syntax

The `polygon()` function takes a series of `x% y%` coordinate points. The browser draws lines connecting these points in order, then hides everything outside that path.

### Coordinate System

```
0% 0% ─────────────────── 100% 0%
  │                           │
  │                           │
  │         ELEMENT           │
  │                           │
  │                           │
0% 100% ─────────────────── 100% 100%
```

- `0% 0%` = top-left corner
- `100% 0%` = top-right corner
- `0% 100%` = bottom-left corner
- `100% 100%` = bottom-right corner
- `50% 50%` = center

## Triangle Example

```css
clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
```

```
        50% 0%
           △
          /  \
         /    \
        /      \
       /________\
  0% 100%    100% 100%
```

| Point | X | Y | Position |
|-------|---|---|----------|
| 1 | 50% | 0% | Top center |
| 2 | 0% | 100% | Bottom left |
| 3 | 100% | 100% | Bottom right |

## Common Shapes

### Triangles

| Direction | Polygon |
|-----------|---------|
| Up | `polygon(50% 0%, 0% 100%, 100% 100%)` |
| Down | `polygon(0% 0%, 100% 0%, 50% 100%)` |
| Left | `polygon(100% 0%, 100% 100%, 0% 50%)` |
| Right | `polygon(0% 0%, 100% 50%, 0% 100%)` |

### Other Shapes

| Shape | Polygon |
|-------|---------|
| Diamond | `polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)` |
| Parallelogram | `polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)` |
| Trapezoid | `polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)` |
| Chevron (right) | `polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%)` |

## Other Clip Path Functions

`polygon()` isn't the only option:

```css
/* Circle */
clip-path: circle(50% at 50% 50%);

/* Ellipse */
clip-path: ellipse(50% 30% at 50% 50%);

/* Inset (rounded rectangle) */
clip-path: inset(10% 20% 10% 20% round 10px);

/* Reference an SVG clipPath */
clip-path: url(#myClipPath);
```

## Animating Clip Paths

You can animate between polygons with the same number of points:

```jsx
const progress = Math.sin(frame * 0.05) * 0.2 + 0.5;

<div
  style={{
    clipPath: `polygon(
      ${progress * 100}% 0%,
      0% 100%,
      100% 100%
    )`,
  }}
/>
```

The triangle's top point will slide left and right as `progress` changes.

## Tips

- **Same point count**: Animating between shapes requires the same number of points
- **Use with drop-shadow**: `box-shadow` ignores clip-path; use `filter: drop-shadow()` for glows
- **Browser support**: Fully supported in modern browsers; use a fallback for older ones
- **Performance**: Hardware-accelerated, but complex paths with many points can be costly
- **Debugging**: Use browser dev tools to visualize the clip area
