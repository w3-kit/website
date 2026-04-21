import { useCopyToClipboard } from "../../../shared/lib/use-copy-to-clipboard";
import { ArrowRight, Check, Copy } from "lucide-react";

export function CtaSection() {
  const [copied, copy] = useCopyToClipboard("npx w3-kit init");

  return (
    <section className="grid grid-cols-2 items-center gap-20 px-10 py-[100px]">
      {/* Left — headline */}
      <div>
        <div className="font-mono text-[11px] text-w3-gray-500">06 — SHIP IT</div>
        <h2 className="mt-3 mb-6 text-[56px] font-medium leading-[0.98] tracking-[-0.04em]">
          Your users don't
          <br />
          care what's under
          <br />
          the hood.{" "}
          <span className="font-serif-display italic text-w3-accent">ship.</span>
        </h2>
        <p className="m-0 max-w-[420px] text-[15px] leading-relaxed text-w3-gray-600">
          Open source, MIT, no accounts, no keys, no upsells. Install the CLI and
          render real UI in ninety seconds.
        </p>
      </div>

      {/* Right — terminal mockup */}
      <div className="overflow-hidden rounded-sm border border-w3-border-standard bg-w3-surface">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-w3-border-subtle px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-[#dc2626]" />
          <span className="h-2 w-2 rounded-full bg-[#eab308]" />
          <span className="h-2 w-2 rounded-full bg-[#16a34a]" />
          <span className="ml-2.5 font-mono text-[11px] text-w3-gray-500">~/my-dapp</span>
        </div>
        {/* Terminal content */}
        <div className="p-6 font-mono text-[13px] leading-[1.9]">
          <div>
            <span className="text-w3-gray-500">$</span> npx w3-kit init
          </div>
          <div className="text-w3-gray-500">✓ Installed 54 components</div>
          <div className="text-w3-gray-500">✓ Registry typed & ready</div>
          <div>
            <span className="text-w3-gray-500">$</span> npm run dev
          </div>
          <div className="text-w3-accent">▸ Local: http://localhost:3000</div>
        </div>
        {/* Action buttons */}
        <div className="flex gap-2.5 border-t border-w3-border-subtle p-4">
          <a
            href="/docs"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-w3-gray-900 px-[18px] py-[11px] text-sm font-medium text-w3-gray-100 transition-all hover:-translate-y-px hover:shadow-[0_10px_24px_-10px_rgba(85,84,217,0.5),0_2px_4px_rgba(0,0,0,0.08)] active:translate-y-0"
          >
            Read the docs <ArrowRight size={14} />
          </a>
          <button
            onClick={copy}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-w3-border-standard px-[18px] py-[11px] text-sm font-medium transition-all hover:-translate-y-px hover:border-w3-gray-600 hover:bg-w3-surface-alt active:translate-y-0"
          >
            {copied ? (
              <>
                <Check size={13} /> Copied
              </>
            ) : (
              <>
                <Copy size={13} /> Copy
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
