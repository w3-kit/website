import { createFileRoute } from "@tanstack/react-router";
import { DesignPage } from "../../pages/design";
import { buildMeta } from "../../shared/lib/seo";

const seo = buildMeta({
  title: "Design — w3-kit",
  description:
    "The w3-kit design reference: colours, type sizes, spacing, buttons and motion, exactly as the code uses them.",
  path: "/design",
});

export const Route = createFileRoute("/_landing/design")({
  head: () => ({ meta: seo.meta, links: seo.links }),
  component: DesignPage,
});
