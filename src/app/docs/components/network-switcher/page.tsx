"use client";

import React, { useState } from "react";
import { NetworkSwitcher } from "./component";
import { Code, Eye } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";
import { NETWORKS } from './networks';

// Import or define the test networks data
const TEST_NETWORKS = [
  {
    name: 'Mumbai',
    chainId: 80001,
    symbol: 'MATIC',
    currency: 'MATIC',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com',
    blockExplorer: 'https://mumbai.polygonscan.com',
    logoURI: 'https://cryptologos.cc/logos/polygon-matic-logo.png'
  },
  {
    name: 'BSC Testnet',
    chainId: 97,
    symbol: 'BNB',
    currency: 'BNB',
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    blockExplorer: 'https://testnet.bscscan.com',
    logoURI: 'https://cryptologos.cc/logos/bnb-bnb-logo.png'
  },
  {
    name: 'Arbitrum Goerli',
    chainId: 421613,
    symbol: 'ETH',
    currency: 'ETH',
    rpcUrl: 'https://goerli-rollup.arbitrum.io/rpc',
    blockExplorer: 'https://goerli.arbiscan.io',
    logoURI: 'https://cryptologos.cc/logos/arbitrum-arb-logo.png'
  }
];

export default function NetworkSwitcherPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");

  // Update the mockData object
  const mockData = {
    networks: NETWORKS,
    testNetworks: TEST_NETWORKS,
    onSwitch: (chainId: number) => console.log('Switching to network:', chainId)
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="space-y-6 py-4 sm:py-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Network Switcher
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            A component that allows users to easily switch between different blockchain networks with built-in support for popular chains.
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
              <NetworkSwitcher {...mockData} />
            ) : (
              <CodeBlock code={`// Component code will be here`} id="component" />
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
                <CodeBlock code="npx w3-kit@latest add network-switcher" id="cli" />
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      1. Install the package using npm:
                    </p>
                    <CodeBlock code="npm install @w3-kit/network-switcher" id="npm" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      2. Import and use the component:
                    </p>
                    <CodeBlock
                      code={`import { NetworkSwitcher } from "@w3-kit/network-switcher";
import { NETWORKS, TEST_NETWORKS } from "@w3-kit/network-switcher/networks";

export default function Page() {
  return (
    <NetworkSwitcher
      networks={NETWORKS}
      testNetworks={TEST_NETWORKS}
      onSwitch={(chainId) => {
        console.log('Switching to network:', chainId);
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
