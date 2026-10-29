import { useMemo } from "react";
import { useParams } from "@tanstack/react-router";
import { DocsContentLayout } from "../../../widgets/docs-content-layout";
import { NotFound } from "../../../shared/ui/not-found";
import { DocsShell } from "../../../widgets/docs-shell";
import { MarkdownRenderer } from "../../../widgets/markdown-renderer";
import { extractHeadings } from "../../../widgets/markdown-renderer/extract-headings";
import { DocsPrevNext } from "../../../widgets/docs-prev-next";
import { allDocNavItems } from "../../../entities/guide/model/docs-nav.gen";
import { docContentMap } from "../../../entities/guide/model/doc-content.gen";
import { getDocItemHref, getSectionUrl } from "../../../shared/lib/urls";

const DOCS_HOME = { href: getSectionUrl("docs"), label: "All docs" };
export function DocPage() {
  const { slug } = useParams({ strict: false });
  const currentSlug = slug ?? "introduction";

  const content = docContentMap[currentSlug];
  const headings = useMemo(() => (content ? extractHeadings(content) : []), [content]);

  const currentIndex = allDocNavItems.findIndex((item) => item.slug === currentSlug);
  const prev = currentIndex > 0 ? allDocNavItems[currentIndex - 1] : undefined;
  const next =
    currentIndex < allDocNavItems.length - 1 ? allDocNavItems[currentIndex + 1] : undefined;

  if (!content) {
    return (
      <DocsShell>
        <NotFound kind="page" id={currentSlug} back={DOCS_HOME} />
      </DocsShell>
    );
  }

  return (
    <DocsContentLayout activeSlug={currentSlug} headings={headings}>
      <MarkdownRenderer content={content} />

      <DocsPrevNext
        prev={prev ? { label: prev.label, href: getDocItemHref(prev) } : undefined}
        next={next ? { label: next.label, href: getDocItemHref(next) } : undefined}
      />
    </DocsContentLayout>
  );
}
