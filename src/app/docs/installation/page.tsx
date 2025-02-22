import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Installation | W3-Kit",
  description: "Learn how to install and set up W3-Kit in your Web3 application. Simple setup instructions for npm, yarn, and other package managers.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Installation | W3-Kit",
    description: "Learn how to install and set up W3-Kit in your Web3 application.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
  },
};
export default function InstallationPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Installation</h1>
      
      <section className="prose dark:prose-invert prose-slate max-w-none">
        <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
          Follow these steps to install and set up the UI library in your project.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">NPM</h2>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <code className="text-gray-800 dark:text-gray-200">npm install your-ui-library</code>
        </pre>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Yarn</h2>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <code className="text-gray-800 dark:text-gray-200">yarn add your-ui-library</code>
        </pre>
      </section>
    </div>
  )
} 