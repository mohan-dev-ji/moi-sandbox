# Polygon Geometry for Animation

How to place points on a circle and calculate polygon angles.

## Placing Points on a Circle (Unit Circle)

To place n points evenly around a circle, use **cos** and **sin**:

```
x = centerX + radius * cos(angle)
y = centerY + radius * sin(angle)
```

### Why cos and sin?

The unit circle defines cos/sin as x/y coordinates:

```
        90° (π/2)
           |
           | (0, 1)
           |
180° ------+------ 0°
 (-1,0)    |      (1, 0)
           |
           | (0, -1)
           |
       270° (3π/2)
```

- `cos(angle)` = x coordinate (-1 to 1)
- `sin(angle)` = y coordinate (-1 to 1)

Multiply by radius to scale the circle.

## The Code Explained

```tsx
{Array.from({ length: sides }).map((_, i) => {
  const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
  const x = 250 + radius * Math.cos(angle);
  const y = 250 + radius * Math.sin(angle);
  // ...
})}
```

### Breaking down the angle:

| Part | Meaning |
|------|---------|
| `2 * Math.PI` | Full circle in radians (360°) |
| `/ sides` | Divide into equal slices |
| `* i` | Which vertex (0, 1, 2, ...) |
| `- Math.PI / 2` | Rotate -90° so first point is at TOP |

### Example: Pentagon (5 sides)

```
i=0: angle = 0/5 * 360° - 90° = -90°  → TOP
i=1: angle = 1/5 * 360° - 90° =  18°  → upper right
i=2: angle = 2/5 * 360° - 90° =  54°  → lower right
i=3: angle = 3/5 * 360° - 90° = 126°  → lower left
i=4: angle = 4/5 * 360° - 90° = 198°  → upper left
```

Without the `-90°` offset, the first point would be on the RIGHT (0°).

## Interior Angles

The formula `(sides - 2) * 180 / sides` comes from:

1. Any polygon can be divided into triangles from one vertex
2. A polygon with n sides makes **(n - 2) triangles**
3. Each triangle has 180° total
4. Total interior degrees = **(n - 2) × 180°**
5. Each angle (for regular polygons) = **(n - 2) × 180° / n**

### Visual:

```
Triangle (3):     Square (4):       Pentagon (5):
    /\              ____              _____
   /  \            |\ 2|             /\ 3 /\
  /  1 \           |1 \|            / 1\/2 \
 /______\          |___|           /_________\

1 triangle       2 triangles      3 triangles
1 × 180 = 180°   2 × 180 = 360°   3 × 180 = 540°
180° / 3 = 60°   360° / 4 = 90°   540° / 5 = 108°
```

## Quick Reference

| Sides | Name | Interior Angle |
|-------|------|----------------|
| 3 | Triangle | 60° |
| 4 | Square | 90° |
| 5 | Pentagon | 108° |
| 6 | Hexagon | 120° |
| 8 | Octagon | 135° |
| ∞ | Circle | 180° |

## Pythagoras Connection

Pythagoras (`a² + b² = c²`) relates to the unit circle:

```
cos²(θ) + sin²(θ) = 1
```

This is because cos and sin are the legs of a right triangle with hypotenuse 1 (the radius of the unit circle).
