import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "../../../shared/lib/utils";
import type { Section } from "../../../shared/lib/urls";
import { ECOSYSTEM, type Menu } from "../model/site-nav";
import { MEGA_PANEL_ID } from "./use-mega-menu";

export function PanelFrame({
  onMouseEnter,
  children,
}: {
  onMouseEnter: () => void;
  children: ReactNode;
}) {
  return (
    <div
      id={MEGA_PANEL_ID}
      onMouseEnter={onMouseEnter}
      className="w3-drop absolute inset-x-0 top-full hidden max-h-[calc(100svh-72px)] overflow-y-auto bg-w3-tone shadow-[0_24px_48px_-24px_rgba(0,0,0,0.25)] lg:block"
    >
      <div className="grid grid-cols-12 gap-x-6 px-10 pb-14 pt-10">{children}</div>
    </div>
  );
}

export function EcosystemPanel({ currentSection }: { currentSection: Section }) {
  return (
    <>
      <p className="col-span-3 text-[24px] font-medium leading-[1.2] tracking-[-0.02em] text-w3-ink">
        One toolkit, four sites.
      </p>
      <ul className="col-span-9 col-start-4 grid grid-cols-4 gap-2 pl-10">
        {ECOSYSTEM.map((site) => {
          const isCurrent = site.section === currentSection;
          return (
            <li key={site.section}>
              <a
                href={site.href}
                aria-current={isCurrent ? "page" : undefined}
                className={cn(
                  "group flex h-full flex-col gap-10 p-5 transition-colors",
                  isCurrent
                    ? "bg-w3-accent text-w3-on-accent"
                    : "bg-w3-ground text-w3-ink hover:bg-w3-tone-2",
                )}
              >
                <span className="flex items-center justify-between text-[24px] font-medium tracking-[-0.02em]">
                  {site.label}
                  <ArrowRight
                    size={18}
                    aria-hidden
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
                <span className={cn("text-w3-small", !isCurrent && "text-w3-ink-soft")}>
                  {isCurrent ? "You are here" : site.description}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export function MenuPanel({ menu }: { menu: Menu }) {
  return (
    <>
      <div className="col-span-3 flex flex-col items-start gap-6">
        <p className="text-[24px] font-medium leading-[1.2] tracking-[-0.02em] text-w3-ink">
          {menu.summary}
        </p>
        <a
          href={menu.href}
          className="group inline-flex items-center gap-2 text-w3-small font-medium text-w3-accent"
        >
          Open {menu.label}
          <ArrowRight
            size={16}
            aria-hidden
            className="transition-transform group-hover:translate-x-1"
          />
        </a>
      </div>
      <div className="col-span-9 col-start-4 grid auto-cols-[minmax(0,1fr)] grid-flow-col gap-x-6 pl-10">
        {menu.groups.map((group, i) => (
          <div key={group.title ?? i}>
            <h2 className="mb-3 h-[22px] text-w3-small font-medium text-w3-ink-soft">
              {group.title}
            </h2>
            <ul className="flex flex-col gap-1.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-w3-small text-w3-ink transition-colors hover:text-w3-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
