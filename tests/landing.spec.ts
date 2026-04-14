import { test, expect } from "@playwright/test";

// Scroll to element and wait for GSAP reveal animation to complete
async function scrollAndWait(page: import("@playwright/test").Page, selector: string) {
  await page.locator(selector).scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
}

test.describe("Landing Page", () => {
  test.beforeEach(async ({ page }) => {
    // Disable animations for consistent testing
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
  });

  test("renders hero section with headline and CTAs", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "The Web3 Developer Toolkit" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Get Started" }).first()).toBeVisible();
    await expect(page.getByText("npx w3-kit init").first()).toBeVisible();
  });

  test("header shows logo and nav links", async ({ page }) => {
    const header = page.locator("header");
    await expect(header.getByText("w3-kit")).toBeVisible();
    await expect(header.getByRole("link", { name: "UI", exact: true })).toBeVisible();
    await expect(header.getByRole("link", { name: "Docs", exact: true })).toBeVisible();
    await expect(header.getByRole("link", { name: "Registry", exact: true })).toBeVisible();
    await expect(header.getByRole("link", { name: "Learn", exact: true })).toBeVisible();
  });

  test("bento grid renders all 6 cells", async ({ page }) => {
    await scrollAndWait(page, "#whats-inside");
    const bento = page.locator("#whats-inside");
    await expect(bento.getByText("UI COMPONENTS")).toBeVisible();
    await expect(bento.getByText("Smart Contract Scanner")).toBeVisible();
    await expect(bento.getByText("Chain & token database")).toBeVisible();
    await expect(bento.getByText("Three steps. That's it.")).toBeVisible();
    await expect(bento.getByText("What do you need?")).toBeVisible();
    await expect(bento.getByText("Learn by building")).toBeVisible();
    await expect(bento.getByText("Built in the open")).toBeVisible();
  });

  test("smart contract scanner accepts input and scans", async ({ page }) => {
    await scrollAndWait(page, "#whats-inside");
    const input = page.getByPlaceholder("Enter contract address");
    await input.fill("0xdAC17F958D2ee523a2206206994597C13D831ec7");
    await page.waitForTimeout(300);
    const scanBtn = page.getByRole("button", { name: "Scan Contract" });
    await expect(scanBtn).toBeEnabled({ timeout: 3000 });
    await scanBtn.click();
    await expect(page.getByText("85").first()).toBeVisible({ timeout: 5000 });
  });

  test("registry tabs switch between chains and tokens", async ({ page }) => {
    await scrollAndWait(page, "#whats-inside");
    const bento = page.locator("#whats-inside");
    await expect(bento.getByText("Chains (14)")).toBeVisible();
    await bento.getByText("Tokens (18)").click();
    await expect(bento.getByText("tokens.USDC.").first()).toBeVisible();
  });

  test("get started stepper advances through steps", async ({ page }) => {
    await scrollAndWait(page, "#whats-inside");
    const bento = page.locator("#whats-inside");
    const nextBtn = bento.getByRole("button", { name: "Next step" });
    await nextBtn.click();
    await nextBtn.click();
    await expect(bento.getByRole("link", { name: "Start building" })).toBeVisible();
  });

  test("docs accordion expands and shows links", async ({ page }) => {
    await scrollAndWait(page, "#whats-inside");
    const bento = page.locator("#whats-inside");
    await bento.getByText("How do I get started?").click();
    await expect(bento.getByText("Getting Started guide")).toBeVisible();
  });

  test("recipes checklist updates count", async ({ page }) => {
    await scrollAndWait(page, "#whats-inside");
    const bento = page.locator("#whats-inside");
    await expect(bento.getByText("2/5")).toBeVisible();
  });

  test("ecosystem section shows tool cards", async ({ page }) => {
    await scrollAndWait(page, "#ecosystem");
    const ecosystem = page.locator("#ecosystem");
    await expect(ecosystem.getByText("One toolkit. Five tools.")).toBeVisible();
  });

  test("ecosystem card click expands detail panel", async ({ page }) => {
    await scrollAndWait(page, "#ecosystem");
    const ecosystem = page.locator("#ecosystem");
    await ecosystem.getByRole("button", { name: /UI/i }).first().click();
    await expect(ecosystem.getByText("Explore components")).toBeVisible();
  });

  test("CTA section renders", async ({ page }) => {
    const heading = page.getByRole("heading", { name: "Ready to build?" });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
  });

  test("footer renders with sections", async ({ page }) => {
    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();
    await expect(footer.getByText("Product")).toBeVisible();
    await expect(footer.getByText("Community")).toBeVisible();
  });
});

test.describe("Subdomain Routing", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  test("ui subdomain serves under-construction page", async ({ page }) => {
    await page.goto("http://ui.localhost:3000");
    await expect(page.getByRole("heading", { name: "UI Library" })).toBeVisible();
    await expect(page.getByText("Under Construction")).toBeVisible();
  });

  test("docs subdomain serves under-construction page", async ({ page }) => {
    await page.goto("http://docs.localhost:3000");
    await expect(page.getByRole("heading", { name: "Documentation" })).toBeVisible();
    await expect(page.getByText("Under Construction")).toBeVisible();
  });

  test("registry subdomain serves under-construction page", async ({ page }) => {
    await page.goto("http://registry.localhost:3000");
    await expect(page.getByRole("heading", { name: "Registry" })).toBeVisible();
    await expect(page.getByText("Under Construction")).toBeVisible();
  });

  test("learn subdomain serves under-construction page", async ({ page }) => {
    await page.goto("http://learn.localhost:3000");
    await expect(page.getByRole("heading", { name: "Learn" })).toBeVisible();
    await expect(page.getByText("Under Construction")).toBeVisible();
  });
});
