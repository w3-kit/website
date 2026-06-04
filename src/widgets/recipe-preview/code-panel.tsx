import { useHighlight } from "../code-block/use-highlight";
import type { RecipeSnippet } from "./snippets";

export function CodePanel({ snippet }: { snippet: RecipeSnippet }) {
  const html = useHighlight(snippet.code.trim(), snippet.language);

  return (
    <div className="overflow-x-auto bg-w3-gray-200 p-5 font-mono text-[13px] leading-relaxed">
      {html ? (
        <div
          className="[&_pre]:!bg-transparent [&_pre]:!p-0 [&_code]:!bg-transparent"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="text-w3-gray-700">
          <code>{snippet.code.trim()}</code>
        </pre>
      )}
    </div>
  );
}
