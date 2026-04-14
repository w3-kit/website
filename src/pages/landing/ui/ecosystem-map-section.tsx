import { useState } from "react";
import { ArrowRight, Blocks, BookOpen, Database, GraduationCap } from "lucide-react";
import { SectionContainer } from "../../../shared/ui/section-container";
import { useScrollReveal } from "../../../shared/lib/use-scroll-animation";
import { getSectionUrl } from "../../../shared/lib/urls";
import { ConnectWalletButton } from "./connect-wallet/connect-wallet";
import { NetworkSwitcher } from "./network-switcher/network-switcher";
import { WalletBalance } from "./wallet-balance/wallet-balance";
import { TokenSwapWidget } from "./token-swap/token-swap";
import { NFTCard } from "./nft-card/nft-card";
import type { Token as WBToken } from "./wallet-balance/types";
import type { Network } from "./network-switcher/types";
import type { NFT } from "./nft-card/types";

const subdomains = [
  {
    label: "UI",
    section: "ui",
    icon: <Blocks size={20} />,
    tagline: "Production-ready components",
    features: ["50+ React components", "Wallet, chain, token UIs", "Fully typed & themed"],
    cta: "Explore components",
  },
  {
    label: "Docs",
    section: "docs",
    icon: <BookOpen size={20} />,
    tagline: "Guides & API reference",
    features: ["Step-by-step tutorials", "Full API documentation", "Code examples"],
    cta: "Read the docs",
  },
  {
    label: "Registry",
    section: "registry",
    icon: <Database size={20} />,
    tagline: "Chain & token data",
    features: ["14 chains, 18 tokens", "RPC URLs & explorers", "Typed & queryable"],
    cta: "Browse registry",
  },
  {
    label: "Learn",
    section: "learn",
    icon: <GraduationCap size={20} />,
    tagline: "Interactive courses",
    features: ["Hands-on recipes", "Build real dApps", "Beginner to advanced"],
    cta: "Start learning",
  },
];

