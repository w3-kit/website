import {
  MODES,
  isBelowTarget,
  measureContrast,
  type Mode,
  type Palette,
  type ThemeTokens,
} from "./contrast";
import type { ListRow } from "./families";
import { NARROW_CARD_WIDTH, type GeneratedComponent } from "./generate";
import type { Detail, Part, PartName, PartOf } from "./parts";

/**
 * The design rules come in three layers. Layer 1: rules the generator guarantees, because the
 * part table, the copy lists and the part views cannot break them. Layer 2 is measured contrast
 * (see contrast.ts). Layer 3 is AGENT_RULES below.
 */
export const GUARANTEED_RULES: readonly (readonly [area: string, rule: string])[] = [
  ["Theme", "Semantic colour tokens only. One component, both modes, no mode-specific code."],
  ["Structure", "Header first, footer last. At most one primary button. No part appears twice."],
  ["Writing", "Button labels start with a verb. Sentence case. Notices state the consequence."],
  ["Typography", "No text below 12px. Tabular figures on every number."],
  ["Accessibility", "Every field has a label. Colour is never the only cue."],
];

/** Rules of structure. The part table enforces them for the preview; the agent keeps them. */
const STRUCTURE_RULES = [
  "The header comes first. The footer, when there is one, comes last.",
  "At most one primary button, and it is the last control.",
  "A notice sits directly above the primary button.",
];

/** Layer 3: rules only the building agent can follow. They travel in every prompt. */
export const AGENT_RULES = [
  "Accessibility",
  "- Native elements: <button> for actions, <a href> for navigation. Never a clickable div or span.",
  "- Every input has a visible <label>, except a search field, which has an aria-label and a magnifier icon. A placeholder is never the label. An error sets aria-invalid and aria-describedby pointing at inline text.",
  "- Every control shows a :focus-visible ring. Never outline-none without a replacement ring.",
  "- Targets are at least 24 by 24px; aim for 40 by 40px. Hit areas never overlap.",
  "- Meaning is never carried by colour alone. Pair it with text or an icon.",
  "- Movement and scale run only under motion-safe (prefers-reduced-motion: no-preference).",
  "Layout",
  "- Lines only under the header and above the footer. Group everything else with space: the gap between groups is at least twice the gap inside a group.",
  "- Text containers use min-height, never a fixed height. Flex children that hold text get min-w-0. No horizontal scroll at 320px.",
  "- Use logical spacing classes (ms-, me-, ps-, pe-, text-start) so the layout mirrors for right-to-left.",
  "Writing",
  '- Sentence case. Button labels start with a verb. No "please", "successfully", "oops" or exclamation marks.',
  "- An error says how to fix the problem and sits next to the field. A placeholder shows an example value.",
  "Typography",
  "- No text below 12px. Inputs are 16px on mobile: text-base sm:text-sm.",
  "- Weight 400 or heavier below 18px. Text that can wrap has a line-height of at least 1.4.",
  "- tabular-nums on every amount, price, percentage and counter.",
  "Polish",
  "- A pressed button scales to 0.96 over 150ms with ease-out, never when disabled or busy: motion-safe:enabled:active:scale-[0.96].",
  "- Name the properties that transition. Never transition-all.",
  "- Icons come from lucide-react and use currentColor.",
  "- A scrollable popup or list gets overscroll-contain, so it never scrolls the page behind it.",
];

/** The tokens a generated component uses. The prompt lists their values for both modes. */
const PROMPT_TOKENS = [
  "background",
  "foreground",
  "muted",
  "muted-foreground",
  "primary",
  "primary-foreground",
  "border",
  "ring",
  "radius",
];
const MODE_SELECTORS: Record<Mode, string> = { light: ":root", dark: ".dark" };
const WIDTH_RANGES = { narrow: "300 to 400", wide: "440 to 560" };

