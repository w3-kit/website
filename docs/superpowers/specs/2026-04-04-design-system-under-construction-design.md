# w3-kit Design System & Under Construction Pages

**Date**: 2026-04-04
**Status**: Approved

## Overview

A Vercel/Geist-inspired design system for w3-kit with monochrome foundations, Solidity purple (#5554D9) as a structural accent color, and GSAP-powered SVG animations. This spec covers two deliverables:

1. **Under-construction pages** for all 4 subdomains with unique abstract structural animations
2. **Design system showcase page** documenting tokens, components, and patterns

## Design Principles

- **Monochrome-first**: Black/white/gray foundation. Color is used structurally, not decoratively.
- **Purple as architecture**: The accent color (#5554D9) appears only on dividers, borders, accent lines, and structural SVG elements — never on buttons or large surfaces.
- **Straight lines and precision**: All visual elements use geometric straight lines. No curves, gradients on surfaces, or organic shapes.
- **Motion with purpose**: GSAP-driven SVG animations that reveal structure. Abstract structural style — lines slide in, grids form, rectangles scale into position.
- **Accessibility**: Light and dark themes, `prefers-reduced-motion` support, keyboard navigation, APCA-aware contrast.

## Design Tokens

### Color System — 10-step Semantic Gray Scale

CSS custom properties with `--w3-` prefix. Values swap between light and dark via `data-theme` attribute on `<html>`.

| Token | Dark Mode | Light Mode | Usage |
|-------|-----------|------------|-------|
| `--w3-gray-100` | `#0a0a0a` | `#fafafa` | Page background |
| `--w3-gray-200` | `#111111` | `#f5f5f5` | Card/surface background |
| `--w3-gray-300` | `#1a1a1a` | `#e5e5e5` | Borders, dividers |
| `--w3-gray-400` | `#222222` | `#d4d4d4` | Subtle borders |
| `--w3-gray-500` | `#333333` | `#a3a3a3` | Disabled text |
| `--w3-gray-600` | `#444444` | `#737373` | Placeholder text |
| `--w3-gray-700` | `#666666` | `#525252` | Secondary text |
| `--w3-gray-800` | `#888888` | `#404040` | Muted text |
| `--w3-gray-900` | `#ededed` | `#171717` | Primary text |
| `--w3-accent` | `#5554D9` | `#5554D9` | Structural accent (same both themes) |
| `--w3-accent-subtle` | `rgba(85,84,217,0.15)` | `rgba(85,84,217,0.1)` | Accent backgrounds |

### Typography

**Fonts**:
- Primary: Geist Sans (via `@fontsource/geist-sans` or self-hosted)
- Monospace: Geist Mono (via `@fontsource/geist-mono` or self-hosted)

**Scale** (6 sizes max):

| Name | Size | Weight | Letter-spacing | Line-height | Usage |
|------|------|--------|----------------|-------------|-------|
| h1 | 48px | 600 | -2% | 110% | Page titles |
| h2 | 32px | 600 | -1.5% | 115% | Section headings |
| h3 | 20px | 500 | -1% | 120% | Sub-headings |
| body | 16px | 400 | 0 | 150% | Body text |
| small | 14px | 400 | 0 | 140% | Secondary text, labels |
| caption | 12px | 400 | 0.5% | 130% | Captions, metadata |

### Spacing

4px base unit. All spacing is a multiple of 4 or 8:

```
4px, 8px, 16px, 24px, 32px, 48px, 64px
```

### Border Radius

- Cards/buttons: 6px
- Small elements (badges, toggles): 4px
- Structural lines: 0 (sharp)

## Under-Construction Pages

### Layout — Asymmetric Split

All 4 subdomain pages share this layout:

```
┌──────────────────────────────────────────────────┐
│  Header: [Logo]               [ui] [docs] [reg]  │
│──────────────────────────────────────────────────│
│                     │                             │
│   Title (h1)        │                             │
│   Description       │     SVG Animation           │
│   ───── (accent)    │     (unique per subdomain)  │
│   Status badge      │                             │
│                     │                             │
│──────────────────────────────────────────────────│
│  Footer:                 [system] [light] [dark]  │
└──────────────────────────────────────────────────┘
```

### Header

- w3-kit logo (left)
- Subdomain navigation links (right): `ui`, `docs`, `registry` (on subdomain pages, `home` link is added pointing to root domain)
- Current page link highlighted with subtle purple left-border accent
- On the landing page, no link is highlighted (it's the root)
- 1px bottom border (`--w3-gray-300`)
- Not sticky — scrolls with page

### Left Panel (Text Content)

- Subdomain title (h1, Geist Sans, 48px)
- One-line description (`--w3-gray-700`)
- Purple accent line divider: `linear-gradient(90deg, #5554D9, transparent)`
- Status badge: "Under Construction" pill with `--w3-gray-200` background, `--w3-gray-700` text
- Vertically centered within the panel

### Right Panel (Animation Canvas)

- Separated from left by 1px vertical border (`--w3-gray-300`)
- Background: `--w3-gray-200` (slightly offset from page bg for depth)
- SVG animation fills this space
- GSAP-driven, unique per subdomain
- Respects `prefers-reduced-motion` — shows static final state

### Footer

- 1px top border (`--w3-gray-300`)
- 3-state theme toggle: system / light / dark
- Toggle uses icon buttons with `--w3-gray-300` borders, active state uses `--w3-accent`

### Responsive Behavior (< 768px)

- Stacks vertically: header → text content → animation (300px fixed height) → footer
- Header links remain as compact row
- Full-width content with horizontal padding

### Unique SVG Animations

All animations share the same motion language: straight lines sliding in from edges, rectangles scaling from center points, purple on select structural elements. GSAP `timeline()`, ~2.5s total duration, `power2.out` easing for lines, `power3.out` for rectangles, 0.05s stagger between elements in the same group. Play once on load, no loop.

**Landing** (`w3-kit.com`):
- Grid assembling from edges — horizontal and vertical lines converge to form a complete grid
- Purple accent on 2-3 lines forming a central cross
- Rectangles scale in at intersections — "building blocks"
- Concept: toolkit, pieces coming together

**UI Explorer** (`ui.w3-kit.com`):
- Lines assemble into component outlines — rectangles of varying sizes arrange into a layout
- Suggests button, card, input shapes as abstract wireframes
- Purple accent on borders of the "active" component outline
- Concept: UI components composing into interfaces

**Docs** (`docs.w3-kit.com`):
- Horizontal lines stagger in from left like text lines on a page
- Vertical line on left acts as sidebar/margin indicator
- Lines vary in width (headings vs body text)
- Purple accent on sidebar line and one "heading" line
- Concept: structured documentation

**Registry** (`registry.w3-kit.com`):
- Lines form a data table grid — evenly spaced horizontals and verticals creating cells
- Small dots appear at intersections (data points)
- Purple accent on header row lines
- Concept: structured data, chain/token registry

### Theme Support

Three-state toggle: **System** (follows `prefers-color-scheme`) / **Light** / **Dark**

- Default: system preference
- Persistence: `localStorage` key `w3-theme` with values `system`, `light`, `dark`
- Implementation: `data-theme` attribute on `<html>` element
- CSS custom properties swap values based on `data-theme`
- SVG animations use the same token variables, so they adapt automatically
- Toggle lives in the footer with three icon buttons (monitor/sun/moon from Geist icons)

## Design System Showcase Page

Route: `/design` on the main domain.

### Sections

**Colors**:
- Full gray scale rendered as swatches in a horizontal strip
- Each swatch shows hex value and token name
- Shown in both dark and light theme side by side
- Accent color + accent-subtle shown separately

**Typography**:
- All 6 type sizes rendered with Geist Sans specimen text
- Geist Mono specimen for code contexts
- Shows weight, letter-spacing, line-height per level

**Spacing**:
- Visual spacing scale — labeled blocks at each increment (4, 8, 16, 24, 32, 48, 64)
- Rendered as horizontal bars with px labels

**Components**:
- Buttons: all states (default, hover, active, disabled) in both themes
- Badges: status variants
- Inputs: default, focus, error, disabled states
- Cards: basic card with header, content, footer
- Theme toggle: the 3-state toggle itself

**Icons**:
- Grid of Geist icons used across the site
- Icon names, sizes shown

**Animation**:
- Embedded replays of all 4 subdomain SVG animations
- GSAP timeline visualization (optional — shows timing)
- `prefers-reduced-motion` behavior documented

## New Dependencies

| Package | Purpose |
|---------|---------|
| `gsap` | Animation engine |
| `@gsap/react` | React hooks for GSAP (`useGSAP`) |
| `geist` | Geist Sans + Geist Mono fonts (Vercel's official package) |

## File Structure (FSD-aligned)

```
website/src/
  shared/
    ui/
      theme-toggle.tsx            — 3-state system/light/dark toggle component
      site-header.tsx             — logo + subdomain nav
      site-footer.tsx             — footer with theme toggle
    lib/
      theme.ts                    — theme detection, persistence, system preference listener
    styles/
      tokens.css                  — CSS custom properties (gray scale, accent, typography, spacing)

  pages/
    under-construction/
      layout.tsx                  — shared asymmetric split layout
      landing-animation.tsx       — GSAP grid-assembling SVG
      ui-animation.tsx            — GSAP component-outlines SVG
      docs-animation.tsx          — GSAP text-lines SVG
      registry-animation.tsx      — GSAP data-table SVG

    design-system/
      index.tsx                   — design system showcase page
      color-section.tsx           — color swatches
      typography-section.tsx      — type specimens
      spacing-section.tsx         — spacing scale visual
      component-section.tsx       — button/badge/input demos
      animation-section.tsx       — GSAP animation demos

  routes/
    _landing/index.tsx            — updated to use new layout + landing animation
    ui/index.tsx                  — updated to use new layout + ui animation
    docs/index.tsx                — updated to use new layout + docs animation
    registry/index.tsx            — updated to use new layout + registry animation
    design/index.tsx              — new route for design system page
```

## Migration Notes

- The existing `shared/ui/under-construction.tsx` (inline CSS-in-JS) is replaced entirely
- Existing `widgets/site-header` and `widgets/site-footer` are updated to use new design tokens
- The existing `features/toggle-theme` directory may be reused or replaced by the new `shared/lib/theme.ts` + `shared/ui/theme-toggle.tsx`
- Current `ui/styles/globals.css` HSL-based tokens in the UI library remain unchanged — the website gets its own `tokens.css` that aligns with the new gray scale
- Icons migrate from `lucide-react` to Geist icons across these pages

## Out of Scope

- Full site implementation (only under-construction pages + design system page)
- Component library migration (existing `/ui` package stays as-is for now)
- SEO changes beyond existing setup
- Subdomain routing changes (existing middleware stays)
