"use client";

import React, { useState } from "react";
import { TokenList } from "./component";
import { Code, Eye } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";
import { TOKEN_CONFIGS, TokenSymbol } from '../../../../config/tokens';

export default function TokenListPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [selectedVariant, setSelectedVariant] = useState<'grid' | 'list' | 'table'>('table');

  // Mock data using TOKEN_CONFIGS
  const mockTokens = [
    {
      ...TOKEN_CONFIGS.ETH,
      balance: "1.5",
      price: 1900.50,
      value: 2850.75,
    },
    {
      ...TOKEN_CONFIGS.BTC,
      balance: "0.05",
      price: 35000,
      value: 1750,
    },
    {
      ...TOKEN_CONFIGS.USDC,
      balance: "1000", // 1000 USDC
      price: 1,
      value: 1000,
    },
    {
      ...TOKEN_CONFIGS.USDT,
      balance: "500", // 500 USDT
      price: 1,
      value: 500,
    },
    {
      ...TOKEN_CONFIGS.SOL,
      balance: "25", // 25 SOL
      price: 125.75,
      value: 3143.75,
    },
    {
      ...TOKEN_CONFIGS.MATIC,
      balance: "1000", // 1000 MATIC
      price: 0.85,
      value: 850,
    },
    {
      ...TOKEN_CONFIGS.LINK,
      balance: "100", // 100 LINK
      price: 15.20,
      value: 1520,
    },
    {
      ...TOKEN_CONFIGS.DOT,
      balance: "150", // 150 DOT
      price: 7.50,
      value: 1125,
    },
    {
      ...TOKEN_CONFIGS.AVAX,
      balance: "50", // 50 AVAX
      price: 35.80,
      value: 1790,
    }
  ];

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
              <TokenList
                tokens={mockTokens}
                onTokenSelect={(token) => console.log("Selected:", token)}
                variant={selectedVariant}
                showPrices={true}
                showValue={true}
                showBalances={true}
              />
            ) : (
              <CodeBlock
                code={`import { TokenList } from "@/components/token-list";

const tokens = ${JSON.stringify(mockTokens.slice(0, 1), null, 2)};

export default function Page() {
  return (
    <TokenList
      tokens={tokens}
      variant="${selectedVariant}"
      onTokenSelect={(token) => console.log("Selected:", token)}
      showPrices={true}
      showValue={true}
      showBalances={true}
    />
  );
}`}
                id="component"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
