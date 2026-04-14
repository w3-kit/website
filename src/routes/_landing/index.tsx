import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "../../pages/landing";

export const Route = createFileRoute("/_landing/")({
  head: () => ({
    meta: [
      { title: "w3-kit — Open Source Web3 Developer Toolkit" },
      {
        name: "description",
        content:
          "Build web3 apps with confidence. Open-source React components, CLI tooling, recipes, and a typed registry for the decentralized web.",
      },
      // Open Graph
      { property: "og:title", content: "w3-kit — Open Source Web3 Developer Toolkit" },
      {
        property: "og:description",
        content:
          "Open-source components, recipes, and developer tooling for the decentralized web. Everything you need to go from idea to production.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://w3-kit.com" },
      { property: "og:image", content: "https://w3-kit.com/og-image.png" },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "w3-kit — Open Source Web3 Developer Toolkit" },
      {
        name: "twitter:description",
        content: "Build web3 apps with confidence. Open-source React components, CLI, and recipes.",
      },
      { name: "twitter:image", content: "https://w3-kit.com/og-image.png" },
    ],
  }),
  component: LandingPage,
});
