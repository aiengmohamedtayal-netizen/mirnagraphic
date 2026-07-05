'use client';

import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { fadeUp, staggerContainer, viewportOnce, cardHover } from '@/lib/motion';

export default function Testimonials() {
  const { t } = useLocale();

  const reviews = Array(3).fill({
    quote: t.testimonials.placeholder.quote,
    name: t.testimonials.placeholder.client,
    company: t.testimonials.placeholder.company
  });

  return (
    <section className="py-24 lg:py-32 bg-background relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="section-label mb-6 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="uppercase tracking-widest text-sm font-semibold">{t.testimonials.label}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            {t.testimonials.title}
          </h2>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid lg:grid-cols-3 gap-6"
        >
          {reviews.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={fadeUp}
              {...cardHover}
              className="glass-card p-10 flex flex-col justify-between rounded-3xl"
            >
              <div>
                <Quote className="w-10 h-10 text-primary/20 mb-6 rotate-180" />
                <p className="text-lg text-foreground font-medium leading-relaxed mb-8 italic">
                  "{item.quote}"
                </p>
              </div>
              <div className="border-t border-border pt-6">
                <p className="font-bold text-primary mb-1">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.company}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
