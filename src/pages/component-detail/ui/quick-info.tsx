import { Check, Copy, ExternalLink } from "lucide-react";
import { useCopyToClipboard } from "../../../shared/lib/use-copy-to-clipboard";
import type { ComponentMeta } from "../../../entities/component";

interface QuickInfoProps {
  component: ComponentMeta;
}

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, handleCopy] = useCopyToClipboard(value);

  return (
    <div className="flex flex-col gap-1.5">
      <span
        className="text-[10px] font-semibold uppercase tracking-wider"
        style={{ color: "var(--w3-gray-500)" }}
      >
        {label}
      </span>
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-xs transition-all active:scale-95"
        style={{
          background: "var(--w3-surface-elevated)",
          color: "var(--w3-gray-700)",
          fontFamily: '"Geist Mono", ui-monospace, monospace',
        }}
      >
        <span className="min-w-0 truncate">{value}</span>
        {copied ? (
          <Check size={10} className="shrink-0" style={{ color: "var(--w3-accent)" }} />
        ) : (
          <Copy size={10} className="shrink-0" style={{ color: "var(--w3-gray-400)" }} />
        )}
      </button>
    </div>
  );
}

export function QuickInfo({ component }: QuickInfoProps) {
  return (
    <div className="sticky top-20 flex flex-col gap-6 py-8">
      <span className="text-sm font-semibold" style={{ color: "var(--w3-gray-900)" }}>
        Quick Info
      </span>

      <CopyRow label="Install" value={`npx w3-kit add ${component.id}`} />
      <CopyRow label="Import" value={`import { ... } from "${component.importPath}"`} />

      <div className="flex flex-col gap-1.5">
        <span
          className="text-[10px] font-semibold uppercase tracking-wider"
          style={{ color: "var(--w3-gray-500)" }}
        >
          Source
        </span>
        <a
          href={component.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs transition-colors hover:underline"
          style={{ color: "var(--w3-accent)" }}
        >
          View on GitHub
          <ExternalLink size={10} />
        </a>
      </div>

      <div className="flex flex-col gap-1.5">
        <span
          className="text-[10px] font-semibold uppercase tracking-wider"
          style={{ color: "var(--w3-gray-500)" }}
        >
          Props
        </span>
        <span className="text-xs" style={{ color: "var(--w3-gray-700)" }}>
          {component.props.length} props ({component.props.filter((p) => p.required).length} required)
        </span>
      </div>
    </div>
  );
}
