import { SiteHeader } from "../../../widgets/site-header";
import { SiteFooter } from "../../../widgets/site-footer";
import { HeroSection } from "./hero-section";
import { StatesSection } from "./states-section";
import { RegistrySection } from "./registry-section";
import { WorkflowSection } from "./workflow-section";
import { StatsSection } from "./stats-section";

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-w3-ground text-w3-ink antialiased">
      <SiteHeader currentSection="landing" />
      <main className="flex-1">
        <HeroSection />
        <StatesSection />
        <RegistrySection />
        <WorkflowSection />
        <StatsSection />
      </main>
      <SiteFooter currentSection="landing" />
    </div>
  );
}
