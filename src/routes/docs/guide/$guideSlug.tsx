import { createFileRoute } from "@tanstack/react-router";
import { GuideDetailPage } from "../../../pages/guide-detail";
import { buildMeta } from "../../../shared/lib/seo";

export const Route = createFileRoute("/docs/guide/$guideSlug")({
  head: ({ params }) => {
    const title = params.guideSlug
      .split("-")
      .map((s) => s[0]?.toUpperCase() + s.slice(1))
      .join(" ");
    const seo = buildMeta({
      title: `${title} — Guide`,
      description: `Learn ${title} with w3-kit guides.`,
      path: `/docs/guide/${params.guideSlug}`,
      type: "article",
    });
    return { meta: seo.meta, links: seo.links };
  },
  component: GuideDetailPage,
});
