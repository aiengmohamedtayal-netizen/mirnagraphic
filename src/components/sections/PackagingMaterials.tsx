'use client';

import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';
import { fadeUp, viewportOnce } from '@/lib/motion';

export default function PackagingMaterials() {
  const { t } = useLocale();

  return (
    <section className="py-24 lg:py-32 bg-secondary/30 relative border-y border-border">
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
            {t.packagingMaterials.label}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            {t.packagingMaterials.title}
          </h2>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="glass-card p-12 rounded-3xl flex flex-col items-center justify-center text-center max-w-3xl mx-auto border border-dashed border-border"
        >
          <Layers className="w-12 h-12 text-muted-foreground/50 mb-6" />
          <h3 className="text-xl font-medium text-muted-foreground">{t.packagingMaterials.placeholder}</h3>
        </motion.div>

      </div>
    </section>
  );
}
