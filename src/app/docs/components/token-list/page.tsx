"use client";

import React, { useState } from "react";
import { TokenList } from "./component";
import { Code, Eye } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";
import { TOKEN_CONFIGS, TokenSymbol } from '../../../../config/tokens';

export default function TokenListPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");

  // Mock data using TOKEN_CONFIGS
  const mockTokens = [
    {
      ...TOKEN_CONFIGS.ETH,
      balance: "1.5", // 1.5 ETH
      price: 1900.50,
      value: 2850.75,
    },

    {
      ...TOKEN_CONFIGS.BTC,
      balance: "0.05", // 0.05 BTC
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
            A customizable component for displaying token balances and prices with real-time updates
            and sorting capabilities.
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
                <TokenList
                  tokens={mockTokens}
                  onTokenSelect={(token) => console.log("Selected:", token)}
                  variant="table"
                  showPrices={true}
                  showValue={true}
                  showBalances={true}
                />
            ) : (
              <CodeBlock
                code={`import { TokenList } from "@w3-kit/token-list";

const tokens = [
  {
    symbol: "ETH",
    name: "Ethereum",
    balance: "1.5",
    value: 2850.75,
    price: 1900.50,
    change24h: 2.5,
    logoURI: "https://ethereum.org/eth-logo.png"
  }
];

export default function Page() {
  return (
    <TokenList
      tokens={tokens}
      onTokenClick={(token) => console.log("Token clicked:", token)}
      showPrice={true}
      showChange={true}
      showValue={true}
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
                <CodeBlock code="npx w3-kit@latest add token-list" id="cli" />
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      1. Install the package using npm:
                    </p>
                    <CodeBlock code="npm install @w3-kit/token-list" id="npm" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      2. Import and use the component:
                    </p>
                    <CodeBlock
                      code={`import { TokenList } from "@w3-kit/token-list";

const tokens = [
  {
    symbol: "ETH",
    name: "Ethereum",
    balance: "1.5",
    value: 2850.75,
    price: 1900.50,
    change24h: 2.5,
    logoURI: "https://ethereum.org/eth-logo.png"
  }
];

export default function Page() {
  return (
    <TokenList
      tokens={tokens}
      onTokenClick={(token) => console.log("Token clicked:", token)}
      showPrice={true}
      showChange={true}
      showValue={true}
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
