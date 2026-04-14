import { useState, useEffect, useCallback } from "react";
import { Check } from "lucide-react";
import { PageShell } from "../../../widgets/page-shell";
import { Button } from "../../../shared/ui/button";
import { Badge } from "../../../shared/ui/badge";
import { Input } from "../../../shared/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "../../../shared/ui/card";
import { Separator } from "../../../shared/ui/separator";

const sidebarSections = [
  {
    title: "Foundations",
    items: [
      { label: "Colors", id: "colors" },
      { label: "Typography", id: "typography" },
      { label: "Spacing", id: "spacing" },
    ],
  },
  {
    title: "Components",
    items: [
      { label: "Buttons", id: "buttons" },
      { label: "Badges", id: "badges" },
      { label: "Inputs", id: "inputs" },
      { label: "Cards", id: "cards" },
    ],
  },
];

const grayScale = [
  {
    token: "--w3-gray-100",
    label: "100",
    light: "#fafafa",
    dark: "#0a0a0a",
    usage: "Page background",
  },
  {
    token: "--w3-gray-200",
    label: "200",
    light: "#f5f5f5",
    dark: "#111111",
    usage: "Surface background",
  },
  {
    token: "--w3-gray-300",
    label: "300",
    light: "#e5e5e5",
    dark: "#1a1a1a",
    usage: "Borders, dividers",
  },
  {
    token: "--w3-gray-400",
    label: "400",
    light: "#d4d4d4",
    dark: "#222222",
    usage: "Subtle borders",
  },
  {
    token: "--w3-gray-500",
    label: "500",
    light: "#a3a3a3",
    dark: "#333333",
    usage: "Disabled text",
  },
  {
    token: "--w3-gray-600",
    label: "600",
    light: "#737373",
    dark: "#444444",
    usage: "Placeholder text",
  },
  {
    token: "--w3-gray-700",
    label: "700",
    light: "#525252",
    dark: "#666666",
    usage: "Secondary text",
  },
  { token: "--w3-gray-800", label: "800", light: "#404040", dark: "#888888", usage: "Muted text" },
  {
    token: "--w3-gray-900",
    label: "900",
    light: "#171717",
    dark: "#ededed",
    usage: "Primary text",
  },
];

const spacingValues = [4, 8, 16, 24, 32, 48, 64];

function CopyText({
  text,
  className = "",
  style,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex cursor-copy items-center gap-1 text-left transition-colors hover:text-foreground ${className}`}
      style={style}
      title={`Copy: ${text}`}
    >
      {copied ? (
        <>
          <Check size={10} style={{ color: "var(--w3-accent)" }} />
          <span style={{ color: "var(--w3-accent)" }}>Copied</span>
        </>
      ) : (
        text
      )}
    </button>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <h2
        className="mb-6 text-2xl font-semibold tracking-tight"
        style={{ color: "var(--w3-gray-900)" }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function SidebarLink({ label, id, active }: { label: string; id: string; active: boolean }) {
  return (
    <a
      href={`#${id}`}
      className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-all"
      style={{
        color: active ? "var(--w3-gray-900)" : "var(--w3-gray-600)",
        background: active ? "var(--w3-surface-elevated)" : "transparent",
        fontWeight: active ? 500 : 400,
      }}
    >
      <span
        className="h-4 w-0.5 shrink-0 rounded-full transition-all"
        style={{
          background: active ? "var(--w3-accent)" : "transparent",
        }}
      />
      {label}
    </a>
  );
}

const ALL_SECTION_IDS = sidebarSections.flatMap((s) => s.items.map((i) => i.id));

