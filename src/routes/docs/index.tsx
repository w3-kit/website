import { createFileRoute } from "@tanstack/react-router";
import { DocsHomePage } from "../../pages/docs-home";
import { buildMeta } from "../../shared/lib/seo";

const seo = buildMeta({
  title: "Documentation",
  description:
    "Guides, recipes, and cheatsheets for shipping production web3 features with w3-kit.",
  path: "/docs/",
});

export const Route = createFileRoute("/docs/")({
  head: () => ({ meta: seo.meta, links: seo.links }),
  component: DocsHomePage,
});
