import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../../shared/ui/button";
import { cn } from "../../shared/lib/utils";
import { getSectionUrl, getLandingUrl } from "../../shared/lib/urls";
import type { Section } from "../../shared/lib/theme";

interface SiteHeaderProps {
  currentSection?: Section;
  /** Transparent header that floats over content (for hero sections) */
  variant?: "default" | "transparent";
}

const navLinks = [
  { label: "UI", section: "ui" as const },
  { label: "Docs", section: "docs" as const },
  { label: "Registry", section: "registry" as const },
  { label: "Learn", section: "learn" as const },
];

export function SiteHeader({ currentSection, variant = "default" }: SiteHeaderProps) {
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
        {/* Logo */}
        <a href={getLandingUrl()} className="flex items-center">
          <img src="/logo.png" alt="w3-kit" className="h-7 w-7 rounded-md" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {currentSection && currentSection !== "landing" && (
            <a
              href={getLandingUrl()}
              className="rounded-md px-3 py-1.5 text-sm transition-colors"
              style={{ color: "var(--w3-gray-600)" }}
            >
              Home
            </a>
          )}
          {navLinks.map((link) => (
            <a
              key={link.section}
              href={getSectionUrl(link.section)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                currentSection === link.section
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </a>
          ))}
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
            {currentSection && currentSection !== "landing" && (
              <a
                href={getLandingUrl()}
                className="rounded-lg px-4 py-3 text-base transition-colors"
                style={{ color: "var(--w3-gray-600)" }}
              >
                Home
              </a>
            )}
            {navLinks.map((link) => (
              <a
                key={link.section}
                href={getSectionUrl(link.section)}
                className={cn(
                  "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                  currentSection === link.section ? "text-foreground" : "text-muted-foreground",
                )}
                style={
                  currentSection === link.section
                    ? { background: "var(--w3-surface-elevated)" }
                    : undefined
                }
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
