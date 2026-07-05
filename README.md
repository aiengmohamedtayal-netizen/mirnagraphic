# Mirna Graphic - Enterprise Packaging Platform

## Overview
Mirna Graphic is a premium, enterprise-grade B2B packaging manufacturing platform. Located in El Mahalla El Kubra, Egypt, we specialize in high-fidelity precision structural layouts for global supply chains. This repository contains the source code for our modern web application, built with a focus on immersive storytelling, cinematic motion, and uncompromising performance.

## Features
- **Awwwards-Tier Design**: Cinematic scroll storytelling, premium typography, and bespoke layouts.
- **Continuous Narrative**: Fully choreographed framer-motion transitions connecting each chapter.
- **I18N Architecture**: 100% dictionary-based localization (English/Arabic) managed seamlessly through React Context.
- **High Performance**: Strict adherence to Core Web Vitals (LCP < 1.5s, INP < 200ms) with optimized Next.js Image handling.
- **Immersive Interactions**: Advanced physics-based hover states, sticky scrolling, and staggered timeline reveals.
- **Premium Components**: Interactive data dashboards, cinematic galleries, and seamless tab transitions.

## Technology Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Typography**: Inter (Latin) & Thmanyah Sans (Arabic)
- **Deployment**: Vercel-ready

## Folder Structure
```
src/
├── app/                  # Next.js App Router (page, layout, globals.css)
├── components/
│   ├── layout/           # Shared layout components (Navbar, Footer)
│   ├── sections/         # Feature-specific narrative chapters
│   └── ui/               # Reusable UI elements (Reading Progress)
├── context/              # Global state (LocaleContext)
├── i18n/                 # Localization dictionary
└── lib/                  # Utilities (Motion tokens)
```

## Installation & Development

### Prerequisites
- Node.js 18+
- npm or pnpm

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/aiengmohamedtayal-netizen/mirnagraphic.git
   cd mirnagraphic
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build & Deployment

To create a production-optimized build:
```bash
npm run build
```

To test the production build locally:
```bash
npm run start
```

## License
© 2026 Mirna Graphic. All rights reserved.

## Author
Mohamed Tayal
