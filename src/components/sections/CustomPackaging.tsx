'use client';

import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { fadeUp, viewportOnce, sectionReveal, buttonHover, cardHover } from '@/lib/motion';

export default function CustomPackaging() {
  const { t, dir } = useLocale();
  const isAr = dir === 'rtl';

  return (
    <motion.section 
      id="products" 
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="py-24 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 mb-16 flex flex-col md:flex-row gap-8 justify-between items-end">
        <motion.div variants={fadeUp} className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest mb-8 border border-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            {t.customPackaging.label}
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-white leading-tight">
            {t.customPackaging.title}
          </h2>
          <p className="text-lg text-white/80 leading-relaxed">
            {t.customPackaging.subtitle}
          </p>
        </motion.div>
        
        <motion.button 
          variants={fadeUp}
          whileHover={buttonHover.whileHover}
          whileTap={buttonHover.whileTap}
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all whitespace-nowrap shrink-0"
        >
          {t.contact.label}
          {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </motion.button>
      </div>

      {/* Horizontal Scroll Area */}
      <div className="w-full relative z-10">
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 px-6 lg:px-8 max-w-7xl mx-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {t.customPackaging.features.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={fadeUp}
              whileHover={cardHover.whileHover}
              whileTap={cardHover.whileTap}
              className="snap-start shrink-0 w-[85vw] sm:w-[400px] bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-[2rem] flex flex-col justify-between"
            >
              <div>
                <div className="text-5xl font-black text-white/20 mb-6">{String(idx + 1).padStart(2, '0')}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-white/70 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
