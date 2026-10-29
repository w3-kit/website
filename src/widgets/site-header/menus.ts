import {
  COMPONENT_CATEGORIES,
  componentRegistry,
  type ComponentCategory,
} from "../../entities/component";
import { CHAINS } from "../../entities/chain/model/chains.gen";
import { TOKENS } from "../../entities/token/model/tokens.gen";
import { docsNavSections } from "../../entities/guide/model/docs-nav.gen";
import { getDocItemHref, getLandingUrl, getSectionUrl } from "../../shared/lib/urls";
import type { Section } from "../../shared/lib/theme";

export interface MenuLink {
  label: string;
  href: string;
}

export interface MenuGroup {
  /** Omitted on a column that continues the previous group. */
  title?: string;
  links: MenuLink[];
}

/** A header item that opens a mega panel. */
export interface Menu {
  label: string;
  href: string;
  summary: string;
  groups: MenuGroup[];
}

export type NavItem = Menu | MenuLink;

export const isMenu = (item: NavItem): item is Menu => "groups" in item;

/** What one site shows in the shared header and footer. */
export interface SiteNav {
  name: string;
  home: string;
  items: NavItem[];
  footer: MenuGroup[];
}

const COLUMN_LENGTH = 6;

const landing = getLandingUrl();
const ui = getSectionUrl("ui");
const docs = getSectionUrl("docs");
const registry = getSectionUrl("registry");

/** The sites of the toolkit, for the Ecosystem switcher and the footer. */
export const ECOSYSTEM: { section: Section; label: string; href: string; description: string }[] = [
  {
    section: "landing",
    label: "w3-kit",
    href: landing,
    description: "What the toolkit is and why",
  },
  { section: "ui", label: "Components", href: ui, description: "Live React components to copy" },
  { section: "docs", label: "Docs", href: docs, description: "Install, configure, recipes" },
  {
    section: "registry",
    label: "Registry",
    href: registry,
    description: "Chain and token addresses",
  },
];

export const COMMUNITY: MenuGroup = {
  title: "Community",
  links: [
    { label: "GitHub", href: "https://github.com/w3-kit" },
    { label: "npm", href: "https://www.npmjs.com/org/w3-kit" },
    { label: "Contributing", href: "https://github.com/w3-kit/website/blob/main/CONTRIBUTING.md" },
    { label: "Issues", href: "https://github.com/w3-kit/website/issues" },
  ],
};

/** Splits a long list into titled first column plus untitled continuation columns. */
function columns(title: string, links: MenuLink[]): MenuGroup[] {
  const groups: MenuGroup[] = [];
  for (let i = 0; i < links.length; i += COLUMN_LENGTH) {
    groups.push({ title: i === 0 ? title : undefined, links: links.slice(i, i + COLUMN_LENGTH) });
  }
  return groups;
}

// ── Components ─────────────────────────────────────────────────────────────

const CATEGORY_SUMMARIES: Record<ComponentCategory, string> = {
  wallet: "Connect a wallet, switch networks, show balances.",
  defi: "Swap, stake, bridge and manage positions.",
  nft: "Show, collect and compare NFTs.",
  data: "Prices, portfolios, token lists and history.",
  utility: "Contracts, ENS, gas, airdrops and vesting.",
};

const componentLinks = (category: ComponentCategory) =>
  componentRegistry
    .filter((c) => c.category === category)
    .map((c) => ({ label: c.name, href: `${ui}/${c.id}` }));

const categoryMenus: Menu[] = COMPONENT_CATEGORIES.map(({ value, label }) => ({
  label,
  href: `${ui}/?category=${value}`,
  summary: CATEGORY_SUMMARIES[value],
  groups: columns(`${componentLinks(value).length} components`, componentLinks(value)),
}));

// ── Docs ───────────────────────────────────────────────────────────────────

const docsSection = (title: string): MenuGroup => {
  const section = docsNavSections.find((s) => s.title === title);
  return {
    title: title.replace(/^(Guides|Recipes):\s*/, ""),
    links: (section?.items ?? []).map((item) => ({
      // Guide titles carry a subtitle after a dash; the menu only needs the name.
      label: item.label.split(" — ")[0],
      href: getDocItemHref(item),
    })),
  };
};
const docsSectionsWith = (prefix: string) =>
  docsNavSections.filter((s) => s.title.startsWith(prefix)).map((s) => docsSection(s.title));

