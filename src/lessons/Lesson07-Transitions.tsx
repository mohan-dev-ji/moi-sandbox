/**
 * LESSON 7: TRANSITIONS BETWEEN SCENES
 * ====================================
 *
 * Core concepts:
 * - TransitionSeries for scene-to-scene animations
 * - Built-in transitions (fade, slide, wipe, flip)
 * - Timing options (linear, spring)
 * - Custom transition logic
 *
 * After Effects equivalent:
 * - Transition presets
 * - Layer blend modes during crossfade
 */

import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";
import {
  TransitionSeries,
  linearTiming,
  springTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { flip } from "@remotion/transitions/flip";

// Scene components
const SceneA: React.FC<{ title: string; color: string }> = ({ title, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: color,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: "bold",
          color: "white",
          textShadow: "0 4px 20px rgba(0,0,0,0.3)",
          transform: `scale(${scale})`,
        }}
      >
        {title}
      </div>
    </AbsoluteFill>
  );
};

// Fade transition demo
export const FadeTransition: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={2 * fps}>
          <SceneA title="Scene 1" color="#ff6b6b" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: Math.floor(0.5 * fps) })}
        />

        <TransitionSeries.Sequence durationInFrames={2 * fps}>
          <SceneA title="Scene 2" color="#4ecdc4" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: Math.floor(0.5 * fps) })}
        />

        <TransitionSeries.Sequence durationInFrames={2 * fps}>
          <SceneA title="Scene 3" color="#ffe66d" />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Overlay label */}
      <div style={{
        position: "absolute",
        top: 40,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "white",
        fontSize: 24,
        textShadow: "0 2px 10px rgba(0,0,0,0.5)",
      }}>
        Fade Transition
      </div>
    </AbsoluteFill>
  );
};

// Slide transition demo
export const SlideTransition: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={2 * fps}>
          <SceneA title="Slide Left" color="#ff6b6b" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-left" })}
          timing={springTiming({ config: { damping: 200 } })}
        />

        <TransitionSeries.Sequence durationInFrames={2 * fps}>
          <SceneA title="Slide Right" color="#4ecdc4" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={springTiming({ config: { damping: 200 } })}
        />

        <TransitionSeries.Sequence durationInFrames={2 * fps}>
          <SceneA title="Slide Up" color="#ffe66d" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={springTiming({ config: { damping: 200 } })}
        />

        <TransitionSeries.Sequence durationInFrames={2 * fps}>
          <SceneA title="Done!" color="#95e1d3" />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <div style={{
        position: "absolute",
        top: 40,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "white",
        fontSize: 24,
        textShadow: "0 2px 10px rgba(0,0,0,0.5)",
      }}>
        Slide Transitions (with spring timing)
      </div>
    </AbsoluteFill>
  );
};

// Wipe and flip transitions
export const WipeAndFlip: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={2 * fps}>
          <SceneA title="Wipe" color="#ff6b6b" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: fps })}
        />

        <TransitionSeries.Sequence durationInFrames={2 * fps}>
          <SceneA title="Flip" color="#4ecdc4" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={flip({ direction: "from-left" })}
          timing={springTiming({ config: { damping: 200 } })}
        />

        <TransitionSeries.Sequence durationInFrames={2 * fps}>
          <SceneA title="Complete!" color="#ffe66d" />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <div style={{
        position: "absolute",
        top: 40,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "white",
        fontSize: 24,
        textShadow: "0 2px 10px rgba(0,0,0,0.5)",
      }}>
        Wipe and Flip Transitions
      </div>
    </AbsoluteFill>
  );
};

