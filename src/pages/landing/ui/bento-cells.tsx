import { useState } from "react";
import { ArrowRight, Check, Star } from "lucide-react";
import { Button } from "../../../shared/ui/button";
import { getSectionUrl } from "../../../shared/lib/urls";
import { cn } from "../../../shared/lib/utils";
import { GitHubIcon } from "../../../shared/ui/github-icon";
import { SmartContractScanner } from "./smart-contract-scanner/smart-contract-scanner";

/* ------------------------------------------------------------------ */
/*  Shared glass card wrapper                                          */
/* ------------------------------------------------------------------ */

export function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl p-6 backdrop-blur-xl",
        className,
      )}
      style={{
        background: "var(--w3-glass-bg)",
        border: "1px solid var(--w3-glass-border)",
        boxShadow: "var(--w3-glass-shadow)",
      }}
    >
      {children}
    </div>
  );
}

function CellLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-xs font-medium uppercase tracking-wider"
      style={{ color: "var(--w3-accent)" }}
    >
      {children}
    </span>
  );
}

function CellTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg font-semibold tracking-tight" style={{ color: "var(--w3-gray-900)" }}>
      {children}
    </h3>
  );
}

function CellLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-1 text-sm font-medium"
      style={{ color: "var(--w3-accent)" }}
    >
      {children}
      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function ProgressBar({ value, max }: { value: number; max: number }) {
  return (
    <div
      className="mb-3 h-1 overflow-hidden rounded-full"
      style={{ background: "var(--w3-glass-inner-bg)" }}
    >
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ background: "var(--w3-accent)", width: `${(value / max) * 100}%` }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  1. Smart Contract Scanner — real component (large cell, 2-col)     */
/* ------------------------------------------------------------------ */

export function ComponentsCell() {
  return (
    <GlassCard>
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <CellLabel>UI Components</CellLabel>
          <CellTitle>Smart Contract Scanner</CellTitle>
        </div>
        <a
          href={getSectionUrl("ui") + "/smart-contract-scanner"}
          className="shrink-0 rounded-md px-2.5 py-1 text-xs font-medium transition-colors"
          style={{ background: "var(--w3-accent-subtle)", color: "var(--w3-accent)" }}
        >
          View component →
        </a>
      </div>

      <div
        className="mt-3 flex flex-1 items-center justify-center overflow-hidden rounded-xl p-4 [&_[data-slot=card]]:border-none [&_[data-slot=card]]:bg-transparent [&_[data-slot=card]]:shadow-none [&_[data-slot=card]]:ring-0"
        style={{
          background: "var(--w3-surface-elevated)",
          border: "1px solid var(--w3-border-standard)",
        }}
      >
        <div className="w-full max-w-md">
          <SmartContractScanner variant="default" />
        </div>
      </div>

      <div className="mt-4">
        <CellLink href={getSectionUrl("ui")}>Browse all components</CellLink>
      </div>
    </GlassCard>
  );
}

/* ------------------------------------------------------------------ */
/*  2. Registry — typed chain & token data (1-col)                     */
/* ------------------------------------------------------------------ */

const CHAINS = [
  { name: "Ethereum", logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png" },
  { name: "Base", logo: "https://assets.coingecko.com/coins/images/25244/small/Optimism.png" },
  {
    name: "Arbitrum",
    logo: "https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg",
  },
  { name: "Polygon", logo: "https://assets.coingecko.com/coins/images/4713/small/polygon.png" },
  { name: "Solana", logo: "https://assets.coingecko.com/coins/images/4128/small/solana.png" },
];

const TOKENS = [
  { symbol: "USDC", logo: "https://assets.coingecko.com/coins/images/6319/small/usdc.png" },
  { symbol: "USDT", logo: "https://assets.coingecko.com/coins/images/325/small/Tether.png" },
  { symbol: "WETH", logo: "https://assets.coingecko.com/coins/images/2518/small/weth.png" },
  { symbol: "DAI", logo: "https://assets.coingecko.com/coins/images/9956/small/Badge_Dai.png" },
  {
    symbol: "LINK",
    logo: "https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.svg",
  },
];

type RegistryTab = "chains" | "tokens";

export function RegistryCell() {
  const [tab, setTab] = useState<RegistryTab>("chains");

  return (
    <GlassCard>
      <div className="flex flex-col gap-1">
        <CellLabel>Registry</CellLabel>
        <CellTitle>Chain &amp; token database</CellTitle>
        <p className="text-xs" style={{ color: "var(--w3-gray-500)" }}>
          Chain configs and token addresses, ready to use.
        </p>
      </div>

      <div className="mt-3 flex gap-1">
        {(["chains", "tokens"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="rounded-md px-2.5 py-1 text-xs font-medium transition-all"
            style={{
              background: tab === t ? "var(--w3-accent)" : "var(--w3-glass-inner-bg)",
              color: tab === t ? "#fff" : "var(--w3-gray-600)",
            }}
          >
            {t === "chains" ? `Chains (14)` : `Tokens (18)`}
          </button>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-1">
        {(tab === "chains" ? CHAINS : TOKENS).map((item, i) => (
          <img
            key={"name" in item ? item.name : item.symbol}
            src={item.logo}
            alt={"name" in item ? item.name : item.symbol}
            loading="lazy"
            className="h-6 w-6 rounded-full ring-2 ring-white dark:ring-black"
            style={{ marginLeft: i > 0 ? "-4px" : "0", zIndex: 10 - i }}
          />
        ))}
        <span
          className="ml-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
          style={{ background: "var(--w3-glass-inner-bg)", color: "var(--w3-gray-500)" }}
        >
          +{tab === "chains" ? "9" : "13"} more
        </span>
      </div>

      {/* Fixed height prevents layout shift on tab switch */}
      <div
        className="mt-3 flex-1 overflow-hidden rounded-lg p-3"
        style={{
          background: "var(--w3-glass-inner-bg)",
          fontFamily: '"Geist Mono", ui-monospace, monospace',
          minHeight: 130,
        }}
      >
        <div className="text-[11px] leading-[1.7]">
          <span style={{ color: "var(--w3-gray-500)" }}>{"import { "}</span>
          <span style={{ color: "var(--w3-accent)" }}>
            {tab === "chains" ? "chains" : "tokens"}
          </span>
          <span style={{ color: "var(--w3-gray-500)" }}>{' } from "@w3-kit/registry"'}</span>
          <br />
          <br />
          {tab === "chains" ? (
            <>
              <span style={{ color: "var(--w3-gray-500)" }}>chains.ethereum.</span>
              <span style={{ color: "var(--w3-gray-900)" }}>chainId</span>
              <span style={{ color: "var(--w3-gray-400)" }}>{" // 1"}</span>
              <br />
              <span style={{ color: "var(--w3-gray-500)" }}>chains.ethereum.</span>
              <span style={{ color: "var(--w3-gray-900)" }}>rpcUrls</span>
              <span style={{ color: "var(--w3-gray-400)" }}>{' // ["https://..."]'}</span>
              <br />
              <span style={{ color: "var(--w3-gray-500)" }}>chains.ethereum.</span>
              <span style={{ color: "var(--w3-gray-900)" }}>nativeCurrency</span>
              <span style={{ color: "var(--w3-gray-400)" }}>{" // { symbol: ETH }"}</span>
            </>
          ) : (
            <>
              <span style={{ color: "var(--w3-gray-500)" }}>tokens.USDC.</span>
              <span style={{ color: "var(--w3-gray-900)" }}>decimals</span>
              <span style={{ color: "var(--w3-gray-400)" }}>{" // 6"}</span>
              <br />
              <span style={{ color: "var(--w3-gray-500)" }}>tokens.USDC.</span>
              <span style={{ color: "var(--w3-gray-900)" }}>chains</span>
              <span style={{ color: "var(--w3-gray-400)" }}>{" // 8 networks"}</span>
              <br />
              <span style={{ color: "var(--w3-gray-500)" }}>tokens.USDC.</span>
              <span style={{ color: "var(--w3-gray-900)" }}>logoUrl</span>
              <span style={{ color: "var(--w3-gray-400)" }}>{' // "https://..."'}</span>
            </>
          )}
        </div>
      </div>

      <div className="mt-3">
        <CellLink href={getSectionUrl("registry")}>Browse registry</CellLink>
      </div>
    </GlassCard>
  );
}

/* ------------------------------------------------------------------ */
/*  3. Get Started — interactive stepper (1-col)                       */
/* ------------------------------------------------------------------ */

const STEPS = [
  {
    title: "Install",
    detail: "npx w3-kit init",
    mono: true,
  },
  {
    title: "Add components",
    detail: "npx w3-kit add connect-wallet",
    mono: true,
  },
  {
    title: "Ship",
    detail: "Deploy to Vercel, Netlify, anywhere.",
    mono: false,
  },
];

export function GetStartedCell() {
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % STEPS.length);

  return (
    <GlassCard className="justify-between">
      <div className="flex flex-col gap-1">
        <CellLabel>Get Started</CellLabel>
        <CellTitle>Three steps. That&apos;s it.</CellTitle>
      </div>

      <div className="my-3 flex flex-col gap-1.5">
        {STEPS.map((step, i) => {
          const isDone = i < active;
          const isCurrent = i === active;

          return (
            <button
              key={step.title}
              onClick={() => setActive(i)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-left transition-all"
              style={{
                background: isCurrent ? "var(--w3-accent-subtle)" : "var(--w3-glass-inner-bg)",
                border: isCurrent ? "1px solid var(--w3-accent)" : "1px solid transparent",
              }}
            >
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all"
                style={{
                  background: isDone || isCurrent ? "var(--w3-accent)" : "var(--w3-glass-inner-bg)",
                  color: isDone || isCurrent ? "#fff" : "var(--w3-gray-500)",
                  border: isDone || isCurrent ? "none" : "1px solid var(--w3-border-subtle)",
                }}
              >
                {isDone ? <Check size={12} /> : i + 1}
              </span>
              <div className="flex flex-col">
                <span
                  className="text-xs font-medium"
                  style={{ color: isCurrent ? "var(--w3-gray-900)" : "var(--w3-gray-600)" }}
                >
                  {step.title}
                </span>
                {isCurrent && (
                  <span
                    className="mt-0.5 text-[11px]"
                    style={{
                      color: "var(--w3-gray-500)",
                      fontFamily: step.mono ? '"Geist Mono", ui-monospace, monospace' : "inherit",
                    }}
                  >
                    {step.detail}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <ProgressBar value={active + 1} max={STEPS.length} />

      {active < STEPS.length - 1 ? (
        <Button size="sm" className="w-full gap-2" onClick={next}>
          Next step
          <ArrowRight size={14} />
        </Button>
      ) : (
        <Button
          size="sm"
          className="w-full gap-2"
          render={<a href="https://docs.w3-kit.com/getting-started" />}
        >
          Start building
          <ArrowRight size={14} />
        </Button>
      )}
    </GlassCard>
  );
}

/* ------------------------------------------------------------------ */
/*  4. Docs — "What do you need?" expandable Q&A (2-col)               */
/* ------------------------------------------------------------------ */

const DOC_QUESTIONS = [
  {
    question: "How do I get started?",
    links: [
      { label: "Getting Started guide", href: "/getting-started" },
      { label: "Project Structure", href: "/project-structure" },
    ],
  },
  {
    question: "How do I add a component?",
    links: [
      { label: "Adding Components guide", href: "/adding-components" },
      { label: "Component API reference", href: "/api" },
    ],
  },
  {
    question: "How do I switch chains?",
    links: [
      { label: "Chain Configuration guide", href: "/chain-config" },
      { label: "NetworkSwitcher component", href: "/network-switcher" },
    ],
  },
  {
    question: "How do I deploy?",
    links: [
      { label: "Deployment guide", href: "/deployment" },
      { label: "Environment variables", href: "/env-vars" },
    ],
  },
];

export function DocsCell() {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <GlassCard>
      <div className="mb-3 flex flex-col gap-1">
        <CellLabel>Documentation</CellLabel>
        <CellTitle>What do you need?</CellTitle>
      </div>

      <div className="flex flex-1 flex-col gap-1.5">
        {DOC_QUESTIONS.map((q, i) => (
          <div key={q.question}>
            <button
              onClick={() => toggle(i)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all"
              style={{
                background: open === i ? "var(--w3-accent-subtle)" : "var(--w3-glass-inner-bg)",
                border: open === i ? "1px solid var(--w3-accent)" : "1px solid transparent",
              }}
            >
              <span
                className="text-sm transition-transform"
                style={{
                  color: open === i ? "var(--w3-accent)" : "var(--w3-gray-500)",
                }}
              >
                {open === i ? "▾" : "▸"}
              </span>
              <span
                className="flex-1 text-sm"
                style={{ color: open === i ? "var(--w3-gray-900)" : "var(--w3-gray-700)" }}
              >
                {q.question}
              </span>
            </button>

            {open === i && (
              <div className="ml-8 mt-1 flex flex-col gap-1 pb-1">
                {q.links.map((link) => (
                  <a
                    key={link.label}
                    href={getSectionUrl("docs") + link.href}
                    className="group flex items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-colors"
                    style={{ color: "var(--w3-accent)" }}
                  >
                    <ArrowRight
                      size={10}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-3">
        <CellLink href={getSectionUrl("docs")}>Browse all docs</CellLink>
      </div>
    </GlassCard>
  );
}

/* ------------------------------------------------------------------ */
/*  5. Recipes — interactive with difficulty + time (2-col)            */
/* ------------------------------------------------------------------ */

const RECIPES = [
  { title: "Connect a Wallet", time: "5 min", difficulty: "Beginner", done: true },
  { title: "Display Token Balances", time: "10 min", difficulty: "Beginner", done: true },
  { title: "Switch Between Chains", time: "8 min", difficulty: "Beginner", done: false },
  { title: "Send a Transaction", time: "15 min", difficulty: "Intermediate", done: false },
  { title: "Read Contract State", time: "12 min", difficulty: "Intermediate", done: false },
];

export function RecipesCell() {
  const [checked, setChecked] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(RECIPES.map((r) => [r.title, r.done])),
  );
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (title: string) => {
    setChecked((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const total = RECIPES.length;
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <GlassCard>
      <div className="mb-2 flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <CellLabel>Recipes</CellLabel>
          <CellTitle>Learn by building</CellTitle>
        </div>
        <span
          className="rounded-full px-2.5 py-0.5 text-xs font-medium"
          style={{ background: "var(--w3-accent-subtle)", color: "var(--w3-accent)" }}
        >
          {done}/{total}
        </span>
      </div>

      <ProgressBar value={done} max={total} />

      <div className="flex flex-1 flex-col gap-1.5">
        {RECIPES.map((recipe) => {
          const isDone = checked[recipe.title];
          const isExpanded = expanded === recipe.title;

          return (
            <div key={recipe.title}>
              <button
                onClick={() => setExpanded(isExpanded ? null : recipe.title)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all"
                style={{
                  background: isDone ? "var(--w3-accent-subtle)" : "var(--w3-glass-inner-bg)",
                  border: isExpanded ? "1px solid var(--w3-accent)" : "1px solid transparent",
                }}
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(recipe.title);
                  }}
                  className="flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded transition-all"
                  style={{
                    background: isDone ? "var(--w3-accent)" : "transparent",
                    border: isDone ? "none" : "1.5px solid var(--w3-gray-400)",
                  }}
                >
                  {isDone && <Check size={12} className="text-white" />}
                </div>
                <span
                  className="flex-1 text-sm"
                  style={{ color: isDone ? "var(--w3-gray-900)" : "var(--w3-gray-600)" }}
                >
                  {recipe.title}
                </span>
                <span className="text-[10px]" style={{ color: "var(--w3-gray-400)" }}>
                  {isExpanded ? "▾" : "▸"}
                </span>
              </button>

              {isExpanded && (
                <div className="ml-8 mt-1 flex items-center gap-3 pb-1">
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                    style={{ background: "var(--w3-glass-inner-bg)", color: "var(--w3-gray-600)" }}
                  >
                    {recipe.difficulty}
                  </span>
                  <span className="text-[10px]" style={{ color: "var(--w3-gray-500)" }}>
                    ~{recipe.time}
                  </span>
                  <a
                    href={getSectionUrl("learn")}
                    className="ml-auto text-[10px] font-medium"
                    style={{ color: "var(--w3-accent)" }}
                  >
                    Start →
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-3">
        <CellLink href={getSectionUrl("learn")}>Explore all recipes</CellLink>
      </div>
    </GlassCard>
  );
}

/* ------------------------------------------------------------------ */
/*  6. Open Source — community feel (1-col)                            */
/* ------------------------------------------------------------------ */

const REPOS = [
  { name: "ui", desc: "Component library", stars: 9 },
  { name: "cli", desc: "Project scaffolding", stars: 2 },
  { name: "learn", desc: "Interactive courses", stars: 2 },
  { name: "registry", desc: "Chain & token data", stars: 1 },
  { name: "contracts", desc: "Smart contracts", stars: 1 },
];

export function OpenSourceCell() {
  return (
    <GlassCard>
      <div className="flex flex-col gap-1">
        <CellLabel>Open Source</CellLabel>
        <CellTitle>Built in the open</CellTitle>
      </div>

      <div className="mt-3 flex flex-1 flex-col gap-1.5">
        {REPOS.map((repo) => (
          <a
            key={repo.name}
            href={`https://github.com/w3-kit/${repo.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 rounded-lg px-3 py-2 transition-colors"
            style={{ background: "var(--w3-glass-inner-bg)" }}
          >
            <GitHubIcon size={14} className="shrink-0" />
            <div className="flex flex-1 flex-col">
              <span
                className="text-xs font-medium group-hover:underline"
                style={{
                  color: "var(--w3-gray-900)",
                  fontFamily: '"Geist Mono", ui-monospace, monospace',
                }}
              >
                w3-kit/{repo.name}
              </span>
              <span className="text-[10px]" style={{ color: "var(--w3-gray-500)" }}>
                {repo.desc}
              </span>
            </div>
            <span
              className="flex shrink-0 items-center gap-1 text-[10px]"
              style={{ color: "var(--w3-gray-500)" }}
            >
              <Star size={10} />
              {repo.stars}
            </span>
          </a>
        ))}
      </div>

      <div className="mt-3">
        <Button
          size="sm"
          className="w-full gap-2"
          render={<a href="https://github.com/w3-kit" target="_blank" rel="noopener noreferrer" />}
        >
          <GitHubIcon size={14} />
          View on GitHub
        </Button>
      </div>
    </GlassCard>
  );
}
