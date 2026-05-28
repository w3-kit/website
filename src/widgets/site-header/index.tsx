import { useState } from "react";
import { getLandingUrl } from "../../shared/lib/urls";
import { Brand } from "../../shared/ui/header-bits/brand";
import { SectionNavLinks } from "../../shared/ui/header-bits/section-nav-links";
import { MobileMenuTrigger } from "../../shared/ui/header-bits/mobile-menu-trigger";
import { MobileMenuOverlay } from "../../shared/ui/header-bits/mobile-menu-overlay";
import { AppHeader } from "../app-header";
import type { Section } from "../../shared/lib/theme";

interface SiteHeaderProps {
  currentSection?: Section;
  /** Transparent header that floats over content (for hero sections) */
  variant?: "default" | "transparent";
}

export function SiteHeader({ currentSection, variant = "default" }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const showHome = currentSection && currentSection !== "landing";

  const mobile = (
    <MobileMenuOverlay open={mobileOpen} onAutoClose={() => setMobileOpen(false)}>
      <nav className="flex flex-col gap-1 px-6 py-4">
        {showHome && (
          <a
            href={getLandingUrl()}
            onClick={() => setMobileOpen(false)}
            className="rounded-lg px-4 py-3 text-base transition-colors"
            style={{ color: "var(--w3-gray-600)" }}
          >
            Home
          </a>
        )}
        <SectionNavLinks
          currentSection={currentSection}
          variant="block"
          onLinkClick={() => setMobileOpen(false)}
        />
      </nav>
    </MobileMenuOverlay>
  );

  return (
    <AppHeader variant={variant} mobileContent={mobile}>
      <Brand />

      <nav className="hidden items-center gap-1 md:flex">
        {showHome && (
          <a
            href={getLandingUrl()}
            className="rounded-md px-3 py-1.5 text-sm transition-colors"
            style={{ color: "var(--w3-gray-600)" }}
          >
            Home
          </a>
        )}
        <SectionNavLinks currentSection={currentSection} />
      </nav>

      <MobileMenuTrigger open={mobileOpen} onToggle={() => setMobileOpen(!mobileOpen)} />
    </AppHeader>
  );
}
