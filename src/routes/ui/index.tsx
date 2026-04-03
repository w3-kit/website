import { createFileRoute } from "@tanstack/react-router";
import { UnderConstruction } from "../../shared/ui/under-construction";

export const Route = createFileRoute("/ui/")({
  component: () => (
    <UnderConstruction
      section="UI Library"
      description="Production-ready web3 components built with React, Radix UI, and Tailwind CSS. Copy-paste or install via the CLI."
      features={[
        "Wallet, DeFi, NFT, and infrastructure components",
        "Built on shadcn/ui patterns",
        "Dark mode, accessible, fully typed",
        "npx create-w3-kit to scaffold",
      ]}
    />
  ),
});