// Custom transition using manual interpolation
export const CustomTransition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Calculate which scene we're in
  const sceneDuration = 2 * fps;
  const transitionDuration = fps;

  // Scene 1: frames 0 to 60
  // Transition: frames 60 to 90
  // Scene 2: frames 90 to 150

  const transitionStart = sceneDuration;
  const transitionEnd = sceneDuration + transitionDuration;

  // Progress through transition (0 to 1)
  const transitionProgress = interpolate(
    frame,
    [transitionStart, transitionEnd],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Custom "zoom through" effect
  const scene1Scale = interpolate(transitionProgress, [0, 1], [1, 3]);
  const scene1Opacity = interpolate(transitionProgress, [0, 0.5], [1, 0], { extrapolateRight: "clamp" });
  const scene1Blur = interpolate(transitionProgress, [0, 0.5], [0, 20], { extrapolateRight: "clamp" });

  const scene2Scale = interpolate(transitionProgress, [0, 1], [0.3, 1]);
  const scene2Opacity = interpolate(transitionProgress, [0.5, 1], [0, 1], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a" }}>
      {/* Scene 1 */}
      <AbsoluteFill
        style={{
          backgroundColor: "#ff6b6b",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${scene1Scale})`,
          opacity: scene1Opacity,
          filter: `blur(${scene1Blur}px)`,
        }}
      >
        <div style={{ fontSize: 72, fontWeight: "bold", color: "white" }}>
          Scene 1
        </div>
      </AbsoluteFill>

      {/* Scene 2 */}
      <AbsoluteFill
        style={{
          backgroundColor: "#4ecdc4",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${scene2Scale})`,
          opacity: scene2Opacity,
        }}
      >
        <div style={{ fontSize: 72, fontWeight: "bold", color: "white" }}>
          Scene 2
        </div>
      </AbsoluteFill>

      <div style={{
        position: "absolute",
        top: 40,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "white",
        fontSize: 24,
        textShadow: "0 2px 10px rgba(0,0,0,0.5)",
        zIndex: 100,
      }}>
        Custom "Zoom Through" Transition
      </div>

      <div style={{
        position: "absolute",
        bottom: 40,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "white",
        fontSize: 16,
        fontFamily: "monospace",
        zIndex: 100,
      }}>
        Transition progress: {(transitionProgress * 100).toFixed(0)}%
      </div>
    </AbsoluteFill>
  );
};

// Geometric transition - shapes reveal next scene
export const GeometricTransition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const transitionStart = 2 * fps;
  const transitionDuration = fps;

  const progress = interpolate(
    frame,
    [transitionStart, transitionStart + transitionDuration],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Generate expanding circles
  const numCircles = 6;
  const circles = Array.from({ length: numCircles }).map((_, i) => {
    const delay = i * 0.1;
    const circleProgress = interpolate(
      progress,
      [delay, delay + 0.6],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    // Random-ish positions based on index
    const angle = (i / numCircles) * Math.PI * 2;
    const distance = 200;
    const x = width / 2 + Math.cos(angle) * distance * (1 - circleProgress);
    const y = height / 2 + Math.sin(angle) * distance * (1 - circleProgress);

    // Max radius to cover screen from any point
    const maxRadius = Math.sqrt(width * width + height * height);
    const radius = circleProgress * maxRadius;

    return { x, y, radius, color: "#4ecdc4" };
  });

  return (
    <AbsoluteFill>
      {/* Scene 1 (background) */}
      <AbsoluteFill
        style={{
          backgroundColor: "#ff6b6b",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: "bold", color: "white" }}>
          Scene 1
        </div>
      </AbsoluteFill>

      {/* Geometric mask revealing Scene 2 */}
      <svg
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <defs>
          <clipPath id="circleReveal">
            {circles.map((circle, i) => (
              <circle
                key={i}
                cx={circle.x}
                cy={circle.y}
                r={circle.radius}
              />
            ))}
          </clipPath>
        </defs>

        {/* Scene 2 inside clip path */}
        <foreignObject
          width={width}
          height={height}
          clipPath="url(#circleReveal)"
        >
          <div
            style={{
              width,
              height,
              backgroundColor: "#4ecdc4",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 72, fontWeight: "bold", color: "white" }}>
              Scene 2
            </div>
          </div>
        </foreignObject>
      </svg>

      <div style={{
        position: "absolute",
        top: 40,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "white",
        fontSize: 24,
        textShadow: "0 2px 10px rgba(0,0,0,0.5)",
        zIndex: 100,
      }}>
        Geometric Circle Reveal Transition
      </div>
    </AbsoluteFill>
  );
};
