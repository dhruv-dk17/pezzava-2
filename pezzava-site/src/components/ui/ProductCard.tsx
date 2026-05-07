'use client';

import { Product } from '@/data/products';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { normalizeImageSrc } from '@/lib/utils';
import { useState, useRef, MouseEvent } from 'react';

interface ProductCardProps {
  product: Product;
  index: number;
  isDimmed?: boolean;
}

export default function ProductCard({ product, index, isDimmed = false }: ProductCardProps) {
  const [imgSrc, setImgSrc] = useState(normalizeImageSrc(product.images?.[0]));
  const ref = useRef<HTMLDivElement>(null);
  
  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`group flex flex-col transition-opacity duration-700 ${isDimmed ? 'opacity-30 grayscale-[50%]' : 'opacity-100'}`}
    >
      <Link href={`/product/${product.id}`} className="block perspective-1000">
        <motion.div 
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative aspect-[3/4] overflow-hidden bg-[#f4f0ec] shadow-xl group-hover:shadow-2xl transition-shadow duration-700 magnetic"
        >
          <motion.div 
            style={{ transform: "translateZ(30px)" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={imgSrc}
              alt={product.displayName}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              onError={() => setImgSrc('/next.svg')}
            />
          </motion.div>
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transform: "translateZ(40px)" }} />
          
          <div className="absolute inset-0 flex items-center justify-center translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[0.16,1,0.3,1]" style={{ transform: "translateZ(50px)" }}>
             <div className="bg-white/80 backdrop-blur-xl px-8 py-4 shadow-2xl border border-white/50">
                <span className="text-[10px] font-bold font-body text-black uppercase tracking-[0.3em]">View Exhibit</span>
             </div>
          </div>

          {/* Badges */}
          <div className="absolute top-6 left-6" style={{ transform: "translateZ(60px)" }}>
             <span className="bg-white text-black px-4 py-2 text-[8px] font-bold uppercase tracking-[0.3em] shadow-lg mix-blend-screen border border-black/5">New Arrival</span>
          </div>
        </motion.div>
      </Link>

      <div className="mt-8 flex-1 flex flex-col text-center items-center">
        <h3 className="font-display text-4xl group-hover:text-primary transition-colors tracking-tight mb-3">
          <Link href={`/product/${product.id}`}>{product.displayName}</Link>
        </h3>
        <p className="text-[10px] text-on-surface-variant font-subheader tracking-[0.4em] uppercase mb-5 border-b border-black/10 pb-4 w-12 group-hover:w-24 transition-all duration-500 whitespace-nowrap overflow-hidden text-ellipsis">
          {product.color} &bull; {product.length}
        </p>
        <span className="font-subheader font-bold text-xs tracking-widest text-primary">₹{product.price}</span>
      </div>
    </motion.div>
  );
}
