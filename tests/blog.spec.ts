import { test, expect } from "@playwright/test";

test.describe("Blog", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  test("blog list renders seed posts", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.getByRole("heading", { name: /Updates from w3-kit/i })).toBeVisible();
    await expect(page.getByText("Welcome to the w3-kit blog")).toBeVisible();
    await expect(page.getByText(/Changelog: v0\.2/)).toBeVisible();
  });

  test("clicking a post navigates to detail and shows body", async ({ page }) => {
    await page.goto("/blog");
    await page.getByText("Welcome to the w3-kit blog").click();
    await expect(page).toHaveURL(/\/blog\/welcome$/);
    await expect(page.getByRole("heading", { level: 1, name: "Welcome to the w3-kit blog" })).toBeVisible();
    await expect(page.getByText(/URLs are forever/i)).toBeVisible();
  });

  test("unknown slug shows not-found", async ({ page }) => {
    await page.goto("/blog/this-does-not-exist");
    await expect(page.getByText(/Post not found/i)).toBeVisible();
  });

  test("list page has SEO title", async ({ page }) => {
    await page.goto("/blog");
    await expect(page).toHaveTitle(/Blog/);
  });

  test("post page has og:type article", async ({ page }) => {
    await page.goto("/blog/welcome");
    const ogType = await page.locator('meta[property="og:type"]').getAttribute("content");
    expect(ogType).toBe("article");
  });
});
