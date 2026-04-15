import { Separator } from "../../shared/ui/separator";
import { GitHubIcon } from "../../shared/ui/github-icon";
import { getSectionUrl } from "../../shared/lib/urls";
import { ThemeToggle } from "../site-footer/theme-toggle";

const subdomainLinks = [
  { label: "Docs", section: "docs" as const },
  { label: "Registry", section: "registry" as const },
  { label: "Learn", section: "learn" as const },
];

export function UiFooter() {
  return (
    <footer className="mt-auto" style={{ borderTop: "1px solid var(--w3-border-subtle)" }}>
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between md:px-8 lg:px-16">
        {/* Left: branding + copyright */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold" style={{ color: "var(--w3-gray-900)" }}>
            w3-kit UI
          </span>
          <Separator orientation="vertical" className="!h-4" />
          <p className="text-xs" style={{ color: "var(--w3-gray-500)" }}>
            &copy; {new Date().getFullYear()} w3-kit. MIT License.
          </p>
        </div>

        {/* Center: subdomain links */}
        <nav className="flex items-center gap-4">
          {subdomainLinks.map((link) => (
            <a
              key={link.section}
              href={getSectionUrl(link.section)}
              className="text-sm transition-colors hover:text-foreground"
              style={{ color: "var(--w3-gray-600)" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: GitHub + ThemeToggle */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/w3-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm transition-colors hover:text-foreground"
            style={{ color: "var(--w3-gray-600)" }}
          >
            <GitHubIcon size={16} />
            GitHub
          </a>
          <Separator orientation="vertical" className="!h-4" />
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
