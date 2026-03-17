"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Code, Check, Sparkles } from "lucide-react";
import { SmartContractScanner } from "@/components/w3-kit/smart-contract-scanner";
import { AssetPortfolio } from "@/components/w3-kit/asset-portfolio";
import { TOKEN_CONFIGS } from "@/config/tokens";
import { LiquidityPoolStats } from "@/components/w3-kit/liquidity-pool-stats";
import { NetworkSwitcher } from "@/components/w3-kit/network-switcher";
import { NFTCard } from "@/components/w3-kit/nft-card";
import { NETWORKS } from "./docs/components/network-switcher/networks";
import { PreviewCard } from "@/components/PreviewCard";
import { previewComponents } from "@/constants/preview-components";
import { features } from "@/constants/home-page-features";

// Helper function at the top of the file
const mockAssetData = {
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
};

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("npx w3-kit@latest init");
      setIsAnimating(true);
      setTimeout(() => {
        setCopied(true);
        setIsAnimating(false);
      }, 400); // Sparkle animation duration
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen mx-auto bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative px-6 pt-14 lg:px-8">
        {/* Floating Components */}
        <div className="absolute inset-2 overflow-hidden pointer-events-none">
          {/* Top Left */}
          <div
            className="absolute 
            -left-20 xs:-left-16 sm:left-16 md:left-24 
            -top-4 xs:top-0 sm:top-24 md:top-32 
            transform -rotate-12 opacity-90 animate-float-slow"
          >
            <NFTCard
              nft={{
                id: "1",
                name: "Floating NFT",
                image:
                  "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
                owner: "0x1234...",
                tokenId: "1234",
                contractAddress: "0x1234...",
                chainId: 1,
              }}
              className="scale-[0.35] xs:scale-[0.4] sm:scale-[0.45] md:scale-[0.55] lg:scale-[0.65]"
            />
          </div>

          {/* Top Right */}
          <div
            className="absolute 
            -right-20 xs:-right-16 sm:right-16 md:right-24
            -top-4 xs:top-0 sm:top-24 md:top-32
            transform rotate-12 opacity-90 animate-float-delayed"
          >
            <LiquidityPoolStats
              poolData={{
                token: {
                  symbol: "ETH",
                  logoURI:
                    "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=025",
                  price: 1900.50,
                  marketCap: 250000000000,
                },
                fee: 500,
                tvl: 548000,
                tvlChange24h: 2.5,
                volume24h: 1250000,
                volumeChange24h: -1.2,
                apr: 12.5,
                feesEarned24h: 1890,
                uniqueHolders: 15000,
                transactions24h: 25000
              }}
              className="scale-[0.35] xs:scale-[0.4] sm:scale-[0.45] md:scale-[0.55] lg:scale-[0.65]"
            />
          </div>

          {/* Center Right */}
          <div
            className="absolute 
            -right-24 xs:-right-20 sm:right-16 md:right-32
            top-1/2 transform -translate-y-1/2 rotate-6 
            opacity-90 animate-float-reverse"
          >
            <SmartContractScanner
              className="scale-[0.3] xs:scale-[0.35] sm:scale-[0.4] md:scale-[0.45] lg:scale-[0.55]"
            />
          </div>

          {/* Bottom Left */}
          <div
            className="absolute 
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
          <div
            className="absolute 
            -right-20 xs:-right-16 sm:right-16 md:right-24
            -bottom-4 xs:bottom-0 sm:bottom-24 md:bottom-32
            transform rotate-6 opacity-90 animate-float"
          >
            <AssetPortfolio
              assets={[mockAssetData]}
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
                  <code>npx w3-kit@latest init</code>
                  <button
                    className="relative hover:text-gray-900 dark:hover:text-white transition-all duration-300"
                    onClick={handleCopy}
                  >
                    <span className="sr-only">Copy to clipboard</span>
                    <div className="relative">
                      {isAnimating && (
                        <Sparkles 
                          className="absolute inset-0 h-4 w-4 text-yellow-400 animate-sparkle" 
                          style={{ 
                            transform: 'scale(1.5)',
                            opacity: 0,
                            animation: 'sparkle 0.4s ease-in-out'
                          }} 
                        />
                      )}
                      {copied ? (
                        <Check className="h-4 w-4 text-green-500 transition-all duration-300 animate-success" />
                      ) : (
                        <Code className="h-4 w-4 transition-all duration-300" />
                      )}
                    </div>
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
              <div
                className="inline-flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 py-8 min-w-full md:min-w-0 
                animate-scroll md:animate-none whitespace-nowrap md:whitespace-normal"
              >
                {previewComponents.map((component, index) => (
                  <React.Fragment key={component.name}>
                    <div className="flex justify-center shrink-0">
                      <PreviewCard component={component} />
                    </div>
                    {/* Clone components for infinite scroll on mobile */}
                    {index === previewComponents.length - 1 && (
                      <div className="flex md:hidden">
                        {previewComponents.map((c) => (
                          <div
                            key={`clone-${c.name}`}
                            className="flex justify-center shrink-0"
                          >
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
    </div>
  );
}