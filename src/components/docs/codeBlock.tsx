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
    <div className="relative group ">
      <pre className="rounded-lg border max-h-[600px] max-w-full border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 p-3 sm:p-4 overflow-y-auto">
        <code className="text-sm sm:text-base text-gray-800 dark:text-gray-200 whitespace-pre">
          {code}
        </code>
      </pre>
      <button
        onClick={() => handleCopy(code, id)}
        className="absolute right-2 top-2 p-2 bg-gray-200 dark:bg-gray-700 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-gray-300 dark:hover:bg-gray-600"
        title={copiedId === id ? "Copied!" : "Copy code"}
      >
        {copiedId === id ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        )}
      </button>
    </div>
  );
};
