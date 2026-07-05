import React from 'react';
import { Camera } from 'lucide-react';

interface ImagePlaceholderProps {
  prompt: string;
  className?: string;
  aspectRatio?: string;
}

export default function ImagePlaceholder({ prompt, className = '', aspectRatio = 'aspect-video' }: ImagePlaceholderProps) {
  return (
    <div className={`relative flex flex-col items-center justify-center bg-secondary/50 border border-border overflow-hidden group ${aspectRatio} ${className}`}>
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="relative z-10 flex flex-col items-center p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-4 shadow-sm border border-border text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all">
          <Camera className="w-5 h-5" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Nano Banana Prompt</span>
        <p className="text-sm font-mono text-muted-foreground max-w-md line-clamp-4 group-hover:line-clamp-none transition-all bg-background/80 backdrop-blur-sm p-3 rounded-lg border border-border">
          "{prompt}"
        </p>
      </div>
    </div>
  );
}
