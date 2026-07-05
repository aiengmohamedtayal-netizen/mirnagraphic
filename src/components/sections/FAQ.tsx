'use client';

import React, { useState } from 'react';
import { useLocale } from '@/context/LocaleContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { fadeUp, staggerContainer, accordionContent, viewportOnce } from '@/lib/motion';

export default function FAQ() {
  const { t } = useLocale();

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    t.faq.q1,
    t.faq.q2,
    t.faq.q3,
    t.faq.q4
  ];

  return (
    <section className="py-24 lg:py-32 bg-secondary/30 relative">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <div className="section-label mb-6 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="uppercase tracking-widest text-sm font-semibold">{t.faq.label}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            {t.faq.title}
          </h2>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="space-y-4"
        >
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div 
                key={idx}
                variants={fadeUp}
                className="bg-background rounded-2xl border border-border overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-primary' : 'text-foreground'}`}>
                    {faq.q}
                  </span>
                  <motion.div 
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-secondary/50 text-muted-foreground"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      variants={accordionContent}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                    >
                      <div className="px-6 pb-6 text-muted-foreground leading-relaxed pt-2">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
