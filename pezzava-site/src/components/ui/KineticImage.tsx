"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface KineticImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
}

export const KineticImage = ({ 
  src, 
  alt, 
  className = "", 
  fill = true,
  priority = false 
}: KineticImageProps) => {
  return (
    <div className={`relative overflow-hidden w-full h-full ${className}`}>
      <motion.div
        className="w-full h-full relative"
        animate={{
          scale: [1, 1.08, 1],
          x: [0, 5, -5, 0],
          y: [0, -5, 5, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill={fill}
          priority={priority}
          className="object-cover"
        />
      </motion.div>
      
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/5 to-black/20 pointer-events-none" />
    </div>
  );
};
