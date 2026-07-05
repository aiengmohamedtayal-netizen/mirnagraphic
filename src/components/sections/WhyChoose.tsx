'use client';

import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Zap, Cpu } from 'lucide-react';
import { fadeUp, staggerContainer, viewportOnce, cardHover } from '@/lib/motion';

export default function WhyChoose() {
  const { t } = useLocale();
  const icons = [ShieldCheck, Clock, Zap, Cpu];
  
  const reasons = t.whyChoose.reasons.map((r, idx) => ({ ...r, icon: icons[idx] }));

  return (
    <section className="py-24 lg:py-32 bg-secondary/30 relative border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="section-label mb-6 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="uppercase tracking-widest text-sm font-semibold">{t.whyChoose.label}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            {t.whyChoose.title}
          </h2>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {reasons.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={fadeUp}
              {...cardHover}
              className={`glass-card p-10 flex flex-col justify-center rounded-3xl group ${idx === 0 || idx === 3 ? 'md:col-span-2' : 'md:col-span-1'}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
