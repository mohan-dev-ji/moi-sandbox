/**
 * LESSON 8: MATH VISUALIZATION (3Blue1Brown Style)
 * ================================================
 *
 * This lesson combines everything we've learned to create
 * educational math animations similar to 3Blue1Brown.
 *
 * Core patterns:
 * - Coordinate systems with animated grids
 * - Function plotting with tracing points
 * - Geometric proofs with step-by-step reveals
 * - Equation displays synchronized with visuals
 */

import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
  Easing,
} from "remotion";

// Coordinate system helper
const CoordinateGrid: React.FC<{
  width: number;
  height: number;
  gridSize?: number;
  axisColor?: string;
  gridColor?: string;
  showLabels?: boolean;
}> = ({
  width,
  height,
  gridSize = 50,
  axisColor = "#4ecdc4",
  gridColor = "#1a3a3a",
  showLabels = true,
}) => {
  const centerX = width / 2;
  const centerY = height / 2;

  const gridLines: JSX.Element[] = [];

  // Vertical lines
  for (let x = centerX % gridSize; x < width; x += gridSize) {
    const isAxis = Math.abs(x - centerX) < 1;
    gridLines.push(
      <line
        key={`v-${x}`}
        x1={x}
        y1={0}
        x2={x}
        y2={height}
        stroke={isAxis ? axisColor : gridColor}
        strokeWidth={isAxis ? 2 : 1}
      />
    );
  }

  // Horizontal lines
  for (let y = centerY % gridSize; y < height; y += gridSize) {
    const isAxis = Math.abs(y - centerY) < 1;
    gridLines.push(
      <line
        key={`h-${y}`}
        x1={0}
        y1={y}
        x2={width}
        y2={y}
        stroke={isAxis ? axisColor : gridColor}
        strokeWidth={isAxis ? 2 : 1}
      />
    );
  }

  // Labels
  const labels: JSX.Element[] = [];
  if (showLabels) {
    for (let i = -10; i <= 10; i++) {
      if (i === 0) continue;
      // X axis labels
      labels.push(
        <text
          key={`xl-${i}`}
          x={centerX + i * gridSize}
          y={centerY + 20}
          fill="#666"
          fontSize="12"
          textAnchor="middle"
        >
          {i}
        </text>
      );
      // Y axis labels
      labels.push(
        <text
          key={`yl-${i}`}
          x={centerX - 15}
          y={centerY - i * gridSize + 4}
          fill="#666"
          fontSize="12"
          textAnchor="middle"
        >
          {i}
        </text>
      );
    }
  }

  return (
    <g>
      {gridLines}
      {labels}
    </g>
  );
};

