import { Separator } from "../../shared/ui/separator";
import { Logo } from "../../shared/ui/logo";
import { getSectionUrl, getLandingUrl } from "../../shared/lib/urls";
import { GitHubIcon } from "../../shared/ui/github-icon";
import { ThemeToggle } from "./theme-toggle";

const productLinks = [
  { label: "UI Components", href: () => getSectionUrl("ui") },
  { label: "Documentation", href: () => getSectionUrl("docs") },
  { label: "Registry", href: () => getSectionUrl("registry") },
  { label: "Learn", href: () => getSectionUrl("learn") },
  { label: "Design System", href: () => getSectionUrl("design") },
];

const communityLinks = [
  { label: "GitHub", href: "https://github.com/w3-kit" },
  { label: "Contributing", href: "https://github.com/w3-kit/website/blob/main/CONTRIBUTING.md" },
  { label: "Issues", href: "https://github.com/w3-kit/website/issues" },
];

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string | (() => string) }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-sm font-medium" style={{ color: "var(--w3-gray-900)" }}>
        {title}
      </h4>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={typeof link.href === "function" ? link.href() : link.href}
              className="text-sm transition-colors hover:text-foreground"
              style={{ color: "var(--w3-gray-600)" }}
              {...(typeof link.href === "string" && link.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto" style={{ borderTop: "1px solid var(--w3-border-subtle)" }}>
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-12 sm:grid-cols-2 md:grid-cols-4 md:px-8 lg:px-16">
        {/* Brand column */}
        <div className="flex flex-col gap-4 sm:col-span-2 md:col-span-1">
          <a href={getLandingUrl()} className="flex items-center gap-2">
            <Logo size={28} className="text-[var(--w3-accent)]" />
            <span className="text-sm font-semibold" style={{ color: "var(--w3-gray-900)" }}>
              w3-kit
            </span>
          </a>
          <p className="max-w-[200px] text-sm" style={{ color: "var(--w3-gray-600)" }}>
            Open-source web3 developer toolkit. Build fast, ship with confidence.
          </p>
          <a
            href="https://github.com/w3-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm transition-colors hover:text-foreground"
            style={{ color: "var(--w3-gray-600)" }}
          >
            <GitHubIcon size={16} />
            GitHub
          </a>
        </div>

        {/* Product links */}
        <FooterLinkGroup title="Product" links={productLinks} />

        {/* Community links */}
        <FooterLinkGroup title="Community" links={communityLinks} />

        {/* Theme */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-medium" style={{ color: "var(--w3-gray-900)" }}>
            Theme
          </h4>
          <ThemeToggle />
        </div>
      </div>

      <Separator />

      {/* Bottom bar */}
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 md:px-8 lg:px-16">
        <p className="text-xs" style={{ color: "var(--w3-gray-500)" }}>
          &copy; {new Date().getFullYear()} w3-kit. MIT License.
        </p>
      </div>
    </footer>
  );
}
