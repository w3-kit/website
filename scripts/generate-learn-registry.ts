/**
 * Auto-discovery script for the learn repo.
 *
 * Scans ../learn/guides/, ../learn/recipes/, and ../learn/docs/ at build time,
 * then generates:
 *   - src/entities/guide/model/guide-registry.gen.ts
 *   - src/entities/recipe/model/recipe-registry.gen.ts
 *   - src/entities/guide/model/docs-nav.gen.ts
 *   - src/entities/guide/model/doc-content.gen.ts
 *
 * Run: npx tsx scripts/generate-learn-registry.ts
 * Wired into: "prebuild" and "predev" npm scripts
 */

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const REPO_ROOT = path.resolve(import.meta.dirname, "..");

const WORKSPACE_ROOTS = Array.from(
  new Set(
    [
      process.env.W3_KIT_WORKSPACE_ROOT,
      REPO_ROOT,
      path.resolve(REPO_ROOT, ".."),
      path.resolve(REPO_ROOT, "../.."),
      path.resolve(REPO_ROOT, "../../.."),
    ]
      .filter((root): root is string => Boolean(root))
      .map((root) => path.resolve(root)),
  ),
);

function findExistingDirectory(relativePaths: string[]): string | null {
  for (const relativePath of relativePaths) {
    for (const root of WORKSPACE_ROOTS) {
      const candidate = path.join(root, relativePath);
      if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
        return candidate;
      }
    }
  }
  return null;
}

const LEARN_DIR = findExistingDirectory(["learn", "w3-kit-learn/mirror"]);
const GUIDES_DIR = LEARN_DIR ? path.join(LEARN_DIR, "guides") : "";
const RECIPES_DIR = LEARN_DIR ? path.join(LEARN_DIR, "recipes") : "";
const DOCS_DIR = LEARN_DIR ? path.join(LEARN_DIR, "docs") : "";

const GUIDE_OUT = path.resolve(
  import.meta.dirname,
  "../src/entities/guide/model/guide-registry.gen.ts",
);
const RECIPE_OUT = path.resolve(
  import.meta.dirname,
  "../src/entities/recipe/model/recipe-registry.gen.ts",
);
const NAV_OUT = path.resolve(
  import.meta.dirname,
  "../src/entities/guide/model/docs-nav.gen.ts",
);
const DOC_CONTENT_OUT = path.resolve(
  import.meta.dirname,
  "../src/entities/guide/model/doc-content.gen.ts",
);

// ── Helpers ─────────────────────────────────────────────────────────────────

function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function categoryToTitle(cat: string): string {
  return slugToTitle(cat);
}

function toCamelCase(slug: string): string {
  return slug.replace(/-(.)/g, (_, c) => c.toUpperCase());
}

// Map git author names to GitHub usernames
const GIT_NAME_TO_GITHUB: Record<string, string> = {
  "Petar Stoev": "PetarStoev02",
  "Raad05": "Raad05",
};

function getGitAuthor(filePath: string): string {
  if (!LEARN_DIR) return "PetarStoev02";
  try {
    const result = execSync(
      `git -C ${JSON.stringify(LEARN_DIR)} log --diff-filter=A --format=%an -- ${JSON.stringify(filePath)}`,
      { encoding: "utf-8" },
    ).trim();
    if (!result) return "PetarStoev02";
    // Map git name to GitHub username
    return GIT_NAME_TO_GITHUB[result] ?? result;
  } catch {
    return "PetarStoev02";
  }
}

// ── Discover Guides ─────────────────────────────────────────────────────────

interface GuideInfo {
  slug: string;
  category: string;
  title: string;
  author: string;
  content: string;
}

function discoverGuides(): GuideInfo[] {
  const guides: GuideInfo[] = [];
  if (!fs.existsSync(GUIDES_DIR)) return guides;

  const categories = fs
    .readdirSync(GUIDES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  for (const category of categories) {
    const catDir = path.join(GUIDES_DIR, category);
    const files = fs
      .readdirSync(catDir)
      .filter((f) => f.endsWith(".md"))
      .sort();

    for (const file of files) {
      const slug = file.replace(/\.md$/, "");
      // Read first line to extract title from markdown # heading
      const content = fs.readFileSync(path.join(catDir, file), "utf-8");
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1].trim() : slugToTitle(slug);

      // Resolve author from git log on the original file commit
      const relPath = path.join("guides", category, file);
      const author = getGitAuthor(relPath);

      guides.push({
        slug,
        category,
        title,
        author,
        content,
      });
    }
  }

  return guides;
}

// ── Discover Recipes ────────────────────────────────────────────────────────

