'use client';

import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import { motion } from 'framer-motion';
import { ShoppingBag, Pill, Shirt, Coffee, Shield, Sparkles } from 'lucide-react';
import { fadeUp, staggerContainer, cardHover, viewportOnce, sectionReveal } from '@/lib/motion';

export default function IndustriesServed() {
  const { t } = useLocale();

  const industriesData = [
    { icon: Coffee, title: t.industries.food, colSpan: 'md:col-span-2 lg:col-span-2', bg: 'bg-orange-500/10' },
    { icon: Pill, title: t.industries.pharma, colSpan: 'md:col-span-1 lg:col-span-1', bg: 'bg-blue-500/10' },
    { icon: Shirt, title: t.industries.textile, colSpan: 'md:col-span-1 lg:col-span-1', bg: 'bg-pink-500/10' },
    { icon: Sparkles, title: t.industries.cosmetics, colSpan: 'md:col-span-2 lg:col-span-1', bg: 'bg-purple-500/10' },
    { icon: ShoppingBag, title: t.industries.retail, colSpan: 'md:col-span-1 lg:col-span-2', bg: 'bg-emerald-500/10' },
    { icon: Shield, title: t.industries.export, colSpan: 'md:col-span-2 lg:col-span-3', bg: 'bg-primary/10' }
  ];

  return (
    <motion.section 
      id="industries" 
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="py-24 lg:py-32 bg-background relative border-y border-border"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row gap-16">
        
        <motion.div variants={fadeUp} className="lg:w-1/3 lg:sticky lg:top-32 self-start">
          <div className="section-label mb-6 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="uppercase tracking-widest text-sm font-bold">{t.industries.label}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
            {t.industries.title}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t.industries.subtitle}
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {industriesData.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={fadeUp}
              whileHover={cardHover.whileHover}
              whileTap={cardHover.whileTap}
              className={`glass-card p-8 rounded-3xl flex flex-col justify-between min-h-[240px] group ${item.colSpan}`}
            >
              <div className={`w-14 h-14 rounded-full ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mt-auto">{item.title}</h3>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
}
