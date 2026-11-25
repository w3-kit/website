import { pick, type Rng } from "../../../shared/lib/wfc";

/** One row of a list part: an avatar, two lines on the left, two on the right. */
export interface ListRow {
  /** Up to two letters shown in the round avatar. */
  avatar: string;
  title: string;
  subtitle: string;
  value: string;
  /** Under the value: plain text, or a status shown as a pill. */
  note: string;
  status: boolean;
}

/** The copy a family of components draws on. Every generated component belongs to one family. */
export interface Family {
  label: string;
  /** Title of the component, and the label of its primary button. */
  verbs: readonly (readonly [title: string, action: string])[];
  /** Ending of the component name, as in SwapCard. */
  suffix: string;
  /** Noun for the items a list holds, as in "4 tokens". */
  items: string;
  /** The first option is the active one. */
  tabs: readonly string[];
  footnotes: readonly string[];
  /** One entry per label: the label, and a maker of a sample value. */
  stats: readonly (readonly [
    label: string,
    value: (rng: Rng, tokens: readonly string[]) => string,
  ])[];
  row: (rng: Rng, tokens: readonly string[], index: number) => ListRow;
  search?: string;
  slider?: { label: string; prop: string; max: number; unit: string };
  notices?: readonly string[];
  progress?: readonly string[];
}

export const TOKENS = ["ETH", "USDC", "DAI", "WBTC", "ARB", "OP", "LINK", "UNI", "AAVE", "POL"];
const TOKEN_NAMES: Record<string, string> = {
  ETH: "Ethereum",
  USDC: "USD Coin",
  DAI: "Dai",
  WBTC: "Wrapped Bitcoin",
  ARB: "Arbitrum",
  OP: "Optimism",
  LINK: "Chainlink",
  UNI: "Uniswap",
  AAVE: "Aave",
  POL: "Polygon",
};
export const NETWORKS = ["Ethereum", "Arbitrum", "Base", "Optimism", "Polygon"];
const COLLECTIONS = ["Nouns", "Lil Nouns", "Pudgy Penguins", "Azuki"];

const TWO_DECIMALS = { maximumFractionDigits: 2, minimumFractionDigits: 2 };
export const money = (rng: Rng, max: number) => (rng() * max).toLocaleString("en", TWO_DECIMALS);
export const whole = (rng: Rng, max: number) => Math.floor(1 + rng() * max).toLocaleString("en");
const initials = (text: string) => text.slice(0, 2).toUpperCase();
/** "1 day", "12 days". */
const count = (rng: Rng, max: number, unit: string) => {
  const n = whole(rng, max);
  return `${n} ${unit}${n === "1" ? "" : "s"}`;
};
/** Each row of a list uses a different token, so a list never repeats itself. */
const tokenAt = (tokens: readonly string[], index: number) => tokens[index % tokens.length];

const HEX_GROUP = 0xffff;
const hexGroup = (rng: Rng) =>
  Math.floor(rng() * HEX_GROUP)
    .toString(16)
    .padStart(4, "0");
export const shortAddress = (rng: Rng) => `0x${hexGroup(rng)}…${hexGroup(rng)}`;

