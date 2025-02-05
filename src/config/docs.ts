interface DocPage {
  title: string;
  href: string;
  section: "getting-started" | "components" | "examples";
}

const pages: DocPage[] = [
  // Components (in alphabetical order)

  {
    title: "Bridge",
    href: "/docs/components/bridge",
    section: "components",
  },
  {
    title: "Connect Wallet",
    href: "/docs/components/connect-wallet",
    section: "components",
  },
  {
    title: "Contract Interaction",
    href: "/docs/components/contract-interaction",
    section: "components",
  },
  {
    title: "Gas Calculator",
    href: "/docs/components/gas-calculator",
    section: "components",
  },
  {
    title: "Multisignature Wallets",
    href: "/docs/components/multisig-wallet",
    section: "components",
  },
  {
    title: "Network Switcher",
    href: "/docs/components/network-switcher",
    section: "components",
  },
  {
    title: "NFT Card",
    href: "/docs/components/nft-card",
    section: "components",
  },
  {
    title: "Price Ticker",
    href: "/docs/components/price-ticker",
    section: "components",
  },
  {
    title: "Token List",
    href: "/docs/components/token-list",
    section: "components",
  }, 
  {
    title: "Token Card",
    href: "/docs/components/token-card",
    section: "components",
  },
  {
    title: "Token Swap",
    href: "/docs/components/token-swap",
    section: "components",
  },
  {
    title: "Transaction History",
    href: "/docs/components/transaction-history",
    section: "components",
  },
];


export const docsConfig = { pages };

export function getPageNavigation(currentPath: string) {
  const currentIndex = pages.findIndex((page) => page.href === currentPath);

  if (currentIndex === -1) return { prev: undefined, next: undefined };

  return {
    prev: currentIndex > 0 ? pages[currentIndex - 1] : undefined,
    next: currentIndex < pages.length - 1 ? pages[currentIndex + 1] : undefined,
  };
}

export function getComponentList() {
  return pages.filter((page) => page.section === "components");
}
