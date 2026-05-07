'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import RangeSlider from '@/components/ui/RangeSlider';

interface FilterOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    categories: string[];
    colors: string[];
    priceRange: [number, number];
    length: [number, number];
  };
  setFilters: (filters: any) => void;
  availableColors: string[];
  productCount: number;
}

export default function FilterOverlay({ isOpen, onClose, filters, setFilters, availableColors, productCount }: FilterOverlayProps) {
  const categories = [
    { id: 'mini', label: 'Mini' },
    { id: 'knee', label: 'Knee Length' },
    { id: 'calf', label: 'Calf Length' },
    { id: 'long', label: 'Long' }
  ];

  const toggleFilter = (type: 'categories' | 'colors', value: string) => {
    const current = filters[type];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    
    setFilters({ ...filters, [type]: updated });
  };

  const clearAll = () => setFilters({ 
    categories: [], 
    colors: [], 
    priceRange: [0, 5000], 
    length: [0, 3] 
  });

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const overlayVariants: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 } }
  };

  const contentVariants: any = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } },
    exit: { x: '100%', transition: { type: 'spring', damping: 25, stiffness: 200 } }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center pointer-events-none">
          {/* Backdrop */}
          <motion.div 
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md pointer-events-auto"
          />
          
          {/* Modal Container */}
          <motion.div 
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-4xl bg-[#f4f0ec] max-h-[90vh] overflow-y-auto pointer-events-auto rounded-t-3xl sm:rounded-3xl shadow-2xl border border-white/20 p-8 md:p-16"
          >
            <div className="flex justify-between items-start mb-16">
              <motion.div variants={itemVariants}>
                <span className="font-subheader text-[10px] font-bold tracking-[0.3em] text-primary uppercase mb-2 block">Curation</span>
                <h2 className="font-display text-5xl md:text-7xl italic">Refine.</h2>
              </motion.div>
              
              <motion.button 
                variants={itemVariants}
                onClick={onClose} 
                className="p-4 bg-white rounded-full text-primary hover:bg-black hover:text-white transition-colors group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
              </motion.button>
            </div>

            {/* Filter Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16 mb-16">
              
              {/* Range Sliders Column */}
              <motion.div variants={itemVariants} className="space-y-12">
                <div className="space-y-8">
                  <h3 className="font-subheader text-xs font-bold uppercase tracking-[0.4em] text-on-surface-variant border-b border-black/10 pb-4">Range</h3>
                  
                  <RangeSlider 
                    label="Investment"
                    min={0}
                    max={5000}
                    prefix="₹"
                    step={100}
                    value={filters.priceRange}
                    onChange={(val) => setFilters({ ...filters, priceRange: val })}
                  />

                  <div className="pt-4">
                    <RangeSlider 
                      label="Silhouette Length"
                      min={0}
                      max={3}
                      step={1}
                      value={filters.length}
                      onChange={(val) => setFilters({ ...filters, length: val })}
                    />
                    <div className="flex justify-between mt-2 px-1">
                       {categories.map((c, i) => (
                         <span key={c.id} className="font-subheader text-[8px] uppercase tracking-tighter text-black/40">
                           {c.label}
                         </span>
                       ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                   <h3 className="font-subheader text-xs font-bold uppercase tracking-[0.4em] text-on-surface-variant border-b border-black/10 pb-4">Categories</h3>
                   <div className="flex flex-wrap gap-3">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => toggleFilter('categories', cat.id)}
                          className={`px-4 py-2 font-subheader text-[10px] uppercase tracking-[0.2em] transition-all duration-300 border ${
                            filters.categories.includes(cat.id) 
                            ? 'bg-black text-white border-black' 
                            : 'bg-transparent text-black border-black/10 hover:border-black/30'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                   </div>
                </div>
              </motion.div>

              {/* Hue Column */}
              <motion.div variants={itemVariants} className="space-y-8">
                <h3 className="font-subheader text-xs font-bold uppercase tracking-[0.4em] text-on-surface-variant border-b border-black/10 pb-4">Hue</h3>
                <div className="grid grid-cols-2 gap-3">
                  {availableColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => toggleFilter('colors', color)}
                      className={`px-4 py-3 text-left font-subheader text-[10px] uppercase tracking-[0.3em] transition-all duration-300 border ${
                        filters.colors.includes(color) 
                        ? 'bg-black text-white border-black' 
                        : 'bg-white text-black border-black/10 hover:border-black/30'
                      }`}
                    >
                      <span className="flex items-center justify-between">
                        {color}
                        {filters.colors.includes(color) && <div className="w-1 h-1 rounded-full bg-white" />}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Footer Actions */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-black/10">
              {(filters.categories.length > 0 || filters.colors.length > 0 || filters.priceRange[0] > 0 || filters.priceRange[1] < 5000 || filters.length[0] > 0 || filters.length[1] < 3) ? (
                <button 
                  onClick={clearAll}
                  className="font-subheader text-[10px] font-bold uppercase tracking-[0.3em] text-black/50 hover:text-black transition-colors border-b border-transparent hover:border-black pb-1"
                >
                  Clear Selection
                </button>
              ) : <div />}
              
              <button 
                onClick={onClose}
                className="w-full sm:w-auto px-12 py-5 bg-black text-white font-subheader text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-black/80 transition-colors"
              >
                View Gallery ({productCount})
              </button>
            </motion.div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