// Pythagorean theorem visualization
export const PythagoreanTheorem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Animation phases
  const showTriangle = interpolate(frame, [0, fps], [0, 1], { extrapolateRight: "clamp" });
  const showSquareA = interpolate(frame, [fps, 2 * fps], [0, 1], { extrapolateRight: "clamp" });
  const showSquareB = interpolate(frame, [2 * fps, 3 * fps], [0, 1], { extrapolateRight: "clamp" });
  const showSquareC = interpolate(frame, [3 * fps, 4 * fps], [0, 1], { extrapolateRight: "clamp" });
  const showEquation = interpolate(frame, [4 * fps, 4.5 * fps], [0, 1], { extrapolateRight: "clamp" });

  // Triangle vertices
  const scale = 80;
  const a = 3; // horizontal side
  const b = 4; // vertical side
  const c = 5; // hypotenuse

  const originX = width / 2 - 100;
  const originY = height / 2 + 100;

  const pointA = { x: originX, y: originY };
  const pointB = { x: originX + a * scale, y: originY };
  const pointC = { x: originX, y: originY - b * scale };

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a" }}>
      <svg width={width} height={height}>
        {/* Title */}
        <text
          x={width / 2}
          y={60}
          fill="white"
          fontSize="36"
          textAnchor="middle"
          fontWeight="bold"
        >
          Pythagorean Theorem
        </text>

        {/* Triangle */}
        <g opacity={showTriangle}>
          <polygon
            points={`${pointA.x},${pointA.y} ${pointB.x},${pointB.y} ${pointC.x},${pointC.y}`}
            fill="none"
            stroke="#4ecdc4"
            strokeWidth="3"
            style={{ filter: "drop-shadow(0 0 10px #4ecdc4)" }}
          />

          {/* Right angle marker */}
          <path
            d={`M ${pointA.x + 20} ${pointA.y} L ${pointA.x + 20} ${pointA.y - 20} L ${pointA.x} ${pointA.y - 20}`}
            fill="none"
            stroke="#4ecdc4"
            strokeWidth="2"
          />

          {/* Side labels */}
          <text x={pointA.x + (a * scale) / 2} y={pointA.y + 30} fill="#ff6b6b" fontSize="24" textAnchor="middle">
            a = {a}
          </text>
          <text x={pointA.x - 30} y={pointA.y - (b * scale) / 2} fill="#ffe66d" fontSize="24" textAnchor="middle">
            b = {b}
          </text>
          <text
            x={(pointB.x + pointC.x) / 2 + 30}
            y={(pointB.y + pointC.y) / 2}
            fill="#95e1d3"
            fontSize="24"
            textAnchor="middle"
          >
            c = {c}
          </text>
        </g>

        {/* Square on side a */}
        <g opacity={showSquareA}>
          <rect
            x={pointA.x}
            y={pointA.y}
            width={a * scale}
            height={a * scale}
            fill="rgba(255, 107, 107, 0.3)"
            stroke="#ff6b6b"
            strokeWidth="2"
          />
          <text
            x={pointA.x + (a * scale) / 2}
            y={pointA.y + (a * scale) / 2 + 8}
            fill="#ff6b6b"
            fontSize="20"
            textAnchor="middle"
          >
            a² = {a * a}
          </text>
        </g>

        {/* Square on side b */}
        <g opacity={showSquareB}>
          <rect
            x={pointA.x - b * scale}
            y={pointC.y}
            width={b * scale}
            height={b * scale}
            fill="rgba(255, 230, 109, 0.3)"
            stroke="#ffe66d"
            strokeWidth="2"
          />
          <text
            x={pointA.x - (b * scale) / 2}
            y={pointC.y + (b * scale) / 2 + 8}
            fill="#ffe66d"
            fontSize="20"
            textAnchor="middle"
          >
            b² = {b * b}
          </text>
        </g>

        {/* Square on side c (hypotenuse) */}
        <g opacity={showSquareC}>
          {/* Rotated square on hypotenuse */}
          <g transform={`rotate(${-Math.atan2(b, a) * (180 / Math.PI)}, ${pointB.x}, ${pointB.y})`}>
            <rect
              x={pointB.x}
              y={pointB.y - c * scale}
              width={c * scale}
              height={c * scale}
              fill="rgba(149, 225, 211, 0.3)"
              stroke="#95e1d3"
              strokeWidth="2"
            />
            <text
              x={pointB.x + (c * scale) / 2}
              y={pointB.y - (c * scale) / 2 + 8}
              fill="#95e1d3"
              fontSize="20"
              textAnchor="middle"
              transform={`rotate(${Math.atan2(b, a) * (180 / Math.PI)}, ${pointB.x + (c * scale) / 2}, ${pointB.y - (c * scale) / 2})`}
            >
              c² = {c * c}
            </text>
          </g>
        </g>

        {/* Equation */}
        <g opacity={showEquation}>
          <rect
            x={width / 2 - 200}
            y={height - 120}
            width={400}
            height={60}
            rx={10}
            fill="rgba(78, 205, 196, 0.1)"
            stroke="#4ecdc4"
            strokeWidth="2"
          />
          <text
            x={width / 2}
            y={height - 80}
            fill="white"
            fontSize="32"
            textAnchor="middle"
            fontFamily="serif"
          >
            <tspan fill="#ff6b6b">{a}²</tspan>
            {" + "}
            <tspan fill="#ffe66d">{b}²</tspan>
            {" = "}
            <tspan fill="#95e1d3">{c}²</tspan>
            {"  →  "}
            <tspan fill="#ff6b6b">{a * a}</tspan>
            {" + "}
            <tspan fill="#ffe66d">{b * b}</tspan>
            {" = "}
            <tspan fill="#95e1d3">{c * c}</tspan>
          </text>
        </g>
      </svg>
    </AbsoluteFill>
  );
};

