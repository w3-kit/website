interface DocPage {
  title: string;
  href: string;
  section: "getting-started" | "components" | "examples";
  description?: string;
  isNew?: boolean;
}

const pages: DocPage[] = [
  // Components (in alphabetical order)
  {
    title: "Address Book",
    href: "/docs/components/address-book",
    section: "components",
    description: "Manage and organize Ethereum addresses with notes and labels",
  },
  {
    title: "Asset Portfolio",
    href: "/docs/components/asset-portfolio",
    section: "components",
    description: "Track and visualize crypto asset holdings with detailed analytics",
  },
  {
    title: "Bridge",
    href: "/docs/components/bridge",
    section: "components",
    description: "Cross-chain token bridge interface with multiple network support",
  },
  {
    title: "Connect Wallet",
    href: "/docs/components/connect-wallet",
    section: "components",
    description: "Web3 wallet connection modal with multiple wallet options",
  },
  {
    title: "Contract Interaction",
    href: "/docs/components/contract-interaction",
    section: "components",
    description: "Interface for interacting with smart contracts and ABIs",
  },
  {
    title: "ENS Resolver",
    href: "/docs/components/ens-resolver",
    section: "components",
    description: "Resolve and manage ENS names and domains with reverse lookup",
  },
  {
    title: "Gas Calculator",
    href: "/docs/components/gas-calculator",
    section: "components",
    description: "Calculate and estimate transaction gas costs across networks",
  },
  {
    title: "Liquidity Pool Stats",
    href: "/docs/components/liquidity-pool-stats",
    section: "components",
    description: "Display detailed statistics and analytics for liquidity pools",
  },
  {
    title: "Multisignature Wallets",
    href: "/docs/components/multisig-wallet",
    section: "components",
    description: "Multi-signature wallet management with transaction approval flow",
  },
  {
    title: "Network Switcher",
    href: "/docs/components/network-switcher",
    section: "components",
    description: "Switch between different blockchain networks seamlessly",
  },
  {
    title: "NFT Card",
    href: "/docs/components/nft-card",
    section: "components",
    description: "Display NFTs with rich metadata and interactive features",
  },
  {
    title: "NFT Collection Grid",
    href: "/docs/components/nft-collection-grid",
    section: "components",
    description: "Grid layout for displaying and managing NFT collections",
  },
  {
    title: "Price Ticker",
    href: "/docs/components/price-ticker",
    section: "components",
    description: "Real-time cryptocurrency price updates with change indicators",
  },
  {
    title: "Smart Contract Scanner",
    href: "/docs/components/smart-contract-scanner",
    section: "components",
    description: "Analyze and verify smart contracts with security checks",
  },
  {
    title: "Staking Interface",
    href: "/docs/components/staking-interface",
    section: "components",
    description: "Stake and manage token staking positions with rewards tracking",
  },
  {
    title: "Token Airdrop",
    href: "/docs/components/token-airdrop",
    section: "components",
    description: "Manage and distribute token airdrops with merkle proof verification",
    isNew: true,
  },
  {
    title: "Token Card",
    href: "/docs/components/token-card",
    section: "components",
    description: "Display token information with price and balance details",
  },
  {
    title: "Token List",
    href: "/docs/components/token-list",
    section: "components",
    description: "Searchable list of tokens with metadata and filtering",
  },
  {
    title: "Token Swap",
    href: "/docs/components/token-swap",
    section: "components",
    description: "Token swap interface with multiple DEX support and best rates",
  },
  {
    title: "Token Vesting",
    href: "/docs/components/token-vesting",
    section: "components",
    description: "Track and manage token vesting schedules with detailed progress visualization",
    isNew: true,
  },
  {
    title: "Transaction History",
    href: "/docs/components/transaction-history",
    section: "components",
    description: "View and track transaction history with detailed status",
  },
  {
    title: "Wallet Balance",
    href: "/docs/components/wallet-balance",
    section: "components",
    description: "Display wallet token balances with real-time value updates",
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
