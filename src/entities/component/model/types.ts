export interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description: string;
}

export type ComponentCategory = "wallet" | "defi" | "nft" | "data" | "utility";

export interface ComponentMeta {
  id: string;
  name: string;
  description: string;
  category: ComponentCategory;
  tags: string[];
  props: ComponentProp[];
  importPath: string;
  sourceUrl: string;
  hasPreview: boolean;
}
