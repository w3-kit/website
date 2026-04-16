/**
 * Reliable NFT image URLs for previews.
 *
 * Nouns: noun.pics generates PNGs on-the-fly from on-chain data.
 * Always available, no IPFS/CDN issues.
 */

// Nouns DAO — instant PNG generation from on-chain SVG
export const NOUNS: Record<string, string> = {
  "1": "https://noun.pics/1",
  "42": "https://noun.pics/42",
  "100": "https://noun.pics/100",
  "200": "https://noun.pics/200",
  "300": "https://noun.pics/300",
  "400": "https://noun.pics/400",
};

// Collection metadata for previews
export const NFT_COLLECTIONS = {
  nouns: {
    name: "Nouns",
    description: "One Noun, every day, forever.",
    items: [
      { id: "1", name: "Noun #1", image: NOUNS["1"], price: "42.5", currency: "ETH" },
      { id: "42", name: "Noun #42", image: NOUNS["42"], price: "38.2", currency: "ETH" },
      { id: "100", name: "Noun #100", image: NOUNS["100"], price: "45.0", currency: "ETH" },
      { id: "200", name: "Noun #200", image: NOUNS["200"], price: "35.8", currency: "ETH" },
    ],
  },
  marketplace: [
    { id: "1", name: "Noun #1", collection: "Nouns", marketplace: "OpenSea", domain: "opensea.io", image: NOUNS["1"], price: "42.5" },
    { id: "2", name: "Noun #42", collection: "Nouns", marketplace: "Blur", domain: "blur.io", image: NOUNS["42"], price: "38.2" },
    { id: "3", name: "Noun #100", collection: "Nouns", marketplace: "OpenSea", domain: "opensea.io", image: NOUNS["100"], price: "45.0" },
  ],
};
