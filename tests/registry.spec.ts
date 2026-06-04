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
});
