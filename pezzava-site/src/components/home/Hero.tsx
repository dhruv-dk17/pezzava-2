'use client';

import { ReactLenis } from 'lenis/react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { useRef } from 'react';
import { catalog } from '@/data/products';
import { ArrowRight, MapPin } from 'lucide-react';

export default function SmoothScrollHero() {
  return (
    <div className="bg-[#0a0a0a]">
      <Hero />
    </div>
  );
}

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />
      <ParallaxImages />
      
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-[#0a0a0a]/0 to-[#0a0a0a] z-50 pointer-events-none" />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  const mainImage = "/images/hero_skirt.png";

  return (
    <motion.div
      className="sticky top-0 h-screen w-full z-10 flex flex-col items-center justify-center"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: `url(${mainImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
      
      {/* Title Content */}
      <div className="relative z-20 text-center flex flex-col items-center mt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 text-white/70 mb-6 uppercase tracking-[0.3em] text-xs font-semibold"
        >
          <MapPin size={14} />
          <span>Jaipur, Rajasthan</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-[8rem] font-serif text-white leading-[0.8] tracking-tighter"
        >
          The Living
          <br />
          <span className="italic font-light opacity-90">Fabric.</span>
        </motion.h1>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-12 flex items-center gap-2 group border border-white/30 rounded-full px-6 py-3 text-white hover:bg-white hover:text-black transition-all duration-500"
        >
          <span className="uppercase tracking-widest text-xs font-medium">Explore Collection</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  );
};

const ParallaxImages = () => {
  const images = catalog.flatMap(p => p.images).filter(Boolean);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-[200px] relative z-20 pb-48">
      <ParallaxImg
        src={images[1] || "https://images.unsplash.com/photo-1484600899469-230e8d1d59c0"}
        alt="Artisanal detail"
        start={-200}
        end={200}
        className="w-1/3 md:w-1/4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
      />
      <ParallaxImg
        src={images[2] || "https://images.unsplash.com/photo-1446776709462-d6b525c57bd3"}
        alt="Wrap skirt flowing"
        start={200}
        end={-250}
        className="mx-auto w-2/3 md:w-1/3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 mt-12 md:mt-24"
      />
      <ParallaxImg
        src={images[3] || "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2"}
        alt="Fabric texture"
        start={-200}
        end={200}
        className="ml-auto w-1/3 md:w-1/4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 mt-12 md:mt-0"
      />
      <ParallaxImg
        src={images[4] || "https://images.unsplash.com/photo-1494022299300-899b96e49893"}
        alt="Model wearing skirt"
        start={0}
        end={-500}
        className="ml-24 w-5/12 md:w-1/3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 mt-12 md:mt-48"
      />
      <ParallaxImg
        src={images[5] || images[0]}
        alt="Close up"
        start={-100}
        end={300}
        className="mx-auto w-1/2 md:w-1/4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 mt-24"
      />
    </div>
  );
};

const ParallaxImg = ({
  className,
  alt,
  src,
  start,
  end,
}: {
  className: string;
  alt: string;
  src: string;
  start: number;
  end: number;
}) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity, objectFit: 'cover' }}
    />
  );
};
