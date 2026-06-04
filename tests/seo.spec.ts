import { test, expect } from "@playwright/test";

test.describe("SEO", () => {
  test("landing has title, description, OG image, canonical, JSON-LD", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/w3-kit/);
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description).toMatch(/.+/);
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(ogImage).toMatch(/\/og\.png$/);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toMatch(/^https?:\/\/[^/]+\/$/);
    const ldJsonText = await page.locator('script[type="application/ld+json"]').textContent();
    const ldJson = JSON.parse(ldJsonText ?? "{}");
    expect(ldJson["@type"]).toBe("SoftwareApplication");
  });

  test("robots.txt is served with sitemap reference", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toMatch(/Sitemap:/i);
  });

  test("og.png is served", async ({ request }) => {
    const res = await request.get("/og.png");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toMatch(/image\/png/);
  });

  test("registry chain detail has dynamic title and canonical", async ({ page }) => {
    await page.goto("http://registry.localhost:3000/chains/1");
    await expect(page).toHaveTitle(/Ethereum/i);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toBe("http://registry.localhost:3000/chains/1");
  });

  test("registry tokens list has subdomain canonical", async ({ page }) => {
    await page.goto("http://registry.localhost:3000/tokens");
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toBe("http://registry.localhost:3000/tokens");
  });
});
