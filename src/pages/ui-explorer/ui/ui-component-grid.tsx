import { useState } from "react";
import { SectionContainer } from "../../../shared/ui/section-container";
import { useScrollReveal } from "../../../shared/lib/use-scroll-animation";
import { ComponentCard, componentRegistry, primitivesRegistry } from "../../../entities/component";
import type { ComponentCategory } from "../../../entities/component";

const categories: { label: string; value: ComponentCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Wallet", value: "wallet" },
  { label: "DeFi", value: "defi" },
  { label: "NFT", value: "nft" },
  { label: "Data", value: "data" },
  { label: "Utility", value: "utility" },
];

export function UiComponentGrid() {
  const [active, setActive] = useState<ComponentCategory | "all">("all");
  const gridRef = useScrollReveal({ stagger: 0.06, y: 30 });

  const filtered =
    active === "all"
      ? componentRegistry
      : componentRegistry.filter((c) => c.category === active);

  return (
    <SectionContainer>
      <div id="components" className="scroll-mt-20 pb-24">
        {/* Section header */}
        <div className="mb-8">
          <h2
            className="mb-2 text-2xl font-semibold tracking-tight"
            style={{ color: "var(--w3-gray-900)" }}
          >
            Components
          </h2>
          <p className="text-sm" style={{ color: "var(--w3-gray-600)" }}>
            {componentRegistry.length} domain components built for web3.
          </p>
        </div>

        {/* Category filter */}
        <div className="mb-8 flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActive(cat.value)}
              className="rounded-lg px-3 py-1.5 text-sm font-medium transition-all"
              style={{
                background:
                  active === cat.value
                    ? "var(--w3-accent)"
                    : "var(--w3-surface-elevated)",
                color:
                  active === cat.value ? "#fff" : "var(--w3-gray-700)",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Component grid */}
        <div
          ref={gridRef}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((component) => (
            <div key={component.id} data-reveal>
              <ComponentCard component={component} />
            </div>
          ))}
        </div>

        {/* Primitives section */}
        <div className="mt-20">
          <div className="mb-8">
            <h2
              className="mb-2 text-2xl font-semibold tracking-tight"
              style={{ color: "var(--w3-gray-900)" }}
            >
              Primitives
            </h2>
            <p className="text-sm" style={{ color: "var(--w3-gray-600)" }}>
              {primitivesRegistry.length} base UI building blocks. Accessible, composable, themeable.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {primitivesRegistry.map((p) => (
              <div
                key={p.id}
                className="flex flex-col gap-1 rounded-lg p-4 transition-all"
                style={{
                  background: "var(--w3-glass-inner-bg)",
                  border: "1px solid var(--w3-border-subtle)",
                }}
              >
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--w3-gray-900)" }}
                >
                  {p.name}
                </span>
                <span className="text-xs" style={{ color: "var(--w3-gray-600)" }}>
                  {p.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
