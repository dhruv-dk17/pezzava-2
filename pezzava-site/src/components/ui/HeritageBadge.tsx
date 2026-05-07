"use client";

import React, { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

const Stamp = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(t * 0.5) * 0.2;
      meshRef.current.rotation.x = Math.PI / 6 + Math.cos(t * 0.3) * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.01;
    }
  });

  return (
    <group rotation={[Math.PI / 4, 0, 0]}>
      {/* The Handle / Body of the stamp */}
      <mesh ref={meshRef} castShadow>
        <cylinderGeometry args={[0.8, 1, 0.6, 32]} />
        <meshStandardMaterial 
          color="#1E293B" // Neel
          roughness={0.1} 
          metalness={0.8}
          envMapIntensity={1}
        />
        
        {/* The "Seal" surface */}
        <mesh position={[0, -0.31, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 0.05, 32]} />
          <meshStandardMaterial color="#C2410C" roughness={0.3} metalness={0.5} />
          
          {/* Detailed Pattern (Jaipur Block Style) */}
          <mesh ref={ringRef} position={[0, 0.03, 0]}>
            <ringGeometry args={[0.4, 0.7, 8]} />
            <meshStandardMaterial color="#FDFBF7" emissive="#FDFBF7" emissiveIntensity={0.2} />
          </mesh>
          <mesh position={[0, 0.03, 0]}>
            <circleGeometry args={[0.2, 32]} />
            <meshStandardMaterial color="#FDFBF7" />
          </mesh>
        </mesh>
      </mesh>
      
      {/* Metallic Glint Sparkle */}
      <mesh position={[0.5, 0.5, 0.5]}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshBasicMaterial color="#FFF" />
      </mesh>
    </group>
  );
};

export const HeritageBadge = () => {
  return (
    <div className="w-full h-full min-h-[300px] relative group cursor-pointer bg-gradient-to-br from-primary/5 to-transparent">
      <Canvas camera={{ position: [0, 0, 5], fov: 35 }} shadows>
        <Suspense fallback={null}>
          <Float speed={3} rotationIntensity={1} floatIntensity={1}>
            <Stamp />
          </Float>
          <Environment preset="studio" />
        </Suspense>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
      </Canvas>
      
      <div className="absolute top-6 left-6 flex flex-col gap-1">
        <span className="text-[10px] font-mono text-primary/40 uppercase tracking-widest">Heritage Seal</span>
        <div className="h-px w-8 bg-secondary/30" />
      </div>

      <div className="absolute bottom-6 right-6 flex flex-col items-end">
        <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Jaipur, IN</span>
        <span className="text-[8px] text-primary/40 uppercase tracking-tighter">Hand-Carved Wood Block</span>
      </div>
    </div>
  );
};
