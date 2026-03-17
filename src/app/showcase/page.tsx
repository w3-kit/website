"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";

// Components
import { NFTCard } from "@/components/w3-kit/nft-card";
import { TokenCard } from "@/components/w3-kit/token-card";
import { PriceTicker } from "@/components/w3-kit/price-ticker";
import { TokenList } from "@/components/w3-kit/token-list";
import { WalletBalance } from "@/components/w3-kit/wallet-balance";
import { TransactionHistory } from "@/components/w3-kit/transaction-history";
import { NFTCollectionGrid } from "@/components/w3-kit/nft-collection-grid";
import { TokenSwapWidget } from "@/components/w3-kit/token-swap";
import { BridgeWidget } from "@/components/w3-kit/bridge";
import { NetworkSwitcher } from "@/components/w3-kit/network-switcher";
import { ContractInteraction } from "@/components/w3-kit/contract-interaction";
import { AddressBook } from "@/components/w3-kit/address-book";
import { StakingInterface } from "@/components/w3-kit/staking-interface";
import { LiquidityPoolStats } from "@/components/w3-kit/liquidity-pool-stats";
import { AssetPortfolio } from "@/components/w3-kit/asset-portfolio";
import { GasCalculator } from "@/components/w3-kit/gas-calculator";
import { SmartContractScanner } from "@/components/w3-kit/smart-contract-scanner";
import { ENSResolver } from "@/components/w3-kit/ens-resolver";
import { MultisigWallet } from "@/components/w3-kit/multisig-wallet";
import { DeFiPositionManager } from "@/components/w3-kit/defi-position-manager";
import { FlashLoanExecutor } from "@/components/w3-kit/flash-loan-executor";
import { TokenVesting } from "@/components/ui/token-vesting/token-vesting";
import { SubscriptionPayments } from "@/components/w3-kit/subscription-payments";
import { TokenAirdrop } from "@/components/w3-kit/token-airdrop";
import { NFTMarketplaceAggregator } from "@/components/w3-kit/nft-marketplace-aggregator";
import { LimitOrderManager } from "@/components/w3-kit/limit-order-manager";

// Config
import { TOKEN_CONFIGS } from "@/config/tokens";
import {
  NETWORKS,
  TEST_NETWORKS,
} from "@/app/docs/components/network-switcher/networks";

// ─── Categories ────────────────────────────────────────────
const CATEGORIES = [
  "All",
  "Data Display",
  "Inputs & Actions",
  "DeFi Tools",
  "Analytics",
  "Advanced",
] as const;

type Category = (typeof CATEGORIES)[number];

// ─── Mock Data ─────────────────────────────────────────────

const mockNFT = {
  id: "2",
  name: "Bored Ape #5678",
  description: "A unique Bored Ape NFT",
  image: "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
  owner: "0x9876543210fedcba9876543210fedcba98765432",
  collection: "Bored Ape Yacht Club",
  tokenId: "5678",
  contractAddress: "0x123456789abcdef123456789abcdef1234567890",
  chainId: 1,
  attributes: [
    { trait_type: "Background", value: "Yellow" },
    { trait_type: "Fur", value: "Brown" },
    { trait_type: "Eyes", value: "Bored" },
    { trait_type: "Clothes", value: "Suit" },
  ],
};

const mockTokenCard = {
  symbol: "ETH",
  name: "Ethereum",
  balance: "1.5",
  price: 1900.5,
  priceChange24h: 2.5,
  logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=040",
};

const mockPriceData = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: 50000,
    priceChange: { "1h": 0.5, "24h": 2.3, "7d": -1.2, "30d": 15.4 },
    marketCap: 950000000000,
    volume: { "24h": 25000000000 },
    circulatingSupply: 19000000,
    maxSupply: 21000000,
    logoURI: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    lastUpdated: new Date().toISOString(),
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: 3000,
    priceChange: { "1h": -0.2, "24h": 1.5, "7d": 3.2, "30d": 10.1 },
    marketCap: 350000000000,
    volume: { "24h": 15000000000 },
    circulatingSupply: 120000000,
    maxSupply: null,
    logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    lastUpdated: new Date().toISOString(),
  },
];

const mockTokenList = [
  { ...TOKEN_CONFIGS.ETH, balance: "1.5", price: 1900.5, value: 2850.75, chainId: 1 },
  { ...TOKEN_CONFIGS.BTC, balance: "0.05", price: 35000, value: 1750, chainId: 1 },
  { ...TOKEN_CONFIGS.USDC, balance: "1000", price: 1, value: 1000, chainId: 1 },
];

