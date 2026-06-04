import { createFileRoute } from "@tanstack/react-router";
import { TokensListPage } from "../../../pages/tokens-list";

export const Route = createFileRoute("/registry/tokens/")({
  component: TokensListPage,
});
