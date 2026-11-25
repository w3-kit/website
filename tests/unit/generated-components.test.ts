/**
 * The rules every generated component follows. A failure here means the generator broke a rule,
 * not that a snapshot drifted. Run with: npm test
 */
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";
import {
  CHUNK_ROWS,
  CLOSERS,
  FAMILIES,
  NARROW_CARD_WIDTH,
  OPENER,
  PARTS,
  PART_NAMES,
  PART_ROWS_PER_CELL,
  buildPrompt,
  generateChunk,
  measureContrast,
  parseThemeTokens,
  type Chunk,
  type Family,
  type GeneratedComponent,
  type PageKey,
  type PartName,
  type ThemeTokens,
} from "../../src/entities/generated-component/model";

const ROOT = path.resolve(import.meta.dirname, "../..");
/** Every folder that draws a generated component: the grid preview and the one to try. */
const VIEW_DIRS = ["src/entities/generated-component/ui", "src/features/try-component/ui"];
const SITE_TOKENS = parseThemeTokens(
  readFileSync(path.join(ROOT, "src/shared/styles/tokens.css"), "utf8"),
);

/** Phone, tablet, laptop and the widest page. */
const COLUMN_COUNTS = [2, 3, 5, 8];
const SEEDS = [1, 42, 0xabcdef];
const CHUNKS_PER_PAGE = 20;
const MIN_STRUCTURES = 100;

interface Page {
  key: PageKey;
  chunks: Chunk[];
  components: GeneratedComponent[];
}

function generatePage(key: PageKey): Page {
  const chunks: Chunk[] = [];
  for (let i = 0; i < CHUNKS_PER_PAGE; i++) chunks.push(generateChunk(key, chunks.at(-1)));
  return { key, chunks, components: chunks.flatMap((chunk) => chunk.components) };
}

const PAGES = COLUMN_COUNTS.flatMap((columns) =>
  SEEDS.map((seed) => generatePage({ seed, columns })),
);
const COMPONENTS = PAGES.flatMap((page) => page.components);
/** Every page width and every family, for the slower prompt checks. */
const SAMPLE = COMPONENTS.filter((_, i) => i % 25 === 0);
const label = ({ key }: Page) => `seed ${key.seed}, ${key.columns} columns`;
const partNames = (component: GeneratedComponent) => component.parts.map((part) => part.name);

/** The card covering each generated cell, row by row. Fails on an overlap or a card past an edge. */
function cardInEachCell(page: Page): (GeneratedComponent | undefined)[][] {
  const { columns } = page.key;
  const rows = page.chunks.length * CHUNK_ROWS;
  const cells = Array.from({ length: rows }, () =>
    new Array<GeneratedComponent | undefined>(columns).fill(undefined),
  );
  for (const card of page.components) {
    assert.ok(
      card.col >= 0 && card.col + card.w <= columns,
      `${label(page)}: ${card.id} crosses an edge`,
    );
    // A card may run on into the chunk that comes next; only generated rows are checked.
    for (let row = card.row; row < Math.min(card.row + card.h, rows); row++) {
      for (let col = card.col; col < card.col + card.w; col++) {
        assert.equal(
          cells[row][col],
          undefined,
          `${label(page)}: two cards overlap at ${row},${col}`,
        );
        cells[row][col] = card;
      }
    }
  }
  return cells;
}

// ── Page layout ─────────────────────────────────────────────────────────────

test("cards cover the page with no gap, no overlap and nothing past an edge", () => {
  for (const page of PAGES) {
    cardInEachCell(page).forEach((row, y) =>
      row.forEach((card, x) => assert.ok(card, `${label(page)}: no card at ${y},${x}`)),
    );
  }
});

test("two cards of the same family never touch, also where two chunks meet", () => {
  for (const page of PAGES) {
    const cells = cardInEachCell(page);
    cells.forEach((row, y) =>
      row.forEach((card, x) => {
        for (const neighbour of [row[x + 1], cells[y + 1]?.[x]]) {
          if (!card || !neighbour || neighbour === card) continue;
          assert.notEqual(
            neighbour.family,
            card.family,
            `${label(page)}: ${card.id} touches ${neighbour.id}`,
          );
        }
      }),
    );
  }
});

test("the same seed and width give the same page, and another seed gives another page", () => {
  const key = { seed: 7, columns: 5 };
  assert.deepEqual(generatePage(key).components, generatePage(key).components);
  assert.notDeepEqual(generatePage(key).components, generatePage({ ...key, seed: 8 }).components);
});

// ── Parts inside a component ────────────────────────────────────────────────

