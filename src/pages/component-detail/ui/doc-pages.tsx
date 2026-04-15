import type { ComponentType } from "react";

/* ── shared code-block helper ── */

function CodeBlock({ children, title }: { children: string; title?: string }) {
  return (
    <div className="flex flex-col gap-0">
      {title && (
        <div
          className="rounded-t-lg border border-b-0 px-4 py-2 text-xs font-medium"
          style={{
            background: "var(--w3-surface-elevated)",
            borderColor: "var(--w3-border-subtle)",
            color: "var(--w3-gray-600)",
            fontFamily: '"Geist Mono", ui-monospace, monospace',
          }}
        >
          {title}
        </div>
      )}
      <pre
        className={`overflow-x-auto p-4 text-sm leading-relaxed ${title ? "rounded-b-lg" : "rounded-lg"}`}
        style={{
          background: "var(--w3-surface-elevated)",
          border: "1px solid var(--w3-border-subtle)",
          color: "var(--w3-gray-900)",
          fontFamily: '"Geist Mono", ui-monospace, monospace',
        }}
      >
        <code>{children.trim()}</code>
      </pre>
    </div>
  );
}

function InlineCode({ children }: { children: string }) {
  return (
    <code
      className="rounded px-1.5 py-0.5 text-sm"
      style={{
        background: "var(--w3-surface-elevated)",
        border: "1px solid var(--w3-border-subtle)",
        color: "var(--w3-gray-900)",
        fontFamily: '"Geist Mono", ui-monospace, monospace',
      }}
    >
      {children}
    </code>
  );
}

/* ── doc pages ── */

function IntroductionPage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h1
          className="mb-3 text-3xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Introduction
        </h1>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          w3-kit is an open-source Web3 developer toolkit that gives you{" "}
          <strong style={{ color: "var(--w3-gray-900)" }}>27 production-ready React components</strong>{" "}
          for wallets, DeFi, NFTs, and more. Build polished dApps without reinventing common UI patterns.
        </p>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          Built on Radix UI primitives and styled with Tailwind CSS, every component
          is accessible, composable, and fully typed with TypeScript. Dark mode support
          comes out of the box.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          shadcn/ui Registry
        </h2>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          w3-kit is part of the shadcn/ui registry, so you can install only
          the components you need. No bloated bundles — just pull in what your
          project requires.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Component Categories
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { name: "Wallet", count: 5, desc: "Connect, balance, network, address book, multisig" },
            { name: "DeFi", count: 7, desc: "Swap, staking, bridge, positions, flash loans, limits, liquidity" },
            { name: "NFT", count: 3, desc: "Card, collection grid, marketplace aggregator" },
            { name: "Data", count: 6, desc: "Portfolio, price ticker, token card, token list, transactions" },
            { name: "Utility", count: 6, desc: "Scanner, contract interaction, ENS, gas, subscriptions, airdrop, vesting" },
          ].map((cat) => (
            <div
              key={cat.name}
              className="rounded-lg p-4"
              style={{
                background: "var(--w3-surface-elevated)",
                border: "1px solid var(--w3-border-subtle)",
              }}
            >
              <div className="mb-1 flex items-center gap-2">
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--w3-gray-900)" }}
                >
                  {cat.name}
                </span>
                <span
                  className="rounded-full px-2 py-0.5 text-xs font-medium"
                  style={{
                    background: "var(--w3-accent)",
                    color: "#fff",
                  }}
                >
                  {cat.count}
                </span>
              </div>
              <p className="text-xs" style={{ color: "var(--w3-gray-600)" }}>
                {cat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Key Features
        </h2>
        <ul className="flex flex-col gap-2">
          {[
            "TypeScript — full type definitions for every component and prop",
            "Dark Mode — class-based dark mode with system preference detection",
            "Accessible — built on Radix UI primitives with proper ARIA attributes",
            "Composable — mix and match components, override styles, extend behavior",
            "Tree-shakeable — install only the components you use",
          ].map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-base"
              style={{ color: "var(--w3-gray-600)" }}
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: "var(--w3-accent)" }}
              />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function InstallationPage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h1
          className="mb-3 text-3xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Installation
        </h1>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          Get up and running with w3-kit in minutes. Choose the approach that
          best fits your project.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Using the CLI (recommended)
        </h2>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          The fastest way to start a new project. The CLI scaffolds a complete
          dApp with your choice of chain and framework.
        </p>
        <CodeBlock>{`npx w3-kit init my-dapp`}</CodeBlock>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Add Individual Components
        </h2>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          Already have a project? Add only the components you need.
        </p>
        <CodeBlock>{`npx w3-kit add connect-wallet`}</CodeBlock>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Install the Full Package
        </h2>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          If you want all 27 components available immediately.
        </p>
        <CodeBlock>{`npm install w3-kit`}</CodeBlock>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Dependencies
        </h2>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          w3-kit requires the following core dependencies:
        </p>
        <ul className="flex flex-col gap-2">
          {[
            "React 18+",
            "Tailwind CSS 3.4+",
            "lucide-react",
            "class-variance-authority",
            "tailwind-merge",
          ].map((dep) => (
            <li
              key={dep}
              className="flex items-start gap-2 text-base"
              style={{ color: "var(--w3-gray-600)" }}
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: "var(--w3-accent)" }}
              />
              <InlineCode>{dep}</InlineCode>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Peer Dependencies
        </h2>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          Some components require specific Radix UI packages. These are installed
          automatically when you add a component via the CLI.
        </p>
        <CodeBlock>{`@radix-ui/react-dialog
@radix-ui/react-tabs
@radix-ui/react-select
@radix-ui/react-progress
@radix-ui/react-slot`}</CodeBlock>
      </div>
    </div>
  );
}

