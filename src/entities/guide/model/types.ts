export type GuideCategory = "concepts" | "evm" | "solana" | "security" | "glossary" | "cheatsheets" | string;

export interface GuideMeta {
  id: string;
  title: string;
  description: string;
  category: GuideCategory;
  slug: string;
  content: string;
  author: string;
}
