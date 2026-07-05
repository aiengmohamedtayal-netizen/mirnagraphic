'use client';

import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '@/lib/motion';

export default function FactoryLocation() {
  const { t } = useLocale();

  return (
    <section className="py-24 bg-background relative border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            className="max-w-2xl"
          >
            <div className="section-label mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {t.factoryLocation.label}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              {t.factoryLocation.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.factoryLocation.placeholder}
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109156.40114092497!2d31.104278456209592!3d30.96918884631336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7a783da86cdd1%3A0xbdc6f448c48a60de!2sEl%20Mahalla%20El%20Kubra%2C%20Gharbia%20Governorate%2C%20Egypt!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'grayscale(1) contrast(1.2) opacity(0.8)' }} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/10 rounded-3xl" />
        </motion.div>

      </div>
    </section>
  );
}
