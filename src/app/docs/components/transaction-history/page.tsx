"use client";

import React, { useState, useCallback } from "react";
import { TransactionHistory } from "./component";
import { Code, Eye } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";

// Define the Transaction interface
interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  status: "success" | "pending" | "failed";
  nonce: number;
  blockNumber?: number;
}

// Mock transactions for preview
const mockTransactions: Transaction[] = [
  {
    hash: "0x113...abc",
    from: "0xabc...def",
    to: "0xdef...789",
    value: "1000000000000000000",
    timestamp: Math.floor(Date.now() / 1000),
    status: "success",
    nonce: 1,
    blockNumber: 12345678,
  },
  {
    hash: "0x123...abc",
    from: "0xabc...def",
    to: "0xdef...789",
    value: "1000000000000000000",
    timestamp: Math.floor(Date.now() / 1000),
    status: "success",
    nonce: 1,
    blockNumber: 12345678,
  },
  {
    hash: "0x456...def",
    from: "0x789...123",
    to: "0xfed...456",
    value: "500000000000000000",
    timestamp: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
    status: "pending",
    nonce: 2,
    blockNumber: 12345679,
  },
  {
    hash: "0x789...ghi",
    from: "0xabc...def",
    to: "0x123...456",
    value: "2500000000000000000",
    timestamp: Math.floor(Date.now() / 1000) - 7200, // 2 hours ago
    status: "failed",
    nonce: 3,
    blockNumber: 12345680,
  },
  {
    hash: "0xdef...jkl",
    from: "0xfed...456",
    to: "0x789...123",
    value: "750000000000000000",
    timestamp: Math.floor(Date.now() / 1000) - 10800, // 3 hours ago
    status: "success",
    nonce: 4,
    blockNumber: 12345681,
  }
];

export default function TransactionHistoryPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");
  const transactions = mockTransactions;

  const handleTransactionClick = useCallback((tx: Transaction) => {
    console.log("Clicked transaction:", tx);
    // Simulate transaction details view
    window.open(`https://etherscan.io/tx/${tx.hash}`, "_blank");
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="space-y-6 py-4 sm:py-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Transaction History
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            A component for displaying transaction history with filtering and sorting capabilities.
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
                <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  Total Transactions: {transactions.length}
                </div>
                <TransactionHistory
                  transactions={transactions}
                  onTransactionClick={handleTransactionClick}
                  itemsPerPage={5}
                />
              </div>
            ) : (
              <CodeBlock
                code={`import { TransactionHistory } from "@/components/ui/transaction-history"
import { useState, useCallback } from "react"

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  status: "success" | "pending" | "failed";
  nonce: number;
  blockNumber?: number;
}

const transactions = ${JSON.stringify(mockTransactions, null, 2)};

export default function Page() {
  const [transactions, setTransactions] = useState<Transaction[]>(transactions);

  const handleTransactionClick = useCallback((tx: Transaction) => {
    console.log("Clicked transaction:", tx);
    // Simulate transaction details view
    window.open(\`https://etherscan.io/tx/\${tx.hash}\`, "_blank");
  }, []);

  return (
    <div>
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Total Transactions: {transactions.length}
      </div>
      <TransactionHistory
        transactions={transactions}
        onTransactionClick={handleTransactionClick}
        itemsPerPage={5}
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
                    Run the following command to add the Transaction History component to your project:
                  </p>
                  <CodeBlock code="npx w3-kit@latest add transaction-history" id="cli" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                    This will:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <li>Create the component in your <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">components/ui</code> directory</li>
                    <li>Add all necessary dependencies to your package.json</li>
                    <li>Set up required configuration files</li>
                    <li>Add transaction formatting utilities to your project</li>
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
                      code={`// components/ui/transaction-history/index.tsx
import { TransactionHistory } from "@/components/ui/transaction-history/component"

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  status: "success" | "pending" | "failed";
  nonce: number;
  blockNumber?: number;
}

export interface TransactionHistoryProps {
  transactions: Transaction[];
  onTransactionClick: (tx: Transaction) => void;
  itemsPerPage?: number;
  className?: string;
}

export { TransactionHistory };`}
                      id="component"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      3. Use the component in your code:
                    </p>
                    <CodeBlock
                      code={`import { TransactionHistory } from "@/components/ui/transaction-history"
import { useState, useCallback } from "react"

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  status: "success" | "pending" | "failed";
  nonce: number;
  blockNumber?: number;
}

const transactions = ${JSON.stringify(mockTransactions, null, 2)};

export default function Page() {
  const [transactions, setTransactions] = useState<Transaction[]>(transactions);

  const handleTransactionClick = useCallback((tx: Transaction) => {
    console.log("Clicked transaction:", tx);
    // Simulate transaction details view
    window.open(\`https://etherscan.io/tx/\${tx.hash}\`, "_blank");
  }, []);

  return (
    <div>
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Total Transactions: {transactions.length}
      </div>
      <TransactionHistory
        transactions={transactions}
        onTransactionClick={handleTransactionClick}
        itemsPerPage={5}
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
