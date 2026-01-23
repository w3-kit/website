"use client";

import React, { useState } from "react";
import { MultisigWallet } from "@/components/w3-kit/multisig-wallet";
import { Code, Eye } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";
import { Transaction } from "@/components/w3-kit/multisig-wallet-types";

export default function MultisigWalletPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Mock data for preview
  const mockData = {
    walletAddress: "0x1234567890123456789012345678901234567890",
    signers: [
      { address: "0x1234...5678", name: "Alice", hasApproved: false },
      { address: "0x5678...9012", name: "Bob", hasApproved: false },
      { address: "0x9012...3456", name: "Charlie", hasApproved: false },
    ],
    transactions: transactions,
    requiredApprovals: 2,
    onPropose: (tx: Omit<Transaction, "id" | "status" | "timestamp">) => {
      const newTx: Transaction = {
        ...tx,
        id: Math.random().toString(36).substr(2, 9),
        status: "pending",
        timestamp: Date.now(),
      };
      setTransactions(prev => [newTx, ...prev]);
    },
    onApprove: (txId: string) => {
      setTransactions(prev => prev.map(tx => 
        tx.id === txId 
          ? { ...tx, approvals: tx.approvals + 1 }
          : tx
      ));
    },
    onReject: (txId: string) => {
      setTransactions(prev => prev.map(tx => 
        tx.id === txId 
          ? { ...tx, status: "rejected" }
          : tx
      ));
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="space-y-6 py-4 sm:py-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Multi-Signature Wallet
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            A component for managing multi-signature wallets with transaction proposals, approvals, and execution tracking.
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
                <MultisigWallet {...mockData} />
              </div>
            ) : (
              <CodeBlock
                code={`import { MultisigWallet } from "@/components/ui/multisig-wallet"
import { useState } from "react"

export default function Page() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handlePropose = (tx: Omit<Transaction, "id" | "status" | "timestamp">) => {
    const newTx: Transaction = {
      ...tx,
      id: Math.random().toString(36).substr(2, 9),
      status: "pending",
      timestamp: Date.now(),
    };
    setTransactions(prev => [newTx, ...prev]);
  };

  const handleApprove = (txId: string) => {
    setTransactions(prev => prev.map(tx => 
      tx.id === txId 
        ? { ...tx, approvals: tx.approvals + 1 }
        : tx
    ));
  };

  const handleReject = (txId: string) => {
    setTransactions(prev => prev.map(tx => 
      tx.id === txId 
        ? { ...tx, status: "rejected" }
        : tx
    ));
  };

  return (
    <MultisigWallet
      walletAddress="0x1234567890123456789012345678901234567890"
      signers={[
        { address: "0x1234...5678", name: "Alice", hasApproved: false },
        { address: "0x5678...9012", name: "Bob", hasApproved: false },
        { address: "0x9012...3456", name: "Charlie", hasApproved: false },
      ]}
      transactions={transactions}
      requiredApprovals={2}
      onPropose={handlePropose}
      onApprove={handleApprove}
      onReject={handleReject}
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
                    Run the following command to add the Multi-Signature Wallet component to your project:
                  </p>
                  <CodeBlock code="npx shadcn@latest add https://w3-kit.com/registry/multisig-wallet.json" id="cli" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                    This will:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <li>Create the component in your <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">components/ui</code> directory</li>
                    <li>Add all necessary dependencies to your package.json</li>
                    <li>Set up required configuration files</li>
                    <li>Add multisig wallet utilities to your project</li>
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
                      code={`// components/ui/multisig-wallet/index.tsx
import { MultisigWallet } from "@/components/ui/multisig-wallet/component"

export interface Signer {
  address: string;
  name: string;
  hasApproved: boolean;
}

export interface Transaction {
  id: string;
  type: "transfer" | "contract" | "token";
  to: string;
  value: string;
  data?: string;
  status: "pending" | "approved" | "rejected" | "executed";
  approvals: number;
  timestamp: number;
}

export interface MultisigWalletProps {
  walletAddress: string;
  signers: Signer[];
  transactions: Transaction[];
  requiredApprovals: number;
  onPropose?: (tx: Omit<Transaction, "id" | "status" | "timestamp">) => void;
  onApprove?: (txId: string) => void;
  onReject?: (txId: string) => void;
  className?: string;
}

export { MultisigWallet };`}
                      id="component"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      3. Use the component in your code:
                    </p>
                    <CodeBlock
                      code={`import { MultisigWallet } from "@/components/ui/multisig-wallet"
import { useState } from "react"

export default function Page() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handlePropose = (tx: Omit<Transaction, "id" | "status" | "timestamp">) => {
    const newTx: Transaction = {
      ...tx,
      id: Math.random().toString(36).substr(2, 9),
      status: "pending",
      timestamp: Date.now(),
    };
    setTransactions(prev => [newTx, ...prev]);
  };

  const handleApprove = (txId: string) => {
    setTransactions(prev => prev.map(tx => 
      tx.id === txId 
        ? { ...tx, approvals: tx.approvals + 1 }
        : tx
    ));
  };

  const handleReject = (txId: string) => {
    setTransactions(prev => prev.map(tx => 
      tx.id === txId 
        ? { ...tx, status: "rejected" }
        : tx
    ));
  };

  return (
    <MultisigWallet
      walletAddress="0x1234567890123456789012345678901234567890"
      signers={[
        { address: "0x1234...5678", name: "Alice", hasApproved: false },
        { address: "0x5678...9012", name: "Bob", hasApproved: false },
        { address: "0x9012...3456", name: "Charlie", hasApproved: false },
      ]}
      transactions={transactions}
      requiredApprovals={2}
      onPropose={handlePropose}
      onApprove={handleApprove}
      onReject={handleReject}
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