test("every component opens with the header and closes with a button or a footer", () => {
  for (const component of COMPONENTS) {
    const names = partNames(component);
    assert.equal(names[0], OPENER, component.id);
    assert.ok(CLOSERS.has(names.at(-1)!), `${component.id} ends with ${names.at(-1)}`);
  }
});

test("the parts of a component fill its card exactly", () => {
  for (const component of COMPONENTS) {
    const rows = component.parts.reduce((sum, part) => sum + PARTS[part.name].rows, 0);
    assert.equal(rows, component.h * PART_ROWS_PER_CELL, component.id);
  }
});

test("every part belongs to the family of its component and may follow the part above it", () => {
  for (const component of COMPONENTS) {
    partNames(component).forEach((name, i, names) => {
      assert.ok(
        PARTS[name].families.includes(component.family),
        `${name} in a ${component.family} card`,
      );
      if (i > 0)
        assert.ok(PARTS[names[i - 1]].next.includes(name), `${name} below ${names[i - 1]}`);
    });
  }
});

test("no part appears twice in a component", () => {
  for (const component of COMPONENTS) {
    const names = partNames(component);
    assert.equal(new Set(names).size, names.length, `${component.id}: ${names.join(" > ")}`);
  }
});

test("a component has at most one primary button, and only the footer may follow it", () => {
  for (const component of COMPONENTS) {
    const names = partNames(component);
    const button = names.indexOf("button");
    if (button >= 0)
      assert.deepEqual(
        names.slice(button + 1).filter((n) => n !== "footer"),
        [],
      );
  }
});

test("a notice always sits directly above the primary button", () => {
  for (const component of COMPONENTS) {
    const names = partNames(component);
    const notice = names.indexOf("notice");
    if (notice >= 0) assert.equal(names[notice + 1], "button", component.id);
  }
});

test("no stat label appears twice in a component, so no label shows two values", () => {
  for (const component of COMPONENTS) {
    const labels = component.parts.flatMap((part) =>
      "stats" in part
        ? part.stats
        : "rows" in part && part.name.startsWith("details")
          ? part.rows
          : [],
    );
    const names = labels.map((stat) => ("label" in stat ? stat.label : ""));
    assert.equal(new Set(names).size, names.length, `${component.id}: ${names.join(", ")}`);
  }
});

test("a sample amount never exceeds the sample balance", () => {
  for (const component of COMPONENTS) {
    for (const part of component.parts) {
      if (part.name !== "amount") continue;
      const number = (text: string) => Number(text.replaceAll(",", ""));
      assert.ok(number(part.value) <= number(part.balance), `${component.id}: ${part.value}`);
    }
  }
});

test("a sample slider value sits on its step, so the preview and the prompt agree", () => {
  for (const component of COMPONENTS) {
    for (const part of component.parts) {
      if (part.name !== "slider") continue;
      const steps = part.value / part.step;
      assert.ok(Math.abs(steps - Math.round(steps)) < 1e-9, `${component.id}: ${part.value}`);
      assert.ok(part.value >= 0 && part.value <= part.max, `${component.id}: ${part.value}`);
    }
  }
});

test("a footer below a list counts the list", () => {
  for (const component of COMPONENTS) {
    const list = component.parts.find((part) => "rows" in part && part.name.startsWith("list"));
    const footer = component.parts.find((part) => part.name === "footer");
    if (!list || !footer || !("rows" in list) || !("text" in footer)) continue;
    assert.equal(footer.text, `${list.rows.length} ${FAMILIES[component.family].items}`);
  }
});

test("generation produces many different structures, and uses every part", () => {
  const structures = new Set(COMPONENTS.map((c) => `${c.family}:${partNames(c).join(">")}`));
  assert.ok(
    structures.size >= MIN_STRUCTURES,
    `${structures.size} structures in ${COMPONENTS.length} components`,
  );
  const used = new Set(COMPONENTS.flatMap(partNames));
  assert.deepEqual(
    PART_NAMES.filter((name) => !used.has(name)),
    [],
    "parts the solver never placed",
  );
});

// ── The part table ──────────────────────────────────────────────────────────

test("the part table only points down the list, so a part cannot come back later", () => {
  PART_NAMES.forEach((name, position) => {
    for (const next of PARTS[name].next) {
      assert.ok(PART_NAMES.indexOf(next) > position, `${name} points back to ${next}`);
    }
  });
});

test("every family a part is offered to defines the copy that part needs", () => {
  for (const name of PART_NAMES) {
    const { needs, families } = PARTS[name];
    if (!needs) continue;
    for (const id of families) {
      const family: Family = FAMILIES[id];
      assert.ok(family[needs], `${name} needs "${needs}", which the ${id} family lacks`);
    }
  }
});

// ── Contrast, measured from the site tokens ─────────────────────────────────

