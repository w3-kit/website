import { createFileRoute } from "@tanstack/react-router";
import { DocPage } from "../../pages/doc-page";
import { buildMeta } from "../../shared/lib/seo";

export const Route = createFileRoute("/docs/$slug")({
  head: ({ params }) => {
    const title = params.slug
      .split("-")
      .map((s) => s[0]?.toUpperCase() + s.slice(1))
      .join(" ");
    const seo = buildMeta({
      title,
      description: `${title} — w3-kit documentation.`,
      path: `/docs/${params.slug}`,
    });
    return { meta: seo.meta, links: seo.links };
  },
  component: DocPage,
});
