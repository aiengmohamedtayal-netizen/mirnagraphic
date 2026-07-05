'use client';

import React, { useState, useEffect } from 'react';
import { useLocale } from '@/context/LocaleContext';
import { 
  Menu, X, Globe, House, Building2, Factory, 
  Package, BriefcaseBusiness, Images, ShieldCheck, 
  FolderKanban, PhoneCall, FileText 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'next-view-transitions';
import Image from 'next/image';

export default function Navbar() {
  const { locale, setLocale, dir, t } = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const isAr = dir === 'rtl';

  const navLinks = [
    { id: 'home', title: t.nav.home, icon: House, href: '#home' },
    { id: 'about', title: t.nav.about, icon: Building2, href: '#about' },
    { id: 'manufacturing', title: t.nav.manufacturing, icon: Factory, href: '#manufacturing' },
    { id: 'products', title: t.nav.products, icon: Package, href: '#products' },
    { id: 'industries', title: t.nav.industries, icon: BriefcaseBusiness, href: '#industries' },
    { id: 'showcase', title: t.nav.gallery, icon: Images, href: '#showcase' },
    { id: 'quality', title: t.nav.quality, icon: ShieldCheck, href: '#quality' },
    { id: 'projects', title: t.nav.projects, icon: FolderKanban, href: '#projects' },
    { id: 'contact', title: t.nav.contact, icon: PhoneCall, href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Hide/reveal logic
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Determine active section
      const sections = navLinks.map(link => link.id);
      let currentSection = 'home';
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, navLinks]);

  const toggleLanguage = () => setLocale(locale === 'en' ? 'ar' : 'en');

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setMobileOpen(false);
      }
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'glass shadow-sm py-2' : 'bg-transparent py-4'
        }`}
        dir={dir}
      >
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <motion.div
                whileHover={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 0.5 }}
                className={`relative transition-all duration-500 ${isScrolled ? 'w-9 h-9' : 'w-11 h-11'}`}
              >
                <Image src="/logo.png" alt="Mirna Graphic" fill className="object-contain" priority />
              </motion.div>
              <span className={`font-bold tracking-tight font-display text-foreground hidden sm:block transition-all duration-500 ${isScrolled ? 'text-lg' : 'text-xl'}`}>
                Mirna<span className="text-primary">Graphic</span>
              </span>
            </Link>

            {/* Desktop Links - Scrollable horizontally if needed */}
            <div className="hidden xl:flex items-center justify-center flex-1 mx-8 overflow-hidden">
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-2">
                {navLinks.map(({ id, title, icon: Icon, href }) => {
                  const isActive = activeSection === id;
                  return (
                    <a
                      key={id}
                      href={href}
                      onClick={(e) => scrollToSection(e, href)}
                      className={`relative px-3 py-2 flex items-center gap-2 rounded-lg text-sm font-semibold transition-all duration-300 group whitespace-nowrap
                        ${isActive ? 'text-primary bg-primary/5' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'}
                      `}
                    >
                      <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`} />
                      {title}
                      {isActive && (
                        <motion.span 
                          layoutId="navIndicator"
                          className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-t-full"
                        />
                      )}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground bg-secondary px-3.5 py-2.5 rounded-lg border border-border transition-colors shadow-sm"
                aria-label="Toggle language"
              >
                <Globe className="w-4 h-4" />
                {locale === 'en' ? 'العربية' : 'English'}
              </motion.button>

              <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-bold shadow-sm shadow-primary/15 hover:shadow-md hover:shadow-primary/20 transition-all"
                >
                  <FileText className="w-4 h-4" />
                  {t.nav.quote}
                </Link>
              </motion.div>
            </div>

            {/* Mobile toggle */}
            <div className="flex xl:hidden items-center gap-3 shrink-0">
              <button
                onClick={toggleLanguage}
                className="p-2 rounded-lg text-muted-foreground bg-secondary hover:text-foreground transition-colors"
              >
                <Globe className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
            
          </div>
        </div>
      </motion.nav>

      {/* Mobile Sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm xl:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? -320 : 320 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir === 'rtl' ? -320 : 320 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`fixed top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-[300px] h-full z-50 bg-card border-x border-border shadow-2xl xl:hidden overflow-y-auto`}
              dir={dir}
            >
              <div className="flex flex-col pt-24 px-6 gap-2 pb-10">
                {navLinks.map(({ id, title, icon: Icon, href }) => {
                  const isActive = activeSection === id;
                  return (
                    <a
                      key={id}
                      href={href}
                      onClick={(e) => scrollToSection(e, href)}
                      className={`flex items-center gap-3 py-3.5 px-4 text-base font-bold rounded-xl transition-all
                        ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}
                      `}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                      {title}
                    </a>
                  );
                })}

                <div className="border-t border-border my-6" />

                <Link
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-xl text-base font-bold shadow-sm"
                >
                  <FileText className="w-5 h-5" />
                  {t.nav.quote}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
