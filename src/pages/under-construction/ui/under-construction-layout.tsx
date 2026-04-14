import type { ReactNode } from "react";
import type { Section } from "../../../shared/lib/theme";
import { getLandingUrl } from "../../../shared/lib/urls";
import { Logo } from "../../../shared/ui/logo";
import { ThemeToggle } from "../../../widgets/site-footer/theme-toggle";

interface UnderConstructionLayoutProps {
  section: Section;
  title: string;
  description: string;
  animation?: ReactNode;
}

const SECTION_META: Record<string, { tagline: string; color: string }> = {
  ui: { tagline: "Production-ready web3 React components", color: "#5554d9" },
  docs: { tagline: "Guides, recipes, and API reference", color: "#5554d9" },
  registry: { tagline: "Chain & token data registry", color: "#5554d9" },
  learn: { tagline: "Interactive web3 courses", color: "#5554d9" },
};

export function UnderConstructionLayout({
  section,
  title,
  description,
  animation,
}: UnderConstructionLayoutProps) {
  const meta = SECTION_META[section] ?? { tagline: "", color: "#5554d9" };

  return (
    <div
      className="flex min-h-screen flex-col overflow-x-hidden"
      style={{ background: "var(--w3-gray-100)" }}
    >
      {/* Standalone header for this subdomain */}
      <header
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "1px solid var(--w3-border-subtle)" }}
      >
        <div className="flex items-center gap-3">
          <a href={getLandingUrl()} className="flex items-center gap-2">
            <Logo size={22} className="text-[var(--w3-accent)]" />
          </a>
          <span className="text-xs" style={{ color: "var(--w3-gray-400)" }}>
            /
          </span>
          <span className="text-sm font-semibold" style={{ color: "var(--w3-gray-900)" }}>
            {title}
          </span>
        </div>
        <ThemeToggle />
      </header>

      {/* Main content */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        {/* Gradient bg */}
        <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
          <div
            className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px]"
            style={{ background: "var(--w3-glow-accent)", opacity: 0.3 }}
          />
        </div>

        <div className="flex max-w-md flex-col items-center gap-6">
          {/* Icon */}
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{ background: "var(--w3-accent-subtle)" }}
          >
            <Logo size={32} className="text-[var(--w3-accent)]" />
          </div>

          {/* Title */}
          <div className="flex flex-col gap-2">
            <h1
              className="text-3xl font-semibold tracking-tight sm:text-4xl"
              style={{ color: "var(--w3-gray-900)", letterSpacing: "-0.02em" }}
            >
              {title}
            </h1>
            <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
              {meta.tagline}
            </p>
          </div>

          {/* Under construction badge */}
          <div
            className="flex items-center gap-2 rounded-full px-4 py-2"
            style={{
              background: "var(--w3-glass-bg)",
              border: "1px solid var(--w3-glass-border)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ background: "var(--w3-accent)" }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ background: "var(--w3-accent)" }}
              />
            </span>
            <span className="text-sm font-medium" style={{ color: "var(--w3-gray-700)" }}>
              Under Construction
            </span>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed" style={{ color: "var(--w3-gray-500)" }}>
            {description}
          </p>

          {/* Animation slot */}
          {animation && (
            <div
              className="mt-4 flex h-48 w-full items-center justify-center overflow-hidden rounded-xl"
              style={{
                background: "var(--w3-glass-bg)",
                border: "1px solid var(--w3-glass-border)",
              }}
            >
              {animation}
            </div>
          )}

          {/* Back to home */}
          <a
            href={getLandingUrl()}
            className="mt-4 text-sm font-medium transition-colors"
            style={{ color: "var(--w3-accent)" }}
          >
            ← Back to w3-kit.com
          </a>
        </div>
      </main>

      {/* Standalone footer */}
      <footer
        className="flex items-center justify-between px-6 py-4"
        style={{ borderTop: "1px solid var(--w3-border-subtle)" }}
      >
        <span className="text-xs" style={{ color: "var(--w3-gray-500)" }}>
          &copy; {new Date().getFullYear()} w3-kit
        </span>
        <a
          href="https://github.com/w3-kit"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs transition-colors"
          style={{ color: "var(--w3-gray-500)" }}
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}
