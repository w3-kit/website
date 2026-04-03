import { createFileRoute } from "@tanstack/react-router";
import { UnderConstruction } from "../../shared/ui/under-construction";

export const Route = createFileRoute("/registry/")({
  component: () => (
    <UnderConstruction
      section="Registry"
      description="Browse chains, tokens, and contracts across EVM networks. Interactive explorer for the w3-kit ecosystem."
      features={[
        "Chain explorer with network details",
        "Token registry with metadata",
        "Contract addresses and ABIs",
        "Component registry for the CLI",
      ]}
    />
  ),
});
