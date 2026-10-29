import { useState, type KeyboardEvent } from "react";
import { ArrowRight, Check, Copy } from "lucide-react";
import { CHAINS } from "../../../entities/chain/model/chains.gen";
import { TOKENS } from "../../../entities/token/model/tokens.gen";
import { getSectionUrl } from "../../../shared/lib/urls";
import { useCopyToClipboard } from "../../../shared/lib/use-copy-to-clipboard";
import { useReveal } from "../../../shared/lib/use-reveal";
import { cn } from "../../../shared/lib/utils";

const FEATURED_CHAIN_IDS = [1, 8453, 42161, 10, 137, 101];
const MAX_BANDS = 6;

const registry = getSectionUrl("registry");
const chains = FEATURED_CHAIN_IDS.map((id) => CHAINS.find((c) => c.chainId === id)!);

const tokensOn = (chainId: number) =>
  TOKENS.flatMap((t) => {
    const deployment = t.chains.find((d) => d.chainId === chainId);
    return deployment ? [{ token: t, address: deployment.address }] : [];
  });

export function RegistrySection() {
  const [active, setActive] = useState(0);
  const ref = useReveal<HTMLDivElement>();
  const chain = chains[active];
  const tokens = tokensOn(chain.chainId);

  const onTabKey = (e: KeyboardEvent) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (active + step + chains.length) % chains.length;
    setActive(next);
    document.getElementById(`chain-tab-${next}`)?.focus();
  };

  return (
    <section
      id="registry"
      aria-labelledby="registry-title"
      className="bg-w3-tone px-4 py-24 md:px-10 md:py-40"
    >
      <div ref={ref}>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2 id="registry-title" className="text-w3-title font-medium">
            <span className="block text-w3-ink-soft">One registry.</span>
            <span className="block text-w3-ink">Every address typed.</span>
          </h2>
          <a
            href={registry}
            className="w3-press inline-flex h-12 items-center justify-center gap-2 bg-w3-ink px-5 text-w3-small font-medium text-w3-ground hover:bg-w3-accent"
          >
            Browse the registry <ArrowRight size={16} aria-hidden />
          </a>
        </div>

        <div className="mt-14 flex flex-col gap-6 md:flex-row md:gap-10">
          <div
            role="tablist"
            aria-label="Chains"
            aria-orientation="vertical"
            className="sticky top-[72px] z-10 -mx-4 flex gap-1.5 overflow-x-auto bg-w3-tone px-4 py-2 md:static md:mx-0 md:w-[160px] md:shrink-0 md:flex-col md:p-0"
          >
            {chains.map((c, i) => (
              <button
                key={c.chainId}
                id={`chain-tab-${i}`}
                role="tab"
                type="button"
                aria-selected={i === active}
                aria-controls="chain-panel"
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={onTabKey}
                className={cn(
                  "flex h-16 min-w-[120px] flex-col justify-center px-4 text-left transition-colors",
                  i === active
                    ? "bg-w3-ink text-w3-ground"
                    : "bg-w3-ground text-w3-ink hover:bg-w3-tone-2",
                )}
              >
                <span className="text-[16px] font-medium">{c.name.replace(" One", "")}</span>
                <span
                  className={cn("text-[13px]", i === active ? "opacity-70" : "text-w3-ink-soft")}
                >
                  Chain ID {c.chainId}
                </span>
              </button>
            ))}
          </div>

          <div
            id="chain-panel"
            role="tabpanel"
            aria-labelledby={`chain-tab-${active}`}
            className="flex min-w-0 flex-1 flex-col gap-1"
          >
            {tokens.slice(0, MAX_BANDS).map(({ token, address }, i) => (
              <TokenBand
                key={token.symbol}
                symbol={token.symbol}
                name={token.name}
                decimals={token.decimals}
                address={address}
                shade={i % 2 === 0}
              />
            ))}
            <a
              href={`${registry}/chains/${chain.chainId}`}
              className="group mt-4 inline-flex items-center gap-2 self-start text-w3-small font-medium text-w3-accent"
            >
              All {tokens.length} tokens on {chain.name}
              <ArrowRight
                size={16}
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

interface TokenBandProps {
  symbol: string;
  name: string;
  decimals: number;
  address: string;
  shade: boolean;
}

function TokenBand({ symbol, name, decimals, address, shade }: TokenBandProps) {
  const [copied, copy] = useCopyToClipboard(address);

  return (
    <div
      className={cn(
        "grid min-h-[76px] grid-cols-[72px_1fr_auto] items-center gap-4 px-5 py-3 md:grid-cols-[96px_1fr_auto]",
        shade ? "bg-w3-ground" : "bg-w3-tone-2",
      )}
    >
      <span className="text-[20px] font-medium tabular-nums text-w3-ink">{symbol}</span>
      <span className="min-w-0">
        <span className="block truncate text-[18px] font-medium text-w3-ink">{name}</span>
        <span className="block text-[13px] text-w3-ink-soft">{decimals} decimals</span>
      </span>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${symbol} address`}
        className="flex items-center gap-2 text-w3-ink-soft transition-colors hover:text-w3-ink"
      >
        <code className="hidden text-[14px] sm:inline">
          {address.slice(0, 8)}…{address.slice(-6)}
        </code>
        {copied ? (
          <Check size={16} className="text-w3-accent" aria-hidden />
        ) : (
          <Copy size={16} aria-hidden />
        )}
      </button>
    </div>
  );
}
