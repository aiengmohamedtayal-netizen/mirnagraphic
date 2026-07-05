'use client';

import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import { MapPin, Phone, Mail } from 'lucide-react';
import { buttonHover } from '@/lib/motion';
import { motion } from 'framer-motion';

export default function LocationFooter() {
  const { t, dir } = useLocale();

  return (
    <footer className="bg-foreground text-background pt-24 pb-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4">
            <h3 className="text-2xl font-display font-bold text-white mb-6">Mirna<span className="text-gold">Graphic</span></h3>
            <p className="text-slate-400 leading-relaxed mb-8 max-w-sm">
              {t.footer.desc}
            </p>
            <div className="flex gap-4">
              {['LinkedIn', 'Facebook', 'Instagram'].map((network, idx) => (
                <a key={idx} href="#" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">
                  {network}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6">{t.footer.quickLinks}</h4>
            <ul className="space-y-4">
              {[t.nav.home, t.nav.about, t.nav.manufacturing, t.nav.projects, t.nav.contact].map((link, idx) => (
                <li key={idx}>
                  <a href="#" className="text-slate-400 hover:text-gold transition-colors text-sm">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-6">{t.contact.label}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin className="w-5 h-5 text-gold shrink-0" />
                <span>{dir === 'rtl' ? 'المحلة الكبرى، المنطقة الصناعية، مصر' : 'Industrial Zone, El Mahalla El Kubra, Egypt'}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <span dir="ltr">+20 10 1234 5678</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <span>info@mirnagraphic.com</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-6">{dir === 'rtl' ? 'النشرة البريدية' : 'Newsletter'}</h4>
            <p className="text-sm text-slate-400 mb-4">
              {dir === 'rtl' ? 'اشترك ليصلك أحدث الأخبار.' : 'Subscribe for the latest updates.'}
            </p>
            <form className="flex gap-2">
              <input type="email" placeholder={dir === 'rtl' ? 'البريد الإلكتروني' : 'Email Address'} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-gold" />
              <motion.button {...buttonHover} className="bg-gold text-foreground px-4 py-2 rounded-lg text-sm font-bold hover:bg-white transition-colors">
                {dir === 'rtl' ? 'اشترك' : 'Join'}
              </motion.button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            {t.footer.rights}
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a>
            <a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
