# Remotion `interpolate()` Explained

Maps frame numbers to any value range—like setting keyframes in After Effects.

## Syntax

```ts
interpolate(input, inputRange, outputRange, options?)
```

## Basic Example

```ts
const size = interpolate(
  frame,           // Current value (usually the frame number)
  [0, 30],         // Input range: frames 0 to 30
  [0, 100],        // Output range: size 0px to 100px
  { extrapolateRight: "clamp" }
);
```

At frame 0 → size is 0
At frame 15 → size is 50
At frame 30 → size is 100

## Using FPS for Time-Based Animation

```ts
const { fps } = useVideoConfig();

const opacity = interpolate(
  frame,
  [0, 3 * fps],    // 0 to 3 seconds (90 frames at 30fps)
  [0, 1],          // Fade from invisible to fully visible
  { extrapolateRight: "clamp" }
);
```

## Options

| Option | Values | Effect |
|--------|--------|--------|
| `extrapolateLeft` | `"clamp"`, `"extend"`, `"identity"` | Behavior before input range |
| `extrapolateRight` | `"clamp"`, `"extend"`, `"identity"` | Behavior after input range |
| `easing` | `Easing.*` | Curve shape (linear by default) |

### Extrapolation Modes

- **clamp**: Stops at boundary values (most common)
- **extend**: Continues linearly beyond boundaries
- **identity**: Returns the input value outside range

## Adding Easing

```ts
import { Easing } from "remotion";

const size = interpolate(
  frame,
  [0, 1 * fps],
  [0, 100],
  {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad)  // Smooth start and end
  }
);
```

Common easings: `Easing.linear`, `Easing.ease`, `Easing.inOut(Easing.quad)`, `Easing.bezier()`
