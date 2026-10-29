import { getDocItemHref } from "../../shared/lib/urls";
import { cn } from "../../shared/lib/utils";
import { type DocNavSection } from "../../entities/guide/model/docs-nav.gen";

interface DocsSidebarProps {
  sections: DocNavSection[];
  activeSlug: string;
}

/** Desktop only: on smaller screens the header's menu carries the same links. */
export function DocsSidebar({ sections, activeSlug }: DocsSidebarProps) {
  return (
    <nav aria-label="Docs" className="hidden lg:col-span-3 lg:block">
      <div className="sticky top-[104px] flex max-h-[calc(100svh-136px)] flex-col gap-8 overflow-y-auto pb-8 pr-4">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="mb-2 text-w3-small text-w3-ink-soft">{section.title}</h2>
            <ul>
              {section.items.map((item) => {
                const active = item.slug === activeSlug;
                return (
                  <li key={item.slug}>
                    <a
                      href={getDocItemHref(item)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block py-1 text-w3-small transition-colors hover:text-w3-accent",
                        active ? "font-medium text-w3-accent" : "text-w3-ink",
                      )}
                    >
                      {item.label.split(" — ")[0]}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
