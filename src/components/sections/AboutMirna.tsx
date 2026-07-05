'use client';

import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import { motion } from 'framer-motion';
import { Target, Lightbulb, History } from 'lucide-react';
import { fadeUp, staggerContainer, sectionReveal, imageReveal, viewportOnce } from '@/lib/motion';
import Image from 'next/image';

export default function AboutMirna() {
  const { t, dir } = useLocale();

  return (
    <motion.section 
      id="about" 
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="py-24 lg:py-32 relative bg-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: True Editorial Split Layout */}
          <motion.div 
            variants={staggerContainer}
            className={`lg:col-span-5 lg:sticky lg:top-32 ${dir === 'rtl' ? 'lg:pl-8' : 'lg:pr-8'}`}
          >
            <motion.div variants={fadeUp} className="section-label mb-8 inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="uppercase tracking-widest text-sm font-bold">{t.about.label}</span>
            </motion.div>
            
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-6xl font-black text-foreground mb-8 leading-[1.1]">
              {t.about.title}
            </motion.h2>

            <motion.div variants={imageReveal} className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl mt-12 block lg:hidden">
              <Image
                src="/images/factory_about.png"
                alt={t.about.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </motion.div>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="lg:col-span-7 flex flex-col gap-10"
          >
            <motion.div variants={fadeUp} className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed mb-6 border-l-4 border-primary pl-6">
                {t.about.story}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {t.about.mission}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.about.vision}
              </p>
            </motion.div>

            <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 gap-6 mt-8">
              {[
                { icon: Target, title: t.about.metrics.missionTitle, desc: t.about.metrics.missionDesc },
                { icon: Lightbulb, title: t.about.metrics.visionTitle, desc: t.about.metrics.visionDesc },
                { icon: History, title: t.about.metrics.historyTitle, desc: t.about.metrics.historyDesc, colSpan: 'sm:col-span-2' }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  variants={fadeUp}
                  className={`glass-card p-8 border-l-2 border-l-primary/50 ${item.colSpan || ''}`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-accent text-primary flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-bold text-foreground">{item.title}</h4>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={imageReveal} className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl mt-8 hidden lg:block">
              <Image
                src="/images/factory_about.png"
                alt={t.about.title}
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
