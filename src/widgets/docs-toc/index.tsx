import { useCallback } from "react";
import { useActiveHeading } from "./use-active-heading";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface DocsTocProps {
  headings: Heading[];
}

export function DocsToc({ headings }: DocsTocProps) {
  const activeId = useActiveHeading(headings.map((h) => h.id));

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    const scrollContainer = document.querySelector("[data-docs-content]");
    if (el && scrollContainer) {
      const containerRect = scrollContainer.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const offset = elRect.top - containerRect.top + scrollContainer.scrollTop - 20;
      scrollContainer.scrollTo({ top: offset, behavior: "smooth" });
    }
  }, []);

  if (!headings.length) return null;

  return (
    <aside
      className="hidden w-52 shrink-0 overflow-y-auto xl:block"
      style={{ borderLeft: "1px solid var(--w3-border-subtle)" }}
    >
      <div className="py-6 pl-5">
        <span
          className="mb-4 block text-[11px] font-semibold uppercase tracking-wider"
          style={{ color: "var(--w3-gray-500)" }}
        >
          On this page
        </span>
        <nav className="flex flex-col gap-0.5">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            return (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className="block rounded-sm py-1 text-[12.5px] leading-snug transition-colors"
                style={{
                  paddingLeft: heading.level === 3 ? 16 : heading.level >= 4 ? 28 : 8,
                  color: isActive ? "var(--w3-accent)" : "var(--w3-gray-500)",
                  fontWeight: isActive ? 500 : 400,
                  borderLeft: isActive
                    ? "2px solid var(--w3-accent)"
                    : "2px solid transparent",
                }}
              >
                {heading.text}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
