"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Code, Check } from "lucide-react";
import { AssetPortfolio } from "@/components/w3-kit/asset-portfolio";
import { TOKEN_CONFIGS } from "@/config/tokens";

const heroAssets = [
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
      "24h": Array.from({ length: 24 }, (_, i) => 3500 + Math.sin(i / 4) * 100),
      "7d": Array.from({ length: 7 }, (_, i) => 3500 + Math.sin(i / 2) * 200),
      "30d": Array.from({ length: 30 }, (_, i) => 3500 + Math.sin(i) * 300),
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
      "24h": Array.from({ length: 24 }, (_, i) => 45000 + Math.sin(i / 4) * 1000),
      "7d": Array.from({ length: 7 }, (_, i) => 45000 + Math.sin(i / 2) * 2000),
      "30d": Array.from({ length: 30 }, (_, i) => 45000 + Math.sin(i) * 3000),
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
      "24h": Array.from({ length: 24 }, () => 1),
      "7d": Array.from({ length: 7 }, () => 1),
      "30d": Array.from({ length: 30 }, () => 1),
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
      "24h": Array.from({ length: 24 }, (_, i) => 110 + Math.sin(i / 4) * 5),
      "7d": Array.from({ length: 7 }, (_, i) => 110 + Math.sin(i / 2) * 10),
      "30d": Array.from({ length: 30 }, (_, i) => 110 + Math.sin(i) * 15),
    },
  },
];

export function HeroSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("npx w3-kit@latest init");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <section className="px-6 lg:px-8 py-28">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-8 inline-flex items-center rounded-full border border-gray-200 dark:border-gray-800 px-4 py-1.5 text-sm text-gray-600 dark:text-gray-400">
          v1.0 — 30+ Web3 Components
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-gray-900 dark:text-white">
          Build faster with Web3 Components
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A comprehensive library of accessible React components for building
          high-quality Web3 applications and dApps
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-4">
          <Link
            href="/docs/installation"
            className="rounded-full bg-gray-900 dark:bg-white px-6 py-3 text-sm font-semibold text-white dark:text-gray-900 shadow-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Get Started
          </Link>
          <button
            onClick={handleCopy}
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-4 py-3 text-sm font-mono text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <code>npx w3-kit@latest init</code>
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Code className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-3xl">
        <div
          className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden"
          aria-label="Interactive Asset Portfolio demo component"
        >
          <AssetPortfolio
            assets={heroAssets}
            totalValue={25450}
            totalChange24h={2.8}
          />
        </div>
      </div>
    </section>
  );
}
