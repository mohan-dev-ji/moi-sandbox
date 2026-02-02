/**
 * LESSON 6: 3D BASICS WITH THREE.JS
 * =================================
 *
 * Core concepts:
 * - ThreeCanvas from @remotion/three
 * - Basic 3D primitives (box, sphere, etc.)
 * - Camera and lighting
 * - Animating 3D objects with useCurrentFrame()
 *
 * IMPORTANT: In Remotion 3D, you CANNOT use useFrame() from React Three Fiber!
 * All animations must be driven by useCurrentFrame().
 *
 * After Effects equivalent:
 * - ThreeCanvas = Cinema 4D / Element 3D
 * - Mesh = 3D layer/object
 * - Materials = Surface textures
 */

import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useRef } from "react";
import * as THREE from "three";

// Basic rotating cube
export const RotatingCube: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  // Rotation based on frame (not useFrame!)
  const rotationY = frame * 0.02;
  const rotationX = frame * 0.01;

  // Breathing scale effect
  const scale = 1 + Math.sin(frame * 0.05) * 0.1;

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
        zIndex: 10,
      }}>
        3D Rotating Cube (driven by useCurrentFrame)
      </div>

      <ThreeCanvas width={width} height={height}>
        {/* Lighting - essential for 3D visibility */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, 5]} intensity={0.3} color="#4ecdc4" />

        {/* The cube */}
        <mesh rotation={[rotationX, rotationY, 0]} scale={scale}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial
            color="#4ecdc4"
            emissive="#4ecdc4"
            emissiveIntensity={0.2}
          />
        </mesh>
      </ThreeCanvas>

      <div style={{
        position: "absolute",
        bottom: 40,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "white",
        fontFamily: "monospace",
        fontSize: 16,
        zIndex: 10,
      }}>
        rotationY: {rotationY.toFixed(2)} rad | rotationX: {rotationX.toFixed(2)} rad
      </div>
    </AbsoluteFill>
  );
};

// Multiple 3D shapes with different materials
export const ShapeShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const rotation = frame * 0.015;

  // Staggered entrance
  const cubeScale = spring({ frame, fps, config: { damping: 12 } });
  const sphereScale = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12 } });
  const torusScale = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 12 } });

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
        zIndex: 10,
      }}>
        3D Shape Showcase
      </div>

      <ThreeCanvas width={width} height={height}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, 10]} intensity={0.5} color="#ff6b6b" />

        {/* Cube - left */}
        <mesh position={[-4, 0, 0]} rotation={[rotation, rotation, 0]} scale={cubeScale}>
          <boxGeometry args={[1.8, 1.8, 1.8]} />
          <meshStandardMaterial
            color="#ff6b6b"
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>

        {/* Sphere - center */}
        <mesh position={[0, 0, 0]} rotation={[0, rotation, 0]} scale={sphereScale}>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshStandardMaterial
            color="#4ecdc4"
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>

        {/* Torus - right */}
        <mesh position={[4, 0, 0]} rotation={[rotation * 1.5, rotation, 0]} scale={torusScale}>
          <torusGeometry args={[1, 0.4, 16, 32]} />
          <meshStandardMaterial
            color="#ffe66d"
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
      </ThreeCanvas>

      <div style={{
        position: "absolute",
        bottom: 60,
        display: "flex",
        justifyContent: "center",
        gap: 200,
        width: "100%",
        zIndex: 10,
      }}>
        <span style={{ color: "#ff6b6b" }}>Box</span>
        <span style={{ color: "#4ecdc4" }}>Sphere</span>
        <span style={{ color: "#ffe66d" }}>Torus</span>
      </div>
    </AbsoluteFill>
  );
};

// Wireframe geometry - great for math visualizations
export const WireframePlatonic: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const rotation = frame * 0.01;

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
        zIndex: 10,
      }}>
        Wireframe Platonic Solids
      </div>

      <ThreeCanvas width={width} height={height}>
        <ambientLight intensity={0.8} />

        {/* Tetrahedron - 4 faces */}
        <mesh position={[-5, 0, 0]} rotation={[rotation, rotation * 0.7, 0]}>
          <tetrahedronGeometry args={[1.3]} />
          <meshBasicMaterial color="#ff6b6b" wireframe />
        </mesh>

        {/* Octahedron - 8 faces */}
        <mesh position={[-2, 0, 0]} rotation={[rotation * 0.8, rotation, 0]}>
          <octahedronGeometry args={[1.3]} />
          <meshBasicMaterial color="#4ecdc4" wireframe />
        </mesh>

        {/* Dodecahedron - 12 faces */}
        <mesh position={[1.5, 0, 0]} rotation={[rotation, rotation * 1.2, 0]}>
          <dodecahedronGeometry args={[1.3]} />
          <meshBasicMaterial color="#ffe66d" wireframe />
        </mesh>

        {/* Icosahedron - 20 faces */}
        <mesh position={[5, 0, 0]} rotation={[rotation * 1.1, rotation, 0]}>
          <icosahedronGeometry args={[1.3]} />
          <meshBasicMaterial color="#95e1d3" wireframe />
        </mesh>
      </ThreeCanvas>

      <div style={{
        position: "absolute",
        bottom: 60,
        display: "flex",
        justifyContent: "center",
        gap: 80,
        width: "100%",
        zIndex: 10,
        fontSize: 14,
      }}>
        <div style={{ color: "#ff6b6b", textAlign: "center" }}>
          <div>Tetrahedron</div>
          <div>4 faces, 4 vertices</div>
        </div>
        <div style={{ color: "#4ecdc4", textAlign: "center" }}>
          <div>Octahedron</div>
          <div>8 faces, 6 vertices</div>
        </div>
        <div style={{ color: "#ffe66d", textAlign: "center" }}>
          <div>Dodecahedron</div>
          <div>12 faces, 20 vertices</div>
        </div>
        <div style={{ color: "#95e1d3", textAlign: "center" }}>
          <div>Icosahedron</div>
          <div>20 faces, 12 vertices</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Animated camera movement
