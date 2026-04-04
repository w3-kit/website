import { createFileRoute } from "@tanstack/react-router";
import { UnderConstructionLayout } from "../../pages/under-construction";
import { RegistryAnimation } from "../../pages/under-construction/ui/registry-animation";

export const Route = createFileRoute("/registry/")({
  component: () => (
    <UnderConstructionLayout
      section="registry"
      title="Registry"
      description="Browse chains, tokens, and contracts."
      animation={<RegistryAnimation />}
    />
  ),
});