export function DesignSystemPage() {
  const [activeSection, setActiveSection] = useState(ALL_SECTION_IDS[0]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    ALL_SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-20% 0px -60% 0px" },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <PageShell section="design">
      <div className="mx-auto flex max-w-[1200px] gap-0 px-6 md:px-8 lg:px-16">
        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 md:block">
          <div className="sticky top-20 flex flex-col gap-6 py-8">
            <span className="text-sm font-semibold" style={{ color: "var(--w3-gray-900)" }}>
              Design System
            </span>

            {sidebarSections.map((section) => (
              <div key={section.title} className="flex flex-col gap-1">
                <span
                  className="px-3 text-[10px] font-semibold uppercase tracking-wider"
                  style={{ color: "var(--w3-gray-500)" }}
                >
                  {section.title}
                </span>
                {section.items.map((item) => (
                  <SidebarLink
                    key={item.id}
                    label={item.label}
                    id={item.id}
                    active={activeSection === item.id}
                  />
                ))}
              </div>
            ))}
          </div>
        </aside>

        {/* Content */}
        <main
          className="flex-1 py-8 md:border-l md:pl-10"
          style={{ borderColor: "var(--w3-border-subtle)" }}
        >
          <div className="flex max-w-2xl flex-col gap-16">
            {/* Intro */}
            <div>
              <h1
                className="mb-3 text-3xl font-semibold tracking-tight"
                style={{ color: "var(--w3-gray-900)" }}
              >
                Design System
              </h1>
              <p className="text-base" style={{ color: "var(--w3-gray-600)" }}>
                The visual language for w3-kit. Monochrome foundations with Solidity purple as a
                structural accent. Built on Geist Sans, a 10-step gray scale, and GSAP-driven
                motion.
              </p>
            </div>

            {/* Colors */}
            <Section id="colors" title="Colors">
              <p className="mb-6 text-sm" style={{ color: "var(--w3-gray-600)" }}>
                10-step semantic gray scale. Values swap automatically between light and dark themes
                via CSS custom properties.
              </p>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4 px-4 py-1">
                  <span className="h-8 w-8 shrink-0" />
                  <span
                    className="w-10 text-[10px] font-medium uppercase"
                    style={{ color: "var(--w3-gray-500)" }}
                  >
                    Token
                  </span>
                  <span
                    className="w-32 text-[10px] font-medium uppercase"
                    style={{ color: "var(--w3-gray-500)" }}
                  >
                    Variable
                  </span>
                  <span
                    className="w-20 text-[10px] font-medium uppercase"
                    style={{ color: "var(--w3-gray-500)" }}
                  >
                    Light
                  </span>
                  <span
                    className="w-20 text-[10px] font-medium uppercase"
                    style={{ color: "var(--w3-gray-500)" }}
                  >
                    Dark
                  </span>
                  <span
                    className="flex-1 text-right text-[10px] font-medium uppercase"
                    style={{ color: "var(--w3-gray-500)" }}
                  >
                    Usage
                  </span>
                </div>
                {grayScale.map((color) => (
                  <div
                    key={color.label}
                    className="flex items-center gap-4 rounded-lg px-4 py-3"
                    style={{ background: "var(--w3-glass-inner-bg)" }}
                  >
                    <div
                      className="h-8 w-8 shrink-0 rounded-md"
                      style={{ background: `var(${color.token})` }}
                    />
                    <span
                      className="w-10 text-sm font-semibold tabular-nums"
                      style={{ color: "var(--w3-gray-900)" }}
                    >
                      {color.label}
                    </span>
                    <CopyText
                      text={color.token}
                      className="w-32 text-xs"
                      style={{
                        color: "var(--w3-gray-500)",
                        fontFamily: '"Geist Mono", ui-monospace, monospace',
                      }}
                    />
                    <CopyText
                      text={color.light}
                      className="w-20 text-xs"
                      style={{
                        color: "var(--w3-gray-500)",
                        fontFamily: '"Geist Mono", ui-monospace, monospace',
                      }}
                    />
                    <CopyText
                      text={color.dark}
                      className="w-20 text-xs"
                      style={{
                        color: "var(--w3-gray-500)",
                        fontFamily: '"Geist Mono", ui-monospace, monospace',
                      }}
                    />
                    <span
                      className="flex-1 text-right text-xs"
                      style={{ color: "var(--w3-gray-600)" }}
                    >
                      {color.usage}
                    </span>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium" style={{ color: "var(--w3-gray-900)" }}>
                  Accent
                </span>
                <div className="flex gap-3">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="h-12 w-12 rounded-lg"
                      style={{ background: "var(--w3-accent)" }}
                    />
                    <CopyText
                      text="#5554d9"
                      className="text-[10px]"
                      style={{
                        color: "var(--w3-gray-500)",
                        fontFamily: '"Geist Mono", ui-monospace, monospace',
                      }}
                    />
                    <CopyText
                      text="--w3-accent"
                      className="text-[10px]"
                      style={{
                        color: "var(--w3-gray-500)",
                        fontFamily: '"Geist Mono", ui-monospace, monospace',
                      }}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="h-12 w-12 rounded-lg"
                      style={{ background: "var(--w3-accent-subtle)" }}
                    />
                    <CopyText
                      text="rgba(85,84,217,0.1)"
                      className="text-[10px]"
                      style={{
                        color: "var(--w3-gray-500)",
                        fontFamily: '"Geist Mono", ui-monospace, monospace',
                      }}
                    />
                    <CopyText
                      text="--w3-accent-subtle"
                      className="text-[10px]"
                      style={{
                        color: "var(--w3-gray-500)",
                        fontFamily: '"Geist Mono", ui-monospace, monospace',
                      }}
                    />
                  </div>
                </div>
              </div>
            </Section>

            {/* Typography */}
            <Section id="typography" title="Typography">
              <p className="mb-6 text-sm" style={{ color: "var(--w3-gray-600)" }}>
                Geist Sans for UI text, Geist Mono for code. Tight letter-spacing on headings,
                relaxed line-height on body.
              </p>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <span
                    className="text-xs font-medium uppercase tracking-wider"
                    style={{ color: "var(--w3-accent)" }}
                  >
                    Headings
                  </span>
                  {[
                    {
                      text: "Heading 48",
                      size: "text-5xl",
                      weight: "font-semibold",
                      meta: "48px / 600",
                    },
                    {
                      text: "Heading 32",
                      size: "text-3xl",
                      weight: "font-semibold",
                      meta: "32px / 600",
                    },
                    {
                      text: "Heading 24",
                      size: "text-2xl",
                      weight: "font-semibold",
                      meta: "24px / 600",
                    },
                    {
                      text: "Heading 20",
                      size: "text-xl",
                      weight: "font-medium",
                      meta: "20px / 500",
                    },
                  ].map((h) => (
                    <div
                      key={h.text}
                      className="flex items-baseline justify-between rounded-lg px-4 py-3"
                      style={{ background: "var(--w3-glass-inner-bg)" }}
                    >
                      <span
                        className={`${h.size} ${h.weight} tracking-tight`}
                        style={{ color: "var(--w3-gray-900)" }}
                      >
                        {h.text}
                      </span>
                      <span className="text-xs" style={{ color: "var(--w3-gray-500)" }}>
                        {h.meta}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-4">
                  <span
                    className="text-xs font-medium uppercase tracking-wider"
                    style={{ color: "var(--w3-accent)" }}
                  >
                    Body
                  </span>
                  {[
                    { text: "Body text at 16px", size: "text-base", meta: "16px / 400" },
                    { text: "Body text at 14px", size: "text-sm", meta: "14px / 400" },
                    { text: "Caption at 13px", size: "text-[13px]", meta: "13px / 400" },
                    { text: "Small at 12px", size: "text-xs", meta: "12px / 400" },
                  ].map((b) => (
                    <div
                      key={b.text}
                      className="flex items-baseline justify-between rounded-lg px-4 py-3"
                      style={{ background: "var(--w3-glass-inner-bg)" }}
                    >
                      <span className={b.size} style={{ color: "var(--w3-gray-900)" }}>
                        {b.text}
                      </span>
                      <span className="text-xs" style={{ color: "var(--w3-gray-500)" }}>
                        {b.meta}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  className="rounded-lg p-4"
                  style={{
                    background: "var(--w3-glass-inner-bg)",
                    fontFamily: '"Geist Mono", ui-monospace, monospace',
                  }}
                >
                  <span className="text-xs" style={{ color: "var(--w3-gray-500)" }}>
                    Mono — Geist Mono
                  </span>
                  <pre className="mt-2 text-sm" style={{ color: "var(--w3-gray-900)" }}>
                    {`const wallet = await connect();\nconsole.log(wallet.address);`}
                  </pre>
                </div>
              </div>
            </Section>

            {/* Spacing */}
            <Section id="spacing" title="Spacing">
              <p className="mb-6 text-sm" style={{ color: "var(--w3-gray-600)" }}>
                Base unit: 4px. All values are multiples of 4 or 8.
              </p>

              <div className="flex flex-col gap-2">
                {spacingValues.map((val) => (
                  <div
                    key={val}
                    className="flex items-center gap-4 rounded-lg px-4 py-2.5"
                    style={{ background: "var(--w3-glass-inner-bg)" }}
                  >
                    <span
                      className="w-10 text-sm font-medium tabular-nums"
                      style={{ color: "var(--w3-gray-900)" }}
                    >
                      {val}
                    </span>
                    <div className="flex-1">
                      <div
                        className="h-3 rounded"
                        style={{
                          width: `${Math.min(val * 2, 100)}%`,
                          background: "var(--w3-accent)",
                          opacity: 0.6,
                        }}
                      />
                    </div>
                    <code
                      className="text-xs"
                      style={{
                        color: "var(--w3-gray-500)",
                        fontFamily: '"Geist Mono", ui-monospace, monospace',
                      }}
                    >
                      {val}px
                    </code>
                  </div>
                ))}
              </div>
            </Section>

            {/* Buttons */}
            <Section id="buttons" title="Buttons">
              <div className="flex flex-wrap gap-3">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
                <Button disabled>Disabled</Button>
              </div>

              <Separator className="my-6" />

              <div className="flex flex-col gap-3">
                <span className="text-xs font-medium" style={{ color: "var(--w3-gray-500)" }}>
                  Sizes
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="xs">Extra Small</Button>
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>
            </Section>

            {/* Badges */}
            <Section id="badges" title="Badges">
              <div className="flex flex-wrap gap-3">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </Section>

            {/* Inputs */}
            <Section id="inputs" title="Inputs">
              <div className="flex max-w-sm flex-col gap-4">
                <Input placeholder="Default input" />
                <Input placeholder="Disabled input" disabled />
              </div>
            </Section>

            {/* Cards */}
            <Section id="cards" title="Cards">
              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      A basic card component with header and content slots.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Glass Card</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="rounded-lg p-4"
                      style={{ background: "var(--w3-glass-inner-bg)" }}
                    >
                      <p className="text-sm" style={{ color: "var(--w3-gray-600)" }}>
                        Inner glass surface for nested content.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Section>
          </div>
        </main>
      </div>
    </PageShell>
  );
}
