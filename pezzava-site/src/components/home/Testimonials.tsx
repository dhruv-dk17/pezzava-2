'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import CinematicText from '../ui/CinematicText';
import Magnetic from '../ui/Magnetic';

const testimonials = [
  {
    quote: "Loved the quality of the cotton! The print is so vibrant and the skirt fits perfectly. Will definitely buy more.",
    author: "Priya S.",
    location: "Mumbai",
    rating: 5
  },
  {
    quote: "Very comfortable for daily wear. The wrap-around design is so convenient. Great value for the price.",
    author: "Anita R.",
    location: "Delhi",
    rating: 5
  },
  {
    quote: "The colors are even more beautiful in person. It feels like wearing a piece of Jaipur's heritage.",
    author: "Megha K.",
    location: "Bangalore",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-surface-raised/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="font-subheader text-xs font-bold tracking-[0.4em] text-primary uppercase mb-6 block">Kind Words</span>
          <h2 className="font-display text-5xl md:text-7xl leading-tight text-primary">
            <CinematicText text="Voices of" type="letters" delay={0.1} /> <br />
            <CinematicText text="Our Community" type="letters" delay={0.4} className="italic font-light opacity-80" />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.15 }}
              className="bg-background p-10 md:p-12 border border-primary/5 shadow-premium hover:shadow-2xl transition-all duration-500 flex flex-col justify-between group"
            >
              <div>
                <div className="flex gap-1 mb-8">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" className="text-secondary" />
                  ))}
                </div>
                <p className="font-body text-lg text-primary/70 italic leading-relaxed mb-10 group-hover:text-primary transition-colors duration-500">
                  "{item.quote}"
                </p>
              </div>
              <div>
                <p className="font-display text-xl font-bold text-primary">
                  &mdash; {item.author}
                </p>
                <p className="font-subheader text-[10px] text-primary/40 uppercase tracking-[0.3em] mt-2">
                  {item.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
