import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "../../shared/lib/utils";

interface Neighbour {
  label: string;
  href: string;
}

export function DocsPrevNext({ prev, next }: { prev?: Neighbour; next?: Neighbour }) {
  return (
    <nav aria-label="Previous and next" className="mt-24 grid gap-2 sm:grid-cols-2">
      {prev && <NeighbourLink item={prev} direction="previous" />}
      {next && <NeighbourLink item={next} direction="next" />}
    </nav>
  );
}

function NeighbourLink({ item, direction }: { item: Neighbour; direction: "previous" | "next" }) {
  const isNext = direction === "next";
  return (
    <a
      href={item.href}
      className={cn(
        "group flex flex-col gap-6 bg-w3-tone p-6 transition-colors hover:bg-w3-tone-2",
        isNext && "sm:col-start-2 sm:items-end sm:text-right",
      )}
    >
      <span className="text-w3-small text-w3-ink-soft">{isNext ? "Next" : "Previous"}</span>
      <span className="flex items-center gap-3 text-w3-body font-medium text-w3-ink group-hover:text-w3-accent">
        {!isNext && <ArrowLeft size={18} aria-hidden />}
        {item.label}
        {isNext && <ArrowRight size={18} aria-hidden />}
      </span>
    </a>
  );
}