/** The prompt a coding agent can build this exact component from. */
export function buildPrompt(component: GeneratedComponent, tokens: ThemeTokens): string {
  const brief = describeParts(component.parts);
  const usesTokenType = [...brief.props.values()].some((type) => type.includes("Token"));
  return [
    `Build a React component called \`${component.name}\` for a web3 app.`,
    "",
    "Before you start",
    "- If the packages are missing, install them: npm install @base-ui/react lucide-react",
    "",
    "Stack",
    "- React 19, TypeScript, Tailwind CSS 4.",
    "- Build each interactive part on a Base UI primitive (@base-ui/react) where one exists: Tabs, Field, Input, NumberField, Select or Combobox, Slider, Progress, Popover, Button. Do not hand-write keyboard, focus or ARIA logic that Base UI already provides.",
    "- Pure UI: no wallet library, no network calls, no signing. Data comes in through props. Actions go out through callbacks.",
    "",
    "Layout, top to bottom",
    ...brief.lines.map((line, i) => `${i + 1}. ${line}`),
    "",
    ...lookSection(component),
    "",
    ...themeSection(tokens),
    "",
    "Structure",
    ...STRUCTURE_RULES.map((rule) => `- ${rule}`),
    "",
    "Design rules",
    ...AGENT_RULES,
    "",
    "Props",
    ...[...brief.props].map(([name, type]) => `- ${name}: ${type}`),
    "- className: string | undefined",
    ...(usesTokenType
      ? ["", "Types", "- Token = { symbol: string; name?: string; icon?: string }"]
      : []),
    "",
    "Done when",
    "- It typechecks in strict mode with no `any`.",
    "- Every control can be reached and used with the keyboard alone.",
    "- It renders with the sample data below and no wallet connected.",
    "- It looks right with the light tokens and with the dark tokens, from the same code.",
    "- It imports only react, @base-ui/react, lucide-react and local files.",
    "- None of these appear in the file: a dark: variant, transition-all, a clickable div or span, a raw colour value, a palette class such as bg-blue-600.",
    "",
    "Sample data",
    JSON.stringify(brief.sample, null, 2),
  ].join("\n");
}

/** The look of the w3-kit component library, so a generated component sits next to it. */
function lookSection(component: GeneratedComponent): string[] {
  const width = component.w > NARROW_CARD_WIDTH ? WIDTH_RANGES.wide : WIDTH_RANGES.narrow;
  return [
    "Look (the w3-kit component library)",
    "- Card: rounded-2xl, 1px border-border, bg-background, text-foreground, overflow hidden, text-sm.",
    "- Header row: 20px inline padding and a line below it (border-b border-border).",
    "- Content rows: 20px inline padding. Fields, stat cells and notices: rounded-xl bg-muted.",
    "- Avatars and badges are round (rounded-full) on bg-muted. Status pills: rounded-full bg-muted text-xs text-foreground.",
    "- Primary button: full width, rounded-xl, bg-primary text-primary-foreground, at least 40px tall.",
    "- The selected tab is a filled pill: bg-primary text-primary-foreground. Other tabs are plain text-muted-foreground.",
    "- bg-primary appears only on the primary button, the selected tab and data fills (chart line, progress, slider).",
    "- Footer row: a line above it (border-t border-border) and centred text-xs text-muted-foreground.",
    `- The card fills the width of its container and is designed for ${width}px.`,
  ];
}

function themeSection(tokens: ThemeTokens): string[] {
  const gaps = measureContrast(tokens)
    .filter(isBelowTarget)
    .map(
      ({ mode, name, ratio, target }) =>
        `${name.toLowerCase()} (${mode}) measures ${ratio.toFixed(2)}:1 against ${target}:1`,
    );
  return [
    "Theme: one component, two modes",
    "- The component has no theme of its own. It follows the site theme, light or dark, through semantic token classes alone: bg-background, text-foreground, bg-muted, text-muted-foreground, bg-primary, text-primary-foreground, border-border, ring-ring.",
    "- No mode-specific code: no dark: variant, no theme prop, no check of the colour scheme, no second set of classes. Switching the site theme must restyle the component through CSS only.",
    "- If the project does not define the tokens yet, add them to the global stylesheet with the values below, the dark ones under the selector the project uses for dark mode, and map each colour in a Tailwind 4 @theme inline block, as in --color-background: var(--background).",
    ...MODES.map((mode) => `  ${MODE_SELECTORS[mode]} { ${declarations(tokens[mode])} }`),
    ...(gaps.length
      ? [
          `- Measured contrast gaps in these tokens: ${gaps.join("; ")}. Keep the tokens as they are. Where a text pair is below target, use text-foreground instead.`,
        ]
      : []),
  ];
}

