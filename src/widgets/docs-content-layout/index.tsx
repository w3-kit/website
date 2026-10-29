import type { ReactNode } from "react";
import { DocsShell } from "../docs-shell";
import { DocsSidebar } from "../docs-sidebar";
import { DocsToc } from "../docs-toc";
import { docsNavSections } from "../../entities/guide/model/docs-nav.gen";

interface DocsContentLayoutProps {
  activeSlug: string;
  headings: { id: string; text: string; level: number }[];
  children: ReactNode;
}

export function DocsContentLayout({ activeSlug, headings, children }: DocsContentLayoutProps) {
  return (
    <DocsShell>
      <div className="grid gap-x-6 px-4 pb-24 pt-10 md:px-10 md:pb-40 md:pt-16 lg:grid-cols-12">
        <DocsSidebar sections={docsNavSections} activeSlug={activeSlug} />
        <article className="min-w-0 lg:col-span-6 lg:col-start-4">{children}</article>
        <DocsToc headings={headings} />
      </div>
    </DocsShell>
  );
}