const docsMenus: Menu[] = [
  {
    label: "Get started",
    href: `${docs}/introduction`,
    summary: "Install the kit and learn how its parts fit together.",
    groups: [docsSection("Getting Started"), docsSection("Core Concepts")],
  },
  {
    label: "Reference",
    href: `${docs}/cli-commands`,
    summary: "Every CLI command, component prop and hook.",
    groups: [docsSection("Packages"), docsSection("API Reference")],
  },
  {
    label: "Guides",
    href: `${docs}/guide/glossary`,
    summary: "How EVM and Solana work, and how to stay safe on them.",
    groups: docsSectionsWith("Guides:"),
  },
  {
    label: "Recipes",
    href: `${docs}/recipe/connect-wallet`,
    summary: "Working code for one task each. Add any with npx w3-kit add.",
    groups: docsSectionsWith("Recipes:"),
  },
];

// ── Registry ───────────────────────────────────────────────────────────────

const chainLink = (c: (typeof CHAINS)[number]) => ({
  label: c.name,
  href: `${registry}/chains/${c.chainId}`,
});
const mainnets = CHAINS.filter((c) => !c.testnet);

const registryMenus: NavItem[] = [
  {
    label: "Chains",
    href: `${registry}/chains`,
    summary: `${CHAINS.length} chains with their IDs, native tokens, RPCs and explorers.`,
    groups: [
      ...columns("EVM", mainnets.filter((c) => c.ecosystem === "evm").map(chainLink)),
      { title: "Other", links: mainnets.filter((c) => c.ecosystem !== "evm").map(chainLink) },
      { title: "Testnets", links: CHAINS.filter((c) => c.testnet).map(chainLink) },
    ],
  },
  {
    label: "Tokens",
    href: `${registry}/tokens`,
    summary: `${TOKENS.length} tokens and their address on every chain they live on.`,
    groups: columns(
      "Tokens",
      TOKENS.map((t) => ({
        label: `${t.symbol}, ${t.name}`,
        href: `${registry}/tokens/${t.symbol}`,
      })),
    ),
  },
  { label: "Programs", href: `${registry}/programs` },
  { label: "API", href: `${registry}/api` },
];

// ── Per-site navigation ────────────────────────────────────────────────────

export const SITE_NAV: Record<Section, SiteNav> = {
  landing: {
    name: "w3-kit",
    home: landing,
    items: [],
    footer: [
      {
        title: "w3-kit",
        links: [
          { label: "Home", href: landing },
          { label: "Features", href: `${landing}/#states` },
          { label: "How it works", href: `${landing}/#workflow` },
        ],
      },
      {
        title: "Start here",
        links: [
          { label: "Introduction", href: `${docs}/introduction` },
          { label: "Installation", href: `${docs}/installation` },
          { label: "CLI", href: `${docs}/cli` },
        ],
      },
    ],
  },
  ui: {
    name: "Components",
    home: ui,
    items: categoryMenus,
    footer: COMPONENT_CATEGORIES.map(({ value, label }) => ({
      title: label,
      links: componentLinks(value),
    })),
  },
  docs: {
    name: "Docs",
    home: docs,
    items: docsMenus,
    footer: [
      docsSection("Getting Started"),
      docsSection("Core Concepts"),
      docsSection("API Reference"),
    ],
  },
  registry: {
    name: "Registry",
    home: registry,
    items: registryMenus,
    footer: [
      { title: "Chains", links: mainnets.slice(0, COLUMN_LENGTH).map(chainLink) },
      {
        title: "Tokens",
        links: TOKENS.slice(0, COLUMN_LENGTH).map((t) => ({
          label: t.symbol,
          href: `${registry}/tokens/${t.symbol}`,
        })),
      },
      {
        title: "Registry",
        links: [
          { label: "All chains", href: `${registry}/chains` },
          { label: "All tokens", href: `${registry}/tokens` },
          { label: "Programs", href: `${registry}/programs` },
          { label: "API", href: `${registry}/api` },
        ],
      },
    ],
  },
};
