"use client";

import React, { useState, useCallback } from "react";
import { TokenVesting } from "@/components/w3-kit/token-vesting";
import { Code, Eye } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";

// Define the VestingSchedule interface
interface VestingSchedule {
  id: string;
  tokenSymbol: string;
  totalAmount: string;
  vestedAmount: string;
  startDate: number;
  endDate: number;
  cliffDate: number;
  lastClaimDate: number | null;
  beneficiary: string;
  status: "pending" | "active" | "completed";
}

// Mock vesting schedules for preview
const mockVestingSchedules: VestingSchedule[] = [
  {
    id: "1",
    tokenSymbol: "TOKEN",
    totalAmount: "100000",
    vestedAmount: "25000",
    startDate: Date.now() - 90 * 24 * 60 * 60 * 1000, // 90 days ago
    endDate: Date.now() + 275 * 24 * 60 * 60 * 1000, // 275 days from now
    cliffDate: Date.now() - 30 * 24 * 60 * 60 * 1000, // Cliff ended 30 days ago
    lastClaimDate: Date.now() - 15 * 24 * 60 * 60 * 1000, // Last claimed 15 days ago
    beneficiary: "0x1234...5678",
    status: "active",
  },
  {
    id: "2",
    tokenSymbol: "REWARD",
    totalAmount: "50000",
    vestedAmount: "50000",
    startDate: Date.now() - 180 * 24 * 60 * 60 * 1000, // 180 days ago
    endDate: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
    cliffDate: Date.now() - 150 * 24 * 60 * 60 * 1000, // Cliff ended 150 days ago
    lastClaimDate: Date.now() - 30 * 24 * 60 * 60 * 1000, // Last claimed 30 days ago
    beneficiary: "0x8765...4321",
    status: "completed",
  },
  {
    id: "3",
    tokenSymbol: "NEW",
    totalAmount: "75000",
    vestedAmount: "0",
    startDate: Date.now() + 30 * 24 * 60 * 60 * 1000, // Starts in 30 days
    endDate: Date.now() + 395 * 24 * 60 * 60 * 1000, // 395 days from now
    cliffDate: Date.now() + 90 * 24 * 60 * 60 * 1000, // Cliff in 90 days
    lastClaimDate: null,
    beneficiary: "0x4444...9999",
    status: "pending",
  },
];

export default function TokenVestingPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");
  const [vestingSchedules, setVestingSchedules] = useState<VestingSchedule[]>(mockVestingSchedules);

  const handleClaimTokens = useCallback(async (scheduleId: string) => {
    console.log("Claiming tokens for schedule:", scheduleId);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Update the vesting schedule
    setVestingSchedules(prev => prev.map(schedule => 
      schedule.id === scheduleId
        ? {
            ...schedule,
            lastClaimDate: Date.now(),
            vestedAmount: schedule.totalAmount // For demo purposes, fully vest on claim
          }
        : schedule
    ));
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="space-y-6 py-4 sm:py-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Token Vesting
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            A component for managing and tracking token vesting schedules with detailed progress visualization.
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
                  Total Vested: {vestingSchedules.reduce((sum, s) => sum + Number(s.vestedAmount), 0).toLocaleString()} tokens
                </div>
                <TokenVesting
                  vestingSchedules={vestingSchedules}
                  onClaimTokens={handleClaimTokens}
                />
              </div>
            ) : (
              <CodeBlock
                code={`import { TokenVesting } from "@/components/ui/token-vesting"
import { useState, useCallback } from "react"

interface VestingSchedule {
  id: string;
  tokenSymbol: string;
  totalAmount: string;
  vestedAmount: string;
  startDate: number;
  endDate: number;
  cliffDate: number;
  lastClaimDate: number | null;
  beneficiary: string;
  status: "pending" | "active" | "completed";
}

const vestingSchedules = ${JSON.stringify(mockVestingSchedules, null, 2)};

export default function Page() {
  const [vestingSchedules, setVestingSchedules] = useState<VestingSchedule[]>(vestingSchedules);

  const handleClaimTokens = useCallback(async (scheduleId: string) => {
    console.log("Claiming tokens for schedule:", scheduleId);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Update the vesting schedule
    setVestingSchedules(prev => prev.map(schedule => 
      schedule.id === scheduleId
        ? {
            ...schedule,
            lastClaimDate: Date.now(),
            vestedAmount: schedule.totalAmount // For demo purposes, fully vest on claim
          }
        : schedule
    ));
  }, []);

  return (
    <div>
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Total Vested: {vestingSchedules.reduce((sum, s) => sum + Number(s.vestedAmount), 0).toLocaleString()} tokens
      </div>
      <TokenVesting
        vestingSchedules={vestingSchedules}
        onClaimTokens={handleClaimTokens}
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
                    Run the following command to add the Token Vesting component to your project:
                  </p>
                  <CodeBlock code="npx shadcn@latest add https://w3-kit.com/registry/token-vesting.json" id="cli" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                    This will:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <li>Create the component in your <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">components/ui</code> directory</li>
                    <li>Add all necessary dependencies to your package.json</li>
                    <li>Set up required configuration files</li>
                    <li>Add vesting calculation utilities to your project</li>
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
                      code={`// components/ui/token-vesting/index.tsx
import { TokenVesting } from "@/components/ui/token-vesting/component"

export interface VestingSchedule {
  id: string;
  tokenSymbol: string;
  totalAmount: string;
  vestedAmount: string;
  startDate: number;
  endDate: number;
  cliffDate: number;
  lastClaimDate: number | null;
  beneficiary: string;
  status: "pending" | "active" | "completed";
}

export interface TokenVestingProps {
  vestingSchedules: VestingSchedule[];
  onClaimTokens: (scheduleId: string) => Promise<void>;
  className?: string;
}

export { TokenVesting };`}
                      id="component"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      3. Use the component in your code:
                    </p>
                    <CodeBlock
                      code={`import { TokenVesting } from "@/components/ui/token-vesting"
import { useState, useCallback } from "react"

interface VestingSchedule {
  id: string;
  tokenSymbol: string;
  totalAmount: string;
  vestedAmount: string;
  startDate: number;
  endDate: number;
  cliffDate: number;
  lastClaimDate: number | null;
  beneficiary: string;
  status: "pending" | "active" | "completed";
}

const vestingSchedules = ${JSON.stringify(mockVestingSchedules, null, 2)};

export default function Page() {
  const [vestingSchedules, setVestingSchedules] = useState<VestingSchedule[]>(vestingSchedules);

  const handleClaimTokens = useCallback(async (scheduleId: string) => {
    console.log("Claiming tokens for schedule:", scheduleId);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Update the vesting schedule
    setVestingSchedules(prev => prev.map(schedule => 
      schedule.id === scheduleId
        ? {
            ...schedule,
            lastClaimDate: Date.now(),
            vestedAmount: schedule.totalAmount // For demo purposes, fully vest on claim
          }
        : schedule
    ));
  }, []);

  return (
    <div>
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Total Vested: {vestingSchedules.reduce((sum, s) => sum + Number(s.vestedAmount), 0).toLocaleString()} tokens
      </div>
      <TokenVesting
        vestingSchedules={vestingSchedules}
        onClaimTokens={handleClaimTokens}
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
