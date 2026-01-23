"use client";

import React, { useState, useCallback } from "react";
import { SmartContractScanner } from "@/components/w3-kit/smart-contract-scanner";
import { Code, Eye, AlertTriangle } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";
import { ContractError } from "@/components/w3-kit/smart-contract-scanner-types";

export default function SmartContractScannerPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");
  const [lastError, setLastError] = useState<ContractError | null>(null);
  const [scanHistory, setScanHistory] = useState<string[]>([]);

  // Handle contract scanning
  const handleScan = useCallback((address: string) => {
    console.log("Scanning contract:", address);
    setScanHistory(prev => [...prev, `Scanned: ${address} at ${new Date().toLocaleTimeString()}`]);
  }, []);

  // Handle contract errors
  const handleError = useCallback((error: ContractError) => {
    console.error("Contract scan error:", error);
    setLastError(error);
    
    // Clear error after 5 seconds
    setTimeout(() => {
      setLastError(null);
    }, 5000);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="space-y-6 py-4 sm:py-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Smart Contract Scanner
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            A comprehensive smart contract analysis tool for security scanning, function exploration, and code verification.
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
                {/* Error display */}
                {lastError && (
                  <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg flex items-start space-x-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-amber-800 dark:text-amber-300">Contract Scan Error</h4>
                      <p className="text-sm text-amber-700 dark:text-amber-400">
                        Error: {lastError}
                      </p>
                    </div>
                  </div>
                )}
                
                <SmartContractScanner
                  onScan={handleScan}
                  onError={handleError}
                />

                {/* Scan history display */}
                {scanHistory.length > 0 && (
                  <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Scan History</h3>
                    <div className="bg-white dark:bg-gray-800 rounded-md p-3 text-sm">
                      <ul className="space-y-1">
                        {scanHistory.map((item, index) => (
                          <li key={index} className="text-gray-700 dark:text-gray-300">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <CodeBlock
                code={`import { SmartContractScanner, ContractError } from "@/components/ui/smart-contract-scanner"
import { useState, useCallback } from "react"

export default function Page() {
  const [lastError, setLastError] = useState<ContractError | null>(null);
  const [scanHistory, setScanHistory] = useState<string[]>([]);

  const handleScan = useCallback((address: string) => {
    console.log("Scanning contract:", address);
    setScanHistory(prev => [...prev, \`Scanned: \${address} at \${new Date().toLocaleTimeString()}\`]);
  }, []);

  const handleError = useCallback((error: ContractError) => {
    console.error("Contract scan error:", error);
    setLastError(error);
    
    // Clear error after 5 seconds
    setTimeout(() => {
      setLastError(null);
    }, 5000);
  }, []);

  return (
    <div>
      {lastError && (
        <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg">
          <p className="text-amber-700 dark:text-amber-400">
            Error: {lastError}
          </p>
        </div>
      )}
      
      <SmartContractScanner
        onScan={handleScan}
        onError={handleError}
      />

      {scanHistory.length > 0 && (
        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Scan History</h3>
          <div className="bg-white dark:bg-gray-800 rounded-md p-3 text-sm">
            <ul className="space-y-1">
              {scanHistory.map((item, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
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
                    Run the following command to add the Smart Contract Scanner component to your project:
                  </p>
                  <CodeBlock code="npx shadcn@latest add https://w3-kit.com/registry/smart-contract-scanner.json" id="cli" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                    This will:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <li>Create the component in your <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">components/ui</code> directory</li>
                    <li>Add all necessary dependencies to your package.json</li>
                    <li>Set up required configuration files</li>
                    <li>Add contract scanning utilities to your project</li>
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
                      code={`// components/ui/smart-contract-scanner/index.tsx
import { SmartContractScanner } from "@/components/ui/smart-contract-scanner/component"

export enum ContractError {
  INVALID_ADDRESS = "INVALID_ADDRESS",
  NOT_FOUND = "NOT_FOUND",
  NOT_VERIFIED = "NOT_VERIFIED",
  NETWORK_ERROR = "NETWORK_ERROR",
  SCAN_FAILED = "SCAN_FAILED",
  RATE_LIMIT = "RATE_LIMIT",
  TIMEOUT = "TIMEOUT",
  UNKNOWN = "UNKNOWN"
}

export interface SmartContractScannerProps {
  onScan?: (address: string) => void;
  onFunctionCall?: (name: string, inputs: any[]) => void;
  onError?: (error: ContractError) => void;
  className?: string;
}

export { SmartContractScanner };`}
                      id="component"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      3. Use the component in your code:
                    </p>
                    <CodeBlock
                      code={`import { SmartContractScanner, ContractError } from "@/components/ui/smart-contract-scanner"
import { useState, useCallback } from "react"

export default function Page() {
  const [lastError, setLastError] = useState<ContractError | null>(null);
  const [scanHistory, setScanHistory] = useState<string[]>([]);

  const handleScan = useCallback((address: string) => {
    console.log("Scanning contract:", address);
    setScanHistory(prev => [...prev, \`Scanned: \${address} at \${new Date().toLocaleTimeString()}\`]);
  }, []);

  const handleError = useCallback((error: ContractError) => {
    console.error("Contract scan error:", error);
    setLastError(error);
    
    // Clear error after 5 seconds
    setTimeout(() => {
      setLastError(null);
    }, 5000);
  }, []);

  return (
    <div>
      {lastError && (
        <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg">
          <p className="text-amber-700 dark:text-amber-400">
            Error: {lastError}
          </p>
        </div>
      )}
      
      <SmartContractScanner
        onScan={handleScan}
        onError={handleError}
      />

      {scanHistory.length > 0 && (
        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Scan History</h3>
          <div className="bg-white dark:bg-gray-800 rounded-md p-3 text-sm">
            <ul className="space-y-1">
              {scanHistory.map((item, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
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

        {/* Error Handling Section */}
        <div className="space-y-4 mt-8 sm:mt-12">
          <h2 className="text-xl sm:text-2xl font-semibold border-b border-gray-200 dark:border-gray-800 pb-2 text-gray-900 dark:text-white">
            Error Handling
          </h2>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The Smart Contract Scanner component provides comprehensive error handling through the <code className="text-sm bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">onError</code> callback and the <code className="text-sm bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">ContractError</code> enum.
            </p>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Error Types</h3>
              <div className="bg-white dark:bg-gray-800 rounded-md p-4 text-sm">
                <ul className="space-y-2">
                  <li><strong>INVALID_ADDRESS</strong>: The provided address doesn&apos;t match the Ethereum address format</li>
                  <li><strong>NOT_FOUND</strong>: The contract address doesn&apos;t exist on the blockchain</li>
                  <li><strong>NOT_VERIFIED</strong>: The contract exists but isn&apos;t verified</li>
                  <li><strong>NETWORK_ERROR</strong>: Connection issues with the blockchain provider</li>
                  <li><strong>SCAN_FAILED</strong>: General scanning failure</li>
                  <li><strong>RATE_LIMIT</strong>: API rate limit exceeded</li>
                  <li><strong>TIMEOUT</strong>: Request timeout</li>
                  <li><strong>UNKNOWN</strong>: Unspecified error</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Example Error Handler</h3>
              <CodeBlock
                code={`// Example error handler with different responses per error type
const handleContractError = (error: ContractError) => {
  switch(error) {
    case ContractError.INVALID_ADDRESS:
      showNotification("Please enter a valid Ethereum address");
      break;
    case ContractError.NOT_FOUND:
      showNotification("Contract not found on this network");
      break;
    case ContractError.NOT_VERIFIED:
      showNotification("This contract is not verified", "warning");
      break;
    case ContractError.NETWORK_ERROR:
      showNotification("Network connection error. Please try again", "error");
      break;
    case ContractError.RATE_LIMIT:
      showNotification("Too many requests. Please wait and try again", "error");
      break;
    default:
      showNotification("An error occurred while scanning the contract", "error");
  }
};`}
                id="error-handler"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