function UsagePage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h1
          className="mb-3 text-3xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Usage
        </h1>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          Each w3-kit component has its own import path, keeping your bundle
          size small and your imports explicit.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Basic Example
        </h2>
        <CodeBlock title="App.tsx">{`import { ConnectWalletButton } from "w3-kit/connect-wallet"
import { TokenSwapWidget } from "w3-kit/token-swap"

function App() {
  return (
    <ConnectWalletButton
      onConnect={(address) => console.log(address)}
      variant="light"
    />
  )
}`}</CodeBlock>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Import Paths
        </h2>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          Every component is available from its own subpath. This lets your
          bundler tree-shake unused components automatically.
        </p>
        <CodeBlock>{`// Individual imports
import { ConnectWalletButton } from "w3-kit/connect-wallet"
import { NetworkSwitcher } from "w3-kit/network-switcher"
import { WalletBalance } from "w3-kit/wallet-balance"
import { TokenSwapWidget } from "w3-kit/token-swap"
import { NFTCard } from "w3-kit/nft-card"
import { SmartContractScanner } from "w3-kit/smart-contract-scanner"`}</CodeBlock>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          TypeScript
        </h2>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          All components are fully typed. Props interfaces are exported alongside
          each component so you can use them in your own types.
        </p>
        <CodeBlock title="types.ts">{`import type { ConnectWalletButtonProps } from "w3-kit/connect-wallet"
import type { NFTCardProps } from "w3-kit/nft-card"

// Extend component props in your own app
interface MyWalletButton extends ConnectWalletButtonProps {
  showBalance?: boolean
}`}</CodeBlock>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Composing Components
        </h2>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          Components are designed to work together. Here is a common pattern that
          combines wallet connection, balance display, and a swap widget.
        </p>
        <CodeBlock title="Dashboard.tsx">{`import { ConnectWalletButton } from "w3-kit/connect-wallet"
import { WalletBalance } from "w3-kit/wallet-balance"
import { TokenSwapWidget } from "w3-kit/token-swap"

function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <WalletBalance variant="compact" />
        <ConnectWalletButton variant="light" />
      </div>
      <TokenSwapWidget onSwap={async (tx) => console.log(tx)} />
    </div>
  )
}`}</CodeBlock>
      </div>
    </div>
  );
}

