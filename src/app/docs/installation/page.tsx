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
      <h1 className="text-3xl font-bold mb-6 text-foreground">Installation</h1>

      <section className="prose dark:prose-invert prose-slate max-w-none">
        <p className="text-lg mb-4 text-muted-foreground">
          Install and configure W3-Kit for your Web3 application. W3-Kit follows the shadcn/ui patterns for seamless integration.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Prerequisites</h2>
        <p className="text-muted-foreground mb-4">
          Before you begin, ensure your project meets these requirements:
        </p>
        <ul className="list-disc pl-6 mb-6 text-muted-foreground">
          <li><strong>Frameworks:</strong> Next.js, Vite, Remix, or Laravel</li>
          <li><strong>Required:</strong> React 18+ and Tailwind CSS</li>
          <li><strong>Recommended:</strong> TypeScript for better developer experience</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Create Project</h2>
        <p className="text-muted-foreground mb-4">
          Start a new project with the shadcn CLI. This sets up your project with customizable styles and configurations:
        </p>
        <pre className="bg-muted p-4 rounded-lg my-4">
          <code className="text-foreground">npx shadcn@latest init</code>
        </pre>
        <p className="text-muted-foreground mb-4">
          Or use the new <code className="bg-muted px-2 py-1 rounded">create</code> command for an interactive setup with more customization options:
        </p>
        <pre className="bg-muted p-4 rounded-lg my-4">
          <code className="text-foreground">npx shadcn@latest create</code>
        </pre>
        <p className="text-muted-foreground mb-4">
          The create command allows you to customize:
        </p>
        <ul className="list-disc pl-6 mb-6 text-muted-foreground">
          <li>Component library (Radix UI or Base UI)</li>
          <li>Visual style presets</li>
          <li>Base color scheme</li>
          <li>Fonts and icons</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">Visual Style Presets</h3>
        <p className="text-muted-foreground mb-4">
          Choose from 5 visual styles to match your design system:
        </p>
        <ul className="list-disc pl-6 mb-6 text-muted-foreground">
          <li><strong>Vega</strong> – The classic shadcn/ui look</li>
          <li><strong>Nova</strong> – Reduced padding and margins for compact layouts</li>
          <li><strong>Maia</strong> – Soft and rounded, with generous spacing</li>
          <li><strong>Lyra</strong> – Boxy and sharp, pairs well with mono fonts</li>
          <li><strong>Mira</strong> – Compact, made for dense interfaces</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Add W3-Kit Components</h2>
        <p className="text-muted-foreground mb-4">
          Once your project is set up, add Web3 components using the W3-Kit CLI. For example, to add the NFT Collection Grid:
        </p>
        <pre className="bg-muted p-4 rounded-lg my-4">
          <code className="text-foreground">npx w3-kit@latest add nft-collection-grid</code>
        </pre>

        <p className="text-muted-foreground mb-4">
          This command will:
        </p>
        <ul className="list-disc pl-6 mb-6 text-muted-foreground">
          <li>Create a <code className="bg-muted px-2 py-1 rounded">components/ui</code> directory in your project</li>
          <li>Copy the selected component to <code className="bg-muted px-2 py-1 rounded">components/ui/nft-collection-grid</code></li>
          <li>Create a config directory and copy the <code className="bg-muted px-2 py-1 rounded">tokens.ts</code> file</li>
          <li>Add all necessary dependencies to your <code className="bg-muted px-2 py-1 rounded">package.json</code></li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Useful CLI Commands</h2>
        <p className="text-muted-foreground mb-4">
          The shadcn CLI provides additional commands to help you manage components:
        </p>
        <div className="space-y-4">
          <div>
            <p className="text-muted-foreground mb-2">
              <strong>View a component before installing:</strong>
            </p>
            <pre className="bg-muted p-4 rounded-lg">
              <code className="text-foreground">npx shadcn@latest view button</code>
            </pre>
          </div>
          <div>
            <p className="text-muted-foreground mb-2">
              <strong>Search for components:</strong>
            </p>
            <pre className="bg-muted p-4 rounded-lg">
              <code className="text-foreground">npx shadcn@latest search</code>
            </pre>
          </div>
          <div>
            <p className="text-muted-foreground mb-2">
              <strong>List all available components:</strong>
            </p>
            <pre className="bg-muted p-4 rounded-lg">
              <code className="text-foreground">npx shadcn@latest list</code>
            </pre>
          </div>
          <div>
            <p className="text-muted-foreground mb-2">
              <strong>Check for component updates:</strong>
            </p>
            <pre className="bg-muted p-4 rounded-lg">
              <code className="text-foreground">npx shadcn@latest diff</code>
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Migration Guide</h2>
        <p className="text-muted-foreground mb-4">
          If you have an existing project using the old <code className="bg-muted px-2 py-1 rounded">@radix-ui/react-*</code> packages, you can migrate to the new unified <code className="bg-muted px-2 py-1 rounded">radix-ui</code> package:
        </p>
        <pre className="bg-muted p-4 rounded-lg my-4">
          <code className="text-foreground">npx shadcn@latest migrate radix</code>
        </pre>
        <p className="text-muted-foreground mb-4">
          This command will:
        </p>
        <ul className="list-disc pl-6 mb-6 text-muted-foreground">
          <li>Replace all <code className="bg-muted px-2 py-1 rounded">@radix-ui/react-*</code> imports with <code className="bg-muted px-2 py-1 rounded">radix-ui</code></li>
          <li>Update your UI components automatically</li>
          <li>Install the new <code className="bg-muted px-2 py-1 rounded">radix-ui</code> package as a dependency</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Example Usage</h2>
        <p className="text-muted-foreground mb-4">
          After adding a component, import and use it in your code:
        </p>
        <pre className="bg-muted p-4 rounded-lg my-4">
          <code className="text-foreground">import &#123; NFTCollectionGrid &#125; from &apos;@/components/ui/nft-collection-grid&apos;</code>
        </pre>
        <pre className="bg-muted p-4 rounded-lg my-4">
          <code className="text-foreground">export default function Home() &#123;
  return (
    &lt;div&gt;
      &lt;NFTCollectionGrid /&gt;
    &lt;/div&gt;
  )
&#125;</code>
        </pre>
      </section>
    </div>
  )
}
