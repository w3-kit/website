"use client";

import React, { useState, useCallback } from "react";
import { WalletBalance } from "@/components/w3-kit/wallet-balance";
import { Code, Eye } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";

// Define the Token interface
interface Token {
  symbol: string;
  name: string;
  balance: string;
  price: number;
  decimals: number;
  logoURI: string;
  address?: string;
  chainId?: number;
}

// Mock tokens data
const mockTokens: Token[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    balance: "1.5",
    price: 1900.50,
    decimals: 18,
    logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    chainId: 1
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    balance: "0.05",
    price: 35000,
    decimals: 8,
    logoURI: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    chainId: 1
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    balance: "1000",
    price: 1,
    decimals: 6,
    logoURI: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    chainId: 1
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    balance: "500",
    price: 1,
    decimals: 6,
    logoURI: "https://cryptologos.cc/logos/tether-usdt-logo.png",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    chainId: 1
  },
  {
    symbol: "SOL",
    name: "Solana",
    balance: "25",
    price: 125.75,
    decimals: 9,
    logoURI: "https://cryptologos.cc/logos/solana-sol-logo.png",
    address: "0xD31a59c85aE9D8edABeE8863861aD8c37f08D32c",
    chainId: 1
  }
];

export default function WalletBalancePage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");
  const [selectedVariant, setSelectedVariant] = useState<'default' | 'compact'>('default');
  const [tokens] = useState<Token[]>(mockTokens);

  const handleTokenClick = useCallback((token: Token) => {
    console.log("Selected token:", token);
    // Simulate token details view
    if (token.address) {
      window.open(`https://etherscan.io/token/${token.address}`, "_blank");
    }
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="space-y-6 py-4 sm:py-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Wallet Balance
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            A component for displaying token balances and total portfolio value with multiple layout options.
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
                  Total Value: ${tokens.reduce((sum, t) => sum + Number(t.balance) * t.price, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <WalletBalance
                  tokens={tokens}
                  onTokenClick={handleTokenClick}
                />
              </div>
            ) : (
              <CodeBlock
                code={`import { WalletBalance } from "@/components/ui/wallet-balance"
import { useState, useCallback } from "react"

interface Token {
  symbol: string;
  name: string;
  balance: string;
  price: number;
  decimals: number;
  logoURI: string;
  address?: string;
  chainId?: number;
}

const tokens = ${JSON.stringify(mockTokens, null, 2)};

export default function Page() {
  const [tokens, setTokens] = useState<Token[]>(tokens);
  const [selectedVariant, setSelectedVariant] = useState<'default' | 'compact'>('default');

  const handleTokenClick = useCallback((token: Token) => {
    console.log("Selected token:", token);
    // Simulate token details view
    if (token.address) {
      window.open(\`https://etherscan.io/token/\${token.address}\`, "_blank");
    }
  }, []);

  return (
    <div>
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Total Value: ${tokens.reduce((sum, t) => sum + Number(t.balance) * t.price, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
      <WalletBalance
        tokens={tokens}
        variant={selectedVariant}
        onTokenClick={handleTokenClick}
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
                    Run the following command to add the Wallet Balance component to your project:
                  </p>
                  <CodeBlock code="npx shadcn@latest add https://w3-kit.com/registry/wallet-balance.json" id="cli" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                    This will:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <li>Create the component in your <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">components/ui</code> directory</li>
                    <li>Add all necessary dependencies to your package.json</li>
                    <li>Set up required configuration files</li>
                    <li>Add token formatting utilities to your project</li>
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
                      code={`// components/ui/wallet-balance/index.tsx
import { WalletBalance } from "@/components/ui/wallet-balance/component"

export interface Token {
  symbol: string;
  name: string;
  balance: string;
  price: number;
  decimals: number;
  logoURI: string;
  address?: string;
  chainId?: number;
}

export interface WalletBalanceProps {
  tokens: Token[];
  variant?: 'default' | 'compact';
  onTokenClick?: (token: Token) => void;
  className?: string;
}

export { WalletBalance };`}
                      id="component"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      3. Use the component in your code:
                    </p>
                    <CodeBlock
                      code={`import { WalletBalance } from "@/components/ui/wallet-balance"
import { useState, useCallback } from "react"

interface Token {
  symbol: string;
  name: string;
  balance: string;
  price: number;
  decimals: number;
  logoURI: string;
  address?: string;
  chainId?: number;
}

const tokens = ${JSON.stringify(mockTokens, null, 2)};

export default function Page() {
  const [tokens, setTokens] = useState<Token[]>(tokens);
  const [selectedVariant, setSelectedVariant] = useState<'default' | 'compact'>('default');

  const handleTokenClick = useCallback((token: Token) => {
    console.log("Selected token:", token);
    // Simulate token details view
    if (token.address) {
      window.open(\`https://etherscan.io/token/\${token.address}\`, "_blank");
    }
  }, []);

  return (
    <div>
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Total Value: ${tokens.reduce((sum, t) => sum + Number(t.balance) * t.price, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
      <WalletBalance
        tokens={tokens}
        variant={selectedVariant}
        onTokenClick={handleTokenClick}
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
