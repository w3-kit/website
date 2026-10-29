import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { useReveal } from "../../../shared/lib/use-reveal";

type TxState = "pending" | "ready" | "confirmed";

// One swap at the rate the hero's TokenSwap shows: 0.5 ETH × 1,917.5 = 958.75 USDC.
const SWAP = {
  title: "Swap 0.5 ETH for 958.75 USDC",
  meta: "Base · 0x8f3a…c21d",
  block: "21,904,113",
  explorer: "https://basescan.org",
};

const ROWS: { state: TxState; word: string; live?: boolean }[] = [
  { state: "pending", word: "Arrives" },
  { state: "ready", word: "Asks", live: true },
  { state: "confirmed", word: "Settles" },
];

export function StatesSection() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="states" aria-labelledby="states-title" className="px-4 py-24 md:px-10 md:py-40">
      <div ref={ref} className="grid gap-y-14 md:grid-cols-12 md:gap-x-6">
        <h2
          id="states-title"
          className="text-w3-statement font-medium text-w3-ink md:col-span-6 md:col-start-4"
        >
          Every state of a transaction, handled.
        </h2>
        {ROWS.map((row) => (
          <StateRow key={row.state} {...row} />
        ))}
      </div>
    </section>
  );
}

function StateRow({ state, word, live }: { state: TxState; word: string; live?: boolean }) {
  const [current, setCurrent] = useState(state);

  return (
    <div className="grid gap-2.5 md:col-span-12 md:grid-cols-12 md:gap-x-6">
      <p className="order-2 text-[17px] text-w3-ink-soft md:order-none md:col-span-3 md:self-center md:text-right md:text-[22px]">
        {word}
      </p>
      <div className="min-w-0 md:col-span-6">
        <div
          data-ui
          className="flex flex-wrap items-center gap-4 rounded-xl border border-w3-tone-2 bg-w3-ground p-4 sm:flex-nowrap"
        >
          <span className="relative flex h-10 w-[68px] shrink-0">
            <span className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full bg-w3-ink text-[12px] font-semibold text-w3-ground">
              ETH
            </span>
            <span className="absolute left-7 flex h-10 w-10 items-center justify-center rounded-full border-2 border-w3-ground bg-w3-tone-2 text-[11px] font-semibold text-w3-ink">
              USDC
            </span>
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[15px] font-medium text-w3-ink">{SWAP.title}</span>
            <span className="block text-[13px] text-w3-ink-soft">{SWAP.meta}</span>
          </span>
          <TxStatus state={current} onConfirm={live ? () => setCurrent("confirmed") : undefined} />
          {live && current === "confirmed" && (
            <button
              type="button"
              onClick={() => setCurrent("ready")}
              className="text-[13px] text-w3-ink-soft underline underline-offset-2 hover:text-w3-ink"
            >
              Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function TxStatus({ state, onConfirm }: { state: TxState; onConfirm?: () => void }) {
  if (state === "pending") {
    return (
      <span className="flex items-center gap-2 text-[13px] text-w3-ink-soft">
        <Loader2 size={14} className="animate-spin" aria-hidden />
        Waiting for signature
      </span>
    );
  }
  if (state === "ready") {
    return (
      <span className="flex gap-2">
        <button
          type="button"
          className="h-9 rounded-lg border border-w3-tone-2 px-3 text-[13px] font-medium text-w3-ink hover:bg-w3-tone"
        >
          Reject
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="w3-press h-9 rounded-lg bg-w3-accent px-3 text-[13px] font-medium text-w3-on-accent hover:bg-w3-accent-hover"
        >
          Confirm swap
        </button>
      </span>
    );
  }
  return (
    <span className="flex items-center gap-2 text-[13px] text-w3-ink">
      <Check size={14} className="text-w3-accent" aria-hidden />
      Block {SWAP.block}
      <a
        href={SWAP.explorer}
        className="text-w3-accent underline-offset-2 hover:underline"
        target="_blank"
        rel="noreferrer"
      >
        BaseScan
      </a>
    </span>
  );
}
