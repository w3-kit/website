import { createFileRoute } from "@tanstack/react-router";
import { ChainsListPage } from "../../../pages/chains-list";

export const Route = createFileRoute("/registry/chains/")({
  component: ChainsListPage,
});
