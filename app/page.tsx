import Citation from "@/components/citation-section";
import HeroSection from "@/components/hero-section";
import Services from "@/components/services";
import Skills from "@/components/skills";
import Works from "@/components/works-section";
import PhotographySection from "@/components/PhotographySection";
import CertificationsSection from "@/components/certifications-section";

export default function Home() {
  return (
    <main>
      {/* Act I — The Entrance */}
      <HeroSection />

      {/* Act II — The Philosophy */}
      <div className="container">
        <Citation />
      </div>

      {/* Act III — The Craft */}
      <div className="container">
        <Services />
      </div>

      {/* Act IV — The Arsenal */}
      <div className="container">
        <Skills />
      </div>

      {/* Act V — The Showcase */}
      <div className="container">
        <Works />
      </div>

      {/* Act VI — Through My Lens */}
      <PhotographySection />

      {/* Act VII — Certifications */}
      <CertificationsSection />
    </main>
  );
}
