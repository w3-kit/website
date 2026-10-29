import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function RegistryNotFound({ kind, id }: { kind: string; id: string }) {
  return (
    <section className="flex min-h-[50vh] flex-col items-start justify-center gap-6">
      <h1 className="text-w3-title font-medium">
        <span className="block">No {kind}</span>
        <span className="block text-w3-ink-soft">called {id}.</span>
      </h1>
      <Link
        to="/registry"
        className="w3-press inline-flex h-12 items-center gap-2 bg-w3-accent px-5 text-w3-small font-medium text-w3-on-accent hover:bg-w3-accent-hover"
      >
        Back to the registry <ArrowRight size={16} aria-hidden />
      </Link>
    </section>
  );
}
