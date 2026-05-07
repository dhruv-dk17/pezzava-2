'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface CinematicTextProps {
  text: string;
  className?: string;
  delay?: number;
  type?: 'words' | 'letters';
  once?: boolean;
}

/**
 * A text reveal component that provides a premium, cinematic animation.
 * Can reveal text by words (paragraphs) or letters (headlines).
 */
export default function CinematicText({ 
  text, 
  className = "", 
  delay = 0, 
  type = 'words',
  once = true 
}: CinematicTextProps) {
  const items = type === 'words' ? text.split(" ") : text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: type === 'words' ? 0.08 : 0.03, 
        delayChildren: delay 
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 120,
      },
    },
    hidden: {
      opacity: 0,
      y: 25,
      rotateX: 15,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 120,
      },
    },
  };

  return (
    <motion.div
      style={{ 
        perspective: "1000px",
        display: "inline-flex", 
        flexWrap: "wrap",
        lineHeight: "1.2"
      }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className={className}
    >
      {items.map((item, index) => (
        <motion.span
          variants={child}
          style={{ 
            display: "inline-block", 
            whiteSpace: item === " " ? "pre" : "normal",
            marginRight: type === 'words' ? "0.25em" : "0"
          }}
          key={index}
        >
          {item}
        </motion.span>
      ))}
    </motion.div>
  );
}
