"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useTime, useMotionTemplate } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  floatIntensity?: number;
  parallaxIntensity?: number;
}

export const TiltCard = ({ 
  children, 
  className = "", 
  delay = 0,
  floatIntensity = 1,
  parallaxIntensity = 0.5
}: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Time-based organic drift (replaces static loop for more "living" feel)
  const time = useTime();
  const driftX = useTransform(time, (t) => Math.sin(t / 2000) * 15 * floatIntensity);
  const driftY = useTransform(time, (t) => Math.cos(t / 2500) * 20 * floatIntensity);
  const driftRotate = useTransform(time, (t) => Math.sin(t / 3000) * 2 * floatIntensity);

  // Refined spring settings for a "heavy luxury" feel
  const springConfig = { damping: 30, stiffness: 120, mass: 1.2 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  
  // Multi-layer Parallax (Simulating depth)
  const innerX = useTransform(mouseXSpring, [-0.5, 0.5], [`${40 * parallaxIntensity}px`, `${-40 * parallaxIntensity}px`]);
  const innerY = useTransform(mouseYSpring, [-0.5, 0.5], [`${40 * parallaxIntensity}px`, `${-40 * parallaxIntensity}px`]);
  
  // Deeper layer parallax
  const deepX = useTransform(mouseXSpring, [-0.5, 0.5], [`${20 * parallaxIntensity}px`, `${-20 * parallaxIntensity}px`]);
  const deepY = useTransform(mouseYSpring, [-0.5, 0.5], [`${20 * parallaxIntensity}px`, `${-20 * parallaxIntensity}px`]);

  // Glare effect movement
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
  
  // Convert boolean isHovered to a MotionValue for useTransform
  const hoverValue = useMotionValue(0);
  React.useEffect(() => {
    hoverValue.set(isHovered ? 1 : 0);
  }, [isHovered, hoverValue]);

  const glareOpacity = useTransform(hoverValue, [0, 1], [0, 0.25]);

  // Use useMotionTemplate for dynamic background strings
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.3) 0%, transparent 70%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 150, z: -200, rotateX: 20, filter: "blur(40px)" }}
      whileInView={{ opacity: 1, y: 0, z: 0, rotateX: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-150px" }}
      transition={{ 
        duration: 2.2, 
        delay, 
        ease: [0.19, 1, 0.22, 1] 
      }}
      style={{
        rotateX,
        rotateY,
        x: driftX,
        y: driftY,
        rotate: driftRotate,
        transformStyle: "preserve-3d",
      }}
      className={`relative group/tilt ${className}`}
    >
      <div className="w-full h-full relative" style={{ transformStyle: "preserve-3d" }}>
        {/* Deep Background Layer (optional, for components that provide children) */}
        <motion.div 
          style={{ x: deepX, y: deepY, translateZ: "-50px" }}
          className="absolute inset-0 pointer-events-none"
        />

        {/* The Content Wrapper with Parallax */}
        <motion.div 
          style={{ 
            x: innerX, 
            y: innerY,
            translateZ: "50px",
            transformStyle: "preserve-3d" 
          }}
          className="w-full h-full relative"
        >
          {children}
        </motion.div>

        {/* Dynamic Glare Overlay */}
        <motion.div 
          style={{
            background: glareBackground,
            opacity: glareOpacity,
            pointerEvents: "none",
            translateZ: "100px"
          }}
          className="absolute inset-0 z-50 rounded-[inherit]"
        />
        
        {/* Reflection Highlight */}
        <div className="absolute inset-0 z-40 opacity-0 group-hover/tilt:opacity-25 transition-opacity duration-1000 pointer-events-none rounded-[inherit] bg-gradient-to-tr from-transparent via-white/10 to-white/5" />
      </div>
    </motion.div>
  );
};
