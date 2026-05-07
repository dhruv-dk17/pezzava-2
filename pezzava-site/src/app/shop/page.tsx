'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { catalog } from '@/data/products';
import MarketplaceToggle from '@/components/shop/MarketplaceToggle';
import FilterOverlay from '@/components/shop/FilterOverlay';
import ShopHero from '@/components/shop/ShopHero';
import ProductCard from '@/components/ui/ProductCard';
import FloatingAtmosphere from '@/components/ui/FloatingAtmosphere';
import { Search, SlidersHorizontal } from 'lucide-react';

// Split Text Component for Cinematic Reveal
const CinematicTitle = ({ children }: { children: string }) => {
  return (
    <h1 className="font-display text-5xl md:text-7xl leading-tight overflow-hidden flex flex-wrap gap-x-4">
      {children.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-2">
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block italic last:not-italic"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
};

// Helper Grid Item component for clean code
function GridItem({ product, index, hoveredId, setHoveredId }: any) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHoveredId(product.id)}
      onMouseLeave={() => setHoveredId(null)}
      className="w-full"
    >
      <ProductCard 
        product={product} 
        index={index} 
        isDimmed={hoveredId !== null && hoveredId !== product.id}
      />
    </motion.div>
  );
}

export default function ShopPage() {
  const [activeStore, setActiveStore] = useState('all');
  const [filters, setFilters] = useState({ 
    categories: [] as string[], 
    colors: [] as string[],
    priceRange: [0, 5000] as [number, number],
    length: [0, 3] as [number, number] 
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const columnOffset = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const availableColors = useMemo(() => {
    return Array.from(new Set(catalog.map(p => p.color))).sort();
  }, []);

  const lengthMap = ["mini", "knee", "calf", "long"];

  const filteredProducts = useMemo(() => {
    return catalog.filter(p => {
      const matchesStore = activeStore === 'all' || p.storeAvailability.includes(activeStore);
      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(p.category);
      const matchesColor = filters.colors.length === 0 || filters.colors.includes(p.color);
      const matchesSearch = p.displayName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPrice = p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1];
      
      const pLengthIndex = lengthMap.indexOf(p.category.toLowerCase());
      const matchesLength = pLengthIndex >= filters.length[0] && pLengthIndex <= filters.length[1];

      return matchesStore && matchesCategory && matchesColor && matchesSearch && matchesPrice && matchesLength;
    });
  }, [activeStore, filters, searchQuery]);

  // Split into 3 columns for desktop parallax
  const col1 = filteredProducts.filter((_, i) => i % 3 === 0);
  const col2 = filteredProducts.filter((_, i) => i % 3 === 1);
  const col3 = filteredProducts.filter((_, i) => i % 3 === 2);

  return (
    <div className="relative pt-24 pb-48 min-h-screen overflow-x-hidden">
      <FloatingAtmosphere />
      <ShopHero />

      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-32 gap-12">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.4em' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="font-subheader text-[10px] font-bold text-primary uppercase mb-6 block"
            >
              The Collection
            </motion.span>
            <CinematicTitle>Curated Gallery.</CinematicTitle>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 w-full lg:w-auto">
             <MarketplaceToggle activeStore={activeStore} setActiveStore={setActiveStore} />
             
             {/* Search */}
             <div className="relative w-full md:w-80 group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-all duration-500" size={18} />
                <input 
                  type="text" 
                  placeholder="Find your silhouette..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/40 backdrop-blur-sm border border-primary/5 py-5 pl-16 pr-6 rounded-2xl focus:border-primary/20 focus:bg-white outline-none transition-all font-subheader text-sm shadow-sm focus:shadow-2xl"
                />
             </div>
          </div>
        </div>

        {/* Floating Refine Pill */}
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50">
          <motion.button 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, type: 'spring', damping: 25, stiffness: 120 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-4 bg-black text-white px-10 py-5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] transition-all group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            <SlidersHorizontal size={18} className="relative z-10" />
            <span className="font-subheader text-[10px] font-bold uppercase tracking-[0.4em] relative z-10">Refine Gallery</span>
            {(filters.categories.length > 0 || filters.colors.length > 0) && (
               <span className="w-2.5 h-2.5 rounded-full bg-primary absolute top-4 right-6 border-2 border-black" />
            )}
          </motion.button>
        </div>

        {/* Main Content Area */}
        <div className="w-full">
          
          {/* Grid Area */}
          <div className="w-full">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-32">
                  <AnimatePresence mode='popLayout'>
                    {/* Column 1 */}
                    <div key="col-1" className="flex flex-col gap-y-32">
                      {col1.map((product, i) => (
                        <GridItem key={product.id} product={product} index={i} hoveredId={hoveredProductId} setHoveredId={setHoveredProductId} />
                      ))}
                    </div>

                    {/* Column 2 (Middle) - Parallaxed */}
                    <motion.div key="col-2" style={{ y: columnOffset }} className="flex flex-col gap-y-32 md:mt-32">
                      {col2.map((product, i) => (
                        <GridItem key={product.id} product={product} index={i} hoveredId={hoveredProductId} setHoveredId={setHoveredProductId} />
                      ))}
                    </motion.div>

                    {/* Column 3 */}
                    <div key="col-3" className="flex flex-col gap-y-32 lg:mt-16">
                      {col3.map((product, i) => (
                        <GridItem key={product.id} product={product} index={i} hoveredId={hoveredProductId} setHoveredId={setHoveredProductId} />
                      ))}
                    </div>
                  </AnimatePresence>
                </div>
             ) : (
                <div className="text-center py-40 bg-surface-variant/5 border border-dashed border-primary/20 rounded-2xl">
                  <p className="font-display text-3xl text-on-surface-variant italic mb-8">No silhouettes found matching your criteria.</p>
                  <button 
                    onClick={() => { setFilters({ categories: [], colors: [], priceRange: [0, 5000], length: [0, 3] }); setSearchQuery(''); }}
                    className="group relative inline-flex items-center gap-3 text-primary font-subheader font-bold uppercase tracking-[0.4em] text-[10px]"
                  >
                    <span>Clear All Filters</span>
                    <div className="h-[1px] w-0 group-hover:w-full bg-primary transition-all duration-500 absolute -bottom-2 left-0" />
                  </button>
                </div>
             )}
          </div>
        </div>
      </div>

      <FilterOverlay 
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        setFilters={setFilters}
        availableColors={availableColors}
        productCount={filteredProducts.length}
      />
    </div>
  );
}
