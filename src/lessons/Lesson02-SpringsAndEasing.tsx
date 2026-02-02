/**
 * LESSON 2: SPRINGS & EASING
 * ==========================
 *
 * Core concepts:
 * - spring() - Physics-based animation (like After Effects' expressions)
 * - Easing curves - Same concept as AE's graph editor
 * - Combining interpolations
 *
 * After Effects equivalent:
 * - spring() = inertia/bounce expressions or spring keyframes
 * - Easing = the curves you draw in the graph editor
 */

import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

// Comparing different spring configurations
export const SpringComparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Different spring configurations - like different bounce presets
  const springs = [
    {
      label: "Default (bouncy)",
      config: {}, // mass: 1, damping: 10, stiffness: 100
      color: "#ff6b6b",
    },
    {
      label: "Smooth (no bounce)",
      config: { damping: 200 },
      color: "#4ecdc4",
    },
    {
      label: "Snappy",
      config: { damping: 20, stiffness: 200 },
      color: "#ffe66d",
    },
    {
      label: "Heavy & slow",
      config: { damping: 15, stiffness: 80, mass: 2 },
      color: "#95e1d3",
    },
    {
      label: "Super bouncy",
      config: { damping: 8 },
      color: "#dda0dd",
    },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#1a1a2e" }}>
      <div style={{
        position: "absolute",
        top: 40,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "white",
        fontSize: 32,
        fontWeight: "bold",
      }}>
        Spring Configurations
      </div>

      {springs.map((s, i) => {
        // spring() returns a value from 0 to 1
        const progress = spring({
          frame,
          fps,
          config: s.config,
        });

        // Map spring output to position
        const x = interpolate(progress, [0, 1], [100, 800]);

        return (
          <div key={i} style={{ position: "absolute", top: 120 + i * 140 }}>
            {/* Label */}
            <div style={{
              position: "absolute",
              left: 100,
              top: -30,
              color: s.color,
              fontSize: 18,
            }}>
              {s.label}
            </div>

            {/* Track */}
            <div style={{
              position: "absolute",
              left: 100,
              top: 20,
              width: 700,
              height: 4,
              backgroundColor: "#333",
            }} />

            {/* Ball */}
            <div style={{
              position: "absolute",
              left: x,
              top: 0,
              width: 50,
              height: 50,
              borderRadius: "50%",
              backgroundColor: s.color,
              transform: "translateX(-50%)",
            }} />
          </div>
        );
      })}

      {/* Frame counter */}
      <div style={{
        position: "absolute",
        bottom: 60,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "white",
        fontFamily: "monospace",
        fontSize: 20,
      }}>
        Frame: {frame}
      </div>
    </AbsoluteFill>
  );
};

// Easing curves demonstration
export const EasingCurves: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const duration = 2 * fps; // 2 seconds

  const easings = [
    { label: "Linear", easing: undefined, color: "#ff6b6b" },
    { label: "Ease In (Quad)", easing: Easing.in(Easing.quad), color: "#4ecdc4" },
    { label: "Ease Out (Quad)", easing: Easing.out(Easing.quad), color: "#ffe66d" },
    { label: "Ease InOut (Quad)", easing: Easing.inOut(Easing.quad), color: "#95e1d3" },
    { label: "Ease InOut (Exp)", easing: Easing.inOut(Easing.exp), color: "#dda0dd" },
    { label: "Bezier (.8,.22,.96,.65)", easing: Easing.bezier(0.8, 0.22, 0.96, 0.65), color: "#87ceeb" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#1a1a2e" }}>
      <div style={{
        position: "absolute",
        top: 40,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "white",
        fontSize: 32,
        fontWeight: "bold",
      }}>
        Easing Curves (like AE Graph Editor)
      </div>

      {easings.map((e, i) => {
        const x = interpolate(
          frame,
          [0, duration],
          [100, 800],
          {
            easing: e.easing,
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }
        );

        return (
          <div key={i} style={{ position: "absolute", top: 100 + i * 120 }}>
            <div style={{
              position: "absolute",
              left: 100,
              top: -25,
              color: e.color,
              fontSize: 16,
            }}>
              {e.label}
            </div>

            <div style={{
              position: "absolute",
              left: 100,
              top: 15,
              width: 700,
              height: 4,
              backgroundColor: "#333",
            }} />

            <div style={{
              position: "absolute",
              left: x,
              top: 0,
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: e.color,
              transform: "translateX(-50%)",
            }} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// Combining springs for in/out animations
export const SpringInOut: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Enter animation (0 to 1)
  const inAnimation = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  // Exit animation (starts 1 second before end)
  const outAnimation = spring({
    frame,
    fps,
    delay: durationInFrames - fps, // Start 1 second before end
    config: { damping: 200 },
  });

  // Combine: in animation brings it in, out animation takes it away
  const progress = inAnimation - outAnimation;

  // Map to scale and position
  const scale = interpolate(progress, [0, 1], [0, 1]);
  const y = interpolate(progress, [0, 1], [300, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1a1a2e",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{
        position: "absolute",
        top: 60,
        color: "white",
        fontSize: 24,
      }}>
        Spring In + Spring Out = Complete Animation
      </div>

      <div
        style={{
          width: 200,
          height: 200,
          backgroundColor: "#4ecdc4",
          borderRadius: 20,
          transform: `scale(${scale}) translateY(${y}px)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#1a1a2e",
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        Hello!
      </div>

      {/* Debug info */}
      <div style={{
        position: "absolute",
        bottom: 60,
        color: "white",
        fontFamily: "monospace",
        fontSize: 16,
        textAlign: "center",
      }}>
        <div>in: {inAnimation.toFixed(2)} | out: {outAnimation.toFixed(2)} | combined: {progress.toFixed(2)}</div>
      </div>
    </AbsoluteFill>
  );
};
