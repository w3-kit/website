import { createFileRoute } from "@tanstack/react-router";
import { UiEndlessPage } from "../../pages/ui-endless";
import { buildMeta } from "../../shared/lib/seo";

const seo = buildMeta({
  title: "Endless components",
  description:
    "Web3 components generated while you scroll. Select one to get a prompt a coding agent can build it from.",
  path: "/ui/endless",
});

export const Route = createFileRoute("/ui/endless")({
  /** The seed decides the whole page, so a link with a seed reproduces it. */
  validateSearch: (search: Record<string, unknown>): { seed?: number } =>
    Number.isSafeInteger(search.seed) && (search.seed as number) >= 0
      ? { seed: search.seed as number }
      : {},
  head: () => ({ meta: seo.meta, links: seo.links }),
  component: UiEndlessPage,
});