function ThemingPage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h1
          className="mb-3 text-3xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Theming
        </h1>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          w3-kit uses CSS custom properties in HSL format for full compatibility
          with shadcn/ui theming. Component variants are powered by
          class-variance-authority (CVA).
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Color Tokens
        </h2>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          The theming system defines these CSS custom properties. Override them
          in your global CSS to customize every component at once.
        </p>
        <CodeBlock title="globals.css">{`:root {
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
}`}</CodeBlock>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          w3-kit Specific Tokens
        </h2>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          In addition to the standard shadcn tokens, w3-kit defines its own design
          tokens for grayscale and accent colors.
        </p>
        <ul className="flex flex-col gap-2">
          {[
            "--w3-gray-100 through --w3-gray-900 — grayscale ramp",
            "--w3-accent (#5554d9) — primary brand color",
            "--w3-surface-elevated — card / elevated surface backgrounds",
            "--w3-border-subtle — light borders and dividers",
          ].map((token) => (
            <li
              key={token}
              className="flex items-start gap-2 text-base"
              style={{ color: "var(--w3-gray-600)" }}
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: "var(--w3-accent)" }}
              />
              {token}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Tailwind Configuration
        </h2>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          Extend your Tailwind config to use the custom properties. This pattern
          is the same one used by shadcn/ui.
        </p>
        <CodeBlock title="tailwind.config.js">{`module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
}`}</CodeBlock>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Component Variants (CVA)
        </h2>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          Components use class-variance-authority to define variants. You can
          pass variant props to change a component's appearance without
          writing custom CSS.
        </p>
        <CodeBlock>{`<ConnectWalletButton variant="light" />
<ConnectWalletButton variant="dark" />
<ConnectWalletButton variant="outline" />
<ConnectWalletButton variant="ghost" />`}</CodeBlock>
      </div>
    </div>
  );
}

function DarkModePage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h1
          className="mb-3 text-3xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Dark Mode
        </h1>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          w3-kit supports class-based dark mode with three modes: system, light,
          and dark. The user's preference is stored in localStorage and applied
          automatically on page load.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          How It Works
        </h2>
        <ul className="flex flex-col gap-2">
          {[
            'Tailwind is configured with darkMode: "class"',
            "The theme is stored in the localStorage key \"w3-theme\"",
            "Applied via a data-theme attribute and the .dark class on <html>",
            "Components use the Tailwind dark: prefix for dark mode styles",
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-base"
              style={{ color: "var(--w3-gray-600)" }}
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: "var(--w3-accent)" }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Dark Mode Classes
        </h2>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          Components use standard Tailwind dark mode utilities. Here are common
          patterns you will see in the component source.
        </p>
        <CodeBlock>{`// Common dark mode patterns in components
className="bg-white dark:bg-gray-950"
className="text-gray-900 dark:text-white"
className="border-gray-200 dark:border-gray-800"
className="bg-gray-50 dark:bg-gray-900"`}</CodeBlock>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Theme Toggle
        </h2>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          Use the built-in theme utilities to toggle between modes
          programmatically.
        </p>
        <CodeBlock title="theme-toggle.tsx">{`import { setTheme, getStoredTheme } from "w3-kit/theme"

// Set a specific theme
setTheme("dark")
setTheme("light")
setTheme("system")

// Read the current stored preference
const current = getStoredTheme() // "system" | "light" | "dark"`}</CodeBlock>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Custom Theme Toggle Component
        </h2>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          Here is a pattern for building your own theme toggle button.
        </p>
        <CodeBlock title="ThemeToggle.tsx">{`import { useState, useEffect } from "react"
import { setTheme, getStoredTheme } from "w3-kit/theme"

type Theme = "system" | "light" | "dark"

export function ThemeToggle() {
  const [theme, setCurrentTheme] = useState<Theme>("system")

  useEffect(() => {
    setCurrentTheme(getStoredTheme())
  }, [])

  const toggle = () => {
    const next: Theme =
      theme === "system" ? "light" : theme === "light" ? "dark" : "system"
    setTheme(next)
    setCurrentTheme(next)
  }

  return (
    <button onClick={toggle} className="rounded-md px-3 py-1.5 text-sm">
      {theme === "system" ? "System" : theme === "light" ? "Light" : "Dark"}
    </button>
  )
}`}</CodeBlock>
      </div>
    </div>
  );
}

