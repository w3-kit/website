"use client";

import React, { useState } from "react";
import { AssetPortfolio } from "@/components/w3-kit/asset-portfolio";
import { Code, Eye } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";
import { TOKEN_CONFIGS } from "@/config/tokens";

// Add the CandleData type
interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Helper function to generate mock candle data
const generateCandleData = (basePrice: number, timeframe: '24h' | '7d' | '30d'): CandleData[] => {
  const length = timeframe === '24h' ? 24 : timeframe === '7d' ? 7 : 30;
  const now = new Date();
  
  return Array.from({ length }, (_, i) => {
    const time = new Date(now.getTime() - (length - i) * 3600000).toISOString();
    const volatility = basePrice * 0.02;
    const open = basePrice + (Math.random() - 0.5) * volatility;
    const close = basePrice + (Math.random() - 0.5) * volatility;
    const high = Math.max(open, close) + Math.random() * volatility;
    const low = Math.min(open, close) - Math.random() * volatility;
    
    return {
      time,
      open,
      high,
      low,
      close,
      volume: Math.random() * 1000000
    };
  });
};

// Add these helper functions at the top
const generatePriceHistory = (basePrice: number, volatility: number, length: number) => {
  return Array.from({ length }, (_, i) => {
    const change = Math.sin(i / (length / Math.PI)) * volatility;
    return basePrice + change;
  });
};

