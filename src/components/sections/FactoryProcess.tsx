'use client';

import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, timelineReveal, hoverLift, viewportOnce } from '@/lib/motion';

export default function FactoryProcess() {
  const { t, dir } = useLocale();

  const steps = [
    t.factoryProcess.step1,
    t.factoryProcess.step2,
    t.factoryProcess.step3,
    t.factoryProcess.step4,
    t.factoryProcess.step5
  ];

  return (
    <section className="py-24 lg:py-32 bg-secondary/30 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-center mb-24"
        >
          <div className="section-label mx-auto mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {t.factoryProcess.label}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            {t.factoryProcess.title}
          </h2>
        </motion.div>

        <div className="relative">
          {/* Animated Vertical Timeline Line */}
          <div className={`absolute top-0 bottom-0 w-1 bg-border ${dir === 'rtl' ? 'right-6 md:right-1/2 md:translate-x-1/2' : 'left-6 md:left-1/2 md:-translate-x-1/2'}`}>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={timelineReveal}
              className="w-full bg-gradient-to-b from-primary via-primary to-transparent" 
            />
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-12"
          >
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const isRtl = dir === 'rtl';

              return (
                <motion.div 
                  key={idx}
                  variants={fadeUp}
                  className={`relative flex items-center md:w-1/2 ${
                    isEven 
                      ? (isRtl ? 'md:self-end' : 'md:self-start md:text-right') 
                      : (isRtl ? 'md:self-start md:text-right' : 'md:self-end')
                  }`}
                >
                  {/* Node */}
                  <div className={`absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background border-[3px] border-primary flex items-center justify-center font-bold text-primary shadow-[0_0_15px_rgba(var(--primary),0.3)] z-10 ${
                    isRtl 
                      ? (isEven ? 'right-0 md:-left-5 translate-x-1/2 md:translate-x-0' : 'right-0 md:-right-5 translate-x-1/2 md:translate-x-0') 
                      : (isEven ? 'left-0 md:-right-5 -translate-x-1/2 md:translate-x-0' : 'left-0 md:-left-5 -translate-x-1/2 md:translate-x-0')
                  }`}>
                    {idx + 1}
                  </div>

                  {/* Content Card */}
                  <motion.div 
                    whileHover={hoverLift.whileHover}
                    className={`glass-card p-8 w-full ${
                      isRtl 
                        ? (isEven ? 'mr-16 md:mr-12 md:ml-0' : 'mr-16 md:mr-0 md:ml-12') 
                        : (isEven ? 'ml-16 md:ml-0 md:mr-12' : 'ml-16 md:ml-12 md:mr-0')
                    }`}
                  >
                    <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
