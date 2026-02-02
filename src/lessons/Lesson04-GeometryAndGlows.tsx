/**
 * LESSON 4: GEOMETRY & GLOWS
 * ==========================
 *
 * Core concepts:
 * - SVG for crisp vector graphics
 * - CSS filters for glows and effects
 * - Drawing mathematical shapes with code
 * - Animating paths and strokes
 *
 * After Effects equivalent:
 * - SVG = Shape layers
 * - CSS filters = Layer styles (glow, shadow)
 * - Path animation = Trim paths
 */

import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Basic glowing shapes
export const GlowingShapes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulse = Math.sin(frame * 0.1) * 0.3 + 1; // Oscillates between 0.7 and 1.3

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a1a",
        justifyContent: "center",
        alignItems: "center",
        gap: 100,
        flexDirection: "row",
      }}
    >
      <div style={{
        position: "absolute",
        top: 60,
        color: "white",
        fontSize: 32,
      }}>
        Glowing Shapes with CSS Filters
      </div>

      {/* Glowing circle */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 150,
            height: 150,
            borderRadius: "50%",
            backgroundColor: "#4ecdc4",
            boxShadow: `
              0 0 20px #4ecdc4,
              0 0 40px #4ecdc4,
              0 0 60px #4ecdc4,
              0 0 ${80 * pulse}px #4ecdc4
            `,
            transform: `scale(${pulse})`,
          }}
        />
        <div style={{ color: "#4ecdc4", marginTop: 20 }}>box-shadow glow</div>
      </div>

      {/* Glowing square with filter */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 120,
            height: 120,
            backgroundColor: "#ff6b6b",
            borderRadius: 10,
            filter: `drop-shadow(0 0 ${20 * pulse}px #ff6b6b) drop-shadow(0 0 ${40 * pulse}px #ff6b6b)`,
          }}
        />
        <div style={{ color: "#ff6b6b", marginTop: 20 }}>filter: drop-shadow</div>
      </div>

      {/* Glowing triangle (using clip-path) */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 150,
            height: 130,
            backgroundColor: "#ffe66d",
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            filter: `drop-shadow(0 0 ${15 * pulse}px #ffe66d) drop-shadow(0 0 ${30 * pulse}px #ffe66d)`,
          }}
        />
        <div style={{ color: "#ffe66d", marginTop: 20 }}>clip-path triangle</div>
      </div>
    </AbsoluteFill>
  );
};

// SVG path animation - like "trim paths" in After Effects
export const AnimatedSVGPath: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Stroke animation progress
  const drawProgress = interpolate(
    frame,
    [0, 2 * fps],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  // Circle circumference = 2 * PI * radius
  const circleRadius = 100;
  const circleCircumference = 2 * Math.PI * circleRadius;

  // Triangle perimeter (equilateral, side = 180)
  const trianglePerimeter = 180 * 3;

  // Square perimeter
  const squarePerimeter = 120 * 4;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a1a",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{
        position: "absolute",
        top: 60,
        color: "white",
        fontSize: 32,
      }}>
        SVG Stroke Animation (Trim Paths)
      </div>

      <div style={{ display: "flex", gap: 100 }}>
        {/* Animated circle */}
        <svg width="250" height="250" viewBox="0 0 250 250">
          <circle
            cx="125"
            cy="125"
            r={circleRadius}
            fill="none"
            stroke="#4ecdc4"
            strokeWidth="4"
            strokeDasharray={circleCircumference}
            strokeDashoffset={circleCircumference * (1 - drawProgress)}
            strokeLinecap="round"
            style={{
              filter: "drop-shadow(0 0 10px #4ecdc4)",
            }}
          />
        </svg>

        {/* Animated triangle */}
        <svg width="250" height="250" viewBox="0 0 250 250">
          <polygon
            points="125,35 215,190 35,190"
            fill="none"
            stroke="#ff6b6b"
            strokeWidth="4"
            strokeDasharray={trianglePerimeter}
            strokeDashoffset={trianglePerimeter * (1 - drawProgress)}
            strokeLinejoin="round"
            style={{
              filter: "drop-shadow(0 0 10px #ff6b6b)",
            }}
          />
        </svg>

        {/* Animated square */}
        <svg width="250" height="250" viewBox="0 0 250 250">
          <rect
            x="65"
            y="65"
            width="120"
            height="120"
            fill="none"
            stroke="#ffe66d"
            strokeWidth="4"
            strokeDasharray={squarePerimeter}
            strokeDashoffset={squarePerimeter * (1 - drawProgress)}
            strokeLinejoin="round"
            style={{
              filter: "drop-shadow(0 0 10px #ffe66d)",
            }}
          />
        </svg>
      </div>

      <div style={{
        position: "absolute",
        bottom: 100,
        color: "white",
        fontSize: 20,
      }}>
        Progress: {Math.round(drawProgress * 100)}%
      </div>
    </AbsoluteFill>
  );
};

