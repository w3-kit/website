import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, ChevronDown, Star } from "lucide-react";
import { Button } from "../../shared/ui/button";
import { Logo } from "../../shared/ui/logo";
import { GitHubIcon } from "../../shared/ui/github-icon";
import { cn } from "../../shared/lib/utils";
import { getSectionUrl, getLandingUrl } from "../../shared/lib/urls";
import { componentRegistry, type ComponentCategory } from "../../entities/component";

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
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [stars, setStars] = useState<number | null>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isTransparent = variant === "transparent";

  // Scroll handler
  useEffect(() => {
    if (!isTransparent) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isTransparent]);

  // Resize → close mobile
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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

  // Fetch GitHub stars
  useEffect(() => {
    fetch("https://api.github.com/repos/w3-kit/w3-kit")
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.stargazers_count === "number") setStars(d.stargazers_count);
      })
      .catch(() => {});
  }, []);

  const closeMega = useCallback(() => setMegaOpen(false), []);
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
                          style={{
                            color: "var(--w3-gray-700)",
                          }}
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

          {/* GitHub with live stars */}
          <a
            href="https://github.com/w3-kit/w3-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors text-muted-foreground hover:text-foreground"
          >
            <GitHubIcon size={16} />
            {stars !== null && (
              <span className="inline-flex items-center gap-0.5">
                <Star size={12} className="fill-current" />
                <span className="text-xs tabular-nums">{stars}</span>
              </span>
            )}
          </a>
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
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto pt-16 backdrop-blur-xl md:hidden"
          style={{
            background: "color-mix(in srgb, var(--w3-gray-100) 95%, transparent)",
          }}
        >
          <nav className="flex flex-col gap-1 px-6 py-4">
            {/* Component groups */}
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

            <div
              className="mt-2 border-t pt-3"
              style={{ borderColor: "var(--w3-border-subtle)" }}
            >
              <a
                href={getSectionUrl("docs")}
                className="block rounded-lg px-4 py-3 text-base font-medium transition-colors text-muted-foreground"
              >
                Docs
              </a>
              <a
                href="https://github.com/w3-kit/w3-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg px-4 py-3 text-base font-medium transition-colors text-muted-foreground"
              >
                <GitHubIcon size={16} />
                GitHub
                {stars !== null && (
                  <span
                    className="inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs"
                    style={{ background: "var(--w3-surface-elevated)" }}
                  >
                    <Star size={10} className="fill-current" />
                    {stars}
                  </span>
                )}
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
