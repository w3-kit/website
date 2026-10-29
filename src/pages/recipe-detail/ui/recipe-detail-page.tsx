import { ECOSYSTEM_LABELS, type Ecosystem } from "../../../entities/chain";
import { CopyCommand } from "../../../features/copy-address";
import { recipeAddCommand } from "../../../shared/lib/commands";
import { useMemo, useState } from "react";
import { useParams } from "@tanstack/react-router";
import { DocsContentLayout } from "../../../widgets/docs-content-layout";
import { NotFound } from "../../../shared/ui/not-found";
import { getSectionUrl } from "../../../shared/lib/urls";
import { DocsShell } from "../../../widgets/docs-shell";
import { CodeBlock } from "../../../widgets/code-block";
import { MarkdownRenderer } from "../../../widgets/markdown-renderer";
import { extractHeadings } from "../../../widgets/markdown-renderer/extract-headings";
import { useRecipe, type RecipeMeta } from "../../../entities/recipe";
import { allDocNavItems } from "../../../entities/guide";
import { AuthorBadge } from "../../../shared/ui/author-badge";
import { cn } from "../../../shared/lib/utils";

const chainLabel = (chain: string) => ECOSYSTEM_LABELS[chain as Ecosystem] ?? chain;

const DOCS_HOME = { href: getSectionUrl("docs"), label: "All docs" };
export function RecipeDetailPage() {
  const { recipeSlug = "" } = useParams({ strict: false });
  const recipe = useRecipe(recipeSlug);

  if (!recipe) {
    return (
      <DocsShell>
        <NotFound kind="recipe" id={recipeSlug} back={DOCS_HOME} />
      </DocsShell>
    );
  }
  return <Recipe recipe={recipe} />;
}

function Recipe({ recipe }: { recipe: RecipeMeta }) {
  const navItem = allDocNavItems.find((i) => i.type === "recipe" && i.slug === recipe.slug);
  const headings = useMemo(() => extractHeadings(recipe.learnContent ?? ""), [recipe.learnContent]);
  const dependencies = [...new Set(Object.values(recipe.dependencies).flat())];

  return (
    <DocsContentLayout activeSlug={recipe.slug} headings={headings}>
      <h1 className="text-w3-title font-medium">{navItem?.label ?? recipe.name}</h1>
      <p className="mt-6 text-w3-body">{recipe.description}</p>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-w3-small text-w3-ink-soft">
        <span>{recipe.chains.map(chainLabel).join(" and ")}</span>
        <AuthorBadge author={recipe.author} prefix="by" />
      </div>

      <CopyCommand command={recipeAddCommand(recipe.slug)} className="mt-10" />

      {dependencies.length > 0 && (
        <p className="mt-6 text-w3-small text-w3-ink-soft">
          Installs{" "}
          {dependencies.map((dep, i) => (
            <span key={dep}>
              {i > 0 && ", "}
              <code className="text-w3-ink">{dep}</code>
            </span>
          ))}
        </p>
      )}

      <RecipeCode recipe={recipe} />

      {recipe.learnContent && (
        <div className="mt-16">
          {/* The explainer has its own "# Title"; under the recipe title it is a section. */}
          <MarkdownRenderer content={recipe.learnContent.replace(/^# /m, "## ")} />
        </div>
      )}
    </DocsContentLayout>
  );
}

function RecipeCode({ recipe }: { recipe: RecipeMeta }) {
  const variants = [
    { chain: "evm", code: recipe.evmCode },
    { chain: "solana", code: recipe.solanaCode },
  ].filter((v) => recipe.chains.includes(v.chain) && v.code);
  const [active, setActive] = useState(variants[0]?.chain);
  const current = variants.find((v) => v.chain === active);
  if (!current) return null;

  return (
    <section aria-label="Code" className="mt-14">
      {variants.length > 1 && (
        <div role="tablist" aria-label="Chain" className="flex gap-1">
          {variants.map((v) => (
            <button
              key={v.chain}
              type="button"
              role="tab"
              aria-selected={v.chain === active}
              onClick={() => setActive(v.chain)}
              className={cn(
                "h-11 px-4 text-w3-small font-medium transition-colors",
                v.chain === active
                  ? "bg-w3-ink text-w3-ground"
                  : "bg-w3-tone text-w3-ink hover:bg-w3-tone-2",
              )}
            >
              {chainLabel(v.chain)}
            </button>
          ))}
        </div>
      )}
      <CodeBlock
        code={current.code}
        language="tsx"
        filename={`${recipe.slug}/${current.chain}.tsx`}
      />
    </section>
  );
}
