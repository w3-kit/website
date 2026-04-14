import { Terminal, LayoutTemplate, BookMarked, Component } from "lucide-react";
import { SectionContainer } from "../../../shared/ui/section-container";
import { useScrollReveal } from "../../../shared/lib/use-scroll-animation";
import { DeepDiveRow } from "./deep-dive-row";
import { CliVisual, TemplatesVisual, RecipesVisual, ComponentsVisual } from "./deep-dive-visuals";

const features = [
  {
    icon: <Terminal size={20} />,
    overline: "CLI",
    title: "Scaffold in Seconds",
    description:
      "One command sets up your project with the right chain configs, wallet providers, and component scaffolding. No boilerplate, no guesswork — just the code you need.",
    href: "https://docs.w3-kit.com/cli",
    linkLabel: "Learn about the CLI",
    visual: <CliVisual />,
  },
  {
    icon: <LayoutTemplate size={20} />,
    overline: "Templates",
    title: "Production-Ready Starters",
    description:
      "Pre-configured project templates for Next.js, Vite, and more. Each template comes wired with wallet connection, chain switching, and a clean component architecture.",
    href: "https://docs.w3-kit.com/templates",
    linkLabel: "Browse templates",
    visual: <TemplatesVisual />,
  },
  {
    icon: <BookMarked size={20} />,
    overline: "Recipes",
    title: "Learn by Building",
    description:
      "Step-by-step guides that solve real problems — from connecting a wallet to building a full token dashboard. Each recipe is a self-contained, copy-paste-ready pattern.",
    href: "https://docs.w3-kit.com/recipes",
    linkLabel: "Explore recipes",
    visual: <RecipesVisual />,
  },
  {
    icon: <Component size={20} />,
    overline: "UI Components",
    title: "Web3-Native Components",
    description:
      "Connect wallet buttons, chain selectors, token displays, address formatters, and more. Every component is typed, accessible, theme-aware, and works with any wallet provider.",
    href: "https://ui.w3-kit.com",
    linkLabel: "View components",
    visual: <ComponentsVisual />,
  },
];

export function DeepDiveSection() {
  const containerRef = useScrollReveal({ stagger: 0.2, y: 50, start: "top 80%" });

  return (
    <SectionContainer className="py-20 md:py-32 lg:py-40" id="features">
      <div ref={containerRef} className="flex flex-col gap-20 md:gap-28 lg:gap-36">
        {features.map((feature, i) => (
          <DeepDiveRow key={feature.overline} {...feature} reverse={i % 2 === 1} />
        ))}
      </div>
    </SectionContainer>
  );
}
