import { createFileRoute } from "@tanstack/react-router";
import { UnderConstructionLayout } from "../../pages/under-construction";
import { DocsAnimation } from "../../pages/under-construction/ui/docs-animation";

export const Route = createFileRoute("/docs/")({
  component: () => (
    <UnderConstructionLayout
      section="docs"
      title="Documentation"
      description="Guides, recipes, and API reference."
      animation={<DocsAnimation />}
    />
  ),
});
