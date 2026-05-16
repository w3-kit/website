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

const REPO_ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(REPO_ROOT, "src/shared/ui/w3-kit");
const INDEX_FILE = path.join(OUT_DIR, "index.gen.ts");

const BANNER =
  "/* AUTO-GENERATED — mirrored from ui/registry/w3-kit/. Edit the source there. */\n";

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

function copyTree(srcDir: string, dstDir: string) {
  fs.mkdirSync(dstDir, { recursive: true });

  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const src = path.join(srcDir, entry.name);
    const dst = path.join(dstDir, entry.name);

    if (entry.isDirectory()) {
      copyTree(src, dst);
      continue;
    }

    if (!entry.isFile()) continue;

    if (/\.(ts|tsx)$/.test(entry.name)) {
      const content = fs.readFileSync(src, "utf-8");
      fs.writeFileSync(dst, BANNER + transform(content));
      continue;
    }

    fs.copyFileSync(src, dst);
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
    if (/export\s+default\s+/.test(content) && !new RegExp(`export\\s+(function|const)\\s+${exportName}`).test(content)) {
      lines.push(`export { default as ${slugToPascal(slug)} } from "./${slug}/${slug}";`);
    } else {
      lines.push(`export { ${exportName} } from "./${slug}/${slug}";`);
    }
  }
  fs.writeFileSync(INDEX_FILE, lines.join("\n") + "\n");
}

function main() {
  console.log("Mirroring ui components into website...");
  const srcDir = findExistingDirectory([
    "ui/registry/w3-kit",
    "w3-kit-ui/mirror/registry/w3-kit",
  ]);
  if (!srcDir) {
    if (fs.existsSync(INDEX_FILE)) {
      console.warn("  ui registry not found, reusing committed mirror output");
      return;
    }
    console.error("  ui registry not found and no committed mirror output exists");
    return;
  }

  // Clean target dir (but keep lib/ which we recreate anyway)
  if (fs.existsSync(OUT_DIR)) {
    fs.rmSync(OUT_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });

  writeLocalUtils();

  const slugs = fs
    .readdirSync(srcDir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();

  for (const slug of slugs) {
    copyTree(path.join(srcDir, slug), path.join(OUT_DIR, slug));
  }

  writeIndex(slugs);

  console.log(`  Mirrored ${slugs.length} components to ${path.relative(REPO_ROOT, OUT_DIR)}`);
  console.log("Done!");
}

main();
