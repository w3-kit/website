import { createFileRoute } from "@tanstack/react-router";
import { RecipeDetailPage } from "../../../pages/recipe-detail";
import { buildMeta } from "../../../shared/lib/seo";

export const Route = createFileRoute("/docs/recipe/$recipeSlug")({
  head: ({ params }) => {
    const title = params.recipeSlug
      .split("-")
      .map((s) => s[0]?.toUpperCase() + s.slice(1))
      .join(" ");
    const seo = buildMeta({
      title: `${title} — Recipe`,
      description: `Build the ${title} recipe with w3-kit.`,
      path: `/docs/recipe/${params.recipeSlug}`,
      type: "article",
    });
    return { meta: seo.meta, links: seo.links };
  },
  component: RecipeDetailPage,
});
