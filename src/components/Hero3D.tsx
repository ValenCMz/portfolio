import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

interface IcosahedronProps {
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

function Icosahedron({ mousePosition }: IcosahedronProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);

  const wireframeGeometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2.2, 1);
    return new THREE.EdgesGeometry(geo);
  }, []);

  useFrame((state) => {
    if (meshRef.current && wireframeRef.current) {
      const targetRotationX = mousePosition.current.y * 0.5;
      const targetRotationY = mousePosition.current.x * 0.5;

      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotationX + state.clock.elapsedTime * 0.1,
        0.05
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotationY + state.clock.elapsedTime * 0.15,
        0.05
      );

      wireframeRef.current.rotation.copy(meshRef.current.rotation);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[2, 1]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.5}
            chromaticAberration={0.1}
            anisotropy={0.3}
            distortion={0.2}
            distortionScale={0.5}
            temporalDistortion={0.1}
            iridescence={1}
            iridescenceIOR={1}
            iridescenceThicknessRange={[0, 1400]}
            color="#0ef6ff"
            transmission={0.95}
            roughness={0.1}
          />
        </mesh>

        <lineSegments ref={wireframeRef} geometry={wireframeGeometry}>
          <lineBasicMaterial color="#0ef6ff" transparent opacity={0.4} />
        </lineSegments>
      </group>
    </Float>
  );
}

// Seeded random for consistent star distribution
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1200;

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Distribución en un volumen detrás del icosaedro (z negativo = fondo)
      // z: -25 a 0 (atrás de la escena, visible desde cámara en z=8)
      // x, y: -15 a 15 (ancho del campo de visión)
      const x = (seededRandom(i * 7.1) - 0.5) * 30;
      const y = (seededRandom(i * 3.7 + 100) - 0.5) * 30;
      const z = seededRandom(i * 5.3 + 200) * -25;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#0ef6ff"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function Hero3D() {
  const mousePosition = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mousePosition.current = { x, y };
  };

  return (
    <div className="absolute inset-0 z-0" onMouseMove={handleMouseMove}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#0ef6ff" />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.5}
          color="#8b5cf6"
        />

        <Particles />
        <Icosahedron mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
}
