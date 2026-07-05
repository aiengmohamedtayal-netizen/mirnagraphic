'use client';

import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { fadeUp, viewportOnce } from '@/lib/motion';

export default function Certifications() {
  const { t } = useLocale();

  return (
    <section className="py-24 bg-secondary/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="section-label mx-auto mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {t.certifications.label}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t.certifications.title}
          </h2>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="glass-card p-12 flex flex-col items-center text-center group max-w-3xl mx-auto"
        >
          <div className="w-16 h-16 rounded-full bg-background border border-border text-gold flex items-center justify-center mb-6 shadow-inner transition-transform">
            <Award className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">{t.certifications.placeholder.name}</h3>
          <p className="text-muted-foreground text-sm mb-4">{t.certifications.placeholder.org}</p>
          <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest bg-accent px-3 py-1 rounded-full mb-2">
            {t.certifications.placeholder.number}
          </span>
          <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest bg-accent px-3 py-1 rounded-full">
            {t.certifications.placeholder.date}
          </span>
        </motion.div>

      </div>
    </section>
  );
}
