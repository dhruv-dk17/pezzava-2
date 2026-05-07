'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const storyY = useTransform(scrollYProgress, [0.1, 0.4], ["10%", "-5%"]);
  
  const image1Y = useTransform(scrollYProgress, [0.3, 0.6], ["20%", "-20%"]);
  const image2Y = useTransform(scrollYProgress, [0.5, 0.8], ["20%", "-20%"]);

  return (
    <div ref={containerRef} className="flex flex-col w-full bg-background min-h-[300vh] relative overflow-hidden">
      
      {/* 1. Cinematic Hero */}
      <motion.section 
        className="h-screen w-full flex flex-col justify-center items-center text-center px-6 relative z-10"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <span className="font-subheader text-xs font-semibold tracking-[0.4em] text-secondary uppercase mb-8 block">
            Est. 2012 • Jaipur
          </span>
          <h1 className="font-display text-6xl md:text-8xl lg:text-[10rem] text-primary leading-[0.85] mb-8 font-medium">
            The <span className="italic text-[#C2410C]">Soul</span> <br />
            Of Jaipur
          </h1>
          <p className="font-subheader text-lg text-secondary max-w-lg mx-auto leading-relaxed">
            Bridging ancient Rajasthani textile traditions with the modern silhouette. A story of craftsmanship, cotton, and timeless elegance.
          </p>
        </motion.div>
      </motion.section>

      {/* 2. The Narrative Intro */}
      <section className="min-h-screen relative flex items-center py-32 px-6 md:px-12 lg:px-24 z-20 bg-background">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            style={{ y: storyY }}
            className="order-2 lg:order-1 relative"
          >
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#C2410C]/5 rounded-full blur-3xl -z-10" />
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.1] mb-12">
              A Legacy Wrapped in <br />
              <span className="italic text-[#C2410C]">Artisanal Cotton</span>
            </h2>
            <div className="space-y-8 text-secondary leading-relaxed font-subheader text-lg max-w-xl">
              <p>
                Pezzava is a clothing brand based in Jaipur, Rajasthan, established in 2012. We focus on creating apparel and textile products that reflect a profound blend of traditional Indian craftsmanship and everyday modern wearability.
              </p>
              <p>
                Operating with a deep respect for our artisans, Pezzava manages its design, sourcing, and production processes with close attention to quality. Over the years, the brand has developed a practical understanding of what makes a garment truly special: the feeling of the fabric against the skin.
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="order-1 lg:order-2 h-[60vh] md:h-[80vh] w-full relative rounded-tl-[100px] rounded-br-[100px] overflow-hidden shadow-premium"
            style={{ y: image1Y }}
          >
            <Image 
              src="/images/about-heritage.png" 
              alt="Artisanal craftsmanship" 
              fill 
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>
        </div>
      </section>

      {/* 3. The Process Parallax */}
      <section className="min-h-screen relative flex items-center py-32 px-6 md:px-12 lg:px-24 z-20 bg-surface">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            className="h-[50vh] md:h-[70vh] w-full relative rounded-tr-[100px] rounded-bl-[100px] overflow-hidden shadow-premium"
            style={{ y: image2Y }}
          >
            <Image 
              src="/images/bento-craft.png" 
              alt="Fabric details" 
              fill 
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>

          <div className="relative">
             <span className="font-subheader text-xs font-semibold tracking-widest text-[#C2410C] uppercase mb-6 block">
               The Craftsmanship
             </span>
             <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.1] mb-16 italic">
               The Pezzava Way
             </h2>

             <div className="space-y-12">
               {[
                 {
                   step: "01",
                   title: "Ethical Sourcing",
                   desc: "We hand-select only the finest 100% pure cotton from local mills that practice sustainable manufacturing."
                 },
                 {
                   step: "02",
                   title: "Artisanal Printing",
                   desc: "Traditional wooden blocks are used by master craftsmen to apply natural dyes with rhythmic precision."
                 },
                 {
                   step: "03",
                   title: "Universal Fit",
                   desc: "Each skirt is engineered for a universal wrap-around fit, celebrating the diversity of the female form."
                 }
               ].map((item, i) => (
                 <motion.div 
                   key={i} 
                   initial={{ opacity: 0, x: 20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ delay: i * 0.2, duration: 0.8 }}
                   className="relative pl-12 border-l border-slate-200"
                 >
                   <span className="absolute left-0 top-0 -translate-x-1/2 bg-surface text-secondary font-subheader text-sm py-2">
                     {item.step}
                   </span>
                   <h3 className="font-display text-2xl text-primary mb-3">{item.title}</h3>
                   <p className="font-subheader text-secondary leading-relaxed">
                     {item.desc}
                   </p>
                 </motion.div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* 4. Massive Pull Quote */}
      <section className="py-40 px-6 relative z-20 bg-primary text-surface flex flex-col items-center justify-center min-h-[60vh] overflow-hidden">
        <div className="absolute inset-0 noise-overlay opacity-20" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-10 max-w-5xl mx-auto text-center"
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-12 font-light">
            "True luxury is the <span className="italic text-[#C2410C]">harmony</span> of absolute comfort and authentic <span className="italic">craftsmanship</span>."
          </h2>
          <div className="w-12 h-[1px] bg-surface/30 mx-auto mb-12" />
          <p className="font-subheader font-bold uppercase tracking-[0.4em] text-xs text-surface/60">
            Pezzava Jaipur
          </p>
        </motion.div>
      </section>

    </div>
  );
}


