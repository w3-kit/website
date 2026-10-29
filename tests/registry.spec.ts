import { test, expect } from "@playwright/test";

test.describe("Registry subdomain", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  test("home states what the registry holds", async ({ page }) => {
    await page.goto("http://registry.localhost:3000/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Every address,typed and checked.",
    );
    await expect(page.getByText(/\d+ chains, \d+ tokens and \d+ Solana programs/)).toBeVisible();
  });

  test("chains list shows all chains", async ({ page }) => {
    await page.goto("http://registry.localhost:3000/chains");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Chains");
    await expect(page.getByText("Ethereum", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Base", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Solana", { exact: true }).first()).toBeVisible();
  });

  test("chain detail shows native currency and RPCs", async ({ page }) => {
    await page.goto("http://registry.localhost:3000/chains/1");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Ethereum");
    await expect(page.getByText("ETH", { exact: false }).first()).toBeVisible();
    await expect(page.getByText("https://eth.llamarpc.com")).toBeVisible();
  });

  test("chain detail shows not-found for unknown chainId", async ({ page }) => {
    await page.goto("http://registry.localhost:3000/chains/999999");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("No chaincalled 999999.");
  });

  test("tokens list shows all tokens", async ({ page }) => {
    await page.goto("http://registry.localhost:3000/tokens");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Tokens");
    await expect(page.getByText("USDC", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("WETH", { exact: true }).first()).toBeVisible();
  });

  test("token detail shows addresses per chain", async ({ page }) => {
    await page.goto("http://registry.localhost:3000/tokens/USDC");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("USDC");
    await expect(page.getByText("0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")).toBeVisible();
  });

  test("token detail shows not-found for unknown symbol", async ({ page }) => {
    await page.goto("http://registry.localhost:3000/tokens/DOESNOTEXIST");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "No tokencalled DOESNOTEXIST.",
    );
  });

  test("programs list shows all Solana programs", async ({ page }) => {
    await page.goto("http://registry.localhost:3000/programs");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Solana programs");
    await expect(page.getByText("System Program").first()).toBeVisible();
    await expect(page.getByText("SPL Token Program").first()).toBeVisible();
  });

  test("program detail shows programId per chain", async ({ page }) => {
    await page.goto("http://registry.localhost:3000/programs/system-program");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("System Program");
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
    const cards = page.locator("ul li a[href^='/chains/']");
    const before = await cards.count();
    await page.getByRole("button", { name: "Solana", exact: true }).click();
    const after = await cards.count();
    expect(after).toBeLessThan(before);
    expect(after).toBeGreaterThan(0);
  });

  test("chain filter on tokens list reduces visible count", async ({ page }) => {
    await page.goto("http://registry.localhost:3000/tokens", { waitUntil: "networkidle" });
    const cards = page.locator("ul li a[href^='/tokens/']");
    const before = await cards.count();
    await page.getByLabel("Filter by chain").selectOption("1");
    const after = await cards.count();
    expect(after).toBeLessThanOrEqual(before);
    expect(after).toBeGreaterThan(0);
  });

  test("Cmd+K opens search and navigates", async ({ page }) => {
    await page.goto("http://registry.localhost:3000/", { waitUntil: "networkidle" });
    await page.keyboard.press("Meta+k");
    const input = page.getByPlaceholder("Search chains, tokens, programs");
    await expect(input).toBeVisible();
    await input.fill("ethereum");
    await page
      .getByRole("option", { name: /Ethereum/i })
      .first()
      .click();
    await expect(page).toHaveURL("http://registry.localhost:3000/chains/1");
  });

  test("API page shows how to use the package in code", async ({ page }) => {
    await page.goto("http://registry.localhost:3000/api");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Use it in code");
    await expect(page.getByText("getChain").first()).toBeVisible();
    await expect(page.getByText("getTokensByChain").first()).toBeVisible();
  });
});
