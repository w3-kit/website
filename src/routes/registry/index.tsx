import { createFileRoute } from "@tanstack/react-router";
import { RegistryHomePage } from "../../pages/registry-home";
import { buildMeta } from "../../shared/lib/seo";

const seo = buildMeta({
  title: "Registry — Chains, Tokens, Programs",
  description:
    "Interactive browser for w3-kit's chain, token, and Solana program registry. Copy addresses, view RPCs, and integrate with @w3-kit/registry.",
  path: "/registry/",
});

export const Route = createFileRoute("/registry/")({
  head: () => ({ meta: seo.meta, links: seo.links }),
  component: RegistryHomePage,
});
