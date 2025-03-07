"use client";

import React, { useState } from "react";
import { NFTCard } from "./component";
import { Code, Eye } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";

export default function NFTCardPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");

  // Mock data for preview
  const mockData = [
    {
      id: "2",
      name: "Bored Ape #5678",
      description: "A unique Bored Ape NFT",
      image:
        "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
      owner: "0x9876543210fedcba9876543210fedcba98765432",
      collection: "Bored Ape Yacht Club",
      tokenId: "5678",
      contractAddress: "0x123456789abcdef123456789abcdef1234567890",
      chainId: 1,
      attributes: [
        { trait_type: "Background", value: "Yellow" },
        { trait_type: "Fur", value: "Brown" },
        { trait_type: "Eyes", value: "Bored" },
        { trait_type: "Clothes", value: "Suit" },
      ],
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="space-y-6 py-4 sm:py-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            NFT Card
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            A component for displaying NFT metadata with a clean and modern
            design, supporting various token standards.
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
              <div className="w-full max-w-md mx-auto">
                {mockData.map((nft) => (
                  <NFTCard
                    key={nft.id}
                    nft={nft}
                    variant="expanded"
                    onOwnerClick={(owner) =>
                      console.log("Owner clicked:", owner)
                    }
                    onNFTClick={(nft) => console.log("NFT clicked:", nft)}
                    className="transform scale-90"
                  />
                ))}
              </div>
            ) : (
              <CodeBlock
                code={`// Component code will be here`}
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
                <CodeBlock code="npx w3-kit@latest add nft-card" id="cli" />
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      1. Install the package using npm:
                    </p>
                    <CodeBlock code="npm install @w3-kit/nft-card" id="npm" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      2. Import and use the component:
                    </p>
                    <CodeBlock
                      code={`import { NFTCard } from "@w3-kit/nft-card";

export default function Page() {
  return (
    <NFTCard
      name="Bored Ape #1234"
      description="A unique NFT from the BAYC collection"
      image="https://example.com/nft-image.png"
      attributes={[
        { trait_type: "Background", value: "Blue" },
        { trait_type: "Eyes", value: "Laser" }
      ]}
      collection={{
        name: "Bored Ape Yacht Club",
        verified: true
      }}
      owner="0x1234...5678"
      tokenId="1234"
      contractAddress="0xBC4CA0..."
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
