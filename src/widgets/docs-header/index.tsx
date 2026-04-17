import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ChevronRight, Search } from "lucide-react";
import { Button } from "../../shared/ui/button";
import { Logo } from "../../shared/ui/logo";
import { cn } from "../../shared/lib/utils";
import { getSectionUrl } from "../../shared/lib/urls";
import { docsNavSections, type DocNavSection } from "../../entities/guide/model/docs-nav.gen";
import { GitHubIcon } from "../../shared/ui/github-icon";

// Group nav sections for the mega menu columns
const docsSections = docsNavSections.filter(
  (s) => !s.title.startsWith("Recipes:") && !s.title.startsWith("Guides"),
);
const guideSections = docsNavSections.filter((s) => s.title.startsWith("Guides"));
const recipeSections = docsNavSections.filter((s) => s.title.startsWith("Recipes:"));

function getItemHref(item: { slug: string; type: string }): string {
  const base = getSectionUrl("docs");
  if (item.type === "guide") return `${base}/guide/${item.slug}`;
  if (item.type === "recipe") return `${base}/recipe/${item.slug}`;
  return `${base}/${item.slug}`;
}

function CollapsibleMegaSection({ section }: { section: DocNavSection }) {
  const [open, setOpen] = useState(true);

  // Strip prefix like "Guides: " or "Recipes: " for cleaner display
  const displayTitle = section.title.replace(/^(Guides|Recipes):\s*/i, "");

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-1 text-[11px] font-medium uppercase tracking-wider transition-colors"
        style={{ color: "var(--w3-gray-500)" }}
      >
        <ChevronRight
          size={10}
          className={cn("shrink-0 transition-transform", open && "rotate-90")}
          style={{ color: "var(--w3-gray-400)" }}
        />
        {displayTitle}
      </button>
      {open && (
        <div className="ml-3 flex flex-col gap-0.5">
          {section.items.map((item) => (
            <a
              key={item.slug}
              href={getItemHref(item)}
              className="rounded-md px-2 py-1 text-[13px] transition-colors hover:bg-[var(--w3-surface-elevated)]"
              style={{ color: "var(--w3-gray-600)" }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export function DocsHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close mega menu on outside click
  useEffect(() => {
    if (!megaOpen) return;
    const handler = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [megaOpen]);

  return (
    <>
      <header
        className="sticky top-0 z-50 flex shrink-0 items-center justify-between border-b px-6 py-3 backdrop-blur-xl"
        style={{
          borderColor: "var(--w3-border-subtle)",
          background: "color-mix(in srgb, var(--w3-gray-100) 80%, transparent)",
        }}
      >
        {/* Logo */}
        <a href={getSectionUrl("docs")} className="flex items-center gap-2">
          <Logo size={24} className="text-[var(--w3-accent)]" />
          <span className="text-sm font-semibold" style={{ color: "var(--w3-gray-900)" }}>
            w3-kit
          </span>
          <span
            className="rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
            style={{ background: "var(--w3-accent-subtle)", color: "var(--w3-accent)" }}
          >
            docs
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" ref={megaRef}>
          {/* Mega menu trigger */}
          <button
            onClick={() => setMegaOpen(!megaOpen)}
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              megaOpen ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            Menu
            <ChevronDown
              size={14}
              className={cn("transition-transform", megaOpen && "rotate-180")}
            />
          </button>

          {/* Quick links */}
          <a
            href={`${getSectionUrl("docs")}/introduction`}
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Quick Start
          </a>
          <a
            href={`${getSectionUrl("docs")}/components-api`}
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            API
          </a>
          <a
            href={`${getSectionUrl("docs")}/guide/what-is-a-wallet`}
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Guides
          </a>
          <a
            href={`${getSectionUrl("docs")}/recipe/connect-wallet`}
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Recipes
          </a>

          {/* Search trigger */}
          <button
            onClick={() => {
              document.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", metaKey: true }),
              );
            }}
            className="ml-2 rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Search"
          >
            <Search size={16} />
          </button>

          {/* GitHub */}
          <a
            href="https://github.com/w3-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="GitHub"
          >
            <GitHubIcon size={16} />
          </a>

          {/* Mega menu dropdown */}
          {megaOpen && (
            <div
              className="absolute inset-x-0 top-full z-50 max-h-[70vh] overflow-y-auto border-b backdrop-blur-xl"
              style={{
                background: "color-mix(in srgb, var(--w3-gray-100) 95%, transparent)",
                borderColor: "var(--w3-border-subtle)",
              }}
            >
              <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-8 sm:grid-cols-2 md:grid-cols-4 lg:px-16">
                {/* Column 1: Documentation */}
                <div className="flex flex-col gap-5">
                  <span
                    className="text-xs font-semibold"
                    style={{ color: "var(--w3-gray-900)" }}
                  >
                    Documentation
                  </span>
                  {docsSections.map((section) => (
                    <CollapsibleMegaSection key={section.title} section={section} />
                  ))}
                </div>

                {/* Column 2: Guides */}
                <div className="flex flex-col gap-5">
                  <span
                    className="text-xs font-semibold"
                    style={{ color: "var(--w3-gray-900)" }}
                  >
                    Guides
                  </span>
                  {guideSections.map((section) => (
                    <CollapsibleMegaSection key={section.title} section={section} />
                  ))}
                </div>

                {/* Column 3: Recipes */}
                <div className="flex flex-col gap-5">
                  <span
                    className="text-xs font-semibold"
                    style={{ color: "var(--w3-gray-900)" }}
                  >
                    Recipes
                  </span>
                  {recipeSections.slice(0, 2).map((section) => (
                    <CollapsibleMegaSection key={section.title} section={section} />
                  ))}
                </div>

                {/* Column 4: More Recipes */}
                <div className="flex flex-col gap-5">
                  <span
                    className="text-xs font-semibold"
                    style={{ color: "var(--w3-gray-900)" }}
                  >
                    &nbsp;
                  </span>
                  {recipeSections.slice(2).map((section) => (
                    <CollapsibleMegaSection key={section.title} section={section} />
                  ))}
                </div>
              </div>
            </div>
          )}
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
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto pt-14 backdrop-blur-xl md:hidden"
          style={{
            background: "color-mix(in srgb, var(--w3-gray-100) 95%, transparent)",
          }}
        >
          <nav className="flex flex-col gap-4 px-6 py-6">
            {docsNavSections.map((section) => (
              <CollapsibleMobileSection key={section.title} section={section} />
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

function CollapsibleMobileSection({ section }: { section: DocNavSection }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between px-4 text-[10px] font-semibold uppercase tracking-wider"
        style={{ color: "var(--w3-gray-500)" }}
      >
        {section.title}
        <ChevronDown
          size={12}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>
      {open &&
        section.items.map((item) => (
          <a
            key={item.slug}
            href={getItemHref(item)}
            className="rounded-lg px-4 py-2 text-sm transition-colors"
            style={{ color: "var(--w3-gray-700)" }}
          >
            {item.label}
          </a>
        ))}
    </div>
  );
}
