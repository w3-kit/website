import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { getSectionUrl } from "../../shared/lib/urls";
import { cn } from "../../shared/lib/utils";

interface DocNavItem {
  label: string;
  slug: string;
  type: "markdown" | "guide" | "recipe";
}

interface DocNavSection {
  title: string;
  items: DocNavItem[];
}

function getItemHref(item: DocNavItem): string {
  const base = getSectionUrl("docs");
  if (item.type === "guide") return `${base}/guide/${item.slug}`;
  if (item.type === "recipe") return `${base}/recipe/${item.slug}`;
  return `${base}/${item.slug}`;
}

function SidebarLink({ item, active }: { item: DocNavItem; active: boolean }) {
  return (
    <a
      href={getItemHref(item)}
      className="flex items-center gap-2 rounded-md px-3 py-1.5 text-[13px] transition-all"
      style={{
        color: active ? "var(--w3-gray-900)" : "var(--w3-gray-600)",
        background: active ? "var(--w3-surface-elevated)" : "transparent",
        fontWeight: active ? 500 : 400,
      }}
    >
      <span
        className="h-4 w-0.5 shrink-0 rounded-full transition-all"
        style={{
          background: active ? "var(--w3-accent)" : "transparent",
        }}
      />
      {item.label}
    </a>
  );
}

function CollapsibleSection({
  section,
  activeSlug,
  defaultOpen,
}: {
  section: DocNavSection;
  activeSlug: string;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="flex flex-col gap-0.5">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors hover:bg-[var(--w3-surface-translucent)]"
        style={{ color: "var(--w3-gray-500)" }}
      >
        <ChevronRight
          size={11}
          className={cn("shrink-0 transition-transform", open && "rotate-90")}
          style={{ color: "var(--w3-gray-400)" }}
        />
        {section.title}
      </button>
      {open && (
        <div className="ml-1 flex flex-col gap-0.5">
          {section.items.map((item) => (
            <SidebarLink
              key={item.slug}
              item={item}
              active={activeSlug === item.slug}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface DocsSidebarProps {
  sections: DocNavSection[];
  activeSlug: string;
}

export function DocsSidebar({ sections, activeSlug }: DocsSidebarProps) {
  return (
    <aside
      className="hidden w-60 shrink-0 overflow-y-auto md:block"
      style={{ borderRight: "1px solid var(--w3-border-subtle)" }}
    >
      <div className="flex flex-col gap-1 py-6 pr-3">
        {sections.map((section) => {
          const hasActive = section.items.some((item) => item.slug === activeSlug);
          return (
            <CollapsibleSection
              key={section.title}
              section={section}
              activeSlug={activeSlug}
              defaultOpen={hasActive}
            />
          );
        })}
      </div>
    </aside>
  );
}
