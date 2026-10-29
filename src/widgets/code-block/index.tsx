import { Check, Copy, FileCode } from "lucide-react";
import { useCopyToClipboard } from "../../shared/lib/use-copy-to-clipboard";
import { useHighlight } from "./use-highlight";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language = "tsx", filename }: CodeBlockProps) {
  const html = useHighlight(code.trim(), language);
  const [copied, handleCopy] = useCopyToClipboard(code.trim());

  return (
    <div className="relative overflow-hidden bg-w3-tone">
      {filename && (
        <div className="flex items-center gap-2 bg-w3-tone-2 px-5 py-2.5 text-[13px] text-w3-ink-soft">
          <FileCode size={14} />
          <span>{filename}</span>
        </div>
      )}

      <div className="relative overflow-x-auto px-5 py-5 pr-14">
        {html ? (
          <div
            className="font-mono text-[14px] leading-[1.7] [&_code]:!bg-transparent [&_pre]:!bg-transparent [&_pre]:!p-0"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <pre className="font-mono text-[14px] leading-[1.7] text-w3-ink">
            <code>{code.trim()}</code>
          </pre>
        )}
      </div>

      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy code"}
        className={`absolute right-3 top-3 p-2 transition-colors hover:text-w3-ink ${
          copied ? "text-w3-accent" : "text-w3-ink-soft"
        } ${filename ? "top-12" : ""}`}
      >
        {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
      </button>
    </div>
  );
}
