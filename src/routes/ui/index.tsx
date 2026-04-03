import { createFileRoute } from "@tanstack/react-router";
import { UnderConstruction } from "../../shared/ui/under-construction";

export const Route = createFileRoute("/ui/")({
  component: () => (
    <UnderConstruction
      section="UI Library"
      description="Production-ready web3 React components."
    />
  ),
});
