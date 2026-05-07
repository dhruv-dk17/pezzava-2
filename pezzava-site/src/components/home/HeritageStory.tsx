"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import CinematicText from "../ui/CinematicText";
import { SplitText } from "../ui/SplitText";

const HeritageStory = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-background py-24 md:py-48 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* Story Text */}
        <div className="md:col-span-6 relative z-10">
          <motion.div style={{ opacity }}>
            <span className="font-subheader text-xs uppercase tracking-[0.4em] text-secondary mb-6 block font-bold">
              The Heritage of Jaipur
            </span>
            
            <h2 className="font-display text-5xl md:text-7xl leading-[1.1] text-primary mb-8 tracking-tight">
              Crafted by hands that <span className="italic">know the soul</span> of cotton.
            </h2>
            
            <p className="font-subheader text-lg md:text-xl text-primary/70 max-w-lg mb-12 leading-relaxed">
              Every Pezzava piece begins its journey in the heart of Rajasthan, where artisans have perfected the art of the wrap skirt for generations.
            </p>
            
            <div className="flex items-center gap-6">
              <div className="w-12 h-[1px] bg-secondary" />
              <span className="font-display italic text-2xl text-primary/40">Since 1984</span>
            </div>
          </motion.div>
        </div>

        {/* Visual Composition */}
        <div className="md:col-span-6 relative h-[600px] md:h-[800px]">
          {/* Large Image */}
          <motion.div 
            style={{ y: y1 }}
            className="absolute top-0 right-0 w-4/5 h-4/5 overflow-hidden rounded-sm shadow-2xl border border-primary/5"
          >
            <Image 
              src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2" 
              alt="Artisanal hand block printing"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
          </motion.div>

          {/* Small Floating Image */}
          <motion.div 
            style={{ y: y2 }}
            className="absolute bottom-0 left-0 w-3/5 h-1/2 overflow-hidden rounded-sm shadow-2xl border border-primary/5 z-20"
          >
            <Image 
              src="https://images.unsplash.com/photo-1446776709462-d6b525c57bd3" 
              alt="Traditional Jaipur textile detail"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-secondary/10 mix-blend-multiply" />
          </motion.div>

          {/* Abstract Gold Accent */}
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-secondary/20 rounded-full -z-10"
          />
        </div>
      </div>

      {/* Background Cinematic Text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
        <span className="font-display text-[25vw] leading-none text-primary whitespace-nowrap">
          HANDMADE
        </span>
      </div>
    </section>
  );
};

export default HeritageStory;
