---
title: "Changelog: v0.2 — registry site is live"
date: 2026-06-04
kind: changelog
summary: registry.w3-kit.com ships with a full chain, token, and Solana program explorer. Plus recipe previews on landing, SEO basics, and a fix for a five-day production outage.
tags:
  - release
  - registry
---

# v0.2

A big batch.

## Shipped

- **registry.w3-kit.com is live** — interactive browser for the 14 chains, 18 tokens, and 6 Solana programs in `@w3-kit/registry`. Cmd+K search, filters, copy-to-clipboard on every address.
- **Recipe previews on the landing page** — tabbed, syntax-highlighted code snippets so first-time visitors see real code immediately.
- **SEO basics** — per-route meta and OpenGraph, a static OG image, a generated sitemap covering every chain and token detail page, robots.txt, and JSON-LD on the homepage.
- **A `/compare` page** — honest comparison against scaffold-eth, create-web3-dapp, and thirdweb.

## Fixed

- **Production was down for five days** from a Dependabot bump that updated `react-dom` to 19.2.6 but left `react` at 19.2.4. React's runtime version check failed every SSR request. Fixed by pinning both to the same exact version and grouping react updates in Dependabot.

## Next

More recipes. A real OG image (the one shipping right now is just the logo). RSS feed on the blog.
