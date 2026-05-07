'use client';

import React, { useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

/**
 * A wrapper component that creates a magnetic pull effect towards the cursor.
 * Ideal for navigation links and call-to-action buttons.
 */
export default function Magnetic({ children, strength = 0.35, className = "" }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Motion values for X and Y position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for the magnetic movement
  const springConfig = { damping: 20, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate center of the element
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance from center
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Apply strength to the movement
    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    // Reset to center
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
