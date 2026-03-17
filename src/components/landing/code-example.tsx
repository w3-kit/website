import React from "react";
import Link from "next/link";

const codeSnippet = `import { AssetPortfolio } from 'w3-kit'

export default function Dashboard() {
  return (
    <AssetPortfolio
      address="0x1234...abcd"
      showChart
      className="max-w-lg"
    />
  )
}`;

export function CodeExampleSection() {
  return (
    <section className="px-6 lg:px-8 py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight text-gray-900 dark:text-white">
              Ship Web3 UI in minutes
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Import a component, customize it with Tailwind CSS, and you&apos;re
              ready to deploy. No complex setup, no boilerplate — just clean,
              accessible components that work.
            </p>
            <Link
              href="/docs/installation"
              className="mt-6 inline-flex text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-150"
            >
              View Documentation →
            </Link>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-950 overflow-hidden shadow-sm">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800">
              <div className="h-3 w-3 rounded-full bg-red-500/60" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
              <div className="h-3 w-3 rounded-full bg-green-500/60" />
              <span className="ml-2 text-xs text-gray-500">Dashboard.tsx</span>
            </div>
            <pre className="p-6 overflow-x-auto text-sm leading-relaxed font-mono text-gray-300">
              <code>{codeSnippet}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
