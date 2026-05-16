/**
 * Auto-fetch script for landing page stats.
 *
 * Pulls live numbers at build time:
 *   - GitHub stars across the w3-kit org
 *   - npm weekly downloads summed across published packages
 *   - Component count from ui/registry/w3-kit/
 *   - Chain count from registry/data/chains.json
 *
 * Falls back to safe defaults if a request fails so dev/build keeps working
 * offline. Writes to src/entities/stats/model/stats.gen.ts.
 *
 * Run: npx tsx scripts/generate-stats.ts
 * Wired into: "prebuild" and "predev" npm scripts (via "generate")
 */

import fs from "node:fs";
import path from "node:path";

const REPO_ROOT = path.resolve(import.meta.dirname, "..");
const MIRROR_OUT_DIR = path.join(REPO_ROOT, "src/shared/ui/w3-kit");

const OUT_FILE = path.resolve(
  import.meta.dirname,
  "../src/entities/stats/model/stats.gen.ts",
);

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

// ── Sources ─────────────────────────────────────────────────────────────────

// Repos under the w3-kit org we want to sum stars across.
const GH_REPOS = [
  "w3-kit/website",
  "w3-kit/ui",
  "w3-kit/cli",
  "w3-kit/registry",
  "w3-kit/learn",
  "w3-kit/contracts",
  "w3-kit/config",
  "w3-kit/bot",
];

// Published npm packages we want to sum weekly downloads across.
const NPM_PACKAGES = [
  "w3-kit",
  "@w3-kit/registry",
  "@w3-kit/config",
  "@w3-kit/mcp",
];

// ── Helpers ─────────────────────────────────────────────────────────────────

function fmtCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 10_000) return `${Math.round(n / 1_000)}k`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(n);
}

async function fetchJson<T>(url: string, headers: Record<string, string> = {}): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "w3-kit-website-stats", ...headers },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function findExistingPath(relativePaths: string[]): string | null {
  for (const relativePath of relativePaths) {
    for (const root of WORKSPACE_ROOTS) {
      const candidate = path.join(root, relativePath);
      if (fs.existsSync(candidate)) return candidate;
    }
  }
  return null;
}

function readPreviousStats(): Record<string, string> {
  if (!fs.existsSync(OUT_FILE)) return {};
  const content = fs.readFileSync(OUT_FILE, "utf-8");
  const stats: Record<string, string> = {};
  const matches = content.matchAll(/big:\s*"([^"]*)",\s*sml:\s*"([^"]*)"/g);
  for (const [, big, sml] of matches) {
    stats[sml] = big;
  }
  return stats;
}

// ── Fetchers ────────────────────────────────────────────────────────────────

async function fetchGithubStars(): Promise<number | null> {
  const headers: Record<string, string> = {};
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const results = await Promise.all(
    GH_REPOS.map(async (repo) => {
      const data = await fetchJson<{ stargazers_count?: number }>(
        `https://api.github.com/repos/${repo}`,
        headers,
      );
      return data?.stargazers_count ?? null;
    }),
  );
  if (results.some((value) => value === null)) return null;
  return results.reduce((a, b) => a + (b ?? 0), 0);
}

async function fetchNpmWeeklyDownloads(): Promise<number | null> {
  const results = await Promise.all(
    NPM_PACKAGES.map(async (pkg) => {
      const data = await fetchJson<{ downloads?: number }>(
        `https://api.npmjs.org/downloads/point/last-week/${encodeURIComponent(pkg)}`,
      );
      return data?.downloads ?? null;
    }),
  );
  if (results.some((value) => value === null)) return null;
  return results.reduce((a, b) => a + (b ?? 0), 0);
}

function countComponents(): number {
  const sourceDir =
    findExistingPath([
      "ui/registry/w3-kit",
      "w3-kit-ui/mirror/registry/w3-kit",
    ]) ?? MIRROR_OUT_DIR;
  if (!fs.existsSync(sourceDir)) return 0;
  return fs
    .readdirSync(sourceDir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && e.name !== "lib").length;
}

function countChains(): number {
  const chainsJson = findExistingPath([
    "registry/data/chains.json",
    "w3-kit-registry/mirror/data/chains.json",
  ]);
  if (!chainsJson) return 0;
  try {
    const data = JSON.parse(fs.readFileSync(chainsJson, "utf-8"));
    return Array.isArray(data) ? data.length : Object.keys(data).length;
  } catch {
    return 0;
  }
}

// ── Run ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("Fetching landing stats...");
  const previous = readPreviousStats();

  const [stars, npmWeekly] = await Promise.all([
    fetchGithubStars(),
    fetchNpmWeeklyDownloads(),
  ]);
  const components = countComponents();
  const chains = countChains();

  console.log(`  GitHub stars (org sum): ${stars ?? "unavailable"}`);
  console.log(`  npm downloads / week:   ${npmWeekly ?? "unavailable"}`);
  console.log(`  Components:             ${components}`);
  console.log(`  Chains:                 ${chains}`);

  const generatedAt = new Date().toISOString();
  const githubStars = stars && stars > 0 ? fmtCompact(stars) : (previous["GitHub stars"] ?? "—");
  const npmDownloads = npmWeekly && npmWeekly > 0 ? fmtCompact(npmWeekly) : (previous["npm downloads / week"] ?? "—");
  const componentCount = components > 0 ? String(components) : (previous["components shipped"] ?? "0");
  const chainCount = chains > 0 ? String(chains) : (previous["chains supported"] ?? "0");

  const content = `/* AUTO-GENERATED by scripts/generate-stats.ts — do not edit by hand. */

export interface LandingStat {
  big: string;
  sml: string;
  sub: string;
}

export const STATS_GENERATED_AT = "${generatedAt}";

export const LANDING_STATS: LandingStat[] = [
  {
    big: ${JSON.stringify(githubStars)},
    sml: "GitHub stars",
    sub: "across the w3-kit org",
  },
  {
    big: ${JSON.stringify(npmDownloads)},
    sml: "npm downloads / week",
    sub: "across @w3-kit/*",
  },
  {
    big: ${JSON.stringify(componentCount)},
    sml: "components shipped",
    sub: "typed, themed, ready",
  },
  {
    big: ${JSON.stringify(chainCount)},
    sml: "chains supported",
    sub: "EVM + Solana",
  },
];
`;

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, content);
  console.log(`  Wrote ${path.relative(path.resolve(import.meta.dirname, ".."), OUT_FILE)}`);
  console.log("Done!");
}

main().catch((err) => {
  console.error("generate-stats failed:", err);
  process.exit(0); // never fail the build over a stats fetch
});
