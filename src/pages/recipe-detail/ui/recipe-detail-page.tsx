import { useMemo, useState } from "react";
import { useParams } from "@tanstack/react-router";
import { Check, Copy } from "lucide-react";
import { DocsContentLayout } from "../../../widgets/docs-content-layout";
import { DocsNotFound } from "../../../shared/ui/docs-not-found";
import { DocsShell } from "../../../widgets/docs-shell";
import { CodeBlock } from "../../../widgets/code-block";
import { MarkdownRenderer } from "../../../widgets/markdown-renderer";
import { extractHeadings } from "../../../widgets/markdown-renderer/extract-headings";
import { useRecipe, type RecipeMeta } from "../../../entities/recipe";
import { allDocNavItems } from "../../../entities/guide/model/docs-nav.gen";
import { AuthorBadge } from "../../../shared/ui/author-badge";
import { useCopyToClipboard } from "../../../shared/lib/use-copy-to-clipboard";
import { cn } from "../../../shared/lib/utils";

const CHAIN_LABELS: Record<string, string> = { evm: "EVM", solana: "Solana" };

export function RecipeDetailPage() {
  const { recipeSlug = "" } = useParams({ strict: false });
  const recipe = useRecipe(recipeSlug);

  if (!recipe) {
    return (
      <DocsShell>
        <DocsNotFound entityType="Recipe" slug={recipeSlug} />
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
        <span>{recipe.chains.map((c) => CHAIN_LABELS[c] ?? c).join(" and ")}</span>
        <AuthorBadge author={recipe.author} prefix="by" />
      </div>

      <AddCommand slug={recipe.slug} />

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

function AddCommand({ slug }: { slug: string }) {
  const command = `npx w3-kit add ${slug}`;
  const [copied, copy] = useCopyToClipboard(command);
  return (
    <button
      type="button"
      onClick={copy}
      className="w3-press mt-10 inline-flex h-12 max-w-full items-center gap-3 bg-w3-accent px-5 text-w3-on-accent hover:bg-w3-accent-hover"
    >
      <code className="truncate text-[15px]">{command}</code>
      {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
      <span className="sr-only">{copied ? "Copied" : "Copy command"}</span>
    </button>
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
        <div role="tablist" className="flex gap-1">
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
              {CHAIN_LABELS[v.chain]}
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
