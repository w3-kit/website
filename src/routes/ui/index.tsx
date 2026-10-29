import { createFileRoute } from "@tanstack/react-router";
import { UiExplorerPage } from "../../pages/ui-explorer";
import { isComponentCategory, type ComponentCategory } from "../../entities/component";
import { buildMeta } from "../../shared/lib/seo";

const seo = buildMeta({
  title: "UI Components",
  description:
    "Typed React components for web3 dApps — wallet connect, balances, swaps, mints. Open source.",
  path: "/ui/",
});

export const Route = createFileRoute("/ui/")({
  validateSearch: (search: Record<string, unknown>): { category?: ComponentCategory } =>
    isComponentCategory(search.category) ? { category: search.category } : {},
  head: () => ({ meta: seo.meta, links: seo.links }),
  component: UiExplorerPage,
});
