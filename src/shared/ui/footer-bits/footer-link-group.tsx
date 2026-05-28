import { getDocItemHref, isExternalHref } from "../../lib/urls";

/**
 * Accepts either a pre-resolved `href` or a doc `slug`+`type` that gets
 * resolved to a doc href. Docs footer uses the slug variant for content links;
 * everything else passes hrefs directly.
 */
export interface FooterLink {
  label: string;
  href?: string;
  slug?: string;
  type?: string;
}

interface FooterLinkGroupProps {
  title: string;
  links: FooterLink[];
}

export function FooterLinkGroup({ title, links }: FooterLinkGroupProps) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-sm font-medium text-w3-gray-900">{title}</h4>
      <ul className="flex flex-col gap-2">
        {links.map((link) => {
          const href = link.href ?? getDocItemHref({ slug: link.slug!, type: link.type! });
          const external = isExternalHref(href);
          return (
            <li key={link.label}>
              <a
                href={href}
                className="text-sm text-w3-gray-600 transition-colors hover:text-foreground"
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
