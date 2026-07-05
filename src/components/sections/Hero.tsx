'use client';

import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowLeft, ChevronDown } from 'lucide-react';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { fadeUp, staggerContainer, buttonHover, heroReveal } from '@/lib/motion';

export default function Hero() {
  const { t, dir } = useLocale();
  const { scrollY } = useScroll();
  
  // Parallax calculations
  const yBg1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const yBg2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const yImage = useTransform(scrollY, [0, 1000], [0, 80]);

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center overflow-hidden bg-background pt-24 pb-16">
      {/* Ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ y: yBg1 }}
          animate={{ opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-primary/[0.06] blur-[100px]"
        />
        <motion.div
          style={{ y: yBg2 }}
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-60 -left-40 w-[600px] h-[600px] rounded-full bg-gold/[0.08] blur-[80px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">

          {/* Left: Copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className={`max-w-xl ${dir === 'rtl' ? 'lg:order-2' : ''}`}
          >
            <motion.div variants={fadeUp} className="section-label mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              {t.hero.label}
            </motion.div>

            <motion.h1 variants={heroReveal} className="text-hero-h1 text-foreground mb-6">
              {t.hero.h1}
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg">
              {t.hero.subtitle}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mb-12">
              <motion.div {...buttonHover}>
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-base shadow-lg transition-all"
                >
                  {t.hero.ctaQuote}
                  {dir === 'rtl' ? (
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  ) : (
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  )}
                </Link>
              </motion.div>
              <motion.div {...buttonHover}>
                <Link
                  href="#about"
                  className="inline-flex items-center justify-center px-8 py-4 bg-background border border-border/50 text-foreground rounded-xl font-semibold text-base hover:border-primary/40 hover:bg-secondary/50 shadow-sm transition-all"
                >
                  {t.hero.ctaExplore}
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-6 text-xs font-medium text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{t.hero.trust.iso}</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <span>{t.hero.trust.years}</span>
              <div className="w-px h-4 bg-border" />
              <span>{t.hero.trust.clients}</span>
            </motion.div>
          </motion.div>

          {/* Right: Factory Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 30, delay: 0.3 }}
            style={{ y: yImage }}
            className={`relative ${dir === 'rtl' ? 'lg:order-1' : ''}`}
          >
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="relative aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 ring-1 ring-border"
            >
              <Image
                src="/images/factory_hero.png"
                alt="Mirna Graphic Enterprise Factory"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/25 via-transparent to-transparent pointer-events-none" />


            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
