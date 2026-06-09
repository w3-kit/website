import { ArrowUpRight } from "lucide-react";
import type { Alternative } from "../model/types";

export function AlternativeCard({ alternative }: { alternative: Alternative }) {
  return (
    <article className="flex flex-col gap-5 rounded-xl border border-w3-border-subtle p-6">
      <header>
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-medium tracking-[-0.02em]">{alternative.name}</h3>
          <a
            href={alternative.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-[11px] text-w3-gray-500 hover:text-w3-accent"
          >
            Visit <ArrowUpRight size={11} />
          </a>
        </div>
        <p className="mt-1 text-[13px] text-w3-gray-600">{alternative.tagline}</p>
      </header>

      <section>
        <h4 className="text-[11px] font-medium uppercase tracking-[0.06em] text-w3-gray-500">
          Use {alternative.name} when
        </h4>
        <ul className="mt-2 space-y-1.5 text-sm text-w3-gray-700">
          {alternative.useWhen.map((bullet, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-w3-gray-400">·</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h4 className="text-[11px] font-medium uppercase tracking-[0.06em] text-w3-accent">
          Choose w3-kit when
        </h4>
        <ul className="mt-2 space-y-1.5 text-sm text-w3-gray-900">
          {alternative.chooseW3Kit.map((bullet, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-w3-accent">·</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
