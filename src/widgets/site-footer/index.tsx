import { Separator } from "../../shared/ui/separator";
import { getSectionUrl } from "../../shared/lib/urls";
import { Brand } from "../../shared/ui/header-bits/brand";
import { GitHubLink } from "../../shared/ui/header-bits/github-link";
import { FooterCopyright } from "../../shared/ui/footer-bits/footer-copyright";
import { AppFooter } from "../app-footer";
import { ThemeToggle } from "./theme-toggle";

const productLinks = [
  { label: "UI Components", href: getSectionUrl("ui") },
  { label: "Documentation", href: getSectionUrl("docs") },
  { label: "Registry", href: getSectionUrl("registry") },
  { label: "Learn", href: getSectionUrl("learn") },
  { label: "Design System", href: getSectionUrl("design") },
];

const communityLinks = [
  { label: "GitHub", href: "https://github.com/w3-kit" },
  { label: "Contributing", href: "https://github.com/w3-kit/website/blob/main/CONTRIBUTING.md" },
  { label: "Issues", href: "https://github.com/w3-kit/website/issues" },
];

function FooterLinkGroup({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-sm font-medium" style={{ color: "var(--w3-gray-900)" }}>
        {title}
      </h4>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm transition-colors hover:text-foreground"
              style={{ color: "var(--w3-gray-600)" }}
              {...(link.href.startsWith("http")
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
    <AppFooter>
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-12 sm:grid-cols-2 md:grid-cols-4 md:px-8 lg:px-16">
        <div className="flex flex-col gap-4 sm:col-span-2 md:col-span-1">
          <Brand size={28} />
          <p className="max-w-[200px] text-sm" style={{ color: "var(--w3-gray-600)" }}>
            Open-source web3 developer toolkit. Build fast, ship with confidence.
          </p>
          <GitHubLink showLabel />
        </div>

        <FooterLinkGroup title="Product" links={productLinks} />
        <FooterLinkGroup title="Community" links={communityLinks} />

        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-medium" style={{ color: "var(--w3-gray-900)" }}>
            Theme
          </h4>
          <ThemeToggle />
        </div>
      </div>

      <Separator />
      <FooterCopyright />
    </AppFooter>
  );
}
