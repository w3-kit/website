"use client";

import React, { useState, useCallback } from "react";
import { TokenSwapWidget } from "@/components/w3-kit/token-swap";
import { Code, Eye } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";
import { TokenSymbol } from '../../../../config/tokens';

// Define the Swap interface
interface SwapParams {
  fromToken: TokenSymbol;
  toToken: TokenSymbol;
  amount: string;
  slippage: number;
}

export default function TokenSwapPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");
  const [lastSwap, setLastSwap] = useState<SwapParams | null>(null);

  const handleSwap = useCallback(async (fromToken: string, toToken: string, amount: string) => {
    console.log("Swap:", { fromToken, toToken, amount });
    setLastSwap({ fromToken: fromToken as TokenSymbol, toToken: toToken as TokenSymbol, amount, slippage: 0.5 });
    // Simulate swap delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="space-y-6 py-4 sm:py-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Token Swap
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            A customizable widget for swapping tokens with real-time price updates and slippage control.
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
                {lastSwap && (
                  <div className="mb-4 p-4 bg-card rounded-lg shadow-sm">
                    <h3 className="text-sm font-medium text-foreground mb-2">Last Swap</h3>
                    <div className="text-sm text-muted-foreground">
                      <p>From: {lastSwap.fromToken}</p>
                      <p>To: {lastSwap.toToken}</p>
                      <p>Amount: {lastSwap.amount}</p>
                      <p>Slippage: {lastSwap.slippage}%</p>
                    </div>
                  </div>
                )}
                <TokenSwapWidget
                  onSwap={handleSwap}
                  defaultSlippage={0.5}
                />
              </div>
            ) : (
              <CodeBlock
                code={`import { TokenSwapWidget } from "@/components/ui/token-swap"
import { useState, useCallback } from "react"
import { TokenSymbol } from "@/config/tokens"

interface SwapParams {
  fromToken: TokenSymbol;
  toToken: TokenSymbol;
  amount: string;
  slippage: number;
}

export default function Page() {
  const [lastSwap, setLastSwap] = useState<SwapParams | null>(null);

  const handleSwap = useCallback(async (fromToken: TokenSymbol, toToken: TokenSymbol, amount: string) => {
    console.log("Swap:", { fromToken, toToken, amount });
    setLastSwap({ fromToken, toToken, amount, slippage: 0.5 });
    // Simulate swap delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  }, []);

  return (
    <div>
      {lastSwap && (
        <div className="mb-4 p-4 bg-card rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-foreground mb-2">Last Swap</h3>
          <div className="text-sm text-muted-foreground">
            <p>From: {lastSwap.fromToken}</p>
            <p>To: {lastSwap.toToken}</p>
            <p>Amount: {lastSwap.amount}</p>
            <p>Slippage: {lastSwap.slippage}%</p>
          </div>
        </div>
      )}
      <TokenSwapWidget
        onSwap={handleSwap}
        defaultSlippage={0.5}
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
                    Run the following command to add the Token Swap component to your project:
                  </p>
                  <CodeBlock code="npx shadcn@latest add https://w3-kit.com/registry/token-swap.json" id="cli" />
                  <p className="text-sm text-muted-foreground mt-4">
                    This will:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-sm text-muted-foreground">
                    <li>Create the component in your <code className="bg-muted px-2 py-1 rounded">components/ui</code> directory</li>
                    <li>Add all necessary dependencies to your package.json</li>
                    <li>Set up required configuration files</li>
                    <li>Add token swap utilities to your project</li>
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
                      code={`// components/ui/token-swap/index.tsx
import { TokenSwapWidget } from "@/components/ui/token-swap/component"
import { TokenSymbol } from "@/config/tokens"

export interface SwapParams {
  fromToken: TokenSymbol;
  toToken: TokenSymbol;
  amount: string;
  slippage: number;
}

export interface TokenSwapWidgetProps {
  onSwap: (params: SwapParams) => Promise<void>;
  defaultSlippage?: number;
  className?: string;
}

export { TokenSwapWidget };`}
                      id="component"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      3. Use the component in your code:
                    </p>
                    <CodeBlock
                      code={`import { TokenSwapWidget } from "@/components/ui/token-swap"
import { useState, useCallback } from "react"
import { TokenSymbol } from "@/config/tokens"

interface SwapParams {
  fromToken: TokenSymbol;
  toToken: TokenSymbol;
  amount: string;
  slippage: number;
}

export default function Page() {
  const [lastSwap, setLastSwap] = useState<SwapParams | null>(null);

  const handleSwap = useCallback(async (fromToken: TokenSymbol, toToken: TokenSymbol, amount: string) => {
    console.log("Swap:", { fromToken, toToken, amount });
    setLastSwap({ fromToken, toToken, amount, slippage: 0.5 });
    // Simulate swap delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  }, []);

  return (
    <div>
      {lastSwap && (
        <div className="mb-4 p-4 bg-card rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-foreground mb-2">Last Swap</h3>
          <div className="text-sm text-muted-foreground">
            <p>From: {lastSwap.fromToken}</p>
            <p>To: {lastSwap.toToken}</p>
            <p>Amount: {lastSwap.amount}</p>
            <p>Slippage: {lastSwap.slippage}%</p>
          </div>
        </div>
      )}
      <TokenSwapWidget
        onSwap={handleSwap}
        defaultSlippage={0.5}
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
