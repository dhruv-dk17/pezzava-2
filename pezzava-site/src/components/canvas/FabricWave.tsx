"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Plane } from "@react-three/drei";

const vertexShader = `
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;
  uniform float uTime;
  uniform vec2 uMouse;

  void main() {
    vUv = uv;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // Rhythmic Loom Motion: More complex, layered waving
    float elevation = sin(modelPosition.x * 2.5 + uTime * 0.8) * 0.15;
    elevation += sin(modelPosition.y * 1.8 + uTime * 0.5) * 0.1;
    elevation += sin((modelPosition.x + modelPosition.y) * 1.2 + uTime * 0.3) * 0.05;
    
    // Tactile Mouse Interaction (Loom pull effect)
    float dist = distance(uv, uMouse);
    float mouseEffect = smoothstep(0.8, 0.0, dist) * 0.5;
    elevation += mouseEffect * sin(uTime * 1.5);

    modelPosition.z += elevation;
    vElevation = elevation;

    // Estimate normal for lighting
    vNormal = normalize(vec3(-elevation * 10.0, -elevation * 10.0, 1.0));

    gl_Position = projectionMatrix * viewMatrix * modelPosition;
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;
  uniform sampler2D uTexture;
  uniform vec3 uColor;
  uniform float uTime;
  uniform vec2 uMouse;

  void main() {
    // Chromatic Aberration at the edges of interaction
    float dist = distance(vUv, uMouse);
    float aberration = smoothstep(0.4, 1.0, dist) * 0.02;
    
    vec4 texR = texture2D(uTexture, vUv + vec2(aberration, 0.0));
    vec4 texG = texture2D(uTexture, vUv);
    vec4 texB = texture2D(uTexture, vUv - vec2(aberration, 0.0));
    vec4 textureColor = vec4(texR.r, texG.g, texB.b, texG.a);
    
    // Mesh Gradient Influence: Ambient color shifts
    vec3 colorA = vec3(0.12, 0.16, 0.23); // Neel (Indigo)
    vec3 colorB = vec3(0.76, 0.25, 0.05); // Terracotta
    
    float mixFactor = vUv.x + sin(uTime * 0.2) * 0.5;
    vec3 meshGradient = mix(colorA, colorB, clamp(mixFactor, 0.0, 1.0));
    
    // Combine texture with mesh gradient at low intensity for depth
    vec3 finalColor = mix(textureColor.rgb, meshGradient, 0.2);
    
    // Sophisticated shading (Diffuse + Specular Sheen)
    vec3 lightDir = normalize(vec3(0.5, 0.5, 1.0));
    float diffuse = max(dot(vNormal, lightDir), 0.0);
    
    // Silk Sheen (Specular)
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    vec3 halfDir = normalize(lightDir + viewDir);
    float specular = pow(max(dot(vNormal, halfDir), 0.0), 32.0);
    
    finalColor = finalColor * (diffuse * 0.8 + 0.4) + specular * 0.3 * vec3(1.0, 0.9, 0.8);
    
    // Add subtle grain (Artisanal texture)
    float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
    finalColor += noise * 0.02;

    gl_FragColor = vec4(finalColor, textureColor.a);
  }
`;


export const FabricWave = ({ textureUrl }: { textureUrl: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, textureUrl);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uTexture: { value: texture },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uColor: { value: new THREE.Color("#FDFBF7") }
  }), [texture]);

  useFrame((state) => {
    const { clock, mouse } = state;
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = clock.getElapsedTime();
      
      // Smoothly track mouse with a bit more lag for "heavy" fabric feel
      material.uniforms.uMouse.value.x = THREE.MathUtils.lerp(
        material.uniforms.uMouse.value.x,
        (mouse.x + 1) / 2,
        0.05
      );
      material.uniforms.uMouse.value.y = THREE.MathUtils.lerp(
        material.uniforms.uMouse.value.y,
        (mouse.y + 1) / 2,
        0.05
      );
    }
  });

  return (
    <Plane ref={meshRef} args={[12, 8, 128, 128]} rotation={[-0.1, 0, 0]}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </Plane>
  );
};