export function EcosystemMapSection() {
  const containerRef = useScrollReveal({ stagger: 0.1, y: 30 });
  const [active, setActive] = useState<number | null>(null);

  return (
    <SectionContainer className="py-20 md:py-32 lg:py-40" id="ecosystem">
      <div ref={containerRef} className="flex flex-col items-center gap-12 text-center">
        <div data-reveal className="flex max-w-md flex-col gap-4">
          <p
            className="text-sm font-medium uppercase tracking-wider"
            style={{ color: "var(--w3-accent)" }}
          >
            Ecosystem
          </p>
          <h2
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
            style={{ color: "var(--w3-gray-900)", letterSpacing: "-0.02em" }}
          >
            One toolkit. Five tools.
          </h2>
          <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
            Everything connects. Click to explore.
          </p>
        </div>

        {/* Hub & spoke layout */}
        <div data-reveal className="relative w-full max-w-2xl">
          {/* Grid of 4 cards with center hub */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {subdomains.map((sub, i) => {
              const isActive = active === i;
              const dimmed = active !== null && !isActive;

              return (
                <button
                  key={sub.section}
                  onClick={() => setActive(isActive ? null : i)}
                  className="relative flex flex-col items-center gap-3 rounded-xl p-6 text-center backdrop-blur-xl transition-all duration-300 md:p-8"
                  style={{
                    background: isActive ? "var(--w3-accent-subtle)" : "var(--w3-glass-bg)",
                    border: isActive
                      ? "1px solid var(--w3-accent)"
                      : "1px solid var(--w3-glass-border)",
                    boxShadow: "var(--w3-glass-shadow)",
                    opacity: dimmed ? 0.5 : 1,
                    transform: isActive ? "scale(1.03)" : "scale(1)",
                  }}
                >
                  {/* Connecting line to center — top-right corner for [0,1], bottom-right for [2,3] etc */}
                  <div
                    className="absolute h-px transition-all duration-300"
                    style={{
                      background: isActive ? "var(--w3-accent)" : "var(--w3-gray-300)",
                      opacity: dimmed ? 0.15 : 0.4,
                      // Horizontal line pointing toward center
                      ...(i === 0
                        ? { bottom: -2, right: -2, width: "calc(50% - 12px)" }
                        : i === 1
                          ? { bottom: -2, left: -2, width: "calc(50% - 12px)" }
                          : i === 2
                            ? { top: -2, left: -2, width: "calc(50% - 12px)" }
                            : { top: -2, right: -2, width: "calc(50% - 12px)" }),
                    }}
                  />
                  <div
                    className="absolute w-px transition-all duration-300"
                    style={{
                      background: isActive ? "var(--w3-accent)" : "var(--w3-gray-300)",
                      opacity: dimmed ? 0.15 : 0.4,
                      ...(i === 0
                        ? { bottom: -2, right: -2, height: "calc(50% - 12px)" }
                        : i === 1
                          ? { bottom: -2, left: -2, height: "calc(50% - 12px)" }
                          : i === 2
                            ? { top: -2, left: -2, height: "calc(50% - 12px)" }
                            : { top: -2, right: -2, height: "calc(50% - 12px)" }),
                    }}
                  />

                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300"
                    style={{
                      background: isActive ? "var(--w3-accent)" : "var(--w3-accent-subtle)",
                      color: isActive ? "#fff" : "var(--w3-accent)",
                    }}
                  >
                    {sub.icon}
                  </div>
                  <div>
                    <span className="text-lg font-semibold" style={{ color: "var(--w3-gray-900)" }}>
                      {sub.label}
                    </span>
                    <p className="mt-1 text-xs" style={{ color: "var(--w3-gray-500)" }}>
                      {sub.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Center hub — floating on top of the grid gap */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div
              className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-2xl text-xs font-bold text-white shadow-lg md:h-16 md:w-16 md:text-sm"
              style={{ background: "var(--w3-accent)" }}
            >
              w3-kit
            </div>
          </div>
        </div>

        {/* Expanded detail panel — unique per tool */}
        {active !== null && <EcosystemDetail sub={subdomains[active]} />}
      </div>
    </SectionContainer>
  );
}

/* ------------------------------------------------------------------ */
/*  Detail panel with unique preview per tool                          */
/* ------------------------------------------------------------------ */

function EcosystemDetail({ sub }: { sub: (typeof subdomains)[number] }) {
  return (
    <div
      className="w-full max-w-2xl overflow-hidden rounded-xl backdrop-blur-xl"
      style={{
        background: "var(--w3-glass-bg)",
        border: "1px solid var(--w3-glass-border)",
        boxShadow: "var(--w3-glass-shadow)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: "var(--w3-accent)", color: "#fff" }}
          >
            {sub.icon}
          </div>
          <div className="text-left">
            <h3 className="text-base font-semibold" style={{ color: "var(--w3-gray-900)" }}>
              {sub.label}
            </h3>
            <p className="text-xs" style={{ color: "var(--w3-gray-500)" }}>
              {sub.tagline}
            </p>
          </div>
        </div>
        <a
          href={getSectionUrl(sub.section)}
          className="group inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all hover:brightness-110"
          style={{ background: "var(--w3-accent)" }}
        >
          {sub.cta}
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>

      {/* Unique content per tool */}
      <div className="px-5 pb-5" style={{ borderTop: "1px solid var(--w3-border-subtle)" }}>
        <div className="pt-4">
          {sub.section === "ui" && <UiPreview />}
          {sub.section === "docs" && <DocsPreview />}
          {sub.section === "registry" && <RegistryPreview />}
          {sub.section === "learn" && <LearnPreview />}
        </div>
      </div>
    </div>
  );
}

const DEMO_NETWORKS: Network[] = [
  {
    chainId: 1,
    name: "Ethereum",
    symbol: "ETH",
    currency: "ETH",
    rpcUrl: "https://eth.llamarpc.com",
    blockExplorer: "https://etherscan.io",
    logoURI: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  },
  {
    chainId: 137,
    name: "Polygon",
    symbol: "MATIC",
    currency: "POL",
    rpcUrl: "https://polygon-rpc.com",
    blockExplorer: "https://polygonscan.com",
    logoURI: "https://assets.coingecko.com/coins/images/4713/small/polygon.png",
  },
  {
    chainId: 42161,
    name: "Arbitrum",
    symbol: "ETH",
    currency: "ETH",
    rpcUrl: "https://arb1.arbitrum.io/rpc",
    blockExplorer: "https://arbiscan.io",
    logoURI: "https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg",
  },
];

const DEMO_BALANCE_TOKENS: WBToken[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    balance: "1.4201",
    price: 2700,
    decimals: 18,
    logoURI: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    priceChange24h: 2.34,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    balance: "2500.00",
    price: 1,
    decimals: 6,
    logoURI: "https://assets.coingecko.com/coins/images/6319/small/usdc.png",
    priceChange24h: 0.01,
  },
];

const DEMO_NFT: NFT = {
  id: "1",
  tokenId: "3100",
  name: "CryptoPunk #3100",
  description: "One of the rarest CryptoPunks",
  image:
    "https://i.seadn.io/gae/aITlFbKioYKVfn0JC1bCp3dFpNx5ckDQSqsY_gQPJoY0TYHjr_aqOmVlVXEetaqS2LA0hFI48gn6kkHPznk3iDKWv6LpdHpQNWmS?auto=format&w=256",
  collection: "CryptoPunks",
  owner: "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB",
  contractAddress: "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB",
  chainId: 1,
  attributes: [{ trait_type: "Type", value: "Alien" }],
};

function UiPreview() {
  const [activeComp, setActiveComp] = useState(0);
  const comps = ["Wallet", "Network", "Balance", "Swap", "NFT"];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1">
        {comps.map((name, i) => (
          <button
            key={name}
            onClick={() => setActiveComp(i)}
            className="rounded-md px-2.5 py-1 text-xs font-medium transition-all"
            style={{
              background: activeComp === i ? "var(--w3-accent)" : "var(--w3-glass-inner-bg)",
              color: activeComp === i ? "#fff" : "var(--w3-gray-600)",
            }}
          >
            {name}
          </button>
        ))}
      </div>

      <div
        className="overflow-hidden rounded-lg"
        style={{ background: "var(--w3-glass-inner-bg)" }}
      >
        <div className="max-h-[300px] overflow-y-auto p-3">
          {activeComp === 0 && <ConnectWalletButton className="w-full" />}
          {activeComp === 1 && (
            <NetworkSwitcher networks={DEMO_NETWORKS} testNetworks={[]} onSwitch={() => {}} />
          )}
          {activeComp === 2 && <WalletBalance tokens={DEMO_BALANCE_TOKENS} variant="compact" />}
          {activeComp === 3 && <TokenSwapWidget onSwap={async () => {}} />}
          {activeComp === 4 && <NFTCard nft={DEMO_NFT} variant="default" />}
        </div>
      </div>
    </div>
  );
}

function DocsPreview() {
  const sections = [
    { label: "Getting Started", count: "4 guides" },
    { label: "Components", count: "50+ pages" },
    { label: "API Reference", count: "Full coverage" },
    { label: "Deployment", count: "3 guides" },
  ];

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs" style={{ color: "var(--w3-gray-500)" }}>
        Documentation sections
      </p>
      <div className="grid grid-cols-2 gap-2">
        {sections.map((s) => (
          <div
            key={s.label}
            className="flex items-center justify-between rounded-lg px-3 py-2"
            style={{ background: "var(--w3-glass-inner-bg)" }}
          >
            <span className="text-xs font-medium" style={{ color: "var(--w3-gray-900)" }}>
              {s.label}
            </span>
            <span className="text-[10px]" style={{ color: "var(--w3-gray-500)" }}>
              {s.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RegistryPreview() {
  const chains = [
    { name: "Ethereum", logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png" },
    { name: "Polygon", logo: "https://assets.coingecko.com/coins/images/4713/small/polygon.png" },
    { name: "Solana", logo: "https://assets.coingecko.com/coins/images/4128/small/solana.png" },
    { name: "Base", logo: "https://assets.coingecko.com/coins/images/25244/small/Optimism.png" },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-xs" style={{ color: "var(--w3-gray-500)" }}>
          Supported chains
        </p>
        <span className="text-xs font-medium" style={{ color: "var(--w3-accent)" }}>
          14 chains · 18 tokens
        </span>
      </div>
      <div className="flex gap-3">
        {chains.map((c) => (
          <div
            key={c.name}
            className="flex items-center gap-2 rounded-lg px-3 py-2"
            style={{ background: "var(--w3-glass-inner-bg)" }}
          >
            <img src={c.logo} alt={c.name} className="h-5 w-5 rounded-full" />
            <span className="text-xs font-medium" style={{ color: "var(--w3-gray-900)" }}>
              {c.name}
            </span>
          </div>
        ))}
        <div
          className="flex items-center rounded-lg px-3 py-2"
          style={{ background: "var(--w3-glass-inner-bg)" }}
        >
          <span className="text-xs" style={{ color: "var(--w3-gray-500)" }}>
            +10 more
          </span>
        </div>
      </div>
    </div>
  );
}

function LearnPreview() {
  const paths = [
    { label: "Web3 Fundamentals", level: "Beginner", lessons: "8 lessons" },
    { label: "Build a dApp", level: "Intermediate", lessons: "12 lessons" },
    { label: "DeFi Development", level: "Advanced", lessons: "10 lessons" },
  ];

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs" style={{ color: "var(--w3-gray-500)" }}>
        Learning paths
      </p>
      <div className="flex flex-col gap-2">
        {paths.map((p) => (
          <div
            key={p.label}
            className="flex items-center justify-between rounded-lg px-3 py-2.5"
            style={{ background: "var(--w3-glass-inner-bg)" }}
          >
            <span className="text-xs font-medium" style={{ color: "var(--w3-gray-900)" }}>
              {p.label}
            </span>
            <div className="flex items-center gap-2">
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                style={{ background: "var(--w3-accent-subtle)", color: "var(--w3-accent)" }}
              >
                {p.level}
              </span>
              <span className="text-[10px]" style={{ color: "var(--w3-gray-500)" }}>
                {p.lessons}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
