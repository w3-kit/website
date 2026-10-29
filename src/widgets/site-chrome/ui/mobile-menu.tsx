import { ChevronDown } from "lucide-react";
import { cn } from "../../../shared/lib/utils";
import type { Section } from "../../../shared/lib/urls";
import { ECOSYSTEM, ECOSYSTEM_MENU, GET_STARTED_HREF, SITE_NAV, isMenu } from "../model/site-nav";

export function MobileMenu({
  currentSection,
  onNavigate,
}: {
  currentSection: Section;
  onNavigate: () => void;
}) {
  const site = SITE_NAV[currentSection];
  return (
    <nav aria-label={`${site.name} sections`} className="flex flex-col px-4 pb-10">
      {site.items.map((item) =>
        isMenu(item) ? (
          <details key={item.label} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-[28px] font-medium tracking-[-0.02em] text-w3-ink">
              {item.label}
              <ChevronDown
                size={22}
                aria-hidden
                className="transition-transform group-open:rotate-180"
              />
            </summary>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 pb-6">
              {item.groups
                .flatMap((g) => g.links)
                .map((link) => (
                  <li key={link.href}>
                    <a href={link.href} onClick={onNavigate} className="text-w3-small text-w3-ink">
                      {link.label}
                    </a>
                  </li>
                ))}
            </ul>
          </details>
        ) : (
          <a
            key={item.label}
            href={item.href}
            onClick={onNavigate}
            className="py-4 text-[28px] font-medium tracking-[-0.02em] text-w3-ink"
          >
            {item.label}
          </a>
        ),
      )}

      <h2 className="mt-8 text-w3-small text-w3-ink-soft">{ECOSYSTEM_MENU}</h2>
      <ul className="mt-3 grid grid-cols-2 gap-2">
        {ECOSYSTEM.map((s) => (
          <li key={s.section}>
            <a
              href={s.href}
              onClick={onNavigate}
              aria-current={s.section === currentSection ? "page" : undefined}
              className={cn(
                "block p-4 text-w3-body font-medium",
                s.section === currentSection
                  ? "bg-w3-accent text-w3-on-accent"
                  : "bg-w3-tone text-w3-ink",
              )}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>

      <a
        href={GET_STARTED_HREF}
        onClick={onNavigate}
        className="mt-6 inline-flex h-12 items-center justify-center bg-w3-accent text-w3-body font-medium text-w3-on-accent"
      >
        Get started
      </a>
    </nav>
  );
}
