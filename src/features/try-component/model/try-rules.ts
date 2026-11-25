import {
  TWO_DECIMALS,
  type ListRow,
  type Part,
  type PartName,
  type PartOf,
} from "../../../entities/generated-component";

/** One side of a trade: the token, and the balance the amount is checked against. */
export interface TradeSide {
  symbol: string;
  balance: string;
}

/** The sample trade of a component. Without an amount part there is nothing to trade. */
export interface Trade {
  pay: TradeSide;
  receive: TradeSide;
  /** Received per paid token. */
  rate: number;
}

const DECIMAL = /^\d*\.?\d*$/;
/** Used when the sample pair gives no usable rate, such as an amount of 0.00. */
const FALLBACK_RATE = 1;

/** "1,234.50" to 1234.5. Sample values carry thousands separators. */
export const parseAmount = (text: string) => Number(text.replaceAll(",", ""));

const formatAmount = (value: number) => value.toLocaleString("en", TWO_DECIMALS);

export function findPart<K extends PartName>(
  parts: readonly Part[],
  name: K,
): PartOf<K> | undefined {
  return parts.find((part): part is PartOf<K> => part.name === name);
}

/**
 * The trade a component samples. The rate comes from the sample pair, so the preview stays
 * consistent without a price feed. The receive side's balance is worth the same as the pay side's,
 * so a flipped trade is checked against a believable balance.
 */
export function tradeOf(parts: readonly Part[]): Trade | undefined {
  const amount = findPart(parts, "amount");
  if (!amount) return undefined;
  const result = findPart(parts, "result");
  const sampled = result ? parseAmount(result.value) / parseAmount(amount.value) : FALLBACK_RATE;
  const rate = Number.isFinite(sampled) && sampled > 0 ? sampled : FALLBACK_RATE;
  return {
    pay: { symbol: amount.symbol, balance: amount.balance },
    receive: {
      symbol: result?.symbol ?? amount.symbol,
      balance: formatAmount(parseAmount(amount.balance) * rate),
    },
    rate,
  };
}

/** The trade as the user sees it after pressing the flip button an odd number of times. */
export const flipped = ({ pay, receive, rate }: Trade): Trade => ({
  pay: receive,
  receive: pay,
  rate: 1 / rate,
});

/** Rows whose title or subtitle contain the query, ignoring case. An empty query keeps every row. */
export function filterRows(rows: readonly ListRow[], query: string): ListRow[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [...rows];
  return rows.filter((row) => `${row.title} ${row.subtitle}`.toLowerCase().includes(needle));
}

/** Why an amount cannot be sent, phrased as how to fix it. Undefined when it can. */
export function amountProblem(amount: string, balance: string): string | undefined {
  const plain = amount.replaceAll(",", "").trim();
  if (plain === "") return undefined;
  if (!DECIMAL.test(plain)) return "Enter a number, like 1.5";
  if (Number(plain) > parseAmount(balance)) return `Enter ${balance} or less`;
  return undefined;
}

/** The share of the balance a quick-amount button fills in. */
export const shareOf = (balance: string, percent: number) =>
  formatAmount((parseAmount(balance) * percent) / 100);

/** What the other side of a trade receives for the typed amount. A bad amount quotes zero. */
export function quoteFor(amount: string, rate: number): string {
  const value = parseAmount(amount);
  return Number.isFinite(value) ? formatAmount(value * rate) : formatAmount(0);
}
