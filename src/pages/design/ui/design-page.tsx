import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "../../../widgets/site-chrome";
import { Logo } from "../../../shared/ui/logo";
import { getLandingUrl } from "../../../shared/lib/urls";
import { cn } from "../../../shared/lib/utils";
import { COLOURS, MOTION, RULES, SPACING, TYPE_STEPS } from "./tokens";

export function DesignPage() {
  return (
    <SiteShell section="landing">
      <Hero />
      <Colours />
      <Type />
      <Spacing />
      <Parts />
      <Motion />
      <Rules />
    </SiteShell>
  );
}

function Hero() {
  return (
    <section
      aria-labelledby="design-title"
      className="grid gap-10 bg-w3-ink px-4 py-20 text-w3-ground md:grid-cols-12 md:gap-x-6 md:px-10 md:py-32"
    >
      <h1 id="design-title" className="text-w3-display font-medium md:col-span-7 md:self-end">
        <span className="block">The w3-kit design</span>
        <span className="block">in one page</span>
      </h1>
      <div className="flex flex-col items-start gap-8 md:col-span-4 md:col-start-9 md:self-end">
        <p className="text-w3-body">
          Reference for every w3-kit site: six colours, five type sizes, the spacing, the parts and
          the motion, read live from the same CSS the sites use.
        </p>
        <a
          href={getLandingUrl()}
          className="w3-press inline-flex h-12 items-center gap-2 bg-w3-ground px-5 text-w3-small font-medium text-w3-ink hover:bg-w3-tone"
        >
          Back to w3-kit <ArrowRight size={16} aria-hidden />
        </a>
      </div>
    </section>
  );
}

function Colours() {
  return (
    <Section id="colours" title="Black, white, one purple.">
      <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {COLOURS.map((c) => (
          <li key={c.token} className="flex gap-5">
            <span
              aria-hidden
              className="h-20 w-20 shrink-0"
              style={{
                background: `var(${c.token})`,
                boxShadow: "inset 0 0 0 1px var(--w3-tone-2)",
              }}
            />
            <span className="flex flex-col gap-1">
              <strong className="text-w3-body font-medium">{c.name}</strong>
              <span className="text-w3-small tabular-nums text-w3-ink-soft">
                <CssValue token={c.token} /> · var({c.token}) · {c.share} %
              </span>
              <span className="text-w3-small">{c.use}</span>
            </span>
          </li>
        ))}
      </ul>
      <div aria-hidden className="mt-14 flex h-6 outline outline-1 outline-w3-tone-2">
        {COLOURS.map((c) => (
          <span key={c.token} style={{ flexGrow: c.share, background: `var(${c.token})` }} />
        ))}
      </div>
      <p className="mt-4 text-w3-small text-w3-ink-soft">
        The bar above is a page's colour budget. Switch the theme in the footer and every value
        updates.
      </p>
    </Section>
  );
}

function Type() {
  return (
    <Section
      id="type"
      title="Five sizes, one family."
      intro="Geist for everything, Geist Mono only inside real code. Figures are tabular so they line up."
    >
      <dl className="flex flex-col gap-10">
        {TYPE_STEPS.map((step) => (
          <div key={step.token} className="grid gap-2 md:grid-cols-12 md:items-baseline md:gap-x-6">
            <dt className="order-2 text-w3-small text-w3-ink-soft md:order-none md:col-span-3">
              {step.token} · {step.range}
            </dt>
            <dd className={cn("font-medium md:col-span-9", step.token)}>{step.sample}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

function Spacing() {
  return (
    <Section
      id="spacing"
      title="Spacing in steps of eight."
      intro="Page margin 16 px on a phone, 40 px on a computer. Sections sit 96 to 160 px apart; nothing inside a section is further apart than 96 px."
    >
      <ul className="flex flex-wrap items-end gap-6">
        {SPACING.map((size) => (
          <li key={size} className="flex flex-col gap-3">
            <span
              aria-hidden
              className="block bg-w3-accent"
              style={{ width: size, height: size }}
            />
            <span className="text-w3-small tabular-nums text-w3-ink-soft">{size} px</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Parts() {
  const grounds = [
    { label: "On white", className: "bg-w3-ground text-w3-ink" },
    { label: "On black", className: "bg-[var(--w3-footer-ground)] text-[var(--w3-footer-ink)]" },
    { label: "On tone", className: "bg-w3-tone text-w3-ink" },
  ];
  return (
    <Section
      id="parts"
      title="One button, one mark."
      intro="Buttons are 44 to 48 px tall with square corners. Purple for the action, ink for a second choice. Pressing shrinks them a little."
    >
      <ul className="grid gap-2 md:grid-cols-3">
        {grounds.map((g) => (
          <li key={g.label} className={cn("flex flex-col gap-16 p-8", g.className)}>
            <span className="flex items-center gap-2">
              <Logo size={36} className="text-w3-accent" />
              <span className="text-[26px] font-semibold tracking-[-0.03em]">w3-kit</span>
            </span>
            <span className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="w3-press h-12 bg-w3-accent px-5 text-w3-small font-medium text-w3-on-accent hover:bg-w3-accent-hover"
              >
                Get started
              </button>
              <span className="text-w3-small opacity-70">{g.label}</span>
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Motion() {
  return (
    <Section
      id="motion"
      title="Motion that settles."
      intro="Only position and opacity move. With reduced motion turned on, everything appears in place."
    >
      <dl className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {MOTION.map((m) => (
          <div key={m.name} className="bg-w3-tone p-6">
            <dt className="text-w3-body font-medium">{m.name}</dt>
            <dd className="mt-1 text-w3-small tabular-nums text-w3-ink-soft">{m.value}</dd>
            <dd className="mt-6 text-w3-small">{m.use}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

function Rules() {
  return (
    <Section id="rules" title="Four rules.">
      <ul className="grid gap-x-6 gap-y-10 md:grid-cols-2">
        {RULES.map((r) => (
          <li key={r.title}>
            <strong className="block text-w3-statement font-medium">{r.title}</strong>
            <span className="mt-2 block text-w3-body text-w3-ink-soft">{r.body}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={`${id}-title`} className="px-4 py-20 md:px-10 md:py-32">
      <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12 md:gap-x-6">
        <h2 id={`${id}-title`} className="text-w3-title font-medium md:col-span-7">
          {title}
        </h2>
        {intro && <p className="text-w3-body md:col-span-4 md:col-start-9 md:self-end">{intro}</p>}
      </div>
      {children}
    </section>
  );
}

/** Prints a custom property's current value, following theme changes on <html>. */
function CssValue({ token }: { token: string }) {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const read = () =>
      setValue(getComputedStyle(root).getPropertyValue(token).trim().toUpperCase());
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["class", "data-theme"] });
    return () => observer.disconnect();
  }, [token]);

  return <>{value ?? "…"}</>;
}
