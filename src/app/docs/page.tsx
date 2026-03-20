import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Documentation",
  description: "Learn how to build Web3 applications with W3-Kit's accessible and modern component library. Get started with installation, usage guides, and component documentation.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Documentation",
    description: "Learn how to build Web3 applications with W3-Kit's accessible and modern component library.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
  },
};


export default function DocsPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Getting Started</h1>
      
      <section className="prose dark:prose-invert prose-slate max-w-none">
        <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
          Welcome to our UI library documentation. This library provides a set of reusable,
          accessible components to help you build beautiful web applications quickly.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Quick Start</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Get started by installing the package using your preferred package manager:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <code className="text-gray-800 dark:text-gray-200">npx w3-kit@latest init</code>
        </pre>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Features</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Fully typed components with TypeScript</li>
          <li>Accessible by default</li>
          <li>Customizable theming</li>
          <li>Modern design system</li>
        </ul>
      </section>
    </div>
  )
}
