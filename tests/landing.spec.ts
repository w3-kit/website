import { test, expect } from "@playwright/test";

test.describe("Landing page", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/", { waitUntil: "networkidle" });
  });

  test("first screen says what w3-kit is and offers the install command", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Web3 componentsfor React apps.",
    );
    await expect(page.getByRole("button", { name: /npx w3-kit init/ }).first()).toBeVisible();
  });

  test("main site header has no section links, only the ecosystem switcher", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(header.getByRole("navigation")).toHaveCount(0);
    await header.getByRole("button", { name: "Ecosystem" }).click();
    await expect(header.getByRole("link", { name: /^Registry/ })).toBeVisible();
    await expect(header.getByRole("link", { name: /^w3-kit/ }).last()).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  test("confirming the waiting swap settles it", async ({ page }) => {
    const states = page.locator("#states");
    await states.getByRole("button", { name: "Confirm swap" }).click();
    await expect(states.getByRole("button", { name: "Again" })).toBeVisible();
    await expect(states.getByRole("button", { name: "Confirm swap" })).toHaveCount(0);
  });

  test("chain tabs show that chain's token addresses and follow the arrow keys", async ({
    page,
  }) => {
    const tabs = page.getByRole("tablist", { name: "Chains" });
    await tabs.getByRole("tab", { name: /Base/ }).click();
    await expect(page.getByRole("tabpanel")).toContainText("All 4 tokens on Base");
    await page.keyboard.press("ArrowDown");
    await expect(tabs.getByRole("tab", { name: /Arbitrum/ })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  test("the workflow slider swaps the clause and the CLI output", async ({ page }) => {
    const workflow = page.locator("#workflow");
    await workflow.getByRole("button", { name: "Chains" }).click();
    await expect(workflow.getByRole("heading")).toHaveText("Look upany chain.");
    await expect(workflow.locator("pre")).toContainText("npx w3-kit registry chain 8453");
  });

  test("design reference page exists but is linked from nowhere", async ({ page }) => {
    await expect(page.locator('a[href$="/design"]')).toHaveCount(0);
    await page.goto("/design");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("The w3-kit design");
  });
});

test.describe("Subdomain routing", () => {
  test("each section serves its own site at a clean path", async ({ page }) => {
    await page.goto("http://ui.localhost:3000/token-swap");
    await expect(page).toHaveURL("http://ui.localhost:3000/token-swap");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Token Swap");

    await page.goto("http://registry.localhost:3000/chains/8453");
    await expect(page).toHaveURL("http://registry.localhost:3000/chains/8453");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Base");

    await page.goto("http://docs.localhost:3000/installation");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Installation");
  });

  test("the subdomain root does not redirect to its internal folder", async ({ page }) => {
    await page.goto("http://ui.localhost:3000/");
    await expect(page).toHaveURL("http://ui.localhost:3000/");
  });

  test("old guide pages on the components site move to docs", async ({ page }) => {
    await page.goto("http://ui.localhost:3000/mcp");
    await expect(page).toHaveURL("http://docs.localhost:3000/mcp");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("MCP Server");
  });

  test("a component category menu opens the catalog filtered to it", async ({ page }) => {
    await page.goto("http://ui.localhost:3000/?category=nft");
    await expect(page.getByRole("link", { name: /^NFT\s*3$/ })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(page.locator("main ul > li")).toHaveCount(3);
  });
});
