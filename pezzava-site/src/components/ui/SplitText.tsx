"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  type?: "chars" | "words";
  variant?: "slideUp" | "blurIn" | "reveal";
}

const containerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const childVariants: Record<string, Variants> = {
  slideUp: {
    initial: { y: "100%", opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
  },
  blurIn: {
    initial: { filter: "blur(10px)", opacity: 0, scale: 0.9 },
    animate: { 
      filter: "blur(0px)", 
      opacity: 1, 
      scale: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    },
  },
  reveal: {
    initial: { x: -20, opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    },
  }
};

export const SplitText: React.FC<SplitTextProps> = ({ 
  text, 
  className = "", 
  delay = 0, 
  type = "chars",
  variant = "slideUp"
}) => {
  const items = type === "chars" ? text.split("") : text.split(" ");

  return (
    <motion.span
      className={`inline-block overflow-hidden ${className}`}
      variants={containerVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      style={{ transitionDelay: `${delay}s` }}
    >
      {items.map((item, i) => (
        <motion.span
          key={i}
          variants={childVariants[variant]}
          className="inline-block whitespace-pre"
        >
          {item}{type === "words" && i !== items.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
};
