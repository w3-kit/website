import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "../../../shared/lib/use-copy-to-clipboard";

export function CopyButton({ value, label }: { value: string; label?: string }) {
  const [copied, copy] = useCopyToClipboard(value);
  return (
    <button
      type="button"
      aria-label={`Copy ${label ?? value}`}
      onClick={copy}
      className={`inline-flex h-10 shrink-0 items-center gap-2 px-3 text-w3-small transition-colors hover:text-w3-ink ${
        copied ? "text-w3-accent" : "text-w3-ink-soft"
      }`}
    >
      {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
