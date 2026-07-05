'use client';

import React, { useState } from 'react';
import { useLocale } from '@/context/LocaleContext';
import { motion, AnimatePresence } from 'framer-motion';
import { viewportOnce, imageReveal, sectionReveal, staggerFast } from '@/lib/motion';

import Image from 'next/image';

export default function Portfolio() {
  const { t } = useLocale();
  const p = t.portfolio;
  
  const [activeTab, setActiveTab] = useState(p.categories[0]);

  const images = [
    'portfolio_magnetic_box_1783290535703.png',
    'portfolio_telescopic_box_1783290546091.png',
    'portfolio_mailer_box_1783290555098.png',
    'portfolio_crash_lock_1783290570847.png',
    'portfolio_medical_box_1783290579670.png'
  ];

  const products = p.items.map((item, i) => ({ ...item, image: images[i] || 'placeholder.png' }));
  const filtered = products.filter(item => item.cat === activeTab);

  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={sectionReveal}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
        >
          <div>
            <div className="section-label mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {p.label}
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4 tracking-tight">
              {p.title}
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-2 p-1.5 bg-secondary/50 rounded-full border border-border/50 backdrop-blur-md">
            {p.categories.map((cat) => {
              const isActive = activeTab === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`relative px-6 py-3 rounded-full text-sm font-bold transition-colors ${
                    isActive ? 'text-background' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="portfolioTab"
                      className="absolute inset-0 bg-foreground rounded-full shadow-lg"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => (
              <motion.div
                key={item.title}
                layout
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                variants={staggerFast}
                transition={{ duration: 0.5 }}
                className={`group cursor-pointer relative ${idx === 0 ? 'lg:col-span-8' : 'lg:col-span-4'}`}
              >
                <motion.div variants={imageReveal} className="relative w-full h-[400px] lg:h-[600px] rounded-3xl overflow-hidden bg-secondary">
                  <Image
                    src={`/images/${item.image}`}
                    alt={item.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase mb-4 inline-block">
                      {item.cat}
                    </span>
                    <h3 className="text-2xl md:text-4xl font-bold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-white/80 text-sm md:text-base max-w-xl line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
