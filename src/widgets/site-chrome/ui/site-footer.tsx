import { INIT_COMMAND } from "../../../shared/lib/commands";
import { CopyCommand } from "../../../features/copy-address";
import { Logo } from "../../../shared/ui/logo";
import type { Section } from "../../../shared/lib/urls";
import { COMMUNITY, ECOSYSTEM, SITE_NAV, type MenuGroup } from "../model/site-nav";
import { ThemeToggle } from "./theme-toggle";

const ECOSYSTEM_COLUMN: MenuGroup = {
  title: "Ecosystem",
  links: ECOSYSTEM.map((site) => ({ label: site.label, href: site.href })),
};

export function SiteFooter({ currentSection }: { currentSection: Section }) {
  const columns = [...SITE_NAV[currentSection].footer, ECOSYSTEM_COLUMN, COMMUNITY];

  return (
    <footer className="mt-auto overflow-hidden bg-[var(--w3-footer-ground)] text-[var(--w3-footer-ink)]">
      <div className="flex flex-col gap-8 px-4 pt-20 md:flex-row md:items-end md:justify-between md:px-10 md:pt-32">
        <h2 className="text-w3-title font-medium">
          <span className="block">Start with</span>
          <span className="block">one command.</span>
        </h2>
        <CopyCommand
          command={INIT_COMMAND}
          className="h-14 self-start px-6 text-w3-body md:self-auto"
        />
      </div>

      <nav
        aria-label="Footer"
        className="grid grid-cols-2 gap-x-6 gap-y-12 px-4 pt-20 sm:grid-cols-3 md:px-10 md:pt-28 lg:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]"
      >
        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="mb-4 text-w3-small font-medium text-[var(--w3-footer-soft)]">
              {column.title}
            </h2>
            <ul className="flex flex-col gap-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-w3-small text-[var(--w3-footer-ink)] transition-colors hover:text-[var(--w3-footer-accent)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="flex flex-col gap-6 px-4 pt-20 sm:flex-row sm:items-center sm:justify-between md:px-10 md:pt-28">
        <p className="text-w3-small text-[var(--w3-footer-soft)]">
          © {new Date().getFullYear()} w3-kit. Open source under the MIT licence.
        </p>
        <ThemeToggle className="-mx-4 sm:mx-0" />
      </div>

      {/* The name returns at full width, the logo's four brackets beside it. */}
      <div
        aria-hidden
        className="flex select-none items-end gap-[2vw] px-4 pb-4 pt-10 md:px-10 md:pb-8"
      >
        <Logo size={0} className="h-[14vw] w-[14vw] shrink-0 text-w3-accent" />
        <span className="text-[27vw] font-semibold leading-[0.72] tracking-[-0.06em]">w3-kit</span>
      </div>
    </footer>
  );
}