function CliInitPage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h1
          className="mb-3 text-3xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          w3-kit init
        </h1>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          Scaffold a new Web3 project with a single command. The CLI sets up
          your framework, chain tooling, and package manager automatically.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Command
        </h2>
        <CodeBlock>{`npx w3-kit init [project-name] [options]

Options:
  --template <name>   Pre-select template (nextjs-evm, script-evm, nextjs-solana, script-solana)
  --chain <chain>     Target chain: evm, solana, or both
  --pm <pm>           Package manager: npm, pnpm, yarn, or bun`}</CodeBlock>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Templates
        </h2>
        <div className="flex flex-col gap-3">
          {[
            {
              name: "nextjs-evm",
              desc: "Next.js dApp with wagmi + viem + RainbowKit. Full-stack EVM development with wallet connection, contract interaction, and pre-built UI components.",
            },
            {
              name: "script-evm",
              desc: "TypeScript script with viem. Lightweight setup for backend scripts, bots, and CLI tools that interact with EVM chains.",
            },
            {
              name: "nextjs-solana",
              desc: "Next.js dApp with wallet-adapter. Complete Solana frontend with wallet connection and program interaction.",
            },
            {
              name: "script-solana",
              desc: "TypeScript script with @solana/web3.js. For Solana scripts, automation, and backend services.",
            },
          ].map((template) => (
            <div
              key={template.name}
              className="rounded-lg p-4"
              style={{
                background: "var(--w3-surface-elevated)",
                border: "1px solid var(--w3-border-subtle)",
              }}
            >
              <span
                className="text-sm font-semibold"
                style={{
                  color: "var(--w3-gray-900)",
                  fontFamily: '"Geist Mono", ui-monospace, monospace',
                }}
              >
                {template.name}
              </span>
              <p
                className="mt-1 text-sm"
                style={{ color: "var(--w3-gray-600)" }}
              >
                {template.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Examples
        </h2>
        <CodeBlock>{`# Interactive mode — prompts for template, chain, and package manager
npx w3-kit init my-dapp

# Skip prompts with flags
npx w3-kit init my-dapp --template nextjs-evm --pm pnpm

# Solana script project with yarn
npx w3-kit init sol-bot --template script-solana --pm yarn`}</CodeBlock>
      </div>
    </div>
  );
}

function CliAddPage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h1
          className="mb-3 text-3xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          w3-kit add
        </h1>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          Add recipes, components, or contract templates to an existing project.
          Each recipe includes working code and optional educational output
          explaining what it does.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Command
        </h2>
        <CodeBlock>{`npx w3-kit add <recipe> [options]

Options:
  --contract          Add contract template instead of recipe
  --chain <chain>     Target: evm, solana, or both
  --no-learn          Skip educational output`}</CodeBlock>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Available Recipes
        </h2>
        <div className="flex flex-col gap-6">
          {[
            {
              category: "Wallet",
              recipes: ["connect-wallet", "disconnect-wallet", "sign-message", "switch-network"],
            },
            {
              category: "Tokens",
              recipes: [
                "create-token",
                "transfer-tokens",
                "approve-spending",
                "get-balance",
                "fetch-metadata",
                "watch-transfers",
              ],
            },
            {
              category: "NFTs",
              recipes: ["mint-nft", "fetch-nft-collection", "buy-nft", "display-nft-metadata"],
            },
            {
              category: "DeFi",
              recipes: ["swap-tokens", "provide-liquidity", "stake-tokens", "claim-rewards"],
            },
            {
              category: "Utils",
              recipes: ["resolve-address", "estimate-fees"],
            },
          ].map((group) => (
            <div key={group.category}>
              <span
                className="mb-2 block text-sm font-semibold"
                style={{ color: "var(--w3-gray-900)" }}
              >
                {group.category}
              </span>
              <div className="flex flex-wrap gap-2">
                {group.recipes.map((recipe) => (
                  <span
                    key={recipe}
                    className="rounded-md px-2.5 py-1 text-xs font-medium"
                    style={{
                      background: "var(--w3-surface-elevated)",
                      border: "1px solid var(--w3-border-subtle)",
                      color: "var(--w3-gray-900)",
                      fontFamily: '"Geist Mono", ui-monospace, monospace',
                    }}
                  >
                    {recipe}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Examples
        </h2>
        <CodeBlock>{`# Add a recipe with educational output
npx w3-kit add connect-wallet

# Add a contract template for EVM
npx w3-kit add create-token --contract --chain evm

# Skip the learning output
npx w3-kit add swap-tokens --no-learn

# Solana-specific recipe
npx w3-kit add transfer-tokens --chain solana`}</CodeBlock>
      </div>
    </div>
  );
}

function McpPage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h1
          className="mb-3 text-3xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          MCP Server
        </h1>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          The w3-kit MCP server lets AI assistants browse components, read source
          code, extract design tokens, and generate compositions — all through
          the Model Context Protocol.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Installation
        </h2>
        <CodeBlock>{`npx @w3-kit/mcp`}</CodeBlock>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Configuration
        </h2>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          Add the server to your MCP client configuration file.
        </p>
        <CodeBlock title=".mcp.json">{`{
  "mcpServers": {
    "w3-kit": {
      "command": "npx",
      "args": ["@w3-kit/mcp"]
    }
  }
}`}</CodeBlock>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Available Tools
        </h2>
        <div className="flex flex-col gap-3">
          {[
            {
              name: "list_components",
              desc: "Browse all 27 components by category. Returns name, ID, description, and category for each component.",
            },
            {
              name: "get_component",
              desc: "Get the full source code, props interface, types, and usage examples for a specific component.",
            },
            {
              name: "get_design_tokens",
              desc: "Extract all design tokens — colors, spacing, typography, border radii, shadows — as CSS custom properties.",
            },
            {
              name: "get_design_guidelines",
              desc: "Get design system rules including spacing scale, type hierarchy, dark-mode patterns, and motion guidelines.",
            },
            {
              name: "generate_composition",
              desc: "AI generates a complete page that composes multiple w3-kit components together based on a description.",
            },
            {
              name: "get_example",
              desc: "Get a ready-to-use code example for a component. Supports basic and full variants.",
            },
          ].map((tool) => (
            <div
              key={tool.name}
              className="rounded-lg p-4"
              style={{
                background: "var(--w3-surface-elevated)",
                border: "1px solid var(--w3-border-subtle)",
              }}
            >
              <span
                className="text-sm font-semibold"
                style={{
                  color: "var(--w3-gray-900)",
                  fontFamily: '"Geist Mono", ui-monospace, monospace',
                }}
              >
                {tool.name}
              </span>
              <p
                className="mt-1 text-sm"
                style={{ color: "var(--w3-gray-600)" }}
              >
                {tool.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Compatible Clients
        </h2>
        <ul className="flex flex-col gap-2">
          {[
            "Claude Desktop",
            "Cursor",
            "VS Code with Claude extension",
            "Any MCP-compatible client",
          ].map((client) => (
            <li
              key={client}
              className="flex items-start gap-2 text-base"
              style={{ color: "var(--w3-gray-600)" }}
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: "var(--w3-accent)" }}
              />
              {client}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ShadcnPage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h1
          className="mb-3 text-3xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          shadcn Registry
        </h1>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          w3-kit is published as a shadcn/ui compatible registry. Install
          components directly into your project using the shadcn CLI — they
          land in your codebase as local files you fully own.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Registry URL
        </h2>
        <CodeBlock>{`https://w3-kit.com/registry`}</CodeBlock>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Installing Components
        </h2>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          Use the shadcn CLI to add any of the 27 components directly from the
          w3-kit registry.
        </p>
        <CodeBlock>{`npx shadcn@latest add https://w3-kit.com/registry/connect-wallet`}</CodeBlock>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          What Gets Installed
        </h2>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          Each registry entry includes everything the component needs:
        </p>
        <ul className="flex flex-col gap-2">
          {[
            "Component source files (.tsx)",
            "TypeScript type definitions",
            "Utility functions the component depends on",
            "Automatic dependency installation (Radix UI, lucide-react, etc.)",
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-base"
              style={{ color: "var(--w3-gray-600)" }}
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: "var(--w3-accent)" }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Registry Format
        </h2>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          The registry serves each component as a JSON entry following the
          shadcn/ui registry schema.
        </p>
        <CodeBlock title="registry/connect-wallet.json">{`{
  "name": "connect-wallet",
  "type": "registry:ui",
  "dependencies": [
    "@radix-ui/react-dialog",
    "lucide-react"
  ],
  "files": [
    {
      "path": "ui/connect-wallet.tsx",
      "type": "registry:ui"
    }
  ]
}`}</CodeBlock>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Compatibility
        </h2>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          w3-kit components are fully compatible with the shadcn/ui theming
          system and project structure. They use the same CSS custom properties,
          the same Tailwind config patterns, and the same file organization
          conventions.
        </p>
      </div>
    </div>
  );
}

function FigmaPage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h1
          className="mb-3 text-3xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Figma
        </h1>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          The w3-kit Figma integration bridges design and code. Use Code Connect
          mappings to link Figma components to their codebase counterparts, and
          keep design tokens in sync between both environments.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Code Connect
        </h2>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          Code Connect creates mappings between Figma components and their code
          implementations. When a developer inspects a component in Figma, they
          see the exact import path and usage code.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Design Tokens
        </h2>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          Design tokens (colors, spacing, typography, border radii) are synced
          between Figma variables and the CSS custom properties used in code.
          When a designer updates a token in Figma, the corresponding CSS
          variable can be updated to match.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Figma MCP Integration
        </h2>
        <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
          Use the Figma MCP server alongside the w3-kit MCP server to create
          a design-to-code workflow. The Figma server reads designs and the
          w3-kit server provides the component library.
        </p>
        <CodeBlock title=".mcp.json">{`{
  "mcpServers": {
    "w3-kit": {
      "command": "npx",
      "args": ["@w3-kit/mcp"]
    },
    "figma": {
      "command": "npx",
      "args": ["@anthropic/figma-mcp"]
    }
  }
}`}</CodeBlock>
      </div>

      <div className="flex flex-col gap-4">
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--w3-gray-900)" }}
        >
          Workflow
        </h2>
        <ul className="flex flex-col gap-2">
          {[
            "Designer creates or updates components in Figma using the w3-kit design kit",
            "Code Connect mappings link each Figma component to its code implementation",
            "Developer inspects the component in Figma and sees the exact import and props",
            "AI tools (via MCP) can read the Figma design and generate matching w3-kit code",
            "Design tokens stay in sync between Figma variables and CSS custom properties",
          ].map((step, i) => (
            <li
              key={step}
              className="flex items-start gap-3 text-base"
              style={{ color: "var(--w3-gray-600)" }}
            >
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                style={{
                  background: "var(--w3-accent)",
                  color: "#fff",
                }}
              >
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── registry ── */

export const DOC_PAGE_IDS = [
  "introduction",
  "installation",
  "usage",
  "theming",
  "dark-mode",
  "cli-init",
  "cli-add",
  "mcp",
  "shadcn",
  "figma",
] as const;

export type DocPageId = (typeof DOC_PAGE_IDS)[number];

export const DOC_PAGES: Record<DocPageId, ComponentType> = {
  introduction: IntroductionPage,
  installation: InstallationPage,
  usage: UsagePage,
  theming: ThemingPage,
  "dark-mode": DarkModePage,
  "cli-init": CliInitPage,
  "cli-add": CliAddPage,
  mcp: McpPage,
  shadcn: ShadcnPage,
  figma: FigmaPage,
};
