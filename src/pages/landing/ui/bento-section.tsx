import { SectionContainer } from "../../../shared/ui/section-container";
import { useScrollReveal } from "../../../shared/lib/use-scroll-animation";
import {
  ComponentsCell,
  RegistryCell,
  GetStartedCell,
  DocsCell,
  RecipesCell,
  OpenSourceCell,
} from "./bento-cells";

export function BentoSection() {
  const containerRef = useScrollReveal({ stagger: 0.08, start: "top 90%" });

  return (
    <SectionContainer className="relative z-20 -mt-24 md:-mt-32" id="whats-inside">
      <div ref={containerRef} className="grid gap-4 md:grid-cols-3">
        {/* Row 1: Components (large 2-col) + Registry (1-col) */}
        <div data-reveal className="md:col-span-2">
          <ComponentsCell />
        </div>
        <div data-reveal className="h-full">
          <RegistryCell />
        </div>

        {/* Row 2: Get Started (1-col) + Docs (2-col) */}
        <div data-reveal className="h-full">
          <GetStartedCell />
        </div>
        <div data-reveal className="md:col-span-2">
          <DocsCell />
        </div>

        {/* Row 3: Recipes (2-col) + Open Source (1-col) */}
        <div data-reveal className="md:col-span-2">
          <RecipesCell />
        </div>
        <div data-reveal className="h-full">
          <OpenSourceCell />
        </div>
      </div>
    </SectionContainer>
  );
}
