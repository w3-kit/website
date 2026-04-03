import { createFileRoute } from "@tanstack/react-router";
import { UnderConstruction } from "../../shared/ui/under-construction";

export const Route = createFileRoute("/_landing/")({
  component: () => (
    <UnderConstruction
      section="Home"
      description="Open-source web3 developer toolkit."
      showSubdomains
    />
  ),
});
