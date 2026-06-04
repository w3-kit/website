import { RecipePreview } from "../../../widgets/recipe-preview";

export function RecipePreviewSection() {
  return (
    <section id="preview" className="border-b border-w3-border-subtle px-20 py-16">
      <div className="mb-8">
        <div className="font-mono text-[11px] text-w3-gray-500">04 — PREVIEW</div>
        <h2 className="mt-2 text-[32px] font-medium leading-tight tracking-[-0.03em]">
          See it before you ship.
        </h2>
      </div>
      <RecipePreview />
    </section>
  );
}
