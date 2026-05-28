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
 *
 * The underlying components are mirrored at build time by
 * scripts/generate-ui-mirror.ts. When the ui registry isn't available
 * (e.g., Vercel CI without the sibling repo / submodule), the namespace
 * import resolves to an empty module — each lookup returns undefined and
 * the demo renders null. Consumers already null-check `DEMOS[slug]`.
 */
import type { ComponentType } from "react";
import * as W3Kit from "./w3-kit/index.gen";

const C = W3Kit as unknown as Record<string, ComponentType<Record<string, unknown>> | undefined>;
const AddressBook = C.AddressBook;
const AssetPortfolio = C.AssetPortfolio;
const BridgeWidget = C.BridgeWidget;
const ConnectWallet = C.ConnectWallet;
const ContractInteraction = C.ContractInteraction;
const DeFiPositionManager = C.DeFiPositionManager;
const ENSResolver = C.ENSResolver;
const FlashLoanExecutor = C.FlashLoanExecutor;
const GasCalculator = C.GasCalculator;
const LimitOrderManager = C.LimitOrderManager;
const LiquidityPoolStats = C.LiquidityPoolStats;
const MultisigWallet = C.MultisigWallet;
const NetworkSwitcher = C.NetworkSwitcher;
const NFTCard = C.NFTCard;
const NFTCollectionGrid = C.NFTCollectionGrid;
const NFTMarketplaceAggregator = C.NFTMarketplaceAggregator;
const PriceTicker = C.PriceTicker;
const SmartContractScanner = C.SmartContractScanner;
const StakingInterface = C.StakingInterface;
const SubscriptionPayments = C.SubscriptionPayments;
const TokenAirdrop = C.TokenAirdrop;
const TokenCard = C.TokenCard;
const TokenList = C.TokenList;
const TokenSwap = C.TokenSwap;
const TokenVesting = C.TokenVesting;
const TransactionHistory = C.TransactionHistory;
const WalletBalance = C.WalletBalance;

const noop = () => {};
const NOW = Math.floor(Date.now() / 1000);

function AddressBookDemo() {
  if (!AddressBook) return null;
  return (
    <AddressBook
      entries={[
        {
          id: "1",
          name: "Vitalik",
          address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
          ensName: "vitalik.eth",
        },
        {
          id: "2",
          name: "Treasury",
          address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
        },
        {
          id: "3",
          name: "Deployer",
          address: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
          ensName: "deployer.eth",
        },
      ]}
    />
  );
}

function AssetPortfolioDemo() {
  if (!AssetPortfolio) return null;
  const assets = [
    {
      symbol: "ETH",
      name: "Ethereum",
      balance: 4.21,
      price: 3352.02,
      value: 14_112,
      change24h: 3.12,
      color: "#627EEA",
    },
    {
      symbol: "BTC",
      name: "Bitcoin",
      balance: 0.125,
      price: 67_496,
      value: 8_437,
      change24h: 1.87,
      color: "#F7931A",
    },
    {
      symbol: "USDC",
      name: "USD Coin",
      balance: 3850,
      price: 1,
      value: 3_850,
      change24h: 0.01,
      color: "#2775CA",
    },
    {
      symbol: "SOL",
      name: "Solana",
      balance: 15.8,
      price: 148.32,
      value: 2_343.5,
      change24h: -2.45,
      color: "#9945FF",
    },
  ];
  const totalValue = 28_742.5;
  const totalChange24h = assets.reduce((s, a) => s + (a.value / totalValue) * a.change24h, 0);
  return (
    <AssetPortfolio
      assets={assets}
      totalValue={totalValue}
      totalChange24h={totalChange24h}
      showAllocation
    />
  );
}

