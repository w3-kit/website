"use client";

import React, { useState } from "react";
import { FlashLoanExecutor } from "@/components/w3-kit/flash-loan-executor";
import { FlashLoanData } from "@/components/w3-kit/flash-loan-executor-types";
import { Code, Eye } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";
import Image from "next/image";

const mockProtocols = [
  {
    name: "Aave",
    logoURI: "https://cryptologos.cc/logos/aave-aave-logo.png",
    address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
  },
  {
    name: "dYdX",
    logoURI: "https://cryptologos.cc/logos/dydx-dydx-logo.png",
    address: "0x92D6C1e31e14520e676a687F0a93788B716BEff5",
  },
  {
    name: "Balancer",
    logoURI: "https://cryptologos.cc/logos/balancer-bal-logo.png",
    address: "0xba100000625a3754423978a60c9317c58a424e3D",
  },
];

const mockTokens = [
  {
    symbol: "ETH",
    logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    decimals: 18,
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  },
  {
    symbol: "USDC",
    logoURI: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    decimals: 6,
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  },
  {
    symbol: "DAI",
    logoURI: "https://cryptologos.cc/logos/dai-dai-logo.png",
    decimals: 18,
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  },
];

export default function FlashLoanExecutorPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");
  const [flashLoans, setFlashLoans] = useState<FlashLoanData[]>([]);

  const handleExecute = async (data: Omit<FlashLoanData, "id" | "timestamp">) => {
    const newFlashLoan: FlashLoanData = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
    };
    setFlashLoans((prev) => [...prev, newFlashLoan]);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="space-y-6 py-4 sm:py-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Flash Loan Executor
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Execute flash loans across multiple protocols with profit calculation and risk assessment.
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
                <FlashLoanExecutor
                  protocols={mockProtocols}
                  tokens={mockTokens}
                  onExecute={handleExecute}
                />
                {flashLoans.length > 0 && (
                  <div className="mt-8 animate-fade-in">
                    <h3 className="text-lg font-semibold mb-4">Recent Flash Loans</h3>
                    <div className="space-y-2">
                      {flashLoans.map((loan, index) => (
                        <div 
                          key={loan.id} 
                          className="flex items-center justify-between p-3 bg-card rounded-lg animate-slide-in"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="flex items-center space-x-2">
                            <Image
                              src={loan.protocol.logoURI}
                              alt={loan.protocol.name}
                              width={24}
                              height={24}
                              className="rounded-full"
                            />
                            <span>{loan.amount} {loan.token.symbol}</span>
                          </div>
                          <span className="text-success">+{loan.profit} ETH</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <CodeBlock
                code={`import { FlashLoanExecutor } from "@/components/ui/flash-loan-executor"
import { useState } from "react"

// Example protocol data
const protocols = [
  {
    name: "Aave",
    logoURI: "/protocols/aave.svg",
    address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9"
  },
  {
    name: "dYdX",
    logoURI: "/protocols/dydx.svg",
    address: "0x92D6C1e31e14520e676a687F0a93788B716BEff5"
  }
];

// Example token data
const tokens = [
  {
    symbol: "ETH",
    logoURI: "/tokens/eth.svg",
    decimals: 18,
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
  },
  {
    symbol: "USDC",
    logoURI: "/tokens/usdc.svg",
    decimals: 6,
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
  }
];

export default function Page() {
  const [flashLoans, setFlashLoans] = useState<FlashLoanData[]>([]);

  const handleExecute = async (data: Omit<FlashLoanData, "id" | "timestamp">) => {
    const newFlashLoan: FlashLoanData = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    };
    setFlashLoans(prev => [...prev, newFlashLoan]);
  };

  return (
    <FlashLoanExecutor
      protocols={protocols}
      tokens={tokens}
      onExecute={handleExecute}
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
                    Run the following command to add the Flash Loan Executor component to your project:
                  </p>
                  <CodeBlock code="npx shadcn@latest add https://w3-kit.com/registry/flash-loan-executor.json" id="cli" />
                  <p className="text-sm text-muted-foreground mt-4">
                    This will:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-sm text-muted-foreground">
                    <li>Create the component in your <code className="bg-muted px-2 py-1 rounded">components/ui</code> directory</li>
                    <li>Add all necessary dependencies to your package.json</li>
                    <li>Set up required configuration files</li>
                    <li>Add flash loan execution utilities to your project</li>
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
                      code={`// components/ui/flash-loan-executor/index.tsx
import { FlashLoanExecutor } from "@/components/ui/flash-loan-executor/component"

export interface Protocol {
  name: string;
  logoURI: string;
  address: string;
}

export interface Token {
  symbol: string;
  logoURI: string;
  decimals: number;
  address: string;
}

export interface FlashLoanData {
  id: string;
  timestamp: number;
  protocol: Protocol;
  token: Token;
  amount: string;
  profit: number;
  risk: "low" | "medium" | "high";
}

export interface FlashLoanExecutorProps {
  protocols: Protocol[];
  tokens: Token[];
  onExecute: (data: Omit<FlashLoanData, "id" | "timestamp">) => void;
}

export { FlashLoanExecutor };`}
                      id="component"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      3. Use the component in your code:
                    </p>
                    <CodeBlock
                      code={`import { FlashLoanExecutor } from "@/components/ui/flash-loan-executor"
import { useState } from "react"

export default function Page() {
  const [flashLoans, setFlashLoans] = useState<FlashLoanData[]>([]);

  const protocols = [
    {
      name: "Aave",
      logoURI: "/protocols/aave.svg",
      address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9"
    }
  ];

  const tokens = [
    {
      symbol: "ETH",
      logoURI: "/tokens/eth.svg",
      decimals: 18,
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
    }
  ];

  const handleExecute = async (data: Omit<FlashLoanData, "id" | "timestamp">) => {
    const newFlashLoan: FlashLoanData = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    };
    setFlashLoans(prev => [...prev, newFlashLoan]);
  };

  return (
    <FlashLoanExecutor
      protocols={protocols}
      tokens={tokens}
      onExecute={handleExecute}
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
