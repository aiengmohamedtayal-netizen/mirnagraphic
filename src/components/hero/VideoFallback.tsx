"use client";

import React, { useEffect, useRef, useState } from "react";

export default function VideoFallback() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener("change", listener);

    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (reduceMotion) {
        videoRef.current.pause();
      } else {
        // We use a catch block because browsers may block autoplay until interaction
        videoRef.current.play().catch(() => {
          // Autoplay was blocked
        });
      }
    }
  }, [reduceMotion]);

  return (
    <div className="w-full h-full bg-[#0B0F19] flex items-center justify-center">
      <video
        ref={videoRef}
        className="w-full h-full object-cover opacity-60 mix-blend-screen"
        poster="/images/hero-poster.jpg"
        loop
        muted
        playsInline
      >
        <source src="/videos/hero-fallback.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
