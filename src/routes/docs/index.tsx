import { createFileRoute } from "@tanstack/react-router";
import { UnderConstruction } from "../../shared/ui/under-construction";

export const Route = createFileRoute("/docs/")({
  component: () => (
    <UnderConstruction
      section="Documentation"
      description="Guides, recipes, and API reference for building web3 applications with w3-kit."
      features={[
        "Getting started guides",
        "Component API reference",
        "Recipe walkthroughs",
        "Chain-specific guides",
      ]}
    />
  ),
});
