# Math.sin Pulse Animation

A technique for creating smooth, oscillating animations using sine waves.

## Full Example

```jsx
const frame = useCurrentFrame();

// Pulse oscillates between 0.7 and 1.3
const pulse = Math.sin(frame * 0.1) * 0.3 + 1;

<div
  style={{
    width: 150,
    height: 150,
    borderRadius: "50%",
    backgroundColor: "#4ecdc4",
    transform: `scale(${pulse})`,
    boxShadow: `
      0 0 20px #4ecdc4,
      0 0 40px #4ecdc4,
      0 0 60px #4ecdc4,
      0 0 ${80 * pulse}px #4ecdc4
    `,
  }}
/>
```

## The Formula Breakdown

```js
const pulse = Math.sin(frame * 0.1) * 0.3 + 1;
//                      ─────────   ─────   ───
//                        speed    amplitude center
```

## Step by Step

### 1. `Math.sin()` — The Base Wave

`Math.sin()` takes an angle (in radians) and outputs a smooth wave oscillating between **-1** and **1**.

```
 1 │    ╭───╮       ╭───╮
   │   ╱     ╲     ╱     ╲
 0 │──╱───────╲───╱───────╲──
   │ ╱         ╲ ╱         ╲
-1 │╱           ╰           ╲
   └─────────────────────────→ input
```

One complete cycle occurs every 2π (≈6.28) units of input.

### 2. `frame * 0.1` — Speed Control

The multiplier controls how fast the wave cycles.

| Multiplier | Frames per Cycle | At 30fps |
|------------|------------------|----------|
| `frame * 1` | ~6 frames | 0.2 seconds |
| `frame * 0.1` | ~63 frames | ~2 seconds |
| `frame * 0.05` | ~126 frames | ~4 seconds |
| `frame * 0.01` | ~628 frames | ~21 seconds |

**Formula**: Frames per cycle = 2π ÷ multiplier

**Why 0.1?** Creates a gentle 2-second breathing rhythm — fast enough to notice, slow enough to feel natural.

### 3. `* 0.3` — Amplitude (Range Size)

This scales the output range from the default -1...1:

| Multiplier | Output Range |
|------------|--------------|
| `* 1` | -1 to 1 |
| `* 0.5` | -0.5 to 0.5 |
| `* 0.3` | -0.3 to 0.3 |
| `* 0.1` | -0.1 to 0.1 |

**Why 0.3?** A 30% variation in each direction creates a noticeable but not jarring pulse.

### 4. `+ 1` — Center Point (Vertical Shift)

This moves the entire wave up or down:

| Shift | Output Range | Use Case |
|-------|--------------|----------|
| `+ 0` | -0.3 to 0.3 | Centered on zero |
| `+ 1` | 0.7 to 1.3 | Scale (1 = normal size) |
| `+ 0.5` | 0.2 to 0.8 | Opacity (stay visible) |

**Why 1?** Because `scale(1)` is normal size. The element now pulses between 70% and 130% of its original size.

## The Full Transformation

```
Input:  frame = 0, 1, 2, 3, 4 ...

Step 1: Math.sin(frame * 0.1)     →  -1    to  1
Step 2: * 0.3                     →  -0.3  to  0.3
Step 3: + 1                       →   0.7  to  1.3

Output: pulse = 0.7 ... 1.3 ... 0.7 ... (repeating)
```

## Quick Reference: Adjusting the Feel

| Desired Effect | Change | New Range |
|----------------|--------|-----------|
| Faster pulse | `0.1` → `0.2` | Same range, 2x speed |
| Slower pulse | `0.1` → `0.05` | Same range, ½ speed |
| More dramatic | `0.3` → `0.5` | 0.5 to 1.5 |
| Subtler | `0.3` → `0.1` | 0.9 to 1.1 |
| Only grow (not shrink) | `+ 1` → `+ 1.3` | 1.0 to 1.6 |
| Shrink more than grow | `+ 1` → `+ 0.8` | 0.5 to 1.1 |

## Common Patterns

### Opacity Fade

```js
// Oscillates between 0.4 and 1.0 (never fully invisible)
const opacity = Math.sin(frame * 0.08) * 0.3 + 0.7;
```

### Rotation

```js
// Wobbles ±15 degrees
const rotation = Math.sin(frame * 0.15) * 15;
// Use: transform: `rotate(${rotation}deg)`
```

### Position (Floating)

```js
// Floats up and down by 20px
const yOffset = Math.sin(frame * 0.05) * 20;
// Use: transform: `translateY(${yOffset}px)`
```

### Color Channel

```js
// Red channel pulses 200-255
const red = Math.sin(frame * 0.1) * 27.5 + 227.5;
// Use: backgroundColor: `rgb(${red}, 100, 100)`
```

## Tips

- **Combine multiple sine waves** with different speeds for organic, complex motion
- **Use `Math.cos()`** for a wave that starts at 1 instead of 0 (90° phase shift)
- **Offset multiple elements**: `Math.sin(frame * 0.1 + index)` staggers animations
- **Easing**: Sine waves have natural ease-in-out at peaks — no easing function needed