const mockWalletTokens = [
  { symbol: "ETH", name: "Ethereum", balance: "1.5", price: 1900.5, decimals: 18, logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.png", address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", chainId: 1 },
  { symbol: "USDC", name: "USD Coin", balance: "1000", price: 1, decimals: 6, logoURI: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png", address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", chainId: 1 },
];

const mockTransactions = [
  { hash: "0x113...abc", from: "0xabc...def", to: "0xdef...789", value: "1000000000000000000", timestamp: Math.floor(Date.now() / 1000), status: "success" as const, type: "send" as const, nonce: 1, blockNumber: 12345678 },
  { hash: "0x456...def", from: "0x789...123", to: "0xfed...456", value: "500000000000000000", timestamp: Math.floor(Date.now() / 1000) - 3600, status: "pending" as const, type: "receive" as const, nonce: 2, blockNumber: 12345679 },
  { hash: "0x789...ghi", from: "0xabc...def", to: "0x123...456", value: "2500000000000000000", timestamp: Math.floor(Date.now() / 1000) - 7200, status: "failed" as const, type: "send" as const, nonce: 3, blockNumber: 12345680 },
];

const mockNFTCollection = [
  { id: "1", name: "CryptoPunk #3100", description: "Alien punk", image: "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ", owner: "0xabc...def", collection: "CryptoPunks", tokenId: "3100", contractAddress: "0x123...456", chainId: 1, attributes: [{ trait_type: "Type", value: "Alien" }] },
  { id: "2", name: "CryptoPunk #7804", description: "Pipe punk", image: "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ", owner: "0xdef...123", collection: "CryptoPunks", tokenId: "7804", contractAddress: "0x123...456", chainId: 1, attributes: [{ trait_type: "Type", value: "Alien" }] },
  { id: "3", name: "CryptoPunk #5577", description: "Cowboy punk", image: "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ", owner: "0x789...abc", collection: "CryptoPunks", tokenId: "5577", contractAddress: "0x123...456", chainId: 1, attributes: [{ trait_type: "Type", value: "Human" }] },
];

