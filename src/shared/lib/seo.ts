import { getCanonicalUrl } from "./urls";

type HeadMeta =
  | { title: string }
  | { name: string; content: string }
  | { property: string; content: string }
  | { charSet: string }
  | { httpEquiv: string; content: string };

type HeadLink = { rel: string; href: string; type?: string };

export type SeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
};

export type SeoOutput = {
  meta: HeadMeta[];
  links: HeadLink[];
};

const SUFFIX = " — w3-kit";
const DEFAULT_OG_IMAGE = "/og.png";

export function buildMeta(input: SeoInput): SeoOutput {
  const fullTitle = input.title.includes("w3-kit") ? input.title : `${input.title}${SUFFIX}`;
  const canonical = getCanonicalUrl(input.path);
  // Always serve the OG image from the apex; subdomain rewrites turn
  // `registry.w3-kit.com/og.png` into `/registry/og.png` which 404s.
  const image = input.image ?? new URL(DEFAULT_OG_IMAGE, getCanonicalUrl("/")).toString();
  const ogType = input.type ?? "website";

  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: input.description },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: ogType },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: input.description },
      { property: "og:image", content: image },
      { property: "og:url", content: canonical },
    ],
    links: [{ rel: "canonical", href: canonical }],
  };
}
