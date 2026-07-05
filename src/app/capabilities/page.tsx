import CapabilitiesSection from "@/components/sections/Capabilities";
import ManufacturingTech from "@/components/sections/ManufacturingTech";
import FactoryProcess from "@/components/sections/FactoryProcess";
import FactoryShowcase from "@/components/sections/FactoryShowcase";
import Certifications from "@/components/sections/Certifications";

export default function CapabilitiesPage() {
  return (
    <div className="pt-20">
      <CapabilitiesSection />
      <ManufacturingTech />
      <FactoryProcess />
      <FactoryShowcase />
      <Certifications />
    </div>
  );
}
