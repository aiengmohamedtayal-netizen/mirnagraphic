import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import AboutMirna from '@/components/sections/AboutMirna';
import WhyChoose from '@/components/sections/WhyChoose';
import Capabilities from '@/components/sections/Capabilities';
import ManufacturingTech from '@/components/sections/ManufacturingTech';
import FactoryProcess from '@/components/sections/FactoryProcess';
import QualityControl from '@/components/sections/QualityControl';
import AssetLedger from '@/components/sections/AssetLedger';
import Portfolio from '@/components/sections/Portfolio';
import Statistics from '@/components/sections/Statistics';
import Certifications from '@/components/sections/Certifications';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import LatestProjects from '@/components/sections/LatestProjects';
import ContactPortal from '@/components/sections/ContactPortal';
import FactoryLocation from '@/components/sections/FactoryLocation';
import FinalCta from '@/components/sections/FinalCta';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      
      {/* Chapter 1: The Hook & Identity */}
      <div className="relative z-10">
        <Hero />
        <AboutMirna />
        <WhyChoose />
      </div>

      {/* Narrative Transition: Identity to Engineering */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Chapter 2: The Core Engine (Engineering & Capabilities) */}
      <div className="relative z-20">
        <Capabilities />
        <ManufacturingTech />
        <FactoryProcess />
      </div>

      {/* Chapter 3: Industrial Intelligence & Data */}
      <div className="relative z-30">
        <QualityControl />
        <AssetLedger />
        <Statistics />
      </div>

      {/* Narrative Transition: Data to Output */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Chapter 4: The Output & Luxury Portfolio */}
      <div className="relative z-40 bg-background">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/10 to-transparent pointer-events-none" />
        <Portfolio />
        <LatestProjects />
      </div>

      {/* Chapter 5: Market Proof & Trust */}
      <div className="relative z-50">
        <Testimonials />
        <Certifications />
        <FAQ />
      </div>

      {/* Chapter 6: Conversion & Real-World Presence */}
      <div className="relative z-60">
        <ContactPortal />
        <FactoryLocation />
        <FinalCta />
      </div>

    </main>
  );
}
