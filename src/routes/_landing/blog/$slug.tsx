import { createFileRoute } from "@tanstack/react-router";
import { BlogPostPage } from "../../../pages/blog-post";
import { POSTS } from "../../../entities/blog-post/model/posts.gen";
import { buildMeta } from "../../../shared/lib/seo";

export const Route = createFileRoute("/_landing/blog/$slug")({
  head: ({ params }) => {
    const post = POSTS.find((p) => p.slug === params.slug);
    const seo = buildMeta({
      title: post ? post.title : "Post Not Found",
      description: post ? post.summary : `No blog post with slug ${params.slug}.`,
      path: `/blog/${params.slug}`,
      type: "article",
    });
    return { meta: seo.meta, links: seo.links };
  },
  component: BlogPostPage,
});
