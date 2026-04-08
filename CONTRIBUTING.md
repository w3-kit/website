# Contributing to w3-kit/website

Thanks for your interest in contributing to the w3-kit website!

## How to contribute

1. Fork the repo
2. Create a branch (`git checkout -b my-change`)
3. Install dependencies: `npm install`
4. Start dev server: `npm run dev`
5. Make your changes
6. Commit and push
7. Open a pull request

## Architecture

This is a TanStack Start application using Feature-Sliced Design (FSD).

### Subdomains
- `w3-kit.com` — Landing page
- `ui.w3-kit.com` — UI component explorer
- `docs.w3-kit.com` — Recipes and guides
- `registry.w3-kit.com` — Chain/token explorer

### FSD Layers (import rules — only import downward)
- `app/` + `routes/` — entry point, routing
- `pages/` — route-level compositions
- `widgets/` — composite UI blocks
- `features/` — user interactions
- `entities/` — domain objects with UI
- `shared/` — reusable infrastructure

## Local development

```bash
git clone https://github.com/YOUR_USERNAME/website.git
cd website
npm install --legacy-peer-deps
npm run dev
```

### Run all CI checks locally

```bash
npm run build && npm run typecheck && npm run lint && npm run format:check
```

## What to contribute

- Page implementations for any subdomain
- UI improvements and design
- Accessibility improvements
- Performance optimizations
- Bug fixes

Check [open issues](https://github.com/w3-kit/website/issues) for ideas.
