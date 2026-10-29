import { cn } from "../../shared/lib/utils";
import { useActiveHeading } from "./use-active-heading";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function DocsToc({ headings }: { headings: Heading[] }) {
  const activeId = useActiveHeading(headings.map((h) => h.id));
  if (!headings.length) return null;

  return (
    <nav aria-label="On this page" className="hidden xl:col-span-2 xl:col-start-11 xl:block">
      <div className="sticky top-[104px] max-h-[calc(100svh-136px)] overflow-y-auto">
        <h2 className="mb-3 text-w3-small text-w3-ink-soft">On this page</h2>
        <ul>
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={cn(
                  "block py-1 text-w3-small leading-snug transition-colors hover:text-w3-accent",
                  heading.level >= 3 && "pl-3",
                  activeId === heading.id ? "font-medium text-w3-accent" : "text-w3-ink",
                )}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
