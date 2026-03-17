"use client";

import React, { useState } from "react";
import { ConnectWalletButton } from "@/components/w3-kit/connect-wallet";
import { Code, Eye } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";

type WalletTab = "metamask" | "walletconnect" | "coinbase";

export default function ConnectWalletPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [walletTab, setWalletTab] = useState<WalletTab>("metamask");
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="space-y-6 py-4 sm:py-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Connect Wallet
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            A customizable button component that handles wallet connections with built-in support for multiple providers.
          </p>
        </div>

        <div className="border rounded-lg overflow-hidden dark:border-gray-800">
          <div className="border-b dark:border-gray-800">
            <div className="flex">
              <button
                onClick={() => setActiveTab("preview")}
                className={`px-4 py-2 flex items-center gap-2 ${
                  activeTab === "preview"
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                <Eye size={20} />
                Preview
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`px-4 py-2 flex items-center gap-2 ${
                  activeTab === "code"
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                <Code size={20} />
                Code
              </button>
            </div>
          </div>

          <div className="p-4">
            {activeTab === "preview" ? (
              <div className="space-y-6">
                {/* Wallet Type Tabs */}
                <div className="flex gap-2 border-b dark:border-gray-800">
                  <button
                    onClick={() => setWalletTab("metamask")}
                    className={`px-4 py-2 text-sm font-medium ${
                      walletTab === "metamask"
                        ? "text-blue-500 border-b-2 border-blue-500"
                        : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    MetaMask
                  </button>
                  <button
                    onClick={() => setWalletTab("walletconnect")}
                    className={`px-4 py-2 text-sm font-medium ${
                      walletTab === "walletconnect"
                        ? "text-blue-500 border-b-2 border-blue-500"
                        : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    WalletConnect
                  </button>
                  <button
                    onClick={() => setWalletTab("coinbase")}
                    className={`px-4 py-2 text-sm font-medium ${
                      walletTab === "coinbase"
                        ? "text-blue-500 border-b-2 border-blue-500"
                        : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    Coinbase
                  </button>
                </div>

                {/* Button Variants */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {walletTab === "metamask" 
                      ? "MetaMask" 
                      : walletTab === "walletconnect" 
                        ? "WalletConnect" 
                        : "Coinbase"} Variants
                  </h3>
                  <div className="grid gap-4">
                    <ConnectWalletButton
                      onConnect={(address) => console.log('Connected:', address)}
                    />
                    <ConnectWalletButton
                      onConnect={(address) => console.log('Connected:', address)}
                    />
                    <ConnectWalletButton
                      onConnect={(address) => console.log('Connected:', address)}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <CodeBlock
                code={`import { ConnectWalletButton } from "@/components/ui/connect-wallet"
import { useState } from "react"

// Example configuration
const config = {
  providers: {
    metamask: {
      name: "MetaMask",
      icon: "/wallets/metamask.svg",
      color: "#F6851B"
    },
    walletconnect: {
      name: "WalletConnect",
      icon: "/wallets/walletconnect.svg",
      color: "#3B99FC"
    },
    coinbase: {
      name: "Coinbase Wallet",
      icon: "/wallets/coinbase.svg",
      color: "#0052FF"
    }
  },
  variants: {
    ghost: {
      className: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
      textColor: "text-gray-900 dark:text-white"
    },
    light: {
      className: "bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700",
      textColor: "text-gray-900 dark:text-white"
    },
    dark: {
      className: "bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100",
      textColor: "text-white dark:text-gray-900"
    }
  }
};

export default function Page() {
  const [address, setAddress] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <ConnectWalletButton
        variant="ghost"
        walletType="metamask"
        onConnect={(address) => {
          console.log('Connected:', address);
          setAddress(address);
        }}
      />
      <ConnectWalletButton
        variant="light"
        walletType="walletconnect"
        onConnect={(address) => {
          console.log('Connected:', address);
          setAddress(address);
        }}
      />
      <ConnectWalletButton
        variant="dark"
        walletType="coinbase"
        onConnect={(address) => {
          console.log('Connected:', address);
          setAddress(address);
        }}
      />
    </div>
  );`}
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
                    Run the following command to add the Connect Wallet component to your project:
                  </p>
                  <CodeBlock code="npx shadcn@latest add https://w3-kit.com/registry/connect-wallet.json" id="cli" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                    This will:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <li>Create the component in your <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">components/ui</code> directory</li>
                    <li>Add all necessary dependencies to your package.json</li>
                    <li>Set up required configuration files</li>
                    <li>Add wallet provider configurations to your project</li>
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
                      code={`// components/ui/connect-wallet/index.tsx
import { ConnectWalletButton } from "@/components/ui/connect-wallet/component"

export interface WalletProvider {
  name: string;
  icon: string;
  color: string;
}

export interface ButtonVariant {
  className: string;
  textColor: string;
}

export interface ConnectWalletConfig {
  providers: {
    [key: string]: WalletProvider;
  };
  variants: {
    [key: string]: ButtonVariant;
  };
}

export { ConnectWalletButton };`}
                      id="component"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      3. Use the component in your code:
                    </p>
                    <CodeBlock
                      code={`import { ConnectWalletButton } from "@/components/ui/connect-wallet"
import { useState } from "react"

export default function Page() {
  const [address, setAddress] = useState<string | null>(null);

  return (
    <ConnectWalletButton
      variant="ghost"
      walletType="metamask"
      onConnect={(address) => {
        console.log('Connected:', address);
        setAddress(address);
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
