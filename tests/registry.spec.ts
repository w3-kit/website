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
});
