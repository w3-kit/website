import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, ChevronDown, Search } from "lucide-react";
import { Logo } from "../../shared/ui/logo";
import { GitHubIcon } from "../../shared/ui/github-icon";
import { MobileMenuTrigger } from "../../shared/ui/header-bits/mobile-menu-trigger";
import { MobileMenuOverlay } from "../../shared/ui/header-bits/mobile-menu-overlay";
import { getSectionUrl } from "../../shared/lib/urls";
import { cn } from "../../shared/lib/utils";
import type { Section } from "../../shared/lib/theme";
import { ECOSYSTEM, SITE_NAV, isMenu, type Menu } from "./menus";

const HOVER_OPEN_MS = 80;
const HOVER_CLOSE_MS = 160;
const ECOSYSTEM_MENU = "Ecosystem";
const GET_STARTED_HREF = `${getSectionUrl("docs")}/installation`;

interface SiteHeaderProps {
  currentSection: Section;
  /** Sites with their own search (docs, registry) pass its opener. */
  onSearch?: () => void;
}

export function SiteHeader({ currentSection, onSearch }: SiteHeaderProps) {
  const site = SITE_NAV[currentSection];
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const openAfter = (label: string | null, ms: number) => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpenMenu(label), ms);
  };

  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenMenu(null);
      headerRef.current?.querySelector<HTMLButtonElement>(`[data-menu="${openMenu}"]`)?.focus();
    };
    const onClick = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [openMenu]);

  const trigger = (label: string) => ({
    "data-menu": label,
    "aria-expanded": openMenu === label,
    "aria-controls": "mega-panel",
    onClick: () => setOpenMenu(openMenu === label ? null : label),
    onMouseEnter: () => openAfter(label, HOVER_OPEN_MS),
  });

  const activeMenu = site.items.find(
    (item): item is Menu => isMenu(item) && item.label === openMenu,
  );
  const keepOpen = () => clearTimeout(hoverTimer.current);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-w3-ground"
      onMouseLeave={() => openAfter(null, HOVER_CLOSE_MS)}
    >
      <div className="relative z-50 flex h-[72px] items-center justify-between gap-6 bg-w3-ground px-4 md:px-10">
        <div className="flex items-center gap-2">
          <a href={site.home} className="flex items-center gap-2 text-w3-ink">
            <Logo size={24} className="text-w3-accent" />
            <span className="text-[17px] font-semibold tracking-[-0.02em]">w3-kit</span>
            {currentSection !== "landing" && (
              <span className="text-[17px] font-medium tracking-[-0.02em] text-w3-ink-soft">
                {site.name}
              </span>
            )}
          </a>
          <button
            type="button"
            {...trigger(ECOSYSTEM_MENU)}
            className={cn(
              "ml-4 hidden h-11 items-center gap-1.5 bg-w3-tone px-3 text-w3-small font-medium transition-colors hover:text-w3-accent lg:inline-flex",
              openMenu === ECOSYSTEM_MENU ? "text-w3-accent" : "text-w3-ink",
            )}
          >
            {ECOSYSTEM_MENU}
            <Chevron open={openMenu === ECOSYSTEM_MENU} />
          </button>
        </div>

        {site.items.length > 0 && (
          <nav
            aria-label={`${site.name} sections`}
            className="hidden h-full items-center gap-1 lg:flex"
          >
            {site.items.map((item) =>
              isMenu(item) ? (
                <button
                  key={item.label}
                  type="button"
                  {...trigger(item.label)}
                  className={cn(
                    "inline-flex h-11 items-center gap-1.5 px-3 text-w3-small font-medium transition-colors hover:text-w3-accent",
                    openMenu === item.label ? "text-w3-accent" : "text-w3-ink",
                  )}
                >
                  {item.label}
                  <Chevron open={openMenu === item.label} />
                </button>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onMouseEnter={() => openAfter(null, HOVER_OPEN_MS)}
                  className="inline-flex h-11 items-center px-3 text-w3-small font-medium text-w3-ink transition-colors hover:text-w3-accent"
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>
        )}

        <div className="flex items-center gap-2">
          {onSearch && (
            <button
              type="button"
              onClick={onSearch}
              className="hidden h-11 items-center gap-3 bg-w3-tone px-4 text-w3-small text-w3-ink-soft transition-colors hover:text-w3-ink md:inline-flex"
            >
              <Search size={16} aria-hidden />
              Search
              <kbd className="font-sans text-[13px]">⌘K</kbd>
            </button>
          )}
          <a
            href="https://github.com/w3-kit"
            aria-label="w3-kit on GitHub"
            className="hidden h-11 w-11 items-center justify-center text-w3-ink transition-colors hover:text-w3-accent md:inline-flex"
          >
            <GitHubIcon size={20} />
          </a>
          <a
            href={GET_STARTED_HREF}
            className="w3-press hidden h-11 items-center bg-w3-accent px-5 text-w3-small font-medium text-w3-on-accent hover:bg-w3-accent-hover sm:inline-flex"
          >
            Get started
          </a>
          <MobileMenuTrigger open={mobileOpen} onToggle={() => setMobileOpen(!mobileOpen)} />
        </div>
      </div>

      {openMenu === ECOSYSTEM_MENU && (
        <PanelFrame onMouseEnter={keepOpen}>
          <EcosystemPanel currentSection={currentSection} />
        </PanelFrame>
      )}
      {activeMenu && (
        <PanelFrame onMouseEnter={keepOpen}>
          <MenuPanel menu={activeMenu} />
        </PanelFrame>
      )}

      <MobileMenuOverlay
        open={mobileOpen}
        onAutoClose={() => setMobileOpen(false)}
        topClass="pt-[72px]"
        lockScroll
      >
        <MobileMenu currentSection={currentSection} onNavigate={() => setMobileOpen(false)} />
      </MobileMenuOverlay>
    </header>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <ChevronDown
      size={14}
      aria-hidden
      className={cn("transition-transform duration-200", open && "rotate-180")}
    />
  );
}

function PanelFrame({ onMouseEnter, children }: { onMouseEnter: () => void; children: ReactNode }) {
  return (
    <div
      id="mega-panel"
      onMouseEnter={onMouseEnter}
      className="w3-drop absolute inset-x-0 top-full hidden max-h-[calc(100svh-72px)] overflow-y-auto bg-w3-tone shadow-[0_24px_48px_-24px_rgba(0,0,0,0.25)] lg:block"
    >
      <div className="grid grid-cols-12 gap-x-6 px-10 pb-14 pt-10">{children}</div>
    </div>
  );
}

function EcosystemPanel({ currentSection }: { currentSection: Section }) {
  return (
    <>
      <p className="col-span-3 text-[24px] font-medium leading-[1.2] tracking-[-0.02em] text-w3-ink">
        One toolkit, four sites.
      </p>
      <ul className="col-span-9 col-start-4 grid grid-cols-4 gap-2 pl-10">
        {ECOSYSTEM.map((site) => {
          const isCurrent = site.section === currentSection;
          return (
            <li key={site.section}>
              <a
                href={site.href}
                aria-current={isCurrent ? "page" : undefined}
                className={cn(
                  "group flex h-full flex-col gap-10 p-5 transition-colors",
                  isCurrent
                    ? "bg-w3-accent text-w3-on-accent"
                    : "bg-w3-ground text-w3-ink hover:bg-w3-tone-2",
                )}
              >
                <span className="flex items-center justify-between text-[24px] font-medium tracking-[-0.02em]">
                  {site.label}
                  <ArrowRight
                    size={18}
                    aria-hidden
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
                <span className={cn("text-w3-small", !isCurrent && "text-w3-ink-soft")}>
                  {isCurrent ? "You are here" : site.description}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function MenuPanel({ menu }: { menu: Menu }) {
  return (
    <>
      <div className="col-span-3 flex flex-col items-start gap-6">
        <p className="text-[24px] font-medium leading-[1.2] tracking-[-0.02em] text-w3-ink">
          {menu.summary}
        </p>
        <a
          href={menu.href}
          className="group inline-flex items-center gap-2 text-w3-small font-medium text-w3-accent"
        >
          Open {menu.label}
          <ArrowRight
            size={16}
            aria-hidden
            className="transition-transform group-hover:translate-x-1"
          />
        </a>
      </div>
      <div className="col-span-9 col-start-4 grid auto-cols-[minmax(0,1fr)] grid-flow-col gap-x-6 pl-10">
        {menu.groups.map((group, i) => (
          <div key={group.title ?? i}>
            <h2 className="mb-3 h-[22px] text-w3-small font-medium text-w3-ink-soft">
              {group.title}
            </h2>
            <ul className="flex flex-col gap-1.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-w3-small text-w3-ink transition-colors hover:text-w3-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

function MobileMenu({
  currentSection,
  onNavigate,
}: {
  currentSection: Section;
  onNavigate: () => void;
}) {
  const site = SITE_NAV[currentSection];
  return (
    <nav aria-label={`${site.name} sections`} className="flex flex-col px-4 pb-10">
      {site.items.map((item) =>
        isMenu(item) ? (
          <details key={item.label} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-[28px] font-medium tracking-[-0.02em] text-w3-ink">
              {item.label}
              <ChevronDown
                size={22}
                aria-hidden
                className="transition-transform group-open:rotate-180"
              />
            </summary>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 pb-6">
              {item.groups
                .flatMap((g) => g.links)
                .map((link) => (
                  <li key={link.href}>
                    <a href={link.href} onClick={onNavigate} className="text-w3-small text-w3-ink">
                      {link.label}
                    </a>
                  </li>
                ))}
            </ul>
          </details>
        ) : (
          <a
            key={item.label}
            href={item.href}
            onClick={onNavigate}
            className="py-4 text-[28px] font-medium tracking-[-0.02em] text-w3-ink"
          >
            {item.label}
          </a>
        ),
      )}

      <h2 className="mt-8 text-w3-small text-w3-ink-soft">{ECOSYSTEM_MENU}</h2>
      <ul className="mt-3 grid grid-cols-2 gap-2">
        {ECOSYSTEM.map((s) => (
          <li key={s.section}>
            <a
              href={s.href}
              onClick={onNavigate}
              aria-current={s.section === currentSection ? "page" : undefined}
              className={cn(
                "block p-4 text-w3-body font-medium",
                s.section === currentSection
                  ? "bg-w3-accent text-w3-on-accent"
                  : "bg-w3-tone text-w3-ink",
              )}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>

      <a
        href={GET_STARTED_HREF}
        onClick={onNavigate}
        className="mt-6 inline-flex h-12 items-center justify-center bg-w3-accent text-w3-body font-medium text-w3-on-accent"
      >
        Get started
      </a>
    </nav>
  );
}
