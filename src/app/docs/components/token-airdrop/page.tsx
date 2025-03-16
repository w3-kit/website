"use client";

import React, { useState } from "react";
import { TokenAirdrop } from "./component";
import { Code, Eye } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";

export default function TokenAirdropPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");

  // Mock data for preview
  const mockAirdrops = [
    {
      id: "1",
      tokenSymbol: "W3K",
      tokenName: "W3Kit Token",
      tokenAddress: "0x1234567890123456789012345678901234567890",
      amount: "1000",
      merkleRoot: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
      merkleProof: [],
      startTime: Date.now() - 86400000, // 24h ago
      endTime: Date.now() + 86400000 * 7, // 7 days from now
      claimed: false,
      logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=040"
    },
    {
      id: "2",
      tokenSymbol: "TEST",
      tokenName: "Test Token",
      tokenAddress: "0x0987654321098765432109876543210987654321",
      amount: "500",
      merkleRoot: "0x0987654321abcdef0987654321abcdef0987654321abcdef0987654321abcdef",
      merkleProof: [],
      startTime: Date.now() + 86400000, // Starts in 24h
      endTime: Date.now() + 86400000 * 14, // 14 days from now
      claimed: false,
      logoURI: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=040"
    },
    {
      id: "3",
      tokenSymbol: "DEMO",
      tokenName: "Demo Token",
      tokenAddress: "0x5555555555555555555555555555555555555555",
      amount: "2500",
      merkleRoot: "0x5555555555555555555555555555555555555555555555555555555555555555",
      merkleProof: [],
      startTime: Date.now() - 86400000 * 7, // 7 days ago
      endTime: Date.now() - 86400000, // Ended 24h ago
      claimed: true,
      logoURI: "https://cryptologos.cc/logos/matic-network-matic-logo.svg?v=040"
    }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="space-y-6 py-4 sm:py-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Token Airdrop
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            A component for managing and claiming token airdrops with merkle proof verification.
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
              <div className="p-4 bg-gray-50 dark:bg-gray-900">
                <TokenAirdrop
                  airdrops={mockAirdrops}
                  onClaim={async (id) => {
                    console.log("Claiming airdrop:", id);
                    await new Promise(resolve => setTimeout(resolve, 2000));
                  }}
                />
              </div>
            ) : (
              <CodeBlock
                code={`import { TokenAirdrop } from "@w3-kit/token-airdrop";

const airdrops = [
  {
    id: "1",
    tokenSymbol: "W3K",
    tokenName: "W3Kit Token",
    tokenAddress: "0x1234...",
    amount: "1000",
    merkleRoot: "0xabcd...",
    merkleProof: [],
    startTime: Date.now(),
    endTime: Date.now() + 86400000 * 7,
    claimed: false,
    logoURI: "https://..."
  }
];

export default function Page() {
  return (
    <TokenAirdrop
      airdrops={airdrops}
      onClaim={async (id) => {
        // Handle claim logic here
        await claimAirdrop(id);
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
                <CodeBlock code="npx w3-kit@latest add token-airdrop" id="cli" />
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      1. Install the package using npm:
                    </p>
                    <CodeBlock code="npm install @w3-kit/token-airdrop" id="npm" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      2. Import and use the component:
                    </p>
                    <CodeBlock
                      code={`import { TokenAirdrop } from "@w3-kit/token-airdrop";

const airdrops = [
  {
    id: "1",
    tokenSymbol: "W3K",
    tokenName: "W3Kit Token",
    tokenAddress: "0x1234...",
    amount: "1000",
    merkleRoot: "0xabcd...",
    merkleProof: [],
    startTime: Date.now(),
    endTime: Date.now() + 86400000 * 7,
    claimed: false,
    logoURI: "https://..."
  }
];

export default function Page() {
  return (
    <TokenAirdrop
      airdrops={airdrops}
      onClaim={async (id) => {
        // Handle claim logic here
        await claimAirdrop(id);
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
