import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  id: string;
}

export const CodeBlock = ({ code, id }: CodeBlockProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="relative group w-full">
      <pre className="rounded-lg border max-h-[600px] border-border bg-muted p-3 sm:p-4 overflow-y-auto">
        <code className="text-sm sm:text-base text-foreground whitespace-pre">
          {code}
        </code>
      </pre>
      <button
        onClick={() => handleCopy(code, id)}
        className="absolute right-2 top-2 p-2 bg-muted rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-accent"
        title={copiedId === id ? "Copied!" : "Copy code"}
      >
        {copiedId === id ? (
          <Check className="h-4 w-4 text-success" />
        ) : (
          <Copy className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
    </div>
  );
};
