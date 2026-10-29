import { useMemo } from "react";
import { useParams } from "@tanstack/react-router";
import { DocsContentLayout } from "../../../widgets/docs-content-layout";
import { NotFound } from "../../../shared/ui/not-found";
import { getSectionUrl } from "../../../shared/lib/urls";
import { DocsShell } from "../../../widgets/docs-shell";
import { MarkdownRenderer } from "../../../widgets/markdown-renderer";
import { extractHeadings } from "../../../widgets/markdown-renderer/extract-headings";
import { useGuide } from "../../../entities/guide";
import { AuthorBadge } from "../../../shared/ui/author-badge";

const WORDS_PER_MINUTE = 200;

const DOCS_HOME = { href: getSectionUrl("docs"), label: "All docs" };
export function GuideDetailPage() {
  const { guideSlug = "" } = useParams({ strict: false });
  const guide = useGuide(guideSlug);

  if (!guide) {
    return (
      <DocsShell>
        <NotFound kind="guide" id={guideSlug} back={DOCS_HOME} />
      </DocsShell>
    );
  }
  return <Guide guide={guide} slug={guideSlug} />;
}

function Guide({ guide, slug }: { guide: NonNullable<ReturnType<typeof useGuide>>; slug: string }) {
  // The guide's own "# Title" becomes the page title, so the reading time can sit under it.
  const [, title = "", body = guide.content] = guide.content.match(/^#\s+(.+)\n([\s\S]*)$/) ?? [];
  const [name, subtitle] = title.split(" — ");
  const headings = useMemo(() => extractHeadings(body), [body]);
  const minutes = Math.max(1, Math.ceil(guide.content.split(/\s+/).length / WORDS_PER_MINUTE));

  return (
    <DocsContentLayout activeSlug={slug} headings={headings}>
      {/* Long guide titles carry a subtitle after a dash; it reads better as a line under the title. */}
      {name && <h1 className="text-w3-title font-medium">{name}</h1>}
      {subtitle && <p className="mt-4 text-w3-statement text-w3-ink-soft">{subtitle}</p>}
      <div className="mb-10 mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-w3-small text-w3-ink-soft">
        <span>{minutes} min read</span>
        <AuthorBadge author={guide.author} />
      </div>
      <MarkdownRenderer content={body} />
    </DocsContentLayout>
  );
}
