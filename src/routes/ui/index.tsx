import { createFileRoute } from "@tanstack/react-router";
import { UiExplorerPage } from "../../pages/ui-explorer";

export const Route = createFileRoute("/ui/")({
  head: () => ({
    meta: [
      { title: "UI Components — w3-kit" },
      {
        name: "description",
        content:
          "27 production-ready web3 React components for wallets, DeFi, NFTs, and more. Open source.",
      },
    ],
  }),
  component: UiExplorerPage,
});
