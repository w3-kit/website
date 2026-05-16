/**
 * Demo registry — renders the REAL mirrored ui-repo components with
 * realistic sample data. Used by:
 *   - Landing catalog grid
 *   - /ui explorer grid
 *   - /ui/<id> component detail page
 *   - /ui featured showcase
 *
 * Keyed by component slug (matches the registry id + the directory name
 * inside ui/registry/w3-kit/).
 */
import type { ComponentType } from "react";
import {
  AddressBook,
  AssetPortfolio,
  BridgeWidget,
  ConnectWallet,
  ContractInteraction,
  DeFiPositionManager,
  ENSResolver,
  FlashLoanExecutor,
  GasCalculator,
  LimitOrderManager,
  LiquidityPoolStats,
  MultisigWallet,
  NetworkSwitcher,
  NFTCard,
  NFTCollectionGrid,
  NFTMarketplaceAggregator,
  PriceTicker,
  SmartContractScanner,
  StakingInterface,
  SubscriptionPayments,
  TokenAirdrop,
  TokenCard,
  TokenList,
  TokenSwap,
  TokenVesting,
  TransactionHistory,
  WalletBalance,
} from "./w3-kit/index.gen";

const noop = () => {};
const NOW = Math.floor(Date.now() / 1000);

/* ── address-book ──────────────────────────────────────────────────── */
function AddressBookDemo() {
  return (
    <AddressBook
      searchable
      entries={[
        { id: "1", name: "Vitalik", address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045", ensName: "vitalik.eth" },
        { id: "2", name: "Treasury", address: "0x7f...3E2a", notes: "Multisig 3/5" },
        { id: "3", name: "Cold Storage", address: "0x9c...A1b3" },
      ]}
    />
  );
}

/* ── asset-portfolio ───────────────────────────────────────────────── */
function AssetPortfolioDemo() {
  const assets = [
    { symbol: "ETH", name: "Ethereum", balance: 1.42, price: 2715, value: 3855.3, change24h: 1.96, color: "#627eea" },
    { symbol: "USDC", name: "USD Coin", balance: 2500, price: 1, value: 2500, change24h: 0.01, color: "#2775ca" },
    { symbol: "WBTC", name: "Wrapped BTC", balance: 0.04, price: 67412, value: 2696.48, change24h: 0.84, color: "#f09242" },
    { symbol: "LINK", name: "Chainlink", balance: 142, price: 14.2, value: 2016.4, change24h: -0.84, color: "#2a5ada" },
  ];
  return (
    <AssetPortfolio
      assets={assets}
      totalValue={assets.reduce((s, a) => s + a.value, 0)}
      totalChange24h={1.12}
      showAllocation
    />
  );
}

/* ── bridge ────────────────────────────────────────────────────────── */
function BridgeDemo() {
  const networks = [
    { id: 1, name: "Ethereum", color: "#627eea" },
    { id: 8453, name: "Base", color: "#0052ff" },
    { id: 42161, name: "Arbitrum", color: "#28a0f0" },
  ];
  const tokens = [
    { symbol: "ETH", name: "Ethereum", balance: "1.42" },
    { symbol: "USDC", name: "USD Coin", balance: "2,500" },
  ];
  return (
    <BridgeWidget
      networks={networks}
      tokens={tokens}
      fromNetwork={networks[0]}
      toNetwork={networks[1]}
      selectedToken={tokens[0]}
    />
  );
}

/* ── connect-wallet ────────────────────────────────────────────────── */
function ConnectWalletDemo() {
  return (
    <ConnectWallet
      wallets={[
        { id: "metamask", name: "MetaMask", icon: "🦊", ecosystem: "evm", installed: true, popular: true },
        { id: "coinbase", name: "Coinbase Wallet", icon: "🔵", ecosystem: "evm", popular: true },
        { id: "wc", name: "WalletConnect", icon: "🔗", ecosystem: "both" },
        { id: "phantom", name: "Phantom", icon: "👻", ecosystem: "solana", popular: true },
      ]}
      recentWalletId="metamask"
      onConnect={noop}
    />
  );
}

/* ── contract-interaction ──────────────────────────────────────────── */
function ContractInteractionDemo() {
  return (
    <ContractInteraction
      address="0x7f...3E2a"
      functions={[
        { name: "balanceOf", type: "read", inputs: ["address"] },
        { name: "totalSupply", type: "read", inputs: [] },
        { name: "transfer", type: "write", inputs: ["address", "uint256"] },
        { name: "approve", type: "write", inputs: ["address", "uint256"] },
      ]}
    />
  );
}

/* ── defi-position-manager ─────────────────────────────────────────── */
function DeFiPositionManagerDemo() {
  return (
    <DeFiPositionManager
      positions={[
        { id: "1", protocol: "Aave v3", token: "ETH", amount: "12.5", value: "$33,937", apy: 3.2, healthFactor: 2.1, risk: "low" },
        { id: "2", protocol: "Compound", token: "USDC", amount: "5,000", value: "$5,000", apy: 4.8, risk: "low" },
        { id: "3", protocol: "Curve", token: "3CRV", amount: "1,200", value: "$1,212", apy: 8.4, risk: "medium" },
      ]}
    />
  );
}

/* ── ens-resolver ──────────────────────────────────────────────────── */
function ENSResolverDemo() {
  return <ENSResolver />;
}

/* ── flash-loan-executor ───────────────────────────────────────────── */
function FlashLoanExecutorDemo() {
  const protocols = [
    { id: "aave", name: "Aave v3", fee: 0.0009 },
    { id: "balancer", name: "Balancer", fee: 0 },
    { id: "dydx", name: "dYdX", fee: 0 },
  ];
  const tokens = [
    { symbol: "USDC", name: "USD Coin", decimals: 6 },
    { symbol: "DAI", name: "Dai", decimals: 18 },
    { symbol: "WETH", name: "Wrapped Ether", decimals: 18 },
  ];
  return (
    <FlashLoanExecutor
      protocols={protocols}
      tokens={tokens}
      selectedProtocol={protocols[0]}
      selectedToken={tokens[0]}
    />
  );
}

/* ── gas-calculator ────────────────────────────────────────────────── */
function GasCalculatorDemo() {
  return (
    <GasCalculator
      ethPrice={2715}
      selectedSpeed="standard"
      speeds={[
        { name: "slow", gwei: 18, time: "~5 min", cost: "$1.10" },
        { name: "standard", gwei: 21, time: "~30s", cost: "$1.40" },
        { name: "fast", gwei: 28, time: "~12s", cost: "$1.85" },
      ]}
    />
  );
}

/* ── limit-order-manager ───────────────────────────────────────────── */
function LimitOrderManagerDemo() {
  return (
    <LimitOrderManager
      orders={[
        { id: "1", type: "buy", token: "ETH", amount: "1.5", price: "$2,500", status: "active", timestamp: NOW - 60 },
        { id: "2", type: "sell", token: "WBTC", amount: "0.1", price: "$70,000", status: "active", timestamp: NOW - 240 },
        { id: "3", type: "buy", token: "USDC", amount: "5000", price: "$1.00", status: "filled", timestamp: NOW - 3600 },
      ]}
    />
  );
}

/* ── liquidity-pool-stats ──────────────────────────────────────────── */
function LiquidityPoolStatsDemo() {
  return (
    <LiquidityPoolStats
      pool={{
        tokenPair: "ETH / USDC",
        fee: "0.30%",
        tvl: 142_481_000,
        tvlChange24h: 2.4,
        volume24h: 18_240_000,
        volumeChange24h: -1.2,
        apr: 14.8,
        feesEarned24h: 54_720,
        transactions24h: 12_481,
        holders: 4_281,
      }}
    />
  );
}

/* ── multisig-wallet ───────────────────────────────────────────────── */
function MultisigWalletDemo() {
  const signers = [
    { address: "0x1...", name: "Alice", hasApproved: true },
    { address: "0x2...", name: "Bob", hasApproved: true },
    { address: "0x3...", name: "Carol", hasApproved: true },
    { address: "0x4...", name: "Dave", hasApproved: false },
    { address: "0x5...", name: "Eve", hasApproved: false },
  ];
  return (
    <MultisigWallet
      walletAddress="0x7f...3E2a"
      signers={signers}
      requiredApprovals={4}
      transactions={[
        {
          id: "tx-1",
          description: "Send 2.5 ETH → treasury",
          to: "0xd8da...96045",
          value: "2.5",
          status: "pending",
          approvals: 3,
          requiredApprovals: 4,
          timestamp: NOW - 300,
          signers,
        },
      ]}
    />
  );
}

/* ── network-switcher ──────────────────────────────────────────────── */
function NetworkSwitcherDemo() {
  return (
    <NetworkSwitcher
      activeChainId={1}
      onSwitch={noop}
      networks={[
        { chainId: 1, name: "Ethereum", symbol: "ETH", color: "#627eea" },
        { chainId: 8453, name: "Base", symbol: "ETH", color: "#0052ff" },
        { chainId: 42161, name: "Arbitrum", symbol: "ETH", color: "#28a0f0" },
        { chainId: 10, name: "Optimism", symbol: "ETH", color: "#ff0420" },
        { chainId: 137, name: "Polygon", symbol: "POL", color: "#8247e5" },
        { chainId: 11155111, name: "Sepolia", symbol: "ETH", color: "#9b9b9b", testnet: true },
      ]}
    />
  );
}

/* ── nft-card ──────────────────────────────────────────────────────── */
function NFTCardDemo() {
  return (
    <NFTCard
      nft={{
        id: "3100",
        name: "CryptoPunk #3100",
        collection: "CryptoPunks",
        tokenId: "3100",
        price: "4200",
        currency: "ETH",
        image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=400&q=80",
      }}
    />
  );
}

/* ── nft-collection-grid ───────────────────────────────────────────── */
function NFTCollectionGridDemo() {
  return (
    <NFTCollectionGrid
      collectionName="Bored Apes"
      columns={3}
      items={[
        { id: "1", name: "BAYC #5821", price: "32.4", currency: "ETH", image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=300&q=80" },
        { id: "2", name: "BAYC #1234", price: "28.0", currency: "ETH", image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=300&q=80" },
        { id: "3", name: "BAYC #4711", price: "29.2", currency: "ETH", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=300&q=80" },
        { id: "4", name: "BAYC #8888", price: "41.0", currency: "ETH", image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=300&q=80" },
        { id: "5", name: "BAYC #2110", price: "24.0", currency: "ETH", image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=300&q=80" },
        { id: "6", name: "BAYC #9001", price: "35.5", currency: "ETH", image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=300&q=80" },
      ]}
    />
  );
}

/* ── nft-marketplace-aggregator ────────────────────────────────────── */
function NFTMarketplaceAggregatorDemo() {
  return (
    <NFTMarketplaceAggregator
      listings={[
        { id: "1", name: "Punk #3100", collection: "CryptoPunks", marketplace: "OpenSea", price: "4200", currency: "ETH", usdPrice: "$11.4M", verified: true, image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=200&q=80" },
        { id: "2", name: "Punk #3100", collection: "CryptoPunks", marketplace: "Blur", price: "4180", currency: "ETH", usdPrice: "$11.3M", verified: true, image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=200&q=80" },
        { id: "3", name: "Punk #3100", collection: "CryptoPunks", marketplace: "LooksRare", price: "4250", currency: "ETH", usdPrice: "$11.5M", verified: false, image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=200&q=80" },
      ]}
    />
  );
}

/* ── price-ticker ──────────────────────────────────────────────────── */
function PriceTickerDemo() {
  return (
    <PriceTicker
      tokens={[
        { symbol: "ETH", name: "Ethereum", price: 2715, priceChange24h: 1.96, marketCap: 326_000_000_000, volume24h: 18_240_000_000 },
        { symbol: "BTC", name: "Bitcoin", price: 67412, priceChange24h: 0.84, marketCap: 1_330_000_000_000, volume24h: 24_120_000_000 },
        { symbol: "SOL", name: "Solana", price: 148.2, priceChange24h: -2.41, marketCap: 68_000_000_000, volume24h: 2_840_000_000 },
        { symbol: "LINK", name: "Chainlink", price: 14.2, priceChange24h: -0.84, marketCap: 8_400_000_000, volume24h: 320_000_000 },
      ]}
    />
  );
}

/* ── smart-contract-scanner ────────────────────────────────────────── */
function SmartContractScannerDemo() {
  return (
    <SmartContractScanner
      address="0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
      score={92}
      checks={[
        { name: "Verified source", status: "safe", description: "Source code matches deployed bytecode" },
        { name: "Ownership renounced", status: "safe" },
        { name: "Honeypot", status: "safe" },
        { name: "Mint function", status: "warning", description: "Owner can mint new tokens" },
      ]}
    />
  );
}

/* ── staking-interface ─────────────────────────────────────────────── */
function StakingInterfaceDemo() {
  return (
    <StakingInterface
      pools={[
        { id: "eth", name: "ETH Staking", token: "ETH", apr: 4.82, lockPeriod: 30, totalStaked: "12,481", userStaked: "32", minStake: "0.1" },
        { id: "usdc", name: "USDC Vault", token: "USDC", apr: 8.4, lockPeriod: 90, totalStaked: "8,200,000", userStaked: "0", minStake: "100" },
      ]}
    />
  );
}

/* ── subscription-payments ─────────────────────────────────────────── */
function SubscriptionPaymentsDemo() {
  return (
    <SubscriptionPayments
      plans={[
        { id: "starter", name: "Starter", price: "10", token: "USDC", interval: "month", features: ["Basic access", "Email support"] },
        { id: "pro", name: "Pro", price: "29", token: "USDC", interval: "month", features: ["Everything in Starter", "Priority support", "API access"], popular: true },
        { id: "team", name: "Team", price: "99", token: "USDC", interval: "month", features: ["Everything in Pro", "5 seats", "SLA"] },
      ]}
    />
  );
}

/* ── token-airdrop ─────────────────────────────────────────────────── */
function TokenAirdropDemo() {
  return (
    <TokenAirdrop
      airdrops={[
        { id: "1", token: "OP", amount: "1,250", status: "active", startDate: "2026-04-01", endDate: "2026-05-15" },
        { id: "2", token: "ARB", amount: "820", status: "active", startDate: "2026-04-10", endDate: "2026-06-01" },
        { id: "3", token: "UNI", amount: "400", status: "claimed", startDate: "2026-02-01", endDate: "2026-03-01" },
      ]}
    />
  );
}

/* ── token-card ────────────────────────────────────────────────────── */
function TokenCardDemo() {
  return (
    <TokenCard
      token={{
        symbol: "ETH",
        name: "Ethereum",
        price: 2715.32,
        balance: 1.42,
        priceChange24h: 1.96,
      }}
    />
  );
}

/* ── token-list ────────────────────────────────────────────────────── */
function TokenListDemo() {
  return (
    <TokenList
      tokens={[
        { symbol: "ETH", name: "Ethereum", balance: 1.42, price: 2715 },
        { symbol: "USDC", name: "USD Coin", balance: 2500, price: 1 },
        { symbol: "WBTC", name: "Wrapped BTC", balance: 0.04, price: 67412 },
        { symbol: "LINK", name: "Chainlink", balance: 142, price: 14.2 },
        { symbol: "UNI", name: "Uniswap", balance: 84, price: 8.4 },
      ]}
    />
  );
}

/* ── token-swap ────────────────────────────────────────────────────── */
function TokenSwapDemo() {
  const tokens = [
    { symbol: "ETH", name: "Ethereum", balance: "1.420", price: 2715.32 },
    { symbol: "USDC", name: "USD Coin", balance: "2,500", price: 1 },
    { symbol: "WBTC", name: "Wrapped BTC", balance: "0.04", price: 67412 },
  ];
  return (
    <TokenSwap
      tokens={tokens}
      fromToken={tokens[0]}
      toToken={tokens[1]}
      exchangeRate={2715.32}
      slippage={0.5}
      onSwap={noop}
    />
  );
}

/* ── token-vesting ─────────────────────────────────────────────────── */
function TokenVestingDemo() {
  return (
    <TokenVesting
      schedules={[
        { id: "1", token: "TEAM", totalAmount: "100,000", vestedAmount: "32,000", cliffDate: "2025-04-01", endDate: "2027-04-01", status: "active" },
        { id: "2", token: "INV", totalAmount: "250,000", vestedAmount: "62,500", cliffDate: "2025-01-01", endDate: "2028-01-01", status: "active" },
      ]}
    />
  );
}

/* ── transaction-history ───────────────────────────────────────────── */
function TransactionHistoryDemo() {
  return (
    <TransactionHistory
      transactions={[
        { hash: "0xa1...01", type: "swap", status: "success", value: "0.5", tokenSymbol: "ETH", from: "0x...", to: "0x...", timestamp: NOW - 2 },
        { hash: "0xa1...02", type: "send", status: "success", value: "420", tokenSymbol: "USDC", from: "0x...", to: "0x...", timestamp: NOW - 14 },
        { hash: "0xa1...03", type: "approve", status: "pending", value: "0", tokenSymbol: "USDT", from: "0x...", to: "0x...", timestamp: NOW - 60 },
        { hash: "0xa1...04", type: "receive", status: "success", value: "1.2", tokenSymbol: "ETH", from: "0x...", to: "0x...", timestamp: NOW - 3600 },
      ]}
    />
  );
}

/* ── wallet-balance ────────────────────────────────────────────────── */
function WalletBalanceDemo() {
  return (
    <WalletBalance
      showAllocation
      tokens={[
        { symbol: "ETH", name: "Ethereum", balance: "1.42", price: 2715.32, priceChange24h: 1.96, color: "#627eea" },
        { symbol: "USDC", name: "USD Coin", balance: "2500", price: 1, priceChange24h: 0.01, color: "#2775ca" },
        { symbol: "LINK", name: "Chainlink", balance: "142", price: 14.2, priceChange24h: -0.84, color: "#2a5ada" },
      ]}
    />
  );
}

/** Map of component slug → demo component rendering the real ui-repo
 *  component with realistic sample data. */
export const DEMOS: Record<string, ComponentType> = {
  "address-book": AddressBookDemo,
  "asset-portfolio": AssetPortfolioDemo,
  bridge: BridgeDemo,
  "connect-wallet": ConnectWalletDemo,
  "contract-interaction": ContractInteractionDemo,
  "defi-position-manager": DeFiPositionManagerDemo,
  "ens-resolver": ENSResolverDemo,
  "flash-loan-executor": FlashLoanExecutorDemo,
  "gas-calculator": GasCalculatorDemo,
  "limit-order-manager": LimitOrderManagerDemo,
  "liquidity-pool-stats": LiquidityPoolStatsDemo,
  "multisig-wallet": MultisigWalletDemo,
  "network-switcher": NetworkSwitcherDemo,
  "nft-card": NFTCardDemo,
  "nft-collection-grid": NFTCollectionGridDemo,
  "nft-marketplace-aggregator": NFTMarketplaceAggregatorDemo,
  "price-ticker": PriceTickerDemo,
  "smart-contract-scanner": SmartContractScannerDemo,
  "staking-interface": StakingInterfaceDemo,
  "subscription-payments": SubscriptionPaymentsDemo,
  "token-airdrop": TokenAirdropDemo,
  "token-card": TokenCardDemo,
  "token-list": TokenListDemo,
  "token-swap": TokenSwapDemo,
  "token-vesting": TokenVestingDemo,
  "transaction-history": TransactionHistoryDemo,
  "wallet-balance": WalletBalanceDemo,
};
