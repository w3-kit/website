import { test, expect } from "@playwright/test";

test.describe("Registry subdomain", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  test("home renders shell with stats overview", async ({ page }) => {
    await page.goto("http://registry.localhost:3000/");
    await expect(page.getByRole("heading", { name: /Registry/i })).toBeVisible();
    await expect(page.getByText("14 chains")).toBeVisible();
    await expect(page.getByText("18 tokens")).toBeVisible();
    await expect(page.getByText("6 Solana programs")).toBeVisible();
  });

  test("chains list shows all chains", async ({ page }) => {
    await page.goto("http://registry.localhost:3000/chains");
    await expect(page.getByRole("heading", { name: /Chains/i })).toBeVisible();
    await expect(page.getByText("Ethereum", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Base", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Solana", { exact: true }).first()).toBeVisible();
  });

  test("chain detail shows native currency and RPCs", async ({ page }) => {
    await page.goto("http://registry.localhost:3000/chains/1");
    await expect(page.getByRole("heading", { name: "Ethereum" })).toBeVisible();
    await expect(page.getByText("ETH", { exact: false }).first()).toBeVisible();
    await expect(page.getByText("https://eth.llamarpc.com")).toBeVisible();
  });

  test("chain detail shows not-found for unknown chainId", async ({ page }) => {
    await page.goto("http://registry.localhost:3000/chains/999999");
    await expect(page.getByText(/not found/i)).toBeVisible();
  });

  test("tokens list shows all tokens", async ({ page }) => {
    await page.goto("http://registry.localhost:3000/tokens");
    await expect(page.getByRole("heading", { name: /Tokens/i })).toBeVisible();
    await expect(page.getByText("USDC", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("WETH", { exact: true }).first()).toBeVisible();
  });

  test("token detail shows addresses per chain", async ({ page }) => {
    await page.goto("http://registry.localhost:3000/tokens/USDC");
    await expect(page.getByRole("heading", { name: "USDC" })).toBeVisible();
    await expect(page.getByText("0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")).toBeVisible();
  });

  test("token detail shows not-found for unknown symbol", async ({ page }) => {
    await page.goto("http://registry.localhost:3000/tokens/DOESNOTEXIST");
    await expect(page.getByText(/not found/i)).toBeVisible();
  });

  test("programs list shows all Solana programs", async ({ page }) => {
    await page.goto("http://registry.localhost:3000/programs");
    await expect(page.getByRole("heading", { name: /Programs/i })).toBeVisible();
    await expect(page.getByText("System Program").first()).toBeVisible();
    await expect(page.getByText("SPL Token Program").first()).toBeVisible();
  });

  test("program detail shows programId per chain", async ({ page }) => {
    await page.goto("http://registry.localhost:3000/programs/system-program");
    await expect(page.getByRole("heading", { name: "System Program" })).toBeVisible();
    await expect(page.getByText("11111111111111111111111111111111").first()).toBeVisible();
  });

  test("copy button on chain RPC writes URL to clipboard", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("http://registry.localhost:3000/chains/1", { waitUntil: "networkidle" });
    const btn = page.getByRole("button", { name: "Copy https://eth.llamarpc.com" });
    await btn.scrollIntoViewIfNeeded();
    await btn.click();
    await expect(btn).toContainText("Copied");
    const text = await page.evaluate(() => navigator.clipboard.readText());
    expect(text).toBe("https://eth.llamarpc.com");
  });

  test("ecosystem filter on chains list reduces visible count", async ({ page }) => {
    await page.goto("http://registry.localhost:3000/chains", { waitUntil: "networkidle" });
    const cards = page.locator("ul li a[href^='/registry/chains/']");
    const before = await cards.count();
    await page.getByRole("button", { name: "Solana", exact: true }).click();
    const after = await cards.count();
    expect(after).toBeLessThan(before);
    expect(after).toBeGreaterThan(0);
  });

  test("chain filter on tokens list reduces visible count", async ({ page }) => {
    await page.goto("http://registry.localhost:3000/tokens", { waitUntil: "networkidle" });
    const cards = page.locator("ul li a[href^='/registry/tokens/']");
    const before = await cards.count();
    await page.getByLabel("Filter by chain").selectOption("1");
    const after = await cards.count();
    expect(after).toBeLessThanOrEqual(before);
    expect(after).toBeGreaterThan(0);
  });
});
