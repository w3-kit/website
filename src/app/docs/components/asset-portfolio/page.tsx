"use client";

import React, { useState } from "react";
import { AssetPortfolio } from "./component";
import { Code, Eye } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";
import { TOKEN_CONFIGS } from "@/config/tokens";

export default function AssetPortfolioPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [selectedVariant, setSelectedVariant] = useState<'default' | 'compact'>('default');
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");

  // Mock data for portfolio assets
  const mockAssets = [
    {
      ...TOKEN_CONFIGS.ETH,
      balance: '2.5',
      price: 3500,
      value: 8750,
      change24h: 4.2,
      color: '#627EEA'
    },
    {
      ...TOKEN_CONFIGS.BTC,
      balance: '0.15',
      price: 45000,
      value: 6750,
      change24h: -2.1,
      color: '#F7931A'
    },
    {
      ...TOKEN_CONFIGS.USDC,
      balance: '5000',
      price: 1,
      value: 5000,
      change24h: 0.01,
      color: '#2775CA'
    },
    {
      ...TOKEN_CONFIGS.SOL,
      balance: '45',
      price: 110,
      value: 4950,
      change24h: 8.5,
      color: '#00FFA3'
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
                code={`import { AssetPortfolio } from "@w3-kit/asset-portfolio";
import { TOKEN_CONFIGS } from "@/config/tokens";

const assets = ${JSON.stringify(mockAssets.slice(0, 2), null, 2)};

export default function Page() {
  return (
    <AssetPortfolio
      assets={assets}
      totalValue={${totalValue}}
      totalChange24h={${totalChange24h}}
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
                <CodeBlock code="npx w3-kit@latest add asset-portfolio" id="cli" />
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      1. Install the package using npm:
                    </p>
                    <CodeBlock code="npm install @w3-kit/asset-portfolio" id="npm" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      2. Import and use the component:
                    </p>
                    <CodeBlock
                      code={`import { AssetPortfolio } from "@w3-kit/asset-portfolio";
import { TOKEN_CONFIGS } from "@/config/tokens";

const assets = [
  {
    ...TOKEN_CONFIGS.ETH,
    balance: '2.5',
    price: 3500,
    value: 8750,
    change24h: 4.2,
    color: '#627EEA'
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