// Drawing a regular polygon with any number of sides
export const RegularPolygons: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Function to generate polygon points
  const getPolygonPoints = (sides: number, radius: number, cx: number, cy: number) => {
    const points: string[] = [];
    for (let i = 0; i < sides; i++) {
      // Start from top (-90 degrees)
      const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return points.join(" ");
  };

  // Animate number of sides from 3 to 12
  const sidesProgress = interpolate(
    frame,
    [0, 3 * fps],
    [3, 12],
    { extrapolateRight: "clamp" }
  );
  const sides = Math.floor(sidesProgress);

  // Rotation
  const rotation = frame * 0.5;

  // Animate drawing
  const radius = 150;
  const perimeter = 2 * radius * Math.sin(Math.PI / sides) * sides;
  const drawProgress = interpolate(
    frame % (fps * 0.5),
    [0, fps * 0.5],
    [0, 1]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a1a",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{
        position: "absolute",
        top: 60,
        color: "white",
        fontSize: 32,
      }}>
        Regular Polygons: {sides} sides
      </div>

      <svg
        width="500"
        height="500"
        viewBox="0 0 500 500"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {/* Glow layer */}
        <polygon
          points={getPolygonPoints(sides, radius, 250, 250)}
          fill="none"
          stroke="#4ecdc4"
          strokeWidth="8"
          strokeOpacity="0.3"
          style={{
            filter: "blur(10px)",
          }}
        />
        {/* Main shape */}
        <polygon
          points={getPolygonPoints(sides, radius, 250, 250)}
          fill="none"
          stroke="#4ecdc4"
          strokeWidth="3"
          strokeLinejoin="round"
          style={{
            filter: "drop-shadow(0 0 15px #4ecdc4)",
          }}
        />
        {/* Center point */}
        <circle
          cx="250"
          cy="250"
          r="5"
          fill="#4ecdc4"
          style={{
            filter: "drop-shadow(0 0 10px #4ecdc4)",
          }}
        />
        {/* Vertex points */}
        {Array.from({ length: sides }).map((_, i) => {
          const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
          const x = 250 + radius * Math.cos(angle);
          const y = 250 + radius * Math.sin(angle);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="6"
              fill="#ff6b6b"
              style={{
                filter: "drop-shadow(0 0 8px #ff6b6b)",
              }}
            />
          );
        })}
      </svg>

      <div style={{
        position: "absolute",
        bottom: 80,
        color: "#666",
        fontSize: 16,
        fontFamily: "monospace",
      }}>
        Interior angle: {((sides - 2) * 180 / sides).toFixed(1)}°
      </div>
    </AbsoluteFill>
  );
};

// Animated mathematical graph
export const AnimatedGraph: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Progress for drawing the sine wave
  const progress = interpolate(
    frame,
    [0, 3 * fps],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  // Generate sine wave path
  const generateSinePath = (progress: number) => {
    const points: string[] = [];
    const amplitude = 150;
    const frequency = 2; // Number of complete waves
    const startX = 100;
    const endX = width - 100;
    const centerY = height / 2;

    const totalPoints = Math.floor((endX - startX) * progress);

    for (let i = 0; i <= totalPoints; i++) {
      const x = startX + i;
      const normalizedX = i / (endX - startX);
      const y = centerY - amplitude * Math.sin(normalizedX * frequency * 2 * Math.PI);

      if (i === 0) {
        points.push(`M ${x} ${y}`);
      } else {
        points.push(`L ${x} ${y}`);
      }
    }

    return points.join(" ");
  };

  // Current point position
  const currentX = 100 + (width - 200) * progress;
  const currentY = height / 2 - 150 * Math.sin(progress * 2 * 2 * Math.PI);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a" }}>
      <div style={{
        position: "absolute",
        top: 60,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "white",
        fontSize: 32,
      }}>
        Animated Sine Wave: y = sin(x)
      </div>

      <svg width={width} height={height}>
        {/* Grid lines */}
        <line
          x1="100"
          y1={height / 2}
          x2={width - 100}
          y2={height / 2}
          stroke="#333"
          strokeWidth="2"
        />
        <line
          x1={width / 2}
          y1="150"
          x2={width / 2}
          y2={height - 150}
          stroke="#333"
          strokeWidth="2"
        />

        {/* Sine wave path */}
        <path
          d={generateSinePath(progress)}
          fill="none"
          stroke="#4ecdc4"
          strokeWidth="3"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 10px #4ecdc4)",
          }}
        />

        {/* Current point */}
        {progress > 0 && (
          <>
            {/* Vertical line to x-axis */}
            <line
              x1={currentX}
              y1={currentY}
              x2={currentX}
              y2={height / 2}
              stroke="#ff6b6b"
              strokeWidth="1"
              strokeDasharray="5,5"
              opacity="0.5"
            />
            {/* Point */}
            <circle
              cx={currentX}
              cy={currentY}
              r="10"
              fill="#ff6b6b"
              style={{
                filter: "drop-shadow(0 0 15px #ff6b6b)",
              }}
            />
          </>
        )}

        {/* Axis labels */}
        <text x={width - 90} y={height / 2 + 25} fill="#666" fontSize="16">x</text>
        <text x={width / 2 + 10} y="170" fill="#666" fontSize="16">y</text>
      </svg>

      <div style={{
        position: "absolute",
        bottom: 60,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "#4ecdc4",
        fontSize: 24,
        fontFamily: "monospace",
      }}>
        y = sin({(progress * 4 * Math.PI).toFixed(2)}) = {Math.sin(progress * 4 * Math.PI).toFixed(3)}
      </div>
    </AbsoluteFill>
  );
};
