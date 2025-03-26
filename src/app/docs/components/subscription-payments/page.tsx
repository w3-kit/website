"use client";

import React, { useState, useCallback } from "react";
import { SubscriptionPayments, SubscriptionPlan } from "./component";
import { Code, Eye } from "lucide-react";
import { CodeBlock } from "@/components/docs/codeBlock";

// Define the SubscriptionData interface
interface SubscriptionData {
  id: string;
  plan: SubscriptionPlan;
  status: "active" | "cancelled" | "expired";
  startDate: number;
  nextBillingDate?: number;
  lastPaymentDate?: number;
  lastPaymentAmount?: string;
}

const mockPlans: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Basic",
    price: "0.1",
    token: {
      symbol: "ETH",
      logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      decimals: 18,
    },
    interval: "monthly",
    features: [
      "Basic features",
      "Email support",
      "Community access",
      "Basic analytics",
    ],
    description: "Perfect for getting started with our platform",
    icon: "sparkles",
  },
  {
    id: "pro",
    name: "Pro",
    price: "0.5",
    token: {
      symbol: "ETH",
      logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      decimals: 18,
    },
    interval: "monthly",
    features: [
      "All Basic features",
      "Priority support",
      "Advanced analytics",
      "API access",
      "Custom integrations",
    ],
    description: "Best value for most users",
    icon: "zap",
    isPopular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "2.0",
    token: {
      symbol: "ETH",
      logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      decimals: 18,
    },
    interval: "monthly",
    features: [
      "All Pro features",
      "24/7 dedicated support",
      "Custom solutions",
      "SLA guarantee",
      "Team management",
    ],
    description: "For large organizations with custom needs",
    icon: "shield",
  },
];

const mockSubscriptions: SubscriptionData[] = [
  {
    id: "1",
    plan: mockPlans[1],
    status: "active",
    startDate: Date.now() - 30 * 24 * 60 * 60 * 1000,
    nextBillingDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
    lastPaymentDate: Date.now() - 30 * 24 * 60 * 60 * 1000,
    lastPaymentAmount: "0.5",
  },
];

export default function SubscriptionPaymentsPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");
  const [subscriptions, setSubscriptions] = useState<SubscriptionData[]>(mockSubscriptions);

  const handleSubscribe = useCallback(async (planId: string) => {
    const plan = mockPlans.find(p => p.id === planId);
    if (!plan) return;

    const newSubscription: SubscriptionData = {
      id: Math.random().toString(36).substr(2, 9),
      plan,
      status: "active",
      startDate: Date.now(),
      nextBillingDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
    };

    setSubscriptions(prev => [...prev, newSubscription]);
  }, []);

  

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="space-y-6 py-4 sm:py-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Subscription Payments
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            Manage recurring crypto payments with flexible subscription plans and automated billing.
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
                  Active Subscriptions: {subscriptions.filter(s => s.status === "active").length}
                </div>
                <SubscriptionPayments
                  plans={mockPlans}
                  onSubscribe={handleSubscribe}
                />
              </div>
            ) : (
              <CodeBlock
                code={`import { SubscriptionPayments } from "@/components/ui/subscription-payments"
import { useState, useCallback } from "react"

const plans = ${JSON.stringify(mockPlans, null, 2)};

export default function Page() {
  const [subscriptions, setSubscriptions] = useState([]);

  const handleSubscribe = useCallback(async (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (!plan) return;

    const newSubscription = {
      id: Math.random().toString(36).substr(2, 9),
      plan,
      status: "active",
      startDate: Date.now(),
      nextBillingDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
    };

    setSubscriptions(prev => [...prev, newSubscription]);
  }, []);

  const handleCancel = useCallback((subscriptionId: string) => {
    setSubscriptions(prev =>
      prev.map(sub =>
        sub.id === subscriptionId
          ? { ...sub, status: "cancelled" }
          : sub
      )
    );
  }, []);

  return (
    <div>
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Active Subscriptions: {subscriptions.filter(s => s.status === "active").length}
      </div>
      <SubscriptionPayments
        plans={plans}
        onSubscribe={handleSubscribe}
        onCancel={handleCancel}
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
                    Run the following command to add the Subscription Payments component to your project:
                  </p>
                  <CodeBlock code="npx w3-kit@latest add subscription-payments" id="cli" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                    This will:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <li>Create the component in your <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">components/ui</code> directory</li>
                    <li>Add all necessary dependencies to your package.json</li>
                    <li>Set up required configuration files</li>
                    <li>Add subscription management utilities to your project</li>
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
                      code={`// components/ui/subscription-payments/index.tsx
import { SubscriptionPayments } from "@/components/ui/subscription-payments/component"

export interface Token {
  symbol: string;
  logoURI: string;
  decimals: number;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  token: Token;
  interval: "monthly" | "yearly";
  features: string[];
  description: string;
  icon: string;
  isPopular?: boolean;
}

export interface SubscriptionPaymentsProps {
  plans: SubscriptionPlan[];
  onSubscribe?: (planId: string) => void;
  onCancel?: (subscriptionId: string) => void;
  className?: string;
}

export { SubscriptionPayments };`}
                      id="component"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      3. Use the component in your code:
                    </p>
                    <CodeBlock
                      code={`import { SubscriptionPayments } from "@/components/ui/subscription-payments"
import { useState, useCallback } from "react"

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "0.1",
    token: {
      symbol: "ETH",
      logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      decimals: 18,
    },
    interval: "monthly",
    features: [
      "Basic features",
      "Email support",
      "Community access",
      "Basic analytics",
    ],
    description: "Perfect for getting started with our platform",
    icon: "sparkles",
  }
];

export default function Page() {
  const [subscriptions, setSubscriptions] = useState([]);

  const handleSubscribe = useCallback(async (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (!plan) return;

    const newSubscription = {
      id: Math.random().toString(36).substr(2, 9),
      plan,
      status: "active",
      startDate: Date.now(),
      nextBillingDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
    };

    setSubscriptions(prev => [...prev, newSubscription]);
  }, []);

  const handleCancel = useCallback((subscriptionId: string) => {
    setSubscriptions(prev =>
      prev.map(sub =>
        sub.id === subscriptionId
          ? { ...sub, status: "cancelled" }
          : sub
      )
    );
  }, []);

  return (
    <div>
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Active Subscriptions: {subscriptions.filter(s => s.status === "active").length}
      </div>
      <SubscriptionPayments
        plans={plans}
        onSubscribe={handleSubscribe}
        onCancel={handleCancel}
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