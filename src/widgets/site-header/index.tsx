import type { Section } from "../../shared/lib/theme";

interface SiteHeaderProps {
  currentSection?: Section;
}

const DOMAIN = "w3-kit.com";

const navLinks = [
  { label: "UI", section: "ui" as const },
  { label: "Docs", section: "docs" as const },
  { label: "Registry", section: "registry" as const },
  { label: "Learn", section: "learn" as const },
  { label: "Design", section: "design" as const },
];

function getSectionUrl(section: string): string {
  if (typeof window === "undefined") return `/${section}`;
  const host = window.location.host;
  const protocol = window.location.protocol;

  // Localhost: use subdomain.localhost:port
  if (host.includes("localhost") || host.includes("127.0.0.1")) {
    const port = window.location.port;
    return `${protocol}//${section}.localhost${port ? `:${port}` : ""}`;
  }

  // Production: use subdomain.domain
  return `${protocol}//${section}.${DOMAIN}`;
}

function getLandingUrl(): string {
  if (typeof window === "undefined") return "/";
  const host = window.location.host;
  const protocol = window.location.protocol;

  if (host.includes("localhost") || host.includes("127.0.0.1")) {
    const port = window.location.port;
    return `${protocol}//localhost${port ? `:${port}` : ""}`;
  }

  return `${protocol}//www.${DOMAIN}`;
}

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
        href={getLandingUrl()}
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <img src="/logo.png" alt="w3-kit" style={{ height: 28, width: 28, borderRadius: 6 }} />
      </a>
      <nav style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {currentSection && currentSection !== "landing" && (
          <a
            href={getLandingUrl()}
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
            href={getSectionUrl(link.section)}
            style={{
              fontSize: 14,
              color: currentSection === link.section ? "var(--w3-gray-900)" : "var(--w3-gray-700)",
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
