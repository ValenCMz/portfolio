import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

interface IcosahedronProps {
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
  isMobile: boolean;
}

function Icosahedron({ mousePosition, isMobile }: IcosahedronProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);

  const wireframeGeometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2.2, 1);
    return new THREE.EdgesGeometry(geo);
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !wireframeRef.current) return;

    const time = state.clock.elapsedTime;

    const targetRotationX = isMobile
      ? time * 0.12
      : mousePosition.current.y * 0.5 + time * 0.1;

    const targetRotationY = isMobile
      ? time * 0.15
      : mousePosition.current.x * 0.5 + time * 0.15;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotationX,
      0.05
    );

    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetRotationY,
      0.05
    );

    wireframeRef.current.rotation.copy(meshRef.current.rotation);
  });

  return (
    <Float
      speed={isMobile ? 1.2 : 2}
      rotationIntensity={isMobile ? 0.15 : 0.2}
      floatIntensity={isMobile ? 0.4 : 0.5}
    >
      <group>
        <mesh ref={meshRef} scale={isMobile ? 1.15 : 1}>
          <icosahedronGeometry args={[2, 1]} />

          <MeshTransmissionMaterial
            backside
            samples={isMobile ? 2 : 6}
            resolution={isMobile ? 256 : 512}
            thickness={isMobile ? 0.35 : 0.5}
            chromaticAberration={isMobile ? 0.02 : 0.1}
            anisotropy={isMobile ? 0.1 : 0.3}
            distortion={isMobile ? 0 : 0.2}
            distortionScale={isMobile ? 0 : 0.5}
            temporalDistortion={0}
            iridescence={isMobile ? 0.6 : 1}
            iridescenceIOR={1}
            iridescenceThicknessRange={isMobile ? [0, 600] : [0, 1400]}
            color="#0ef6ff"
            transmission={0.95}
            roughness={0.15}
          />
        </mesh>

        <lineSegments ref={wireframeRef} geometry={wireframeGeometry}>
          <lineBasicMaterial
            color="#0ef6ff"
            transparent
            opacity={isMobile ? 0.3 : 0.4}
          />
        </lineSegments>
      </group>
    </Float>
  );
}

// Seeded random
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function Particles({ isMobile }: { isMobile: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = isMobile ? 220 : 1200;

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = (seededRandom(i * 7.1) - 0.5) * 30;
      const y = (seededRandom(i * 3.7 + 100) - 0.5) * 30;
      const z = seededRandom(i * 5.3 + 200) * -25;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    return positions;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.04 : 0.03}
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
          /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      );
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    mousePosition.current = { x, y };
  };

  return (
    <div className="absolute inset-0 z-0" onMouseMove={handleMouseMove}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: !isMobile, alpha: true }}
        dpr={isMobile ? 1 : [1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#0ef6ff" />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.6}
          color="#8b5cf6"
        />

        <Particles isMobile={isMobile} />
        <Icosahedron mousePosition={mousePosition} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
