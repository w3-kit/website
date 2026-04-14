/**
 * Subtle top gradient overlay for the hero section.
 * Main gradient orbs are handled by the global background layer in landing-page.tsx.
 */
export function HeroVisual() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0" style={{ background: "var(--w3-hero-gradient)" }} />
    </div>
  );
}
