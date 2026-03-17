"use client";

import React, { useState, useCallback } from "react";
import { TokenCard } from "@/components/w3-kit/token-card";
import { Code, Eye } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";
import { Token } from "@/components/w3-kit/token-card-types";

// Create mock token data
const mockToken: Token = {
  symbol: "ETH",
  name: "Ethereum",
  balance: "1.5",
  price: 1900.50,
  priceChange24h: 2.5,
  logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=040",
};

export default function TokenCardPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");
  const [token, setToken] = useState<Token>(mockToken);

  const handleTokenClick = useCallback((token: Token) => {
    setToken(prev => ({
      ...prev,
      price: prev.price ?? token.price,
      priceChange24h: prev.priceChange24h ?? token.priceChange24h
    }));
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="space-y-6 py-4 sm:py-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Token Card
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            A customizable card component for displaying individual token information with real-time price updates.
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
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Price: {token.price ? `$${token.price.toFixed(2)}` : 'N/A'}
                  {token.priceChange24h !== undefined && (
                    <span className={`ml-2 ${token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
                    </span>
                  )}
                </div>
                <TokenCard
                  token={token}
                  onClick={handleTokenClick}
                />
              </div>
            ) : (
              <CodeBlock
                code={`import { TokenCard } from "@/components/ui/token-card"
import { useState, useCallback } from "react"

interface ExtendedToken extends Token {
  priceChange24h?: number;
  verified?: boolean;
  marketCap?: number;
  volume24h?: number;
  allTimeHigh?: number;
  allTimeHighDate?: string;
  rank?: number;
}

const mockToken: ExtendedToken = ${JSON.stringify(mockToken, null, 2)};

export default function Page() {
  const [token, setToken] = useState(mockToken);

  const handleTokenClick = useCallback((token: ExtendedToken) => {
    setToken(prev => ({
      ...prev,
      price: prev.price ?? token.price,
      priceChange24h: prev.priceChange24h ?? token.priceChange24h
    }));
  }, []);

  return (
    <div>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Price: {token.price ? \`$\${token.price.toFixed(2)}\` : 'N/A'}
        {token.priceChange24h !== undefined && (
          <span className={\`ml-2 \${token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}\`}>
            {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
          </span>
        )}
      </div>
      <TokenCard
        token={token}
        showPrice={true}
        showPriceChange={true}
        showBalance={true}
        onClick={handleTokenClick}
      />
    </div>
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
                    Run the following command to add the Token Card component to your project:
                  </p>
                  <CodeBlock code="npx shadcn@latest add https://w3-kit.com/registry/token-card.json" id="cli" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                    This will:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <li>Create the component in your <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">components/ui</code> directory</li>
                    <li>Add all necessary dependencies to your package.json</li>
                    <li>Set up required configuration files</li>
                    <li>Add token price fetching utilities to your project</li>
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
                      code={`// components/ui/token-card/index.tsx
import { TokenCard } from "@/components/ui/token-card/component"

export interface Token {
  symbol: string;
  name: string;
  balance: string;
  value: number;
  price: number;
  change24h: number;
  logoURI: string;
  address: string;
  decimals: number;
  chainId: number;
}

export interface TokenCardProps {
  token: Token;
  onTokenClick?: (token: Token) => void;
  showPrice?: boolean;
  showChange?: boolean;
  showValue?: boolean;
  className?: string;
}

export { TokenCard };`}
                      id="component"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      3. Use the component in your code:
                    </p>
                    <CodeBlock
                      code={`import { TokenCard } from "@/components/ui/token-card"
import { useState, useCallback } from "react"

const token = {
  symbol: "ETH",
  name: "Ethereum",
  balance: "1.5",
  value: 2850.75,
  price: 1900.50,
  priceChange24h: 2.5,
  logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=040",
  address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  decimals: 18,
  chainId: 1,
  verified: true,
  marketCap: 250000000000,
  volume24h: 15000000000,
  allTimeHigh: 4800.00,
  allTimeHighDate: "2021-11-10",
  rank: 1
};

export default function Page() {
  const [token, setToken] = useState(token);

  const handleTokenClick = useCallback((token: ExtendedToken) => {
    console.log("Token clicked:", token);
    // Simulate price update
    setToken(prev => ({
      ...prev,
      price: prev.price * (1 + (Math.random() - 0.5) * 0.01),
      priceChange24h: prev.priceChange24h + (Math.random() - 0.5) * 0.5
    }));
  }, []);

  return (
    <div>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Price: {token.price ? \`$\${token.price.toFixed(2)}\` : 'N/A'}
        {token.priceChange24h !== undefined && (
          <span className={\`ml-2 \${token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}\`}>
            {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
          </span>
        )}
      </div>
      <TokenCard
        token={token}
        showPrice={true}
        showPriceChange={true}
        showBalance={true}
      />
    </div>
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
