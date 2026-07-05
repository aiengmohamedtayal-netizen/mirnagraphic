'use client';

import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import { motion } from 'framer-motion';
import { Database, Shield, Box } from 'lucide-react';
import { fadeUp, staggerContainer, viewportOnce, imageReveal } from '@/lib/motion';
import Image from 'next/image';

export default function AssetLedger() {
  const { t, dir } = useLocale();
  const isAr = dir === 'rtl';

  const features = [
    { icon: Database, ...t.assetLedger.subcoding },
    { icon: Shield, ...t.assetLedger.integration },
    { icon: Box, ...t.assetLedger.maintenance }
  ];

  return (
    <section className="py-24 lg:py-32 bg-secondary/30 relative border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            className={isAr ? 'lg:pl-8' : 'lg:pr-8'}
          >
            <div className="section-label mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {t.assetLedger.label}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              {t.assetLedger.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t.assetLedger.howItWorks}
            </p>

            <motion.div variants={staggerContainer} className="space-y-6">
              {features.map((item, idx) => (
                <motion.div key={idx} variants={fadeUp} className="flex gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center shrink-0 shadow-sm text-primary">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
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
            className="relative h-[600px] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-border"
          >
            <Image
              src="/images/asset_dashboard.png"
              alt={t.assetLedger.title}
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
