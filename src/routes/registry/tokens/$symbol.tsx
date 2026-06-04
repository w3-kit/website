import { createFileRoute } from "@tanstack/react-router";
import { TokenDetailPage } from "../../../pages/token-detail";

export const Route = createFileRoute("/registry/tokens/$symbol")({
  component: TokenDetailPage,
});