/** Ratios measured from src/shared/styles/tokens.css. A token change must update this table. */
const MEASURED: [pair: string, light: string, dark: string][] = [
  ["Text on the card", "19.79", "18.96"],
  ["Secondary text on the card", "4.73", "7.63"],
  ["Text on a field, pill or notice", "18.15", "14.48"],
  ["Secondary text on a field", "4.34", "5.83"],
  ["Primary button label", "17.16", "14.22"],
  ["Chart, progress and slider fill", "17.91", "15.72"],
  ["Field edge against the card", "1.09", "1.31"],
  ["Outlined control edge against the card", "1.26", "1.25"],
  ["Focus ring against the card", "2.59", "4.18"],
];
const KNOWN_GAPS = [
  "light: Secondary text on a field",
  "light: Field edge against the card",
  "dark: Field edge against the card",
  "light: Outlined control edge against the card",
  "dark: Outlined control edge against the card",
  "light: Focus ring against the card",
];

test("contrast of every token pair is measured from the site stylesheet, in both modes", () => {
  const measured = measureContrast(SITE_TOKENS);
  const ratio = (mode: string, name: string) =>
    measured.find((pair) => pair.mode === mode && pair.name === name)?.ratio.toFixed(2);
  assert.equal(measured.length, MEASURED.length * 2);
  for (const [name, light, dark] of MEASURED) {
    assert.equal(ratio("light", name), light, `light: ${name}`);
    assert.equal(ratio("dark", name), dark, `dark: ${name}`);
  }
});

test("the pairs below their target are exactly the known gaps", () => {
  const gaps = measureContrast(SITE_TOKENS)
    .filter((pair) => pair.ratio < pair.target)
    .map((pair) => `${pair.mode}: ${pair.name}`);
  assert.deepEqual(gaps.sort(), [...KNOWN_GAPS].sort());
});

/** One palette for both modes where only the text and card colours differ from white. */
function tokensWith(foreground: string, background: string): ThemeTokens {
  const names = ["muted", "muted-foreground", "primary", "primary-foreground", "border", "ring"];
  const palette = {
    ...Object.fromEntries(names.map((name) => [name, "#ffffff"])),
    foreground,
    background,
  };
  return { light: palette, dark: palette };
}
const textOnCard = (tokens: ThemeTokens) => measureContrast(tokens)[0].ratio;

test("an oklch colour measures the same as its hex twin", () => {
  // Tailwind red-600 is defined as this oklch value and published as #e7000b.
  assert.ok(Math.abs(textOnCard(tokensWith("oklch(0.577 0.245 27.325)", "#e7000b")) - 1) < 0.01);
  assert.equal(textOnCard(tokensWith("#000000", "oklch(1 0 0)")).toFixed(2), "21.00");
});

test("a translucent token is measured over the card background", () => {
  const opaque = textOnCard(tokensWith("oklch(1 0 0)", "#000000"));
  const faint = textOnCard(tokensWith("oklch(1 0 0 / 10%)", "#000000"));
  assert.equal(opaque.toFixed(2), "21.00");
  assert.ok(faint > 1 && faint < 2, `10% white over black measured ${faint}`);
});

test("a colour that cannot be measured is refused, never guessed", () => {
  assert.throws(() => measureContrast(tokensWith("rebeccapurple", "#ffffff")), /cannot measure/);
  assert.throws(() => measureContrast({ light: {}, dark: {} }), /does not define/);
});

// ── The prompt ──────────────────────────────────────────────────────────────

