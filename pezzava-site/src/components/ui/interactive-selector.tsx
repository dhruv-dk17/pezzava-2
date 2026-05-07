"use client";

import React, { useState, useEffect } from 'react';
import { catalog } from '@/data/products';
import { Star, Sparkles, Scissors, Leaf, Infinity as InfinityIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ICONS = [
  <Sparkles key="1" size={24} className="text-white" />,
  <Star key="2" size={24} className="text-white" />,
  <Scissors key="3" size={24} className="text-white" />,
  <Leaf key="4" size={24} className="text-white" />,
  <InfinityIcon key="5" size={24} className="text-white" />
];

const InteractiveSelector = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  
  // Get top 5 featured products for the selector
  const options = catalog.filter(p => p.featured).slice(0, 5).map((product, index) => ({
    id: product.id,
    title: product.displayName,
    description: product.description.split('.')[0] + '.', // Short description
    image: product.images[0] || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", // fallback
    icon: ICONS[index % ICONS.length]
  }));

  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [options.length]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] font-sans text-white"> 
      {/* Header Section */}
      <div className="w-full max-w-2xl px-6 mt-8 mb-2 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight drop-shadow-lg animate-fadeInTop delay-300">Featured Collections</h1>
        <p className="text-lg md:text-xl text-gray-400 font-medium max-w-xl mx-auto animate-fadeInTop delay-600">Discover our signature Jaipur wrap skirts, crafted with artisanal textiles.</p>
      </div>

      <div className="h-12"></div>

      {/* Options Container */}
      <div className="options flex w-full max-w-[1000px] min-w-[300px] md:min-w-[800px] h-[500px] mx-4 items-stretch overflow-hidden relative">
        {options.map((option, index) => (
          <div
            key={index}
            className={`
              option relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out
              ${activeIndex === index ? 'active' : ''}
            `}
            style={{
              backgroundImage: `url('${option.image}')`,
              backgroundSize: activeIndex === index ? 'cover' : 'cover',
              backgroundPosition: 'center',
              backfaceVisibility: 'hidden',
              opacity: animatedOptions.includes(index) ? 1 : 0,
              transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
              minWidth: '60px',
              minHeight: '100px',
              margin: 0,
              borderRadius: 0,
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: activeIndex === index ? '#444' : '#1a1a1a',
              cursor: 'pointer',
              backgroundColor: '#18181b',
              boxShadow: activeIndex === index 
                ? '0 20px 60px rgba(0,0,0,0.50)' 
                : '0 10px 30px rgba(0,0,0,0.30)',
              flex: activeIndex === index ? '7 1 0%' : '1 1 0%',
              zIndex: activeIndex === index ? 10 : 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              position: 'relative',
              overflow: 'hidden',
              willChange: 'flex-grow, box-shadow, background-size, background-position'
            }}
            onClick={() => handleOptionClick(index)}
          >
            {/* Shadow effect */}
            <div 
              className="shadow absolute left-0 right-0 pointer-events-none transition-all duration-700 ease-in-out"
              style={{
                bottom: activeIndex === index ? '0' : '-40px',
                height: '200px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)'
              }}
            ></div>
            
            {/* Label with icon and info */}
            <div className="label absolute left-0 right-0 bottom-5 flex flex-col md:flex-row items-start md:items-center justify-start z-10 pointer-events-none px-4 gap-4 w-full">
              <div className="icon min-w-[44px] max-w-[44px] h-[44px] flex items-center justify-center rounded-full bg-[rgba(10,10,10,0.6)] backdrop-blur-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.3)] border border-[#333] flex-shrink-0 transition-all duration-200">
                {option.icon}
              </div>
              <div className="info text-white whitespace-normal md:whitespace-nowrap relative flex flex-col items-start w-full pr-4">
                <div 
                  className="main font-serif tracking-wide text-xl transition-all duration-700 ease-in-out"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                  }}
                >
                  {option.title}
                </div>
                <div 
                  className="sub text-sm text-gray-300 font-light mt-1 hidden md:block transition-all duration-700 ease-in-out whitespace-normal line-clamp-2"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                  }}
                >
                  {option.description}
                </div>
                
                {activeIndex === index && (
                  <Link href={`/product/${option.id}`} className="mt-3 pointer-events-auto transition-all duration-700 delay-300 opacity-0 animate-fadeInTop border-b border-white pb-1 text-sm tracking-widest uppercase hover:text-gray-300">
                    View Details
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Custom animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideFadeIn {
          0% {
            opacity: 0;
            transform: translateX(-60px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInFromTop {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInTop {
          opacity: 0;
          animation: fadeInFromTop 0.8s ease-out forwards;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-600 {
          animation-delay: 0.6s;
        }
      `}} />
    </div>
  );
};

export default InteractiveSelector;
