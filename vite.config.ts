import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Resolve @learn to the sibling repo when present (local dev / monorepo
// checkout), otherwise to the auto-clone written by
// scripts/generate-learn-registry.ts (Vercel CI without the sibling).
const SIBLING_LEARN = path.resolve(__dirname, "../learn");
const CLONE_LEARN = path.resolve(__dirname, ".tmp-learn-mirror");
const LEARN_DIR = fs.existsSync(SIBLING_LEARN) ? SIBLING_LEARN : CLONE_LEARN;

export default defineConfig({
  server: {
    port: 3000,
    fs: {
      allow: ["..", LEARN_DIR],
    },
  },
  resolve: {
    tsconfigPaths: true,
    alias: {
      "@learn": LEARN_DIR,
    },
  },
  plugins: [tanstackStart(), nitro(), viteReact(), tailwindcss()],
});
