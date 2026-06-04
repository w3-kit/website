import { createFileRoute } from "@tanstack/react-router";
import { UnderConstructionLayout } from "../../pages/under-construction";
import { buildMeta } from "../../shared/lib/seo";

const seo = buildMeta({
  title: "Learn",
  description:
    "Concepts, comparisons, and cheatsheets for web3 development with w3-kit. Coming soon.",
  path: "/learn/",
});

export const Route = createFileRoute("/learn/")({
  head: () => ({ meta: seo.meta, links: seo.links }),
  component: () => (
    <UnderConstructionLayout
      section="learn"
      title="Learn"
      description="Guides, recipes, and tutorials for web3 development."
    />
  ),
});