test("the prompt asks for one component that follows the site theme in both modes", () => {
  for (const component of SAMPLE) {
    const prompt = buildPrompt(component, SITE_TOKENS);
    assert.match(prompt, new RegExp(`called \`${component.name}\``));
    assert.match(prompt, /no theme of its own/);
    assert.match(prompt, /No mode-specific code: no dark: variant/);
    assert.match(prompt, /:root \{ --background: oklch\(1 0 0\);/);
    assert.match(prompt, /\.dark \{ --background: oklch\(0\.145 0 0\);/);
    assert.match(prompt, /@base-ui\/react/);
    assert.doesNotMatch(prompt, /ui-sdk|hsl\(|@custom-variant/i);
    assert.match(
      prompt,
      component.w > NARROW_CARD_WIDTH ? /designed for 440 to 560px/ : /designed for 300 to 400px/,
    );
  }
});

/** How the prompt opens the line for each part. */
const LINE_START: Record<PartName, string> = {
  header: "Header:",
  tabs: "Tabs:",
  search: "Search field:",
  chart: "Price chart:",
  artwork: "Artwork:",
  gallery: "Gallery:",
  list2: "List of 2 rows.",
  list3: "List of 3 rows.",
  list4: "List of 4 rows.",
  recipient: "Recipient field:",
  amount: "Amount field:",
  flip: "Flip button:",
  result: "Result field:",
  quickAmounts: "Quick amounts:",
  slider: "Slider:",
  statGrid: "Stat grid:",
  progress: "Progress bar:",
  details1: "Detail row:",
  details2: "Details list of 2 rows",
  details3: "Details list of 3 rows",
  signers: "Signers:",
  notice: "Notice:",
  button: "Primary button:",
  footer: "Footer:",
};

test("the prompt describes every part, in order, and carries the measured contrast gaps", () => {
  for (const component of SAMPLE) {
    const prompt = buildPrompt(component, SITE_TOKENS);
    const layout = prompt.split("Layout, top to bottom\n")[1].split("\n\n")[0].split("\n");
    assert.deepEqual(
      layout
        .map((line) => line.replace(/^\d+\. /, ""))
        .map((line, i) => line.startsWith(LINE_START[component.parts[i].name])),
      component.parts.map(() => true),
      `${component.id}: ${layout.join(" | ")}`,
    );
    assert.match(prompt, /secondary text on a field \(light\) measures 4\.34:1 against 4\.5:1/);
    assert.doesNotThrow(() => JSON.parse(prompt.split("Sample data\n")[1]));
  }
});

// ── The part views ──────────────────────────────────────────────────────────

/** The only colours a part view may name: the semantic tokens the prompt hands to the agent. */
const TOKEN_COLOURS = new Set([
  "background",
  "foreground",
  "muted",
  "muted-foreground",
  "primary",
  "primary-foreground",
  "border",
  "ring",
  "current",
  "transparent",
]);
/** Utilities that take a colour, and the other values they may take that are not colours. */
const COLOUR_UTILITIES: Record<string, RegExp> = {
  bg: /^(none|clip-padding)$/,
  text: /^(xs|sm|base|lg|xl|\dxl|start|end|center|left|right)$/,
  border: /^(\d+|[xytblrse](-\d+)?)$/,
  outline: /^(\d+|none|offset-\d+)$/,
  ring: /^(\d+|inset|offset-\d+)$/,
  fill: /^$/,
  stroke: /^\d+$/,
  shadow: /^(xs|sm|md|lg|xl|2xl|none|inner)$/,
  decoration: /^(\d+|solid|dashed|dotted|wavy|double)$/,
  caret: /^$/,
  accent: /^$/,
  divide: /^(x|y)(-\d+)?$/,
  placeholder: /^$/,
};
const UTILITY = new RegExp(
  `(?<![\\w-])(?:[\\w-]+:)*-?(${Object.keys(COLOUR_UTILITIES).join("|")})-([\\w.\\[\\]()/-]+)`,
  "g",
);
const VIEW_SOURCES = VIEW_DIRS.flatMap((dir) =>
  readdirSync(path.join(ROOT, dir)).map(
    (file) => [file, readFileSync(path.join(ROOT, dir, file), "utf8")] as const,
  ),
);

function themeViolations(source: string): string[] {
  const found: string[] = [];
  for (const [match, utility, rawValue] of source.matchAll(UTILITY)) {
    const value = rawValue.split("/")[0];
    if (TOKEN_COLOURS.has(value) || COLOUR_UTILITIES[utility].test(value)) continue;
    found.push(match);
  }
  for (const [match, name] of source.matchAll(/var\(--([\w-]+)\)/g)) {
    if (!TOKEN_COLOURS.has(name)) found.push(match);
  }
  const raw = source.match(
    /#[0-9a-fA-F]{3,8}\b|\b(rgba?|hsla?|oklch|oklab|lab|lch|color-mix|color)\(|\bdark:/g,
  );
  return [...found, ...(raw ?? [])];
}

test("the part views name no colour outside the semantic tokens, and no dark variant", () => {
  assert.ok(VIEW_SOURCES.length > 0);
  for (const [file, source] of VIEW_SOURCES) {
    assert.deepEqual(themeViolations(source), [], file);
  }
});

test("the theme check catches the colours it is there to catch", () => {
  for (const slip of [
    'className="bg-blue-600"',
    'className="border-white"',
    'className="hover:fill-black"',
    'className="bg-[var(--w3-footer-ground)]"',
    'className="dark:bg-background"',
    "style={{ color: 'rgb(0 0 0)' }}",
    "style={{ background: 'color-mix(in srgb, red, blue)' }}",
    "style={{ background: 'var(--w3-accent)' }}",
    'fill="#000"',
  ]) {
    assert.notDeepEqual(themeViolations(slip), [], slip);
  }
  assert.deepEqual(
    themeViolations(
      'className="border-b border-border bg-primary/10 text-xs ring-2 ring-background"',
    ),
    [],
  );
});
