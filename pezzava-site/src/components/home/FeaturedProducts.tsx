'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import { getFeaturedProducts } from '@/data/products';
import { useRef } from 'react';

export default function FeaturedProducts() {
  const products = getFeaturedProducts();
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax offsets for different columns
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const y3 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y4 = useTransform(scrollYProgress, [0, 1], [200, -200]);

  const transforms = [y1, y2, y3, y4];

  return (
    <section ref={ref} className="py-40 px-6 md:px-12 lg:px-24 bg-surface-raised border-t border-black/5 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-[1px] bg-primary"></span>
              <span className="font-body text-xs font-bold tracking-[0.4em] text-primary uppercase">Curated Selection</span>
            </div>
            <h2 className="font-display text-6xl md:text-8xl leading-[0.9] tracking-tighter text-on-surface">
              Featured <br/>
              <span className="italic text-primary font-light">Silhouettes</span>
            </h2>
          </motion.div>
          
          <Link href="/shop" className="group flex items-center gap-4 font-body font-bold text-xs uppercase tracking-[0.3em] text-on-surface hover:text-primary transition-colors mb-4 md:mb-6 magnetic">
            <span>View All Products</span>
            <div className="w-12 h-[1px] bg-on-surface group-hover:w-24 group-hover:bg-primary transition-all duration-700 ease-[0.16,1,0.3,1]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-24">
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              style={{ y: transforms[index % 4] }}
              className="mt-0 lg:mt-0"
            >
              <ProductCard product={product} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
