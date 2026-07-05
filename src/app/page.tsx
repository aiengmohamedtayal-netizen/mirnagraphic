import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import AboutMirna from '@/components/sections/AboutMirna';
import WhyChoose from '@/components/sections/WhyChoose';
import Testimonials from '@/components/sections/Testimonials';
import Certifications from '@/components/sections/Certifications';
import Capabilities from '@/components/sections/Capabilities';
import ManufacturingTech from '@/components/sections/ManufacturingTech';
import FactoryProcess from '@/components/sections/FactoryProcess';
import AssetLedger from '@/components/sections/AssetLedger';
import Portfolio from '@/components/sections/Portfolio';
import IndustriesServed from '@/components/sections/IndustriesServed';
import FactoryShowcase from '@/components/sections/FactoryShowcase';
import QualityControl from '@/components/sections/QualityControl';
import Statistics from '@/components/sections/Statistics';
import LatestProjects from '@/components/sections/LatestProjects';
import FAQ from '@/components/sections/FAQ';
import ContactPortal from '@/components/sections/ContactPortal';
import FactoryLocation from '@/components/sections/FactoryLocation';
import FinalCta from '@/components/sections/FinalCta';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      
      {/* 1. Identity */}
      <div className="relative z-10">
        <Hero />
        <AboutMirna />
      </div>

      {/* 2. Trust */}
      <div className="relative z-20">
        <WhyChoose />
        <Testimonials />
        <Certifications />
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* 3. Manufacturing */}
      <div className="relative z-30">
        <Capabilities />
        <ManufacturingTech />
      </div>

      {/* 4. Technology */}
      <div className="relative z-40">
        <FactoryProcess />
        <AssetLedger />
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* 5. Products */}
      <div className="relative z-50">
        <Portfolio />
      </div>

      {/* 6. Industries */}
      <div className="relative z-[55]">
        <IndustriesServed />
      </div>

      {/* 7. Factory */}
      <div className="relative z-60">
        <FactoryShowcase />
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* 8. Quality */}
      <div className="relative z-[65]">
        <QualityControl />
        <Statistics />
      </div>

      {/* 9. Projects */}
      <div className="relative z-70 bg-background">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/10 to-transparent pointer-events-none" />
        <LatestProjects />
      </div>

      {/* 10. Contact */}
      <div className="relative z-[80]">
        <FAQ />
        <ContactPortal />
        <FactoryLocation />
        <FinalCta />
      </div>

    </main>
  );
}
