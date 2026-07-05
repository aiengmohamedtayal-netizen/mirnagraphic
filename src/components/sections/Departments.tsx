'use client';

import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import { fadeUp, viewportOnce } from '@/lib/motion';

export default function Departments() {
  const { t } = useLocale();

  return (
    <section id="departments" className="py-32 bg-background relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <div className="section-label mx-auto mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {t.departments.label}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">{t.departments.title}</h2>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="glass-card p-12 rounded-3xl flex flex-col items-center justify-center text-center max-w-3xl mx-auto border border-dashed border-border"
        >
          <Building2 className="w-12 h-12 text-muted-foreground/50 mb-6" />
          <h3 className="text-xl font-medium text-muted-foreground">{t.departments.placeholder}</h3>
        </motion.div>
      </div>
    </section>
  );
}
