import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Component metadata for all available components
const COMPONENT_METADATA: Record<
  string,
  { title: string; description: string; dependencies?: string[] }
> = {
  "address-book": {
    title: "Address Book",
    description:
      "A contact management component for storing and organizing blockchain addresses",
  },
  "asset-portfolio": {
    title: "Asset Portfolio",
    description:
      "Portfolio tracker with distribution charts and performance metrics",
  },
  bridge: {
    title: "Bridge",
    description: "Cross-chain token bridge component for transferring assets",
  },
  "connect-wallet": {
    title: "Connect Wallet",
    description:
      "Multi-wallet connection button supporting MetaMask, WalletConnect, Coinbase, and Phantom",
  },
  "contract-interaction": {
    title: "Contract Interaction",
    description: "Smart contract interaction interface for reading and writing",
  },
  "defi-position-manager": {
    title: "DeFi Position Manager",
    description: "Manage and track DeFi positions across protocols",
  },
  "ens-resolver": {
    title: "ENS Resolver",
    description: "Ethereum Name Service lookup and resolution component",
  },
  "flash-loan-executor": {
    title: "Flash Loan Executor",
    description: "Flash loan execution interface for DeFi operations",
  },
  "gas-calculator": {
    title: "Gas Calculator",
    description: "Gas estimation and fee calculation component",
  },
  "limit-order-manager": {
    title: "Limit Order Manager",
    description: "Manage limit orders and stop-loss orders with real-time status",
  },
  "liquidity-pool-stats": {
    title: "Liquidity Pool Stats",
    description: "Display liquidity pool statistics and metrics",
  },
  "multisig-wallet": {
    title: "Multisig Wallet",
    description: "Multi-signature wallet management interface",
  },
  "network-switcher": {
    title: "Network Switcher",
    description: "Blockchain network selection and switching component",
  },
  "nft-card": {
    title: "NFT Card",
    description: "NFT display card with metadata and attributes",
  },
  "nft-collection-grid": {
    title: "NFT Collection Grid",
    description: "Grid layout for displaying NFT collections",
  },
  "nft-marketplace-aggregator": {
    title: "NFT Marketplace Aggregator",
    description: "Aggregate NFT listings from multiple marketplaces",
  },
  "price-ticker": {
    title: "Price Ticker",
    description:
      "Real-time cryptocurrency price ticker with auto-refresh and market stats",
  },
  "smart-contract-scanner": {
    title: "Smart Contract Scanner",
    description: "Smart contract security analysis and verification",
  },
  "staking-interface": {
    title: "Staking Interface",
    description: "Token staking and unstaking interface with rewards tracking",
  },
  "subscription-payments": {
    title: "Subscription Payments",
    description: "Recurring crypto payment subscription management",
  },
  "token-airdrop": {
    title: "Token Airdrop",
    description: "Token airdrop distribution and claiming interface",
  },
  "token-card": {
    title: "Token Card",
    description: "Token information display card with price and stats",
  },
  "token-list": {
    title: "Token List",
    description: "Searchable token list with filtering and selection",
  },
  "token-swap": {
    title: "Token Swap",
    description: "Token swap interface with price quotes and slippage settings",
  },
  "token-vesting": {
    title: "Token Vesting",
    description: "Token vesting schedule tracker with claiming functionality",
  },
  "transaction-history": {
    title: "Transaction History",
    description: "Transaction history list with filtering and details",
  },
  "wallet-balance": {
    title: "Wallet Balance",
    description: "Wallet balance display with token breakdown",
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;

    // Remove .json extension if present
    const componentName = name.replace(/\.json$/, "");

    // Check if component exists in metadata
    const metadata = COMPONENT_METADATA[componentName];
    if (!metadata) {
      return NextResponse.json(
        { error: `Component '${componentName}' not found` },
        { status: 404 }
      );
    }

    // Define the registry path - adjust based on your deployment
    // In production, you might want to fetch from GitHub raw content or bundle these files
    const registryBasePath = path.join(
      process.cwd(),
      "..",
      "ui",
      "registry",
      "w3-kit",
      componentName
    );

    // Get list of files in the component directory
    let files: string[];
    try {
      files = await fs.readdir(registryBasePath);
    } catch {
      // If local files not found, return a minimal registry entry
      // This allows the endpoint to work even without local files
      return NextResponse.json({
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: componentName,
        type: "registry:component",
        title: metadata.title,
        description: metadata.description,
        dependencies: metadata.dependencies || [],
        files: [
          {
            path: `registry/w3-kit/${componentName}/${componentName}.tsx`,
            type: "registry:component",
            target: `components/w3-kit/${componentName}.tsx`,
          },
        ],
      });
    }

    // Build files array with content
    const filesWithContent = await Promise.all(
      files
        .filter((file) => file.endsWith(".ts") || file.endsWith(".tsx"))
        .map(async (file) => {
          const filePath = path.join(registryBasePath, file);
          const content = await fs.readFile(filePath, "utf-8");

          // Determine target filename
          let targetName = file;
          if (file === "types.ts") {
            targetName = `${componentName}-types.ts`;
          } else if (file === "utils.ts") {
            targetName = `${componentName}-utils.ts`;
          }

          return {
            path: `registry/w3-kit/${componentName}/${file}`,
            type: "registry:component" as const,
            target: `components/w3-kit/${targetName}`,
            content,
          };
        })
    );

    // Build the registry item response
    const registryItem = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: componentName,
      type: "registry:component",
      title: metadata.title,
      description: metadata.description,
      dependencies: metadata.dependencies || [],
      files: filesWithContent,
    };

    return NextResponse.json(registryItem);
  } catch (error) {
    console.error("Registry error:", error);
    return NextResponse.json(
      { error: "Failed to fetch component" },
      { status: 500 }
    );
  }
}
