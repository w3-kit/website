"use client";

import React from "react";
import Link from "next/link";
import { getComponentList } from "@/config/docs";

// Same category structure as existing navbar — dynamically generated
function getComponentsMenu() {
  const components = getComponentList();

  return [
    {
      title: "Data Display",
      items: components.filter((c) =>
        ["NFT Card", "Token Card", "Price Ticker", "NFT Collection Grid", "Token List", "Wallet Balance", "Transaction History"].includes(c.title)
      ),
    },
    {
      title: "Inputs & Actions",
      items: components.filter((c) =>
        ["Token Swap", "Bridge", "Network Switcher", "Connect Wallet", "Contract Interaction", "Address Book", "Token Airdrop", "Subscription Payments"].includes(c.title)
      ),
    },
    {
      title: "DeFi Tools",
      items: components.filter((c) =>
        ["DeFi Position Manager", "Limit Order & Stop-Loss Manager", "Flash Loan Executor", "Token Vesting", "Staking Interface", "Liquidity Pool Stats"].includes(c.title)
      ),
    },
    {
      title: "Analytics",
      items: components.filter((c) =>
        ["Asset Portfolio", "Gas Calculator", "Smart Contract Scanner", "NFT Marketplace Aggregator"].includes(c.title)
      ),
    },
    {
      title: "Advanced",
      items: components.filter((c) =>
        ["Multisignature Wallets", "ENS Resolver"].includes(c.title)
      ),
    },
  ];
}

const RESOURCES_MENU = [
  {
    title: "Learn",
    items: [
      { title: "Installation Guide", href: "/docs/installation" },
      { title: "Getting Started", href: "/docs/components" },
      { title: "API Reference", href: "/docs/api" },
      { title: "MCP Server", href: "/docs/mcp" },
    ],
  },
  {
    title: "Community",
    items: [
      { title: "GitHub", href: "https://github.com/w3-kit/ui", external: true },
      { title: "Contributing", href: "https://github.com/w3-kit/ui/contributing", external: true },
      { title: "Changelog", href: "https://github.com/w3-kit/ui/releases", external: true },
    ],
  },
];

export function ComponentsMegaMenu() {
  const categories = getComponentsMenu();

  return (
    <div className="w-full p-6">
      <div className="pb-3 mb-4 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Components</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Explore our collection of Web3 UI components
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-6">
        {categories.map((category) => (
          <div key={category.title}>
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              {category.title}
            </div>
            <div className="space-y-1">
              {category.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-1.5 px-2 -mx-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
                >
                  {item.title}
                  {item.description && (
                    <span className="block text-xs text-gray-400 dark:text-gray-500 mt-0.5 line-clamp-1">
                      {item.description}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-800">
        <Link
          href="/docs/components"
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-150"
        >
          View All Components →
        </Link>
      </div>
    </div>
  );
}

export function ResourcesMegaMenu() {
  return (
    <div className="p-6 min-w-[420px]">
      <div className="grid grid-cols-2 gap-x-12 gap-y-4">
        {RESOURCES_MENU.map((section) => (
          <div key={section.title}>
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              {section.title}
            </div>
            <div className="space-y-1">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  {...("external" in item && item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="block py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-150"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
