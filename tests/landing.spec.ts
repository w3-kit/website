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

test.describe("Recipe Previews section", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
  });

  test("section renders with label and headline", async ({ page }) => {
    const section = page.locator("#preview");
    await section.scrollIntoViewIfNeeded();
    await expect(section.getByText("04 — PREVIEW")).toBeVisible();
    await expect(section.getByRole("heading", { name: /See it before you ship/i })).toBeVisible();
  });

  test("renders all snippet tabs with first selected", async ({ page }) => {
    const section = page.locator("#preview");
    await section.scrollIntoViewIfNeeded();
    const tablist = section.getByRole("tablist");
    await expect(tablist.getByRole("tab", { name: "Connect a wallet" })).toBeVisible();
    await expect(tablist.getByRole("tab", { name: "Show token balances" })).toBeVisible();
    await expect(tablist.getByRole("tab", { name: "Swap tokens via 1inch" })).toBeVisible();
    await expect(tablist.getByRole("tab", { name: "Mint an NFT" })).toBeVisible();
    await expect(tablist.getByRole("tab", { name: "Connect a wallet" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });

  test("clicking a tab updates selection", async ({ page }) => {
    const section = page.locator("#preview");
    await section.scrollIntoViewIfNeeded();
    const tablist = section.getByRole("tablist");

    await tablist.getByRole("tab", { name: "Swap tokens via 1inch" }).click();

    await expect(tablist.getByRole("tab", { name: "Swap tokens via 1inch" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    await expect(tablist.getByRole("tab", { name: "Connect a wallet" })).toHaveAttribute(
      "aria-selected",
      "false"
    );
  });

  test("active tab's code is visible in panel", async ({ page }) => {
    const section = page.locator("#preview");
    await section.scrollIntoViewIfNeeded();
    const panel = section.getByRole("tabpanel");

    await expect(panel).toContainText("ConnectWallet");

    await section.getByRole("tab", { name: "Swap tokens via 1inch" }).click();
    await expect(panel).toContainText("TokenSwap");
  });

  test("copy button writes active snippet code to clipboard", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    const section = page.locator("#preview");
    await section.scrollIntoViewIfNeeded();

    await section.getByRole("button", { name: /copy code/i }).click();

    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain("ConnectWallet");
  });

  test("try-it link points to active snippet's docs href", async ({ page }) => {
    const section = page.locator("#preview");
    await section.scrollIntoViewIfNeeded();

    const tryLink = section.getByRole("link", { name: /try it in docs/i });
    await expect(tryLink).toHaveAttribute("href", "/docs/recipes/connect-wallet");

    await section.getByRole("tab", { name: "Mint an NFT" }).click();
    await expect(tryLink).toHaveAttribute("href", "/docs/recipes/nft-mint");
  });

  test("respects prefers-reduced-motion (no clip animation)", async ({ page }) => {
    const section = page.locator("#preview");
    await section.scrollIntoViewIfNeeded();

    const reveal = section.locator("[data-typewriter]");
    await expect(reveal).toHaveAttribute("data-typewriter", "static");
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