const mockAddresses = [
  { id: "1", name: "Vitalik Buterin", address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", ensName: "vitalik.eth", notes: "Ethereum Co-founder" },
  { id: "2", name: "Changpeng Zhao", address: "0x89012765432abcdef89012765432abcdef890127", ensName: "cz.bnb", notes: "Binance CEO" },
];

const mockStakingPools = [
  { id: "1", name: "ETH Staking Pool", token: { symbol: TOKEN_CONFIGS.ETH.symbol, logoURI: TOKEN_CONFIGS.ETH.logoURI, decimals: TOKEN_CONFIGS.ETH.decimals }, apr: 12.5, minStake: "0.1", lockPeriod: 30, totalStaked: "15000" },
  { id: "2", name: "USDC Yield Pool", token: { symbol: TOKEN_CONFIGS.USDC.symbol, logoURI: TOKEN_CONFIGS.USDC.logoURI, decimals: TOKEN_CONFIGS.USDC.decimals }, apr: 8.2, minStake: "100", lockPeriod: 30, totalStaked: "5000000" },
];

const mockPoolData = {
  token: { symbol: "ETH", logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=025", liquidity: 156.78, price: 1900.5, marketCap: 250000000000, totalSupply: 120000000, circulatingSupply: 119000000 },
  fee: 500, tvl: 548000, tvlChange24h: 2.5, volume24h: 12500000, volumeChange24h: -1.2, apr: 12.5, feesEarned24h: 1890, uniqueHolders: 15000, transactions24h: 25000,
};

const makePriceHistory = (base: number, variance: number) => ({
  "24h": Array.from({ length: 24 }, (_, i) => base + Math.sin(i / 4) * variance),
  "7d": Array.from({ length: 7 }, (_, i) => base + Math.sin(i / 2) * variance * 2),
  "30d": Array.from({ length: 30 }, (_, i) => base + Math.sin(i) * variance * 3),
});

const mockPortfolioAssets = [
  { ...TOKEN_CONFIGS.ETH, balance: "2.5", price: 3500, value: 8750, change24h: 4.2, color: "#627EEA", priceHistory: makePriceHistory(3500, 100), candleData: { "24h": [], "7d": [], "30d": [] } },
  { ...TOKEN_CONFIGS.BTC, balance: "0.15", price: 45000, value: 6750, change24h: -2.1, color: "#F7931A", priceHistory: makePriceHistory(45000, 1000), candleData: { "24h": [], "7d": [], "30d": [] } },
  { ...TOKEN_CONFIGS.USDC, balance: "5000", price: 1, value: 5000, change24h: 0.01, color: "#2775CA", priceHistory: makePriceHistory(1, 0.001), candleData: { "24h": [], "7d": [], "30d": [] } },
];

const mockAirdrops = [
  { id: "1", tokenSymbol: "W3K", tokenName: "W3Kit Token", tokenAddress: "0x1234567890123456789012345678901234567890", amount: "1000", merkleRoot: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890", merkleProof: [] as string[], startTime: Date.now() - 86400000, endTime: Date.now() + 86400000 * 7, claimed: false, logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=040" },
  { id: "2", tokenSymbol: "TEST", tokenName: "Test Token", tokenAddress: "0x0987654321098765432109876543210987654321", amount: "500", merkleRoot: "0x0987654321abcdef0987654321abcdef0987654321abcdef0987654321abcdef", merkleProof: [] as string[], startTime: Date.now() + 86400000, endTime: Date.now() + 86400000 * 14, claimed: false, logoURI: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=040" },
];

const mockSubscriptionPlans = [
  { id: "basic", name: "Basic", price: "0.1", priceUsd: "350", token: { symbol: "ETH", logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.png", decimals: 18 }, interval: "monthly" as const, features: ["Basic features", "Email support", "Community access"], description: "Perfect for getting started", icon: "sparkles" as const },
  { id: "pro", name: "Pro", price: "0.5", priceUsd: "1,750", token: { symbol: "ETH", logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.png", decimals: 18 }, interval: "monthly" as const, features: ["All Basic features", "Priority support", "Advanced analytics", "API access"], description: "Best value for most users", icon: "zap" as const, isPopular: true },
];

const mockDefiPositions = [
  { id: "1", protocol: { name: "Aave", logoURI: "https://cryptologos.cc/logos/aave-aave-logo.png", type: "lending" as const }, token: { symbol: "ETH", logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.png", price: 2845.67 }, amount: "1.5", value: 4268.51, healthFactor: 2.5, apy: 3.2, rewards: [{ token: "AAVE", amount: "0.05", value: 2.50 }], risk: "low" as const, lastUpdate: Date.now() },
  { id: "2", protocol: { name: "Compound", logoURI: "https://cryptologos.cc/logos/compound-comp-logo.png", type: "borrowing" as const }, token: { symbol: "USDC", logoURI: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png", price: 1.00 }, amount: "5000", value: 5000, healthFactor: 1.8, apy: -2.5, rewards: [{ token: "COMP", amount: "0.8", value: 24.00 }], risk: "medium" as const, lastUpdate: Date.now() },
];

const mockFlashLoanProtocols = [
  { name: "Aave", logoURI: "https://cryptologos.cc/logos/aave-aave-logo.png", address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9" },
  { name: "dYdX", logoURI: "https://cryptologos.cc/logos/dydx-dydx-logo.png", address: "0x92D6C1e31e14520e676a687F0a93788B716BEff5" },
];

const mockFlashLoanTokens = [
  { symbol: "ETH", logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.png", decimals: 18, address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" },
  { symbol: "USDC", logoURI: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png", decimals: 6, address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" },
];

const mockVestingSchedules = [
  { id: "1", tokenSymbol: "TOKEN", totalAmount: "100000", vestedAmount: "25000", startDate: Date.now() - 90 * 86400000, endDate: Date.now() + 275 * 86400000, cliffDate: Date.now() - 30 * 86400000, lastClaimDate: Date.now() - 15 * 86400000, beneficiary: "0x1234...5678", status: "active" as const },
  { id: "2", tokenSymbol: "REWARD", totalAmount: "50000", vestedAmount: "50000", startDate: Date.now() - 180 * 86400000, endDate: Date.now() - 30 * 86400000, cliffDate: Date.now() - 150 * 86400000, lastClaimDate: Date.now() - 30 * 86400000, beneficiary: "0x8765...4321", status: "completed" as const },
];

const mockMultisigData = {
  walletAddress: "0x1234567890123456789012345678901234567890",
  signers: [
    { address: "0x1234...5678", name: "Alice", hasApproved: false },
    { address: "0x5678...9012", name: "Bob", hasApproved: false },
    { address: "0x9012...3456", name: "Charlie", hasApproved: false },
  ],
  requiredApprovals: 2,
};

const mockLimitOrders = [
  { id: "1", type: "limit" as const, token: { symbol: "ETH", logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.png", price: 2845.67 }, amount: "0.5", price: "3000", status: "active" as const, timestamp: Date.now() - 3600000 },
  { id: "2", type: "stop-loss" as const, token: { symbol: "ETH", logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.png", price: 2845.67 }, amount: "1.0", price: "2500", status: "active" as const, timestamp: Date.now() - 7200000 },
];

// ─── Showcase Items ────────────────────────────────────────

interface ShowcaseItem {
  name: string;
  description: string;
  href: string;
  category: Category;
  isNew?: boolean;
  render: () => React.ReactNode;
}

const showcaseItems: ShowcaseItem[] = [
  // Data Display
  {
    name: "NFT Card",
    description: "Display NFTs with rich metadata and interactive features",
    href: "/docs/components/nft-card",
    category: "Data Display",
    render: () => <NFTCard nft={mockNFT} />,
  },
  {
    name: "Token Card",
    description: "Display token information with price and balance details",
    href: "/docs/components/token-card",
    category: "Data Display",
    render: () => <TokenCard token={mockTokenCard} />,
  },
  {
    name: "Price Ticker",
    description: "Real-time cryptocurrency price updates with change indicators",
    href: "/docs/components/price-ticker",
    category: "Data Display",
    render: () => <PriceTicker tokens={mockPriceData} />,
  },
  {
    name: "Token List",
    description: "Searchable list of tokens with metadata and filtering",
    href: "/docs/components/token-list",
    category: "Data Display",
    render: () => <TokenList tokens={mockTokenList} />,
  },
  {
    name: "Wallet Balance",
    description: "Display wallet token balances with real-time value updates",
    href: "/docs/components/wallet-balance",
    category: "Data Display",
    render: () => <WalletBalance tokens={mockWalletTokens} />,
  },
  {
    name: "Transaction History",
    description: "View and track transaction history with detailed status",
    href: "/docs/components/transaction-history",
    category: "Data Display",
    render: () => <TransactionHistory transactions={mockTransactions} />,
  },
  {
    name: "NFT Collection Grid",
    description: "Grid layout for displaying and managing NFT collections",
    href: "/docs/components/nft-collection-grid",
    category: "Data Display",
    render: () => <NFTCollectionGrid nfts={mockNFTCollection} collectionName="CryptoPunks" />,
  },
  // Inputs & Actions
  {
    name: "Token Swap",
    description: "Token swap interface with multiple DEX support and best rates",
    href: "/docs/components/token-swap",
    category: "Inputs & Actions",
    render: () => <TokenSwapWidget onSwap={async () => {}} />,
  },
  {
    name: "Bridge",
    description: "Cross-chain token bridge interface with multiple network support",
    href: "/docs/components/bridge",
    category: "Inputs & Actions",
    render: () => <BridgeWidget />,
  },
  {
    name: "Network Switcher",
    description: "Switch between different blockchain networks seamlessly",
    href: "/docs/components/network-switcher",
    category: "Inputs & Actions",
    render: () => <NetworkSwitcher networks={NETWORKS} testNetworks={TEST_NETWORKS} onSwitch={() => {}} />,
  },
  {
    name: "Contract Interaction",
    description: "Interface for interacting with smart contracts and ABIs",
    href: "/docs/components/contract-interaction",
    category: "Inputs & Actions",
    render: () => <ContractInteraction />,
  },
  {
    name: "Address Book",
    description: "Manage and organize Ethereum addresses with notes and labels",
    href: "/docs/components/address-book",
    category: "Inputs & Actions",
    render: () => <AddressBook entries={mockAddresses} onAdd={() => {}} onDelete={() => {}} onEdit={() => {}} />,
  },
  {
    name: "Token Airdrop",
    description: "Manage and distribute token airdrops with merkle proof verification",
    href: "/docs/components/token-airdrop",
    category: "Inputs & Actions",
    isNew: true,
    render: () => <TokenAirdrop airdrops={mockAirdrops} onClaim={async () => {}} />,
  },
  {
    name: "Subscription Payments",
    description: "Manage recurring crypto payments with flexible subscription plans",
    href: "/docs/components/subscription-payments",
    category: "Inputs & Actions",
    isNew: true,
    render: () => <SubscriptionPayments plans={mockSubscriptionPlans} onSubscribe={() => {}} />,
  },
  // DeFi Tools
  {
    name: "Staking Interface",
    description: "Stake and manage token staking positions with rewards tracking",
    href: "/docs/components/staking-interface",
    category: "DeFi Tools",
    render: () => <StakingInterface pools={mockStakingPools} onStake={() => {}} onUnstake={() => {}} />,
  },
  {
    name: "Liquidity Pool Stats",
    description: "Display detailed statistics and analytics for liquidity pools",
    href: "/docs/components/liquidity-pool-stats",
    category: "DeFi Tools",
    render: () => <LiquidityPoolStats poolData={mockPoolData} />,
  },
  {
    name: "DeFi Position Manager",
    description: "Unified dashboard for managing DeFi positions",
    href: "/docs/components/defi-position-manager",
    category: "DeFi Tools",
    isNew: true,
    render: () => <DeFiPositionManager positions={mockDefiPositions} />,
  },
  {
    name: "Flash Loan Executor",
    description: "Execute flash loans across multiple protocols",
    href: "/docs/components/flash-loan-executor",
    category: "DeFi Tools",
    isNew: true,
    render: () => <FlashLoanExecutor protocols={mockFlashLoanProtocols} tokens={mockFlashLoanTokens} />,
  },
  {
    name: "Token Vesting",
    description: "Track and manage token vesting schedules",
    href: "/docs/components/token-vesting",
    category: "DeFi Tools",
    isNew: true,
    render: () => <TokenVesting vestingSchedules={mockVestingSchedules} onClaimTokens={async () => {}} />,
  },
  {
    name: "Limit Order Manager",
    description: "Advanced order management for DEX trading",
    href: "/docs/components/limit-order-manager",
    category: "DeFi Tools",
    isNew: true,
    render: () => <LimitOrderManager orders={mockLimitOrders} />,
  },
  // Analytics
  {
    name: "Asset Portfolio",
    description: "Track and visualize crypto asset holdings with detailed analytics",
    href: "/docs/components/asset-portfolio",
    category: "Analytics",
    render: () => <AssetPortfolio assets={mockPortfolioAssets} totalValue={15500} totalChange24h={2.8} />,
  },
  {
    name: "Gas Calculator",
    description: "Calculate and estimate transaction gas costs across networks",
    href: "/docs/components/gas-calculator",
    category: "Analytics",
    render: () => <GasCalculator ethPrice={3500} />,
  },
  {
    name: "Smart Contract Scanner",
    description: "Analyze and verify smart contracts with security checks",
    href: "/docs/components/smart-contract-scanner",
    category: "Analytics",
    render: () => <SmartContractScanner />,
  },
  {
    name: "NFT Marketplace Aggregator",
    description: "Compare NFT listings across multiple marketplaces",
    href: "/docs/components/nft-marketplace-aggregator",
    category: "Analytics",
    isNew: true,
    render: () => <NFTMarketplaceAggregator />,
  },
  // Advanced
  {
    name: "Multisignature Wallets",
    description: "Multi-signature wallet management with transaction approval flow",
    href: "/docs/components/multisig-wallet",
    category: "Advanced",
    render: () => <MultisigWallet walletAddress={mockMultisigData.walletAddress} signers={mockMultisigData.signers} transactions={[]} requiredApprovals={mockMultisigData.requiredApprovals} />,
  },
  {
    name: "ENS Resolver",
    description: "Resolve and manage ENS names and domains with reverse lookup",
    href: "/docs/components/ens-resolver",
    category: "Advanced",
    render: () => <ENSResolver />,
  },
];

// ─── Component ─────────────────────────────────────────────

export default function ShowcasePage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? showcaseItems
      : showcaseItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
              <LayoutGrid className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Component Showcase
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            All Components
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Every w3-kit component rendered live in one place. Browse, explore, and find the right building blocks for your Web3 application.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 font-medium">
              {showcaseItems.length} components
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 font-medium">
              {showcaseItems.filter((i) => i.isNew).length} new
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="sticky top-16 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
            {CATEGORIES.map((cat) => {
              const count =
                cat === "All"
                  ? showcaseItems.length
                  : showcaseItems.filter((i) => i.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {cat}
                  <span
                    className={`text-xs ${
                      activeCategory === cat
                        ? "text-gray-400 dark:text-gray-500"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="columns-1 md:columns-2 xl:columns-3 gap-6 [column-fill:_balance]">
          {filtered.map((item) => (
            <div
              key={item.name}
              className="break-inside-avoid mb-6 group"
            >
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden transition-colors duration-150 hover:border-gray-300 dark:hover:border-gray-700">
                {/* Header */}
                <div className="px-5 pt-5 pb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {item.name}
                    </h3>
                    {item.isNew && (
                      <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 uppercase tracking-wider">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mt-1">
                    {item.description}
                  </p>
                </div>
                {/* Component Preview */}
                <div className="px-3 pb-3">
                  <div className="rounded-lg bg-gray-100 dark:bg-gray-900 p-6 overflow-hidden">
                    <div className="[&>*]:max-w-full">
                      {item.render()}
                    </div>
                  </div>
                </div>
                {/* Footer */}
                <Link
                  href={item.href}
                  className="flex items-center justify-between px-5 py-3 border-t border-gray-100 dark:border-gray-800/50 transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400 inline-flex items-center gap-1">
                    Docs <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
