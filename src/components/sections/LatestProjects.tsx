'use client';

import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { fadeUp, staggerContainer, viewportOnce, sectionReveal } from '@/lib/motion';
import Image from 'next/image';

export default function LatestProjects() {
  const { t, dir } = useLocale();
  const isAr = dir === 'rtl';
  const lp = t.latestProjects;

  const images = [
    'project_fashion.png',
    'project_medical.png',
    'project_food.png'
  ];

  const projects = lp.items.map((item, i) => ({ ...item, image: images[i] || 'placeholder.png' }));

  return (
    <section className="py-24 lg:py-32 bg-background relative border-t border-border overflow-hidden" id="projects">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={sectionReveal}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24"
        >
          <div>
            <div className="section-label mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {lp.label}
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
              {lp.title}
            </h2>
          </div>
          
          <button className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary text-foreground font-bold hover:bg-primary hover:text-primary-foreground transition-colors">
            {lp.viewAll}
            {isAr ? <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> : <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          </button>
        </motion.div>

        <div className="space-y-32">
          {projects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div 
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={staggerContainer}
                className={`flex flex-col gap-12 lg:gap-24 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                <motion.div variants={fadeUp} className="w-full lg:w-1/2">
                  <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl group">
                    <Image 
                      src={`/images/${project.image}`}
                      alt={project.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                </motion.div>
                
                <motion.div variants={fadeUp} className="w-full lg:w-1/2 space-y-6">
                  <span className="text-sm font-bold uppercase tracking-widest text-primary px-4 py-2 rounded-full bg-primary/10 inline-block">
                    {project.client}
                  </span>
                  <h3 className="text-3xl lg:text-5xl font-bold text-foreground leading-tight">
                    {project.title}
                  </h3>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
