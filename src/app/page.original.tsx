 "use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Code,
  Palette,
  Zap,
  Box,
  Layers,
  Shield,
  Download,
  Star,
  Users,
} from "lucide-react";
import { SmartContractScanner } from "@/app/docs/components/smart-contract-scanner/component";
import { AssetPortfolio } from "@/app/docs/components/asset-portfolio/component";
import { TOKEN_CONFIGS } from "@/config/tokens";
import { ContractInteraction } from "@/app/docs/components/contract-interaction/component";
import { LiquidityPoolStats } from "@/app/docs/components/liquidity-pool-stats/component";
import { NetworkSwitcher } from "@/app/docs/components/network-switcher/component";
import { NFTCard } from "@/app/docs/components/nft-card/component";
import { NETWORKS } from "./docs/components/network-switcher/networks";
import { TEST_NETWORKS } from "./docs/components/network-switcher/networks";

const stats = [
  { number: "2.5M", label: "downloads / month" },
  { number: "38.5K", label: "github stars" },
  { number: "8.9K", label: "discord members" },
];

const features = [
  {
    icon: <Code className="h-6 w-6" />,
    title: "TypeScript First",
    description:
      "Built with TypeScript for better developer experience and type safety",
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: "Customizable",
    description: "Fully customizable components with Tailwind CSS",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "High Performance",
    description: "Optimized for speed and efficiency with minimal bundle size",
  },
];

