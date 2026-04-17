export interface RecipeMeta {
  id: string;
  name: string;
  description: string;
  slug: string;
  chains: string[];
  dependencies: Record<string, string[]>;
  evmCode: string;
  solanaCode: string;
  learnContent: string;
  author: string;
}
