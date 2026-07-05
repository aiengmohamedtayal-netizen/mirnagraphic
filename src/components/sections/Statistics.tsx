'use client';

import React, { useEffect, useState } from 'react';
import { useLocale } from '@/context/LocaleContext';
import { motion, useInView } from 'framer-motion';
import { fadeUp, staggerContainer, statsCounter, viewportOnce } from '@/lib/motion';

export default function Statistics() {
  const { t } = useLocale();

  const stats = [
    { value: 9001, suffix: '', label: t.hero.trust.iso },
    { value: 20, suffix: '+', label: t.hero.trust.years },
    { value: 500, suffix: '+', label: t.hero.trust.clients }
  ];

  const Counter = ({ value, suffix }: { value: number, suffix: string }) => {
    const [count, setCount] = useState(0);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
      if (isInView) {
        let start = 0;
        const end = value;
        if (end === 0) return;
        
        const duration = 2000;
        let startTime: number | null = null;

        const animate = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 4);
          setCount(Math.floor(easeProgress * end));
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
      }
    }, [isInView, value]);

    return (
      <span ref={ref}>
        {count}{suffix}
      </span>
    );
  };

  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-center mb-16"
        >
           <h2 className="text-sm font-bold tracking-widest uppercase text-gold mb-2">{t.statistics.label}</h2>
           <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">{t.statistics.title}</h3>
           <p className="text-white/60">{t.statistics.placeholder}</p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              variants={statsCounter}
              className="flex flex-col items-center text-center p-8 bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10"
            >
              <h3 className="text-5xl md:text-7xl font-display font-bold text-white mb-4 drop-shadow-md">
                {stat.value === 0 ? `0${stat.suffix}` : <Counter value={stat.value} suffix={stat.suffix} />}
              </h3>
              <p className="text-sm uppercase tracking-widest text-gold font-bold">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
