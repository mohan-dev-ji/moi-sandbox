/**
 * LESSON 5: VECTOR POINTS & CONNECTIONS
 * =====================================
 *
 * Core concepts:
 * - Creating point arrays
 * - Drawing lines between points
 * - Animating individual vertices
 * - Building geometric constructions
 *
 * This is fundamental for 3Blue1Brown-style math animations!
 */

import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

// Point type for clarity
type Point = { x: number; y: number };

// Animated dots appearing one by one
export const AnimatedDots: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Grid of points
  const gridSize = 5;
  const spacing = 120;
  const startX = (width - (gridSize - 1) * spacing) / 2;
  const startY = (height - (gridSize - 1) * spacing) / 2;

  const points: Point[] = [];
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      points.push({
        x: startX + col * spacing,
        y: startY + row * spacing,
      });
    }
  }

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a" }}>
      <div style={{
        position: "absolute",
        top: 40,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "white",
        fontSize: 28,
      }}>
        Animated Point Grid
      </div>

      <svg width={width} height={height}>
        {points.map((point, i) => {
          // Stagger the appearance
          const delay = i * 2; // 2 frames between each point
          const localFrame = Math.max(0, frame - delay);

          const scale = spring({
            frame: localFrame,
            fps,
            config: { damping: 10 },
          });

          const opacity = interpolate(
            localFrame,
            [0, 10],
            [0, 1],
            { extrapolateRight: "clamp" }
          );

          return (
            <g key={i}>
              {/* Glow */}
              <circle
                cx={point.x}
                cy={point.y}
                r={12 * scale}
                fill="#4ecdc4"
                opacity={opacity * 0.3}
                style={{ filter: "blur(8px)" }}
              />
              {/* Point */}
              <circle
                cx={point.x}
                cy={point.y}
                r={8 * scale}
                fill="#4ecdc4"
                opacity={opacity}
              />
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

// Connecting dots with animated lines
export const ConnectedDots: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Pentagon vertices
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 200;

  const vertices: Point[] = [];
  for (let i = 0; i < 5; i++) {
    const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
    vertices.push({
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    });
  }

  // All possible connections (edges of a complete graph K5)
  const connections: [number, number][] = [];
  for (let i = 0; i < 5; i++) {
    for (let j = i + 1; j < 5; j++) {
      connections.push([i, j]);
    }
  }

  // Animation phases
  const pointsProgress = interpolate(frame, [0, fps], [0, 1], { extrapolateRight: "clamp" });
  const linesProgress = interpolate(frame, [fps, 3 * fps], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a" }}>
      <div style={{
        position: "absolute",
        top: 40,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "white",
        fontSize: 28,
      }}>
        Complete Graph K5 (Pentagon with all diagonals)
      </div>

      <svg width={width} height={height}>
        {/* Draw connections */}
        {connections.map(([i, j], idx) => {
          const connectionProgress = interpolate(
            linesProgress,
            [idx / connections.length, (idx + 1) / connections.length],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const p1 = vertices[i];
          const p2 = vertices[j];

          // Interpolate endpoint for drawing animation
          const currentX = p1.x + (p2.x - p1.x) * connectionProgress;
          const currentY = p1.y + (p2.y - p1.y) * connectionProgress;

          return (
            <g key={`line-${idx}`}>
              {/* Glow line */}
              <line
                x1={p1.x}
                y1={p1.y}
                x2={currentX}
                y2={currentY}
                stroke="#4ecdc4"
                strokeWidth="6"
                opacity="0.2"
                style={{ filter: "blur(4px)" }}
              />
              {/* Main line */}
              <line
                x1={p1.x}
                y1={p1.y}
                x2={currentX}
                y2={currentY}
                stroke="#4ecdc4"
                strokeWidth="2"
              />
            </g>
          );
        })}

        {/* Draw vertices */}
        {vertices.map((point, i) => {
          const pointProgress = interpolate(
            pointsProgress,
            [i / 5, (i + 1) / 5],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const scale = spring({
            frame: Math.floor(pointProgress * fps),
            fps,
            config: { damping: 10 },
          });

          return (
            <g key={`point-${i}`}>
              <circle
                cx={point.x}
                cy={point.y}
                r={15 * scale}
                fill="#ff6b6b"
                style={{ filter: "drop-shadow(0 0 10px #ff6b6b)" }}
              />
              <text
                x={point.x}
                y={point.y + 40}
                fill="white"
                fontSize="16"
                textAnchor="middle"
                opacity={scale}
              >
                P{i + 1}
              </text>
            </g>
          );
        })}
      </svg>

      <div style={{
        position: "absolute",
        bottom: 60,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "#666",
        fontSize: 18,
      }}>
        5 vertices, {connections.length} edges (n(n-1)/2 for complete graph)
      </div>
    </AbsoluteFill>
  );
};

// Vector addition visualization
export const VectorAddition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const origin: Point = { x: width / 2 - 200, y: height / 2 + 100 };

  // Two vectors to add
  const vectorA: Point = { x: 250, y: -150 }; // Right and up
  const vectorB: Point = { x: 150, y: -200 }; // Right and up

  // Animation progress
  const showA = interpolate(frame, [0, fps], [0, 1], { extrapolateRight: "clamp" });
  const showB = interpolate(frame, [fps, 2 * fps], [0, 1], { extrapolateRight: "clamp" });
  const showResult = interpolate(frame, [2 * fps, 3 * fps], [0, 1], { extrapolateRight: "clamp" });

  // Draw an arrow
  const Arrow: React.FC<{
    from: Point;
    to: Point;
    color: string;
    progress: number;
    label: string;
    labelOffset?: Point;
  }> = ({ from, to, color, progress, label, labelOffset = { x: 0, y: 0 } }) => {
    const currentTo: Point = {
      x: from.x + (to.x - from.x) * progress,
      y: from.y + (to.y - from.y) * progress,
    };

    // Arrow head
    const angle = Math.atan2(to.y - from.y, to.x - from.x);
    const headLength = 15;
    const headAngle = Math.PI / 6;

    const head1: Point = {
      x: currentTo.x - headLength * Math.cos(angle - headAngle),
      y: currentTo.y - headLength * Math.sin(angle - headAngle),
    };
    const head2: Point = {
      x: currentTo.x - headLength * Math.cos(angle + headAngle),
      y: currentTo.y - headLength * Math.sin(angle + headAngle),
    };

    const midPoint: Point = {
      x: (from.x + currentTo.x) / 2 + labelOffset.x,
      y: (from.y + currentTo.y) / 2 + labelOffset.y,
    };

    return (
      <g opacity={progress > 0 ? 1 : 0}>
        {/* Glow */}
        <line
          x1={from.x}
          y1={from.y}
          x2={currentTo.x}
          y2={currentTo.y}
          stroke={color}
          strokeWidth="8"
          opacity="0.2"
          style={{ filter: "blur(4px)" }}
        />
        {/* Line */}
        <line
          x1={from.x}
          y1={from.y}
          x2={currentTo.x}
          y2={currentTo.y}
          stroke={color}
          strokeWidth="3"
        />
        {/* Arrow head */}
        {progress >= 0.9 && (
          <polygon
            points={`${currentTo.x},${currentTo.y} ${head1.x},${head1.y} ${head2.x},${head2.y}`}
            fill={color}
          />
        )}
        {/* Label */}
        {progress >= 0.5 && (
          <text
            x={midPoint.x}
            y={midPoint.y}
            fill={color}
            fontSize="24"
            fontWeight="bold"
            textAnchor="middle"
            style={{ filter: `drop-shadow(0 0 5px ${color})` }}
          >
            {label}
          </text>
        )}
      </g>
    );
  };

  // B starts from end of A
  const endOfA: Point = {
    x: origin.x + vectorA.x,
    y: origin.y + vectorA.y,
  };

  // Result: A + B
  const resultEnd: Point = {
    x: origin.x + vectorA.x + vectorB.x,
    y: origin.y + vectorA.y + vectorB.y,
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a" }}>
      <div style={{
        position: "absolute",
        top: 40,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "white",
        fontSize: 28,
      }}>
        Vector Addition: A + B = C
      </div>

      <svg width={width} height={height}>
        {/* Grid for reference */}
        {Array.from({ length: 20 }).map((_, i) => (
          <g key={i}>
            <line
              x1={i * 100}
              y1={0}
              x2={i * 100}
              y2={height}
              stroke="#1a1a3a"
              strokeWidth="1"
            />
            <line
              x1={0}
              y1={i * 100}
              x2={width}
              y2={i * 100}
              stroke="#1a1a3a"
              strokeWidth="1"
            />
          </g>
        ))}

        {/* Origin point */}
        <circle
          cx={origin.x}
          cy={origin.y}
          r="8"
          fill="white"
        />

        {/* Vector A (from origin) */}
        <Arrow
          from={origin}
          to={{ x: origin.x + vectorA.x, y: origin.y + vectorA.y }}
          color="#ff6b6b"
          progress={showA}
          label="A"
          labelOffset={{ x: -20, y: 0 }}
        />

        {/* Vector B (from end of A) */}
        <Arrow
          from={endOfA}
          to={resultEnd}
          color="#4ecdc4"
          progress={showB}
          label="B"
          labelOffset={{ x: 20, y: 0 }}
        />

        {/* Result vector (from origin to end) */}
        <Arrow
          from={origin}
          to={resultEnd}
          color="#ffe66d"
          progress={showResult}
          label="A + B"
          labelOffset={{ x: 0, y: 30 }}
        />
      </svg>

      <div style={{
        position: "absolute",
        bottom: 60,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "white",
        fontSize: 20,
        fontFamily: "monospace",
      }}>
        <span style={{ color: "#ff6b6b" }}>A({vectorA.x}, {-vectorA.y})</span>
        {" + "}
        <span style={{ color: "#4ecdc4" }}>B({vectorB.x}, {-vectorB.y})</span>
        {" = "}
        <span style={{ color: "#ffe66d" }}>({vectorA.x + vectorB.x}, {-(vectorA.y + vectorB.y)})</span>
      </div>
    </AbsoluteFill>
  );
};

// Morphing between shapes
export const MorphingShapes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 180;

  // Generate polygon vertices
  const getPolygonVertices = (sides: number): Point[] => {
    const vertices: Point[] = [];
    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
      vertices.push({
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      });
    }
    return vertices;
  };

  // Interpolate between two sets of vertices
  const morphVertices = (from: Point[], to: Point[], progress: number): Point[] => {
    // Ensure same number of points by duplicating
    const maxPoints = Math.max(from.length, to.length);
    const normalizedFrom = normalizePoints(from, maxPoints);
    const normalizedTo = normalizePoints(to, maxPoints);

    return normalizedFrom.map((p, i) => ({
      x: p.x + (normalizedTo[i].x - p.x) * progress,
      y: p.y + (normalizedTo[i].y - p.y) * progress,
    }));
  };

  // Normalize point count by distributing points evenly
  const normalizePoints = (points: Point[], targetCount: number): Point[] => {
    if (points.length === targetCount) return points;

    const result: Point[] = [];
    for (let i = 0; i < targetCount; i++) {
      const index = (i / targetCount) * points.length;
      const lower = Math.floor(index) % points.length;
      const upper = (lower + 1) % points.length;
      const t = index - Math.floor(index);

      result.push({
        x: points[lower].x + (points[upper].x - points[lower].x) * t,
        y: points[lower].y + (points[upper].y - points[lower].y) * t,
      });
    }
    return result;
  };

  // Cycle through shapes: triangle -> square -> pentagon -> hexagon -> circle(ish)
  const shapes = [3, 4, 5, 6, 12];
  const cycleDuration = fps * 1.5; // 1.5 seconds per morph
  const totalCycle = cycleDuration * shapes.length;
  const cycleFrame = frame % totalCycle;

  const currentShapeIndex = Math.floor(cycleFrame / cycleDuration);
  const nextShapeIndex = (currentShapeIndex + 1) % shapes.length;
  const morphProgress = (cycleFrame % cycleDuration) / cycleDuration;

  const easeProgress = Easing.inOut(Easing.quad)(morphProgress);

  const currentVertices = getPolygonVertices(shapes[currentShapeIndex]);
  const nextVertices = getPolygonVertices(shapes[nextShapeIndex]);
  const morphedVertices = morphVertices(currentVertices, nextVertices, easeProgress);

  // Convert to path
  const pathData = morphedVertices
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ") + " Z";

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a" }}>
      <div style={{
        position: "absolute",
        top: 40,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "white",
        fontSize: 28,
      }}>
        Shape Morphing: {shapes[currentShapeIndex]} sides → {shapes[nextShapeIndex]} sides
      </div>

      <svg width={width} height={height}>
        {/* Glow */}
        <path
          d={pathData}
          fill="none"
          stroke="#4ecdc4"
          strokeWidth="12"
          opacity="0.2"
          style={{ filter: "blur(10px)" }}
        />
        {/* Main shape */}
        <path
          d={pathData}
          fill="rgba(78, 205, 196, 0.1)"
          stroke="#4ecdc4"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Vertices */}
        {morphedVertices.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="6"
            fill="#ff6b6b"
            style={{ filter: "drop-shadow(0 0 8px #ff6b6b)" }}
          />
        ))}
      </svg>
    </AbsoluteFill>
  );
};