const declarations = (palette: Palette) =>
  PROMPT_TOKENS.filter((name) => palette[name] !== undefined)
    .map((name) => `--${name}: ${palette[name]};`)
    .join(" ");

// ── Describing parts ────────────────────────────────────────────────────────

/** What the prompt says about a component: one line per part, its props and its sample data. */
interface Brief {
  lines: string[];
  props: Map<string, string>;
  sample: Record<string, unknown>;
}

function describeParts(parts: readonly Part[]): Brief {
  const brief: Brief = { lines: [], props: new Map(), sample: {} };
  for (const part of parts) {
    const describe = DESCRIBERS[part.name] as (part: Part, brief: Brief) => void;
    describe(part, brief);
  }
  return brief;
}

const quoted = ({ label, value }: Detail) => `"${label}" = "${value}"`;
const capitalised = (word: string) => word[0].toUpperCase() + word.slice(1);

function describeDetails({ rows }: { rows: Detail[] }, brief: Brief): void {
  brief.lines.push(
    rows.length === 1
      ? `Detail row: "${rows[0].label}" on the left, "${rows[0].value}" on the right.`
      : `Details list of ${rows.length} rows, label on the left and value on the right: ${rows.map(quoted).join("; ")}.`,
  );
  brief.props.set("details", "{ label: string; value: string }[]");
  brief.sample.details = rows;
}

function describeList({ rows }: { rows: ListRow[] }, brief: Brief): void {
  const second = rows[0].status ? "status" : "note";
  brief.lines.push(
    `List of ${rows.length} rows. Each row: round avatar with the first two letters of the title, title and muted subtitle on the left, value and ${rows[0].status ? "a status pill" : "a muted note"} on the right: ${rows.map((row) => `"${row.title}"`).join(", ")}.`,
  );
  brief.props.set(
    "items",
    `{ title: string; subtitle: string; value: string; ${second}: string }[]`,
  );
  brief.sample.items = rows.map(({ title, subtitle, value, note }) => ({
    title,
    subtitle,
    value,
    [second]: note,
  }));
}

