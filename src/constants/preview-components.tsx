import { NFTCard } from "@/components/w3-kit/nft-card";
import { SmartContractScanner } from "@/components/w3-kit/smart-contract-scanner";
import { AssetPortfolio } from "@/components/w3-kit/asset-portfolio";
import { ContractInteraction } from "@/components/w3-kit/contract-interaction";
import { LiquidityPoolStats } from "@/components/w3-kit/liquidity-pool-stats";
import { NetworkSwitcher } from "@/components/w3-kit/network-switcher";
import { TOKEN_CONFIGS } from "@/config/tokens";
import { NETWORKS, TEST_NETWORKS } from "@/app/docs/components/network-switcher/networks";

export const previewComponents = [
  {
    name: "NFT Card",
    description: "Display NFTs with rich metadata and interactive features",
    path: "/docs/components/nft-card",
    preview: (
      <NFTCard
        nft={{
          id: "2",
          name: "Bored Ape #5678",
          description: "A unique Bored Ape NFT",
          image:
            "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
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
        }}
      />
    ),
  },
  {
    name: "Smart Contract Scanner",
    description:
      "Analyze and verify smart contracts with comprehensive security checks",
    path: "/docs/components/smart-contract-scanner",
    preview: <SmartContractScanner />,
  },
  {
    name: "Asset Portfolio",
    description:
      "Track and manage crypto assets with detailed portfolio analytics",
    path: "/docs/components/asset-portfolio",
    preview: (
      <AssetPortfolio
        assets={[
          {
            symbol: TOKEN_CONFIGS.ETH.symbol,
            name: TOKEN_CONFIGS.ETH.name,
            logoURI: TOKEN_CONFIGS.ETH.logoURI,
            balance: "2.5",
            price: 3500,
            value: 8750,
            change24h: 4.2,
            color: "#627EEA",
            priceHistory: {
              '24h': Array.from({ length: 24 }, (_, i) => 3500 + Math.sin(i / 4) * 100),
              '7d': Array.from({ length: 7 }, (_, i) => 3500 + Math.sin(i / 2) * 200),
              '30d': Array.from({ length: 30 }, (_, i) => 3500 + Math.sin(i) * 300)
            },
          },
          {
            symbol: TOKEN_CONFIGS.BTC.symbol,
            name: TOKEN_CONFIGS.BTC.name,
            logoURI: TOKEN_CONFIGS.BTC.logoURI,
            balance: "0.15",
            price: 45000,
            value: 6750,
            change24h: -2.1,
            color: "#F7931A",
            priceHistory: {
              '24h': Array.from({ length: 24 }, (_, i) => 45000 + Math.sin(i / 4) * 1000),
              '7d': Array.from({ length: 7 }, (_, i) => 45000 + Math.sin(i / 2) * 2000),
              '30d': Array.from({ length: 30 }, (_, i) => 45000 + Math.sin(i) * 3000)
            },
          },
          {
            symbol: TOKEN_CONFIGS.USDC.symbol,
            name: TOKEN_CONFIGS.USDC.name,
            logoURI: TOKEN_CONFIGS.USDC.logoURI,
            balance: "5000",
            price: 1,
            value: 5000,
            change24h: 0.01,
            color: "#2775CA",
            priceHistory: {
              '24h': Array.from({ length: 24 }, () => 1),
              '7d': Array.from({ length: 7 }, () => 1),
              '30d': Array.from({ length: 30 }, () => 1)
            },
          },
          {
            symbol: TOKEN_CONFIGS.SOL.symbol,
            name: TOKEN_CONFIGS.SOL.name,
            logoURI: TOKEN_CONFIGS.SOL.logoURI,
            balance: "45",
            price: 110,
            value: 4950,
            change24h: 8.5,
            color: "#00FFA3",
            priceHistory: {
              '24h': Array.from({ length: 24 }, (_, i) => 110 + Math.sin(i / 4) * 5),
              '7d': Array.from({ length: 7 }, (_, i) => 110 + Math.sin(i / 2) * 10),
              '30d': Array.from({ length: 30 }, (_, i) => 110 + Math.sin(i) * 15)
            },
          },
        ]}
        totalValue={15500}
        totalChange24h={2.8}
      />
    ),
  },
  {
    name: "Contract Interaction",
    description: "Interact with smart contracts through an intuitive interface",
    path: "/docs/components/contract-interaction",
    preview: <ContractInteraction />,
  },
  {
    name: "Liquidity Pool Stats",
    description: "View detailed statistics and analytics for liquidity pools",
    path: "/docs/components/liquidity-pool-stats",
    preview: (
      <LiquidityPoolStats
        poolData={{
          token: {
            symbol: "ETH",
            logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=025",
            price: 1900.50,
            marketCap: 250000000000,
          },
          fee: 500,
          tvl: 548000,
          tvlChange24h: 2.5,
          volume24h: 12500000,
          volumeChange24h: -1.2,
          apr: 12.5,
          feesEarned24h: 1890,
          uniqueHolders: 15000,
          transactions24h: 25000
        }}
      />
    ),
  },
  {
    name: "Network Switcher",
    description: "Switch between different blockchain networks seamlessly",
    path: "/docs/components/network-switcher",
    preview: (
      <NetworkSwitcher
        networks={NETWORKS}
        testNetworks={TEST_NETWORKS}
        onSwitch={() => {}}
      />
    ),
  },
]; 