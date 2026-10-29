import { ArrowRight } from "lucide-react";
import { getSectionUrl } from "../lib/urls";

interface DocsNotFoundProps {
  entityType: "Page" | "Guide" | "Recipe";
  slug: string;
}

export function DocsNotFound({ entityType, slug }: DocsNotFoundProps) {
  return (
    <section className="flex min-h-[60vh] flex-col items-start justify-center gap-6 px-4 md:px-10">
      <h1 className="text-w3-title font-medium">
        <span className="block">No {entityType.toLowerCase()}</span>
        <span className="block text-w3-ink-soft">called {slug}.</span>
      </h1>
      <a
        href={getSectionUrl("docs")}
        className="w3-press inline-flex h-12 items-center gap-2 bg-w3-accent px-5 text-w3-small font-medium text-w3-on-accent hover:bg-w3-accent-hover"
      >
        All docs <ArrowRight size={16} aria-hidden />
      </a>
    </section>
  );
}
