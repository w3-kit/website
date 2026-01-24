import { NextResponse } from "next/server";

// Main registry index - lists all available components
const REGISTRY = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "w3-kit",
  homepage: "https://w3-kit.com",
  items: [
    {
      name: "address-book",
      type: "registry:component",
      title: "Address Book",
      description:
        "A contact management component for storing and organizing blockchain addresses",
    },
    {
      name: "asset-portfolio",
      type: "registry:component",
      title: "Asset Portfolio",
      description:
        "Portfolio tracker with distribution charts and performance metrics",
    },
    {
      name: "bridge",
      type: "registry:component",
      title: "Bridge",
      description: "Cross-chain token bridge component for transferring assets",
    },
    {
      name: "connect-wallet",
      type: "registry:component",
      title: "Connect Wallet",
      description:
        "Multi-wallet connection button supporting MetaMask, WalletConnect, Coinbase, and Phantom",
    },
    {
      name: "contract-interaction",
      type: "registry:component",
      title: "Contract Interaction",
      description:
        "Smart contract interaction interface for reading and writing",
    },
    {
      name: "defi-position-manager",
      type: "registry:component",
      title: "DeFi Position Manager",
      description: "Manage and track DeFi positions across protocols",
    },
    {
      name: "ens-resolver",
      type: "registry:component",
      title: "ENS Resolver",
      description: "Ethereum Name Service lookup and resolution component",
    },
    {
      name: "flash-loan-executor",
      type: "registry:component",
      title: "Flash Loan Executor",
      description: "Flash loan execution interface for DeFi operations",
    },
    {
      name: "gas-calculator",
      type: "registry:component",
      title: "Gas Calculator",
      description: "Gas estimation and fee calculation component",
    },
    {
      name: "limit-order-manager",
      type: "registry:component",
      title: "Limit Order Manager",
      description:
        "Manage limit orders and stop-loss orders with real-time status",
    },
    {
      name: "liquidity-pool-stats",
      type: "registry:component",
      title: "Liquidity Pool Stats",
      description: "Display liquidity pool statistics and metrics",
    },
    {
      name: "multisig-wallet",
      type: "registry:component",
      title: "Multisig Wallet",
      description: "Multi-signature wallet management interface",
    },
    {
      name: "network-switcher",
      type: "registry:component",
      title: "Network Switcher",
      description: "Blockchain network selection and switching component",
    },
    {
      name: "nft-card",
      type: "registry:component",
      title: "NFT Card",
      description: "NFT display card with metadata and attributes",
    },
    {
      name: "nft-collection-grid",
      type: "registry:component",
      title: "NFT Collection Grid",
      description: "Grid layout for displaying NFT collections",
    },
    {
      name: "nft-marketplace-aggregator",
      type: "registry:component",
      title: "NFT Marketplace Aggregator",
      description: "Aggregate NFT listings from multiple marketplaces",
    },
    {
      name: "price-ticker",
      type: "registry:component",
      title: "Price Ticker",
      description:
        "Real-time cryptocurrency price ticker with auto-refresh and market stats",
    },
    {
      name: "smart-contract-scanner",
      type: "registry:component",
      title: "Smart Contract Scanner",
      description: "Smart contract security analysis and verification",
    },
    {
      name: "staking-interface",
      type: "registry:component",
      title: "Staking Interface",
      description: "Token staking and unstaking interface with rewards tracking",
    },
    {
      name: "subscription-payments",
      type: "registry:component",
      title: "Subscription Payments",
      description: "Recurring crypto payment subscription management",
    },
    {
      name: "token-airdrop",
      type: "registry:component",
      title: "Token Airdrop",
      description: "Token airdrop distribution and claiming interface",
    },
    {
      name: "token-card",
      type: "registry:component",
      title: "Token Card",
      description: "Token information display card with price and stats",
    },
    {
      name: "token-list",
      type: "registry:component",
      title: "Token List",
      description: "Searchable token list with filtering and selection",
    },
    {
      name: "token-swap",
      type: "registry:component",
      title: "Token Swap",
      description: "Token swap interface with price quotes and slippage settings",
    },
    {
      name: "token-vesting",
      type: "registry:component",
      title: "Token Vesting",
      description: "Token vesting schedule tracker with claiming functionality",
    },
    {
      name: "transaction-history",
      type: "registry:component",
      title: "Transaction History",
      description: "Transaction history list with filtering and details",
    },
    {
      name: "wallet-balance",
      type: "registry:component",
      title: "Wallet Balance",
      description: "Wallet balance display with token breakdown",
    },
  ],
};

export async function GET() {
  return NextResponse.json(REGISTRY);
}
