"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Careers", href: "/careers" },
];

const menuVariants = {
  initial: {
    y: "-100%",
  },
  animate: {
    y: 0,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
    }
  },
  exit: {
    y: "-100%",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: 0.2
    }
  }
};

import CinematicText from "../ui/CinematicText";
import Magnetic from "../ui/Magnetic";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          scrolled || !isHome || isOpen
            ? "py-4 bg-background/60 backdrop-blur-xl border-b border-primary/5 shadow-sm" 
            : "py-8 bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* Logo */}
          <Magnetic strength={0.1}>
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="relative w-32 h-10 md:w-40 md:h-12 hover:opacity-80 transition-opacity duration-500 z-[70] block"
            >
              <Image 
                src="/logo.png" 
                alt="Pezzava" 
                fill 
                className="object-contain" 
                priority
              />
            </Link>
          </Magnetic>

          {/* Action Buttons */}
          <div className="flex items-center gap-8 z-[70]">
            <Magnetic strength={0.4}>
              <Link 
                href="/shop" 
                aria-label="View Shopping Bag"
                className="text-primary p-2 block"
              >
                <ShoppingBag size={22} strokeWidth={1.5} />
              </Link>
            </Magnetic>
            
            <Magnetic strength={0.3}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="group flex flex-col justify-center items-end gap-1.5 w-10 h-10 p-1"
              >
                <span className={`h-[1.5px] bg-primary transition-all duration-500 origin-right ${isOpen ? 'w-full -rotate-45 -translate-y-[1px]' : 'w-full'}`}></span>
                <span className={`h-[1.5px] bg-primary transition-all duration-500 origin-right ${isOpen ? 'w-full rotate-45 translate-y-[1px]' : 'w-6 group-hover:w-full'}`}></span>
              </button>
            </Magnetic>
          </div>
        </div>
      </header>

      {/* Cinematic Menu Overlay */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-[60] bg-background flex flex-col justify-center px-6 md:px-24 overflow-hidden"
          >
            <nav className="flex flex-col gap-6 md:gap-8 max-w-4xl w-full mx-auto relative z-10 pt-20">
              {navLinks.map((link, i) => (
                <div key={link.name} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Magnetic strength={0.1}>
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="font-display text-5xl md:text-8xl leading-[0.85] tracking-tight text-primary hover:text-secondary transition-colors flex items-center justify-between group py-2"
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="text-xs font-subheader tracking-widest opacity-30">0{i+1}</span>
                          {link.name}
                        </span>
                        <ArrowRight size={48} strokeWidth={1} className="hidden md:block opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                      </Link>
                    </Magnetic>
                  </motion.div>
                </div>
              ))}
            </nav>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="absolute bottom-12 left-6 md:left-24 right-6 md:right-24 flex flex-col md:flex-row justify-between items-start md:items-end border-t border-primary/10 pt-8"
            >
              <div>
                <p className="font-subheader text-[10px] uppercase tracking-[0.4em] text-primary/40 mb-2 font-bold">The Heritage Studio</p>
                <p className="font-display italic text-2xl text-primary/80">Jaipur, Rajasthan</p>
              </div>
              <div className="flex gap-10 mt-8 md:mt-0 font-subheader text-[10px] uppercase tracking-[0.2em] font-bold">
                <Magnetic strength={0.2}><a href="https://instagram.com/pezzava" target="_blank" className="hover:text-secondary transition-colors block">Instagram</a></Magnetic>
                <Magnetic strength={0.2}><a href="https://facebook.com/pezzava" target="_blank" className="hover:text-secondary transition-colors block">Facebook</a></Magnetic>
                <Magnetic strength={0.2}><a href="mailto:hello@pezzava.com" className="hover:text-secondary transition-colors block">Contact</a></Magnetic>
              </div>
            </motion.div>
            
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-surface-raised/30 -z-10 rounded-full blur-[120px]" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

