import { Badge } from "../../../shared/ui/badge";
import type { ComponentMeta, ComponentCategory } from "../../../entities/component";

const categoryLabels: Record<ComponentCategory, string> = {
  wallet: "Wallet",
  defi: "DeFi",
  nft: "NFT",
  data: "Data",
  utility: "Utility",
};

interface ComponentHeaderProps {
  component: ComponentMeta;
}

export function ComponentHeader({ component }: ComponentHeaderProps) {
  return (
    <div className="mb-10">
      <div className="mb-3 flex items-center gap-2">
        <Badge variant="outline" className="text-[10px]">
          {categoryLabels[component.category]}
        </Badge>
        {component.hasPreview && (
          <Badge variant="secondary" className="text-[10px]">
            Live Preview
          </Badge>
        )}
      </div>

      <h1
        className="mb-3 text-3xl font-semibold tracking-tight"
        style={{ color: "var(--w3-gray-900)" }}
      >
        {component.name}
      </h1>

      <p className="max-w-xl text-base" style={{ color: "var(--w3-gray-600)" }}>
        {component.description}
      </p>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {component.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md px-2 py-0.5 text-xs"
            style={{
              background: "var(--w3-surface-elevated)",
              color: "var(--w3-gray-600)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
