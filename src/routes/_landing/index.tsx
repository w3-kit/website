import { createFileRoute } from "@tanstack/react-router";
import { UnderConstruction } from "../../shared/ui/under-construction";

export const Route = createFileRoute("/_landing/")({
  component: () => (
    <UnderConstruction
      section="Home"
      description="Open-source developer toolkit with production-ready components, recipes, and learning resources for every EVM chain."
      features={[
        "38 production-ready React components",
        "Recipes for common web3 patterns",
        "Interactive learning platform",
        "CLI for scaffolding projects",
      ]}
    />
  ),
});
