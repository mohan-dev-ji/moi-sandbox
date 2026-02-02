/**
 * GEOMETRY LAB - Remotion Learning Project
 * =========================================
 *
 * This project teaches you Remotion through hands-on geometry animations.
 * Each lesson builds on the previous, introducing new concepts.
 *
 * AFTER EFFECTS PARALLELS:
 * - Composition = After Effects Composition
 * - Folder = Project folder organization
 * - useCurrentFrame() = current time expression
 * - interpolate() = linear/eased keyframes
 * - spring() = bounce/inertia expressions
 * - Sequence = layer in/out points
 * - Series = sequential layer stacking
 */

import "./index.css";
import { Composition, Folder } from "remotion";

// Lesson 1: Basic Shapes & Interpolation
import {
  AnimatedCircle,
  StaggeredShapes,
  ExtrapolationDemo,
} from "./lessons/Lesson01-BasicShapes";

// Lesson 2: Springs & Easing
import {
  SpringComparison,
  EasingCurves,
  SpringInOut,
} from "./lessons/Lesson02-SpringsAndEasing";

// Lesson 3: Sequences
import {
  SequenceBasics,
  SeriesDemo,
  NestedSequences,
} from "./lessons/Lesson03-Sequences";

// Lesson 4: Geometry & Glows
import {
  GlowingShapes,
  AnimatedSVGPath,
  RegularPolygons,
  AnimatedGraph,
} from "./lessons/Lesson04-GeometryAndGlows";

// Lesson 5: Vector Points
import {
  AnimatedDots,
  ConnectedDots,
  VectorAddition,
  MorphingShapes,
} from "./lessons/Lesson05-VectorPoints";

// Lesson 6: 3D Basics
import {
  RotatingCube,
  ShapeShowcase,
  WireframePlatonic,
  AnimatedCamera,
  GlowingEdges,
} from "./lessons/Lesson06-3DBasics";

// Lesson 7: Transitions
import {
  FadeTransition,
  SlideTransition,
  WipeAndFlip,
  CustomTransition,
  GeometricTransition,
} from "./lessons/Lesson07-Transitions";

// Lesson 8: Math Visualization
import {
  PythagoreanTheorem,
  AnimatedFunction,
  CircleAndPi,
  UnitCircleTrig,
} from "./lessons/Lesson08-MathVisualization";

// Standard video settings
const FPS = 30;
const WIDTH = 1920;
const HEIGHT = 1080;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ========================================
          LESSON 1: BASIC SHAPES & INTERPOLATION
          The foundation of all Remotion animations
          ======================================== */}
      <Folder name="01-BasicShapes">
        <Composition
          id="AnimatedCircle"
          component={AnimatedCircle}
          durationInFrames={3 * FPS}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="StaggeredShapes"
          component={StaggeredShapes}
          durationInFrames={3 * FPS}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="ExtrapolationDemo"
          component={ExtrapolationDemo}
          durationInFrames={3 * FPS}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
      </Folder>

      {/* ========================================
          LESSON 2: SPRINGS & EASING
          Natural motion and timing curves
          ======================================== */}
      <Folder name="02-SpringsAndEasing">
        <Composition
          id="SpringComparison"
          component={SpringComparison}
          durationInFrames={3 * FPS}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="EasingCurves"
          component={EasingCurves}
          durationInFrames={3 * FPS}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="SpringInOut"
          component={SpringInOut}
          durationInFrames={4 * FPS}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
      </Folder>

      {/* ========================================
          LESSON 3: SEQUENCES & SERIES
          Timeline control and scene management
          ======================================== */}
      <Folder name="03-Sequences">
        <Composition
          id="SequenceBasics"
          component={SequenceBasics}
          durationInFrames={5 * FPS}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="SeriesDemo"
          component={SeriesDemo}
          durationInFrames={5 * FPS}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="NestedSequences"
          component={NestedSequences}
          durationInFrames={4 * FPS}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
      </Folder>

      {/* ========================================
          LESSON 4: GEOMETRY & GLOWS
          SVG graphics and visual effects
          ======================================== */}
      <Folder name="04-GeometryAndGlows">
        <Composition
          id="GlowingShapes"
          component={GlowingShapes}
          durationInFrames={3 * FPS}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="AnimatedSVGPath"
          component={AnimatedSVGPath}
          durationInFrames={3 * FPS}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="RegularPolygons"
          component={RegularPolygons}
          durationInFrames={4 * FPS}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="AnimatedGraph"
          component={AnimatedGraph}
          durationInFrames={4 * FPS}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
      </Folder>

      {/* ========================================
          LESSON 5: VECTOR POINTS & CONNECTIONS
          Building geometric constructions
          ======================================== */}
      <Folder name="05-VectorPoints">
        <Composition
          id="AnimatedDots"
          component={AnimatedDots}
          durationInFrames={3 * FPS}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="ConnectedDots"
          component={ConnectedDots}
          durationInFrames={4 * FPS}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="VectorAddition"
          component={VectorAddition}
          durationInFrames={4 * FPS}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="MorphingShapes"
          component={MorphingShapes}
          durationInFrames={8 * FPS}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
      </Folder>

      {/* ========================================
          LESSON 6: 3D BASICS
          Three.js integration
          ======================================== */}
      <Folder name="06-3DBasics">
        <Composition
          id="RotatingCube"
          component={RotatingCube}
          durationInFrames={5 * FPS}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="ShapeShowcase"
          component={ShapeShowcase}
          durationInFrames={4 * FPS}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="WireframePlatonic"
          component={WireframePlatonic}
          durationInFrames={5 * FPS}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="AnimatedCamera"
          component={AnimatedCamera}
          durationInFrames={6 * FPS}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="GlowingEdges"
          component={GlowingEdges}
          durationInFrames={5 * FPS}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
      </Folder>

      {/* ========================================
          LESSON 7: TRANSITIONS
          Scene-to-scene animations
          ======================================== */}
      <Folder name="07-Transitions">
        <Composition
          id="FadeTransition"
          component={FadeTransition}
          durationInFrames={6 * FPS}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="SlideTransition"
          component={SlideTransition}
          durationInFrames={8 * FPS}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="WipeAndFlip"
          component={WipeAndFlip}
          durationInFrames={6 * FPS}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="CustomTransition"
          component={CustomTransition}
          durationInFrames={5 * FPS}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="GeometricTransition"
          component={GeometricTransition}
          durationInFrames={4 * FPS}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
      </Folder>

      {/* ========================================
          LESSON 8: MATH VISUALIZATION
          3Blue1Brown-style educational content
          ======================================== */}
      <Folder name="08-MathVisualization">
        <Composition
          id="PythagoreanTheorem"
          component={PythagoreanTheorem}
          durationInFrames={6 * FPS}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="AnimatedFunction"
          component={AnimatedFunction}
          durationInFrames={4 * FPS}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="CircleAndPi"
          component={CircleAndPi}
          durationInFrames={5 * FPS}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="UnitCircleTrig"
          component={UnitCircleTrig}
          durationInFrames={5 * FPS}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
      </Folder>
    </>
  );
};
