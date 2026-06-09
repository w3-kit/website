import type { Alternative, FeatureRow } from "./types";

export const ALTERNATIVES: Alternative[] = [
  {
    id: "scaffold-eth",
    name: "scaffold-eth",
    url: "https://scaffoldeth.io",
    tagline: "EVM dapp starter from BuidlGuidl. Hardhat + Next.js + RainbowKit.",
    useWhen: [
      "You're prototyping an EVM dapp at a hackathon and want batteries included.",
      "You want a deeply integrated Hardhat workflow with hot-reloaded contracts.",
      "Your team is already comfortable with the BuidlGuidl ecosystem.",
    ],
    chooseW3Kit: [
      "You need Solana support alongside EVM.",
      "You want a typed component library you can drop into any React app, not a fixed starter template.",
      "You want a chain/token registry as a standalone package (@w3-kit/registry).",
    ],
  },
  {
    id: "create-web3-dapp",
    name: "create-web3-dapp",
    url: "https://createweb3dapp.alchemy.com",
    tagline: "Alchemy's create-X-app generator for web3 templates.",
    useWhen: [
      "You're building specifically on the Alchemy stack and want their SDK plumbed in by default.",
      "You want a one-shot scaffolder rather than a long-term toolkit dependency.",
    ],
    chooseW3Kit: [
      "You want a toolkit you can keep using as the project grows, not just a generator.",
      "You want first-class Solana support and a typed registry.",
      "You want components that work with any RPC or aggregator, not vendor-tied.",
    ],
  },
  {
    id: "thirdweb",
    name: "thirdweb",
    url: "https://thirdweb.com",
    tagline: "Closed-ecosystem dApp SDK + hosted dashboard, paid services on top.",
    useWhen: [
      "You want a hosted dashboard with built-in analytics, payments, and managed infra.",
      "You're comfortable depending on their hosted services for production traffic.",
      "Their pre-built smart contract deployments fit your needs out of the box.",
    ],
    chooseW3Kit: [
      "You want full self-hosting, no vendor lock-in, MIT-licensed everything.",
      "You want the same component quality without a hosted dependency.",
      "You'd rather pay for infra you control than per-call SaaS pricing.",
    ],
  },
];

export const FEATURES: FeatureRow[] = [
  {
    label: "License",
    w3kit: "MIT",
    values: { "scaffold-eth": "MIT", "create-web3-dapp": "MIT", thirdweb: "Mixed" },
  },
  {
    label: "Pricing",
    w3kit: "Free",
    values: { "scaffold-eth": "Free", "create-web3-dapp": "Free", thirdweb: "Freemium" },
  },
  {
    label: "Chain support",
    w3kit: "EVM + Solana",
    values: { "scaffold-eth": "EVM", "create-web3-dapp": "EVM", thirdweb: "EVM + Solana" },
  },
  {
    label: "UI components",
    w3kit: "50+ typed React",
    values: {
      "scaffold-eth": "Starter components",
      "create-web3-dapp": "Limited",
      thirdweb: "Comprehensive",
    },
  },
  {
    label: "Chain registry",
    w3kit: "Built-in package",
    values: { "scaffold-eth": "Manual", "create-web3-dapp": "Manual", thirdweb: "Built-in" },
  },
  {
    label: "Self-hosted",
    w3kit: "Always",
    values: { "scaffold-eth": "Always", "create-web3-dapp": "Always", thirdweb: "Optional" },
  },
  {
    label: "Vendor lock-in",
    w3kit: "None",
    values: { "scaffold-eth": "None", "create-web3-dapp": "None", thirdweb: "Some" },
  },
  {
    label: "CLI",
    w3kit: "npx w3-kit add",
    values: {
      "scaffold-eth": "npm scripts",
      "create-web3-dapp": "create-web3-dapp generator",
      thirdweb: "thirdweb CLI",
    },
  },
];
