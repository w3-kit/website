"use client";

import React, { useState } from "react";
import { BridgeWidget } from "@/components/w3-kit/bridge";
import { Code, Eye } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";

export default function BridgeComponent() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");

  return (
    <div className="w-full  mx-auto px-4">
      <div className="space-y-6 py-4 sm:py-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Bridge
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            A component that enables users to transfer tokens between different
            blockchain networks.
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

          <div className="flex items-center rounded-lg overflow-hidden w-full">
            {activeTab === "preview" ? (
              <BridgeWidget />
            ) : (
              <CodeBlock
                code={`import { BridgeWidget } from "@/components/ui/bridge"
import { TOKEN_CONFIGS } from "@/config/tokens"

// Example configuration
const config = {
  sourceChain: {
    id: 1,
    name: "Ethereum",
    icon: "/chains/ethereum.svg",
    tokens: [
      {
        ...TOKEN_CONFIGS.ETH,
        balance: "1.5",
        price: 3500,
        value: 5250,
        change24h: 4.2,
        color: "#627EEA"
      },
      {
        ...TOKEN_CONFIGS.USDC,
        balance: "1000",
        price: 1,
        value: 1000,
        change24h: 0.01,
        color: "#2775CA"
      }
    ]
  },
  targetChain: {
    id: 56,
    name: "BSC",
    icon: "/chains/bsc.svg",
    tokens: [
      {
        ...TOKEN_CONFIGS.WBNB,
        balance: "5",
        price: 300,
        value: 1500,
        change24h: 2.1,
        color: "#F3BA2F"
      },
      {
        ...TOKEN_CONFIGS.BUSD,
        balance: "2000",
        price: 1,
        value: 2000,
        change24h: 0.01,
        color: "#F0B90B"
      }
    ]
  }
};

export default function Page() {
  return (
    <BridgeWidget
      config={config}
      onBridge={(data) => console.log("Bridge transaction:", data)}
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
                    Run the following command to add the Bridge component to
                    your project:
                  </p>
                  <CodeBlock code="npx shadcn@latest add https://w3-kit.com/registry/bridge.json" id="cli" />
                  <p className="text-sm text-muted-foreground mt-4">
                    This will:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-sm text-muted-foreground">
                    <li>
                      Create the component in your{" "}
                      <code className="bg-muted px-2 py-1 rounded">
                        components/ui
                      </code>{" "}
                      directory
                    </li>
                    <li>Add all necessary dependencies to your package.json</li>
                    <li>Set up required configuration files</li>
                    <li>Add token configurations to your project</li>
                  </ul>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      1. Initialize W3-Kit in your project if you haven&apos;t
                      already:
                    </p>
                    <CodeBlock code="npx w3-kit@latest init" id="init" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      2. Copy the component to your project:
                    </p>
                    <CodeBlock
                      code={`// components/ui/bridge/index.tsx
import { BridgeWidget } from "@/components/ui/bridge/component"

export interface BridgeConfig {
  sourceChain: {
    id: number;
    name: string;
    icon: string;
    tokens: Token[];
  };
  targetChain: {
    id: number;
    name: string;
    icon: string;
    tokens: Token[];
  };
}

export interface Token {
  symbol: string;
  name: string;
  icon: string;
  balance: string;
  price: number;
  value: number;
  change24h: number;
  color: string;
}

export { BridgeWidget };`}
                      id="component"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      3. Use the component in your code:
                    </p>
                    <CodeBlock
                      code={`import { BridgeWidget } from "@/components/ui/bridge"
import { TOKEN_CONFIGS } from "@/config/tokens"

const config = {
  sourceChain: {
    id: 1,
    name: "Ethereum",
    icon: "/chains/ethereum.svg",
    tokens: [
      {
        ...TOKEN_CONFIGS.ETH,
        balance: "1.5",
        price: 3500,
        value: 5250,
        change24h: 4.2,
        color: "#627EEA"
      }
    ]
  },
  targetChain: {
    id: 56,
    name: "BSC",
    icon: "/chains/bsc.svg",
    tokens: [
      {
        ...TOKEN_CONFIGS.WBNB,
        balance: "5",
        price: 300,
        value: 1500,
        change24h: 2.1,
        color: "#F3BA2F"
      }
    ]
  }
};

export default function Page() {
  return (
    <BridgeWidget
      config={config}
      onBridge={(data) => console.log("Bridge transaction:", data)}
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
