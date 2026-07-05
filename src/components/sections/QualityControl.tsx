'use client';

import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { fadeUp, staggerContainer, staggerFast, viewportOnce, hoverLift, statsCounter } from '@/lib/motion';

export default function QualityControl() {
  const { t } = useLocale();
  const q = t.quality;

  return (
    <section id="quality" className="py-24 lg:py-32 bg-foreground text-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerFast}
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest mb-8 border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              {q.label}
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white mb-6">
              {q.title}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-300 leading-relaxed mb-8">
              {q.subtitle}
            </motion.p>
            
            <motion.div variants={staggerFast} className="grid grid-cols-2 gap-6 mt-8">
              {q.metrics.map((metric, idx) => (
                <motion.div key={idx} variants={statsCounter} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gold/5 group-hover:bg-gold/10 transition-colors duration-500" />
                  <span className="block text-4xl font-display font-bold text-gold mb-2 relative z-10">{metric.value}</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-bold relative z-10">{metric.title}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid sm:grid-cols-2 gap-4"
          >
            {q.points.map((step, idx) => (
              <motion.div 
                key={idx}
                variants={fadeUp}
                whileHover={hoverLift.whileHover}
                whileTap={hoverLift.whileTap}
                className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm group hover:border-gold/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <Activity className="w-5 h-5 text-gold" />
                </div>
                <h4 className="text-white font-bold text-sm mb-2">{step.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
