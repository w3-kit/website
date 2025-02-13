"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Code, Palette, Zap, Box, Layers, Shield, Download, Star, Users } from 'lucide-react'
import { SmartContractScanner } from '@/app/docs/components/smart-contract-scanner/component'
import { AssetPortfolio } from '@/app/docs/components/asset-portfolio/component'
import { TOKEN_CONFIGS } from '@/config/tokens'
import { ContractInteraction } from '@/app/docs/components/contract-interaction/component'
import { LiquidityPoolStats } from '@/app/docs/components/liquidity-pool-stats/component'
import { NetworkSwitcher } from '@/app/docs/components/network-switcher/component'
import { NFTCard } from '@/app/docs/components/nft-card/component'
import { NETWORKS } from './docs/components/network-switcher/networks'
import { TEST_NETWORKS } from './docs/components/network-switcher/networks'

const stats = [
  { number: '2.5M', label: 'downloads / month' },
  { number: '38.5K', label: 'github stars' },
  { number: '8.9K', label: 'discord members' }
]

const features = [
  {
    icon: <Code className="h-6 w-6" />,
    title: 'TypeScript First',
    description: 'Built with TypeScript for better developer experience and type safety'
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: 'Customizable',
    description: 'Fully customizable components with Tailwind CSS'
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'High Performance',
    description: 'Optimized for speed and efficiency with minimal bundle size'
  }
]

const previewComponents = [
  {
    name: 'NFT Card',
    description: 'Display NFTs with rich metadata and interactive features',
    path: '/docs/components/nft-card',
    preview: (
      <NFTCard
        nft={{
          id: "2",
          name: "Bored Ape #5678",
          description: "A unique Bored Ape NFT",
          image:
            "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
          owner: "0x9876543210fedcba9876543210fedcba98765432",
          collection: "Bored Ape Yacht Club",
          tokenId: "5678",
          contractAddress: "0x123456789abcdef123456789abcdef1234567890",
          chainId: 1,
          attributes: [
            { trait_type: "Background", value: "Yellow" },
            { trait_type: "Fur", value: "Brown" },
            { trait_type: "Eyes", value: "Bored" },
            { trait_type: "Clothes", value: "Suit" },
          ]
        }}
        variant="default"
      />
    )
  },
  {
    name: 'Smart Contract Scanner',
    description: 'Analyze and verify smart contracts with comprehensive security checks',
    path: '/docs/components/smart-contract-scanner',
    preview: <SmartContractScanner variant="compact" />
  },
  {
    name: 'Asset Portfolio',
    description: 'Track and manage crypto assets with detailed portfolio analytics',
    path: '/docs/components/asset-portfolio',
    preview: (
      <AssetPortfolio 
        variant="compact"
        assets={[
          {
            ...TOKEN_CONFIGS.ETH,
            balance: '2.5',
            price: 3500,
            value: 8750,
            change24h: 4.2,
            color: '#627EEA'
          },
          {
            ...TOKEN_CONFIGS.BTC,
            balance: '0.15',
            price: 45000,
            value: 6750,
            change24h: -2.1,
            color: '#F7931A'
          },
          {
            ...TOKEN_CONFIGS.USDC,
            balance: '5000',
            price: 1,
            value: 5000,
            change24h: 0.01,
            color: '#2775CA'
          },
          {
            ...TOKEN_CONFIGS.SOL,
            balance: '45',
            price: 110,
            value: 4950,
            change24h: 8.5,
            color: '#00FFA3'
          }
        ]}
        totalValue={15500}
        totalChange24h={2.8}
      />
    )
  },
  {
    name: 'Contract Interaction',
    description: 'Interact with smart contracts through an intuitive interface',
    path: '/docs/components/contract-interaction',
    preview: <ContractInteraction />
  },
  {
    name: 'Liquidity Pool Stats',
    description: 'View detailed statistics and analytics for liquidity pools',
    path: '/docs/components/liquidity-pool-stats',
    preview: (
      <LiquidityPoolStats
        poolData={{
          token0: {
            symbol: 'ETH',
            logoURI: '/tokens/eth.svg',
            liquidity: 125.5
          },
          token1: {
            symbol: 'USDC',
            logoURI: '/tokens/usdc.svg',
            liquidity: 250000
          },
          fee: 3000,
          tvl: 500000,
          tvlChange24h: 5.2,
          volume24h: 1200000,
          volumeChange24h: 12.5,
          apr: 25.5,
          feesEarned24h: 1200
        }}
      />
    )
  },
  {
    name: 'Network Switcher',
    description: 'Switch between different blockchain networks seamlessly',
    path: '/docs/components/network-switcher',
    preview: <NetworkSwitcher 
      networks={NETWORKS}
      testNetworks={TEST_NETWORKS}
      onSwitch={() => {}}
        />
  }
]