interface RecipeInfo {
  slug: string;
  category: string; // derived from meta.json chains or manual grouping
  meta: {
    name: string;
    description: string;
    chains: string[];
    dependencies: Record<string, string[]>;
    author?: string;
  };
  evmCode: string;
  solanaCode: string;
  learnContent: string;
}

// Recipe category grouping based on the recipe name patterns
function getRecipeCategory(slug: string, meta: { chains: string[] }): string {
  const walletRecipes = ["connect-wallet", "disconnect-wallet", "sign-message", "switch-network"];
  const tokenRecipes = [
    "create-token",
    "transfer-tokens",
    "approve-spending",
    "get-balance",
    "fetch-metadata",
    "watch-transfers",
  ];
  const nftRecipes = [
    "mint-nft",
    "fetch-nft-collection",
    "buy-nft",
    "display-nft-metadata",
    "onchain-svg-nft",
  ];
  const defiRecipes = ["swap-tokens", "provide-liquidity", "stake-tokens", "claim-rewards"];

  if (walletRecipes.includes(slug)) return "wallet";
  if (tokenRecipes.includes(slug)) return "tokens";
  if (nftRecipes.includes(slug)) return "nfts";
  if (defiRecipes.includes(slug)) return "defi";
  return "utils";
}

function discoverRecipes(): RecipeInfo[] {
  const recipes: RecipeInfo[] = [];
  if (!fs.existsSync(RECIPES_DIR)) return recipes;

  const dirs = fs
    .readdirSync(RECIPES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  for (const dir of dirs) {
    const recipeDir = path.join(RECIPES_DIR, dir);
    const metaPath = path.join(recipeDir, "meta.json");
    if (!fs.existsSync(metaPath)) continue;

    const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
    const evmPath = path.join(recipeDir, "evm.tsx");
    const solanaPath = path.join(recipeDir, "solana.tsx");
    const learnFile = fs
      .readdirSync(recipeDir)
      .find((f) => f.endsWith(".learn.md"));

    recipes.push({
      slug: dir,
      category: getRecipeCategory(dir, meta),
      meta,
      evmCode: fs.existsSync(evmPath) ? fs.readFileSync(evmPath, "utf-8") : "",
      solanaCode: fs.existsSync(solanaPath) ? fs.readFileSync(solanaPath, "utf-8") : "",
      learnContent: learnFile
        ? fs.readFileSync(path.join(recipeDir, learnFile), "utf-8")
        : "",
    });
  }

  return recipes;
}

// ── Discover Docs ────────────────────────────────────────────────────────────

interface DocInfo {
  slug: string;
  content: string;
}

const LOCAL_DOC_FALLBACKS: Record<string, string> = {
  introduction: `# Introduction

w3-kit is an open-source toolkit for shipping web3 interfaces faster.

## What is included

- Typed React components for wallet, DeFi, NFT, data, and utility flows
- A CLI for bootstrapping and adding code into your project
- Registry data for chains, tokens, and explorer metadata
- Guides and recipes for common web3 product patterns

## Recommended path

1. Start with \`npx w3-kit init\`
2. Add one component with \`npx w3-kit add <component>\`
3. Open the UI explorer to inspect props and install commands
4. Wire the generated UI to your own wallet, RPC, and backend logic
`,
  installation: `# Installation

You can adopt w3-kit incrementally.

## Prerequisites

- Node.js 20+
- npm
- A React app that already uses Tailwind CSS

## Bootstrap a project

\`\`\`bash
npx w3-kit init
\`\`\`

## Add a component

\`\`\`bash
npx w3-kit add connect-wallet
\`\`\`

The CLI copies source into your app so you can read it, edit it, and own the final implementation.
`,
  "project-structure": `# Project Structure

w3-kit is designed to stay source-first.

## Typical layout

\`\`\`text
src/
  components/
  lib/
  styles/
\`\`\`

## What the toolkit gives you

- UI components with explicit props
- Small utility helpers instead of framework lock-in
- Registry-backed data that can be queried from your own app

Keep blockchain state, API clients, and product-specific business logic in your application layer.
`,
  configuration: `# Configuration

Most setup work in w3-kit is about connecting product state to presentational UI.

## Common configuration points

- Wallet adapter or wagmi setup
- RPC and chain selection
- Theme variables and design tokens
- App-specific data fetching for balances, prices, and contract state

## Rule of thumb

Treat w3-kit components as typed surfaces. Your app should remain the source of truth for async state, mutation flows, and permissions.
`,
  components: `# Components

The component catalog is grouped around real web3 jobs.

## Categories

- Wallet: connect, switch, balances, address book, multisig
- DeFi: swap, staking, bridge, liquidity, position management
- NFT: cards, collections, marketplace views
- Data: token lists, price views, portfolio views, history
- Utility: contract interaction, ENS, gas, subscriptions, vesting

Each component page under \`/ui\` shows install commands, props, and a live demo.
`,
  theming: `# Theming

w3-kit uses CSS variables so the toolkit can match the rest of your product.

## What to customize

- Surface and border colors
- Accent color
- Typography
- Radius, spacing, and shadows

## Practical advice

Start by overriding tokens, not by forking component structure. That keeps upgrades easier while still letting you fit your brand.
`,
  "design-tokens": `# Design Tokens

Tokens provide a stable contract between design and implementation.

## Core groups

- Color tokens for text, surfaces, borders, and accents
- Typography tokens for size, weight, and tracking
- Layout tokens for spacing, radius, and shadows

## Usage

Prefer tokens over hard-coded values in product code. That keeps the UI consistent across landing pages, docs, and embedded components.
`,
  accessibility: `# Accessibility

w3-kit aims to keep web3 UI usable before product-specific polish is added.

## Defaults

- Keyboard reachable interactive controls
- Semantic labels and readable text hierarchy
- Focus styles that remain visible on dense surfaces
- High-contrast accents against neutral surfaces

## Integration note

If you wrap a component with custom state or motion, re-check focus order, labels, and reduced-motion behavior in your app.
`,
  "ui-library": `# UI Library

The UI library is the fastest way to understand the toolkit.

## What you will find

- Typed React components with live examples
- Install commands on every component page
- Clear prop tables and usage notes

## Best workflow

Browse \`/ui\`, copy the install command for the component you need, and then wire your own data and wallet logic around the generated source.
`,
  registry: `# Registry

The registry packages product data that web3 apps repeatedly need.

## Typical data

- Supported chains
- Token metadata
- Explorer and RPC references

## Why it matters

Keeping chain and token facts in one typed layer reduces drift between marketing pages, docs, and runtime UI.
`,
  cli: `# CLI

The CLI is the fastest path from idea to working source code.

## Main jobs

- Initialize a project
- Add components
- Add recipes for common flows

## Philosophy

The CLI writes code into your app instead of hiding behavior behind a remote runtime. You keep the final source and can adapt it freely.
`,
  contracts: `# Contracts

w3-kit supports contract-driven products, but it stays application-friendly.

## How to think about it

- Use your own ABI, address, and signer setup
- Feed decoded contract state into presentational components
- Pair contract flows with recipes when you need end-to-end examples

The current public website focuses more on frontend composition than on shipping a monolithic contracts framework.
`,
  "components-api": `# Components API

Every component page in the UI explorer is the API reference entry point.

## What is documented there

- Import path
- Required and optional props
- Controlled versus uncontrolled behavior
- Expected callback shapes

When in doubt, prefer the live \`/ui/<component>\` page over marketing copy because it reflects the actual exported surface.
`,
  "hooks-utilities": `# Hooks and Utilities

The website ships a small supporting layer around the component catalog.

## Examples

- Clipboard helpers for install commands
- Theme helpers for light and dark mode
- URL helpers for section-aware navigation

Keep helpers small and explicit. If a utility starts owning product state, it probably belongs in your application instead.
`,
  "cli-commands": `# CLI Commands

The CLI is intentionally small.

## Common commands

\`\`\`bash
npx w3-kit init
npx w3-kit add connect-wallet
npx w3-kit add mint-nft --chain evm
npx w3-kit add swap-tokens --no-learn
\`\`\`

## Notes

- Use component slugs for UI installs
- Use recipe slugs for workflow examples
- Prefer adding one focused unit at a time instead of scaffolding everything at once
`,
};

function discoverDocs(): DocInfo[] {
  if (!fs.existsSync(DOCS_DIR)) {
    console.warn("  docs source not found, using local fallback docs");
    return Object.keys(DOC_SECTION_MAP).map((slug) => ({
      slug,
      content:
        LOCAL_DOC_FALLBACKS[slug] ??
        `# ${slugToTitle(slug)}\n\nDocumentation for this section is not available yet.\n`,
    }));
  }

  const docs: DocInfo[] = [];

  const files = fs
    .readdirSync(DOCS_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort();

  for (const file of files) {
    docs.push({
      slug: file.replace(/\.md$/, ""),
      content: fs.readFileSync(path.join(DOCS_DIR, file), "utf-8"),
    });
  }

  return docs;
}

// ── Generate guide-registry.gen.ts ──────────────────────────────────────────

function generateGuideRegistry(guides: GuideInfo[]): string {
  const lines: string[] = [
    '// AUTO-GENERATED by scripts/generate-learn-registry.ts — do not edit manually',
    'import type { GuideMeta } from "./types";',
    "",
  ];
  lines.push("export const guideRegistry: GuideMeta[] = [");

  for (const g of guides) {
    lines.push("  {");
    lines.push(`    id: ${JSON.stringify(g.slug)},`);
    lines.push(`    title: ${JSON.stringify(g.title)},`);
    lines.push(
      `    description: ${JSON.stringify(`Learn about ${g.title.toLowerCase()}`)},`,
    );
    lines.push(`    category: ${JSON.stringify(g.category)} as GuideMeta["category"],`);
    lines.push(`    slug: ${JSON.stringify(g.slug)},`);
    lines.push(`    content: ${JSON.stringify(g.content)},`);
    lines.push(`    author: ${JSON.stringify(g.author)},`);
    lines.push("  },");
  }

  lines.push("];");
  lines.push("");
  return lines.join("\n");
}

// ── Generate recipe-registry.gen.ts ─────────────────────────────────────────

function generateRecipeRegistry(recipes: RecipeInfo[]): string {
  const lines: string[] = [
    '// AUTO-GENERATED by scripts/generate-learn-registry.ts — do not edit manually',
    'import type { RecipeMeta } from "./types";',
    "",
  ];
  lines.push("export const recipeRegistry: RecipeMeta[] = [");

  for (const r of recipes) {
    lines.push("  {");
    lines.push(`    id: ${JSON.stringify(r.meta.name)},`);
    lines.push(`    name: ${JSON.stringify(r.meta.name)},`);
    lines.push(`    description: ${JSON.stringify(r.meta.description)},`);
    lines.push(`    slug: ${JSON.stringify(r.meta.name)},`);
    lines.push(`    chains: ${JSON.stringify(r.meta.chains)},`);
    lines.push(`    dependencies: ${JSON.stringify(r.meta.dependencies)},`);
    lines.push(`    evmCode: ${JSON.stringify(r.evmCode)},`);
    lines.push(`    solanaCode: ${JSON.stringify(r.solanaCode)},`);
    lines.push(`    learnContent: ${JSON.stringify(r.learnContent)},`);
    lines.push(`    author: ${JSON.stringify(r.meta.author ?? "")},`);
    lines.push("  },");
  }

  lines.push("];");
  lines.push("");
  return lines.join("\n");
}

// ── Generate doc-content.gen.ts ──────────────────────────────────────────────

function generateDocContent(docs: DocInfo[]): string {
  const lines: string[] = [
    '// AUTO-GENERATED by scripts/generate-learn-registry.ts — do not edit manually',
    "",
  ];
  lines.push("export const docContentMap: Record<string, string> = {");

  for (const doc of docs) {
    lines.push(`  ${JSON.stringify(doc.slug)}: ${JSON.stringify(doc.content)},`);
  }

  lines.push("};");
  lines.push("");
  return lines.join("\n");
}

// ── Generate docs-nav.gen.ts ────────────────────────────────────────────────

// Static mapping of doc slug → section title
const DOC_SECTION_MAP: Record<string, string> = {
  introduction: "Getting Started",
  installation: "Getting Started",
  "project-structure": "Getting Started",
  configuration: "Getting Started",
  components: "Core Concepts",
  theming: "Core Concepts",
  "design-tokens": "Core Concepts",
  accessibility: "Core Concepts",
  "ui-library": "Ecosystem",
  registry: "Ecosystem",
  cli: "Ecosystem",
  contracts: "Ecosystem",
  "components-api": "API Reference",
  "hooks-utilities": "API Reference",
  "cli-commands": "API Reference",
};

// Preserve display order within each section
const SECTION_ORDER = ["Getting Started", "Core Concepts", "Ecosystem", "API Reference", "Other"];

function generateDocsNav(
  docs: DocInfo[],
  guides: GuideInfo[],
  recipes: RecipeInfo[],
): string {
  const lines: string[] = [
    '// AUTO-GENERATED by scripts/generate-learn-registry.ts — do not edit manually',
    "",
    "export interface DocNavItem {",
    "  label: string;",
    "  slug: string;",
    '  type: "markdown" | "guide" | "recipe";',
    "}",
    "",
    "export interface DocNavSection {",
    "  title: string;",
    "  items: DocNavItem[];",
    "}",
    "",
    "export const docsNavSections: DocNavSection[] = [",
  ];

  // Build doc sections from discovered docs, grouped by the static map
  const sectionMap = new Map<string, DocInfo[]>();
  for (const doc of docs) {
    const section = DOC_SECTION_MAP[doc.slug] ?? "Other";
    const list = sectionMap.get(section) ?? [];
    list.push(doc);
    sectionMap.set(section, list);
  }

  for (const sectionTitle of SECTION_ORDER) {
    const sectionDocs = sectionMap.get(sectionTitle);
    if (!sectionDocs?.length) continue;
    lines.push("  {");
    lines.push(`    title: ${JSON.stringify(sectionTitle)},`);
    lines.push("    items: [");
    for (const doc of sectionDocs) {
      lines.push(
        `      { label: ${JSON.stringify(slugToTitle(doc.slug))}, slug: ${JSON.stringify(doc.slug)}, type: "markdown" },`,
      );
    }
    lines.push("    ],");
    lines.push("  },");
  }

  // Group guides by category
  const guidesByCategory = new Map<string, GuideInfo[]>();
  for (const g of guides) {
    const list = guidesByCategory.get(g.category) || [];
    list.push(g);
    guidesByCategory.set(g.category, list);
  }

  // Add guide sections
  for (const [category, categoryGuides] of guidesByCategory) {
    const title =
      guidesByCategory.size === 1
        ? "Guides"
        : `Guides: ${categoryToTitle(category)}`;
    lines.push("  {");
    lines.push(`    title: ${JSON.stringify(title)},`);
    lines.push("    items: [");
    for (const g of categoryGuides) {
      lines.push(
        `      { label: ${JSON.stringify(g.title)}, slug: ${JSON.stringify(g.slug)}, type: "guide" },`,
      );
    }
    lines.push("    ],");
    lines.push("  },");
  }

  // Group recipes by category
  const recipesByCategory = new Map<string, RecipeInfo[]>();
  const categoryOrder = ["wallet", "tokens", "nfts", "defi", "utils"];
  for (const r of recipes) {
    const list = recipesByCategory.get(r.category) || [];
    list.push(r);
    recipesByCategory.set(r.category, list);
  }

  for (const cat of categoryOrder) {
    const catRecipes = recipesByCategory.get(cat);
    if (!catRecipes?.length) continue;
    const title = `Recipes: ${categoryToTitle(cat)}`;
    lines.push("  {");
    lines.push(`    title: ${JSON.stringify(title)},`);
    lines.push("    items: [");
    for (const r of catRecipes) {
      lines.push(
        `      { label: ${JSON.stringify(slugToTitle(r.slug))}, slug: ${JSON.stringify(r.slug)}, type: "recipe" },`,
      );
    }
    lines.push("    ],");
    lines.push("  },");
  }

  lines.push("];");
  lines.push("");
  lines.push("/** Flat ordered list of all nav items (useful for prev/next navigation) */");
  lines.push("export const allDocNavItems = docsNavSections.flatMap((s) =>");
  lines.push('  s.items.map((item) => ({ ...item, section: s.title })),');
  lines.push(");");
  lines.push("");

  return lines.join("\n");
}

// ── Main ────────────────────────────────────────────────────────────────────

console.log("Scanning learn repo...");
const outFiles = [GUIDE_OUT, RECIPE_OUT, NAV_OUT, DOC_CONTENT_OUT];

if (!LEARN_DIR) {
  if (outFiles.every((file) => fs.existsSync(file))) {
    console.warn("  learn repo not found, reusing committed generated registries");
    process.exit(0);
  }
  console.warn("  learn repo not found, generating empty registries");
}

const guides = discoverGuides();
console.log(`  Found ${guides.length} guides`);

const recipes = discoverRecipes();
console.log(`  Found ${recipes.length} recipes`);

const docs = discoverDocs();
console.log(`  Found ${docs.length} doc pages`);

// Write files
fs.writeFileSync(GUIDE_OUT, generateGuideRegistry(guides));
console.log(`  Wrote ${path.relative(process.cwd(), GUIDE_OUT)}`);

fs.writeFileSync(RECIPE_OUT, generateRecipeRegistry(recipes));
console.log(`  Wrote ${path.relative(process.cwd(), RECIPE_OUT)}`);

fs.writeFileSync(NAV_OUT, generateDocsNav(docs, guides, recipes));
console.log(`  Wrote ${path.relative(process.cwd(), NAV_OUT)}`);

fs.writeFileSync(DOC_CONTENT_OUT, generateDocContent(docs));
console.log(`  Wrote ${path.relative(process.cwd(), DOC_CONTENT_OUT)}`);

// Format generated files so format:check passes in CI
execSync(`npx prettier --write ${outFiles.map((f) => JSON.stringify(f)).join(" ")}`, {
  stdio: "ignore",
});

console.log("Done!");
