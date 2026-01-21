"use client";

import React, { useState, useCallback } from "react";
import { StakingInterface } from "@/components/w3-kit/staking-interface";
import { Code, Eye } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";
import { TOKEN_CONFIGS } from "@/config/tokens";

export default function StakingInterfacePage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");
  const [selectedPool, setSelectedPool] = useState<string | null>(null);

  // Mock data for staking pools using TOKEN_CONFIGS
  const mockPools = [
    {
      id: '2',
      name: 'USDC Yield Pool',
      token: {
        symbol: TOKEN_CONFIGS.USDC.symbol,
        logoURI: TOKEN_CONFIGS.USDC.logoURI,
        decimals: TOKEN_CONFIGS.USDC.decimals
      },
      apr: 8.2,
      minStake: '100',
      lockPeriod: 30,
      totalStaked: '5000000'
    },
    {
      id: '3',
      name: 'BTC Liquidity Pool',
      token: {
        symbol: TOKEN_CONFIGS.BTC.symbol,
        logoURI: TOKEN_CONFIGS.BTC.logoURI,
        decimals: TOKEN_CONFIGS.BTC.decimals
      },
      apr: 6.5,
      minStake: '0.1',
      lockPeriod: 90,
      totalStaked: '2500'
    },
    {
      id: '4',
      name: 'MATIC Staking',
      token: {
        symbol: TOKEN_CONFIGS.MATIC.symbol,
        logoURI: TOKEN_CONFIGS.MATIC.logoURI,
        decimals: TOKEN_CONFIGS.MATIC.decimals
      },
      apr: 12.5,
      minStake: '1000',
      lockPeriod: 180,
      totalStaked: '10000000'
    }
  ];

  // Handle staking operations
  const handleStake = useCallback((poolId: string, amount: string) => {
    console.log("Staking:", { poolId, amount });
    setSelectedPool(poolId);
  }, []);

  const handleUnstake = useCallback((poolId: string, amount: string) => {
    console.log("Unstaking:", { poolId, amount });
    setSelectedPool(null);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="space-y-6 py-4 sm:py-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Staking Interface
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            A flexible staking interface component for managing multiple staking pools with support for staking and unstaking operations.
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
                <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  Selected Pool: {selectedPool || "None"}
                </div>
                <StakingInterface
                  pools={mockPools}
                  userBalance="2.5"
                  onStake={handleStake}
                  onUnstake={handleUnstake}
                />
              </div>
            ) : (
              <CodeBlock
                code={`import { StakingInterface } from "@/components/ui/staking-interface"
import { useState, useCallback } from "react"
import { TOKEN_CONFIGS } from "@/config/tokens"

const pools = ${JSON.stringify(mockPools.slice(0, 1), null, 2)};

export default function Page() {
  const [selectedPool, setSelectedPool] = useState<string | null>(null);

  const handleStake = useCallback((poolId: string, amount: string) => {
    console.log("Staking:", { poolId, amount });
    setSelectedPool(poolId);
  }, []);

  const handleUnstake = useCallback((poolId: string, amount: string) => {
    console.log("Unstaking:", { poolId, amount });
    setSelectedPool(null);
  }, []);

  return (
    <div>
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Selected Pool: {selectedPool || "None"}
      </div>
      <StakingInterface
        pools={pools}
        userBalance="2.5"
        onStake={handleStake}
        onUnstake={handleUnstake}
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
                    Run the following command to add the Staking Interface component to your project:
                  </p>
                  <CodeBlock code="npx shadcn@latest add https://w3-kit.com/registry/staking-interface.json" id="cli" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                    This will:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <li>Create the component in your <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">components/ui</code> directory</li>
                    <li>Add all necessary dependencies to your package.json</li>
                    <li>Set up required configuration files</li>
                    <li>Add staking utilities to your project</li>
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
                      code={`// components/ui/staking-interface/index.tsx
import { StakingInterface } from "@/components/ui/staking-interface/component"

export interface Token {
  symbol: string;
  logoURI: string;
  decimals: number;
}

export interface StakingPool {
  id: string;
  name: string;
  token: Token;
  apr: number;
  minStake: string;
  lockPeriod: number;
  totalStaked: string;
}

export interface StakingInterfaceProps {
  pools: StakingPool[];
  userBalance: string;
  onStake?: (poolId: string, amount: string) => void;
  onUnstake?: (poolId: string, amount: string) => void;
  className?: string;
}

export { StakingInterface };`}
                      id="component"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      3. Use the component in your code:
                    </p>
                    <CodeBlock
                      code={`import { StakingInterface } from "@/components/ui/staking-interface"
import { useState, useCallback } from "react"
import { TOKEN_CONFIGS } from "@/config/tokens"

const pools = [
  {
    id: "1",
    name: "USDC Yield Pool",
    token: {
      symbol: TOKEN_CONFIGS.USDC.symbol,
      logoURI: TOKEN_CONFIGS.USDC.logoURI,
      decimals: TOKEN_CONFIGS.USDC.decimals
    },
    apr: 8.2,
    minStake: "100",
    lockPeriod: 30,
    totalStaked: "5000000"
  }
];

export default function Page() {
  const [selectedPool, setSelectedPool] = useState<string | null>(null);

  const handleStake = useCallback((poolId: string, amount: string) => {
    console.log("Staking:", { poolId, amount });
    setSelectedPool(poolId);
  }, []);

  const handleUnstake = useCallback((poolId: string, amount: string) => {
    console.log("Unstaking:", { poolId, amount });
    setSelectedPool(null);
  }, []);

  return (
    <div>
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Selected Pool: {selectedPool || "None"}
      </div>
      <StakingInterface
        pools={pools}
        userBalance="2.5"
        onStake={handleStake}
        onUnstake={handleUnstake}
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
