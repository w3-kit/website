import { SiteHeader } from "../../../widgets/site-header";
import { SiteFooter } from "../../../widgets/site-footer";
import { LandingAnimation } from "../../under-construction/ui/landing-animation";
import { UiAnimation } from "../../under-construction/ui/ui-animation";
import { DocsAnimation } from "../../under-construction/ui/docs-animation";
import { RegistryAnimation } from "../../under-construction/ui/registry-animation";

const sidebarSections = [
  {
    title: "Foundations",
    items: [
      { label: "Introduction", id: "intro" },
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
  {
    title: "Motion",
    items: [{ label: "Animations", id: "animations" }],
  },
];

const grayScale = [
  { token: "--w3-gray-100", label: "100", usage: "Page background" },
  { token: "--w3-gray-200", label: "200", usage: "Surface background" },
  { token: "--w3-gray-300", label: "300", usage: "Borders, dividers" },
  { token: "--w3-gray-400", label: "400", usage: "Subtle borders" },
  { token: "--w3-gray-500", label: "500", usage: "Disabled text" },
  { token: "--w3-gray-600", label: "600", usage: "Placeholder text" },
  { token: "--w3-gray-700", label: "700", usage: "Secondary text" },
  { token: "--w3-gray-800", label: "800", usage: "Muted text" },
  { token: "--w3-gray-900", label: "900", usage: "Primary text" },
];

const headingTypes = [
  { example: "Heading 48", className: "text-heading-48", size: "48px", weight: 600, usage: "Hero sections and landing pages." },
  { example: "Heading 32", className: "text-heading-32", size: "32px", weight: 600, usage: "Page titles and major sections." },
  { example: "Heading 24", className: "text-heading-24", size: "24px", weight: 600, usage: "Section headings within pages." },
  { example: "Heading 20", className: "text-heading-20", size: "20px", weight: 500, usage: "Sub-section headings." },
];

const copyTypes = [
  { example: "Copy 16 with Strong", className: "text-copy-16", size: "16px", weight: 400, usage: "Default body text for content." },
  { example: "Copy 14 with Strong", className: "text-copy-14", size: "14px", weight: 400, usage: "Most commonly used text style." },
  { example: "Copy 13", className: "text-copy-13", size: "13px", weight: 400, usage: "Secondary text and descriptions." },
  { example: "Copy 13 Mono", className: "text-copy-13-mono", size: "13px", weight: 400, usage: "Used for inline code mentions.", mono: true },
  { example: "Copy 12", className: "text-copy-12", size: "12px", weight: 400, usage: "Captions and metadata." },
];

const spacingValues = [4, 8, 16, 24, 32, 48, 64];

const inputBaseStyle: React.CSSProperties = {
  padding: "8px 12px",
  fontSize: 14,
  border: "1px solid var(--w3-gray-300)",
  borderRadius: 6,
  outline: "none",
  width: 260,
};

export function DesignSystemPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--w3-gray-100)" }}>
      <SiteHeader currentSection="design" />

      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <aside
          style={{
            width: 240,
            flexShrink: 0,
            borderRight: "1px solid var(--w3-gray-300)",
            padding: "32px 24px",
            position: "sticky",
            top: 0,
            height: "100vh",
            overflowY: "auto",
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 600, color: "var(--w3-gray-900)", marginBottom: 24 }}>
            w3-kit Design System
          </div>

          {sidebarSections.map((section) => (
            <div key={section.title} style={{ marginBottom: 24 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--w3-gray-700)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: 8,
                }}
              >
                {section.title}
              </div>
              {section.items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  style={{
                    display: "block",
                    fontSize: 14,
                    color: "var(--w3-gray-700)",
                    textDecoration: "none",
                    padding: "6px 12px",
                    borderRadius: 6,
                    marginBottom: 2,
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--w3-gray-200)";
                    e.currentTarget.style.color = "var(--w3-gray-900)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--w3-gray-700)";
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          ))}
        </aside>

        {/* Main content */}
        <div style={{ flex: 1, padding: "48px 64px", maxWidth: 900 }}>

          {/* Introduction */}
          <section id="intro" style={{ marginBottom: 80 }}>
            <h1 style={{ marginBottom: 16 }}>Design System</h1>
            <p style={{ fontSize: 16, color: "var(--w3-gray-700)", lineHeight: 1.6, maxWidth: 600 }}>
              The visual language for w3-kit. Monochrome foundations with Solidity purple as a structural accent.
              Built on Geist Sans, a 10-step gray scale, and GSAP-driven motion.
            </p>
          </section>

          {/* Colors */}
          <section id="colors" style={{ marginBottom: 80 }}>
            <h2 style={{ marginBottom: 8 }}>Colors</h2>
            <p style={{ fontSize: 14, color: "var(--w3-gray-700)", marginBottom: 32, lineHeight: 1.6 }}>
              10-step semantic gray scale. Values swap automatically between light and dark themes via CSS custom properties.
            </p>

            {/* Gray scale table */}
            <div style={{ marginBottom: 32 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "48px 80px 1fr 1fr",
                  gap: "0",
                  fontSize: 13,
                  borderBottom: "1px solid var(--w3-gray-300)",
                  paddingBottom: 8,
                  marginBottom: 8,
                  color: "var(--w3-gray-600)",
                }}
              >
                <span />
                <span>Token</span>
                <span>Variable</span>
                <span>Usage</span>
              </div>
              {grayScale.map((g) => (
                <div
                  key={g.token}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "48px 80px 1fr 1fr",
                    gap: "0",
                    alignItems: "center",
                    padding: "10px 0",
                    borderBottom: "1px solid var(--w3-gray-300)",
                    fontSize: 14,
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 6,
                      background: `var(${g.token})`,
                      border: "1px solid var(--w3-gray-300)",
                    }}
                  />
                  <span style={{ fontWeight: 500, color: "var(--w3-gray-900)" }}>{g.label}</span>
                  <code style={{ fontSize: 13, color: "var(--w3-gray-700)" }}>{g.token}</code>
                  <span style={{ color: "var(--w3-gray-700)" }}>{g.usage}</span>
                </div>
              ))}
            </div>

            {/* Accent */}
            <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
              <div>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 6,
                    background: "var(--w3-accent)",
                    marginBottom: 8,
                  }}
                />
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--w3-gray-900)" }}>Accent</div>
                <code style={{ fontSize: 12, color: "var(--w3-gray-600)" }}>#5554D9</code>
              </div>
              <div>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 6,
                    background: "var(--w3-accent-subtle)",
                    border: "1px solid var(--w3-gray-300)",
                    marginBottom: 8,
                  }}
                />
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--w3-gray-900)" }}>Accent Subtle</div>
                <code style={{ fontSize: 12, color: "var(--w3-gray-600)" }}>Backgrounds</code>
              </div>
            </div>
          </section>

          {/* Typography */}
          <section id="typography" style={{ marginBottom: 80 }}>
            <h2 style={{ marginBottom: 8 }}>Typography</h2>
            <p style={{ fontSize: 14, color: "var(--w3-gray-700)", marginBottom: 32, lineHeight: 1.6 }}>
              Geist Sans for UI text, Geist Mono for code. Tight letter-spacing on headings, comfortable line-height on body copy.
            </p>

            {/* Heading */}
            <h3 style={{ marginBottom: 16 }}>Heading</h3>
            <p style={{ fontSize: 14, color: "var(--w3-gray-700)", marginBottom: 24 }}>
              Designed for short, impactful text with tight line height and negative letter-spacing.
            </p>

            {/* Table header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 180px 1fr",
                borderBottom: "1px solid var(--w3-gray-300)",
                paddingBottom: 8,
                marginBottom: 4,
                fontSize: 13,
                color: "var(--w3-gray-600)",
              }}
            >
              <span>Aa Example</span>
              <span style={{ fontFamily: '"Geist Mono", monospace' }}>~ Class name</span>
              <span>Usage</span>
            </div>

            {headingTypes.map((t) => (
              <div
                key={t.className}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 180px 1fr",
                  alignItems: "center",
                  padding: "20px 0",
                  borderBottom: "1px solid var(--w3-gray-300)",
                }}
              >
                <span style={{ fontSize: t.size, fontWeight: t.weight, color: "var(--w3-gray-900)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                  {t.example}
                </span>
                <code style={{ fontSize: 13, color: "var(--w3-gray-700)" }}>{t.className}</code>
                <span style={{ fontSize: 14, color: "var(--w3-gray-700)", lineHeight: 1.5 }}>{t.usage}</span>
              </div>
            ))}

            {/* Copy */}
            <h3 style={{ marginTop: 48, marginBottom: 16 }}>Copy</h3>
            <p style={{ fontSize: 14, color: "var(--w3-gray-700)", marginBottom: 24 }}>
              Designed for multiple lines of text, having a higher line height than headings.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 180px 1fr",
                borderBottom: "1px solid var(--w3-gray-300)",
                paddingBottom: 8,
                marginBottom: 4,
                fontSize: 13,
                color: "var(--w3-gray-600)",
              }}
            >
              <span>Aa Example</span>
              <span style={{ fontFamily: '"Geist Mono", monospace' }}>~ Class name</span>
              <span>Usage</span>
            </div>

            {copyTypes.map((t) => (
              <div
                key={t.className}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 180px 1fr",
                  alignItems: "center",
                  padding: "16px 0",
                  borderBottom: "1px solid var(--w3-gray-300)",
                }}
              >
                <span
                  style={{
                    fontSize: t.size,
                    fontWeight: t.weight,
                    color: "var(--w3-gray-900)",
                    fontFamily: t.mono ? '"Geist Mono", monospace' : undefined,
                  }}
                >
                  {t.example.includes("Strong") ? (
                    <>
                      {t.example.replace(" with Strong", " ")}
                      <strong>with Strong</strong>
                    </>
                  ) : (
                    t.example
                  )}
                </span>
                <code style={{ fontSize: 13, color: "var(--w3-gray-700)" }}>{t.className}</code>
                <span style={{ fontSize: 14, color: "var(--w3-gray-700)", lineHeight: 1.5 }}>{t.usage}</span>
              </div>
            ))}

            {/* Mono specimen */}
            <div style={{ marginTop: 32, padding: 20, background: "var(--w3-gray-200)", borderRadius: 6 }}>
              <div style={{ fontSize: 12, color: "var(--w3-gray-600)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Geist Mono
              </div>
              <code style={{ fontSize: 14, color: "var(--w3-gray-900)" }}>
                {"const kit = new W3Kit({ chain: 'ethereum' });"}
              </code>
            </div>
          </section>

          {/* Spacing */}
          <section id="spacing" style={{ marginBottom: 80 }}>
            <h2 style={{ marginBottom: 8 }}>Spacing</h2>
            <p style={{ fontSize: 14, color: "var(--w3-gray-700)", marginBottom: 32, lineHeight: 1.6 }}>
              4px base unit. All spacing is a multiple of 4 or 8.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {spacingValues.map((s) => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <code
                    style={{
                      fontSize: 13,
                      color: "var(--w3-gray-700)",
                      width: 48,
                      textAlign: "right",
                    }}
                  >
                    {s}px
                  </code>
                  <div
                    style={{
                      height: 8,
                      width: s * 4,
                      background: "var(--w3-accent)",
                      borderRadius: 2,
                      opacity: 0.6,
                    }}
                  />
                  <span style={{ fontSize: 13, color: "var(--w3-gray-600)" }}>{s / 4}x base</span>
                </div>
              ))}
            </div>
          </section>

          {/* Buttons */}
          <section id="buttons" style={{ marginBottom: 80 }}>
            <h2 style={{ marginBottom: 8 }}>Buttons</h2>
            <p style={{ fontSize: 14, color: "var(--w3-gray-700)", marginBottom: 32, lineHeight: 1.6 }}>
              Button variants following the monochrome design system.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[
                { label: "Default", bg: "var(--w3-gray-900)", color: "var(--w3-gray-100)" },
                { label: "Secondary", bg: "var(--w3-gray-200)", color: "var(--w3-gray-900)" },
                { label: "Outline", bg: "transparent", color: "var(--w3-gray-900)", border: true },
                { label: "Disabled", bg: "var(--w3-gray-300)", color: "var(--w3-gray-500)" },
              ].map((btn) => (
                <button
                  key={btn.label}
                  disabled={btn.label === "Disabled"}
                  style={{
                    padding: "8px 20px",
                    fontSize: 14,
                    fontWeight: 500,
                    background: btn.bg,
                    color: btn.color,
                    border: btn.border ? "1px solid var(--w3-gray-300)" : "none",
                    borderRadius: 6,
                    cursor: btn.label === "Disabled" ? "not-allowed" : "pointer",
                  }}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </section>

          {/* Badges */}
          <section id="badges" style={{ marginBottom: 80 }}>
            <h2 style={{ marginBottom: 8 }}>Badges</h2>
            <p style={{ fontSize: 14, color: "var(--w3-gray-700)", marginBottom: 32, lineHeight: 1.6 }}>
              Status indicators and labels.
            </p>

            <div style={{ display: "flex", gap: 8 }}>
              {[
                { label: "Default", bg: "var(--w3-gray-200)", color: "var(--w3-gray-900)" },
                { label: "Accent", bg: "var(--w3-accent-subtle)", color: "var(--w3-accent)" },
                { label: "Muted", bg: "var(--w3-gray-200)", color: "var(--w3-gray-700)" },
              ].map((badge) => (
                <span
                  key={badge.label}
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    padding: "4px 10px",
                    borderRadius: 4,
                    background: badge.bg,
                    color: badge.color,
                  }}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          </section>

          {/* Inputs */}
          <section id="inputs" style={{ marginBottom: 80 }}>
            <h2 style={{ marginBottom: 8 }}>Inputs</h2>
            <p style={{ fontSize: 14, color: "var(--w3-gray-700)", marginBottom: 32, lineHeight: 1.6 }}>
              Form input states.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <input
                placeholder="Default input"
                style={{ ...inputBaseStyle, background: "var(--w3-gray-100)", color: "var(--w3-gray-900)" }}
              />
              <input
                placeholder="Disabled"
                disabled
                style={{ ...inputBaseStyle, background: "var(--w3-gray-200)", color: "var(--w3-gray-500)", cursor: "not-allowed" }}
              />
            </div>
          </section>

          {/* Cards */}
          <section id="cards" style={{ marginBottom: 80 }}>
            <h2 style={{ marginBottom: 8 }}>Cards</h2>
            <p style={{ fontSize: 14, color: "var(--w3-gray-700)", marginBottom: 32, lineHeight: 1.6 }}>
              Container components with surface background.
            </p>

            <div
              style={{
                background: "var(--w3-gray-200)",
                border: "1px solid var(--w3-gray-300)",
                borderRadius: 6,
                padding: 24,
                maxWidth: 320,
              }}
            >
              <h3 style={{ marginBottom: 8 }}>Card Title</h3>
              <p style={{ fontSize: 14, color: "var(--w3-gray-700)", lineHeight: 1.5 }}>
                Card content with secondary text styling.
              </p>
            </div>
          </section>

          {/* Animations */}
          <section id="animations" style={{ marginBottom: 80 }}>
            <h2 style={{ marginBottom: 8 }}>Animations</h2>
            <p style={{ fontSize: 14, color: "var(--w3-gray-700)", marginBottom: 32, lineHeight: 1.6 }}>
              GSAP-driven abstract structural SVG animations. Each subdomain has a unique animation that hints at its content.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { label: "Landing — Grid Assembly", component: <LandingAnimation /> },
                { label: "UI — Component Outlines", component: <UiAnimation /> },
                { label: "Docs — Text Lines", component: <DocsAnimation /> },
                { label: "Registry — Data Table", component: <RegistryAnimation /> },
              ].map((anim) => (
                <div
                  key={anim.label}
                  style={{
                    background: "var(--w3-gray-200)",
                    border: "1px solid var(--w3-gray-300)",
                    borderRadius: 6,
                    overflow: "hidden",
                  }}
                >
                  <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {anim.component}
                  </div>
                  <div
                    style={{
                      padding: "12px 16px",
                      borderTop: "1px solid var(--w3-gray-300)",
                      fontSize: 13,
                      color: "var(--w3-gray-700)",
                    }}
                  >
                    {anim.label}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <SiteFooter />

      <style>{`
        @media (max-width: 768px) {
          aside { display: none !important; }
        }
      `}</style>
    </div>
  );
}
