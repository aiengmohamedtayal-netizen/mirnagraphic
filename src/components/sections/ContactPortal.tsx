'use client';

import React, { useState } from 'react';
import { useLocale } from '@/context/LocaleContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, Clock, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { fadeUp, staggerContainer, viewportOnce, buttonHover, sectionReveal } from '@/lib/motion';

export default function ContactPortal() {
  const { t, dir } = useLocale();
  const isAr = dir === 'rtl';
  const c = t.contact;
  
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => setFormState('idle'), 5000);
    }, 1500);
  };

  const icons = [Phone, Mail, Clock];
  const infoData = c.info.map((item, i) => ({ ...item, icon: icons[i] }));

  return (
    <section id="contact" className="py-24 lg:py-32 bg-foreground relative text-background overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-foreground to-foreground opacity-50" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <div className="grid lg:grid-cols-5 gap-16 lg:gap-24">
          
          {/* Left: Info */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="lg:col-span-2 flex flex-col justify-center"
          >
            <motion.div variants={fadeUp} className="section-label mb-6 bg-white/10 text-white border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              {c.label}
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {c.title}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-300 leading-relaxed mb-12">
              {c.subtitle}
            </motion.p>

            <motion.div variants={staggerContainer} className="flex flex-col gap-8">
              {infoData.map((info, idx) => (
                <motion.div 
                  key={idx} 
                  variants={fadeUp}
                  whileHover={{ x: isAr ? -10 : 10 }}
                  className="flex items-start gap-6 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gold/20 group-hover:border-gold/30 transition-all">
                    <info.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1 text-lg">{info.title}</h4>
                    <p className="text-slate-400 whitespace-pre-line leading-relaxed">{info.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={sectionReveal}
            className="lg:col-span-3"
          >
            <div className="bg-background text-foreground p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden">
              <AnimatePresence>
                {formState === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-background z-20"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2, bounce: 0.5 }}
                      className="w-24 h-24 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mb-8"
                    >
                      <CheckCircle2 className="w-12 h-12" />
                    </motion.div>
                    <h3 className="text-3xl font-bold mb-4">{c.successTitle}</h3>
                    <p className="text-muted-foreground text-lg">{c.successDesc}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form className={`space-y-8 transition-opacity duration-500 ${formState === 'loading' ? 'opacity-50 pointer-events-none' : ''}`} onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-3 group">
                    <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider group-focus-within:text-primary transition-colors">{c.fields.name}</label>
                    <input required type="text" className="form-input w-full bg-secondary/50 border-0 border-b-2 border-border focus:border-primary focus:ring-0 px-4 py-3 rounded-t-xl transition-all" placeholder={c.placeholder.name} />
                  </div>
                  <div className="space-y-3 group">
                    <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider group-focus-within:text-primary transition-colors">{c.fields.company}</label>
                    <input required type="text" className="form-input w-full bg-secondary/50 border-0 border-b-2 border-border focus:border-primary focus:ring-0 px-4 py-3 rounded-t-xl transition-all" placeholder={c.placeholder.company} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-3 group">
                    <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider group-focus-within:text-primary transition-colors">{c.fields.email}</label>
                    <input required type="email" className="form-input w-full bg-secondary/50 border-0 border-b-2 border-border focus:border-primary focus:ring-0 px-4 py-3 rounded-t-xl transition-all" placeholder={c.placeholder.email} />
                  </div>
                  <div className="space-y-3 group">
                    <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider group-focus-within:text-primary transition-colors">{c.fields.phone}</label>
                    <input required type="tel" className="form-input w-full bg-secondary/50 border-0 border-b-2 border-border focus:border-primary focus:ring-0 px-4 py-3 rounded-t-xl transition-all text-left" placeholder={c.placeholder.phone} dir="ltr" />
                  </div>
                </div>

                <div className="space-y-3 group">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider group-focus-within:text-primary transition-colors">{c.fields.type}</label>
                  <select className="form-input w-full bg-secondary/50 border-0 border-b-2 border-border focus:border-primary focus:ring-0 px-4 py-3 rounded-t-xl transition-all appearance-none cursor-pointer">
                    <option value="rigid">{c.options.rigid}</option>
                    <option value="fmcg">{c.options.fmcg}</option>
                    <option value="shipping">{c.options.shipping}</option>
                    <option value="custom">{c.options.custom}</option>
                  </select>
                </div>

                <div className="space-y-3 group">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider group-focus-within:text-primary transition-colors">{c.fields.details}</label>
                  <textarea 
                    required
                    className="form-input w-full min-h-[150px] resize-y bg-secondary/50 border-0 border-b-2 border-border focus:border-primary focus:ring-0 px-4 py-3 rounded-t-xl transition-all" 
                    placeholder={c.placeholder.details}
                  />
                </div>

                <motion.button 
                  variants={buttonHover}
                  whileHover="whileHover"
                  whileTap="whileTap"
                  disabled={formState === 'loading'}
                  className="w-full py-5 bg-primary text-primary-foreground rounded-xl font-bold text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-3 relative overflow-hidden group"
                >
                  {formState === 'loading' ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <svg className="w-6 h-6 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    </motion.div>
                  ) : (
                    <>
                      <span>{c.submit}</span>
                      {isAr ? <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> : <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                    </>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000" />
                </motion.button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
