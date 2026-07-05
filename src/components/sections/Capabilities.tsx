'use client';

import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import { motion } from 'framer-motion';
import { Gem, Box, ShieldCheck } from 'lucide-react';
import { fadeUp, staggerContainer, hoverScale, viewportOnce } from '@/lib/motion';

export default function Capabilities() {
  const { t } = useLocale();

  const caps = [
    { ...t.capabilities.luxury, icon: Gem, className: "md:col-span-2 bg-primary text-primary-foreground" },
    { ...t.capabilities.commercial, icon: Box, className: "md:col-span-1 glass-card" },
    { ...t.capabilities.industrial, icon: ShieldCheck, className: "md:col-span-3 glass-card" }
  ];

  return (
    <section id="capabilities" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/[0.03] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mb-16 max-w-2xl"
        >
          <div className="section-label mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {t.capabilities.label}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            {t.capabilities.title}
          </h2>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {caps.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={fadeUp}
              whileHover={hoverScale.whileHover}
              className={`p-8 rounded-3xl group flex flex-col justify-between ${item.className}`}
            >
              <div className="mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 mb-6 ${idx === 0 ? 'bg-white/20 text-white' : 'bg-accent text-primary'} group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${idx === 0 ? 'text-white' : 'text-foreground'}`}>{item.title}</h3>
                <p className={`leading-relaxed ${idx === 0 ? 'text-white/80' : 'text-muted-foreground'}`}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
