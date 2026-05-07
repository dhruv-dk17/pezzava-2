"use client";

import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { FabricWave } from "../canvas/FabricWave";
import CinematicText from "../ui/CinematicText";
import Magnetic from "../ui/Magnetic";
import { HeritageBadge } from "../ui/HeritageBadge";
import { SplitText } from "../ui/SplitText";
import Image from "next/image";
import { Environment } from "@react-three/drei";

const fadeInUpBlur = {
  initial: { opacity: 0, y: 24, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const TiltCard = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={fadeInUpBlur}
      initial="initial"
      animate="animate"
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      <div style={{ transform: "translateZ(20px)" }} className="h-full w-full">
        {children}
      </div>
    </motion.div>
  );
};

export const Product3DHero = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#FDFBF7] overflow-hidden pt-24 pb-12 px-4 md:px-8">
      {/* Background Mesh Gradient (Pattern 4) */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-[#E0E7FF] blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-[#FFEDD5] blur-[120px]" />
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 grid-rows-auto gap-4 md:gap-6 relative z-10">
        
        {/* Cell 1: Main Headline (Editorial Typography) */}
        <TiltCard 
          className="md:col-span-8 bg-white/40 backdrop-blur-md rounded-[2rem] p-8 md:p-16 flex flex-col justify-center border border-white/20 shadow-[0_8px_32px_rgba(30,41,59,0.05)]"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-mono text-secondary tracking-widest uppercase">01 // The Collection</span>
            <span className="h-px w-12 bg-secondary/30"></span>
          </div>
          
          <h1 className="text-6xl md:text-[8rem] font-display text-primary leading-[0.85] tracking-tight mb-8">
            <SplitText text="The Art" variant="slideUp" /> <br />
            <span className="italic font-light opacity-80 pl-8 md:pl-24">
              <SplitText text="of Draping." variant="blurIn" delay={0.2} />
            </span>
          </h1>
          
          <p className="max-w-xl text-primary/70 font-body text-base md:text-lg leading-relaxed mb-10">
            Experience the rhythm of Jaipur's block prints. Hand-crafted cotton wrap skirts designed for the modern muse, rooted in centuries of tradition.
          </p>

          <div className="flex flex-wrap gap-6 items-center">
            <Magnetic strength={0.2}>
              <button className="group relative bg-[#C2410C] text-white px-8 py-4 rounded-full overflow-hidden transition-all duration-500 shadow-[0_4px_16px_rgba(194,65,12,0.3)] hover:shadow-[0_8px_32px_rgba(194,65,12,0.4)] hover:-translate-y-0.5">
                <span className="relative z-10 uppercase tracking-widest text-[10px] font-bold flex items-center gap-2">
                  Explore Collection
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-[#0F172A] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </button>
            </Magnetic>
            
            <button className="uppercase tracking-widest text-[10px] font-bold text-primary/60 hover:text-primary transition-colors py-2 border-b border-primary/10 hover:border-primary">
              Our Story
            </button>
          </div>
        </TiltCard>

        {/* Cell 2: 3D Fabric Wave (Interactive Canvas) */}
        <TiltCard 
          delay={0.2}
          className="md:col-span-4 h-[400px] md:h-auto bg-[#0F172A] rounded-[2rem] overflow-hidden relative group cursor-grab active:cursor-grabbing shadow-[0_8px_32px_rgba(15,23,42,0.15)]"
        >
          <div className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white/50 text-[10px] uppercase tracking-widest font-medium">
            <Sparkles size={12} className="text-secondary" />
            <span>Interactive Fabric</span>
          </div>
          
          <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <Suspense fallback={null}>
                <FabricWave textureUrl="/artisanal_fabric_hero.png" />
                <Environment preset="studio" />
              </Suspense>
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} intensity={1.5} />
            </Canvas>
          </div>
          
          {/* Subtle vignette */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 to-transparent" />
        </TiltCard>

        {/* Cell 3: Heritage Badge (3D Stamp) */}
        <TiltCard 
          delay={0.4}
          className="md:col-span-3 h-[300px] bg-white rounded-[2rem] border border-primary/5 shadow-[0_8px_32px_rgba(30,41,59,0.03)] overflow-hidden"
        >
          <HeritageBadge />
        </TiltCard>

        {/* Cell 4: Editorial Image (Parallax/Static) */}
        <TiltCard 
          delay={0.6}
          className="md:col-span-6 h-[300px] relative rounded-[2rem] overflow-hidden shadow-[0_8px_32px_rgba(30,41,59,0.1)] group"
        >
          <Image 
            src="/artisanal_fabric_hero.png" 
            alt="Editorial Backdrop" 
            fill 
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-transparent flex flex-col justify-end p-8">
            <span className="text-white/90 text-xs uppercase tracking-[0.3em] font-medium mb-2">Heritage Craft</span>
            <h3 className="text-white text-2xl font-display italic">Born in the Pink City.</h3>
          </div>
        </TiltCard>

        {/* Cell 5: Quick Stats/Info */}
        <TiltCard 
          delay={0.8}
          className="md:col-span-3 h-[300px] bg-secondary/10 rounded-[2rem] p-8 flex flex-col justify-between border border-secondary/10"
        >
          <div className="space-y-4">
            <MapPin size={24} className="text-secondary" />
            <div className="space-y-1">
              <h4 className="font-subheader font-bold text-primary uppercase text-xs tracking-widest">Global Shipping</h4>
              <p className="text-[11px] text-primary/60 leading-relaxed">Artisanal craft delivered to your doorstep, wherever you are.</p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-secondary/20">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-2xl font-display text-primary">100%</span>
                <p className="text-[10px] uppercase tracking-widest text-primary/40 font-bold">Organic Cotton</p>
              </div>
              <ArrowRight size={20} className="text-secondary opacity-40" />
            </div>
          </div>
        </TiltCard>

      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="mt-12 flex flex-col items-center gap-4"
      >
        <span className="uppercase tracking-[0.3em] text-[8px] text-primary/40 font-bold">Scroll to Discover</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary/20 to-transparent" />
      </motion.div>
    </section>
  );
};