export const AnimatedCamera: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  // Camera orbits around the scene
  const cameraAngle = frame * 0.02;
  const cameraRadius = 8;
  const cameraX = Math.sin(cameraAngle) * cameraRadius;
  const cameraZ = Math.cos(cameraAngle) * cameraRadius;
  const cameraY = 3 + Math.sin(frame * 0.01) * 2;

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
        zIndex: 10,
      }}>
        Animated Camera Orbit
      </div>

      <ThreeCanvas
        width={width}
        height={height}
        camera={{ position: [cameraX, cameraY, cameraZ] }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[0, 5, 0]} intensity={0.5} color="#4ecdc4" />

        {/* Central object */}
        <mesh>
          <dodecahedronGeometry args={[1.5]} />
          <meshStandardMaterial
            color="#4ecdc4"
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>

        {/* Orbiting smaller objects */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const orbitAngle = (i / 6) * Math.PI * 2 + frame * 0.03;
          const orbitRadius = 4;
          const x = Math.cos(orbitAngle) * orbitRadius;
          const z = Math.sin(orbitAngle) * orbitRadius;
          const y = Math.sin(orbitAngle * 2) * 0.5;

          return (
            <mesh key={i} position={[x, y, z]}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial
                color={["#ff6b6b", "#4ecdc4", "#ffe66d", "#95e1d3", "#dda0dd", "#87ceeb"][i]}
                emissive={["#ff6b6b", "#4ecdc4", "#ffe66d", "#95e1d3", "#dda0dd", "#87ceeb"][i]}
                emissiveIntensity={0.3}
              />
            </mesh>
          );
        })}

        {/* Ground plane reference */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial
            color="#1a1a3a"
            transparent
            opacity={0.5}
          />
        </mesh>
      </ThreeCanvas>

      <div style={{
        position: "absolute",
        bottom: 40,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "white",
        fontFamily: "monospace",
        fontSize: 14,
        zIndex: 10,
      }}>
        Camera: ({cameraX.toFixed(1)}, {cameraY.toFixed(1)}, {cameraZ.toFixed(1)})
      </div>
    </AbsoluteFill>
  );
};

// Glowing edges effect
export const GlowingEdges: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const rotation = frame * 0.015;
  const pulse = 0.5 + Math.sin(frame * 0.1) * 0.3;

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
        zIndex: 10,
      }}>
        Glowing Edges (Emissive Materials)
      </div>

      <ThreeCanvas width={width} height={height}>
        <ambientLight intensity={0.1} />

        {/* Main shape - wireframe with glow effect */}
        <mesh rotation={[rotation, rotation * 1.3, rotation * 0.5]}>
          <icosahedronGeometry args={[2.5]} />
          <meshBasicMaterial
            color="#4ecdc4"
            wireframe
            transparent
            opacity={1}
          />
        </mesh>

        {/* Inner glow layer */}
        <mesh rotation={[rotation, rotation * 1.3, rotation * 0.5]}>
          <icosahedronGeometry args={[2.48]} />
          <meshBasicMaterial
            color="#4ecdc4"
            transparent
            opacity={pulse * 0.1}
          />
        </mesh>

        {/* Vertex points */}
        {/* We'll add glowing points at vertices programmatically */}
        <VertexPoints
          geometry="icosahedron"
          radius={2.5}
          rotation={[rotation, rotation * 1.3, rotation * 0.5]}
          color="#ff6b6b"
          pulse={pulse}
        />
      </ThreeCanvas>
    </AbsoluteFill>
  );
};

// Helper component for vertex points
const VertexPoints: React.FC<{
  geometry: string;
  radius: number;
  rotation: [number, number, number];
  color: string;
  pulse: number;
}> = ({ radius, rotation, color, pulse }) => {
  // Icosahedron has 12 vertices
  // Golden ratio
  const phi = (1 + Math.sqrt(5)) / 2;
  const scale = radius / Math.sqrt(1 + phi * phi);

  const vertices: [number, number, number][] = [
    [0, 1, phi], [0, -1, phi], [0, 1, -phi], [0, -1, -phi],
    [1, phi, 0], [-1, phi, 0], [1, -phi, 0], [-1, -phi, 0],
    [phi, 0, 1], [-phi, 0, 1], [phi, 0, -1], [-phi, 0, -1],
  ].map(([x, y, z]) => [x * scale, y * scale, z * scale] as [number, number, number]);

  return (
    <group rotation={rotation}>
      {vertices.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.1 + pulse * 0.05, 8, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
};
