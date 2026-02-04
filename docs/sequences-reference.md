# Remotion Sequences & Series Reference

## Sequence

Controls **when** a component appears and for **how long**.

```tsx
<Sequence from={fps} durationInFrames={2 * fps}>
  <MyComponent />
</Sequence>
```

| Prop | Description |
|------|-------------|
| `from` | Start frame (0-indexed) |
| `durationInFrames` | How long it's visible |
| `layout` | `"none"` to prevent wrapper div |
| `name` | Label for Remotion timeline |

**Key insight:** Inside a Sequence, `useCurrentFrame()` resets to 0 (local time).

```
Global timeline:  0----30----60----90----120
                        |=========|
                        from=30   durationInFrames=60

Inside Sequence:        0----30----60
                        ^ frame starts at 0
```

---

## Series

Chains sequences **automatically** - no manual `from` calculations.

```tsx
<Series>
  <Series.Sequence durationInFrames={fps}>
    <SceneA />  {/* 0s - 1s */}
  </Series.Sequence>

  <Series.Sequence durationInFrames={1.5 * fps}>
    <SceneB />  {/* 1s - 2.5s */}
  </Series.Sequence>

  <Series.Sequence offset={-15} durationInFrames={fps}>
    <SceneC />  {/* Overlaps previous by 15 frames */}
  </Series.Sequence>
</Series>
```

| Prop | Description |
|------|-------------|
| `durationInFrames` | Length of this segment |
| `offset` | Shift timing (negative = overlap) |

```
Without offset:   [  A  ][  B  ][  C  ]
With offset={-15}:[  A  ][  B  ][C  ]  <- C overlaps B
```

---

## Nested Sequences

Parent timing contains child timing.

```tsx
<Sequence from={0} durationInFrames={4 * fps}>
  {/* Background for full 4s */}
  <Background />

  <Sequence from={fps} durationInFrames={2 * fps} layout="none">
    {/* Appears at 1s (relative to parent), lasts 2s */}
    <Element />
  </Sequence>
</Sequence>
```

```
Parent:    |========================|  0-4s
Child:         |============|          1-3s (relative to parent start)
```

---

## Quick Patterns

**Staggered entrance:**
```tsx
{items.map((item, i) => (
  <Sequence key={i} from={i * 10} durationInFrames={fps}>
    <Item />
  </Sequence>
))}
```

**Fade in using local frame:**
```tsx
const frame = useCurrentFrame(); // 0 inside Sequence
const opacity = interpolate(frame, [0, 10], [0, 1]);
```

---

## Sequence vs Series

| Use Case | Component |
|----------|-----------|
| Precise control over start times | `Sequence` |
| Sequential playback (no math) | `Series` |
| Overlapping transitions | `Series` with negative `offset` |
| Complex nested timing | Nested `Sequence` |
