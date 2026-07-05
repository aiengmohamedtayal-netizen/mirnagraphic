'use client';

import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '@/lib/motion';

export default function TrustedBy() {
  const { t } = useLocale();

  return (
    <section className="py-20 bg-background border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.p 
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-muted-foreground text-sm font-semibold uppercase tracking-[0.2em] mb-12"
        >
          {t.trustedBy.title}
        </motion.p>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="glass-card rounded-3xl py-12 px-6 border border-border border-dashed"
        >
          <div className="flex items-center justify-center gap-4 text-primary/60">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            <span className="font-mono text-sm tracking-widest uppercase">{t.trustedBy.placeholder}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
