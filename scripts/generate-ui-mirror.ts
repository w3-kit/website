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

const ROOT = path.resolve(import.meta.dirname, "../..");
const SRC_DIR = path.join(ROOT, "ui/registry/w3-kit");
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

function copyDir(slug: string) {
  const src = path.join(SRC_DIR, slug);
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
  // the ui registry isn't checked out (e.g., Vercel without submodules).
  // Consumers handle missing components by checking `DEMOS[slug]`.
  if (fs.existsSync(OUT_DIR)) {
    fs.rmSync(OUT_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  writeLocalUtils();

  if (!fs.existsSync(SRC_DIR)) {
    console.warn(`  ui registry not found at ${SRC_DIR} — writing empty mirror`);
    fs.writeFileSync(INDEX_FILE, BANNER + "export {};\n");
    return;
  }

  const slugs = fs
    .readdirSync(SRC_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();

  for (const slug of slugs) copyDir(slug);

  writeIndex(slugs);

  console.log(`  Mirrored ${slugs.length} components to ${path.relative(ROOT, OUT_DIR)}`);
  console.log("Done!");
}

main();
