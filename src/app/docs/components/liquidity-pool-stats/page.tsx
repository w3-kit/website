"use client";

import React, { useState } from "react";
import { LiquidityPoolStats } from "@/components/w3-kit/liquidity-pool-stats";
import { Code, Eye } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";
import { PoolData } from "@/components/w3-kit/liquidity-pool-stats-types";

export default function LiquidityPoolStatsPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");

  // Mock data for preview
  const mockPool: PoolData = {
    token: {
      symbol: "ETH-USDC",
      logoURI: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
      price: 2845.67,
      marketCap: 345678901.23,
    },
    fee: 3000, // 0.3%
    tvl: 456789123.45,
    tvlChange24h: 5.67,
    volume24h: 89012345.67,
    volumeChange24h: -2.34,
    apr: 12.34,
    feesEarned24h: 23456.78,
    uniqueHolders: 45678,
    transactions24h: 3456,
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="space-y-6 py-4 sm:py-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Liquidity Pool Stats
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            A component for displaying detailed statistics and metrics for liquidity pools.
          </p>
        </div>

        {/* Preview/Code Section */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between overflow-x-auto">
            <div className="flex items-center space-x-2 min-w-full sm:min-w-0">
              <button
                onClick={() => setActiveTab("preview")}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ${
                  activeTab === "preview"
                    ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ${
                  activeTab === "code"
                    ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Code className="mr-2 h-4 w-4" />
                Code
              </button>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden">
            {activeTab === "preview" ? (
              <div className="p-20 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <LiquidityPoolStats
                  poolData={mockPool}
                />
              </div>
            ) : (
              <CodeBlock
                code={`import { LiquidityPoolStats } from "@/components/ui/liquidity-pool-stats"
import { useState } from "react"

export default function Page() {
  const [selectedVariant, setSelectedVariant] = useState<'default' | 'compact'>('default');

  const poolData = {
    token: {
      symbol: "ETH-USDC",
      logoURI: "/tokens/eth-usdc.svg",
      liquidity: 245678.34,
      price: 2845.67,
      marketCap: 345678901.23,
      totalSupply: 120000000,
      circulatingSupply: 118500000,
    },
    fee: 3000, // 0.3%
    tvl: 456789123.45,
    tvlChange24h: 5.67,
    volume24h: 89012345.67,
    volumeChange24h: -2.34,
    apr: 12.34,
    feesEarned24h: 23456.78,
    uniqueHolders: 45678,
    transactions24h: 3456,
  };

  return (
    <LiquidityPoolStats
      poolData={poolData}
      variant={selectedVariant}
      onTokenClick={(pairId) => {
        console.log("Token pair clicked:", pairId);
      }}
    />
  );
}`}
                id="component"
              />
            )}
          </div>
        </div>

        {/* Installation Section */}
        <div className="space-y-4 mt-8 sm:mt-12">
          <h2 className="text-xl sm:text-2xl font-semibold border-b border-gray-200 dark:border-gray-800 pb-2 text-gray-900 dark:text-white">
            Installation
          </h2>

          <div className="space-y-4">
            <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-800">
              <button
                onClick={() => setInstallTab("cli")}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  installTab === "cli"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                }`}
              >
                CLI
              </button>
              <button
                onClick={() => setInstallTab("manual")}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  installTab === "manual"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                }`}
              >
                Manual
              </button>
            </div>

            <div className="mt-4">
              {installTab === "cli" ? (
                <>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Run the following command to add the Liquidity Pool Stats component to your project:
                  </p>
                  <CodeBlock code="npx shadcn@latest add https://w3-kit.com/registry/liquidity-pool-stats.json" id="cli" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                    This will:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <li>Create the component in your <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">components/ui</code> directory</li>
                    <li>Add all necessary dependencies to your package.json</li>
                    <li>Set up required configuration files</li>
                    <li>Add pool statistics utilities to your project</li>
                  </ul>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      1. Initialize W3-Kit in your project if you haven&apos;t already:
                    </p>
                    <CodeBlock code="npx w3-kit@latest init" id="init" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      2. Copy the component to your project:
                    </p>
                    <CodeBlock
                      code={`// components/ui/liquidity-pool-stats/index.tsx
import { LiquidityPoolStats } from "@/components/ui/liquidity-pool-stats/component"

export interface Token {
  symbol: string;
  logoURI: string;
  liquidity: number;
  price: number;
  marketCap: number;
  totalSupply: number;
  circulatingSupply: number;
}

export interface PoolData {
  token: Token;
  fee: number;
  tvl: number;
  tvlChange24h: number;
  volume24h: number;
  volumeChange24h: number;
  apr: number;
  feesEarned24h: number;
  uniqueHolders: number;
  transactions24h: number;
}

export interface LiquidityPoolStatsProps {
  poolData: PoolData;
  variant?: 'default' | 'compact';
  isLoading?: boolean;
  onTokenClick?: (pairId: string) => void;
  className?: string;
}

export { LiquidityPoolStats };`}
                      id="component"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      3. Use the component in your code:
                    </p>
                    <CodeBlock
                      code={`import { LiquidityPoolStats } from "@/components/ui/liquidity-pool-stats"
import { useState } from "react"

export default function Page() {
  const [selectedVariant, setSelectedVariant] = useState<'default' | 'compact'>('default');

  const poolData = {
    token: {
      symbol: "ETH-USDC",
      logoURI: "/tokens/eth-usdc.svg",
      liquidity: 245678.34,
      price: 2845.67,
      marketCap: 345678901.23,
      totalSupply: 120000000,
      circulatingSupply: 118500000,
    },
    fee: 3000, // 0.3%
    tvl: 456789123.45,
    tvlChange24h: 5.67,
    volume24h: 89012345.67,
    volumeChange24h: -2.34,
    apr: 12.34,
    feesEarned24h: 23456.78,
    uniqueHolders: 45678,
    transactions24h: 3456,
  };

  return (
    <LiquidityPoolStats
      poolData={poolData}
      variant={selectedVariant}
      onTokenClick={(pairId) => {
        console.log("Token pair clicked:", pairId);
      }}
    />
  );
}`}
                      id="usage"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
