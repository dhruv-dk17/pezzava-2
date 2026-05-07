"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Environment } from "@react-three/drei";

const fragmentShader = `
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
varying vec2 vUv;
varying float vElevation;

void main() {
  float mixStrength = (vElevation + 0.25) * 0.8;
  vec3 color = mix(uColor1, uColor2, mixStrength);
  
  // Add some silk-like specularity
  float spec = pow(max(0.0, vElevation * 2.0), 4.0) * 0.3;
  color += vec3(spec);
  
  gl_FragColor = vec4(color, 1.0);
}
`;

const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;
varying float vElevation;

void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  
  // Complex wave pattern
  float elevation = sin(modelPosition.x * 1.5 - uTime * 0.5) * 0.15;
  elevation += sin(modelPosition.y * 2.0 + uTime * 0.3) * 0.15;
  
  // Mouse interaction
  float distanceToMouse = distance(uMouse, vec2(modelPosition.x, modelPosition.y));
  float mouseEffect = smoothstep(1.5, 0.0, distanceToMouse) * 0.5;
  elevation += mouseEffect;

  modelPosition.z += elevation;
  vElevation = elevation;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;
}
`;

const SilkPlane = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport, pointer } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor1: { value: new THREE.Color("#8c4d3f") }, // Deep Terracotta
      uColor2: { value: new THREE.Color("#f4f0ec") }, // Raw Silk / Light
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Smoothly interpolate mouse position
      materialRef.current.uniforms.uMouse.value.x += (pointer.x * viewport.width / 2 - materialRef.current.uniforms.uMouse.value.x) * 0.05;
      materialRef.current.uniforms.uMouse.value.y += (pointer.y * viewport.height / 2 - materialRef.current.uniforms.uMouse.value.y) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]} scale={[viewport.width * 1.5, viewport.height * 1.5, 1]}>
      <planeGeometry args={[1, 1, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default function Scene3D() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <color attach="background" args={["#f4f0ec"]} />
        <ambientLight intensity={0.5} />
        <Environment preset="studio" />
        <SilkPlane />
      </Canvas>
    </div>
  );
}
