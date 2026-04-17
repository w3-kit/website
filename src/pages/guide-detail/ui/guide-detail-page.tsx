import { useParams } from "@tanstack/react-router";
import { DocsShell } from "../../../widgets/docs-shell";
import { DocsSidebar } from "../../../widgets/docs-sidebar";
import { MobileSidebar } from "../../../widgets/docs-sidebar/mobile-sidebar";
import { DocsToc } from "../../../widgets/docs-toc";
import { MarkdownRenderer } from "../../../widgets/markdown-renderer";
import { extractHeadings } from "../../../widgets/markdown-renderer/extract-headings";
import { Breadcrumbs } from "../../../shared/ui/breadcrumbs";
import { DocsPrevNext } from "../../../widgets/docs-prev-next";
import { docsNavSections } from "../../../entities/guide/model/docs-nav.gen";
import { useGuide } from "../../../entities/guide";
import { getSectionUrl } from "../../../shared/lib/urls";

export function GuideDetailPage() {
  const { guideSlug } = useParams({ strict: false });
  const slug = guideSlug ?? "";
  const guide = useGuide(slug);

  if (!guide) {
    return (
      <DocsShell>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h1
              className="mb-2 text-2xl font-semibold"
              style={{ color: "var(--w3-gray-900)" }}
            >
              Guide Not Found
            </h1>
            <p className="mb-6 text-sm" style={{ color: "var(--w3-gray-600)" }}>
              The guide &ldquo;{slug}&rdquo; doesn&apos;t exist.
            </p>
            <a
              href={getSectionUrl("docs")}
              className="text-sm font-medium hover:underline"
              style={{ color: "var(--w3-accent)" }}
            >
              Back to docs
            </a>
          </div>
        </div>
      </DocsShell>
    );
  }

  const headings = extractHeadings(guide.content);
  const readTime = Math.max(1, Math.ceil(guide.content.split(/\s+/).length / 200));

  return (
    <DocsShell>
      <div className="mx-auto flex h-[calc(100vh-57px)] max-w-[1440px] gap-0 px-6 md:px-8 lg:px-12">
        <DocsSidebar sections={docsNavSections} activeSlug={slug} />

        <div
          data-docs-content
          className="min-w-0 flex-1 overflow-y-auto py-8 md:border-l md:px-10"
          style={{ borderColor: "var(--w3-border-subtle)" }}
        >
          <MobileSidebar sections={docsNavSections} activeSlug={slug} />

          <Breadcrumbs
            items={[
              { label: "Docs", href: getSectionUrl("docs") },
              { label: "Guides" },
              { label: guide.title },
            ]}
          />

          {/* Guide header */}
          <div className="mb-8 flex items-center gap-3">
            <span
              className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
              style={{
                background: "var(--w3-accent-subtle)",
                color: "var(--w3-accent)",
              }}
            >
              {guide.category}
            </span>
            <span className="text-xs" style={{ color: "var(--w3-gray-500)" }}>
              {readTime} min read
            </span>
            {guide.author && (
              <a
                href={`https://github.com/${guide.author}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs transition-colors hover:underline"
                style={{ color: "var(--w3-gray-500)" }}
              >
                <img
                  src={`https://github.com/${guide.author}.png?size=40`}
                  alt={guide.author}
                  className="h-4 w-4 rounded-full"
                />
                {guide.author}
              </a>
            )}
          </div>

          <MarkdownRenderer content={guide.content} />
        </div>

        <DocsToc headings={headings} />
      </div>
    </DocsShell>
  );
}
