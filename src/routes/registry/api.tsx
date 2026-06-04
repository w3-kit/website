import { createFileRoute } from "@tanstack/react-router";
import { RegistryApiPage } from "../../pages/registry-api";
import { buildMeta } from "../../shared/lib/seo";

const seo = buildMeta({
  title: "Registry API Reference",
  description:
    "Usage examples for the @w3-kit/registry npm package: getChain, getTokenAddress, getRpc.",
  path: "/registry/api",
});

export const Route = createFileRoute("/registry/api")({
  head: () => ({ meta: seo.meta, links: seo.links }),
  component: RegistryApiPage,
});
