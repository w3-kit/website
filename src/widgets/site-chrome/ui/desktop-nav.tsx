import { isMenu, type SiteNav } from "../model/site-nav";
import { MenuTrigger } from "./menu-trigger";
import type { MegaMenu } from "./use-mega-menu";

export function DesktopNav({ site, menu }: { site: SiteNav; menu: MegaMenu }) {
  if (site.items.length === 0) return null;
  return (
    <nav aria-label={`${site.name} sections`} className="hidden h-full items-center gap-1 lg:flex">
      {site.items.map((item) =>
        isMenu(item) ? (
          <MenuTrigger key={item.label} label={item.label} menu={menu} />
        ) : (
          <a
            key={item.label}
            href={item.href}
            onMouseEnter={menu.closeOnHover}
            className="inline-flex h-11 items-center px-3 text-w3-small font-medium text-w3-ink transition-colors hover:text-w3-accent"
          >
            {item.label}
          </a>
        ),
      )}
    </nav>
  );
}
