import { createFileRoute } from "@tanstack/react-router";
import { TokensListPage } from "../../../pages/tokens-list";
import { buildMeta } from "../../../shared/lib/seo";

const seo = buildMeta({
  title: "Tokens",
  description:
    "Stablecoins, blue chips, and project tokens cataloged by @w3-kit/registry with per-chain addresses.",
  path: "/registry/tokens",
});

export const Route = createFileRoute("/registry/tokens/")({
  head: () => ({ meta: seo.meta, links: seo.links }),
  component: TokensListPage,
});
