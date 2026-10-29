import type React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import type { Components } from "react-markdown";

interface MarkdownRendererProps {
  content: string;
}

function isBlockCode(props: Record<string, unknown>): boolean {
  return typeof props.className === "string" && props.className.startsWith("language-");
}

const components: Components = {
  h1: ({ children, ...props }: React.ComponentPropsWithoutRef<"h1">) => (
    <h1 {...props} className="mb-8 scroll-mt-[104px] text-w3-title font-medium text-w3-ink">
      {children}
    </h1>
  ),

  h2: ({ children, ...props }: React.ComponentPropsWithoutRef<"h2">) => (
    <h2
      {...props}
      className="mb-4 mt-16 scroll-mt-[104px] text-w3-statement font-medium text-w3-ink"
    >
      {children}
    </h2>
  ),

  h3: ({ children, ...props }: React.ComponentPropsWithoutRef<"h3">) => (
    <h3
      {...props}
      className="mb-3 mt-10 scroll-mt-[104px] text-[22px] font-medium tracking-[-0.01em] text-w3-ink"
    >
      {children}
    </h3>
  ),

  h4: ({ children, ...props }: React.ComponentPropsWithoutRef<"h4">) => (
    <h4 {...props} className="mb-2 mt-8 scroll-mt-[104px] text-w3-body font-medium text-w3-ink">
      {children}
    </h4>
  ),

  p: ({ children, ...props }: React.ComponentPropsWithoutRef<"p">) => (
    <p {...props} className="mb-5 text-w3-body text-w3-ink">
      {children}
    </p>
  ),

  a: ({ children, ...props }: React.ComponentPropsWithoutRef<"a">) => (
    <a
      {...props}
      className="text-w3-accent underline decoration-w3-accent/30 underline-offset-4 hover:decoration-w3-accent"
    >
      {children}
    </a>
  ),

  ul: ({ children, ...props }: React.ComponentPropsWithoutRef<"ul">) => (
    <ul {...props} className="mb-5 list-disc pl-6 marker:text-w3-ink-soft">
      {children}
    </ul>
  ),

  ol: ({ children, ...props }: React.ComponentPropsWithoutRef<"ol">) => (
    <ol {...props} className="mb-5 list-decimal pl-6 marker:text-w3-ink-soft">
      {children}
    </ol>
  ),

  li: ({ children, ...props }: React.ComponentPropsWithoutRef<"li">) => (
    <li {...props} className="mb-1.5 text-w3-body text-w3-ink">
      {children}
    </li>
  ),

  blockquote: ({ children, ...props }: React.ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote {...props} className="mb-5 bg-w3-tone px-6 pb-1 pt-5 [&_p]:mb-4">
      {children}
    </blockquote>
  ),

  code: ({ children, ...props }: React.ComponentPropsWithoutRef<"code">) => {
    if (isBlockCode(props)) {
      return <code {...props}>{children}</code>;
    }
    return (
      <code {...props} className="bg-w3-tone px-1.5 py-0.5 text-[0.85em] text-w3-ink">
        {children}
      </code>
    );
  },

  pre: ({ children, ...props }: React.ComponentPropsWithoutRef<"pre">) => (
    <pre
      {...props}
      className="mb-6 overflow-x-auto bg-w3-tone px-6 py-5 text-[14px] leading-[1.7] text-w3-ink"
    >
      {children}
    </pre>
  ),

  table: ({ children, ...props }: React.ComponentPropsWithoutRef<"table">) => (
    <div className="mb-6 overflow-x-auto">
      <table {...props} className="w-full border-collapse text-w3-small">
        {children}
      </table>
    </div>
  ),

  th: ({ children, ...props }: React.ComponentPropsWithoutRef<"th">) => (
    <th
      {...props}
      className="border-b border-w3-tone-2 py-3 pr-6 text-left font-medium text-w3-ink-soft"
    >
      {children}
    </th>
  ),

  td: ({ children, ...props }: React.ComponentPropsWithoutRef<"td">) => (
    <td {...props} className="border-b border-w3-tone-2 py-3 pr-6 align-top text-w3-ink">
      {children}
    </td>
  ),

  hr: (props: React.ComponentPropsWithoutRef<"hr">) => <hr {...props} className="my-16 border-0" />,

  img: (props: React.ComponentPropsWithoutRef<"img">) => (
    <img {...props} alt={props.alt ?? ""} className="max-w-full" />
  ),
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="docs-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