// Animated function graph
export const AnimatedFunction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const centerX = width / 2;
  const centerY = height / 2;
  const scale = 50;

  // Draw progress
  const drawProgress = interpolate(frame, [0, 3 * fps], [0, 1], { extrapolateRight: "clamp" });

  // Generate parabola points
  const generateParabola = (progress: number) => {
    const points: string[] = [];
    const xRange = 8; // -4 to 4
    const totalPoints = Math.floor(xRange * 20 * progress);

    for (let i = 0; i <= totalPoints; i++) {
      const x = -4 + (i / (xRange * 20)) * xRange;
      const y = x * x; // y = x²

      const screenX = centerX + x * scale;
      const screenY = centerY - y * scale; // Flip Y for screen coordinates

      if (i === 0) {
        points.push(`M ${screenX} ${screenY}`);
      } else {
        points.push(`L ${screenX} ${screenY}`);
      }
    }

    return points.join(" ");
  };

  // Current point
  const currentX = -4 + drawProgress * 8;
  const currentY = currentX * currentX;
  const screenCurrentX = centerX + currentX * scale;
  const screenCurrentY = centerY - currentY * scale;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a" }}>
      <svg width={width} height={height}>
        <CoordinateGrid width={width} height={height} gridSize={scale} />

        {/* Function label */}
        <text
          x={width / 2}
          y={60}
          fill="white"
          fontSize="36"
          textAnchor="middle"
          fontFamily="serif"
        >
          f(x) = x²
        </text>

        {/* Parabola */}
        <path
          d={generateParabola(drawProgress)}
          fill="none"
          stroke="#ff6b6b"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 10px #ff6b6b)" }}
        />

        {/* Current point */}
        {drawProgress > 0 && (
          <g>
            {/* Vertical line to x-axis */}
            <line
              x1={screenCurrentX}
              y1={screenCurrentY}
              x2={screenCurrentX}
              y2={centerY}
              stroke="#4ecdc4"
              strokeWidth="1"
              strokeDasharray="5,5"
              opacity="0.5"
            />
            {/* Horizontal line to y-axis */}
            <line
              x1={screenCurrentX}
              y1={screenCurrentY}
              x2={centerX}
              y2={screenCurrentY}
              stroke="#ffe66d"
              strokeWidth="1"
              strokeDasharray="5,5"
              opacity="0.5"
            />
            {/* Point */}
            <circle
              cx={screenCurrentX}
              cy={screenCurrentY}
              r="8"
              fill="#ff6b6b"
              style={{ filter: "drop-shadow(0 0 10px #ff6b6b)" }}
            />
          </g>
        )}

        {/* Coordinate display */}
        <text
          x={width / 2}
          y={height - 60}
          fill="white"
          fontSize="24"
          textAnchor="middle"
          fontFamily="monospace"
        >
          x = {currentX.toFixed(2)}, y = x² = {currentY.toFixed(2)}
        </text>
      </svg>
    </AbsoluteFill>
  );
};

