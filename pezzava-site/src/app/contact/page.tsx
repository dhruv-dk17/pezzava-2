'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, ExternalLink, CheckCircle2, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <span className="font-subheader text-xs font-semibold tracking-[0.4em] text-secondary uppercase mb-6 block">
            At Your Service
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl text-primary leading-tight mb-8">
            Client <span className="italic text-[#C2410C]">Concierge</span>
          </h1>
          <p className="font-subheader text-secondary max-w-lg mx-auto text-lg leading-relaxed">
            Whether inquiring about a specific weave, wholesale partnerships, or general assistance, our team is dedicated to providing a seamless experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left: Contact Info & Address */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 space-y-16"
          >
            {/* Direct Lines */}
            <div>
              <h3 className="font-subheader text-sm font-semibold tracking-widest text-primary uppercase mb-6 border-b border-slate-200 pb-4">
                Direct Lines
              </h3>
              <div className="space-y-6">
                <a href="mailto:pezzava@gmail.com" className="group flex items-center justify-between py-2">
                  <div className="flex items-center gap-4">
                    <Mail size={18} className="text-secondary" />
                    <span className="font-subheader text-primary group-hover:text-[#C2410C] transition-colors">pezzava@gmail.com</span>
                  </div>
                  <ArrowRight size={16} className="text-secondary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </a>
                <a href="tel:+918209199603" className="group flex items-center justify-between py-2">
                  <div className="flex items-center gap-4">
                    <Phone size={18} className="text-secondary" />
                    <span className="font-subheader text-primary group-hover:text-[#C2410C] transition-colors">+91 820 919 9603</span>
                  </div>
                  <ArrowRight size={16} className="text-secondary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </a>
              </div>
            </div>

            {/* Locations */}
            <div>
              <h3 className="font-subheader text-sm font-semibold tracking-widest text-primary uppercase mb-6 border-b border-slate-200 pb-4">
                Our Locations
              </h3>
              <div className="space-y-8">
                <div className="group p-6 bg-surface border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#C2410C] transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />
                  <p className="font-subheader text-xs font-semibold tracking-widest text-secondary uppercase mb-3">Registered Office</p>
                  <p className="font-subheader text-primary leading-relaxed">
                    F-222B, Near Ram Nagar Extension,<br />
                    New Sanganer Road, Sodala,<br />
                    Jaipur, Rajasthan
                  </p>
                </div>

                <div className="group p-6 bg-surface border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />
                  <p className="font-subheader text-xs font-semibold tracking-widest text-secondary uppercase mb-3">Headquarters</p>
                  <p className="font-subheader text-primary leading-relaxed">
                    P.N. 7-b Brij Vihar,<br />
                    Badarama Kalwar Road, Govindpura,<br />
                    Jaipur, Rajasthan, 302012
                  </p>
                </div>
              </div>
            </div>

            {/* Social & Trust */}
            <div className="flex items-center gap-6">
              <a href="https://www.instagram.com/pezzava6828" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-[#C2410C] transition-colors">
                <InstagramIcon size={22} />
              </a>
              <a href="https://www.facebook.com/pezzava/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-[#C2410C] transition-colors">
                <FacebookIcon size={22} />
              </a>
              <a href="https://www.linkedin.com/in/pezzava-jaipur-1850415b" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-[#C2410C] transition-colors">
                <LinkedinIcon size={22} />
              </a>
            </div>

            <Link 
              href="/careers/verification"
              className="inline-flex items-center gap-3 text-sm font-subheader text-secondary hover:text-primary transition-colors group"
            >
              <CheckCircle2 size={16} />
              <span className="underline decoration-slate-300 underline-offset-4 group-hover:decoration-primary">Verify Internship Certificates</span>
            </Link>
          </motion.div>

          {/* Right: Minimal Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-7"
          >
            <div className="bg-surface p-8 md:p-12 lg:p-16 shadow-premium relative">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-20"
                  >
                    <div className="w-16 h-16 bg-[#C2410C]/10 rounded-full flex items-center justify-center mb-8">
                      <CheckCircle2 size={32} className="text-[#C2410C]" />
                    </div>
                    <h3 className="text-3xl text-primary mb-4 italic">Message Received</h3>
                    <p className="font-subheader text-secondary max-w-sm mb-12">
                      Our concierge team will review your inquiry and respond within 24 hours.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="font-subheader text-xs font-semibold tracking-widest text-primary uppercase pb-1 border-b border-primary hover:text-[#C2410C] hover:border-[#C2410C] transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-12"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="relative group">
                        <input 
                          type="text" 
                          id="name" 
                          placeholder=" "
                          required
                          className="peer w-full bg-transparent border-b border-slate-300 py-3 text-primary font-subheader focus:outline-none focus:border-primary transition-colors"
                        />
                        <label 
                          htmlFor="name" 
                          className="absolute left-0 top-3 font-subheader text-sm text-secondary transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-focus:font-semibold peer-focus:tracking-widest peer-focus:uppercase peer-valid:-top-4 peer-valid:text-xs peer-valid:text-primary peer-valid:font-semibold peer-valid:tracking-widest peer-valid:uppercase cursor-text"
                        >
                          Full Name
                        </label>
                      </div>

                      <div className="relative group">
                        <input 
                          type="email" 
                          id="email" 
                          placeholder=" "
                          required
                          className="peer w-full bg-transparent border-b border-slate-300 py-3 text-primary font-subheader focus:outline-none focus:border-primary transition-colors"
                        />
                        <label 
                          htmlFor="email" 
                          className="absolute left-0 top-3 font-subheader text-sm text-secondary transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-focus:font-semibold peer-focus:tracking-widest peer-focus:uppercase peer-valid:-top-4 peer-valid:text-xs peer-valid:text-primary peer-valid:font-semibold peer-valid:tracking-widest peer-valid:uppercase cursor-text"
                        >
                          Email Address
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="relative group">
                        <input 
                          type="tel" 
                          id="phone" 
                          placeholder=" "
                          className="peer w-full bg-transparent border-b border-slate-300 py-3 text-primary font-subheader focus:outline-none focus:border-primary transition-colors"
                        />
                        <label 
                          htmlFor="phone" 
                          className="absolute left-0 top-3 font-subheader text-sm text-secondary transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-focus:font-semibold peer-focus:tracking-widest peer-focus:uppercase peer-valid:-top-4 peer-valid:text-xs peer-valid:text-primary peer-valid:font-semibold peer-valid:tracking-widest peer-valid:uppercase cursor-text"
                        >
                          Phone Number
                        </label>
                      </div>

                      <div className="relative group">
                        <select 
                          id="subject"
                          required
                          className="peer w-full bg-transparent border-b border-slate-300 py-3 text-primary font-subheader focus:outline-none focus:border-primary transition-colors appearance-none"
                        >
                          <option value="" disabled selected hidden></option>
                          <option value="product">Product Inquiry</option>
                          <option value="order">Order Support</option>
                          <option value="wholesale">Wholesale Partnerships</option>
                          <option value="press">Press & Media</option>
                          <option value="other">Other</option>
                        </select>
                        <label 
                          htmlFor="subject" 
                          className="absolute left-0 top-3 font-subheader text-sm text-secondary transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-focus:font-semibold peer-focus:tracking-widest peer-focus:uppercase peer-valid:-top-4 peer-valid:text-xs peer-valid:text-primary peer-valid:font-semibold peer-valid:tracking-widest peer-valid:uppercase pointer-events-none"
                        >
                          Inquiry Type
                        </label>
                        <div className="absolute right-0 top-4 pointer-events-none">
                          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="relative group mt-16">
                      <textarea 
                        id="message" 
                        rows={1}
                        placeholder=" "
                        required
                        className="peer w-full bg-transparent border-b border-slate-300 py-3 text-primary font-subheader focus:outline-none focus:border-primary transition-colors resize-none min-h-[100px]"
                      />
                      <label 
                        htmlFor="message" 
                        className="absolute left-0 top-3 font-subheader text-sm text-secondary transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-focus:font-semibold peer-focus:tracking-widest peer-focus:uppercase peer-valid:-top-4 peer-valid:text-xs peer-valid:text-primary peer-valid:font-semibold peer-valid:tracking-widest peer-valid:uppercase cursor-text"
                      >
                        Your Message
                      </label>
                    </div>

                    <div className="pt-8 flex justify-end">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className={`group flex items-center gap-4 font-subheader text-xs font-semibold tracking-[0.2em] uppercase pb-2 border-b transition-colors ${
                          isSubmitting ? 'text-secondary border-slate-200 cursor-not-allowed' : 'text-primary border-primary hover:text-[#C2410C] hover:border-[#C2410C]'
                        }`}
                      >
                        {isSubmitting ? 'Transmitting...' : 'Send Inquiry'}
                        <ArrowRight size={16} className={`transition-transform ${isSubmitting ? '' : 'group-hover:translate-x-2'}`} />
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
