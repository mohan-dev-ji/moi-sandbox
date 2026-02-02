# Remotion Fundamentals: Lessons 1 & 2

## Project Structure

```
src/
├── index.ts        ← Entry point (registers Root with Remotion)
├── Root.tsx        ← Composition registry (imports & defines all compositions)
└── lessons/
    └── Lesson01-BasicShapes.tsx   ← Exports React components
```

| File | Role |
|------|------|
| `index.ts` | Tells Remotion where to find compositions |
| `Root.tsx` | Registers compositions with `<Composition>` (sets fps, duration, size) |
| `Lesson__.tsx` | Contains the actual animation components |

---

## Component Pattern

Every animation component follows this structure:

```tsx
export const MyAnimation: React.FC = () => {
  // 1. Get timing info
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // 2. Calculate animated values
  const size = interpolate(frame, [0, fps], [0, 200]);

  // 3. Return JSX with animated styles
  return (
    <div style={{ width: size, height: size }} />
  );
};
```

**Key terms:**
- `React.FC` = React Functional Component (TypeScript type)
- `useCurrentFrame()` = Returns current frame number (0, 1, 2...)
- `useVideoConfig()` = Returns `{ fps, width, height, durationInFrames }`

---

## The Animation Flow

```
frame (number)
    ↓
interpolate() or spring()
    ↓
animated value (number)
    ↓
style={{ property: value }}
    ↓
visual change
```

---

## interpolate()

Maps a value from one range to another.

```tsx
interpolate(input, [inputStart, inputEnd], [outputStart, outputEnd], options?)
```

```tsx
// Frame 0→30 maps to size 0→200
const size = interpolate(frame, [0, 30], [0, 200]);

// With easing (curved motion)
const size = interpolate(frame, [0, 30], [0, 200], {
  easing: Easing.inOut(Easing.quad)
});

// Clamped (stops at boundaries)
const size = interpolate(frame, [0, 30], [0, 200], {
  extrapolateRight: "clamp"
});
```

**Without clamp:** Value continues beyond 200 after frame 30
**With clamp:** Value stays at 200 after frame 30

---

## spring()

Physics-based animation (bouncy/organic motion).

```tsx
const progress = spring({
  frame,
  fps,
  config: { damping, stiffness, mass }
});
```

Returns `0 → 1` (may overshoot with bounce).

| Property | Effect | Higher = |
|----------|--------|----------|
| `damping` | Friction | Less bounce, settles faster |
| `stiffness` | Tension | Snappier movement |
| `mass` | Weight | Slower, heavier feel |

```tsx
// Common presets
{ damping: 200 }                    // Smooth, no bounce
{ damping: 12 }                     // Default bouncy
{ damping: 20, stiffness: 200 }     // Snappy
{ damping: 8 }                      // Very bouncy
```

---

## Combining spring + interpolate

`spring()` outputs 0→1, use `interpolate()` to map to actual values:

```tsx
const progress = spring({ frame, fps });           // 0 → 1
const x = interpolate(progress, [0, 1], [100, 800]); // 100 → 800
```

---

## Staggered Animations

Offset the frame for each item:

```tsx
const getProps = (index: number) => {
  const delay = index * 10;                        // 0, 10, 20, 30...
  const localFrame = Math.max(0, frame - delay);   // Shifted timeline

  return interpolate(localFrame, [0, 15], [0, 1]);
};

// In render:
{items.map((item, i) => {
  const scale = getProps(i);
  return <div style={{ transform: `scale(${scale})` }} />;
})}
```

---

## Shape Methods (CSS)

| Shape | CSS |
|-------|-----|
| Circle | `borderRadius: "50%"` |
| Rounded square | `borderRadius: 8` |
| Triangle | `clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)"` |
| Diamond | `rotate: "45deg"` on a square |

---

## Quick Reference

```tsx
// Time conversion
1 * fps          // 1 second in frames
frame / fps      // Current time in seconds

// Common interpolate options
{ extrapolateRight: "clamp" }           // Stop at end value
{ extrapolateLeft: "clamp" }            // Stop at start value
{ easing: Easing.inOut(Easing.quad) }   // Curved motion

// Common spring configs
{ damping: 200 }     // Smooth
{ damping: 12 }      // Bouncy (default-ish)
{ damping: 8 }       // Very bouncy
```

---

## Your Understanding: Corrections

| You Said | Clarification |
|----------|---------------|
| "index.ts is the master output file that gets rendered" | `index.ts` just registers `Root`. The browser renders `Root.tsx` which contains `<Composition>` definitions |
| "json type of object" | It's a JavaScript/TypeScript object (or array). JSON is a string format for data exchange |
| "injecting interpolations with json animations" | You're passing **calculated numbers** to inline style objects |

Your mental model is correct: **frame → calculation → style → render**
