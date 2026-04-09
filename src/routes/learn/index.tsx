import { createFileRoute } from "@tanstack/react-router";
import { UnderConstructionLayout } from "../../pages/under-construction";

export const Route = createFileRoute("/learn/")({
  component: () => (
    <UnderConstructionLayout
      section="learn"
      title="Learn"
      description="Guides, recipes, and tutorials for web3 development."
    />
  ),
});
