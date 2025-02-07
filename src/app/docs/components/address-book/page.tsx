"use client";

import React, { useState } from "react";
import { AddressBook } from "./component";
import { Code, Eye } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";

export default function AddressBookPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [selectedVariant, setSelectedVariant] = useState<'default' | 'compact'>('default');
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");

  // Mock data for the address book
  const mockEntries = [
    {
      id: '1',
      name: 'Vitalik Buterin',
      address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
      ensName: 'vitalik.eth',
      avatar: 'https://avatars.githubusercontent.com/u/2911?v=4'
    },
    {
      id: '2',
      name: 'Ethereum Foundation',
      address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
      ensName: 'ethereum.eth',
      notes: 'Main donation address'
    },
    {
      id: '3',
      name: 'Uniswap',
      address: '0x1a9C8182C09F50C8318d769245beA52c32BE35BC',
      ensName: 'uniswap.eth',
      notes: 'DEX protocol'
    }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="space-y-6 py-4 sm:py-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Address Book
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            A component for managing Ethereum addresses and ENS names with notes and avatars.
          </p>
        </div>

        {/* Variant Selector */}
        <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-800">
          {(['default', 'compact'] as const).map((variant) => (
            <button
              key={variant}
              onClick={() => setSelectedVariant(variant)}
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                selectedVariant === variant
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              }`}
            >
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </button>
          ))}
        </div>

        {/* Preview/Code Section */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
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

          <div className="rounded-lg overflow-hidden">
            {activeTab === "preview" ? (
              <div className="p-4 bg-gray-50 dark:bg-gray-900">
                <AddressBook
                  entries={mockEntries}
                  variant={selectedVariant}
                  onAdd={(entry) => console.log("Added:", entry)}
                  onEdit={(entry) => console.log("Edited:", entry)}
                  onDelete={(id) => console.log("Deleted:", id)}
                />
              </div>
            ) : (
              <CodeBlock
                code={`import { AddressBook } from "@w3-kit/address-book";

const entries = ${JSON.stringify(mockEntries.slice(0, 1), null, 2)};

export default function Page() {
  return (
    <AddressBook
      entries={entries}
      variant="${selectedVariant}"
      onAdd={(entry) => console.log("Added:", entry)}
      onEdit={(entry) => console.log("Edited:", entry)}
      onDelete={(id) => console.log("Deleted:", id)}
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
                <CodeBlock code="npx w3-kit@latest add address-book" id="cli" />
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      1. Install the package using npm:
                    </p>
                    <CodeBlock code="npm install @w3-kit/address-book" id="npm" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      2. Import and use the component:
                    </p>
                    <CodeBlock
                      code={`import { AddressBook } from "@w3-kit/address-book";

const entries = [
  {
    id: '1',
    name: 'Vitalik Buterin',
    address: '0xd8dA...',
    ensName: 'vitalik.eth'
  }
];

export default function Page() {
  return (
    <AddressBook
      entries={entries}
      onAdd={(entry) => console.log("Added:", entry)}
      onEdit={(entry) => console.log("Edited:", entry)}
      onDelete={(id) => console.log("Deleted:", id)}
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
