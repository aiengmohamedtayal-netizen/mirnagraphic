'use client';

import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, FolderOpen } from 'lucide-react';
import { fadeUp, staggerContainer, viewportOnce, sectionReveal } from '@/lib/motion';

type PublicProject = {
  id: string;
  name: { ar: string; en: string };
  excerpt: { ar?: string; en?: string } | null;
  industry: { ar?: string; en?: string } | null;
};

export default function LatestProjects({ projects }: { projects: PublicProject[] }) {
  const { t, dir } = useLocale();
  const isAr = dir === 'rtl';
  const lp = t.latestProjects;

  if (projects.length === 0) return null;

  return (
    <section className="relative overflow-hidden border-t border-border bg-background py-24 lg:py-32" id="projects">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionReveal} className="mb-20 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="section-label mb-6"><span className="h-1.5 w-1.5 rounded-full bg-primary" />{lp.label}</div>
            <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">{lp.title}</h2>
          </div>
          <button className="group inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 font-bold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground">{lp.viewAll}{isAr ? <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> : <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}</button>
        </motion.div>

        <div className="space-y-24 lg:space-y-32">
          {projects.map((project, idx) => {
            const title = project.name[isAr ? 'ar' : 'en'];
            const excerpt = project.excerpt?.[isAr ? 'ar' : 'en'];
            const industry = project.industry?.[isAr ? 'ar' : 'en'];
            const isEven = idx % 2 === 0;
            return (
              <motion.div key={project.id} initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer} className={`flex flex-col items-center gap-12 lg:gap-24 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                <motion.div variants={fadeUp} className="w-full lg:w-1/2">
                  <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0F4C81] via-[#0B718B] to-[#13B7A6] shadow-2xl">
                    <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-white/20" />
                    <div className="absolute -bottom-16 -left-10 h-56 w-56 rounded-full border border-white/15" />
                    <FolderOpen className="relative h-20 w-20 text-white/80" strokeWidth={1.2} aria-hidden="true" />
                  </div>
                </motion.div>
                <motion.div variants={fadeUp} className="w-full space-y-5 lg:w-1/2">
                  {industry && <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-bold uppercase tracking-widest text-primary">{industry}</span>}
                  <h3 className="text-3xl font-bold leading-tight text-foreground lg:text-5xl">{title}</h3>
                  {excerpt && <p className="max-w-xl text-base leading-8 text-muted-foreground">{excerpt}</p>}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
