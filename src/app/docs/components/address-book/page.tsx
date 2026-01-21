"use client";

import React, { useState } from "react";
import { AddressBook } from "@/components/w3-kit/address-book";
import { Code, Eye } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";

// Define the AddressEntry type
interface AddressEntry {
  id: string;
  name: string;
  address: string;
  ensName?: string;
  avatar?: string;
  notes?: string;
}

export default function AddressBookPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [selectedVariant, setSelectedVariant] = useState<'default' | 'compact'>('default');
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");
  
  // Add state management for addresses
  const [addresses, setAddresses] = useState<AddressEntry[]>([
    {
      id: '1',
      name: 'Vitalik Buterin',
      address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
      ensName: 'vitalik.eth',
      avatar: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fobserver.com%2Fwp-content%2Fuploads%2Fsites%2F2%2F2021%2F05%2FGettyImages-500445690.jpeg%3Fquality%3D80%26w%3D970&f=1&nofb=1&ipt=1a48351457acfce00ed5d5a7d1db721fe4b633160e13f97ce5bc513dc27a9010&ipo=images',
      notes: 'Ethereum Co-founder'
    },
    {
      id: '2',
      name: 'Changpeng Zhao (CZ)',
      address: '0x89012765432abcdef89012765432abcdef890127',
      ensName: 'cz.bnb',
      avatar: 'https://watcher.guru/news/wp-content/uploads/2021/09/ChangPeng-CZ-Zhao.png',
      notes: 'Binance CEO'
    },
    {
      id: '3',
      name: 'Charles Hoskinson',
      address: '0xabcdef89012765432abcdef89012765432abcdef',
      ensName: 'charles.ada',
      avatar: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.cryptopolitan.com%2Fwp-content%2Fuploads%2F2024%2F07%2FCardano-founder-Charles-Hoskinson-shares-thoughts-on-Donald-Trumps-assassination-attempt.jpg&f=1&nofb=1&ipt=ebef5b4ecdc6e5a80cba530815181de6b33f2d8e58b912a75421ad64c6c7680b&ipo=images',
      notes: 'Cardano Founder'
    }
  ]);

  // Handle adding new address
  const handleAdd = (entry: Omit<AddressEntry, 'id'>) => {
    const newEntry = {
      ...entry,
      id: Date.now().toString(), // Generate unique ID
    };
    setAddresses(prev => [...prev, newEntry]);
  };

  // Handle editing address
  const handleEdit = (updatedEntry: AddressEntry) => {
    setAddresses(prev => 
      prev.map(entry => 
        entry.id === updatedEntry.id ? updatedEntry : entry
      )
    );
  };

  // Handle deleting address
  const handleDelete = (id: string) => {
    setAddresses(prev => prev.filter(entry => entry.id !== id));
  };

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
                  entries={addresses}
                  onAdd={handleAdd}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  variant={selectedVariant}
                />
              </div>
            ) : (
              <CodeBlock
                code={`import { AddressBook } from "@/components/ui/address-book"

const entries = [
  {
    id: '1',
    name: 'Vitalik Buterin',
    address: '0xd8dA...',
    ensName: 'vitalik.eth',
    notes: 'Ethereum Co-founder'
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
                    Run the following command to add the Address Book component to your project using the shadcn CLI:
                  </p>
                  <CodeBlock code="npx shadcn@latest add https://w3-kit.com/registry/address-book.json" id="cli" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                    This will:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <li>Create the component in your <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">components/w3-kit</code> directory</li>
                    <li>Add all necessary dependencies (lucide-react) to your package.json</li>
                    <li>Set up the types and utility files</li>
                  </ul>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      1. Make sure you have a <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">components.json</code> file in your project root:
                    </p>
                    <CodeBlock code={`{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}`} id="init" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      2. Install the component via shadcn CLI:
                    </p>
                    <CodeBlock code="npx shadcn@latest add https://w3-kit.com/registry/address-book.json" id="install" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      3. Use the component in your code:
                    </p>
                    <CodeBlock
                      code={`import { AddressBook } from "@/components/w3-kit/address-book"

const entries = [
  {
    id: '1',
    name: 'Vitalik Buterin',
    address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    ensName: 'vitalik.eth',
    notes: 'Ethereum Co-founder'
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
