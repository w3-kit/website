"use client";

import React, { useState } from "react";
import { NFTCard } from "@/components/w3-kit/nft-card";
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
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            NFT Card
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
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
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-accent"
                }`}
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ${
                  activeTab === "code"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-accent"
                }`}
              >
                <Code className="mr-2 h-4 w-4" />
                Code
              </button>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden">
            {activeTab === "preview" ? (
              <div className="p-20 bg-muted rounded-lg">
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
              </div>
            ) : (
              <CodeBlock
                code={`import { NFTCard } from "@/components/ui/nft-card"
import { useState } from "react"

export default function Page() {
  const [selectedNFT, setSelectedNFT] = useState(null);

  const handleNFTClick = (nft) => {
    console.log("NFT clicked:", nft);
    setSelectedNFT(nft);
  };

  const handleOwnerClick = (owner) => {
    console.log("Owner clicked:", owner);
  };

  return (
    <NFTCard
      nft={{
        id: "2",
        name: "Bored Ape #5678",
        description: "A unique Bored Ape NFT",
        image: "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
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
      }}
      variant="expanded"
      onOwnerClick={handleOwnerClick}
      onNFTClick={handleNFTClick}
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
          <h2 className="text-xl sm:text-2xl font-semibold border-b border-border pb-2 text-foreground">
            Installation
          </h2>

          <div className="space-y-4">
            <div className="flex space-x-2 border-b border-border">
              <button
                onClick={() => setInstallTab("cli")}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  installTab === "cli"
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                CLI
              </button>
              <button
                onClick={() => setInstallTab("manual")}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  installTab === "manual"
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Manual
              </button>
            </div>

            <div className="mt-4">
              {installTab === "cli" ? (
                <>
                  <p className="text-sm text-muted-foreground mb-4">
                    Run the following command to add the NFT Card component to your project:
                  </p>
                  <CodeBlock code="npx shadcn@latest add https://w3-kit.com/registry/nft-card.json" id="cli" />
                  <p className="text-sm text-muted-foreground mt-4">
                    This will:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-sm text-muted-foreground">
                    <li>Create the component in your <code className="bg-muted px-2 py-1 rounded">components/ui</code> directory</li>
                    <li>Add all necessary dependencies to your package.json</li>
                    <li>Set up required configuration files</li>
                    <li>Add NFT utilities to your project</li>
                  </ul>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      1. Initialize W3-Kit in your project if you haven&apos;t already:
                    </p>
                    <CodeBlock code="npx w3-kit@latest init" id="init" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      2. Copy the component to your project:
                    </p>
                    <CodeBlock
                      code={`// components/ui/nft-card/index.tsx
import { NFTCard } from "@/components/ui/nft-card/component"

export interface NFTAttribute {
  trait_type: string;
  value: string;
}

export interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  owner: string;
  collection: string;
  tokenId: string;
  contractAddress: string;
  chainId: number;
  attributes: NFTAttribute[];
}

export interface NFTCardProps {
  nft: NFT;
  variant?: "compact" | "expanded";
  onOwnerClick?: (owner: string) => void;
  onNFTClick?: (nft: NFT) => void;
  className?: string;
}

export { NFTCard };`}
                      id="component"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      3. Use the component in your code:
                    </p>
                    <CodeBlock
                      code={`import { NFTCard } from "@/components/ui/nft-card"
import { useState } from "react"

export default function Page() {
  const [selectedNFT, setSelectedNFT] = useState(null);

  const handleNFTClick = (nft) => {
    console.log("NFT clicked:", nft);
    setSelectedNFT(nft);
  };

  const handleOwnerClick = (owner) => {
    console.log("Owner clicked:", owner);
  };

  return (
    <NFTCard
      nft={{
        id: "2",
        name: "Bored Ape #5678",
        description: "A unique Bored Ape NFT",
        image: "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
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
      }}
      variant="expanded"
      onOwnerClick={handleOwnerClick}
      onNFTClick={handleNFTClick}
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
