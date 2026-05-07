"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { catalog } from "@/data/products";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import CinematicText from "@/components/ui/CinematicText";
import Magnetic from "@/components/ui/Magnetic";

export const EditorialProductGrid = () => {
  const featured = catalog.filter(p => p.featured).slice(0, 6);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax offsets for columns
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -60]);

  // Split products into columns
  const col1 = featured.filter((_, i) => i % 3 === 0);
  const col2 = featured.filter((_, i) => i % 3 === 1);
  const col3 = featured.filter((_, i) => i % 3 === 2);

  return (
    <section ref={containerRef} className="py-32 px-4 md:px-12 bg-background relative z-10">
      <div className="max-w-[1440px] mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-secondary uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block"
            >
              Curated Selection
            </motion.span>
            <h2 className="text-5xl md:text-7xl font-display text-primary leading-tight">
              <CinematicText text="The Signature" type="letters" delay={0.1} />
              <br />
              <CinematicText text="Gallery." type="letters" delay={0.4} className="italic font-light opacity-80" />
            </h2>
          </div>
          <Magnetic strength={0.3}>
            <Link href="/shop" className="group flex items-center gap-2 text-primary font-subheader text-xs uppercase tracking-widest pb-2 border-b border-primary/20 hover:border-primary transition-all">
              View All Pieces
              <ArrowUpRight size={14} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Magnetic>
        </header>

        {/* Parallax Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 items-start">
          {/* Column 1 */}
          <motion.div style={{ y: y1 }} className="flex flex-col gap-24">
            {col1.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx * 3} />
            ))}
          </motion.div>

          {/* Column 2 */}
          <motion.div style={{ y: y2 }} className="flex flex-col gap-24 mt-24">
            {col2.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx * 3 + 1} />
            ))}
          </motion.div>

          {/* Column 3 */}
          <motion.div style={{ y: y3 }} className="flex flex-col gap-24 mt-12">
            {col3.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx * 3 + 2} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
