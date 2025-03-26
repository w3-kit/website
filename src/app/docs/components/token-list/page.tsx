"use client";

import React, { useState, useCallback } from "react";
import { TokenList } from "./component";
import { Code, Eye } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";
import { TOKEN_CONFIGS } from '../../../../config/tokens';
import { Token } from "./types";

// Mock data using TOKEN_CONFIGS
const mockTokens: Token[] = [
  {
    ...TOKEN_CONFIGS.ETH,
    balance: "1.5",
    price: 1900.50,
    value: 2850.75,
    chainId: 1
  },
  {
    ...TOKEN_CONFIGS.BTC,
    balance: "0.05",
    price: 35000,
    value: 1750,
    chainId: 1
  },
  {
    ...TOKEN_CONFIGS.USDC,
    balance: "1000",
    price: 1,
    value: 1000,
    chainId: 1
  },
  {
    ...TOKEN_CONFIGS.USDT,
    balance: "500",
    price: 1,
    value: 500,
    chainId: 1
  },
  {
    ...TOKEN_CONFIGS.SOL,
    balance: "25",
    price: 125.75,
    value: 3143.75,
    chainId: 1
  }
];

export default function TokenListPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");
  const [selectedVariant, setSelectedVariant] = useState<'grid' | 'list' | 'table'>('table');
  const [tokens, setTokens] = useState<Token[]>(mockTokens);

  const handleTokenSelect = useCallback((token: Token) => {
    console.log("Selected token:", token);
    // Simulate price update
    setTokens(prev => prev.map(t => 
      t.symbol === token.symbol 
        ? {
            ...t,
            price: t.price ? t.price * (1 + (Math.random() - 0.5) * 0.01) : undefined,
            value: t.price && t.balance ? Number(t.balance) * t.price : undefined
          }
        : t
    ));
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="space-y-6 py-4 sm:py-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Token List
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            A customizable component for displaying token balances and prices with multiple layout options.
          </p>
        </div>

        {/* Variant Selector */}
        <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-800">
          {(['grid', 'list', 'table'] as const).map((variant) => (
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
                <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  Total Value: ${tokens.reduce((sum, t) => sum + (t.value ?? 0), 0).toFixed(2)}
                </div>
                <TokenList
                  tokens={tokens}
                  onTokenSelect={handleTokenSelect}
                  variant={selectedVariant}
                  showPrices={true}
                  showValue={true}
                  showBalances={true}
                />
              </div>
            ) : (
              <CodeBlock
                code={`import { TokenList } from "@/components/ui/token-list"
import { useState, useCallback } from "react"

const tokens = ${JSON.stringify(mockTokens, null, 2)};

export default function Page() {
  const [tokens, setTokens] = useState(tokens);
  const [selectedVariant, setSelectedVariant] = useState<'grid' | 'list' | 'table'>('table');

  const handleTokenSelect = useCallback((token: Token) => {
    console.log("Selected token:", token);
    // Simulate price update
    setTokens(prev => prev.map(t => 
      t.symbol === token.symbol 
        ? {
            ...t,
            price: t.price ? t.price * (1 + (Math.random() - 0.5) * 0.01) : undefined,
            value: t.price && t.balance ? Number(t.balance) * t.price : undefined
          }
        : t
    ));
  }, []);

  return (
    <div>
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Total Value: ${tokens.reduce((sum, t) => sum + (t.value ?? 0), 0).toFixed(2)}
      </div>
      <TokenList
        tokens={tokens}
        onTokenSelect={handleTokenSelect}
        variant={selectedVariant}
        showPrices={true}
        showValue={true}
        showBalances={true}
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
                    Run the following command to add the Token List component to your project:
                  </p>
                  <CodeBlock code="npx w3-kit@latest add token-list" id="cli" />
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
                      code={`// components/ui/token-list/index.tsx
import { TokenList } from "@/components/ui/token-list/component"

export interface Token {
  symbol: string;
  name: string;
  balance: string;
  value: number;
  price: number;
  priceChange24h: number;
  logoURI: string;
  address: string;
  decimals: number;
  chainId: number;
}

export interface TokenListProps {
  tokens: Token[];
  onTokenSelect?: (token: Token) => void;
  variant?: 'grid' | 'list' | 'table';
  showPrices?: boolean;
  showValue?: boolean;
  showBalances?: boolean;
  className?: string;
}

export { TokenList };`}
                      id="component"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      3. Use the component in your code:
                    </p>
                    <CodeBlock
                      code={`import { TokenList } from "@/components/ui/token-list"
import { useState, useCallback } from "react"

const tokens = ${JSON.stringify(mockTokens, null, 2)};

export default function Page() {
  const [tokens, setTokens] = useState(tokens);
  const [selectedVariant, setSelectedVariant] = useState<'grid' | 'list' | 'table'>('table');

  const handleTokenSelect = useCallback((token: Token) => {
    console.log("Selected token:", token);
    // Simulate price update
    setTokens(prev => prev.map(t => 
      t.symbol === token.symbol 
        ? {
            ...t,
            price: t.price ? t.price * (1 + (Math.random() - 0.5) * 0.01) : undefined,
            value: t.price && t.balance ? Number(t.balance) * t.price : undefined
          }
        : t
    ));
  }, []);

  return (
    <div>
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Total Value: ${tokens.reduce((sum, t) => sum + (t.value ?? 0), 0).toFixed(2)}
      </div>
      <TokenList
        tokens={tokens}
        onTokenSelect={handleTokenSelect}
        variant={selectedVariant}
        showPrices={true}
        showValue={true}
        showBalances={true}
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
