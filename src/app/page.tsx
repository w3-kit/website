import { HeroSection } from "@/components/landing/hero";
import { ComponentGallery } from "@/components/landing/component-gallery";
import { CodeExampleSection } from "@/components/landing/code-example";
import { FeaturesSection } from "@/components/landing/features";
import { BeforeAfterSection } from "@/components/landing/before-after";
import { StatsSection } from "@/components/landing/stats";
import { GettingStartedSection } from "@/components/landing/getting-started";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <HeroSection />
      <ComponentGallery />
      <CodeExampleSection />
      <FeaturesSection />
      <BeforeAfterSection />
      <StatsSection />
      <GettingStartedSection />
    </div>
  );
}
