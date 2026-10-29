import { useMemo } from "react";
import { useParams } from "@tanstack/react-router";
import { DocsContentLayout } from "../../../widgets/docs-content-layout";
import { DocsNotFound } from "../../../shared/ui/docs-not-found";
import { DocsShell } from "../../../widgets/docs-shell";
import { MarkdownRenderer } from "../../../widgets/markdown-renderer";
import { extractHeadings } from "../../../widgets/markdown-renderer/extract-headings";
import { useGuide } from "../../../entities/guide";
import { AuthorBadge } from "../../../shared/ui/author-badge";

const WORDS_PER_MINUTE = 200;

export function GuideDetailPage() {
  const { guideSlug = "" } = useParams({ strict: false });
  const guide = useGuide(guideSlug);

  if (!guide) {
    return (
      <DocsShell>
        <DocsNotFound entityType="Guide" slug={guideSlug} />
      </DocsShell>
    );
  }
  return <Guide guide={guide} slug={guideSlug} />;
}

function Guide({ guide, slug }: { guide: NonNullable<ReturnType<typeof useGuide>>; slug: string }) {
  // The guide's own "# Title" becomes the page title, so the reading time can sit under it.
  const [, title = "", body = guide.content] = guide.content.match(/^#\s+(.+)\n([\s\S]*)$/) ?? [];
  const headings = useMemo(() => extractHeadings(body), [body]);
  const minutes = Math.max(1, Math.ceil(guide.content.split(/\s+/).length / WORDS_PER_MINUTE));

  return (
    <DocsContentLayout activeSlug={slug} headings={headings}>
      {/* Long guide titles carry a subtitle after a dash; it reads better as a line under the title. */}
      {title && <h1 className="text-w3-title font-medium">{title.split(" — ")[0]}</h1>}
      {title.includes(" — ") && (
        <p className="mt-4 text-w3-statement text-w3-ink-soft">{title.split(" — ")[1]}</p>
      )}
      <div className="mb-10 mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-w3-small text-w3-ink-soft">
        <span>{minutes} min read</span>
        <AuthorBadge author={guide.author} />
      </div>
      <MarkdownRenderer content={body} />
    </DocsContentLayout>
  );
}
