import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "../../../shared/lib/use-copy-to-clipboard";
import { cn } from "../../../shared/lib/utils";

/** The purple button that shows a shell command and copies it. */
export function CopyCommand({ command, className }: { command: string; className?: string }) {
  const [copied, copy] = useCopyToClipboard(command);
  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "w3-press inline-flex h-12 max-w-full items-center gap-3 bg-w3-accent px-5 text-[15px] text-w3-on-accent hover:bg-w3-accent-hover",
        className,
      )}
    >
      <code className="truncate">{command}</code>
      {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
      <span className="sr-only">{copied ? "Copied" : "Copy command"}</span>
    </button>
  );
}
