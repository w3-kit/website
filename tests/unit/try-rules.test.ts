/** How a generated component behaves while it is tried in the prompt dialog. Run with: npm test */
import assert from "node:assert/strict";
import { test } from "node:test";
import type { ListRow, Part } from "../../src/entities/generated-component/model";
import {
  amountProblem,
  filterRows,
  flipped,
  parseAmount,
  quoteFor,
  shareOf,
  tradeOf,
} from "../../src/features/try-component/model/try-rules";

const row = (title: string, subtitle: string): ListRow => ({
  avatar: title.slice(0, 2),
  title,
  subtitle,
  value: "$1.00",
  note: "Open",
  status: true,
});
const ROWS = [row("ETH", "Ethereum"), row("USDC", "USD Coin"), row("DAI", "Dai")];

test("searching keeps rows whose title or subtitle contain the query, ignoring case", () => {
  assert.deepEqual(filterRows(ROWS, ""), ROWS);
  assert.deepEqual(filterRows(ROWS, "   "), ROWS);
  assert.deepEqual(
    filterRows(ROWS, "usd").map((r) => r.title),
    ["USDC"],
  );
  assert.deepEqual(
    filterRows(ROWS, "ETHER").map((r) => r.title),
    ["ETH"],
  );
  assert.deepEqual(filterRows(ROWS, "zzz"), []);
});

test("an amount up to the balance is fine, and an empty field asks for nothing yet", () => {
  assert.equal(amountProblem("", "12.50"), undefined);
  assert.equal(amountProblem("12.5", "12.50"), undefined);
  assert.equal(amountProblem("1,000.00", "1,000.00"), undefined);
  assert.equal(amountProblem(".5", "1"), undefined);
});

test("an amount over the balance or not a number says how to fix it", () => {
  assert.equal(amountProblem("12.51", "12.50"), "Enter 12.50 or less");
  assert.equal(amountProblem("abc", "12.50"), "Enter a number, like 1.5");
  assert.equal(amountProblem("1.2.3", "12.50"), "Enter a number, like 1.5");
  assert.equal(amountProblem("-1", "12.50"), "Enter a number, like 1.5");
});

test("quick amounts take a share of the balance, and Max takes all of it", () => {
  assert.equal(shareOf("1,000.00", 25), "250.00");
  assert.equal(shareOf("12.50", 50), "6.25");
  assert.equal(shareOf("12.50", 100), "12.50");
});

test("the quote follows the amount at the sample rate, and a bad amount quotes zero", () => {
  assert.equal(parseAmount("1,234.50"), 1234.5);
  assert.equal(quoteFor("2", 1500), "3,000.00");
  assert.equal(quoteFor("", 1500), "0.00");
  assert.equal(quoteFor("abc", 1500), "0.00");
});

const amount = (value: string, balance = "10.00"): Part => ({
  name: "amount",
  value,
  symbol: "ETH",
  balance,
  tokens: ["ETH", "USDC"],
});
const result = (value: string): Part => ({ name: "result", value, symbol: "USDC" });

test("a component without an amount has no trade", () => {
  assert.equal(tradeOf([]), undefined);
  assert.equal(tradeOf([result("10.00")]), undefined);
});

test("the trade rate comes from the sample pair, and the receive balance is worth the same", () => {
  const trade = tradeOf([amount("2.00"), result("3,000.00")])!;
  assert.equal(trade.rate, 1500);
  assert.deepEqual(trade.pay, { symbol: "ETH", balance: "10.00" });
  assert.deepEqual(trade.receive, { symbol: "USDC", balance: "15,000.00" });
});

test("a sample amount of zero falls back to an even rate, never infinity", () => {
  const trade = tradeOf([amount("0.00"), result("3,000.00")])!;
  assert.equal(trade.rate, 1);
  assert.equal(quoteFor("2", trade.rate), "2.00");
});

test("an amount with no result trades the token for itself", () => {
  const trade = tradeOf([amount("2.00")])!;
  assert.equal(trade.rate, 1);
  assert.deepEqual(trade.receive, trade.pay);
});

test("flipping swaps the sides and inverts the rate, and flipping back restores it", () => {
  const trade = tradeOf([amount("2.00"), result("3,000.00")])!;
  const once = flipped(trade);
  assert.deepEqual(once.pay, trade.receive);
  assert.equal(quoteFor("1,500", once.rate), "1.00");
  assert.deepEqual(flipped(once), trade);
});
