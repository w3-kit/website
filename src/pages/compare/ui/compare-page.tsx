import { SiteHeader } from "../../../widgets/site-header";
import { SiteFooter } from "../../../widgets/site-footer";
import { ComparisonMatrix } from "./comparison-matrix";
import { AlternativeCard } from "./alternative-card";
import { ALTERNATIVES, FEATURES } from "../model/alternatives";

export function ComparePage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-w3-gray-100 text-w3-gray-900 antialiased">
      <SiteHeader currentSection="landing" />
      <main className="flex-1 px-20 py-16">
        <header className="mx-auto max-w-5xl">
          <div className="font-mono text-[11px] text-w3-gray-500">COMPARE</div>
          <h1 className="mt-2 text-[44px] font-medium leading-tight tracking-[-0.03em]">
            w3-kit vs alternatives.
          </h1>
          <p className="mt-3 max-w-prose text-w3-gray-600">
            An honest comparison. Pick the toolkit that fits your project &mdash; sometimes that's
            not w3-kit, and we'll tell you when.
          </p>
        </header>

        <section className="mx-auto mt-12 max-w-5xl">
          <h2 className="text-sm font-medium uppercase tracking-[0.06em] text-w3-gray-500">
            Feature matrix
          </h2>
          <div className="mt-4">
            <ComparisonMatrix alternatives={ALTERNATIVES} features={FEATURES} />
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-5xl">
          <h2 className="text-sm font-medium uppercase tracking-[0.06em] text-w3-gray-500">
            When to pick each one
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {ALTERNATIVES.map((a) => (
              <AlternativeCard key={a.id} alternative={a} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
