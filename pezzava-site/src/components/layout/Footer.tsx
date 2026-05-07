import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full bg-[#111] text-white pt-32 pb-12 px-6 md:px-12 overflow-hidden relative selection:bg-primary selection:text-white">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/20 blur-[150px] rounded-full opacity-50 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-8 mb-32">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <Link href="/" className="relative w-48 h-16 mb-12 block hover:opacity-80 transition-opacity duration-500 magnetic">
              <Image src="/logo.png" alt="Pezzava" fill className="object-contain brightness-0 invert" />
            </Link>
            <p className="font-body text-white/60 max-w-md leading-relaxed mb-12 font-light text-lg">
              Bridging the ornate architectural history of Rajasthan with the restrained clarity of modern editorial fashion. 
              Purveyors of fine 100% cotton wrap-around skirts.
            </p>
            
            <div className="flex gap-8">
              <a href="https://www.instagram.com/pezzava6828" target="_blank" rel="noopener noreferrer" className="font-body text-[10px] uppercase tracking-[0.3em] text-white/80 hover:text-white transition-colors magnetic">Instagram</a>
              <a href="https://www.facebook.com/pezzava/" target="_blank" rel="noopener noreferrer" className="font-body text-[10px] uppercase tracking-[0.3em] text-white/80 hover:text-white transition-colors magnetic">Facebook</a>
              <a href="https://www.linkedin.com/in/pezzava-jaipur-1850415b" target="_blank" rel="noopener noreferrer" className="font-body text-[10px] uppercase tracking-[0.3em] text-white/80 hover:text-white transition-colors magnetic">LinkedIn</a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="md:col-span-3 md:col-start-7 flex flex-col gap-6">
            <h4 className="font-body text-[9px] text-white/40 uppercase tracking-[0.4em] mb-4">Exhibition</h4>
            <Link href="/shop" className="font-display text-3xl text-white/80 hover:text-white transition-colors tracking-tight">Shop All</Link>
            <Link href="/shop?cat=new" className="font-display text-3xl text-white/80 hover:text-white transition-colors tracking-tight">New Arrivals</Link>
            <Link href="/shop?cat=bestsellers" className="font-display text-3xl text-white/80 hover:text-white transition-colors tracking-tight">Bestsellers</Link>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <h4 className="font-body text-[9px] text-white/40 uppercase tracking-[0.4em] mb-4">House</h4>
            <Link href="/about" className="font-body text-sm text-white/70 hover:text-white transition-colors">About Us</Link>
            <Link href="/contact" className="font-body text-sm text-white/70 hover:text-white transition-colors">Contact Us</Link>
            <Link href="/careers" className="font-body text-sm text-white/70 hover:text-white transition-colors">Careers</Link>
            <Link href="/careers/verification" className="font-body text-sm text-white/70 hover:text-white transition-colors">Internship Verification</Link>
            <Link href="#" className="font-body text-sm text-white/70 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

        {/* Massive Typography */}
        <div className="w-full flex justify-center items-center py-12 md:py-24 border-t border-white/10 mb-8 overflow-hidden">
          <h2 className="font-display text-[15vw] leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 select-none">
            PEZZAVA
          </h2>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-white/10">
          <p className="font-body text-[9px] uppercase tracking-[0.3em] text-white/40">
            Est. 2012 &copy; 2026 PEZZAVA. All Rights Reserved.
          </p>
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="font-body text-[9px] text-white/40 uppercase tracking-[0.3em]">
                Handcrafted with love in Jaipur
            </div>
            <div className="font-body text-[9px] text-primary uppercase tracking-[0.3em]">
                GSTIN: 08AWIPK5231H1ZJ
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
