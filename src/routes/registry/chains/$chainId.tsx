import { createFileRoute } from "@tanstack/react-router";
import { ChainDetailPage } from "../../../pages/chain-detail";

export const Route = createFileRoute("/registry/chains/$chainId")({
  component: ChainDetailPage,
});
