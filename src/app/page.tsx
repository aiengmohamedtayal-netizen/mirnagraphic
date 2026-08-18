import Hero from '@/components/hero';
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
import { defaultSectionVisibility } from '@/lib/cms';
import { getHomeCmsContent, getPublishedProjects } from '@/lib/public-content';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [cmsContent, publishedProjects] = await Promise.all([getHomeCmsContent(), getPublishedProjects()]);
  const visible = { ...defaultSectionVisibility, ...(cmsContent?.sectionVisibility ?? {}) };

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <div className="relative z-10">
        <Hero content={cmsContent?.hero ? { title: cmsContent.hero.title, description: cmsContent.hero.description, eyebrow: cmsContent.hero.eyebrow, cta: cmsContent.cta } : undefined} />
        {visible.about && <AboutMirna />}
      </div>

      {visible.trust && <div className="relative z-20"><WhyChoose /><Testimonials /><Certifications /></div>}

      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {visible.capabilities && <div className="relative z-30"><Capabilities /></div>}
      {visible.manufacturing && <div className="relative z-30"><ManufacturingTech /></div>}

      {visible.technology && <div className="relative z-40"><FactoryProcess /><AssetLedger /></div>}

      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {visible.products && <div className="relative z-50"><Portfolio /></div>}
      {visible.industries && <div className="relative z-[55]"><IndustriesServed /></div>}
      {visible.factory && <div className="relative z-[60]"><FactoryShowcase /></div>}

      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {visible.quality && <div className="relative z-[65]"><QualityControl /><Statistics /></div>}

      {visible.projects && publishedProjects.length > 0 && <div className="relative z-[70] bg-background"><div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-secondary/10 to-transparent" /><LatestProjects projects={publishedProjects} /></div>}

      {visible.contact && <div className="relative z-[80]"><FAQ /><ContactPortal /><FactoryLocation /><FinalCta /></div>}
    </main>
  );
}