export default function AssetPortfolioPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [selectedVariant, setSelectedVariant] = useState<'default' | 'compact'>('default');
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");

  // Update mockAssets
  const mockAssets = [
    {
      ...TOKEN_CONFIGS.ADA,
      balance: '2.5',
      price: 3500,
      value: 8750,
      change24h: 4.2,
      color: '#627EEA',
      priceHistory: {
        '24h': generatePriceHistory(3500, 5, 24),
        '7d': generatePriceHistory(3500, 10, 7),
        '30d': generatePriceHistory(3500, 15, 30)
      },
      candleData: {
        '24h': generateCandleData(3500, '24h'),
        '7d': generateCandleData(3500, '7d'),
        '30d': generateCandleData(3500, '30d')
      }
    },
    {
      ...TOKEN_CONFIGS.BTC,
      balance: '0.15',
      price: 45000,
      value: 6750,
      change24h: -2.1,
      color: '#F7931A',
      priceHistory: {
        '24h': generatePriceHistory(45000, 1000, 24),
        '7d': generatePriceHistory(45000, 2000, 7),
        '30d': generatePriceHistory(45000, 3000, 30)
      },
      candleData: {
        '24h': generateCandleData(45000, '24h'),
        '7d': generateCandleData(45000, '7d'),
        '30d': generateCandleData(45000, '30d')
      }
    },
    {
      ...TOKEN_CONFIGS.USDC,
      balance: '5000',
      price: 1,
      value: 5000,
      change24h: 0.01,
      color: '#2775CA',
      priceHistory: {
        '24h': generatePriceHistory(1, 0.001, 24),
        '7d': generatePriceHistory(1, 0.002, 7),
        '30d': generatePriceHistory(1, 0.003, 30)
      },
      candleData: {
        '24h': generateCandleData(1, '24h'),
        '7d': generateCandleData(1, '7d'),
        '30d': generateCandleData(1, '30d')
      }
    },
    {
      ...TOKEN_CONFIGS.USDT,
      balance: '4500',
      price: 1,
      value: 4500,
      change24h: 0.02,
      color: '#26A17B',
      priceHistory: {
        '24h': generatePriceHistory(1, 0.001, 24),
        '7d': generatePriceHistory(1, 0.002, 7),
        '30d': generatePriceHistory(1, 0.003, 30)
      },
      candleData: {
        '24h': generateCandleData(1, '24h'),
        '7d': generateCandleData(1, '7d'),
        '30d': generateCandleData(1, '30d')
      }
    }
  ];

  const totalValue = mockAssets.reduce((sum, asset) => sum + asset.value, 0);
  const totalChange24h = 3.2; // Mock total portfolio change

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="space-y-6 py-4 sm:py-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Asset Portfolio
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            A comprehensive portfolio tracker component for displaying crypto assets with distribution charts and performance metrics.
          </p>
        </div>

        {/* Variant Selector */}
        <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-800">
          {(['default', 'compact'] as const).map((variant) => (
            <button
              key={variant}
              onClick={() => setSelectedVariant(variant)}
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                selectedVariant === variant
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              }`}
            >
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </button>
          ))}
        </div>

        {/* Preview/Code Section */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
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

          <div className="rounded-lg overflow-hidden">
            {activeTab === "preview" ? (
              <div className="p-4 bg-gray-50 dark:bg-gray-900">
                <AssetPortfolio
                  assets={mockAssets}
                  totalValue={totalValue}
                  totalChange24h={totalChange24h}
                  variant={selectedVariant}
                  onAssetClick={(asset) => console.log("Asset clicked:", asset)}
                />
              </div>
            ) : (
              <CodeBlock
                code={`import { AssetPortfolio } from "@/components/ui/asset-portfolio"
import { TOKEN_CONFIGS } from "@/config/tokens"

// Example assets data
const assets = [
  {
    ...TOKEN_CONFIGS.ETH,
    balance: '2.5',
    price: 3500,
    value: 8750,
    change24h: 4.2,
    color: '#627EEA',
    priceHistory: {
      '24h': generatePriceHistory(3500, 5, 24),
      '7d': generatePriceHistory(3500, 10, 7),
      '30d': generatePriceHistory(3500, 15, 30)
    },
    candleData: {
      '24h': generateCandleData(3500, '24h'),
      '7d': generateCandleData(3500, '7d'),
      '30d': generateCandleData(3500, '30d')
    }
  },
  {
    ...TOKEN_CONFIGS.BTC,
    balance: '0.15',
    price: 45000,
    value: 6750,
    change24h: -2.1,
    color: '#F7931A',
    priceHistory: {
      '24h': generatePriceHistory(45000, 1000, 24),
      '7d': generatePriceHistory(45000, 2000, 7),
      '30d': generatePriceHistory(45000, 3000, 30)
    },
    candleData: {
      '24h': generateCandleData(45000, '24h'),
      '7d': generateCandleData(45000, '7d'),
      '30d': generateCandleData(45000, '30d')
    }
  }
];

// Helper functions for generating price data
function generatePriceHistory(basePrice: number, volatility: number, length: number) {
  return Array.from({ length }, (_, i) => {
    const change = Math.sin(i / (length / Math.PI)) * volatility;
    return basePrice + change;
  });
}

function generateCandleData(basePrice: number, timeframe: '24h' | '7d' | '30d') {
  const length = timeframe === '24h' ? 24 : timeframe === '7d' ? 7 : 30;
  const now = new Date();
  
  return Array.from({ length }, (_, i) => ({
    time: new Date(now.getTime() - (length - i) * 3600000).toISOString(),
    open: basePrice + (Math.random() - 0.5) * basePrice * 0.02,
    high: basePrice + Math.random() * basePrice * 0.02,
    low: basePrice - Math.random() * basePrice * 0.02,
    close: basePrice + (Math.random() - 0.5) * basePrice * 0.02,
    volume: Math.random() * 1000000
  }));
}

export default function Page() {
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalChange24h = 3.2;

  return (
    <AssetPortfolio
      assets={assets}
      totalValue={totalValue}
      totalChange24h={totalChange24h}
      variant="${selectedVariant}"
      onAssetClick={(asset) => console.log("Asset clicked:", asset)}
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
                    Run the following command to add the Asset Portfolio component to your project:
                  </p>
                  <CodeBlock code="npx shadcn@latest add https://w3-kit.com/registry/asset-portfolio.json" id="cli" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                    This will:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <li>Create the component in your <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">components/ui</code> directory</li>
                    <li>Add all necessary dependencies to your package.json</li>
                    <li>Set up required configuration files</li>
                    <li>Add token configurations to your project</li>
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
                      code={`// components/ui/asset-portfolio/index.tsx
import { AssetPortfolio } from "@/components/ui/asset-portfolio/component"

export interface Asset {
  symbol: string;
  name: string;
  icon: string;
  balance: string;
  price: number;
  value: number;
  change24h: number;
  color: string;
  priceHistory: {
    '24h': number[];
    '7d': number[];
    '30d': number[];
  };
  candleData: {
    '24h': CandleData[];
    '7d': CandleData[];
    '30d': CandleData[];
  };
}

export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export { AssetPortfolio };`}
                      id="component"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      3. Use the component in your code:
                    </p>
                    <CodeBlock
                      code={`import { AssetPortfolio } from "@/components/ui/asset-portfolio"
import { TOKEN_CONFIGS } from "@/config/tokens"

const assets = [
  {
    ...TOKEN_CONFIGS.ETH,
    balance: '2.5',
    price: 3500,
    value: 8750,
    change24h: 4.2,
    color: '#627EEA',
    priceHistory: {
      '24h': [...], // Array of 24 price points
      '7d': [...],  // Array of 7 price points
      '30d': [...], // Array of 30 price points
    },
    candleData: {
      '24h': [...], // Array of 24 candle data points
      '7d': [...],  // Array of 7 candle data points
      '30d': [...], // Array of 30 candle data points
    }
  }
];

export default function Page() {
  return (
    <AssetPortfolio
      assets={assets}
      totalValue={8750}
      totalChange24h={4.2}
      onAssetClick={(asset) => console.log("Asset clicked:", asset)}
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
