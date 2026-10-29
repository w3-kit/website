import { componentRegistry } from "../../../entities/component";
import { CHAINS } from "../../../entities/chain/model/chains.gen";
import { TOKENS } from "../../../entities/token/model/tokens.gen";
import { PROGRAMS } from "../../../entities/program/model/programs.gen";
import { LANDING_STATS } from "../../../entities/stats/model/stats.gen";
import { useReveal } from "../../../shared/lib/use-reveal";

const fetched = (label: string) => LANDING_STATS.find((s) => s.sml === label)?.big;

// Counts come from the same data the sites render; stars and downloads are fetched at build.
const ROWS = [
  { figure: String(componentRegistry.length), caption: "React components" },
  { figure: String(CHAINS.length), caption: "chains in the registry" },
  { figure: String(TOKENS.length), caption: "tokens with every address" },
  { figure: String(PROGRAMS.length), caption: "Solana programs" },
  { figure: fetched("GitHub stars"), caption: "GitHub stars across the org" },
  { figure: fetched("npm downloads / week"), caption: "npm downloads a week" },
].filter((row): row is { figure: string; caption: string } => Boolean(row.figure));

export function StatsSection() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section aria-labelledby="stats-title" className="px-4 py-24 md:px-10 md:py-40">
      <div ref={ref} className="grid gap-12 md:grid-cols-12 md:gap-x-6">
        <h2 id="stats-title" className="text-w3-title font-medium md:col-span-5 md:self-center">
          <span className="block text-w3-ink-soft">Open source,</span>
          <span className="block text-w3-ink">by the numbers.</span>
        </h2>
        <dl className="flex flex-col gap-5 md:col-span-6 md:col-start-7">
          {ROWS.map((row) => (
            <div key={row.caption} className="grid grid-cols-[52%_1fr] items-baseline gap-x-6">
              <dt className="sr-only">{row.caption}</dt>
              <dd className="text-right text-[clamp(56px,7vw,112px)] font-medium leading-none tracking-[-0.045em] tabular-nums text-w3-ink">
                {row.figure}
              </dd>
              <dd className="text-w3-body text-w3-ink">{row.caption}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
