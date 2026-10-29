import { SiteShell } from "../../../widgets/site-chrome";
import { HeroSection } from "./hero-section";
import { StatesSection } from "./states-section";
import { RegistrySection } from "./registry-section";
import { WorkflowSection } from "./workflow-section";
import { StatsSection } from "./stats-section";

export function LandingPage() {
  return (
    <SiteShell section="landing">
      <HeroSection />
      <StatesSection />
      <RegistrySection />
      <WorkflowSection />
      <StatsSection />
    </SiteShell>
  );
}
