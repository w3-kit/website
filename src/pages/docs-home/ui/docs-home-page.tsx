import { ArrowRight, Search } from "lucide-react";
import { DocsShell } from "../../../widgets/docs-shell";
import { useSearch } from "../../../features/search";
import { docsNavSections, shortSectionTitle, type DocNavSection } from "../../../entities/guide";
import { getDocItemHref } from "../../../shared/lib/urls";

const PARTS: { title: string; summary: string; prefix?: string }[] = [
  { title: "Start", summary: "Install the kit and learn how its parts fit together." },
  { title: "Guides", summary: "How EVM and Solana work, and how to stay safe.", prefix: "Guides:" },
  { title: "Recipes", summary: "Working code for one task each.", prefix: "Recipes:" },
];

const sectionsFor = (prefix?: string) =>
  docsNavSections.filter((s) => (prefix ? s.title.startsWith(prefix) : !s.title.includes(":")));

export function DocsHomePage() {
  return (
    <DocsShell>
      <Hero />
      {PARTS.map((part, i) => (
        <section
          key={part.title}
          aria-labelledby={`part-${i}`}
          className={`grid gap-10 px-4 py-20 md:grid-cols-12 md:gap-x-6 md:px-10 md:py-28 ${
            i % 2 === 0 ? "bg-w3-tone" : ""
          }`}
        >
          <div className="md:col-span-3">
            <h2 id={`part-${i}`} className="text-w3-title font-medium">
              {part.title}
            </h2>
            <p className="mt-4 text-w3-body text-w3-ink-soft">{part.summary}</p>
          </div>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 md:col-span-9 lg:grid-cols-3">
            {sectionsFor(part.prefix).map((section) => (
              <SectionLinks key={section.title} section={section} />
            ))}
          </div>
        </section>
      ))}
    </DocsShell>
  );
}

function Hero() {
  const { openSearch } = useSearch();
  const first = docsNavSections[0].items[0];

  return (
    <section
      aria-labelledby="docs-title"
      className="grid gap-10 px-4 pb-20 pt-10 md:grid-cols-12 md:gap-x-6 md:px-10 md:pb-28 md:pt-16"
    >
      <h1 id="docs-title" className="w3-rise text-w3-display font-medium md:col-span-7">
        <span className="block">Build with</span>
        <span className="block">w3-kit.</span>
      </h1>
      <div
        className="w3-rise flex flex-col gap-6 md:col-span-5 md:self-end"
        style={{ animationDelay: "80ms" }}
      >
        <p className="text-w3-body">
          Install the toolkit, read how chains work, then copy a recipe that already works.
        </p>
        <button
          type="button"
          onClick={openSearch}
          className="flex h-14 w-full items-center gap-3 bg-w3-tone px-5 text-left text-w3-body text-w3-ink-soft transition-colors hover:bg-w3-tone-2"
        >
          <Search size={18} aria-hidden />
          <span className="flex-1">Search the docs</span>
          <kbd className="font-sans text-w3-small">⌘K</kbd>
        </button>
        <a
          href={getDocItemHref(first)}
          className="group inline-flex items-center gap-2 self-start text-w3-small font-medium text-w3-accent"
        >
          Start with the {first.label.toLowerCase()}
          <ArrowRight
            size={16}
            aria-hidden
            className="transition-transform group-hover:translate-x-1"
          />
        </a>
      </div>
    </section>
  );
}

function SectionLinks({ section }: { section: DocNavSection }) {
  return (
    <div>
      <h3 className="mb-3 text-w3-small text-w3-ink-soft">{shortSectionTitle(section.title)}</h3>
      <ul className="flex flex-col gap-1.5">
        {section.items.map((item) => (
          <li key={item.slug}>
            <a
              href={getDocItemHref(item)}
              className="text-w3-body text-w3-ink transition-colors hover:text-w3-accent"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
