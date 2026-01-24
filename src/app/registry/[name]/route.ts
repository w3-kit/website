import { NextRequest, NextResponse } from "next/server";

// GitHub raw content base URL for the public ui repo
const GITHUB_RAW_BASE = "https://raw.githubusercontent.com/w3-kit/ui/main";

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

// Standard files that most components have
const STANDARD_FILES = [
  { name: "{component}.tsx", isMain: true },
  { name: "types.ts", isMain: false },
  { name: "utils.ts", isMain: false },
];

async function fetchFileFromGitHub(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "text/plain",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      return null;
    }

    return await response.text();
  } catch {
    return null;
  }
}

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

    // Fetch files from GitHub
    const filesWithContent: Array<{
      path: string;
      type: "registry:component";
      target: string;
      content: string;
    }> = [];

    // Try to fetch each standard file
    for (const fileTemplate of STANDARD_FILES) {
      const fileName = fileTemplate.name.replace("{component}", componentName);
      const githubUrl = `${GITHUB_RAW_BASE}/registry/w3-kit/${componentName}/${fileName}`;

      const content = await fetchFileFromGitHub(githubUrl);

      if (content) {
        // Determine target filename
        let targetName = fileName;
        if (fileName === "types.ts") {
          targetName = `${componentName}-types.ts`;
        } else if (fileName === "utils.ts") {
          targetName = `${componentName}-utils.ts`;
        }

        // Transform imports in the content to use the new file paths
        let transformedContent = content;

        // Replace relative imports for types and utils
        transformedContent = transformedContent.replace(
          /from ['"]\.\/types['"]/g,
          `from './${componentName}-types'`
        );
        transformedContent = transformedContent.replace(
          /from ['"]\.\/utils['"]/g,
          `from './${componentName}-utils'`
        );

        filesWithContent.push({
          path: `registry/w3-kit/${componentName}/${fileName}`,
          type: "registry:component",
          target: `components/w3-kit/${targetName}`,
          content: transformedContent,
        });
      }
    }

    // If no files were found, return an error
    if (filesWithContent.length === 0) {
      return NextResponse.json(
        { error: `No files found for component '${componentName}'` },
        { status: 404 }
      );
    }

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
