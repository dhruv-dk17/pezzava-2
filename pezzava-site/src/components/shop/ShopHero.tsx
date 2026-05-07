'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

export default function ShopHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const images = [
    { src: '/images/shop-hero-1.png', alt: 'Artisanal Fabric Detail', y: y1 },
    { src: '/images/shop-hero-2.png', alt: 'Editorial Fashion Skirt', y: y2 },
    { src: '/images/shop-hero-3.png', alt: 'Wooden Block Craft', y: y3 },
  ];

  return (
    <section ref={containerRef} className="relative h-[90vh] overflow-hidden bg-background px-6 md:px-12 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full items-center">
        {images.map((img, i) => (
          <motion.div
            key={i}
            style={{ y: img.y }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] as any }}
            className={`relative h-[60vh] md:h-[70vh] overflow-hidden rounded-sm shadow-premium ${
              i === 1 ? 'md:-mt-12' : i === 2 ? 'md:mt-12' : ''
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
          </motion.div>
        ))}
      </div>

      {/* Floating Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-full max-w-7xl">
           <motion.h1 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as any }}
             className="font-display text-[15vw] md:text-[12vw] leading-none text-white mix-blend-difference text-center"
           >
             Artisanal <br />
             <span className="italic ml-[20vw]">Gallery.</span>
           </motion.h1>
           
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 1, duration: 1 }}
             className="absolute top-1/2 left-0 -translate-y-1/2 vertical-text hidden lg:block"
           >
             <span className="font-subheader text-[10px] font-bold uppercase tracking-[0.5em] text-white/50 mix-blend-difference [writing-mode:vertical-rl] rotate-180">
               Spring Summer 2024
             </span>
           </motion.div>
        </div>
      </div>
    </section>
  );
}
