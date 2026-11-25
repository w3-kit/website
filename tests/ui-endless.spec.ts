import { test, expect, type Page } from "@playwright/test";

const ENDLESS = "http://ui.localhost:3000/endless";
const TOKENS = [
  "background",
  "foreground",
  "muted",
  "muted-foreground",
  "primary",
  "primary-foreground",
  "border",
  "ring",
];
const tiles = (page: Page) => page.getByRole("list", { name: "Generated components" });

/**
 * Every colour drawn inside a generated card that is not one of the theme tokens as the page
 * currently resolves them. Empty means the cards carry no colour of their own.
 */
const foreignColours = (page: Page) =>
  page.evaluate((tokens) => {
    const probe = document.createElement("span");
    document.body.append(probe);
    const allowed = new Set(["rgba(0, 0, 0, 0)"]);
    for (const token of tokens) {
      probe.style.color = `var(--${token})`;
      allowed.add(getComputedStyle(probe).color);
    }
    probe.remove();
    const cards = document.querySelectorAll('ul[aria-label="Generated components"] [inert]');
    const seen = new Set<string>();
    for (const card of cards) {
      for (const element of [card, ...card.querySelectorAll("*")]) {
        const style = getComputedStyle(element);
        const colours = [style.color, style.backgroundColor];
        if (parseFloat(style.borderTopWidth) > 0) colours.push(style.borderTopColor);
        for (const colour of colours) if (!allowed.has(colour)) seen.add(colour);
      }
    }
    return { cards: cards.length, foreign: [...seen] };
  }, TOKENS);

/** More components load while the page settles, so only the first few are compared. */
const COMPARED = 4;
async function firstNames(page: Page): Promise<(string | null)[]> {
  const buttons = tiles(page).getByRole("button");
  await expect(buttons.nth(COMPARED - 1)).toBeVisible();
  return buttons.evaluateAll((all, count) => all.slice(0, count).map((b) => b.ariaLabel), COMPARED);
}

test.describe("Endless components", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  test("a visit without a seed gets one, and that link reproduces the page", async ({ page }) => {
    await page.goto(ENDLESS);
    await expect(page).toHaveURL(/\/endless\?seed=\d+$/);
    const names = await firstNames(page);

    await page.goto(page.url());
    expect(await firstNames(page)).toEqual(names);
  });

  test("scrolling adds components", async ({ page }) => {
    await page.goto(`${ENDLESS}?seed=42`);
    await expect(tiles(page).getByRole("button").first()).toBeVisible();
    const before = await tiles(page).getByRole("button").count();
    await page.mouse.wheel(0, 20000);
    await expect.poll(() => tiles(page).getByRole("button").count()).toBeGreaterThan(before);
  });

  test("in either site theme, every component draws only that theme's tokens", async ({ page }) => {
    await page.goto(`${ENDLESS}?seed=42`);
    await expect(tiles(page).getByRole("button").first()).toBeVisible();

    for (const theme of ["Light", "Dark"]) {
      await page.getByRole("button", { name: theme, exact: true }).click();
      const { cards, foreign } = await foreignColours(page);
      expect(cards).toBeGreaterThan(0);
      expect(foreign, `${theme}: colours outside the tokens`).toEqual([]);
    }
  });

  test("selecting a component shows its prompt, and Escape returns to the component", async ({
    page,
  }) => {
    await page.goto(`${ENDLESS}?seed=42`);
    const first = tiles(page).getByRole("button").first();
    await first.focus();
    await page.keyboard.press("Enter");

    const dialog = page.getByRole("dialog");
    await expect(dialog).toContainText("one component, two modes");
    await expect(dialog).toContainText("@base-ui/react");
    await expect(dialog.getByRole("button", { name: "Copy prompt" })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(first).toBeFocused();
  });

  test("an open prompt stays open when the page changes width", async ({ page }) => {
    await page.goto(`${ENDLESS}?seed=42`);
    await tiles(page).getByRole("button").first().click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.setViewportSize({ width: 700, height: 800 });
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test("a phone-wide page has no sideways scroll, with the design rules open", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto(`${ENDLESS}?seed=42`);
    await expect(tiles(page).getByRole("button").first()).toBeVisible();
    await page.getByText("Design rules these components follow").click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      320,
    );
    const dark = await page.getByRole("button", { name: "Dark", exact: true }).boundingBox();
    expect(dark!.x + dark!.width).toBeLessThanOrEqual(320);
    await expect(page.getByRole("heading", { level: 1 })).toBeInViewport({ ratio: 1 });
  });
});
