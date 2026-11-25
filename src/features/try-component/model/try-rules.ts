import type { ListRow } from "../../../entities/generated-component";

/** What a user can change while trying a generated component. Nothing leaves the page. */
export interface TryState {
  tab: string;
  query: string;
  amount: string;
  /** The two tokens of a swap trade places when the flip button is pressed. */
  flipped: boolean;
  slider: number;
  recipient: string;
}

const TWO_DECIMALS = { maximumFractionDigits: 2, minimumFractionDigits: 2 };
const DECIMAL = /^\d*\.?\d*$/;

/** "1,234.50" to 1234.5. Sample values carry thousands separators. */
export const parseAmount = (text: string) => Number(text.replaceAll(",", ""));

const formatAmount = (value: number) => value.toLocaleString("en", TWO_DECIMALS);

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

/**
 * What the other side of a trade receives at the sample rate. The rate comes from the sample pair,
 * so the preview stays consistent without a price feed.
 */
export function quoteFor(amount: string, rate: number): string {
  const value = parseAmount(amount);
  return Number.isFinite(value) ? formatAmount(value * rate) : formatAmount(0);
}