// Circle and Pi visualization
export const CircleAndPi: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 150;

  // Animation phases
  const drawCircle = interpolate(frame, [0, fps], [0, 1], { extrapolateRight: "clamp" });
  const showRadius = interpolate(frame, [fps, 1.5 * fps], [0, 1], { extrapolateRight: "clamp" });
  const unrollCircumference = interpolate(frame, [2 * fps, 4 * fps], [0, 1], { extrapolateRight: "clamp" });

  // Circle circumference
  const circumference = 2 * Math.PI * radius;
  const circumferenceDrawn = circumference * drawCircle;

  // Unrolled line position
  const unrollStartY = centerY + radius + 80;
  const unrolledLength = circumference * unrollCircumference;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a" }}>
      <svg width={width} height={height}>
        {/* Title */}
        <text
          x={width / 2}
          y={60}
          fill="white"
          fontSize="36"
          textAnchor="middle"
          fontWeight="bold"
        >
          The Circumference of a Circle
        </text>

        {/* Circle being drawn */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke="#4ecdc4"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - circumferenceDrawn}
          style={{ filter: "drop-shadow(0 0 10px #4ecdc4)" }}
        />

        {/* Center point */}
        <circle
          cx={centerX}
          cy={centerY}
          r="5"
          fill="#ff6b6b"
        />

        {/* Radius line */}
        <g opacity={showRadius}>
          <line
            x1={centerX}
            y1={centerY}
            x2={centerX + radius}
            y2={centerY}
            stroke="#ff6b6b"
            strokeWidth="3"
          />
          <text
            x={centerX + radius / 2}
            y={centerY - 15}
            fill="#ff6b6b"
            fontSize="24"
            textAnchor="middle"
          >
            r
          </text>
        </g>

        {/* Unrolled circumference line */}
        {unrollCircumference > 0 && (
          <g>
            {/* The unrolled line */}
            <line
              x1={centerX - circumference / 2}
              y1={unrollStartY}
              x2={centerX - circumference / 2 + unrolledLength}
              y2={unrollStartY}
              stroke="#4ecdc4"
              strokeWidth="3"
              style={{ filter: "drop-shadow(0 0 10px #4ecdc4)" }}
            />

            {/* Markers for each radius length */}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => {
              const x = centerX - circumference / 2 + i * radius;
              if (x > centerX - circumference / 2 + unrolledLength) return null;
              return (
                <g key={i}>
                  <line
                    x1={x}
                    y1={unrollStartY - 10}
                    x2={x}
                    y2={unrollStartY + 10}
                    stroke={i <= 3 ? "#ff6b6b" : "#ffe66d"}
                    strokeWidth="2"
                  />
                  <text
                    x={x}
                    y={unrollStartY + 30}
                    fill="white"
                    fontSize="16"
                    textAnchor="middle"
                  >
                    {i}r
                  </text>
                </g>
              );
            })}

            {/* Pi markers */}
            {unrollCircumference > 0.5 && (
              <g>
                <line
                  x1={centerX - circumference / 2 + Math.PI * radius}
                  y1={unrollStartY - 15}
                  x2={centerX - circumference / 2 + Math.PI * radius}
                  y2={unrollStartY + 15}
                  stroke="#95e1d3"
                  strokeWidth="3"
                />
                <text
                  x={centerX - circumference / 2 + Math.PI * radius}
                  y={unrollStartY - 25}
                  fill="#95e1d3"
                  fontSize="20"
                  textAnchor="middle"
                >
                  π·r
                </text>
              </g>
            )}
          </g>
        )}

        {/* Formula */}
        {unrollCircumference > 0.9 && (
          <text
            x={width / 2}
            y={height - 80}
            fill="white"
            fontSize="28"
            textAnchor="middle"
            fontFamily="serif"
          >
            C = 2πr ≈ {(2 * Math.PI).toFixed(4)}r ≈ 6.28r
          </text>
        )}
      </svg>
    </AbsoluteFill>
  );
};

