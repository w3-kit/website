"use client";

import React, { useState } from "react";
import { DeFiPositionManager, PositionData } from "./component";
import { Code, Eye } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";

const mockPositions: PositionData[] = [
  {
    id: "1",
    protocol: {
      name: "Aave",
      logoURI: "https://cryptologos.cc/logos/aave-aave-logo.png",
      type: "lending",
    },
    token: {
      symbol: "ETH",
      logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      price: 2845.67,
    },
    amount: "1.5",
    value: 4268.51,
    healthFactor: 2.5,
    apy: 3.2,
    rewards: [
      {
        token: "AAVE",
        amount: "0.05",
        value: 2.50,
      },
    ],
    risk: "low",
    lastUpdate: Date.now(),
  },
  {
    id: "2",
    protocol: {
      name: "Compound",
      logoURI: "https://cryptologos.cc/logos/compound-comp-logo.png",
      type: "borrowing",
    },
    token: {
      symbol: "USDC",
      logoURI: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
      price: 1.00,
    },
    amount: "5000",
    value: 5000,
    healthFactor: 1.8,
    apy: -2.5,
    rewards: [
      {
        token: "COMP",
        amount: "0.8",
        value: 24.00,
      },
    ],
    risk: "medium",
    lastUpdate: Date.now(),
  },
  {
    id: "3",
    protocol: {
      name: "Uniswap V3",
      logoURI: "https://cryptologos.cc/logos/uniswap-uni-logo.png",
      type: "farming",
    },
    token: {
      symbol: "USDC-ETH",
      logoURI: "https://cryptologos.cc/logos/uniswap-uni-logo.png",
      price: 1.00,
    },
    amount: "10000",
    value: 10000,
    healthFactor: 0,
    apy: 12.5,
    rewards: [
      {
        token: "UNI",
        amount: "2.5",
        value: 15.00,
      },
      {
        token: "FEE",
        amount: "0.1",
        value: 0.30,
      },
    ],
    risk: "high",
    lastUpdate: Date.now(),
  },
];

export default function DeFiPositionManagerPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");

  const handleAdjustPosition = async (positionId: string, action: "deposit" | "withdraw" | "borrow" | "repay") => {
    console.log(`Adjusting position ${positionId} with action ${action}`);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="space-y-6 py-4 sm:py-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            DeFi Position Manager
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            Unified dashboard for managing DeFi positions across lending, borrowing, and yield farming protocols.
          </p>
        </div>

        {/* Preview/Code Section */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
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
          </div>

          <div className="rounded-lg overflow-hidden">
            {activeTab === "preview" ? (
              <div className="p-20 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <DeFiPositionManager
                  positions={mockPositions}
                  onAdjustPosition={handleAdjustPosition}
                />
              </div>
            ) : (
              <CodeBlock
                code={`import { DeFiPositionManager } from "@w3-kit/defi-position-manager";

const positions = ${JSON.stringify(mockPositions, null, 2)};

export default function Positions() {
  return (
    <DeFiPositionManager
      positions={positions}
      onAdjustPosition={(positionId, action) => {
        console.log("Adjusting position:", positionId, action);
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
                <CodeBlock code="npx w3-kit@latest add defi-position-manager" id="cli" />
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      1. Install the package using npm:
                    </p>
                    <CodeBlock code="npm install @w3-kit/defi-position-manager" id="npm" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      2. Import and use the component:
                    </p>
                    <CodeBlock
                      code={`import { DeFiPositionManager } from "@w3-kit/defi-position-manager";

export default function Positions() {
  return (
    <DeFiPositionManager
      positions={positions}
      onAdjustPosition={(positionId, action) => {
        console.log("Adjusting position:", positionId, action);
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