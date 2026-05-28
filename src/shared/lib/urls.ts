const DOMAIN = "w3-kit.com";

/**
 * Returns the URL for a section.
 * - Production: subdomain URLs (ui.w3-kit.com)
 * - Local dev: subdomain URLs (ui.localhost:3000)
 *
 * Relies on the browser resolving *.localhost to 127.0.0.1 (RFC 6761).
 * Modern Chrome/Firefox/Safari/Edge handle this; if yours doesn't, add an
 * /etc/hosts entry: `127.0.0.1 ui.localhost docs.localhost registry.localhost learn.localhost design.localhost`.
 */
export function getSectionUrl(section: string): string {
  if (typeof window === "undefined") return `/${section}`;
  const host = window.location.host;
  const protocol = window.location.protocol;

  // Production: subdomain on the production domain
  if (!host.includes("localhost") && !host.includes("127.0.0.1")) {
    return `${protocol}//${section}.${DOMAIN}`;
  }

  // Local dev: subdomain on localhost
  const port = window.location.port;
  return `${protocol}//${section}.localhost${port ? `:${port}` : ""}`;
}

/** Resolves a doc nav item to its full URL path */
export function getDocItemHref(item: { slug: string; type: string }): string {
  const base = getSectionUrl("docs");
  if (item.type === "guide") return `${base}/guide/${item.slug}`;
  if (item.type === "recipe") return `${base}/recipe/${item.slug}`;
  return `${base}/${item.slug}`;
}

export function getLandingUrl(): string {
  if (typeof window === "undefined") return "/";
  const host = window.location.host;
  const protocol = window.location.protocol;

  if (!host.includes("localhost") && !host.includes("127.0.0.1")) {
    return `${protocol}//www.${DOMAIN}`;
  }

  // If on a subdomain, link back to root localhost
  const currentSub = host.split(".")[0];
  const isOnSubdomain = ["ui", "docs", "registry", "learn", "design"].includes(currentSub);

  if (isOnSubdomain) {
    const port = window.location.port;
    return `${protocol}//localhost${port ? `:${port}` : ""}`;
  }

  return "/";
}