// Unit circle and trigonometry
export const UnitCircleTrig: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const centerX = width / 2 - 200;
  const centerY = height / 2;
  const radius = 200;

  // Angle sweeps from 0 to 2π
  const angle = interpolate(
    frame,
    [0, 4 * fps],
    [0, Math.PI * 2],
    { extrapolateRight: "extend" }
  );

  // Point on circle
  const pointX = centerX + Math.cos(angle) * radius;
  const pointY = centerY - Math.sin(angle) * radius;

  // Sine and cosine values
  const sinValue = Math.sin(angle);
  const cosValue = Math.cos(angle);

  // Graph for sine wave
  const graphStartX = width / 2 + 50;
  const graphWidth = width / 2 - 100;
  const graphCenterY = height / 2;
  const graphAmplitude = 150;

  // Generate sine wave path
  const sineWavePath = () => {
    const points: string[] = [];
    const totalPoints = Math.floor((angle / (Math.PI * 2)) * 200);

    for (let i = 0; i <= totalPoints; i++) {
      const a = (i / 200) * Math.PI * 2;
      const x = graphStartX + (a / (Math.PI * 2)) * graphWidth;
      const y = graphCenterY - Math.sin(a) * graphAmplitude;

      if (i === 0) {
        points.push(`M ${x} ${y}`);
      } else {
        points.push(`L ${x} ${y}`);
      }
    }
    return points.join(" ");
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a" }}>
      <svg width={width} height={height}>
        {/* Title */}
        <text
          x={width / 2}
          y={50}
          fill="white"
          fontSize="32"
          textAnchor="middle"
          fontWeight="bold"
        >
          Unit Circle and Sine Wave
        </text>

        {/* Unit circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke="#333"
          strokeWidth="2"
        />

        {/* Axes for circle */}
        <line x1={centerX - radius - 20} y1={centerY} x2={centerX + radius + 20} y2={centerY} stroke="#444" strokeWidth="1" />
        <line x1={centerX} y1={centerY - radius - 20} x2={centerX} y2={centerY + radius + 20} stroke="#444" strokeWidth="1" />

        {/* Radius line (rotating) */}
        <line
          x1={centerX}
          y1={centerY}
          x2={pointX}
          y2={pointY}
          stroke="white"
          strokeWidth="2"
        />

        {/* Cosine projection (horizontal) */}
        <line
          x1={centerX}
          y1={centerY}
          x2={centerX + cosValue * radius}
          y2={centerY}
          stroke="#4ecdc4"
          strokeWidth="4"
          style={{ filter: "drop-shadow(0 0 5px #4ecdc4)" }}
        />

        {/* Sine projection (vertical) */}
        <line
          x1={pointX}
          y1={centerY}
          x2={pointX}
          y2={pointY}
          stroke="#ff6b6b"
          strokeWidth="4"
          style={{ filter: "drop-shadow(0 0 5px #ff6b6b)" }}
        />

        {/* Point on circle */}
        <circle
          cx={pointX}
          cy={pointY}
          r="8"
          fill="#ffe66d"
          style={{ filter: "drop-shadow(0 0 10px #ffe66d)" }}
        />

        {/* Connection line to sine graph */}
        <line
          x1={pointX}
          y1={pointY}
          x2={graphStartX + (angle / (Math.PI * 2)) * graphWidth}
          y2={pointY}
          stroke="#ff6b6b"
          strokeWidth="1"
          strokeDasharray="5,5"
          opacity="0.5"
        />

        {/* Sine wave graph area */}
        <line
          x1={graphStartX}
          y1={graphCenterY}
          x2={graphStartX + graphWidth}
          y2={graphCenterY}
          stroke="#444"
          strokeWidth="1"
        />

        {/* Sine wave */}
        <path
          d={sineWavePath()}
          fill="none"
          stroke="#ff6b6b"
          strokeWidth="3"
          style={{ filter: "drop-shadow(0 0 5px #ff6b6b)" }}
        />

        {/* Current point on sine graph */}
        <circle
          cx={graphStartX + (angle / (Math.PI * 2)) * graphWidth}
          cy={graphCenterY - sinValue * graphAmplitude}
          r="6"
          fill="#ff6b6b"
        />

        {/* Labels */}
        <text x={centerX} y={height - 100} fill="#4ecdc4" fontSize="20" textAnchor="middle">
          cos(θ) = {cosValue.toFixed(3)}
        </text>
        <text x={centerX} y={height - 70} fill="#ff6b6b" fontSize="20" textAnchor="middle">
          sin(θ) = {sinValue.toFixed(3)}
        </text>
        <text x={centerX} y={height - 40} fill="white" fontSize="20" textAnchor="middle">
          θ = {(angle * 180 / Math.PI).toFixed(1)}°
        </text>
      </svg>
    </AbsoluteFill>
  );
};
