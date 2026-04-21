import { LandingNav } from "./landing-nav";
import { HeroSection } from "./hero-section";
import { CatalogSection } from "./catalog-section";
import { ChainsSection } from "./chains-section";
import { CompareSection } from "./compare-section";
import { RecipesSection } from "./recipes-section";
import { StatsSection } from "./stats-section";
import { CtaSection } from "./cta-section";
import { LandingFooter } from "./landing-footer";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-w3-gray-100 text-w3-gray-900 antialiased">
      <LandingNav />
      <HeroSection />
      <CatalogSection />
      <ChainsSection />
      <CompareSection />
      <RecipesSection />
      <StatsSection />
      <CtaSection />
      <LandingFooter />
    </div>
  );
}
