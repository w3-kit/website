import { createFileRoute } from "@tanstack/react-router";
import { DesignSystemPage } from "../../pages/design-system";
import { buildMeta } from "../../shared/lib/seo";

const seo = buildMeta({
  title: "Design",
  description: "Design tokens, palettes, and visual language for w3-kit. Coming soon.",
  path: "/design/",
});

export const Route = createFileRoute("/design/")({
  head: () => ({ meta: seo.meta, links: seo.links }),
  component: DesignSystemPage,
});
