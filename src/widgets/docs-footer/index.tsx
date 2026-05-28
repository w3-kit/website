import { Separator } from "../../shared/ui/separator";
import { getSectionUrl, getDocItemHref } from "../../shared/lib/urls";
import { Brand } from "../../shared/ui/header-bits/brand";
import { GitHubLink } from "../../shared/ui/header-bits/github-link";
import { FooterCopyright } from "../../shared/ui/footer-bits/footer-copyright";
import { AppFooter } from "../app-footer";
import { ThemeToggle } from "../site-footer/theme-toggle";

const gettingStartedLinks = [
  { label: "Introduction", slug: "introduction", type: "markdown" },
  { label: "Installation", slug: "installation", type: "markdown" },
  { label: "Components", slug: "components", type: "markdown" },
  { label: "CLI", slug: "cli", type: "markdown" },
];

const guidesLinks = [
  { label: "What Is a Wallet", slug: "what-is-a-wallet", type: "guide" },
  { label: "Smart Contracts", slug: "what-are-smart-contracts", type: "guide" },
  { label: "Gas Explained", slug: "gas-explained", type: "guide" },
  { label: "Glossary", slug: "glossary", type: "guide" },
];

const recipesLinks = [
  { label: "Connect Wallet", slug: "connect-wallet", type: "recipe" },
  { label: "Swap Tokens", slug: "swap-tokens", type: "recipe" },
  { label: "Mint NFT", slug: "mint-nft", type: "recipe" },
  { label: "Stake Tokens", slug: "stake-tokens", type: "recipe" },
];

const ecosystemLinks = [
  { label: "w3-kit.com", href: "https://w3-kit.com" },
  { label: "UI Components", href: getSectionUrl("ui") },
  { label: "Registry", href: getSectionUrl("registry") },
  { label: "Learn", href: getSectionUrl("learn") },
];

const communityLinks = [
  { label: "GitHub", href: "https://github.com/w3-kit" },
  { label: "Contributing", href: "https://github.com/w3-kit/website/blob/main/CONTRIBUTING.md" },
  { label: "Issues", href: "https://github.com/w3-kit/website/issues" },
];

function FooterSection({
  title,
  links,
}: {
  title: string;
  links: { label: string; slug?: string; type?: string; href?: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-sm font-medium text-w3-gray-900">{title}</h4>
      <ul className="flex flex-col gap-2">
        {links.map((link) => {
          const resolvedHref =
            link.href ?? getDocItemHref({ slug: link.slug!, type: link.type! });
          const isExternal = resolvedHref.startsWith("http");

          return (
            <li key={link.label}>
              <a
                href={resolvedHref}
                className="text-sm text-w3-gray-600 transition-colors hover:text-foreground"
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function DocsFooter() {
  return (
    <AppFooter>
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-12 sm:grid-cols-2 md:grid-cols-6 md:px-8 lg:px-16">
        <div className="flex flex-col gap-4 sm:col-span-2 md:col-span-1">
          <Brand size={28} href={getSectionUrl("docs")} />
          <p className="max-w-[200px] text-sm text-w3-gray-600">
            Documentation, guides, and recipes for building Web3 apps.
          </p>
          <GitHubLink showLabel />
        </div>

        <FooterSection title="Getting Started" links={gettingStartedLinks} />
        <FooterSection title="Guides" links={guidesLinks} />
        <FooterSection title="Recipes" links={recipesLinks} />
        <FooterSection title="Ecosystem" links={ecosystemLinks} />

        <div className="flex flex-col gap-6">
          <FooterSection title="Community" links={communityLinks} />
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-medium text-w3-gray-900">Theme</h4>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <Separator />
      <FooterCopyright />
    </AppFooter>
  );
}
