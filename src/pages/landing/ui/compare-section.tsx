import { Check } from "lucide-react";

type Val = boolean | "partial";

const ROWS: [string, Val, Val, Val, Val][] = [
  ["Typed components", true, "partial", false, "partial"],
  ["CLI scaffolding", true, false, false, true],
  ["Multi-chain data", true, true, "partial", false],
  ["Recipes & guides", true, "partial", false, false],
  ["Framework agnostic", true, true, false, "partial"],
  ["Open source (MIT)", true, false, true, true],
  ["Zero lock-in", true, "partial", false, true],
];

const COLS = ["w3-kit", "Thirdweb", "RainbowKit", "Wagmi"];

function Cell({ v, primary }: { v: Val; primary: boolean }) {
  if (v === true) return <Check size={15} className={primary ? "text-w3-accent" : "text-w3-gray-600"} />;
  if (v === "partial") return <span className="text-lg text-w3-gray-500">~</span>;
  return <span className="text-[13px] text-w3-gray-500">—</span>;
}

export function CompareSection() {
  return (
    <section className="border-b border-w3-border-subtle px-10 py-16">
      <div className="grid grid-cols-[320px_1fr] gap-[60px]">
        <div>
          <div className="font-mono text-[11px] text-w3-gray-500">04 — WHY W3-KIT</div>
          <h2 className="mt-2 mb-4 text-[32px] font-medium leading-tight tracking-[-0.03em]">
            Others assume.
            <br />
            We ship it.
          </h2>
          <p className="m-0 text-sm leading-relaxed text-w3-gray-600">
            Most web3 libraries hand you primitives. w3-kit hands you the whole
            kitchen — typed, themed, and ready to render.
          </p>
        </div>

        <div className="overflow-hidden rounded-sm border border-w3-border-subtle">
          {/* Header */}
          <div className="grid grid-cols-[1.6fr_repeat(4,1fr)] items-center border-b border-w3-border-subtle bg-w3-surface-alt">
            <div className="px-4 py-3 font-mono text-[10px] text-w3-gray-500">FEATURE</div>
            {COLS.map((c, i) => (
              <div
                key={c}
                className="border-l border-w3-border-subtle px-4 py-3 text-center font-mono text-xs font-medium"
                style={{ color: i === 0 ? "var(--w3-accent)" : "var(--w3-gray-800)" }}
              >
                {c}
              </div>
            ))}
          </div>

          {/* Rows */}
          {ROWS.map((r, ri) => (
            <div
              key={ri}
              className="grid grid-cols-[1.6fr_repeat(4,1fr)] items-center"
              style={{ borderBottom: ri < ROWS.length - 1 ? "1px solid var(--w3-border-subtle)" : "none" }}
            >
              <div className="px-4 py-3.5 text-sm">{r[0]}</div>
              {r.slice(1).map((v, i) => (
                <div
                  key={i}
                  className="flex justify-center border-l border-w3-border-subtle px-4 py-3.5"
                  style={{ background: i === 0 ? "var(--w3-accent-wash)" : "transparent" }}
                >
                  <Cell v={v as Val} primary={i === 0} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
