import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import type { Chain } from "../../entities/chain";
import type { Token } from "../../entities/token";
import type { SolanaProgram } from "../../entities/program";
import { cn } from "../../shared/lib/utils";

const ECOSYSTEM_LABELS: Record<string, string> = {
  evm: "EVM",
  solana: "Solana",
  sui: "Sui",
  aptos: "Aptos",
};
export const ecosystemLabel = (e: string) => ECOSYSTEM_LABELS[e] ?? e;

/** Alternating bands, one per record. The same shape is used on every registry list. */
function Rows({ children }: { children: ReactNode }) {
  return <ul className="flex flex-col gap-1">{children}</ul>;
}

function Row({ index, children }: { index: number; children: ReactNode }) {
  return (
    <li
      className={cn(
        "group transition-colors hover:bg-w3-tone-2",
        index % 2 === 0 ? "bg-w3-tone" : "bg-w3-ground",
      )}
    >
      {children}
    </li>
  );
}

const arrow = (
  <ArrowRight
    size={18}
    aria-hidden
    className="justify-self-end text-w3-ink-soft transition-transform group-hover:translate-x-1 group-hover:text-w3-accent"
  />
);

export function ChainRows({ chains }: { chains: Chain[] }) {
  return (
    <Rows>
      {chains.map((c, i) => (
        <Row key={c.chainId} index={i}>
          <Link
            to="/registry/chains/$chainId"
            params={{ chainId: String(c.chainId) }}
            className="grid min-h-[72px] items-center px-5 py-3 grid-cols-[1fr_auto] gap-x-6 md:grid-cols-[2fr_1fr_1fr_1fr_24px]"
          >
            <span className="text-[18px] font-medium text-w3-ink group-hover:text-w3-accent">
              {c.name}
              {c.testnet && <span className="ml-3 text-w3-small text-w3-ink-soft">testnet</span>}
            </span>
            <span className="hidden text-w3-small tabular-nums text-w3-ink md:block">
              Chain ID {c.chainId}
            </span>
            <span className="hidden text-w3-small text-w3-ink-soft md:block">
              {ecosystemLabel(c.ecosystem)}
            </span>
            <span className="hidden text-w3-small text-w3-ink-soft md:block">
              {c.nativeCurrency.symbol}
            </span>
            {arrow}
          </Link>
        </Row>
      ))}
    </Rows>
  );
}

export function TokenRows({ tokens }: { tokens: Token[] }) {
  return (
    <Rows>
      {tokens.map((t, i) => (
        <Row key={t.symbol} index={i}>
          <Link
            to="/registry/tokens/$symbol"
            params={{ symbol: t.symbol }}
            className="grid min-h-[72px] items-center px-5 py-3 grid-cols-[80px_1fr_auto] gap-x-6 md:grid-cols-[120px_2fr_1fr_1fr_24px]"
          >
            <span className="text-[20px] font-medium tabular-nums text-w3-ink">{t.symbol}</span>
            <span className="text-[18px] font-medium text-w3-ink group-hover:text-w3-accent">
              {t.name}
            </span>
            <span className="hidden text-w3-small text-w3-ink-soft md:block">
              {t.decimals} decimals
            </span>
            <span className="hidden text-w3-small text-w3-ink-soft md:block">
              {t.chains.length} {t.chains.length === 1 ? "chain" : "chains"}
            </span>
            {arrow}
          </Link>
        </Row>
      ))}
    </Rows>
  );
}

export function ProgramRows({ programs }: { programs: SolanaProgram[] }) {
  return (
    <Rows>
      {programs.map((p, i) => (
        <Row key={p.key} index={i}>
          <Link
            to="/registry/programs/$key"
            params={{ key: p.key }}
            className="grid min-h-[72px] items-center px-5 py-3 grid-cols-[1fr_auto] gap-x-6 md:grid-cols-[2fr_2fr_24px]"
          >
            <span className="text-[18px] font-medium text-w3-ink group-hover:text-w3-accent">
              {p.name}
            </span>
            <code className="hidden truncate text-[14px] text-w3-ink-soft md:block">
              {p.deployments[0]?.programId}
            </code>
            {arrow}
          </Link>
        </Row>
      ))}
    </Rows>
  );
}

/** Label/value pairs for a record's facts. */
export function FactList({ facts }: { facts: [string, ReactNode][] }) {
  return (
    <dl className="grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
      {facts.map(([label, value]) => (
        <div key={label} className="bg-w3-tone p-5">
          <dt className="text-w3-small text-w3-ink-soft">{label}</dt>
          <dd className="mt-2 text-[20px] font-medium tabular-nums text-w3-ink">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** One copyable value per band: an address, a program ID or an RPC URL. */
export function CopyRows({
  rows,
}: {
  rows: { key: string; label: ReactNode; value: string; action: ReactNode }[];
}) {
  return (
    <ul className="flex flex-col gap-1">
      {rows.map((row, i) => (
        <li
          key={row.key}
          className={cn(
            "grid items-center gap-x-6 gap-y-1 px-5 py-3 md:grid-cols-[200px_1fr_auto]",
            i % 2 === 0 ? "bg-w3-tone" : "bg-w3-ground",
          )}
        >
          <span className="text-w3-body font-medium text-w3-ink">{row.label}</span>
          <code className="min-w-0 break-all text-[14px] text-w3-ink-soft">{row.value}</code>
          {row.action}
        </li>
      ))}
    </ul>
  );
}

export function RegistrySection({ title, children }: { title: string; children: ReactNode }) {
  const id = title.toLowerCase().replace(/\s+/g, "-");
  return (
    <section aria-labelledby={id} className="pt-16 md:pt-24">
      <h2 id={id} className="mb-6 text-w3-statement font-medium">
        {title}
      </h2>
      {children}
    </section>
  );
}