export const FAMILIES = {
  trade: {
    label: "Trade",
    verbs: [
      ["Swap", "Swap tokens"],
      ["Limit orders", "Place order"],
      ["Bridge", "Bridge tokens"],
      ["Wrap", "Wrap tokens"],
    ],
    suffix: "Card",
    items: "orders",
    tabs: ["Open", "Filled", "All"],
    slider: { label: "Slippage tolerance", prop: "slippage", max: 5, unit: "%" },
    notices: ["High price impact. You may receive less.", "Route crosses two pools."],
    footnotes: ["Quote refreshes every 15 seconds", "Best route across 4 pools"],
    stats: [
      ["Rate", (r, t) => `1 ${t[0]} = ${money(r, 4000)} ${t[1]}`],
      ["Price impact", (r) => `${(r() * 2).toFixed(2)}%`],
      ["Network fee", (r) => `$${money(r, 9)}`],
      ["Minimum received", (r, t) => `${money(r, 900)} ${t[1]}`],
      ["Route", (_r, t) => `${t[0]} to ${t[1]}`],
    ],
    row: (r, t, i) => {
      const symbol = tokenAt(t, i);
      return {
        avatar: initials(symbol),
        title: `${pick(r, ["Buy", "Sell"])} ${money(r, 40)} ${symbol}`,
        subtitle: `at $${money(r, 4000)} · ${whole(r, 23)}h ago`,
        value: `$${money(r, 9000)}`,
        note: pick(r, ["Open", "Filled", "Partial"]),
        status: true,
      };
    },
  },
  earn: {
    label: "Earn",
    verbs: [
      ["Stake", "Stake tokens"],
      ["Lend", "Supply tokens"],
      ["Pools", "Add liquidity"],
      ["Vest", "Claim tokens"],
      ["Lock", "Lock tokens"],
    ],
    suffix: "Panel",
    items: "pools",
    tabs: ["Deposit", "Withdraw"],
    slider: { label: "Lock duration", prop: "lockDays", max: 365, unit: " days" },
    notices: ["Tokens stay locked until the period ends.", "Rewards stop if you withdraw early."],
    footnotes: ["Rewards are paid every block", "Audited contract"],
    progress: ["Vested", "Pool utilisation"],
    stats: [
      ["APY", (r) => `${(1 + r() * 18).toFixed(1)}%`],
      ["Rewards earned", (r, t) => `${money(r, 40)} ${t[0]}`],
      ["Total staked", (r) => `$${money(r, 900)}M`],
      ["Cooldown", () => "48 hours"],
      ["Unlocks", (r) => `in ${count(r, 60, "day")}`],
      ["Your stake", (r, t) => `${money(r, 80)} ${t[0]}`],
      ["Next reward", (r) => `in ${count(r, 23, "hour")}`],
    ],
    row: (r, t, i) => {
      const [base, quote] = [tokenAt(t, i), tokenAt(t, i + 1)];
      return {
        avatar: initials(base),
        title: `${base} / ${quote}`,
        subtitle: `${pick(r, ["0.05", "0.30", "1.00"])}% fee · $${money(r, 90)}M locked`,
        value: `${(1 + r() * 30).toFixed(2)}%`,
        note: "APR",
        status: false,
      };
    },
  },
  wallet: {
    label: "Wallet",
    verbs: [
      ["Send", "Send tokens"],
      ["Transactions", "View all"],
      ["Multisig", "Sign transaction"],
      ["Address book", "Add address"],
    ],
    suffix: "Form",
    items: "transactions",
    tabs: ["Pending", "Executed", "All"],
    search: "Search addresses",
    notices: ["Transfers cannot be undone. Check the address.", "This address is new to you."],
    footnotes: ["No wallet connected", "Last transaction confirmed"],
    stats: [
      ["Network fee", (r) => `$${money(r, 6)}`],
      ["Arrives", (r) => pick(r, ["in about 15 seconds", "in about 2 minutes"])],
      ["Balance after", (r, t) => `${money(r, 30)} ${t[0]}`],
      ["Nonce", (r) => whole(r, 400)],
    ],
    row: (r, t, i) => {
      const symbol = tokenAt(t, i);
      const sent = r() < 0.5;
      return {
        avatar: initials(symbol),
        title: `${sent ? "Sent" : "Received"} ${symbol}`,
        subtitle: shortAddress(r),
        value: `${sent ? "-" : "+"}${money(r, 30)} ${symbol}`,
        note: pick(r, ["Confirmed", "Pending"]),
        status: true,
      };
    },
  },
  nft: {
    label: "NFT",
    verbs: [
      ["Mint", "Mint NFT"],
      ["Place bid", "Place bid"],
      ["List NFT", "List NFT"],
      ["Collection", "View collection"],
    ],
    suffix: "Card",
    items: "items",
    tabs: ["Listed", "Sold", "All"],
    search: "Search NFTs",
    notices: ["Bids cannot be cancelled in the last hour.", "Limit of 3 per wallet."],
    footnotes: ["Metadata stored on IPFS", "Verified collection"],
    progress: ["Minted"],
    stats: [
      ["Floor", (r) => `${money(r, 4)} ETH`],
      ["Top bid", (r) => `${money(r, 3)} ETH`],
      ["Royalty", (r) => `${whole(r, 9)}%`],
      ["Supply", (r) => `${whole(r, 9000)} of 10,000`],
      ["Owners", (r) => whole(r, 6000)],
      ["Last sale", (r) => `${money(r, 5)} ETH`],
    ],
    row: (r, _t, i) => {
      const collection = COLLECTIONS[i % COLLECTIONS.length];
      return {
        avatar: initials(collection),
        title: `${collection} #${whole(r, 9999)}`,
        subtitle: `${whole(r, 40)} bids`,
        value: `${money(r, 5)} ETH`,
        note: "Floor",
        status: false,
      };
    },
  },
  data: {
    label: "Data",
    verbs: [
      ["Prices", "Set price alert"],
      ["Portfolio", "View portfolio"],
      ["Gas", "Set gas alert"],
      ["Tokens", "Add token"],
    ],
    suffix: "Widget",
    items: "tokens",
    tabs: ["1D", "1W", "1M"],
    search: "Search tokens",
    footnotes: ["Updated a moment ago", "Prices are indicative"],
    progress: ["Pool utilisation"],
    stats: [
      ["24h volume", (r) => `$${money(r, 800)}M`],
      ["Market cap", (r) => `$${money(r, 300)}B`],
      ["Total value locked", (r) => `$${money(r, 90)}M`],
      ["Base fee", (r) => `${whole(r, 60)} gwei`],
      ["24h change", (r) => `${r() < 0.5 ? "+" : "-"}${(r() * 9).toFixed(1)}%`],
      ["Holders", (r) => whole(r, 900000)],
    ],
    row: (r, t, i) => {
      const symbol = tokenAt(t, i);
      return {
        avatar: initials(symbol),
        title: symbol,
        subtitle: TOKEN_NAMES[symbol],
        value: `$${money(r, 15000)}`,
        note: `${r() < 0.5 ? "+" : "-"}${(r() * 9).toFixed(2)}%`,
        status: false,
      };
    },
  },
} satisfies Record<string, Family>;

export type FamilyId = keyof typeof FAMILIES;
export const FAMILY_IDS = Object.keys(FAMILIES) as FamilyId[];
