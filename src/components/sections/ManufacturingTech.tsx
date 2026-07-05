'use client';

import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import { motion } from 'framer-motion';
import { Settings2, Zap, LayoutTemplate, PenTool, CheckCircle2 } from 'lucide-react';
import { fadeUp, staggerContainer, cardHover, imageReveal, viewportOnce, sectionReveal } from '@/lib/motion';
import Image from 'next/image';

export default function ManufacturingTech() {
  const { t } = useLocale();
  const icons = [Zap, LayoutTemplate, PenTool, Settings2, CheckCircle2];

  return (
    <motion.section 
      id="manufacturing" 
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="py-24 lg:py-32 bg-background relative border-y border-border"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row gap-16 items-start">
          
          {/* Scrolling Left Content */}
          <motion.div 
            variants={staggerContainer}
            className="lg:w-1/2 flex flex-col gap-6"
          >
            {t.manufacturing.techs.map((item, idx) => {
              const Icon = icons[idx] || Settings2;
              return (
                <motion.div 
                  key={idx}
                  variants={fadeUp}
                  whileHover={cardHover.whileHover}
                  whileTap={cardHover.whileTap}
                  className="bg-card p-8 rounded-2xl border border-border shadow-sm flex flex-col sm:flex-row gap-6 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Sticky Right Visual */}
          <motion.div 
            variants={fadeUp}
            className="lg:w-1/2 lg:sticky lg:top-32"
          >
            <div className="section-label mb-6 inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="uppercase tracking-widest text-sm font-bold">{t.manufacturing.label}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 leading-[1.1]">
              {t.manufacturing.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t.manufacturing.subtitle}
            </p>
            <motion.div variants={imageReveal} className="relative h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="/images/showcase_machines.png" 
                alt={t.manufacturing.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
