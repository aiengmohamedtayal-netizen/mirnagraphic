"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import VideoFallback from "./VideoFallback";
import { useLocale } from "@/context/LocaleContext";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

function Scene3DLoader() {
  const { t } = useLocale();
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-100 rounded-3xl animate-pulse shadow-inner">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-sm font-medium text-primary tracking-widest uppercase">{t.hero.loading3d}</p>
    </div>
  );
}

// Lazy-load the R3F component using dynamic import with a premium skeleton
const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: Scene3DLoader,
});

export default function Hero({ forceFallback = false }: { forceFallback?: boolean }) {
  const { t } = useLocale();
  const [shouldUseFallback, setShouldUseFallback] = useState<boolean>(true); // default to true for SSR safety
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    if (forceFallback) {
      setShouldUseFallback(true);
      return;
    }

    // Sniff device capabilities
    const checkCapabilities = () => {
      setShouldUseFallback(false);
    };

    checkCapabilities();
    
    window.addEventListener("resize", checkCapabilities);
    return () => window.removeEventListener("resize", checkCapabilities);
  }, [forceFallback]);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-white flex items-center pt-24 pb-12 lg:py-0">
      
      {/* Background ambient glow behind 3D object */}
      <div className="absolute top-1/2 lg:right-0 lg:translate-x-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[100px] rounded-full pointer-events-none opacity-60 z-0"></div>

      <div className="container mx-auto px-6 relative z-10 w-full h-full flex items-center">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Text Content */}
          <div className="w-full md:w-1/2 lg:w-[40%] text-center md:text-left flex flex-col items-center md:items-start z-20">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-neutral-900 mb-6 tracking-tight leading-tight slide-up">
              {t.hero.h1}
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 max-w-xl mb-10 slide-up" style={{ animationDelay: '100ms' }}>
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 w-full sm:w-auto fade-in" style={{ animationDelay: '200ms' }}>
              <a
                href="#capabilities"
                className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {t.hero.ctaPrimary}
              </a>
              <a
                href="#manufacturing"
                className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-lg bg-white border border-neutral-200 px-6 text-sm font-medium text-neutral-900 transition-all hover:bg-neutral-50 hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>
          </div>

          {/* 3D Scene */}
          <div className="w-full md:w-1/2 lg:w-[60%] h-[50vh] md:h-[60vh] lg:h-[80vh] relative z-10 perspective-1000">
            {renderHeroVisual()}
          </div>
          
        </div>
      </div>
    </section>
  );

  function renderHeroVisual() {
    if (!isClient) {
      return <div className="w-full h-full bg-neutral-100 rounded-3xl animate-pulse" />;
    }
    
    if (shouldUseFallback) {
      return (
        <div className="w-full h-full rounded-3xl overflow-hidden shadow-xl">
          <VideoFallback />
        </div>
      );
    }

    return (
      <ErrorBoundary fallback={
        <div className="w-full h-full rounded-3xl overflow-hidden shadow-xl">
          <VideoFallback />
        </div>
      }>
        <Scene3D />
      </ErrorBoundary>
    );
  }
}
