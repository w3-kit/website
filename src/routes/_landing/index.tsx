import { createFileRoute } from "@tanstack/react-router";
import { UnderConstructionLayout } from "../../pages/under-construction";
import { LandingAnimation } from "../../pages/under-construction/ui/landing-animation";

export const Route = createFileRoute("/_landing/")({
  component: () => (
    <UnderConstructionLayout
      section="landing"
      title="w3-kit"
      description="Open-source web3 developer toolkit."
      animation={<LandingAnimation />}
    />
  ),
});
