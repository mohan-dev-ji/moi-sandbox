/**
 * LESSON 1: BASIC SHAPES & INTERPOLATION
 * ======================================
 *
 * Core concepts:
 * - useCurrentFrame() - The heart of all Remotion animations
 * - useVideoConfig() - Get fps, width, height, durationInFrames
 * - interpolate() - Map frame numbers to any value range
 * - AbsoluteFill - Full-screen positioning container
 *
 * After Effects equivalent:
 * - useCurrentFrame() = current time in your composition
 * - interpolate() = keyframe animation with linear/eased values
 * - AbsoluteFill = a layer that fills the comp
 */

import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

// A simple animated circle - the most basic animation
export const AnimatedCircle: React.FC = () => {
  // Get the current frame number (starts at 0)
  const frame = useCurrentFrame();

  // Get video settings - fps is crucial for timing
  const { fps, width, height } = useVideoConfig();

  // INTERPOLATE: Map frames to values
  // This is like setting keyframes in AE
  // interpolate(currentValue, [inputStart, inputEnd], [outputStart, outputEnd])

  // Circle grows from 0 to 200 pixels over 1 second (30 frames at 30fps)
  const size = interpolate(
    frame,
    [0, 1 * fps],  // From frame 0 to frame 30 (1 second)
    [0, 100],      // Size goes from 0 to 200
    { extrapolateRight: "clamp", 
      easing: Easing.inOut(Easing.quad)
    } // Don't go beyond 200 after 1 second
  );

  // Opacity fades in over half a second
  const opacity = interpolate(
    frame,
    [0, 3 * fps],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1a1a2e",
        justifyContent: "center",
        alignItems: "center",
        gap: 100,
        flexDirection: "row",
      }}
    >
      {/* METHOD 1: CSS Circle (div with borderRadius) */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: size,
            height: size,
            borderRadius: "50%",  // Makes square → circle
            backgroundColor: "#4ecdc4",
            opacity,
          }}
        />
        <div style={{ color: "#4ecdc4", marginTop: 20, fontSize: 18 }}>
          CSS: borderRadius 50%
        </div>
      </div>

      {/* METHOD 2: SVG Circle (more control for strokes/paths) */}
      <div style={{ textAlign: "center" }}>
        <svg width={size} height={size} style={{ overflow: "visible" }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 4}  // Slightly smaller to show stroke
            fill="none"
            stroke="#ff6b6b"
            strokeWidth={4}
            opacity={opacity}
            style={{ filter: "drop-shadow(0 0 10px #ff6b6b)" }}
          />
        </svg>
        <div style={{ color: "#ff6b6b", marginTop: 20, fontSize: 18 }}>
          SVG: &lt;circle&gt; element
        </div>
      </div>

      {/* METHOD 3: SVG with animated stroke (trim paths effect) */}
      <div style={{ textAlign: "center" }}>
        <svg width={size} height={size} style={{ overflow: "visible" }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 4}
            fill="none"
            stroke="#ffe66d"
            strokeWidth={4}
            opacity={opacity}
            // Trim paths effect!
            strokeDasharray={Math.PI * (size - 8)}  // Circumference
            strokeDashoffset={Math.PI * (size - 8) * (1 - opacity)}  // Animate
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 10px #ffe66d)" }}
          />
        </svg>
        <div style={{ color: "#ffe66d", marginTop: 20, fontSize: 18 }}>
          SVG: Trim Paths effect
        </div>
      </div>

      {/* Frame counter */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          color: "white",
          fontFamily: "monospace",
          fontSize: 24,
        }}
      >
        Frame: {frame} / {Math.floor(frame / fps * 10) / 10}s | Size: {Math.round(size)}px
      </div>
    </AbsoluteFill>
  );
};

