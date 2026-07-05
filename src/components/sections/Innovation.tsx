'use client';

import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import { motion } from 'framer-motion';
import { Beaker, Fingerprint } from 'lucide-react';
import { fadeUp, staggerContainer, viewportOnce, imageReveal } from '@/lib/motion';
import Image from 'next/image';

export default function Innovation() {
  const { t, dir } = useLocale();
  const isAr = dir === 'rtl';

  return (
    <section className="py-24 lg:py-32 bg-primary relative overflow-hidden text-primary-foreground">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            className={isAr ? 'lg:pl-8' : 'lg:pr-8'}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest mb-8 border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              {t.innovation.label}
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-white">
              {t.innovation.title}
            </h2>
            
            <p className="text-lg text-white/80 leading-relaxed mb-10">
              {t.innovation.desc}
            </p>

            <motion.div variants={staggerContainer} className="space-y-6">
              {[
                { icon: Beaker, ...t.innovation.ink },
                { icon: Fingerprint, ...t.innovation.smart }
              ].map((item, idx) => (
                <motion.div key={idx} variants={fadeUp} className="flex gap-4">
                  <div className="mt-1 w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-white/70 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={imageReveal}
            className="relative h-[600px] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl"
          >
            <Image
              src="/images/innovation_lab.png"
              alt={t.innovation.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
