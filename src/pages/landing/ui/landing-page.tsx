import { SiteHeader } from "../../../widgets/site-header";
import { SiteFooter } from "../../../widgets/site-footer";
import { HeroSection } from "./hero-section";
import { CatalogSection } from "./catalog-section";
import { ChainsSection } from "./chains-section";
import { RecipePreviewSection } from "./recipe-preview-section";
import { RecipesSection } from "./recipes-section";
import { StatsSection } from "./stats-section";
import { CtaSection } from "./cta-section";

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-w3-gray-100 text-w3-gray-900 antialiased">
      <SiteHeader currentSection="landing" />
      <main className="flex-1">
        <HeroSection />
        <CatalogSection />
        <ChainsSection />
        <RecipePreviewSection />
        <RecipesSection />
        <StatsSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
