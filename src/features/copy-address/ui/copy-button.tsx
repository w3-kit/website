import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "../../../shared/lib/use-copy-to-clipboard";

export function CopyButton({ value, label }: { value: string; label?: string }) {
  const [copied, copy] = useCopyToClipboard(value);
  return (
    <button
      type="button"
      aria-label={`Copy ${label ?? value}`}
      onClick={copy}
      className={`inline-flex items-center gap-1.5 rounded border border-w3-border-subtle bg-w3-surface-elevated px-2 py-1 font-mono text-[11px] transition-colors hover:border-w3-accent ${
        copied ? "text-w3-accent" : "text-w3-gray-700"
      }`}
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
