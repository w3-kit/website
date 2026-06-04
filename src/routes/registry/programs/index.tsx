import { createFileRoute } from "@tanstack/react-router";
import { ProgramsListPage } from "../../../pages/programs-list";
import { buildMeta } from "../../../shared/lib/seo";

const seo = buildMeta({
  title: "Solana Programs",
  description:
    "Solana programs cataloged by @w3-kit/registry — System Program, SPL Token, and more.",
  path: "/registry/programs",
});

export const Route = createFileRoute("/registry/programs/")({
  head: () => ({ meta: seo.meta, links: seo.links }),
  component: ProgramsListPage,
});
