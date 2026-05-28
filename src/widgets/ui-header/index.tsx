import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../shared/lib/utils";
import { getSectionUrl } from "../../shared/lib/urls";
import { componentRegistry, type ComponentCategory } from "../../entities/component";
import { Brand } from "../../shared/ui/header-bits/brand";
import { GitHubLink } from "../../shared/ui/header-bits/github-link";
import { MobileMenuTrigger } from "../../shared/ui/header-bits/mobile-menu-trigger";
import { MobileMenuOverlay } from "../../shared/ui/header-bits/mobile-menu-overlay";
import { AppHeader } from "../app-header";

interface UiHeaderProps {
  variant?: "default" | "transparent";
}

const categoryLabels: Record<ComponentCategory, string> = {
  wallet: "Wallet",
  defi: "DeFi",
  nft: "NFT",
  data: "Data",
  utility: "Utility",
};

const grouped = (Object.keys(categoryLabels) as ComponentCategory[]).map((cat) => ({
  title: categoryLabels[cat],
  items: componentRegistry
    .filter((c) => c.category === cat)
    .map((c) => ({ name: c.name, id: c.id })),
}));

export function UiHeader({ variant = "default" }: UiHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Click outside → close mega menu
  useEffect(() => {
    if (!megaOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        megaRef.current &&
        !megaRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [megaOpen]);

  const closeMega = useCallback(() => setMegaOpen(false), []);

  const mobile = (
    <MobileMenuOverlay open={mobileOpen} onAutoClose={() => setMobileOpen(false)}>
      <nav className="flex flex-col gap-1 px-6 py-4">
        {grouped.map((group) => (
          <div key={group.title} className="mb-2">
            <span
              className="px-4 text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--w3-gray-500)" }}
            >
              {group.title}
            </span>
            {group.items.map((item) => (
              <a
                key={item.id}
                href={`${getSectionUrl("ui")}/${item.id}`}
                className="block rounded-lg px-4 py-2 text-sm transition-colors text-muted-foreground"
              >
                {item.name}
              </a>
            ))}
          </div>
        ))}

        <div className="mt-2 border-t pt-3" style={{ borderColor: "var(--w3-border-subtle)" }}>
          <a
            href={getSectionUrl("docs")}
            className="block rounded-lg px-4 py-3 text-base font-medium transition-colors text-muted-foreground"
          >
            Docs
          </a>
          <GitHubLink
            href="https://github.com/w3-kit/ui"
            starsRepo="w3-kit/ui"
            showLabel
            className="px-4 py-3 text-base font-medium"
          />
        </div>
      </nav>
    </MobileMenuOverlay>
  );

  return (
    <AppHeader variant={variant} mobileContent={mobile}>
      {/* Breadcrumb: w3-kit / UI */}
      <div className="flex items-center gap-2">
        <Brand />
        <span
          className="select-none text-sm"
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
        {/* Components mega menu trigger */}
        <div className="relative">
          <button
            ref={triggerRef}
            onClick={() => setMegaOpen(!megaOpen)}
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              megaOpen ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            Components
            <ChevronDown
              size={14}
              className={cn("transition-transform duration-200", megaOpen && "rotate-180")}
            />
          </button>

          {/* Mega menu dropdown */}
          {megaOpen && (
            <div
              ref={megaRef}
              className="absolute right-0 top-full mt-2 w-[540px] rounded-xl p-4 shadow-xl backdrop-blur-xl"
              style={{
                background: "color-mix(in srgb, var(--w3-gray-100) 95%, transparent)",
                border: "1px solid var(--w3-border-subtle)",
              }}
            >
              <div className="grid grid-cols-3 gap-4">
                {grouped.map((group) => (
                  <div key={group.title} className="flex flex-col gap-1">
                    <span
                      className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider"
                      style={{ color: "var(--w3-gray-500)" }}
                    >
                      {group.title}
                    </span>
                    {group.items.map((item) => (
                      <a
                        key={item.id}
                        href={`${getSectionUrl("ui")}/${item.id}`}
                        onClick={closeMega}
                        className="rounded-md px-2 py-1 text-[13px] transition-colors hover:text-foreground"
                        style={{ color: "var(--w3-gray-700)" }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background =
                            "var(--w3-surface-elevated)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "transparent";
                        }}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div
                className="mt-3 flex items-center justify-between pt-3"
                style={{ borderTop: "1px solid var(--w3-border-subtle)" }}
              >
                <span className="text-xs" style={{ color: "var(--w3-gray-500)" }}>
                  {componentRegistry.length} components
                </span>
                <a
                  href={getSectionUrl("ui")}
                  onClick={closeMega}
                  className="text-xs font-medium transition-colors hover:underline"
                  style={{ color: "var(--w3-accent)" }}
                >
                  View all →
                </a>
              </div>
            </div>
          )}
        </div>

        <a
          href={getSectionUrl("docs")}
          className="rounded-md px-3 py-1.5 text-sm font-medium transition-colors text-muted-foreground hover:text-foreground"
        >
          Docs
        </a>

        <GitHubLink
          href="https://github.com/w3-kit/ui"
          starsRepo="w3-kit/ui"
          className="rounded-md px-3 py-1.5 font-medium"
        />
      </nav>

      <MobileMenuTrigger open={mobileOpen} onToggle={() => setMobileOpen(!mobileOpen)} />
    </AppHeader>
  );
}
