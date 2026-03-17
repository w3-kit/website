"use client";

import React, { useState } from "react";
import { ENSResolver } from "@/components/w3-kit/ens-resolver";
import { Code, Eye } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";

export default function ENSResolverPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="space-y-6 py-4 sm:py-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            ENS Resolver
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            A component for resolving ENS names to Ethereum addresses and vice versa.
          </p>
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
                <ENSResolver
                  onResolve={(result) => console.log("Resolved:", result)}
                />
              </div>
            ) : (
              <CodeBlock
                code={`import { ENSResolver } from "@/components/ui/ens-resolver"
import { useState } from "react"

// Example ENS data
const ensData = {
  address: "0x1234...5678",
  ensName: "vitalik.eth",
  avatar: "https://metadata.ens.domains/mainnet/avatar/vitalik.eth",
  records: {
    email: "vitalik@ethereum.org",
    twitter: "VitalikButerin",
    github: "vitalikbuterin"
  }
};

export default function Page() {
  const [resolvedData, setResolvedData] = useState<typeof ensData | null>(null);

  return (
    <ENSResolver
      onResolve={(result) => {
        console.log("Resolved:", result);
        setResolvedData(result);
      }}
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
                    Run the following command to add the ENS Resolver component to your project:
                  </p>
                  <CodeBlock code="npx shadcn@latest add https://w3-kit.com/registry/ens-resolver.json" id="cli" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                    This will:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <li>Create the component in your <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">components/ui</code> directory</li>
                    <li>Add all necessary dependencies to your package.json</li>
                    <li>Set up required configuration files</li>
                    <li>Add ENS resolution utilities to your project</li>
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
                      code={`// components/ui/ens-resolver/index.tsx
import { ENSResolver } from "@/components/ui/ens-resolver/component"

export interface ENSRecords {
  email?: string;
  twitter?: string;
  github?: string;
  [key: string]: string | undefined;
}

export interface ENSResult {
  address: string;
  ensName: string | null;
  avatar: string | null;
  records: ENSRecords;
}

export interface ENSResolverProps {
  variant?: "default" | "compact";
  onResolve: (result: ENSResult) => void;
}

export { ENSResolver };`}
                      id="component"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      3. Use the component in your code:
                    </p>
                    <CodeBlock
                      code={`import { ENSResolver } from "@/components/ui/ens-resolver"
import { useState } from "react"

export default function Page() {
  const [resolvedData, setResolvedData] = useState<ENSResult | null>(null);

  return (
    <ENSResolver
      variant="default"
      onResolve={(result) => {
        console.log("Resolved:", result);
        setResolvedData(result);
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