const previewComponents = [
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
        variant="default"
      />
    ),
  },
  {
    name: "Smart Contract Scanner",
    description:
      "Analyze and verify smart contracts with comprehensive security checks",
    path: "/docs/components/smart-contract-scanner",
    preview: <SmartContractScanner variant="compact" />,
  },
  {
    name: "Asset Portfolio",
    description:
      "Track and manage crypto assets with detailed portfolio analytics",
    path: "/docs/components/asset-portfolio",
    preview: (
      <AssetPortfolio
        variant="compact"
        assets={[
          {
            ...TOKEN_CONFIGS.ETH,
            balance: "2.5",
            price: 3500,
            value: 8750,
            change24h: 4.2,
            color: "#627EEA",
          },
          {
            ...TOKEN_CONFIGS.BTC,
            balance: "0.15",
            price: 45000,
            value: 6750,
            change24h: -2.1,
            color: "#F7931A",
          },
          {
            ...TOKEN_CONFIGS.USDC,
            balance: "5000",
            price: 1,
            value: 5000,
            change24h: 0.01,
            color: "#2775CA",
          },
          {
            ...TOKEN_CONFIGS.SOL,
            balance: "45",
            price: 110,
            value: 4950,
            change24h: 8.5,
            color: "#00FFA3",
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
            liquidity: 156.78,
          },
          fee: 500, // 0.05%
          tvl: 548000,
          tvlChange24h: 2.5,
          volume24h: 1250000,
          volumeChange24h: -1.2,
          apr: 12.5,
          feesEarned24h: 1890,
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

interface Position {
  x: number;
  y: number;
  placement: "top" | "bottom";
  maxHeight: number;
}

function PreviewCard({
  component,
}: {
  component: (typeof previewComponents)[0];
}) {
  const [showPreview, setShowPreview] = useState(false);
  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 0,
    placement: "top",
    maxHeight: 0,
  });
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  // Constants for preview card dimensions
  const PADDING = 20;

  const calculatePosition = (mouseX: number, mouseY: number): Position => {
    const windowHeight = window.innerHeight;
    const availableHeight = windowHeight - PADDING * 2;
    const previewHeight = Math.min(availableHeight * 0.8, 600);
    const spaceAbove = mouseY;
    const spaceBelow = windowHeight - mouseY;

    // Choose placement based on which side has more space
    const placement = spaceAbove > spaceBelow ? "top" : "bottom";

    return {
      x: mouseX,
      y: mouseY,
      placement,
      maxHeight: previewHeight,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    requestAnimationFrame(() => {
      setPosition(calculatePosition(e.clientX, e.clientY));
    });
  };

  const handleMouseEnter = () => {
    const timeout = setTimeout(() => setShowPreview(true), 150);
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setShowPreview(false);
  };

  const getPreviewStyles = () => ({
    left: `${position.x}px`,
    top:
      position.placement === "top"
        ? `${position.y - PADDING}px`
        : `${position.y + PADDING}px`,
    transform:
      position.placement === "top"
        ? "translate(-50%, -100%)"
        : "translate(-50%, 0)",
    maxHeight: `${position.maxHeight}px`,
    maxWidth: "calc(100vw - 40px)",
  });

  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Component Card */}
      <Link href={component.path} className="block">
        <div
          className="flex items-center justify-center h-32 w-48 rounded-xl 
          border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 
          transition-all duration-300 group-hover:border-gray-300 dark:group-hover:border-gray-700"
        >
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {component.name}
          </span>
        </div>
      </Link>

      {/* Preview Popup */}
      <div
        className={`fixed z-[100] w-[90vw] sm:w-[400px] md:w-[480px] lg:w-[520px] 
          bg-white dark:bg-gray-900 rounded-xl shadow-xl 
          border border-gray-200 dark:border-gray-800 overflow-hidden 
          transition-all duration-200
          ${showPreview ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        style={getPreviewStyles()}
      >
        <div className="p-3 sm:p-4 overflow-auto">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
            {component.name}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
            {component.description}
          </p>
          <div
            className="rounded-lg border border-gray-200 dark:border-gray-800 
            p-3 sm:p-4 bg-gray-50 dark:bg-gray-950"
          >
            {component.preview}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen mx-auto bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative px-6 pt-14 lg:px-8">
        {/* Floating Components */}
        <div className="absolute inset-2 overflow-hidden pointer-events-none">
          {/* Top Left */}
          <div className="absolute 
            -left-20 xs:-left-16 sm:left-16 md:left-24 
            -top-4 xs:top-0 sm:top-24 md:top-32 
            transform -rotate-12 opacity-90 animate-float-slow"
          >
            <NFTCard
              nft={{
                id: "1",
                name: "Floating NFT",
                image: "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
                owner: "0x1234...",
                tokenId: "1234",
                contractAddress: "0x1234...",
                chainId: 1,
              }}
              variant="expanded"
              className="scale-[0.35] xs:scale-[0.4] sm:scale-[0.45] md:scale-[0.55] lg:scale-[0.65]"
            />
          </div>

          {/* Top Right */}
          <div className="absolute 
            -right-20 xs:-right-16 sm:right-16 md:right-24
            -top-4 xs:top-0 sm:top-24 md:top-32
            transform rotate-12 opacity-90 animate-float-delayed"
          >
            <LiquidityPoolStats
              poolData={{
                token: {
                  symbol: "ETH",
                  logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=025",
                  liquidity: 156.78,
                },
                fee: 500,
                tvl: 548000,
                tvlChange24h: 2.5,
                volume24h: 1250000,
                volumeChange24h: -1.2,
                apr: 12.5,
                feesEarned24h: 1890,
              }}
              variant="compact"
              className="scale-[0.35] xs:scale-[0.4] sm:scale-[0.45] md:scale-[0.55] lg:scale-[0.65]"
            />
          </div>

          {/* Center Right */}
          <div className="absolute 
            -right-24 xs:-right-20 sm:right-16 md:right-32
            top-1/2 transform -translate-y-1/2 rotate-6 
            opacity-90 animate-float-reverse"
          >
            <SmartContractScanner
              variant="compact"
              className="scale-[0.3] xs:scale-[0.35] sm:scale-[0.4] md:scale-[0.45] lg:scale-[0.55]"
            />
          </div>

          {/* Bottom Left */}
          <div className="absolute 
            -left-20 xs:-left-16 sm:left-16 md:left-24
            -bottom-4 xs:bottom-0 sm:bottom-24 md:bottom-32
            transform -rotate-6 opacity-90 animate-float-reverse"
          >
            <NetworkSwitcher
              networks={[NETWORKS[0]]}
              testNetworks={[]}
              onSwitch={() => {}}
              className="scale-[0.35] xs:scale-[0.4] sm:scale-[0.45] md:scale-[0.55] lg:scale-[0.65]"
            />
          </div>

          {/* Bottom Right */}
          <div className="absolute 
            -right-20 xs:-right-16 sm:right-16 md:right-24
            -bottom-4 xs:bottom-0 sm:bottom-24 md:bottom-32
            transform rotate-6 opacity-90 animate-float"
          >
            <AssetPortfolio
              variant="compact"
              assets={[{
                ...TOKEN_CONFIGS.ETH,
                balance: "2.5",
                price: 3500,
                value: 8750,
                change24h: 4.2,
                color: "#627EEA",
              }]}
              totalValue={8750}
              totalChange24h={4.2}
              className="scale-[0.35] xs:scale-[0.4] sm:scale-[0.45] md:scale-[0.55] lg:scale-[0.65]"
            />
          </div>

          {/* Add subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white dark:from-gray-950 dark:via-transparent dark:to-gray-950 opacity-85" />
        </div>

        <div className="mx-auto max-w-2xl py-28 sm:py-32">
          <div className="text-center">
            <div className="relative z-10">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                Build faster with Web3 Components
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                A comprehensive library of accessible React components for
                building high-quality Web3 applications and dApps
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/docs/components"
                  className="rounded-full bg-gray-900 dark:bg-white px-6 py-3 text-sm font-semibold text-white dark:text-gray-900 shadow-sm hover:bg-gray-800 dark:hover:bg-gray-100"
                >
                  Get Started
                </Link>
                <pre className="hidden md:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 px-4 py-2 rounded-full">
                  <code>npm i @w3-kit/react</code>
                  <button
                    className="hover:text-gray-900 dark:hover:text-white transition-colors"
                    onClick={() =>
                      navigator.clipboard.writeText("npm i @w3-kit/react")
                    }
                  >
                    <span className="sr-only">Copy to clipboard</span>
                    <Code className="h-4 w-4" />
                  </button>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Component Preview Grid */}
        <div className="relative z-10">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-200 dark:border-gray-800" />
          </div>
          <div className="relative flex justify-center">
            <div className="w-full overflow-x-auto pb-6 hide-scrollbar">
              <div className="inline-flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 py-8 min-w-full md:min-w-0 
                animate-scroll md:animate-none whitespace-nowrap md:whitespace-normal">
                {previewComponents.map((component, index) => (
                  <React.Fragment key={component.name}>
                    <div className="flex justify-center shrink-0">
                      <PreviewCard component={component} />
                    </div>
                    {/* Clone components for infinite scroll on mobile */}
                    {index === previewComponents.length - 1 && (
                      <div className="flex md:hidden">
                        {previewComponents.map((c) => (
                          <div key={`clone-${c.name}`} className="flex justify-center shrink-0">
                            <PreviewCard component={c} />
                          </div>
                        ))}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-gray-600 dark:text-gray-400">{stat.label}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                  {stat.number}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section> */}

      {/* Features Section */}
      <section className="py-24 px-6 sm:py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Built for modern dApps
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              From next-gen startups to established enterprises, W3-Kit provides
              the building blocks for your Web3 applications
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                      {feature.icon}
                    </div>
                    {feature.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative isolate overflow-hidden">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Start building today
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-400">
              Join thousands of developers building amazing Web3 experiences
              with W3-Kit
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/docs"
                className="rounded-full bg-gray-900 dark:bg-white px-6 py-3 text-sm font-semibold text-white dark:text-gray-900 shadow-sm hover:bg-gray-800 dark:hover:bg-gray-100"
              >
                Get Started
              </Link>
              <Link
                href="https://github.com/w3-kit"
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
              >
                View on GitHub <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
