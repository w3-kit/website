/// <reference types="vite/client" />

declare module "*.md?raw" {
  const content: string;
  export default content;
}

declare module "*.tsx?raw" {
  const content: string;
  export default content;
}

declare module "*.ts?raw" {
  const content: string;
  export default content;
}

declare module "*/meta.json" {
  const value: {
    name: string;
    description: string;
    author?: string;
    chains: string[];
    dependencies: Record<string, string[]>;
  };
  export default value;
}
