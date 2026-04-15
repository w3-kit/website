import { Wallet, ArrowLeftRight, Image, Database, Wrench } from "lucide-react";
import { Badge } from "../../../shared/ui/badge";
import { getSectionUrl } from "../../../shared/lib/urls";
import type { ComponentMeta, ComponentCategory } from "../model/types";

const categoryConfig: Record<ComponentCategory, { label: string; icon: typeof Wallet }> = {
  wallet: { label: "Wallet", icon: Wallet },
  defi: { label: "DeFi", icon: ArrowLeftRight },
  nft: { label: "NFT", icon: Image },
  data: { label: "Data", icon: Database },
  utility: { label: "Utility", icon: Wrench },
};

interface ComponentCardProps {
  component: ComponentMeta;
}

export function ComponentCard({ component }: ComponentCardProps) {
  const config = categoryConfig[component.category];
  const Icon = config.icon;

  return (
    <a
      href={`${getSectionUrl("ui")}/${component.id}`}
      className="group flex flex-col gap-3 rounded-xl p-5 transition-all hover:translate-y-[-2px]"
      style={{
        background: "var(--w3-glass-bg)",
        border: "1px solid var(--w3-glass-border)",
        boxShadow: "var(--w3-glass-shadow)",
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{ background: "var(--w3-accent-subtle)" }}
        >
          <Icon size={18} style={{ color: "var(--w3-accent)" }} />
        </div>
        <Badge variant="outline" className="text-[10px]">
          {config.label}
        </Badge>
      </div>

      {/* Name */}
      <h3
        className="text-sm font-semibold tracking-tight"
        style={{ color: "var(--w3-gray-900)" }}
      >
        {component.name}
      </h3>

      {/* Description */}
      <p
        className="line-clamp-2 text-[13px] leading-relaxed"
        style={{ color: "var(--w3-gray-600)" }}
      >
        {component.description}
      </p>

      {/* Tags */}
      <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
        {component.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-md px-1.5 py-0.5 text-[10px]"
            style={{
              background: "var(--w3-surface-elevated)",
              color: "var(--w3-gray-600)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}
