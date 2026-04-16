/**
 * Reliable NFT image URLs for previews.
 * Nouns: noun.pics generates PNGs from on-chain SVG data. Always available.
 */

export const NOUNS: Record<string, string> = {
  "1": "https://noun.pics/1",
  "42": "https://noun.pics/42",
  "100": "https://noun.pics/100",
  "200": "https://noun.pics/200",
  "300": "https://noun.pics/300",
  "400": "https://noun.pics/400",
  "500": "https://noun.pics/500",
  "600": "https://noun.pics/600",
};

export interface NFTItem {
  id: string;
  name: string;
  image: string;
  price: string;
  currency: string;
  rarity: "common" | "rare" | "legendary";
}

export interface MarketplaceListing {
  id: string;
  name: string;
  collection: string;
  marketplace: "OpenSea" | "Blur" | "LooksRare";
  domain: string;
  image: string;
  price: string;
  lastSale?: string;
}

export const NFT_COLLECTIONS = {
  nouns: {
    name: "Nouns",
    description: "One Noun, every day, forever.",
    items: [
      { id: "1", name: "Noun #1", image: NOUNS["1"], price: "42.5", currency: "ETH", rarity: "legendary" as const },
      { id: "42", name: "Noun #42", image: NOUNS["42"], price: "38.2", currency: "ETH", rarity: "rare" as const },
      { id: "100", name: "Noun #100", image: NOUNS["100"], price: "45.0", currency: "ETH", rarity: "legendary" as const },
      { id: "200", name: "Noun #200", image: NOUNS["200"], price: "35.8", currency: "ETH", rarity: "common" as const },
      { id: "300", name: "Noun #300", image: NOUNS["300"], price: "29.5", currency: "ETH", rarity: "common" as const },
      { id: "400", name: "Noun #400", image: NOUNS["400"], price: "51.2", currency: "ETH", rarity: "rare" as const },
    ],
  },
  marketplace: [
    { id: "1", name: "Noun #1", collection: "Nouns", marketplace: "OpenSea" as const, domain: "opensea.io", image: NOUNS["1"], price: "42.5", lastSale: "40.0" },
    { id: "2", name: "Noun #42", collection: "Nouns", marketplace: "Blur" as const, domain: "blur.io", image: NOUNS["42"], price: "38.2", lastSale: "41.5" },
    { id: "3", name: "Noun #100", collection: "Nouns", marketplace: "OpenSea" as const, domain: "opensea.io", image: NOUNS["100"], price: "45.0", lastSale: "43.0" },
    { id: "4", name: "Noun #200", collection: "Nouns", marketplace: "LooksRare" as const, domain: "looksrare.org", image: NOUNS["200"], price: "35.8", lastSale: "37.2" },
    { id: "5", name: "Noun #300", collection: "Nouns", marketplace: "Blur" as const, domain: "blur.io", image: NOUNS["300"], price: "29.5", lastSale: "32.0" },
  ] as MarketplaceListing[],
};

/* ── Image cache ─────────────────────────────────────────────────────── */

const imageCache = new Map<string, string>();

export function preloadNFTImage(url: string): void {
  if (imageCache.has(url) || typeof window === "undefined") return;
  imageCache.set(url, url);

  const img = new window.Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) imageCache.set(url, URL.createObjectURL(blob));
        });
      }
    } catch { /* CORS — keep original */ }
  };
  img.src = url;
}

export function getCachedNFTImage(url: string): string {
  return imageCache.get(url) ?? url;
}

export function preloadAllNFTImages(): void {
  Object.values(NOUNS).forEach(preloadNFTImage);
}
