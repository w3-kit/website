import { useParams } from "@tanstack/react-router";
import { DocsShell } from "../../../widgets/docs-shell";
import { DocsSidebar } from "../../../widgets/docs-sidebar";
import { MobileSidebar } from "../../../widgets/docs-sidebar/mobile-sidebar";
import { DocsToc } from "../../../widgets/docs-toc";
import { Breadcrumbs } from "../../../shared/ui/breadcrumbs";
import { CodeBlock } from "../../../widgets/code-block";
import { MarkdownRenderer } from "../../../widgets/markdown-renderer";
import { extractHeadings } from "../../../widgets/markdown-renderer/extract-headings";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../../shared/ui/tabs";
import { docsNavSections } from "../../../entities/guide/model/docs-nav.gen";
import { useRecipe } from "../../../entities/recipe";
import { getSectionUrl } from "../../../shared/lib/urls";

export function RecipeDetailPage() {
  const { recipeSlug } = useParams({ strict: false });
  const slug = recipeSlug ?? "";
  const recipe = useRecipe(slug);

  if (!recipe) {
    return (
      <DocsShell>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h1
              className="mb-2 text-2xl font-semibold"
              style={{ color: "var(--w3-gray-900)" }}
            >
              Recipe Not Found
            </h1>
            <p className="mb-6 text-sm" style={{ color: "var(--w3-gray-600)" }}>
              The recipe &ldquo;{slug}&rdquo; doesn&apos;t exist.
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

  // Determine which chain tab to show first
  const hasEvm = recipe.chains.includes("evm");
  const hasSolana = recipe.chains.includes("solana");
  const defaultTab = hasEvm ? "evm" : "solana";

  // Extract headings from learn content for TOC
  const headings = recipe.learnContent ? extractHeadings(recipe.learnContent) : [];

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
              { label: "Recipes" },
              { label: recipe.name },
            ]}
          />

          {/* Recipe header */}
          <h1
            className="mb-2 text-3xl font-semibold"
            style={{ color: "var(--w3-gray-900)", letterSpacing: "-0.02em" }}
          >
            {recipe.name}
          </h1>
          <p
            className="mb-6 text-base"
            style={{ color: "var(--w3-gray-600)", lineHeight: 1.6 }}
          >
            {recipe.description}
          </p>

          {recipe.author && (
            <a
              href={`https://github.com/${recipe.author}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-4 inline-flex items-center gap-1.5 text-xs transition-colors hover:underline"
              style={{ color: "var(--w3-gray-500)" }}
            >
              <img
                src={`https://github.com/${recipe.author}.png?size=40`}
                alt={recipe.author}
                className="h-4 w-4 rounded-full"
              />
              by {recipe.author}
            </a>
          )}

          {/* Chain badges */}
          <div className="mb-6 flex items-center gap-2">
            {recipe.chains.map((chain) => (
              <span
                key={chain}
                className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                style={{
                  background:
                    chain === "evm" ? "rgba(98, 126, 234, 0.1)" : "rgba(153, 69, 255, 0.1)",
                  color: chain === "evm" ? "#627EEA" : "#9945FF",
                }}
              >
                {chain}
              </span>
            ))}
          </div>

          {/* Dependencies */}
          {Object.keys(recipe.dependencies).length > 0 && (
            <div className="mb-8">
              <h3
                className="mb-3 text-sm font-semibold"
                style={{ color: "var(--w3-gray-900)" }}
              >
                Dependencies
              </h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(recipe.dependencies).map(([chain, deps]) =>
                  deps.map((dep) => (
                    <span
                      key={`${chain}-${dep}`}
                      className="rounded-md px-2 py-1 text-xs"
                      style={{
                        background: "var(--w3-surface-elevated)",
                        color: "var(--w3-gray-700)",
                        fontFamily: '"Geist Mono", monospace',
                      }}
                    >
                      {dep}
                    </span>
                  )),
                )}
              </div>
            </div>
          )}

          {/* Code tabs */}
          <Tabs defaultValue={defaultTab}>
            <TabsList variant="line" className="mb-4">
              {hasEvm && <TabsTrigger value="evm">EVM</TabsTrigger>}
              {hasSolana && <TabsTrigger value="solana">Solana</TabsTrigger>}
            </TabsList>
            {hasEvm && (
              <TabsContent value="evm">
                <CodeBlock
                  code={recipe.evmCode}
                  language="tsx"
                  filename={`${recipe.slug}/evm.tsx`}
                />
              </TabsContent>
            )}
            {hasSolana && (
              <TabsContent value="solana">
                <CodeBlock
                  code={recipe.solanaCode}
                  language="tsx"
                  filename={`${recipe.slug}/solana.tsx`}
                />
              </TabsContent>
            )}
          </Tabs>

          {/* Learn content — narrative explanation from .learn.md */}
          {recipe.learnContent && (
            <div
              className="mt-12 pt-10"
              style={{ borderTop: "1px solid var(--w3-border-subtle)" }}
            >
              <MarkdownRenderer content={recipe.learnContent} />
            </div>
          )}
        </div>

        {/* Right TOC — shows headings from learn content */}
        <DocsToc headings={headings} />
      </div>
    </DocsShell>
  );
}