// Multiple shapes with staggered animations
export const StaggeredShapes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Helper function for staggered entrance
  const getShapeProps = (index: number) => {
    const delay = index * 10; // 10 frames between each shape
    const localFrame = Math.max(0, frame - delay);

    const scale = interpolate(
      localFrame,
      [0, 15],
      [0, 1],
      { extrapolateRight: "clamp" }
    );

    const opacity = interpolate(
      localFrame,
      [0, 10],
      [0, 1],
      { extrapolateRight: "clamp" }
    );

    return { scale, opacity };
  };

  const shapes = [
    { color: "#ff6b6b", type: "circle" },
    { color: "#4ecdc4", type: "square" },
    { color: "#ffe66d", type: "triangle" },
    { color: "#95e1d3", type: "diamond" },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1a1a2e",
        justifyContent: "center",
        alignItems: "center",
        gap: 60,
        flexDirection: "row",
      }}
    >
      {shapes.map((shape, i) => {
        const { scale, opacity } = getShapeProps(i);
        return (
          <div
            key={i}
            style={{
              width: 100,
              height: 100,
              backgroundColor: shape.color,
              opacity,
              transform: `scale(${scale})`,
              borderRadius: shape.type === "circle" ? "50%" :
                           shape.type === "diamond" ? 0 : 8,
              rotate: shape.type === "diamond" ? "45deg" :
                      shape.type === "triangle" ? "0deg" : "0deg",
              clipPath: shape.type === "triangle"
                ? "polygon(50% 0%, 0% 100%, 100% 100%)"
                : undefined,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// Demonstrating extrapolation options
export const ExtrapolationDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // These all animate from frame 30 to 60, but behave differently before/after

  // CLAMP: Stays at boundaries
  const clamped = interpolate(
    frame,
    [fps, 2 * fps],  // 1s to 2s
    [0, 300],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // EXTEND (default): Continues beyond boundaries
  const extended = interpolate(
    frame,
    [fps, 2 * fps],
    [0, 300]
    // No options = values continue beyond the range
  );

  // IDENTITY: Returns input value outside range
  const identity = interpolate(
    frame,
    [fps, 2 * fps],
    [0, 300],
    { extrapolateLeft: "identity", extrapolateRight: "identity" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#1a1a2e" }}>
      {/* Labels */}
      <div style={{ position: "absolute", left: 40, top: 150, color: "#ff6b6b", fontSize: 20 }}>
        CLAMP (stays at 0 and 300)
      </div>
      <div style={{ position: "absolute", left: 40, top: 350, color: "#4ecdc4", fontSize: 20 }}>
        EXTEND (continues forever)
      </div>
      <div style={{ position: "absolute", left: 40, top: 550, color: "#ffe66d", fontSize: 20 }}>
        IDENTITY (returns frame number)
      </div>

      {/* Moving circles */}
      <div
        style={{
          position: "absolute",
          left: clamped + 200,
          top: 200,
          width: 60,
          height: 60,
          borderRadius: "50%",
          backgroundColor: "#ff6b6b",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: extended + 200,
          top: 400,
          width: 60,
          height: 60,
          borderRadius: "50%",
          backgroundColor: "#4ecdc4",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: identity + 200,
          top: 600,
          width: 60,
          height: 60,
          borderRadius: "50%",
          backgroundColor: "#ffe66d",
        }}
      />

      {/* Timeline indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 0,
          right: 0,
          height: 4,
          backgroundColor: "#333",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: `${(frame / (3 * fps)) * 100}%`,
            top: -8,
            width: 20,
            height: 20,
            borderRadius: "50%",
            backgroundColor: "white",
            transform: "translateX(-50%)",
          }}
        />
        {/* Markers for 1s and 2s */}
        <div style={{ position: "absolute", left: `${100/3}%`, top: -30, color: "white" }}>1s</div>
        <div style={{ position: "absolute", left: `${200/3}%`, top: -30, color: "white" }}>2s</div>
      </div>
    </AbsoluteFill>
  );
};
