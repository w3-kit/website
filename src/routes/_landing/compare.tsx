import { createFileRoute } from "@tanstack/react-router";
import { ComparePage } from "../../pages/compare";
import { buildMeta } from "../../shared/lib/seo";

const seo = buildMeta({
  title: "w3-kit vs Alternatives — Honest Comparison",
  description:
    "An honest comparison of w3-kit against scaffold-eth, create-web3-dapp, and thirdweb. Pick the toolkit that fits your project.",
  path: "/compare",
});

const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "w3-kit vs Alternatives",
  description: "Honest comparison of w3-kit against scaffold-eth, create-web3-dapp, and thirdweb.",
  url: "https://w3-kit.com/compare",
});

export const Route = createFileRoute("/_landing/compare")({
  head: () => ({
    meta: seo.meta,
    links: seo.links,
    scripts: [{ type: "application/ld+json", children: jsonLd }],
  }),
  component: ComparePage,
});
