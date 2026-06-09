/**
 * Generates public/sitemap.xml at build time.
 *
 * Includes the apex, each subdomain root, and dynamic detail pages
 * derived from the generated registries (chains/tokens/programs).
 *
 * Run: npx tsx scripts/generate-sitemap.ts
 * Wired into: "generate" npm script
 */

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const WEBSITE_ROOT = path.resolve(import.meta.dirname, "..");

const PROD_DOMAIN = "w3-kit.com";

function apexUrl(p: string): string {
  return `https://${PROD_DOMAIN}${p}`;
}

function subUrl(sub: string, p: string): string {
  const segment = p.startsWith("/") ? p : `/${p}`;
  return `https://${sub}.${PROD_DOMAIN}${segment}`;
}

type Chain = { chainId: number };
type Token = { symbol: string };
type Program = { key: string };

async function loadRegistries(): Promise<{
  chains: Chain[];
  tokens: Token[];
  programs: Program[];
}> {
  const chainsPath = path.join(WEBSITE_ROOT, "src/entities/chain/model/chains.gen.ts");
  const tokensPath = path.join(WEBSITE_ROOT, "src/entities/token/model/tokens.gen.ts");
  const programsPath = path.join(WEBSITE_ROOT, "src/entities/program/model/programs.gen.ts");

  const empty = { chains: [], tokens: [], programs: [] };
  if (
    !fs.existsSync(chainsPath) ||
    !fs.existsSync(tokensPath) ||
    !fs.existsSync(programsPath)
  ) {
    console.log(
      "  registry gen files missing; sitemap will skip dynamic registry entries (run npm run generate first)",
    );
    return empty;
  }

  const chainsMod = (await import(pathToFileURL(chainsPath).href)) as { CHAINS: Chain[] };
  const tokensMod = (await import(pathToFileURL(tokensPath).href)) as { TOKENS: Token[] };
  const programsMod = (await import(pathToFileURL(programsPath).href)) as {
    PROGRAMS: Program[];
  };

  return {
    chains: chainsMod.CHAINS,
    tokens: tokensMod.TOKENS,
    programs: programsMod.PROGRAMS,
  };
}

async function main() {
  const { chains, tokens, programs } = await loadRegistries();

  const urls: string[] = [];

  urls.push(apexUrl("/"));
  urls.push(apexUrl("/compare"));

  urls.push(subUrl("registry", "/"));
  urls.push(subUrl("registry", "/chains"));
  urls.push(subUrl("registry", "/tokens"));
  urls.push(subUrl("registry", "/programs"));
  urls.push(subUrl("registry", "/api"));
  urls.push(subUrl("docs", "/"));
  urls.push(subUrl("ui", "/"));
  urls.push(subUrl("learn", "/"));
  urls.push(subUrl("design", "/"));

  for (const c of chains) urls.push(subUrl("registry", `/chains/${c.chainId}`));
  for (const t of tokens) urls.push(subUrl("registry", `/tokens/${t.symbol}`));
  for (const p of programs) urls.push(subUrl("registry", `/programs/${p.key}`));

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap-0.9">\n` +
    urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n") +
    `\n</urlset>\n`;

  const out = path.join(WEBSITE_ROOT, "public/sitemap.xml");
  fs.writeFileSync(out, xml);
  console.log(`  wrote public/sitemap.xml (${urls.length} URLs)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
