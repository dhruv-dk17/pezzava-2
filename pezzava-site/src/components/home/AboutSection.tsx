'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';
import CinematicText from '../ui/CinematicText';
import Magnetic from '../ui/Magnetic';

export default function AboutSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yImg1 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const yImg2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section ref={sectionRef} className="py-32 px-6 md:px-12 lg:px-24 bg-background relative overflow-hidden">
      {/* Background architectural element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-surface-raised -z-10 transform skew-x-12 translate-x-1/4" />
      
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left: Typography & Story */}
          <motion.div style={{ y: yText }} className="lg:col-span-5 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-[1px] bg-primary"></span>
              <span className="font-body text-[10px] font-bold tracking-[0.3em] text-primary uppercase">Our Heritage</span>
            </div>
            
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-8 text-on-surface tracking-[-0.02em]">
              <CinematicText text="Artisanal" type="letters" delay={0.1} /> <br />
              <CinematicText text="Craftsmanship" type="letters" delay={0.3} className="italic text-primary" /><br />
              <CinematicText text="Reimagined" type="letters" delay={0.5} />
            </h2>
            
            <p className="font-body text-lg text-on-surface-variant leading-relaxed mb-10 max-w-md font-light">
              Pezzava honors the centuries-old tradition of Jaipur textiles. Every piece is a testament to the skill of local artisans, woven with sustainable fabrics and hand-block prints, creating a silhouette that is both timeless and effortlessly modern.
            </p>
            
            <Magnetic strength={0.2}>
              <Link href="/about" className="group inline-flex items-center gap-4 font-body text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface hover:text-primary transition-colors">
                <span>Discover Our Story</span>
                <span className="w-8 h-[1px] bg-on-surface group-hover:w-16 group-hover:bg-primary transition-all duration-500"></span>
              </Link>
            </Magnetic>
          </motion.div>

          {/* Right: Asymmetrical Image Grid */}
          <div className="lg:col-span-7 relative h-[600px] md:h-[800px] w-full">
            <motion.div 
              style={{ y: yImg1 }}
              className="absolute top-[5%] right-0 w-[85%] h-[75%] z-10 shadow-premium overflow-hidden"
            >
              <Image 
                src="/images/hero-heritage.png" 
                alt="Artisanal Craftsmanship"
                fill
                className="object-cover scale-110"
              />
            </motion.div>
            
            <motion.div 
              style={{ y: yImg2 }}
              className="absolute bottom-0 left-0 w-[55%] h-[45%] z-20 shadow-premium overflow-hidden border-4 border-background"
            >
              <Image 
                src="/images/bento-craft.png" 
                alt="Jaipur Textiles"
                fill
                className="object-cover scale-110"
              />
              <div className="absolute inset-0 bg-primary/5 mix-blend-multiply transition-colors hover:bg-transparent duration-700"></div>
            </motion.div>

            {/* Decorative text element */}
            <motion.div
              style={{ y: yText }}
              className="absolute top-1/4 -left-16 -z-10 font-display text-[120px] text-[#f2f0eb] leading-none select-none opacity-50 md:opacity-100"
            >
              Est.<br/>2024
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
