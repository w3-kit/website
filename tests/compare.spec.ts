import { test, expect } from "@playwright/test";

test.describe("Compare page", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  test("renders hero, matrix, and alternative cards", async ({ page }) => {
    await page.goto("/compare");
    await expect(page.getByRole("heading", { name: /w3-kit vs alternatives/i })).toBeVisible();

    await expect(page.getByRole("columnheader", { name: "w3-kit" })).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "scaffold-eth" })).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "create-web3-dapp" })).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "thirdweb" })).toBeVisible();

    await expect(page.getByRole("row", { name: /Chain support/i })).toContainText("EVM + Solana");

    for (const name of ["scaffold-eth", "create-web3-dapp", "thirdweb"]) {
      const card = page.getByRole("article").filter({ hasText: name });
      await expect(card.getByText(`Use ${name} when`)).toBeVisible();
      await expect(card.getByText(/Choose w3-kit when/i)).toBeVisible();
    }
  });

  test("alternative links open in new tab and are safe", async ({ page }) => {
    await page.goto("/compare");
    const links = page.getByRole("link", { name: /^Visit/ });
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(3);
    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
    }
  });

  test("has SEO title and canonical", async ({ page }) => {
    await page.goto("/compare");
    await expect(page).toHaveTitle(/vs|Comparison/i);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toMatch(/\/compare$/);
  });
});
