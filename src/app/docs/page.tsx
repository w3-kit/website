import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Documentation | W3-Kit",
  description: "Learn how to build Web3 applications with W3-Kit's accessible and modern component library. Get started with installation, usage guides, and component documentation.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Documentation | W3-Kit",
    description: "Learn how to build Web3 applications with W3-Kit's accessible and modern component library.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
  },
};


export default function DocsPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Getting Started</h1>

      <section className="prose dark:prose-invert prose-slate max-w-none">
        <p className="text-lg mb-4 text-muted-foreground">
          Welcome to our UI library documentation. This library provides a set of reusable,
          accessible components to help you build beautiful web applications quickly.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Quick Start</h2>
        <p className="text-muted-foreground">
          Get started by installing the package using your preferred package manager:
        </p>

        <pre className="bg-muted p-4 rounded-lg my-4">
          <code className="text-foreground">npx w3-kit@latest init</code>
        </pre>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Features</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Fully typed components with TypeScript</li>
          <li>Accessible by default</li>
          <li>Customizable theming</li>
          <li>Modern design system</li>
        </ul>
      </section>
    </div>
  )
}
