"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface LogoProps {
  className?: string;
  onClick?: () => void;
  scrolled?: boolean;
}

const Logo = ({ className = "", onClick, scrolled = false }: LogoProps) => {
  return (
    <Link 
      href="/" 
      onClick={onClick}
      className={`group flex items-center gap-3 ${className}`}
    >
      <div className="relative flex flex-col items-center">
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <span className={`font-display text-2xl md:text-3xl tracking-[-0.05em] transition-colors duration-500 ${
            scrolled ? "text-primary" : "text-primary"
          }`}>
            PEZZ
            <span className="text-secondary italic">AVA</span>
          </span>
          
          {/* Decorative Underline/Accent */}
          <motion.div 
            className="absolute -bottom-1 left-0 right-0 h-[1px] bg-secondary/30 origin-left"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
        
        <motion.span 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 0.4, y: 0 }}
          className="text-[8px] uppercase tracking-[0.4em] font-subheader mt-0.5"
        >
          Jaipur Heritage
        </motion.span>
      </div>

      {/* Emblem */}
      <div className="hidden md:flex flex-col items-center justify-center w-8 h-8 rounded-full border border-secondary/20 relative overflow-hidden group-hover:border-secondary/50 transition-colors duration-500">
        <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="text-[10px] font-display text-secondary translate-y-[1px]">P</span>
      </div>
    </Link>
  );
};

export default Logo;
