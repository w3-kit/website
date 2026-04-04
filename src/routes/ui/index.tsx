import { createFileRoute } from "@tanstack/react-router";
import { UnderConstructionLayout } from "../../pages/under-construction";
import { UiAnimation } from "../../pages/under-construction/ui/ui-animation";

export const Route = createFileRoute("/ui/")({
  component: () => (
    <UnderConstructionLayout
      section="ui"
      title="UI Library"
      description="Production-ready web3 React components."
      animation={<UiAnimation />}
    />
  ),
});
