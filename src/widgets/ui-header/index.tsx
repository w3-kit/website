import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../../shared/ui/button";
import { Logo } from "../../shared/ui/logo";
import { GitHubIcon } from "../../shared/ui/github-icon";
import { cn } from "../../shared/lib/utils";
import { getSectionUrl, getLandingUrl } from "../../shared/lib/urls";
import { ThemeToggle } from "../site-footer/theme-toggle";

interface UiHeaderProps {
  /** Transparent header that floats over content (for hero sections) */
  variant?: "default" | "transparent";
}

const navLinks = [
  { label: "Components", href: () => getSectionUrl("ui") },
  { label: "Docs", href: () => getSectionUrl("docs") },
];

export function UiHeader({ variant = "default" }: UiHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isTransparent = variant === "transparent";

  useEffect(() => {
    if (!isTransparent) return;

    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll(); // check initial position
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isTransparent]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const showBackground = !isTransparent || scrolled;

  return (
    <>
      <header
        className={cn(
          "z-50 flex items-center justify-between px-6 py-4 transition-all duration-300",
          isTransparent ? "fixed inset-x-0 top-0" : "sticky top-0",
          showBackground && "border-b backdrop-blur-xl",
        )}
        style={{
          borderColor: showBackground ? "var(--w3-border-subtle)" : "transparent",
          background: showBackground
            ? "color-mix(in srgb, var(--w3-gray-100) 80%, transparent)"
            : "transparent",
        }}
      >
        {/* Breadcrumb: w3-kit / UI */}
        <div className="flex items-center gap-2">
          <a href={getLandingUrl()} className="flex items-center gap-2">
            <Logo size={24} className="text-[var(--w3-accent)]" />
            <span className="text-sm font-semibold" style={{ color: "var(--w3-gray-900)" }}>
              w3-kit
            </span>
          </a>
          <span
            className="text-sm select-none"
            style={{ color: "var(--w3-gray-400)" }}
            aria-hidden="true"
          >
            /
          </span>
          <a
            href={getSectionUrl("ui")}
            className="text-sm font-medium transition-colors hover:text-foreground"
            style={{ color: "var(--w3-gray-600)" }}
          >
            UI
          </a>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href()}
              className="rounded-md px-3 py-1.5 text-sm font-medium transition-colors text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://github.com/w3-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors text-muted-foreground hover:text-foreground"
          >
            <GitHubIcon size={16} />
            GitHub
          </a>
          <div className="ml-2 border-l pl-2" style={{ borderColor: "var(--w3-border-subtle)" }}>
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile hamburger */}
        <Button
          variant="ghost"
          size="icon-sm"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </Button>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col pt-16 backdrop-blur-xl md:hidden"
          style={{
            background: "color-mix(in srgb, var(--w3-gray-100) 95%, transparent)",
          }}
        >
          <nav className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href()}
                className="rounded-lg px-4 py-3 text-base font-medium transition-colors text-muted-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://github.com/w3-kit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-3 text-base font-medium transition-colors text-muted-foreground"
            >
              <GitHubIcon size={16} />
              GitHub
            </a>
          </nav>
          <div className="px-6 py-4" style={{ borderTop: "1px solid var(--w3-border-subtle)" }}>
            <ThemeToggle />
          </div>
        </div>
      )}
    </>
  );
}
