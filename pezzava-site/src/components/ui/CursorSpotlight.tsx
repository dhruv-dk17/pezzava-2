"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CursorSpotlight = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Layer 1: Core spotlight (faster)
  const springConfig1 = { damping: 40, stiffness: 200 };
  const x1 = useSpring(mouseX, springConfig1);
  const y1 = useSpring(mouseY, springConfig1);

  // Layer 2: Atmospheric glow (slower, more lag)
  const springConfig2 = { damping: 60, stiffness: 50 };
  const x2 = useSpring(mouseX, springConfig2);
  const y2 = useSpring(mouseY, springConfig2);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Primary Atmospheric Glow */}
      <motion.div
        style={{
          left: x2,
          top: y2,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed inset-0 z-0 pointer-events-none w-[1200px] h-[1200px] bg-secondary/[0.03] blur-[180px] rounded-full mix-blend-screen"
      />
      
      {/* Precision Accent Spotlight */}
      <motion.div
        style={{
          left: x1,
          top: y1,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed inset-0 z-0 pointer-events-none w-[600px] h-[600px] bg-white/[0.02] blur-[100px] rounded-full mix-blend-overlay"
      />
    </>
  );
};
