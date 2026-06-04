import { createFileRoute } from "@tanstack/react-router";
import { ChainsListPage } from "../../../pages/chains-list";
import { buildMeta } from "../../../shared/lib/seo";

const seo = buildMeta({
  title: "Chains",
  description:
    "All chains supported by @w3-kit/registry, with native currencies, RPC URLs, and explorers.",
  path: "/registry/chains",
});

export const Route = createFileRoute("/registry/chains/")({
  head: () => ({ meta: seo.meta, links: seo.links }),
  component: ChainsListPage,
});
