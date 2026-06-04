import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "../../pages/landing";
import { buildMeta } from "../../shared/lib/seo";

const seo = buildMeta({
  title: "Open Source Web3 Developer Toolkit",
  description:
    "w3-kit is an open-source web3 toolkit: typed UI components, chain and token registry, and recipes. Ship dApps faster, on any chain.",
  path: "/",
});

const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "w3-kit",
  description:
    "Open-source web3 developer toolkit. Chain registry, UI components, recipes, and CLI.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  url: "https://w3-kit.com/",
});

export const Route = createFileRoute("/_landing/")({
  head: () => ({
    meta: seo.meta,
    links: seo.links,
    scripts: [{ type: "application/ld+json", children: jsonLd }],
  }),
  component: LandingPage,
});
