import "../../../shared/lib/gsap-plugins";

import { PageShell } from "../../../widgets/page-shell";
import { HeroSection } from "./hero-section";
import { BentoSection } from "./bento-section";
import { EcosystemMapSection } from "./ecosystem-map-section";
import { CtaSection } from "./cta-section";

export function LandingPage() {
  return (
    <PageShell section="landing" transparentHeader>
      <div className="relative">
        {/* Global background gradient layer */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          aria-hidden="true"
        >
          {/* Hero area — top */}
          <div
            className="absolute right-[-15%] top-[-5%] h-[700px] w-[700px] rounded-full blur-[160px]"
            style={{ background: "var(--w3-glow-accent)", opacity: 0.5 }}
          />
          <div
            className="absolute left-[-10%] top-[5%] h-[500px] w-[500px] rounded-full blur-[140px]"
            style={{ background: "var(--w3-accent-subtle)", opacity: 0.4 }}
          />
          {/* Bento area — ~30% */}
          <div
            className="absolute right-[-5%] top-[30%] h-[600px] w-[600px] rounded-full blur-[180px]"
            style={{ background: "var(--w3-glow-accent)", opacity: 0.3 }}
          />
          {/* Ecosystem area — ~55% */}
          <div
            className="absolute left-[-10%] top-[55%] h-[500px] w-[500px] rounded-full blur-[160px]"
            style={{ background: "var(--w3-accent-subtle)", opacity: 0.25 }}
          />
          {/* CTA area — bottom */}
          <div
            className="absolute bottom-[10%] left-[20%] h-[500px] w-[600px] rounded-full blur-[160px]"
            style={{ background: "var(--w3-glow-accent)", opacity: 0.4 }}
          />
          <div
            className="absolute bottom-0 right-[-10%] h-[400px] w-[400px] rounded-full blur-[140px]"
            style={{ background: "var(--w3-accent-subtle)", opacity: 0.3 }}
          />
        </div>

        <HeroSection />
        <BentoSection />
        <EcosystemMapSection />
        <CtaSection />
      </div>
    </PageShell>
  );
}
