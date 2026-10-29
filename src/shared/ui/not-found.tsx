import { ArrowRight } from "lucide-react";

interface NotFoundProps {
  /** What was looked up, e.g. "chain" or "recipe". */
  kind: string;
  id: string;
  back: { href: string; label: string };
}

export function NotFound({ kind, id, back }: NotFoundProps) {
  return (
    <section className="flex min-h-[60vh] flex-col items-start justify-center gap-6 px-4 md:px-10">
      <h1 className="text-w3-title font-medium">
        <span className="block">No {kind}</span>
        <span className="block text-w3-ink-soft">called {id}.</span>
      </h1>
      <a
        href={back.href}
        className="w3-press inline-flex h-12 items-center gap-2 bg-w3-accent px-5 text-w3-small font-medium text-w3-on-accent hover:bg-w3-accent-hover"
      >
        {back.label} <ArrowRight size={16} aria-hidden />
      </a>
    </section>
  );
}
