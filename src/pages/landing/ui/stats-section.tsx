const STATS = [
  { big: "1.4k", sml: "GitHub stars", sub: "+120 this week" },
  { big: "48k", sml: "npm downloads / week", sub: "across @w3-kit/*" },
  { big: "312", sml: "projects building", sub: "tracked on-chain" },
  { big: "99.2%", sml: "type coverage", sub: "strict mode, always" },
];

export function StatsSection() {
  return (
    <section className="border-b border-w3-border-subtle bg-w3-surface-alt px-10 py-16">
      <div className="grid grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={i}
            className="px-6"
            style={{ borderLeft: i > 0 ? "1px solid var(--w3-border-subtle)" : "none" }}
          >
            <div className="font-mono text-[52px] font-medium tracking-[-0.04em] text-w3-gray-900">
              {s.big}
            </div>
            <div className="mt-1 text-[13px] text-w3-gray-800">{s.sml}</div>
            <div className="mt-0.5 text-[11px] text-w3-gray-500">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
