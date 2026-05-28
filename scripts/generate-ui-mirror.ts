/**
 * Mirror w3-kit components from the ui repo into the website source tree.
 *
 * Source: ../ui/registry/w3-kit/<name>/
 * Target: src/shared/ui/w3-kit/<name>/
 *
 * Per file we:
 *   - strip the "use client" directive (Vite tolerates it, just noisy)
 *   - rewrite "@/lib/utils" → "../lib/utils" so the local cn() helper resolves
 *
 * Also writes src/shared/ui/w3-kit/index.gen.ts re-exporting the named
 * components so the catalog can import them by slug.
 *
 * Run: npx tsx scripts/generate-ui-mirror.ts
 * Wired into: "predev" / "prebuild" via "generate"
 */

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "../..");
const SIBLING_SRC = path.join(ROOT, "ui/registry/w3-kit");
const CLONE_DIR = path.resolve(import.meta.dirname, "../.tmp-ui-mirror");
const CLONE_SRC = path.join(CLONE_DIR, "registry/w3-kit");
const UI_REPO_URL = "https://github.com/w3-kit/ui.git";
const OUT_DIR = path.resolve(import.meta.dirname, "../src/shared/ui/w3-kit");
const INDEX_FILE = path.join(OUT_DIR, "index.gen.ts");

const BANNER = "/* AUTO-GENERATED — mirrored from ui/registry/w3-kit/. Edit the source there. */\n";

function slugToPascal(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}

/**
 * Find the named export the component file actually exposes. Components in the
 * ui repo use mixed casing for acronyms (NFTCard, ENSResolver, DeFiPositionManager)
 * so we can't just PascalCase the slug.
 */
function findExportedName(fileContent: string, slug: string): string | null {
  const candidates = [
    new RegExp(`export\\s+function\\s+([A-Z][A-Za-z0-9]*)\\s*\\(`),
    new RegExp(`export\\s+const\\s+([A-Z][A-Za-z0-9]*)\\s*[:=]`),
    new RegExp(`export\\s*\\{\\s*([A-Z][A-Za-z0-9]*)`),
  ];
  for (const re of candidates) {
    const m = re.exec(fileContent);
    if (m) return m[1];
  }
  // Default export fallback
  if (/export\s+default\s+/.test(fileContent)) return slugToPascal(slug);
  return null;
}

function transform(source: string): string {
  let out = source;
  // Strip "use client" directive lines
  out = out.replace(/^\s*["']use client["'];?\s*\n/m, "");
  // Rewrite the lib/utils alias to the local one we ship alongside
  out = out.replace(/from\s+["']@\/lib\/utils["']/g, 'from "../lib/utils"');
  return out;
}

function copyDir(srcRoot: string, slug: string) {
  const src = path.join(srcRoot, slug);
  const dst = path.join(OUT_DIR, slug);
  if (!fs.existsSync(src) || !fs.statSync(src).isDirectory()) return;
  fs.mkdirSync(dst, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (!entry.isFile()) continue;
    if (!/\.(ts|tsx)$/.test(entry.name)) continue;
    const content = fs.readFileSync(path.join(src, entry.name), "utf-8");
    const transformed = BANNER + transform(content);
    fs.writeFileSync(path.join(dst, entry.name), transformed);
  }
}

/**
 * Returns the directory that holds ../ui/registry/w3-kit/<slug>/ subfolders,
 * either from the sibling repo (local dev) or by shallow-cloning the public
 * ui repo into .tmp-ui-mirror/ (CI without the sibling, e.g., Vercel).
 * Returns null if neither is available.
 */
function resolveSource(): string | null {
  if (fs.existsSync(SIBLING_SRC)) return SIBLING_SRC;

  // Reuse existing clone if present (faster repeat builds).
  if (fs.existsSync(CLONE_SRC)) return CLONE_SRC;

  try {
    console.log(`  ui sibling not found, cloning ${UI_REPO_URL} into .tmp-ui-mirror/`);
    if (fs.existsSync(CLONE_DIR)) fs.rmSync(CLONE_DIR, { recursive: true, force: true });
    execSync(`git clone --depth 1 --quiet ${UI_REPO_URL} "${CLONE_DIR}"`, {
      stdio: ["ignore", "ignore", "inherit"],
    });
    return fs.existsSync(CLONE_SRC) ? CLONE_SRC : null;
  } catch (err) {
    console.warn(`  failed to clone ui repo: ${(err as Error).message}`);
    return null;
  }
}

function writeLocalUtils() {
  const libDir = path.join(OUT_DIR, "lib");
  fs.mkdirSync(libDir, { recursive: true });
  fs.writeFileSync(
    path.join(libDir, "utils.ts"),
    BANNER +
      `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`,
  );
}

function writeIndex(slugs: string[]) {
  const lines: string[] = [BANNER];
  for (const slug of slugs) {
    const file = path.join(OUT_DIR, slug, `${slug}.tsx`);
    if (!fs.existsSync(file)) continue;
    const content = fs.readFileSync(file, "utf-8");
    const exportName = findExportedName(content, slug);
    if (!exportName) continue;
    if (
      /export\s+default\s+/.test(content) &&
      !new RegExp(`export\\s+(function|const)\\s+${exportName}`).test(content)
    ) {
      lines.push(`export { default as ${slugToPascal(slug)} } from "./${slug}/${slug}";`);
    } else {
      lines.push(`export { ${exportName} } from "./${slug}/${slug}";`);
    }
  }
  fs.writeFileSync(INDEX_FILE, lines.join("\n") + "\n");
}

function main() {
  console.log("Mirroring ui components into website...");

  // Always (re-)create OUT_DIR with a valid index.gen.ts and lib/utils.ts so
  // imports from src/shared/ui/w3-kit-demos.tsx always resolve, even when
  // the ui registry isn't reachable. Consumers null-check `DEMOS[slug]`.
  if (fs.existsSync(OUT_DIR)) {
    fs.rmSync(OUT_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  writeLocalUtils();

  const srcDir = resolveSource();
  if (!srcDir) {
    console.warn(`  ui registry unavailable — writing empty mirror`);
    fs.writeFileSync(INDEX_FILE, BANNER + "export {};\n");
    return;
  }

  const slugs = fs
    .readdirSync(srcDir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();

  for (const slug of slugs) copyDir(srcDir, slug);

  writeIndex(slugs);

  console.log(`  Mirrored ${slugs.length} components from ${srcDir}`);
  console.log("Done!");
}

main();
