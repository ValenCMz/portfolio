import { useRef, Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface KaoriModelProps {
  mousePosition: { x: number; y: number };
}

function KaoriModel({ mousePosition }: KaoriModelProps) {
  const { scene } = useGLTF('/models/kaori.glb');
  const modelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (modelRef.current) {
      // React to mouse movement
      const targetRotationY = mousePosition.x * 0.5 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      const targetRotationX = mousePosition.y * 0.3;
      
      modelRef.current.rotation.y = THREE.MathUtils.lerp(
        modelRef.current.rotation.y,
        targetRotationY,
        0.08
      );
      modelRef.current.rotation.x = THREE.MathUtils.lerp(
        modelRef.current.rotation.x,
        targetRotationX,
        0.08
      );
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
      <primitive 
        ref={modelRef}
        object={scene} 
        scale={1.5}
        position={[0, -1, 0]}
        rotation={[0, Math.PI * 0.5, 0]}
      />
    </Float>
  );
}

export default function KaoriCompanion() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to -1 to 1
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div 
      className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 hidden lg:block"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
    >
      {/* Kaori name label */}
      <motion.div 
        className="text-center mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.5 }}
      >
        <span className="text-primary font-mono text-sm tracking-wider text-glow">
          Kaori
        </span>
        <p className="text-muted-foreground text-xs">🐱</p>
      </motion.div>

      {/* 3D Model container */}
      <div 
        className="w-32 h-40 md:w-40 md:h-48 rounded-2xl overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.15) 0%, transparent 70%)',
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 4], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          {/* Much brighter lighting */}
          <ambientLight intensity={2} />
          <directionalLight position={[5, 5, 5]} intensity={3} color="#ffffff" />
          <directionalLight position={[-3, 3, 2]} intensity={1.5} color="#0ef6ff" />
          <pointLight position={[0, 2, 4]} intensity={2} color="#ffffff" />
          <pointLight position={[-5, -5, -5]} intensity={0.8} color="#8b5cf6" />
          
          <Suspense fallback={null}>
            <KaoriModel mousePosition={mousePosition} />
          </Suspense>
        </Canvas>
      </div>

      {/* Decorative glow */}
      <div className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl -z-10" />
    </motion.div>
  );
}

// Preload the model
useGLTF.preload('/models/kaori.glb');
