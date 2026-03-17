import React from "react";
import Link from "next/link";

const steps = [
  { number: 1, title: "Install", content: "npx w3-kit@latest init", isCode: true },
  { number: 2, title: "Import", content: "import { AssetPortfolio } from 'w3-kit'", isCode: true },
  { number: 3, title: "Ship", content: "Customize with Tailwind and deploy", isCode: false },
];

export function GettingStartedSection() {
  return (
    <section className="px-6 lg:px-8 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight text-gray-900 dark:text-white">
          Get started in 3 steps
        </h2>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
          <div className="hidden sm:block absolute top-8 left-[16.67%] right-[16.67%] h-px bg-gray-200 dark:bg-gray-800" />
          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col items-center">
              <div className="relative z-10 flex items-center justify-center h-16 w-16 rounded-full border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-xl font-bold text-gray-900 dark:text-white">
                {step.number}
              </div>
              <h3 className="mt-4 text-base font-semibold text-gray-900 dark:text-white">
                {step.title}
              </h3>
              {step.isCode ? (
                <code className="mt-2 px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-900 text-xs sm:text-sm font-mono text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800">
                  {step.content}
                </code>
              ) : (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {step.content}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="mt-16">
          <Link
            href="/docs/installation"
            className="rounded-full bg-gray-900 dark:bg-white px-8 py-3 text-sm font-semibold text-white dark:text-gray-900 shadow-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