function PreviewCard({ component }: { component: typeof previewComponents[0] }) {
  const [showPreview, setShowPreview] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Smooth mouse following with requestAnimationFrame
    requestAnimationFrame(() => {
      setMousePosition({
        x: e.clientX + 20,
        y: e.clientY - 20  // Increased offset from cursor
      });
    });
  };

  const handleMouseEnter = () => {
    const timeout = setTimeout(() => {
      setShowPreview(true);
    }, 150); // Slightly faster appearance
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setShowPreview(false);
  };

  return (
    <div 
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <Link
        href={component.path}
        className="block"
      >
        <div className="flex items-center justify-center h-32 w-48 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 transition-all duration-300 group-hover:border-gray-300 dark:group-hover:border-gray-700">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {component.name}
          </span>
        </div>
      </Link>
      
      {/* Preview Popup */}
      <div 
        className={`fixed z-40 w-[90vw] sm:w-[400px] md:w-[480px] lg:w-[520px] bg-white dark:bg-gray-900 
          rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden 
          transition-all duration-200
          ${showPreview 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -100%)',
          pointerEvents: showPreview ? 'auto' : 'none',
          transitionProperty: 'opacity, transform',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          maxWidth: 'calc(100vw - 40px)',
        }}
      >
        <div className="p-3 sm:p-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
            {component.name}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
            {component.description}
          </p>
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-3 sm:p-4 bg-gray-50 dark:bg-gray-950">
            {component.preview}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen mx-auto bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-28 sm:py-32">
          <div className="text-center">
            <div className="relative z-10">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                Build faster with Web3 Components
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                A comprehensive library of accessible React components for building high-quality Web3 applications and dApps
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/docs/components"
                  className="rounded-full bg-gray-900 dark:bg-white px-6 py-3 text-sm font-semibold text-white dark:text-gray-900 shadow-sm hover:bg-gray-800 dark:hover:bg-gray-100"
                >
                  Get Started
                </Link>
                <pre className="hidden md:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 px-4 py-2 rounded-full">
                  <code>npm i @w3-kit/react</code>
                  <button className="hover:text-gray-900 dark:hover:text-white transition-colors" onClick={() => navigator.clipboard.writeText('npm i @w3-kit/react')}>
                    <span className="sr-only">Copy to clipboard</span>
                    <Code className="h-4 w-4" />
                  </button>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Component Preview Grid */}
        <div className="relative z-10">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200 dark:border-gray-800" />
          </div>
          <div className="relative flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-white dark:bg-gray-950 px-4 py-8">
              {previewComponents.map((component) => (
                <div key={component.name} className="flex justify-center">
                  <PreviewCard component={component} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-gray-600 dark:text-gray-400">{stat.label}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                  {stat.number}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section> */}

      {/* Features Section */}
      <section className="py-24 px-6 sm:py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Built for modern dApps
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              From next-gen startups to established enterprises, W3-Kit provides the building blocks for your Web3 applications
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                      {feature.icon}
                    </div>
                    {feature.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative isolate overflow-hidden">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Start building today
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-400">
              Join thousands of developers building amazing Web3 experiences with W3-Kit
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/docs"
                className="rounded-full bg-gray-900 dark:bg-white px-6 py-3 text-sm font-semibold text-white dark:text-gray-900 shadow-sm hover:bg-gray-800 dark:hover:bg-gray-100"
              >
                Get Started
              </Link>
              <Link
                href="https://github.com/w3-kit"
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
              >
                View on GitHub <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 