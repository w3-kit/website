import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { cn } from "../../shared/lib/utils";
import { getSectionUrl, getDocItemHref } from "../../shared/lib/urls";
import { docsNavSections, type DocNavSection } from "../../entities/guide/model/docs-nav.gen";
import { useSearch } from "../../features/search";
import { Brand } from "../../shared/ui/header-bits/brand";
import { GitHubLink } from "../../shared/ui/header-bits/github-link";
import { MobileMenuTrigger } from "../../shared/ui/header-bits/mobile-menu-trigger";
import { MobileMenuOverlay } from "../../shared/ui/header-bits/mobile-menu-overlay";
import { AppHeader } from "../app-header";

const docsSections = docsNavSections.filter(
  (s) => !s.title.startsWith("Recipes:") && !s.title.startsWith("Guides"),
);
const guideSections = docsNavSections.filter((s) => s.title.startsWith("Guides"));
const recipeSections = docsNavSections.filter((s) => s.title.startsWith("Recipes:"));

function DropdownSection({ section }: { section: DocNavSection }) {
  const [open, setOpen] = useState(true);
  const displayTitle = section.title.replace(/^(Guides|Recipes):\s*/i, "");

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-1 text-[11px] font-medium uppercase tracking-wider text-w3-gray-500 transition-colors"
      >
        <ChevronRight
          size={10}
          className={cn("shrink-0 text-w3-gray-400 transition-transform", open && "rotate-90")}
        />
        {displayTitle}
      </button>
      {open && (
        <div className="ml-3 flex flex-col gap-0.5">
          {section.items.map((item) => (
            <a
              key={item.slug}
              href={getDocItemHref(item)}
              className="rounded-md px-2 py-1 text-[13px] text-w3-gray-600 transition-colors hover:bg-w3-surface-elevated"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function CollapsibleMobileSection({ section }: { section: DocNavSection }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between px-4 text-[10px] font-semibold uppercase tracking-wider text-w3-gray-500"
      >
        {section.title}
        <ChevronDown size={12} className={cn("transition-transform", open && "rotate-180")} />
      </button>
      {open &&
        section.items.map((item) => (
          <a
            key={item.slug}
            href={getDocItemHref(item)}
            className="rounded-lg px-4 py-2 text-sm text-w3-gray-700 transition-colors"
          >
            {item.label}
          </a>
        ))}
    </div>
  );
}

type ActiveDropdown = "docs" | "guides" | "recipes" | null;

function NavDropdown({
  label,
  id,
  active,
  onToggle,
}: {
  label: string;
  id: ActiveDropdown;
  active: ActiveDropdown;
  onToggle: (id: ActiveDropdown) => void;
}) {
  return (
    <button
      onClick={() => onToggle(active === id ? null : id)}
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
        active === id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
      <ChevronDown
        size={12}
        className={cn("transition-transform", active === id && "rotate-180")}
      />
    </button>
  );
}

function DropdownPanel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="absolute inset-x-0 top-full z-50 max-h-[70vh] overflow-y-auto border-b border-w3-border-subtle backdrop-blur-xl"
      style={{
        background: "color-mix(in srgb, var(--w3-gray-100) 95%, transparent)",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6 py-6 lg:px-16">{children}</div>
    </div>
  );
}

export function DocsHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const { openSearch } = useSearch();

  useEffect(() => {
    if (!activeDropdown) return;
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [activeDropdown]);

  const mobile = (
    <MobileMenuOverlay open={mobileOpen} onAutoClose={() => setMobileOpen(false)} topClass="pt-14">
      <nav className="flex flex-col gap-4 px-6 py-6">
        {docsNavSections.map((section) => (
          <CollapsibleMobileSection key={section.title} section={section} />
        ))}
      </nav>
    </MobileMenuOverlay>
  );

  return (
    <AppHeader className="shrink-0 py-3" mobileContent={mobile}>
      <Brand href={getSectionUrl("docs")} badge="docs" />

      <nav className="hidden items-center gap-0 md:flex" ref={navRef}>
        <NavDropdown label="Docs" id="docs" active={activeDropdown} onToggle={setActiveDropdown} />
        <NavDropdown
          label="Guides"
          id="guides"
          active={activeDropdown}
          onToggle={setActiveDropdown}
        />
        <NavDropdown
          label="Recipes"
          id="recipes"
          active={activeDropdown}
          onToggle={setActiveDropdown}
        />

        <button
          onClick={openSearch}
          className="ml-3 rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Search"
        >
          <Search size={16} />
        </button>

        <GitHubLink className="rounded-md p-1.5" />

        {activeDropdown === "docs" && (
          <DropdownPanel>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {docsSections.map((section) => (
                <DropdownSection key={section.title} section={section} />
              ))}
            </div>
          </DropdownPanel>
        )}

        {activeDropdown === "guides" && (
          <DropdownPanel>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {guideSections.map((section) => (
                <DropdownSection key={section.title} section={section} />
              ))}
            </div>
          </DropdownPanel>
        )}

        {activeDropdown === "recipes" && (
          <DropdownPanel>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {recipeSections.map((section) => (
                <DropdownSection key={section.title} section={section} />
              ))}
            </div>
          </DropdownPanel>
        )}
      </nav>

      <MobileMenuTrigger open={mobileOpen} onToggle={() => setMobileOpen(!mobileOpen)} />
    </AppHeader>
  );
}
