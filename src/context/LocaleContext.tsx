'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { dictionary, Locale } from '../i18n/dictionary';

type Dictionary = typeof dictionary.en;

interface LocaleContextProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
  dir: 'ltr' | 'rtl';
}

const LocaleContext = createContext<LocaleContextProps | undefined>(undefined);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>('en');

  // Load locale from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem('app_locale') as Locale;
    if (saved && (saved === 'en' || saved === 'ar')) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setLocale(saved);
    }
  }, []);

  // Sync locale to HTML attributes
  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = locale === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('app_locale', locale);
  }, [locale]);

  const t = dictionary[locale];
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
