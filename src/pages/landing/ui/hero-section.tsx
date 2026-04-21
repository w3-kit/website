import { useCopyToClipboard } from "../../../shared/lib/use-copy-to-clipboard";
import {
  ArrowRight,
  Check,
  Copy,
} from "lucide-react";

export function HeroSection() {
  const [copied, copy] = useCopyToClipboard("npx w3-kit init");

  return (
    <section className="grid grid-cols-2 items-end gap-20 border-b border-w3-border-subtle px-10 pb-12 pt-[88px]">
      {/* Left — headline */}
      <div>
        <div className="mb-8 font-mono text-[11px] tracking-[0.1em] text-w3-gray-500">
          01 — OVERVIEW / <span className="text-w3-accent">TOOLKIT</span>
        </div>
        <h1 className="m-0 text-[88px] font-medium leading-[0.92] tracking-[-0.05em] text-w3-gray-900">
          The web3
          <br />
          developer
          <br />
          <span className="font-serif-display italic text-w3-accent">toolkit,</span>{" "}
          assembled.
        </h1>
        <div className="mt-10 flex items-center gap-3">
          <a
            href="/docs"
            className="inline-flex items-center gap-2 rounded-full bg-w3-gray-900 px-[18px] py-[11px] text-sm font-medium text-w3-gray-100 transition-all hover:-translate-y-px hover:shadow-[0_10px_24px_-10px_rgba(85,84,217,0.5),0_2px_4px_rgba(0,0,0,0.08)] active:translate-y-0"
          >
            Get started <ArrowRight size={14} />
          </a>
          <button
            onClick={copy}
            className="inline-flex items-center gap-2.5 rounded-full border border-dashed border-w3-border-standard px-4 py-[11px] font-mono text-[13px] transition-colors hover:border-w3-accent hover:bg-w3-accent-wash"
          >
            <span className="text-w3-gray-500">$</span>
            npx w3-kit init
            {copied ? (
              <Check size={13} className="text-w3-accent" />
            ) : (
              <Copy size={13} className="text-w3-gray-500" />
            )}
          </button>
        </div>
      </div>

      {/* Right — description + stats */}
      <div className="flex flex-col gap-4">
        <p className="m-0 max-w-[440px] text-[17px] leading-relaxed text-w3-gray-800">
          Fifty-plus typed components. Fourteen chains, eighteen tokens, one CLI.
          Ship your dApp this afternoon, not next quarter.
        </p>
        <div className="mt-4 flex gap-9 border-t border-w3-border-subtle pt-5">
          {[
            { n: "54", l: "components" },
            { n: "14", l: "chains" },
            { n: "18", l: "tokens" },
            { n: "MIT", l: "license" },
          ].map((x) => (
            <div key={x.l}>
              <div className="text-[28px] font-medium tracking-[-0.03em]">{x.n}</div>
              <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-w3-gray-500">
                {x.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
