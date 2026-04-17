import { useParams } from "@tanstack/react-router";
import { DocsShell } from "../../../widgets/docs-shell";
import { DocsSidebar } from "../../../widgets/docs-sidebar";
import { MobileSidebar } from "../../../widgets/docs-sidebar/mobile-sidebar";
import { DocsToc } from "../../../widgets/docs-toc";
import { MarkdownRenderer } from "../../../widgets/markdown-renderer";
import { extractHeadings } from "../../../widgets/markdown-renderer/extract-headings";
import { Breadcrumbs } from "../../../shared/ui/breadcrumbs";
import { DocsPrevNext } from "../../../widgets/docs-prev-next";
import { docsNavSections, allDocNavItems } from "../../../entities/guide/model/docs-nav.gen";
import { docContentMap } from "../../../entities/guide/model/doc-content.gen";
import { getSectionUrl } from "../../../shared/lib/urls";

function getItemHref(item: { slug: string; type: string }): string {
  const base = getSectionUrl("docs");
  if (item.type === "guide") return `${base}/guide/${item.slug}`;
  if (item.type === "recipe") return `${base}/recipe/${item.slug}`;
  return `${base}/${item.slug}`;
}

export function DocPage() {
  const { slug } = useParams({ strict: false });
  const currentSlug = slug ?? "introduction";

  const content = docContentMap[currentSlug];
  const navItem = allDocNavItems.find((item) => item.slug === currentSlug);
  const headings = content ? extractHeadings(content) : [];

  // Compute prev/next
  const currentIndex = allDocNavItems.findIndex((item) => item.slug === currentSlug);
  const prev = currentIndex > 0 ? allDocNavItems[currentIndex - 1] : undefined;
  const next =
    currentIndex < allDocNavItems.length - 1 ? allDocNavItems[currentIndex + 1] : undefined;

  if (!content) {
    return (
      <DocsShell>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h1
              className="mb-2 text-2xl font-semibold"
              style={{ color: "var(--w3-gray-900)" }}
            >
              Page Not Found
            </h1>
            <p className="mb-6 text-sm" style={{ color: "var(--w3-gray-600)" }}>
              The page &ldquo;{currentSlug}&rdquo; doesn&apos;t exist yet.
            </p>
            <a
              href={getSectionUrl("docs")}
              className="text-sm font-medium transition-colors hover:underline"
              style={{ color: "var(--w3-accent)" }}
            >
              Back to docs
            </a>
          </div>
        </div>
      </DocsShell>
    );
  }

  // Find section name for breadcrumbs
  const sectionName = navItem?.section ?? "Docs";

  return (
    <DocsShell>
      <div className="mx-auto flex h-[calc(100vh-57px)] max-w-[1440px] gap-0 px-6 md:px-8 lg:px-12">
        {/* Left sidebar - desktop */}
        <DocsSidebar sections={docsNavSections} activeSlug={currentSlug} />

        {/* Main content */}
        <div
          data-docs-content
          className="min-w-0 flex-1 overflow-y-auto py-8 md:border-l md:px-10"
          style={{ borderColor: "var(--w3-border-subtle)" }}
        >
          {/* Mobile sidebar */}
          <MobileSidebar sections={docsNavSections} activeSlug={currentSlug} />

          <Breadcrumbs
            items={[
              { label: "Docs", href: getSectionUrl("docs") },
              { label: sectionName },
              { label: navItem?.label ?? currentSlug },
            ]}
          />

          <MarkdownRenderer content={content} />

          <DocsPrevNext
            prev={prev ? { label: prev.label, href: getItemHref(prev) } : undefined}
            next={next ? { label: next.label, href: getItemHref(next) } : undefined}
          />
        </div>

        {/* Right TOC */}
        <DocsToc headings={headings} />
      </div>
    </DocsShell>
  );
}
