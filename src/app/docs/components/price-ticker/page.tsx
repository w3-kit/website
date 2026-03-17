"use client";

import React, { useState, useCallback } from "react";
import { PriceTicker } from "@/components/w3-kit/price-ticker";
import { Code, Eye } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";

interface Token {
  name: string;
  symbol: string;
  price: number;
  priceChange: {
    "1h": number;
    "24h": number;
    "7d": number;
    "30d": number;
  };
  marketCap: number;
  volume: {
    "24h": number;
  };
  circulatingSupply: number;
  maxSupply: number | null;
  logoURI: string;
  lastUpdated: string;
}

export default function PriceTickerPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");
  const [selectedToken, setSelectedToken] = useState<string | null>(null);

  // Mock data for preview
  const mockData: Token[] = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: 50000,
      priceChange: {
        "1h": 0.5,
        "24h": 2.3,
        "7d": -1.2,
        "30d": 15.4
      },
      marketCap: 950000000000,
      volume: {
        "24h": 25000000000
      },
      circulatingSupply: 19000000,
      maxSupply: 21000000,
      logoURI: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
      lastUpdated: new Date().toISOString()
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: 3000,
      priceChange: {
        "1h": -0.2,
        "24h": 1.5,
        "7d": 3.2,
        "30d": 10.1
      },
      marketCap: 350000000000,
      volume: {
        "24h": 15000000000
      },
      circulatingSupply: 120000000,
      maxSupply: null,
      logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      lastUpdated: new Date().toISOString()
    }
  ];

  const handleTokenSelect = useCallback((token: string) => {
    setSelectedToken(token);
    console.log("Selected token:", token);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="space-y-6 py-4 sm:py-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Price Ticker
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            A real-time cryptocurrency price ticker component with price changes, volume, and market cap information.
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
                <PriceTicker
                  tokens={mockData}
                />
              </div>
            ) : (
              <CodeBlock
                code={`import { PriceTicker } from "@/components/ui/price-ticker"
import { useState, useCallback } from "react"

interface Token {
  name: string;
  symbol: string;
  price: number;
  priceChange: {
    "1h": number;
    "24h": number;
    "7d": number;
    "30d": number;
  };
  marketCap: number;
  volume: {
    "24h": number;
  };
  circulatingSupply: number;
  maxSupply: number | null;
  logoURI: string;
  lastUpdated: string;
}

export default function Page() {
  const [selectedToken, setSelectedToken] = useState<string | null>(null);

  const handleTokenSelect = useCallback((token: string) => {
    setSelectedToken(token);
    console.log("Selected token:", token);
  }, []);

  return (
    <PriceTicker
      tokens={[
        {
          name: "Bitcoin",
          symbol: "BTC",
          price: 50000,
          priceChange: {
            "1h": 0.5,
            "24h": 2.3,
            "7d": -1.2,
            "30d": 15.4
          },
          marketCap: 950000000000,
          volume: {
            "24h": 25000000000
          },
          circulatingSupply: 19000000,
          maxSupply: 21000000,
          logoURI: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
          lastUpdated: new Date().toISOString()
        }
      ]}
      onTokenSelect={handleTokenSelect}
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
                    Run the following command to add the Price Ticker component to your project:
                  </p>
                  <CodeBlock code="npx shadcn@latest add https://w3-kit.com/registry/price-ticker.json" id="cli" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                    This will:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <li>Create the component in your <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">components/ui</code> directory</li>
                    <li>Add all necessary dependencies to your package.json</li>
                    <li>Set up required configuration files</li>
                    <li>Add price data fetching utilities to your project</li>
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
                      code={`// components/ui/price-ticker/index.tsx
import { PriceTicker } from "@/components/ui/price-ticker/component"

export interface Token {
  name: string;
  symbol: string;
  price: number;
  priceChange: {
    "1h": number;
    "24h": number;
    "7d": number;
    "30d": number;
  };
  marketCap: number;
  volume: {
    "24h": number;
  };
  circulatingSupply: number;
  maxSupply: number | null;
  logoURI: string;
  lastUpdated: string;
}

export interface PriceTickerProps {
  tokens: Token[];
  onTokenSelect?: (token: string) => void;
  className?: string;
}

export { PriceTicker };`}
                      id="component"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      3. Use the component in your code:
                    </p>
                    <CodeBlock
                      code={`import { PriceTicker } from "@/components/ui/price-ticker"
import { useState, useCallback } from "react"

interface Token {
  name: string;
  symbol: string;
  price: number;
  priceChange: {
    "1h": number;
    "24h": number;
    "7d": number;
    "30d": number;
  };
  marketCap: number;
  volume: {
    "24h": number;
  };
  circulatingSupply: number;
  maxSupply: number | null;
  logoURI: string;
  lastUpdated: string;
}

export default function Page() {
  const [selectedToken, setSelectedToken] = useState<string | null>(null);

  const handleTokenSelect = useCallback((token: string) => {
    setSelectedToken(token);
    console.log("Selected token:", token);
  }, []);

  return (
    <PriceTicker
      tokens={[
        {
          name: "Bitcoin",
          symbol: "BTC",
          price: 50000,
          priceChange: {
            "1h": 0.5,
            "24h": 2.3,
            "7d": -1.2,
            "30d": 15.4
          },
          marketCap: 950000000000,
          volume: {
            "24h": 25000000000
          },
          circulatingSupply: 19000000,
          maxSupply: 21000000,
          logoURI: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
          lastUpdated: new Date().toISOString()
        }
      ]}
      onTokenSelect={handleTokenSelect}
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

        {/* Features Section */}
        <div className="space-y-4 mt-8 sm:mt-12">
          <h2 className="text-xl sm:text-2xl font-semibold border-b border-gray-200 dark:border-gray-800 pb-2 text-gray-900 dark:text-white">
            Features
          </h2>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Real-time Updates</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Live price updates with configurable refresh intervals and WebSocket support.
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Price Changes</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Track price changes across multiple timeframes with visual indicators.
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Market Data</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Display market cap, volume, and supply information for each token.
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Token Selection</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Interactive token selection with customizable click handlers and callbacks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