const DESCRIBERS: { [K in PartName]: (part: PartOf<K>, brief: Brief) => void } = {
  header({ title, network }, brief) {
    brief.lines.push(
      `Header: a line icon, title "${title}", and a round badge "${network}" on the right.`,
    );
    brief.props.set("title", "string").set("network", "string");
    Object.assign(brief.sample, { title, network });
  },
  tabs({ options }, brief) {
    const tabs = options.map((option) => `"${option.toLowerCase()}"`).join(" | ");
    brief.lines.push(
      `Tabs: ${options.map((option) => `"${option}"`).join(", ")}, with "${options[0]}" selected. Arrow keys move between them.`,
    );
    brief.props.set("tab", tabs).set("onTabChange", `(tab: ${tabs}) => void`);
    brief.sample.tab = options[0].toLowerCase();
  },
  search({ placeholder }, brief) {
    brief.lines.push(
      `Search field: magnifier icon and placeholder "${placeholder}". It filters the list below as you type.`,
    );
    brief.props.set("query", "string").set("onQueryChange", "(query: string) => void");
    brief.sample.query = "";
  },
  chart({ price, change, prices }, brief) {
    brief.lines.push(
      `Price chart: current price "${price}" and change "${change}" on one line, then a ${prices.length}-point line chart with a soft fill below the line.`,
    );
    brief.props.set("price", "string").set("change", "string").set("prices", "number[]");
    Object.assign(brief.sample, { price, change, prices });
  },
  artwork({ collection, tokenId }, brief) {
    brief.lines.push(
      `Artwork: rounded-xl image filling the card width with a name tag "${collection} ${tokenId}" in the bottom left corner. Show a neutral placeholder block when image is empty.`,
    );
    brief.props.set("image", "string").set("name", "string").set("tokenId", "string");
    Object.assign(brief.sample, { image: "", name: collection, tokenId });
  },
  gallery({ items }, brief) {
    brief.lines.push(
      `Gallery: ${items.length} NFT tiles side by side, each a rounded-xl image with the name and price below: ${items.map((item) => `"${item.name}" at "${item.price}"`).join(", ")}.`,
    );
    brief.props.set("nfts", "{ name: string; price: string; image: string }[]");
    brief.sample.nfts = items.map(({ name, price }) => ({ name, price, image: "" }));
  },
  list2: describeList,
  list3: describeList,
  list4: describeList,
  recipient({ address }, brief) {
    brief.lines.push(
      `Recipient field: label "Recipient", text input showing "${address}", with room for an error message below.`,
    );
    brief.props
      .set("recipient", "string")
      .set("onRecipientChange", "(value: string) => void")
      .set("recipientError", "string | undefined");
    brief.sample.recipient = address;
  },
  amount({ value, symbol, balance, tokens }, brief) {
    brief.lines.push(
      `Amount field: label "Amount", text input with a decimal keyboard (inputmode="decimal") showing "${value}", token chip "${symbol}" that opens a searchable token list, and balance text "Balance ${balance}".`,
    );
    brief.props
      .set("amount", "string")
      .set("onAmountChange", "(value: string) => void")
      .set("token", "Token")
      .set("tokens", "Token[]")
      .set("onTokenChange", "(token: Token) => void")
      .set("balance", "string")
      .set("amountError", "string | undefined // shown under the field");
    Object.assign(brief.sample, {
      amount: value,
      token: { symbol },
      tokens: tokens.map((token) => ({ symbol: token })),
      balance,
    });
  },
  flip(_part, brief) {
    brief.lines.push("Flip button: round button with a down arrow that swaps the two tokens.");
    brief.props.set("onFlip", "() => void");
  },
  result({ value, symbol }, brief) {
    brief.lines.push(
      `Result field: label "You receive", read-only value "${value}", token chip "${symbol}" that opens the same token list.`,
    );
    brief.props
      .set("quote", "string")
      .set("outputToken", "Token")
      .set("onOutputTokenChange", "(token: Token) => void");
    Object.assign(brief.sample, { quote: value, outputToken: { symbol } });
  },
  quickAmounts(_part, brief) {
    brief.lines.push('Quick amounts: four outlined buttons "25%", "50%", "75%", "Max".');
    brief.props.set("onPercent", "(percent: 25 | 50 | 75 | 100) => void");
  },
  slider({ label, prop, value, max, unit }, brief) {
    brief.lines.push(
      `Slider: label "${label}", current value "${value}${unit}", range 0 to ${max}${unit}.`,
    );
    brief.props.set(prop, "number").set(`on${capitalised(prop)}Change`, "(value: number) => void");
    brief.sample[prop] = value;
  },
  statGrid({ stats }, brief) {
    brief.lines.push(`Stat grid: three equal cells, ${stats.map(quoted).join(", ")}.`);
    brief.props.set("stats", "{ label: string; value: string }[]");
    brief.sample.stats = stats;
  },
  progress({ label, percent }, brief) {
    brief.lines.push(
      `Progress bar: label "${label}", ${percent}% filled, percentage shown on the right.`,
    );
    brief.props.set("progress", "number // 0 to 1").set("progressLabel", "string");
    Object.assign(brief.sample, { progress: percent / 100, progressLabel: label });
  },
  details1: describeDetails,
  details2: describeDetails,
  details3: describeDetails,
  signers({ signers }, brief) {
    const signed = signers.filter((signer) => signer.signed).length;
    brief.lines.push(
      `Signers: small uppercase label "Signers", ${signers.length} overlapping round avatars and the text "${signed} of ${signers.length} signed".`,
    );
    brief.props.set("signers", "{ address: string; signed: boolean }[]");
    brief.sample.signers = signers;
  },
  notice({ text }, brief) {
    brief.lines.push(
      `Notice: banner with a warning icon and the text "${text}". Hidden when there is nothing to warn about.`,
    );
    brief.props.set("notice", "string | undefined");
    brief.sample.notice = text;
  },
  button({ label }, brief) {
    brief.lines.push(
      `Primary button: full width, label "${label}". Shows a busy state while the promise from onSubmit is pending.`,
    );
    brief.props
      .set("submitLabel", "string")
      .set("onSubmit", "() => void | Promise<void>")
      .set("disabled", "boolean | undefined // disables every control");
    brief.sample.submitLabel = label;
  },
  footer({ text }, brief) {
    brief.lines.push(`Footer: small muted centred text "${text}".`);
    brief.props.set("footnote", "string | undefined");
    brief.sample.footnote = text;
  },
};
