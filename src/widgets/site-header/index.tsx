import type { Section } from "../../shared/lib/theme";

interface SiteHeaderProps {
  currentSection?: Section;
}

const navLinks = [
  { label: "UI", href: "/ui", section: "ui" as const },
  { label: "Docs", href: "/docs", section: "docs" as const },
  { label: "Registry", href: "/registry", section: "registry" as const },
];

export function SiteHeader({ currentSection }: SiteHeaderProps) {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        borderBottom: "1px solid var(--w3-gray-300)",
      }}
    >
      <a
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <img
          src="/logo.png"
          alt="w3-kit"
          style={{ height: 28, width: 28, borderRadius: 6 }}
        />
      </a>
      <nav style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {currentSection && currentSection !== "landing" && (
          <a
            href="/"
            style={{
              fontSize: 14,
              color: "var(--w3-gray-700)",
              textDecoration: "none",
              padding: "4px 12px",
              borderRadius: 4,
              transition: "color 0.2s",
            }}
          >
            Home
          </a>
        )}
        {navLinks.map((link) => (
          <a
            key={link.section}
            href={link.href}
            style={{
              fontSize: 14,
              color:
                currentSection === link.section
                  ? "var(--w3-gray-900)"
                  : "var(--w3-gray-700)",
              textDecoration: "none",
              padding: "4px 12px",
              borderRadius: 4,
              borderLeft:
                currentSection === link.section
                  ? "2px solid var(--w3-accent)"
                  : "2px solid transparent",
              transition: "all 0.2s",
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
