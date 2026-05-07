'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function FloatingAtmosphere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Create multiple parallax offsets for different elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden opacity-30">
      {/* Organic Textile Shape 1 */}
      <motion.svg 
        style={{ y: y1, rotate: rotate1 }}
        className="absolute top-[10%] left-[5%] w-64 h-64 text-primary/10"
        viewBox="0 0 200 200"
      >
        <path fill="currentColor" d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.7,-31.3,87.1,-15.7,85.2,-0.9C83.4,13.9,76.2,27.7,68,40.1C59.7,52.5,50.3,63.4,38.5,71.1C26.7,78.8,12.3,83.3,-1.8,86.4C-15.9,89.6,-31.8,91.3,-45.5,86.1C-59.2,80.9,-70.7,68.8,-79.1,54.9C-87.5,41,-92.8,25.3,-92.4,9.6C-92,-6,-85.9,-21.7,-77.8,-35.8C-69.7,-50,-59.6,-62.7,-46.8,-70.5C-34,-78.3,-18.4,-81.2,-1.3,-79C15.8,-76.7,31.3,-83.5,44.7,-76.4Z" transform="translate(100 100)" />
      </motion.svg>

      {/* Organic Textile Shape 2 */}
      <motion.svg 
        style={{ y: y2, rotate: rotate2 }}
        className="absolute top-[40%] right-[2%] w-96 h-96 text-secondary/10"
        viewBox="0 0 200 200"
      >
        <path fill="currentColor" d="M38.1,-65.4C50.3,-58.8,61.9,-49.5,70.5,-37.8C79.1,-26,84.7,-11.9,85.1,2.5C85.5,16.8,80.7,31.4,72.4,43.4C64.1,55.5,52.3,64.9,39,71.5C25.7,78.1,10.8,81.9,-4,88.8C-18.7,95.7,-33.4,105.7,-46.2,103.8C-59,102,-69.9,88.2,-77.9,73.5C-85.9,58.7,-91.1,43,-94.1,27.2C-97.1,11.3,-97.8,-4.6,-93.8,-19.7C-89.9,-34.7,-81.1,-48.9,-69,-55.6C-56.9,-62.3,-41.4,-61.5,-28.4,-67.7C-15.3,-73.9,-4.6,-87,4.6,-95C13.8,-103,25.9,-72.1,38.1,-65.4Z" transform="translate(100 100)" />
      </motion.svg>

      {/* Floating "Thread" Lines */}
      <motion.div 
        style={{ y: y3 }}
        className="absolute top-[20%] left-[40%] w-[1px] h-[400px] bg-gradient-to-b from-transparent via-primary/20 to-transparent"
      />
      
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-[60%] right-[30%] w-[1px] h-[300px] bg-gradient-to-b from-transparent via-secondary/20 to-transparent"
      />

      {/* Subtle Grid Dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.15]" />
    </div>
  );
}