function BridgeDemo() {
  if (!BridgeWidget) return null;
  const networks = [
    { id: 1, name: "Ethereum", color: "#627EEA" },
    { id: 137, name: "Polygon", color: "#8247E5" },
    { id: 42161, name: "Arbitrum", color: "#28A0F0" },
    { id: 10, name: "Optimism", color: "#FF0420" },
  ];
  const tokens = [
    { symbol: "ETH", name: "Ether", balance: "1.234" },
    { symbol: "USDC", name: "USD Coin", balance: "1,250.00" },
    { symbol: "USDT", name: "Tether", balance: "890.50" },
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

function ConnectWalletDemo() {
  if (!ConnectWallet) return null;
  return (
    <ConnectWallet
      wallets={[
        {
          id: "metamask",
          name: "MetaMask",
          icon: "https://logo.clearbit.com/metamask.io",
          ecosystem: "evm",
          popular: true,
        },
        {
          id: "coinbase",
          name: "Coinbase Wallet",
          icon: "https://logo.clearbit.com/coinbase.com",
          ecosystem: "evm",
          popular: true,
        },
        {
          id: "walletconnect",
          name: "WalletConnect",
          icon: "https://logo.clearbit.com/walletconnect.com",
          ecosystem: "evm",
        },
        {
          id: "phantom",
          name: "Phantom",
          icon: "https://logo.clearbit.com/phantom.app",
          ecosystem: "solana",
          popular: true,
        },
      ]}
      onConnect={noop}
    />
  );
}

function ContractInteractionDemo() {
  if (!ContractInteraction) return null;
  return (
    <ContractInteraction
      address="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
      standard="ERC-20"
      functions={[
        {
          name: "Send Tokens",
          type: "write",
          description: "Transfer tokens to another address",
          inputs: ["Recipient", "Amount"],
          inputDetails: [
            { label: "Recipient", placeholder: "vitalik.eth or 0x...", helper: "ENS supported" },
            { label: "Amount", placeholder: "100.00", helper: "USDC" },
          ],
        },
        {
          name: "Approve Spending",
          type: "write",
          description: "Allow a contract to spend your tokens",
          inputs: ["Spender", "Limit"],
          inputDetails: [
            { label: "Spender", placeholder: "Uniswap Router or 0x..." },
            { label: "Limit", placeholder: "1000.00", helper: "USDC" },
          ],
        },
        {
          name: "Check Balance",
          type: "read",
          description: "View token balance of any wallet",
          inputs: ["Wallet to check"],
          inputDetails: [
            {
              label: "Wallet to check",
              placeholder: "vitalik.eth or 0x...",
              helper: "Whose balance?",
            },
          ],
          outputs: ["uint256"],
        },
        {
          name: "Total Supply",
          type: "read",
          description: "View total USDC in circulation",
          inputs: [],
          outputs: ["uint256"],
        },
      ]}
    />
  );
}

function DeFiPositionManagerDemo() {
  if (!DeFiPositionManager) return null;
  return (
    <DeFiPositionManager
      positions={[
        {
          id: "1",
          protocol: "Aave",
          token: "ETH",
          amount: "5.24",
          value: "$16,892.00",
          apy: 3.42,
          healthFactor: 2.15,
          risk: "low",
        },
        {
          id: "2",
          protocol: "Compound",
          token: "USDC",
          amount: "10,000",
          value: "$10,000.00",
          apy: 5.67,
          healthFactor: 1.48,
          risk: "medium",
        },
        {
          id: "3",
          protocol: "Aave",
          token: "WBTC",
          amount: "0.85",
          value: "$54,230.00",
          apy: 1.23,
          healthFactor: 2.82,
          risk: "low",
        },
      ]}
    />
  );
}

function ENSResolverDemo() {
  if (!ENSResolver) return null;
  return <ENSResolver suggestions={["vitalik.eth", "nick.eth", "brantly.eth"]} />;
}

function FlashLoanExecutorDemo() {
  if (!FlashLoanExecutor) return null;
  const protocols = [
    { id: "aave", name: "Aave", fee: 0.0009 },
    { id: "dydx", name: "dYdX", fee: 0 },
  ];
  const tokens = [
    { symbol: "ETH", name: "Ethereum" },
    { symbol: "USDC", name: "USD Coin" },
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

function GasCalculatorDemo() {
  if (!GasCalculator) return null;
  return (
    <GasCalculator
      ethPrice={3420}
      baseFeeGwei={10}
      network="Ethereum mainnet"
      selectedSpeed="standard"
      speeds={[
        { name: "economy", gwei: 12, time: "~2 min", cost: "$0.86" },
        { name: "standard", gwei: 18, time: "~30s", cost: "$1.29" },
        { name: "fast", gwei: 25, time: "~15s", cost: "$1.80" },
      ]}
      txTypes={[
        { key: "transfer", label: "Transfer", icon: "transfer", gasLimit: 21000 },
        { key: "swap", label: "Swap", icon: "swap", gasLimit: 150000 },
        { key: "nft", label: "NFT Mint", icon: "nft", gasLimit: 120000 },
        { key: "contract", label: "Contract", icon: "contract", gasLimit: 200000 },
      ]}
      selectedTxType="transfer"
    />
  );
}

function LimitOrderManagerDemo() {
  if (!LimitOrderManager) return null;
  return (
    <LimitOrderManager
      orders={[
        {
          id: "1",
          type: "buy",
          token: "ETH",
          amount: "2.5",
          price: "3,180.00",
          status: "active",
          timestamp: NOW - 120,
        },
        {
          id: "2",
          type: "sell",
          token: "ETH",
          amount: "1.0",
          price: "3,450.00",
          status: "filled",
          timestamp: NOW - 3600,
        },
        {
          id: "3",
          type: "buy",
          token: "USDC",
          amount: "5,000",
          price: "1.00",
          status: "active",
          timestamp: NOW - 10800,
        },
      ]}
    />
  );
}

function LiquidityPoolStatsDemo() {
  if (!LiquidityPoolStats) return null;
  return (
    <LiquidityPoolStats
      pool={{
        tokenPair: "ETH / USDC",
        fee: "0.30%",
        tvl: 184_520_000,
        tvlChange24h: 3.21,
        volume24h: 42_870_000,
        volumeChange24h: -1.45,
        apr: 18.42,
        feesEarned24h: 128_610,
        transactions24h: 12_483,
        holders: 4_821,
      }}
    />
  );
}

function MultisigWalletDemo() {
  if (!MultisigWallet) return null;
  const signers = [
    {
      address: "0x1234567890abcdef1234567890abcdef12345678",
      name: "Alice",
      hasApproved: true,
    },
    {
      address: "0xaBcDeF0123456789aBcDeF0123456789aBcDeF01",
      name: "Bob",
      hasApproved: true,
    },
    {
      address: "0x9876543210fedcba9876543210fedcba98765432",
      name: "Carol",
      hasApproved: false,
    },
  ];
  return (
    <MultisigWallet
      walletAddress="0x7a2539C45F6a682beC5B167ECE16F1c4bA073fC8"
      signers={signers}
      requiredApprovals={3}
      transactions={[
        {
          id: "tx-1",
          description: "Transfer to Treasury",
          to: "0xdead000000000000000000000000000000beef",
          value: "1.5",
          status: "pending",
          approvals: 2,
          requiredApprovals: 3,
          timestamp: NOW - 7200,
          signers,
        },
      ]}
    />
  );
}

function NetworkSwitcherDemo() {
  if (!NetworkSwitcher) return null;
  return (
    <NetworkSwitcher
      activeChainId={1}
      onSwitch={noop}
      showTestnetToggle
      networks={[
        { chainId: 1, name: "Ethereum", symbol: "ETH", currency: "ETH", color: "#627EEA" },
        { chainId: 137, name: "Polygon", symbol: "POL", currency: "POL", color: "#8247E5" },
        { chainId: 42161, name: "Arbitrum", symbol: "ARB", currency: "ETH", color: "#28A0F0" },
        { chainId: 10, name: "Optimism", symbol: "OP", currency: "ETH", color: "#FF0420" },
        { chainId: 8453, name: "Base", symbol: "BASE", currency: "ETH", color: "#0052FF" },
      ]}
    />
  );
}

function NFTCardDemo() {
  if (!NFTCard) return null;
  return (
    <NFTCard
      nft={{
        id: "42",
        name: "Noun #42",
        collection: "Nouns",
        tokenId: "42",
        price: "38.2",
        currency: "ETH",
        image: "https://noun.pics/42",
        owner: "0x1a2B3c4D5e6F7890AbCdEf1234567890aBcDeF12",
      }}
    />
  );
}

function NFTCollectionGridDemo() {
  if (!NFTCollectionGrid) return null;
  return (
    <NFTCollectionGrid
      collectionName="Nouns"
      columns={2}
      items={[
        {
          id: "1",
          name: "Noun #1",
          price: "42.5",
          currency: "ETH",
          image: "https://noun.pics/1",
        },
        {
          id: "42",
          name: "Noun #42",
          price: "38.2",
          currency: "ETH",
          image: "https://noun.pics/42",
        },
        {
          id: "100",
          name: "Noun #100",
          price: "45.0",
          currency: "ETH",
          image: "https://noun.pics/100",
        },
        {
          id: "200",
          name: "Noun #200",
          price: "35.8",
          currency: "ETH",
          image: "https://noun.pics/200",
        },
        {
          id: "300",
          name: "Noun #300",
          price: "29.5",
          currency: "ETH",
          image: "https://noun.pics/300",
        },
        {
          id: "400",
          name: "Noun #400",
          price: "51.2",
          currency: "ETH",
          image: "https://noun.pics/400",
        },
      ]}
    />
  );
}

function NFTMarketplaceAggregatorDemo() {
  if (!NFTMarketplaceAggregator) return null;
  return (
    <NFTMarketplaceAggregator
      listings={[
        {
          id: "1",
          name: "Noun #1",
          collection: "Nouns",
          marketplace: "OpenSea",
          price: "42.5",
          currency: "ETH",
          verified: true,
          image: "https://noun.pics/1",
        },
        {
          id: "2",
          name: "Noun #42",
          collection: "Nouns",
          marketplace: "Blur",
          price: "38.2",
          currency: "ETH",
          verified: true,
          image: "https://noun.pics/42",
        },
        {
          id: "3",
          name: "Noun #100",
          collection: "Nouns",
          marketplace: "OpenSea",
          price: "45.0",
          currency: "ETH",
          verified: true,
          image: "https://noun.pics/100",
        },
        {
          id: "4",
          name: "Noun #200",
          collection: "Nouns",
          marketplace: "LooksRare",
          price: "35.8",
          currency: "ETH",
          verified: false,
          image: "https://noun.pics/200",
        },
        {
          id: "5",
          name: "Noun #300",
          collection: "Nouns",
          marketplace: "Blur",
          price: "29.5",
          currency: "ETH",
          verified: true,
          image: "https://noun.pics/300",
        },
      ]}
    />
  );
}

function PriceTickerDemo() {
  if (!PriceTicker) return null;
  return (
    <PriceTicker
      tokens={[
        {
          symbol: "BTC",
          name: "Bitcoin",
          price: 67_498.42,
          priceChange24h: 1.87,
          marketCap: 1_327_000_000_000,
        },
        {
          symbol: "ETH",
          name: "Ethereum",
          price: 3_355.18,
          priceChange24h: 3.12,
          marketCap: 403_200_000_000,
        },
        {
          symbol: "SOL",
          name: "Solana",
          price: 148.32,
          priceChange24h: -2.45,
          marketCap: 64_800_000_000,
        },
        {
          symbol: "AVAX",
          name: "Avalanche",
          price: 35.67,
          priceChange24h: -0.82,
          marketCap: 13_100_000_000,
        },
      ]}
    />
  );
}

function SmartContractScannerDemo() {
  if (!SmartContractScanner) return null;
  return (
    <SmartContractScanner
      address="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
      score={92}
      riskLabel="Low Risk"
      exampleAddress="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
      checks={[
        {
          name: "Ownership Renounced",
          status: "safe",
          description: "Contract ownership has been renounced",
        },
        {
          name: "No Proxy Contract",
          status: "safe",
          description: "Direct implementation, no upgradeable proxy",
        },
        {
          name: "Liquidity Locked",
          status: "safe",
          description: "LP tokens locked for 12 months",
        },
        {
          name: "Verified Source",
          status: "safe",
          description: "Source code verified on Etherscan",
        },
        {
          name: "No Mint Function",
          status: "safe",
          description: "Owner cannot mint new tokens",
        },
      ]}
    />
  );
}

function StakingInterfaceDemo() {
  if (!StakingInterface) return null;
  return (
    <StakingInterface
      footerLabel="Props-driven, expandable pool list"
      pools={[
        {
          id: "eth",
          name: "ETH Staking",
          token: "ETH",
          apr: 4.8,
          lockPeriod: 30,
          totalStaked: "12,450",
          userStaked: "2.5",
          minStake: "0.01",
        },
        {
          id: "matic",
          name: "MATIC Staking",
          token: "POL",
          apr: 6.2,
          lockPeriod: 14,
          totalStaked: "890,000",
          userStaked: "500",
          minStake: "10",
        },
        {
          id: "arb",
          name: "ARB Staking",
          token: "ARB",
          apr: 8.1,
          lockPeriod: 7,
          totalStaked: "2,100,000",
          minStake: "50",
        },
      ]}
    />
  );
}

function SubscriptionPaymentsDemo() {
  if (!SubscriptionPayments) return null;
  return (
    <SubscriptionPayments
      plans={[
        {
          id: "basic",
          name: "Basic",
          price: "5",
          token: "USDC",
          interval: "mo",
          features: ["100 API calls/day", "Basic analytics", "Email support"],
        },
        {
          id: "pro",
          name: "Pro",
          price: "20",
          token: "USDC",
          interval: "mo",
          features: [
            "Unlimited API calls",
            "Advanced analytics",
            "Priority support",
            "Custom webhooks",
          ],
          popular: true,
        },
      ]}
    />
  );
}

function TokenAirdropDemo() {
  if (!TokenAirdrop) return null;
  return (
    <TokenAirdrop
      showActiveCount
      airdrops={[
        {
          id: "1",
          token: "ARB",
          name: "Arbitrum",
          amount: "1,250",
          status: "active",
          startDate: "2026-04-10",
          endDate: "2026-06-01",
        },
        {
          id: "2",
          token: "OP",
          name: "Optimism",
          amount: "480",
          status: "claimed",
          startDate: "2026-02-01",
          endDate: "2026-03-01",
        },
      ]}
    />
  );
}

function TokenCardDemo() {
  if (!TokenCard) return null;
  return (
    <TokenCard
      token={{
        symbol: "ETH",
        name: "Ethereum",
        price: 3_355.18,
        balance: 1.4201,
        priceChange24h: 3.12,
      }}
    />
  );
}

function TokenListDemo() {
  if (!TokenList) return null;
  return (
    <TokenList
      tokens={[
        { symbol: "ETH", name: "Ethereum", balance: 4.21, price: 3_355.18 },
        { symbol: "USDC", name: "USD Coin", balance: 2500, price: 1.0 },
        { symbol: "LINK", name: "Chainlink", balance: 85, price: 14.82 },
        { symbol: "UNI", name: "Uniswap", balance: 120, price: 7.43 },
      ]}
    />
  );
}

function TokenSwapDemo() {
  if (!TokenSwap) return null;
  const tokens = [
    { symbol: "ETH", name: "Ethereum", balance: "1.42" },
    { symbol: "USDC", name: "USD Coin", balance: "2,500" },
    { symbol: "DAI", name: "Dai", balance: "850" },
    { symbol: "ARB", name: "Arbitrum", balance: "340" },
  ];
  return (
    <TokenSwap
      tokens={tokens}
      fromToken={tokens[0]}
      toToken={tokens[1]}
      exchangeRate={1917.5}
      slippage={0.5}
      showRateInHeader
      showFooter
      onSwap={noop}
    />
  );
}

function TokenVestingDemo() {
  if (!TokenVesting) return null;
  return (
    <TokenVesting
      showCount
      showProgressLabels
      schedules={[
        {
          id: "1",
          token: "W3K Token",
          totalAmount: "100,000",
          vestedAmount: "42,500",
          claimableAmount: "12,500",
          cliffDate: "Jun 2025",
          endDate: "Jun 2027",
          status: "active",
        },
        {
          id: "2",
          token: "Governance",
          totalAmount: "50,000",
          vestedAmount: "50,000",
          claimableAmount: "0",
          cliffDate: "Jan 2025",
          endDate: "Jan 2026",
          status: "completed",
        },
      ]}
    />
  );
}

function TransactionHistoryDemo() {
  if (!TransactionHistory) return null;
  return (
    <TransactionHistory
      transactions={[
        {
          type: "send",
          description: "Sent ETH",
          hash: "0x8a3f21b7c9e04d6f2a1b8c5d3e7f9a0b4c6d8e4b2",
          value: "-0.25",
          tokenSymbol: "ETH",
          status: "success",
          from: "0x...",
          to: "0x...",
          timestamp: NOW - 60,
        },
        {
          type: "receive",
          description: "Received USDC",
          hash: "0xb1c7d4e8f2a6b9c3d5e7f0a1b4c6d8e2f4a6b9f03",
          value: "+1,200",
          tokenSymbol: "USDC",
          status: "success",
          from: "0x...",
          to: "0x...",
          timestamp: NOW - 240,
        },
        {
          type: "swap",
          description: "Swap ETH → USDC",
          hash: "0xf29d6c8a3b5e7d1f4a9c2b6e8d0f3a5c7b9d7a11",
          value: "0.5",
          tokenSymbol: "ETH",
          status: "pending",
          from: "0x...",
          to: "0x...",
          timestamp: NOW - 600,
        },
        {
          type: "contract",
          description: "Contract Call",
          hash: "0x3e0a7b2c9d4f6a8e1c3b5d7f9a0c2e4b6d8f0c8d5",
          value: "0.01",
          tokenSymbol: "ETH",
          status: "success",
          from: "0x...",
          to: "0x...",
          timestamp: NOW - 1800,
        },
      ]}
    />
  );
}

function WalletBalanceDemo() {
  if (!WalletBalance) return null;
  return (
    <WalletBalance
      showAllocation
      tokens={[
        {
          symbol: "ETH",
          name: "Ethereum",
          balance: "1.4201",
          price: 3834.27,
          priceChange24h: 2.41,
          color: "#627EEA",
        },
        {
          symbol: "USDC",
          name: "USD Coin",
          balance: "2500.00",
          price: 1.0,
          priceChange24h: 0.01,
          color: "#2775CA",
        },
        {
          symbol: "LINK",
          name: "Chainlink",
          balance: "84.50",
          price: 14.82,
          priceChange24h: -1.32,
          color: "#2A5ADA",
        },
        {
          symbol: "SOL",
          name: "Solana",
          balance: "12.80",
          price: 148.5,
          priceChange24h: 4.22,
          color: "#14F195",
        },
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
