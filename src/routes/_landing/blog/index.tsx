import { createFileRoute } from "@tanstack/react-router";
import { BlogListPage } from "../../../pages/blog-list";
import { buildMeta } from "../../../shared/lib/seo";

const seo = buildMeta({
  title: "Blog",
  description:
    "Updates from w3-kit — short notes on what we ship and changelogs when we cut a release.",
  path: "/blog/",
});

export const Route = createFileRoute("/_landing/blog/")({
  head: () => ({ meta: seo.meta, links: seo.links }),
  component: BlogListPage,
});
