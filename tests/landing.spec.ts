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

  test("the ecosystem switcher marks the current site and links the others", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(header.getByRole("navigation")).toHaveCount(0);
    await header.getByRole("button", { name: "Ecosystem" }).click();
    await expect(header.getByRole("link", { name: /^Registry/ })).toBeVisible();
    await expect(header.locator('[aria-current="page"]')).toContainText("w3-kit");
  });

  test("an open header menu closes on Escape and on a click outside", async ({ page }) => {
    const header = page.getByRole("banner");
    const ecosystem = header.getByRole("button", { name: "Ecosystem" });

    await ecosystem.click();
    await page.keyboard.press("Escape");
    await expect(ecosystem).toHaveAttribute("aria-expanded", "false");
    await expect(ecosystem).toBeFocused();

    await ecosystem.click();
    await page.mouse.click(10, 700);
    await expect(ecosystem).toHaveAttribute("aria-expanded", "false");
  });

  test("confirming the waiting swap settles it", async ({ page }) => {
    const states = page.locator("#states");
    await states.getByRole("button", { name: "Confirm swap" }).click();
    await expect(states.getByRole("button", { name: "Again" })).toBeVisible();
    await expect(states.getByRole("button", { name: "Confirm swap" })).toHaveCount(0);
  });

  test("chain tabs show that chain's tokens and follow the arrow keys", async ({ page }) => {
    const tabs = page.getByRole("tablist", { name: "Chains" });
    await tabs.getByRole("tab", { name: /Base/ }).click();
    await expect(page.getByRole("tabpanel")).toContainText(/All \d+ tokens on Base/);
    await page.keyboard.press("ArrowDown");
    await expect(tabs.getByRole("tab", { name: /Arbitrum/ })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  test("each workflow stage shows its own clause and CLI output", async ({ page }) => {
    const workflow = page.locator("#workflow");
    await workflow.getByRole("button", { name: "Chains" }).click();
    await expect(workflow.getByRole("heading")).toHaveText("Look upany chain.");
    await expect(workflow.getByText("npx w3-kit registry chain 8453")).toBeVisible();
  });

  test("choosing the dark theme applies it and survives a reload", async ({ page }) => {
    await page
      .getByRole("group", { name: "Colour theme" })
      .getByRole("button", { name: "Dark" })
      .click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });
});

test.describe("Design reference", () => {
  test("is reachable but not linked from the main site", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
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
});

test.describe("Components catalog", () => {
  test("the DeFi header menu opens the catalog filtered to DeFi", async ({ page }) => {
    await page.goto("http://ui.localhost:3000/", { waitUntil: "networkidle" });
    await page.getByRole("banner").getByRole("button", { name: "DeFi" }).click();
    await page.getByRole("link", { name: "Open DeFi" }).click();
    await expect(page).toHaveURL("http://ui.localhost:3000/?category=defi");

    const tab = page
      .getByRole("navigation", { name: "Categories" })
      .locator('[aria-current="page"]');
    const shown = Number((await tab.textContent())?.match(/\d+/)?.[0]);
    const tiles = page.getByRole("list", { name: "Components" }).locator(":scope > li");
    await expect(tiles).toHaveCount(shown);
  });

  test("an unknown category shows every component", async ({ page }) => {
    await page.goto("http://ui.localhost:3000/?category=nope");
    const all = page
      .getByRole("navigation", { name: "Categories" })
      .getByRole("link", { name: /^All/ });
    await expect(all).toHaveAttribute("aria-current", "page");
  });

  test("an unknown component says so and links back to the catalog", async ({ page }) => {
    await page.goto("http://ui.localhost:3000/no-such-thing");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "No componentcalled no-such-thing.",
    );
    await expect(page.getByRole("link", { name: "All components" })).toBeVisible();
  });
});

test.describe("Docs recipes", () => {
  test("a recipe for both ecosystems switches its code between them", async ({ page }) => {
    await page.goto("http://docs.localhost:3000/recipe/swap-tokens", { waitUntil: "networkidle" });
    const tabs = page.getByRole("tablist", { name: "Chain" });
    await tabs.getByRole("tab", { name: "Solana" }).click();
    await expect(tabs.getByRole("tab", { name: "Solana" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(page.getByText("swap-tokens/solana.tsx")).toBeVisible();
  });
});
