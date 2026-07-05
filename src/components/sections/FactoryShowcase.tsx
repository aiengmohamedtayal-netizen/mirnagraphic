'use client';

import React, { useState } from 'react';
import { useLocale } from '@/context/LocaleContext';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, viewportOnce, sectionReveal, imageReveal } from '@/lib/motion';
import Image from 'next/image';

export default function FactoryShowcase() {
  const { t, dir } = useLocale();

  const [activeTab, setActiveTab] = useState('floor');

  const tabs = [
    { id: 'floor', label: t.showcase.tabs.floor, image: '/images/showcase_production.png' },
    { id: 'machines', label: t.showcase.tabs.machines, image: '/images/showcase_machines.png' },
    { id: 'warehouse', label: t.showcase.tabs.products, image: '/images/showcase_warehouse.png' },
    { id: 'team', label: t.showcase.tabs.samples, image: '/images/showcase_team.png' }
  ];

  return (
    <motion.section 
      id="showcase" 
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="py-24 lg:py-32 bg-secondary/30 relative"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.div variants={fadeUp} className="section-label mb-6 inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="uppercase tracking-widest text-sm font-bold">{t.showcase.label}</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-foreground mb-6">
              {t.showcase.title}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed mb-12">
              {t.showcase.subtitle}
            </motion.p>

            <div className="flex flex-col gap-4">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  variants={fadeUp}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-left px-6 py-4 rounded-2xl text-xl md:text-2xl font-bold transition-all duration-300 flex items-center justify-between group ${
                    activeTab === tab.id 
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]' 
                      : 'bg-transparent text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    activeTab === tab.id ? 'bg-white/20' : 'bg-transparent group-hover:bg-black/10 dark:group-hover:bg-white/10'
                  }`}>
                    {dir === 'rtl' ? '←' : '→'}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          <motion.div variants={imageReveal} className="lg:col-span-7 h-[500px] lg:h-[700px] w-full relative rounded-[2rem] overflow-hidden shadow-2xl bg-card border border-border">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image 
                  src={tabs.find(t => t.id === activeTab)?.image || '/images/showcase_production.png'}
                  alt={tabs.find(t => t.id === activeTab)?.label || 'Showcase Image'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  loading="lazy"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>

      </div>
    </motion.section>
  );
}
