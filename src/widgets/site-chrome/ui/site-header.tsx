import { useCallback, useState } from "react";
import { Logo } from "../../../shared/ui/logo";
import { MobileOverlay } from "./mobile-overlay";
import type { Section } from "../../../shared/lib/urls";
import { ECOSYSTEM_MENU, SITE_NAV, isMenu, type Menu, type SiteNav } from "../model/site-nav";
import { DesktopNav } from "./desktop-nav";
import { HeaderActions } from "./header-actions";
import { EcosystemPanel, MenuPanel, PanelFrame } from "./mega-panels";
import { MenuTrigger } from "./menu-trigger";
import { MobileMenu } from "./mobile-menu";
import { useMegaMenu } from "./use-mega-menu";

interface SiteHeaderProps {
  currentSection: Section;
  /** Sites with their own search (docs, registry) pass its opener. */
  onSearch?: () => void;
}

export function SiteHeader({ currentSection, onSearch }: SiteHeaderProps) {
  const site = SITE_NAV[currentSection];
  const menu = useMegaMenu();
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const activeMenu = site.items.find(
    (item): item is Menu => isMenu(item) && item.label === menu.openMenu,
  );

  return (
    <header
      ref={menu.headerRef}
      className="sticky top-0 z-50 bg-w3-ground"
      onMouseLeave={menu.closeOnLeave}
    >
      <div className="relative z-50 flex h-[72px] items-center justify-between gap-6 bg-w3-ground px-4 md:px-10">
        <div className="flex items-center gap-2">
          <SiteBrand site={site} showName={currentSection !== "landing"} />
          <MenuTrigger
            label={ECOSYSTEM_MENU}
            menu={menu}
            className="ml-4 hidden bg-w3-tone lg:inline-flex"
          />
        </div>
        <DesktopNav site={site} menu={menu} />
        <HeaderActions
          onSearch={onSearch}
          mobileOpen={mobileOpen}
          onToggleMobile={() => setMobileOpen(!mobileOpen)}
        />
      </div>

      {(activeMenu || menu.openMenu === ECOSYSTEM_MENU) && (
        <PanelFrame onMouseEnter={menu.keepOpen}>
          {activeMenu ? (
            <MenuPanel menu={activeMenu} />
          ) : (
            <EcosystemPanel currentSection={currentSection} />
          )}
        </PanelFrame>
      )}

      <MobileOverlay open={mobileOpen} onClose={closeMobile}>
        <MobileMenu currentSection={currentSection} onNavigate={closeMobile} />
      </MobileOverlay>
    </header>
  );
}

function SiteBrand({ site, showName }: { site: SiteNav; showName: boolean }) {
  return (
    <a href={site.home} className="flex items-center gap-2 text-w3-ink">
      <Logo size={24} className="text-w3-accent" />
      <span className="text-[17px] font-semibold tracking-[-0.02em]">w3-kit</span>
      {showName && (
        <span className="text-[17px] font-medium tracking-[-0.02em] text-w3-ink-soft">
          {site.name}
        </span>
      )}
    </a>
  );
}
