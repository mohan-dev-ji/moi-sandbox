/**
 * LESSON 3: SEQUENCES & SERIES
 * ============================
 *
 * Core concepts:
 * - Sequence - Delay and duration control (like layer in/out points in AE)
 * - Series - Chain sequences one after another
 * - Nested sequences - Complex timing structures
 * - Local vs global frame references
 *
 * After Effects equivalent:
 * - Sequence = setting layer in-point and duration
 * - Series = stacking layers sequentially on timeline
 */

import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
  Series,
} from "remotion";

// Basic sequence demonstration
export const SequenceBasics: React.FC = () => {
  const { fps } = useVideoConfig();

  // Each color represents when that sequence is visible
  const colors = ["#ff6b6b", "#4ecdc4", "#ffe66d", "#95e1d3", "#AB95E1"];

  return (
    <AbsoluteFill style={{ backgroundColor: "#1a1a2e" }}>
      <div style={{
        position: "absolute",
        top: 40,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "white",
        fontSize: 28,
      }}>
        Sequences: Control when things appear
      </div>

      {/* First sequence: appears immediately, lasts 1 second */}
      <Sequence from={0} durationInFrames={fps} name="Red Box">
        <AnimatedBox color={colors[0]} label="0-1s" position={0} totalBoxes={5} />
      </Sequence>

      {/* Second sequence: appears at 1s, lasts 1 second */}
      <Sequence from={fps} durationInFrames={fps} name="Teal Box">
        <AnimatedBox color={colors[1]} label="1-2s" position={1} totalBoxes={5} />
      </Sequence>

      {/* Third sequence: appears at 2s, lasts 1 second */}
      <Sequence from={2 * fps} durationInFrames={fps} name="Yellow Box">
        <AnimatedBox color={colors[2]} label="2-3s" position={2} totalBoxes={5} />
      </Sequence>

      {/* Fourth sequence: appears at 3s, lasts 1 second */}
      <Sequence from={3 * fps} durationInFrames={fps} name="Green Box">
        <AnimatedBox color={colors[3]} label="3-4s" position={3} totalBoxes={5} />
      </Sequence>

      <Sequence from={4 * fps} durationInFrames={fps} name="Green Box">
        <AnimatedBox color={colors[4]} label="4-5s" position={4} totalBoxes={5} />
      </Sequence>

      {/* Timeline visualization at bottom */}
      <TimelineVisualization duration={5} />
    </AbsoluteFill>
  );
};

// Helper component for animated boxes
const AnimatedBox: React.FC<{
  color: string;
  label: string;
  position: number;
  totalBoxes: number;
  gap?: number;
  boxSize?: number;
}> = ({ color, label, position, totalBoxes, gap = 50, boxSize = 200 }) => {
  // IMPORTANT: Inside a Sequence, frame starts at 0!
  // This is "local time" - very useful for reusable components
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const totalWidth = totalBoxes * boxSize + (totalBoxes - 1) * gap;

  const startLeft = (width - totalWidth) / 2;

  const left = startLeft + position * (boxSize + gap);



  const scale = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  return (
    <div
      style={{
        position: "absolute", left,
        top: 300,
        width: 180,
        height: 180,
        backgroundColor: color,
        borderRadius: 20,
        transform: `scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#1a1a2e",
        fontWeight: "bold",
      }}
    >
      <div style={{ fontSize: 24 }}>{label}</div>
      <div style={{ fontSize: 16, marginTop: 8 }}>Local frame: {frame}</div>
    </div>
  );
};

// Timeline visualization helper
const TimelineVisualization: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const progress = frame / durationInFrames;

  return (
    <div style={{
      position: "absolute",
      bottom: 80,
      left: 100,
      right: 100,
    }}>
      {/* Track */}
      <div style={{
        height: 20,
        backgroundColor: "#333",
        borderRadius: 10,
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Colored segments */}
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${(i / duration) * 100}%`,
              width: `${(1 / duration) * 100}%`,
              height: "100%",
              backgroundColor: ["#ff6b6b", "#4ecdc4", "#ffe66d", "#95e1d3", "#AB95E1"][i],
              opacity: 0.5,
            }}
          />
        ))}

        {/* Playhead */}
        <div style={{
          position: "absolute",
          left: `${progress * 100}%`,
          top: 0,
          bottom: 0,
          width: 4,
          backgroundColor: "white",
          transform: "translateX(-50%)",
        }} />
      </div>

      {/* Time markers */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, color: "white" }}>
        {Array.from({ length: duration + 1 }).map((_, i) => (
          <span key={i}>{i}s</span>
        ))}
      </div>
    </div>
  );
};

