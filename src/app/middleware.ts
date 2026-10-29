import { SUBDOMAINS, type Subdomain } from "../shared/lib/urls";

export function getSubdomain(host: string): Subdomain | "landing" {
  const [first] = host.split(".");
  // ui.localhost:3000 locally, ui.w3-kit.com in production. The apex has no section label.
  const isSectionHost = host.split(".").length >= (host.includes("localhost") ? 2 : 3);
  return isSectionHost && (SUBDOMAINS as readonly string[]).includes(first)
    ? (first as Subdomain)
    : "landing";
}

/** Maps a subdomain URL's path onto the route tree: ui.w3-kit.com/bridge -> /ui/bridge. */
export function toInternalPath(subdomain: Subdomain, pathname: string): string {
  return pathname === `/${subdomain}` || pathname.startsWith(`/${subdomain}/`)
    ? pathname
    : `/${subdomain}${pathname === "/" ? "" : pathname}`;
}

/** Inverse of toInternalPath, so the address bar never shows the internal prefix. */
export function toPublicPath(subdomain: Subdomain, pathname: string): string {
  if (pathname === `/${subdomain}`) return "/";
  return pathname.startsWith(`/${subdomain}/`) ? pathname.slice(subdomain.length + 1) : pathname;
}
