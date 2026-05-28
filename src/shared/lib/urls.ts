const DOMAIN = "w3-kit.com";
const DEV_HOST = "localhost:3000";

/**
 * Returns the URL for a section.
 * - Production: https://${section}.w3-kit.com
 * - Local dev:  http://${section}.localhost:3000
 *
 * Uses `import.meta.env.PROD` so SSR and client always produce the same string
 * (preventing hydration mismatches that would silently keep stale hrefs).
 *
 * Relies on the browser resolving *.localhost to 127.0.0.1 (RFC 6761).
 * Modern Chrome/Firefox/Safari/Edge handle this; if yours doesn't, add to /etc/hosts:
 * `127.0.0.1 ui.localhost docs.localhost registry.localhost learn.localhost design.localhost`.
 */
export function getSectionUrl(section: string): string {
  return import.meta.env.PROD ? `https://${section}.${DOMAIN}` : `http://${section}.${DEV_HOST}`;
}

/** Resolves a doc nav item to its full URL path */
export function getDocItemHref(item: { slug: string; type: string }): string {
  const base = getSectionUrl("docs");
  if (item.type === "guide") return `${base}/guide/${item.slug}`;
  if (item.type === "recipe") return `${base}/recipe/${item.slug}`;
  return `${base}/${item.slug}`;
}

/** Returns the landing-page URL (root host with no subdomain). */
export function getLandingUrl(): string {
  return import.meta.env.PROD ? `https://www.${DOMAIN}` : `http://${DEV_HOST}`;
}

/** True if the href points off-domain (used to decide target="_blank"). */
export function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href) && !href.includes(DOMAIN);
}