// Series: automatic sequential playback
export const SeriesDemo: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#1a1a2e" }}>
      <div style={{
        position: "absolute",
        top: 40,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "white",
        fontSize: 28,
      }}>
        Series: Automatic sequential timing
      </div>

      {/* Series automatically places items one after another */}
      <Series>
        <Series.Sequence durationInFrames={fps}>
          <SceneCard title="Scene A" color="#ff6b6b" description="Plays first (1s)" />
        </Series.Sequence>

        <Series.Sequence durationInFrames={Math.floor(1.5 * fps)}>
          <SceneCard title="Scene B" color="#4ecdc4" description="Plays second (1.5s)" />
        </Series.Sequence>

        <Series.Sequence durationInFrames={fps}>
          <SceneCard title="Scene C" color="#ffe66d" description="Plays third (1s)" />
        </Series.Sequence>

        {/* Negative offset = overlap with previous scene! */}
        <Series.Sequence offset={-15} durationInFrames={fps}>
          <SceneCard title="Scene D" color="#95e1d3" description="Overlaps C by 15 frames" />
        </Series.Sequence>

        <Series.Sequence durationInFrames={fps}>
          <SceneCard title="Scene E" color="#ffe66d" description="Plays third (1s)" />
        </Series.Sequence>
      </Series>

      <TimelineVisualization duration={5} />
    </AbsoluteFill>
  );
};

const SceneCard: React.FC<{
  title: string;
  color: string;
  description: string;
}> = ({ title, color, description }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 12 } });
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 600,
          height: 250,
          backgroundColor: color,
          borderRadius: 30,
          transform: `scale(${scale})`,
          opacity,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#1a1a2e",
        }}
      >
        <div style={{ fontSize: 48, fontWeight: "bold" }}>{title}</div>
        <div style={{ fontSize: 20, marginTop: 10 }}>{description}</div>
        <div style={{ fontSize: 16, marginTop: 20, opacity: 0.7 }}>
          Local frame: {frame}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Nested sequences for complex timing
export const NestedSequences: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#1a1a2e" }}>
      <div style={{
        position: "absolute",
        top: 40,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "white",
        fontSize: 28,
      }}>
        Nested Sequences: Complex timing structures
      </div>

      {/* Parent sequence contains everything */}
      <Sequence from={0} durationInFrames={4 * fps}>
        {/* Background persists for full duration */}
        <AbsoluteFill style={{
          background: "radial-gradient(circle at center, #2a2a4e 0%, #1a1a2e 100%)",
        }} />

        {/* Title appears at 0.5s within the parent */}
        <Sequence from={Math.floor(0.5 * fps)} durationInFrames={3 * fps} layout="none">
          <FadingText text="Understanding Nested Timing" y={200} />
        </Sequence>

        {/* First element at 1s */}
        <Sequence from={fps} durationInFrames={2 * fps} layout="none">
          <FloatingCircle x={300} y={400} color="#ff6b6b" delay={0} />
        </Sequence>

        {/* Second element at 1.5s */}
        <Sequence from={Math.floor(1.5 * fps)} durationInFrames={2 * fps} layout="none">
          <FloatingCircle x={500} y={350} color="#4ecdc4" delay={0} />
        </Sequence>

        {/* Third element at 2s */}
        <Sequence from={2 * fps} durationInFrames={2 * fps} layout="none">
          <FloatingCircle x={700} y={450} color="#ffe66d" delay={0} />
        </Sequence>

        <Sequence from={2.5 * fps} durationInFrames={2 * fps} layout="none">
          <FloatingCircle x={900} y={450} color="#ffe66d" delay={0} />
        </Sequence>
      </Sequence>
    </AbsoluteFill>
  );
};

const FadingText: React.FC<{ text: string; y: number }> = ({ text, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [0, 15, fps * 2.5, fps * 3],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" }
  );

  return (
    <div style={{
      position: "absolute",
      top: y,
      left: 0,
      right: 0,
      textAlign: "center",
      fontSize: 36,
      color: "white",
      opacity,
    }}>
      {text}
    </div>
  );
};

const FloatingCircle: React.FC<{
  x: number;
  y: number;
  color: string;
  delay: number;
}> = ({ x, y, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 12 } });

  // Gentle floating animation
  const floatY = Math.sin(frame * 0.1) * 10;

  return (
    <div style={{
      position: "absolute",
      left: x + floatY,
      top: y,
      width: 100,
      height: 100,
      borderRadius: "50%",
      backgroundColor: color,
      transform: `scale(${scale})`,
      boxShadow: `0 0 30px ${color}`,
    }} />
  );
};
