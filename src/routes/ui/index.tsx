import { createFileRoute } from "@tanstack/react-router";
import { UiExplorerPage } from "../../pages/ui-explorer";
import { buildMeta } from "../../shared/lib/seo";

const seo = buildMeta({
  title: "UI Components",
  description:
    "Typed React components for web3 dApps — wallet connect, balances, swaps, mints. Open source.",
  path: "/ui/",
});

export const Route = createFileRoute("/ui/")({
  head: () => ({ meta: seo.meta, links: seo.links }),
  component: UiExplorerPage,
});
