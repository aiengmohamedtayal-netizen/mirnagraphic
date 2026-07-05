'use client';

import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { fadeUp, viewportOnce, buttonHover } from '@/lib/motion';

export default function FinalCta() {
  const { t, dir } = useLocale();
  const isAr = dir === 'rtl';

  return (
    <section className="min-h-[80vh] flex items-center justify-center py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-transparent to-black/30 pointer-events-none" />
      
      {/* Cinematic blurred orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 text-white text-sm font-bold uppercase tracking-widest mb-10 border border-white/20 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            {t.trustedBy.label}
          </div>
          
          <h2 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight text-white drop-shadow-lg">
            {t.finalCta.title}
          </h2>
          
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-12 max-w-3xl mx-auto font-light">
            {t.finalCta.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.button 
              {...buttonHover}
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-primary rounded-2xl font-bold text-xl shadow-2xl"
            >
              {t.finalCta.call}
              {isAr ? <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform" /> : <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />}
            </motion.button>
            <motion.button 
              {...buttonHover}
              className="inline-flex items-center justify-center px-10 py-5 bg-transparent border-2 border-white/40 text-white rounded-2xl font-bold text-xl hover:bg-white/10 backdrop-blur-sm transition-colors"
            >
              {t.nav?.quote || (isAr ? 'اطلب عرض سعر' : 'Request Quotation')}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
