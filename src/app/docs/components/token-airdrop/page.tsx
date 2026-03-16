"use client";

import React, { useState, useCallback } from "react";
import { TokenAirdrop } from "@/components/w3-kit/token-airdrop";
import { Code, Eye } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";

// Define the Airdrop interface
interface Airdrop {
  id: string;
  tokenSymbol: string;
  tokenName: string;
  tokenAddress: string;
  amount: string;
  merkleRoot: string;
  merkleProof: string[];
  startTime: number;
  endTime: number;
  claimed: boolean;
  logoURI: string;
}

const mockAirdrops: Airdrop[] = [
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

export default function TokenAirdropPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");
  const [airdrops, setAirdrops] = useState<Airdrop[]>(mockAirdrops);

  const handleClaim = useCallback(async (id: string) => {
    console.log("Claiming airdrop:", id);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAirdrops(prev =>
      prev.map(airdrop =>
        airdrop.id === id
          ? { ...airdrop, claimed: true }
          : airdrop
      )
    );
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="space-y-6 py-4 sm:py-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Token Airdrop
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
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
                <div className="mb-4 text-sm text-muted-foreground">
                  Available Airdrops: {airdrops.filter(a => !a.claimed && a.startTime <= Date.now() && a.endTime >= Date.now()).length}
                </div>
                <TokenAirdrop
                  airdrops={airdrops}
                  onClaim={handleClaim}
                />
              </div>
            ) : (
              <CodeBlock
                code={`import { TokenAirdrop } from "@/components/ui/token-airdrop"
import { useState, useCallback } from "react"

const airdrops = ${JSON.stringify(mockAirdrops, null, 2)};

export default function Page() {
  const [airdrops, setAirdrops] = useState(airdrops);

  const handleClaim = useCallback(async (id: string) => {
    console.log("Claiming airdrop:", id);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAirdrops(prev =>
      prev.map(airdrop =>
        airdrop.id === id
          ? { ...airdrop, claimed: true }
          : airdrop
      )
    );
  }, []);

  return (
    <div>
      <div className="mb-4 text-sm text-muted-foreground">
        Available Airdrops: {airdrops.filter(a => !a.claimed && a.startTime <= Date.now() && a.endTime >= Date.now()).length}
      </div>
      <TokenAirdrop
        airdrops={airdrops}
        onClaim={handleClaim}
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
                    Run the following command to add the Token Airdrop component to your project:
                  </p>
                  <CodeBlock code="npx shadcn@latest add https://w3-kit.com/registry/token-airdrop.json" id="cli" />
                  <p className="text-sm text-muted-foreground mt-4">
                    This will:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-sm text-muted-foreground">
                    <li>Create the component in your <code className="bg-muted px-2 py-1 rounded">components/ui</code> directory</li>
                    <li>Add all necessary dependencies to your package.json</li>
                    <li>Set up required configuration files</li>
                    <li>Add merkle proof verification utilities to your project</li>
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
                      code={`// components/ui/token-airdrop/index.tsx
import { TokenAirdrop } from "@/components/ui/token-airdrop/component"

export interface Airdrop {
  id: string;
  tokenSymbol: string;
  tokenName: string;
  tokenAddress: string;
  amount: string;
  merkleRoot: string;
  merkleProof: string[];
  startTime: number;
  endTime: number;
  claimed: boolean;
  logoURI: string;
}

export interface TokenAirdropProps {
  airdrops: Airdrop[];
  onClaim?: (id: string) => void;
  className?: string;
}

export { TokenAirdrop };`}
                      id="component"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      3. Use the component in your code:
                    </p>
                    <CodeBlock
                      code={`import { TokenAirdrop } from "@/components/ui/token-airdrop"
import { useState, useCallback } from "react"

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
  const [airdrops, setAirdrops] = useState(airdrops);

  const handleClaim = useCallback(async (id: string) => {
    console.log("Claiming airdrop:", id);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAirdrops(prev =>
      prev.map(airdrop =>
        airdrop.id === id
          ? { ...airdrop, claimed: true }
          : airdrop
      )
    );
  }, []);

  return (
    <div>
      <div className="mb-4 text-sm text-muted-foreground">
        Available Airdrops: {airdrops.filter(a => !a.claimed && a.startTime <= Date.now() && a.endTime >= Date.now()).length}
      </div>
      <TokenAirdrop
        airdrops={airdrops}
        onClaim={handleClaim}
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
