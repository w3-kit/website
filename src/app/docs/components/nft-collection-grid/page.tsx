"use client";

import React, { useState } from "react";
import { NFTCollectionGrid } from "@/components/w3-kit/nft-collection-grid";
import { Code, Eye } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";
import { NFT } from "@/components/w3-kit/nft-collection-grid-types";

export default function NFTCollectionGridPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");

  // Mock data for preview
  const mockData: NFT[] = [
    {
      id: "1",
      name: "Azuki #9839",
      description:
        "Azuki starts with a collection of 10,000 avatars that give you membership access to The Garden.",
      image:
        "https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?auto=format&dpr=1&w=1000",
      owner: "0x1234567890abcdef1234567890abcdef12345678",
      collection: "Azuki",
      chainId: 1,
      tokenId: "9839",
      contractAddress: "",
      attributes: [
        { trait_type: "Background", value: "Blue" },
        { trait_type: "Type", value: "Human" },
        { trait_type: "Eyes", value: "Red" },
      ],
    },
    {
      id: "2",
      name: "Bored Ape #7329",
      description:
        "The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs.",
      image:
        "https://i.seadn.io/gae/i5dYZRkVCUK97bfprQ3WXyrT9BnLSZtVKGJlKQ919uaUB0sxbngVCioaiyu9r6snqfi2aaTyIvv6DHm4m2R3y7hMajbsv14pSZK8mhs?auto=format&dpr=1&w=1000",
      owner: "0x9876543210fedcba9876543210fedcba98765432",
      collection: "Bored Ape Yacht Club",
      chainId: 1,
      tokenId: "7329",
      contractAddress: "",
      attributes: [
        { trait_type: "Background", value: "Yellow" },
        { trait_type: "Fur", value: "Brown" },
        { trait_type: "Eyes", value: "Bored" },
      ],
    },
    {
      id: "3",
      name: "Doodle #8147",
      description:
        "A community-driven collectibles project featuring art by Burnt Toast.",
      image:
        "https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?auto=format&dpr=1&w=1000",
      owner: "0xabcdef1234567890abcdef1234567890abcdef12",
      collection: "Doodles",
      chainId: 1,
      tokenId: "8147",
      contractAddress: "",
      attributes: [
        { trait_type: "Background", value: "Purple" },
        { trait_type: "Body", value: "Rainbow" },
        { trait_type: "Face", value: "Happy" },
      ],
    },
    {
      id: "4",
      name: "Cool Cat #1490",
      description:
        "Cool Cats are a collection of 9,999 randomly generated NFTs on the Ethereum blockchain.",
      image:
        "https://i.seadn.io/gae/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8?auto=format&dpr=1&w=1000",
      owner: "0x123456789abcdef0123456789abcdef012345678",
      collection: "Cool Cats",
      chainId: 1,
      tokenId: "1490",
      contractAddress: "",
    },
    {
      id: "5",
      name: "Moonbird #7816",
      description:
        "A collection of 10,000 utility-enabled PFPs that feature a richly diverse and unique pool of rarity-powered traits.",
      image:
        "https://i.seadn.io/gae/H-eyNE1MwL5ohL-tCfn_Xa1Sl9M9B4612tLYeUlQubzt4ewhr4huJIR5OLuyO3Z5PpJFSwdm7rq-TikAh7f5eUw338A2cy6HRH75?auto=format&dpr=1&w=1000",
      owner: "0xfedcba9876543210fedcba9876543210fedcba98",
      collection: "Moonbirds",
      chainId: 1,
      tokenId: "7816",
      contractAddress: "",
    },
    {
      id: "7",
      name: "CloneX #18327",
      description: "20,000 next-gen Avatars, by RTFKT and Takashi Murakami.",
      image:
        "https://i.seadn.io/gae/XN0XuD8Uh3jyRWNtPTFeXJg_ht8m5ofDx6aHklOiy4amhFuWUa0JaR6It49AH8tlnYS386Q0TW_-Lmedn0UET_ko1a3CbJGeu5iHMg?auto=format&dpr=1&w=1000",
      owner: "0x210fedcba9876543210fedcba9876543210fedcb",
      collection: "CloneX",
      chainId: 1,
      tokenId: "18327",
      contractAddress: "",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="space-y-6 py-4 sm:py-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            NFT Collection Grid
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            A responsive grid component for displaying NFT collections with
            customizable layouts and interactive features.
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
                <NFTCollectionGrid
                  nfts={mockData}
                  onNFTClick={(nft) => console.log("NFT clicked:", nft)}
                />
              </div>
            ) : (
              <CodeBlock
                code={`import { NFTCollectionGrid } from "@/components/ui/nft-collection-grid"
import { useState } from "react"
import { NFT } from "@/components/ui/nft-card"

export default function Page() {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);

  const handleNFTClick = (nft: NFT) => {
    console.log("NFT clicked:", nft);
    setSelectedNFT(nft);
  };

  const handleOwnerClick = (owner: string) => {
    console.log("Owner clicked:", owner);
  };

  return (
    <NFTCollectionGrid
      nfts={[
        {
          id: "1",
          name: "Azuki #9839",
          description: "Azuki starts with a collection of 10,000 avatars that give you membership access to The Garden.",
          image: "https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?auto=format&dpr=1&w=1000",
          owner: "0x1234567890abcdef1234567890abcdef12345678",
          collection: "Azuki",
          chainId: 1,
          tokenId: "9839",
          contractAddress: "",
          attributes: [
            { trait_type: "Background", value: "Blue" },
            { trait_type: "Type", value: "Human" },
            { trait_type: "Eyes", value: "Red" },
          ],
        },
        // Add more NFTs here...
      ]}
      variant="default"
      columns={{
        default: 1,
        sm: 2,
        md: 3,
        lg: 4,
      }}
      onNFTClick={handleNFTClick}
      onOwnerClick={handleOwnerClick}
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
                <>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Run the following command to add the NFT Collection Grid component to your project:
                  </p>
                  <CodeBlock code="npx shadcn@latest add https://w3-kit.com/registry/nft-collection-grid.json" id="cli" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                    This will:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <li>Create the component in your <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">components/ui</code> directory</li>
                    <li>Add all necessary dependencies to your package.json</li>
                    <li>Set up required configuration files</li>
                    <li>Add NFT utilities to your project</li>
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
                      code={`// components/ui/nft-collection-grid/index.tsx
import { NFTCollectionGrid } from "@/components/ui/nft-collection-grid/component"
import { NFT } from "@/components/ui/nft-card"

export interface NFTCollectionGridProps {
  nfts: NFT[];
  variant?: "default" | "compact";
  columns?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    "2xl"?: number;
  };
  onNFTClick?: (nft: NFT) => void;
  onOwnerClick?: (owner: string) => void;
  className?: string;
}

export { NFTCollectionGrid };`}
                      id="component"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      3. Use the component in your code:
                    </p>
                    <CodeBlock
                      code={`import { NFTCollectionGrid } from "@/components/ui/nft-collection-grid"
import { useState } from "react"
import { NFT } from "@/components/ui/nft-card"

export default function Page() {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);

  const handleNFTClick = (nft: NFT) => {
    console.log("NFT clicked:", nft);
    setSelectedNFT(nft);
  };

  const handleOwnerClick = (owner: string) => {
    console.log("Owner clicked:", owner);
  };

  return (
    <NFTCollectionGrid
      nfts={[
        {
          id: "1",
          name: "Azuki #9839",
          description: "Azuki starts with a collection of 10,000 avatars that give you membership access to The Garden.",
          image: "https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?auto=format&dpr=1&w=1000",
          owner: "0x1234567890abcdef1234567890abcdef12345678",
          collection: "Azuki",
          chainId: 1,
          tokenId: "9839",
          contractAddress: "",
          attributes: [
            { trait_type: "Background", value: "Blue" },
            { trait_type: "Type", value: "Human" },
            { trait_type: "Eyes", value: "Red" },
          ],
        },
        // Add more NFTs here...
      ]}
      variant="default"
      columns={{
        default: 1,
        sm: 2,
        md: 3,
        lg: 4,
      }}
      onNFTClick={handleNFTClick}
      onOwnerClick={handleOwnerClick}
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
