'use client';

import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import { motion } from 'framer-motion';
import { PackageCheck, ShieldAlert, Clock } from 'lucide-react';
import { fadeUp, staggerContainer, viewportOnce, cardHover } from '@/lib/motion';

export default function ValueMatrix() {
  const { t } = useLocale();

  const values = [
    { icon: PackageCheck, ...t.valueMatrix.supply },
    { icon: ShieldAlert, ...t.valueMatrix.error },
    { icon: Clock, ...t.valueMatrix.delivery }
  ];

  return (
    <section className="py-24 bg-background border-t border-border relative z-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-[0.15em]">{t.valueMatrix.label}</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 text-foreground">{t.valueMatrix.title}</h2>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {values.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={fadeUp}
              {...cardHover}
              className={`glass-card p-10 rounded-3xl group bg-card border border-border ${idx === 0 ? 'md:col-span-2' : 'md:col-span-1'}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
