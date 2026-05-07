"use client";

import React, { useMemo } from "react";
import { motion, useTime, useTransform } from "framer-motion";

const images = [
  "/images/fabric_detail.png",
  "/images/editorial_model.png",
  "/images/hero_skirt.png",
];

export const FloatingFrames = () => {
  const time = useTime();
  
  // Generating a few frames with different paths
  const frames = useMemo(() => [
    { id: 1, src: images[0], delay: 0, x: "10%", y: "20%", size: "w-32 h-48", rot: 15 },
    { id: 2, src: images[1], delay: 2, x: "70%", y: "15%", size: "w-40 h-56", rot: -10 },
    { id: 3, src: images[2], delay: 4, x: "15%", y: "60%", size: "w-36 h-52", rot: 8 },
    { id: 4, src: images[0], delay: 6, x: "80%", y: "70%", size: "w-28 h-40", rot: -15 },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
      {frames.map((frame) => (
        <motion.div
          key={frame.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0, 0.6, 0.6, 0],
            scale: [0.8, 1, 1.1, 0.9],
            x: [frame.x, "50%", frame.x],
            y: [frame.y, "40%", frame.y],
            rotate: [frame.rot, frame.rot + 5, frame.rot - 5, frame.rot]
          }}
          transition={{
            duration: 25,
            delay: frame.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute ${frame.size} border border-white/10 bg-black/20 backdrop-blur-md p-1 shadow-2xl`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="w-full h-full relative overflow-hidden">
            <img 
              src={frame.src} 
              alt="Motion Frame" 
              className="w-full h-full object-cover opacity-80 mix-blend-screen"
            />
          </div>
          {/* Subtle reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
        </motion.div>
      ))}
    </div>
  );
};
