/**
 * Contrast of the token pairs the generated components use, measured from the site stylesheet
 * with the WCAG formula. Measured, never estimated: the token values are parsed from the CSS text.
 */

export const MODES = ["light", "dark"] as const;
export type Mode = (typeof MODES)[number];
/** Token name (without the leading dashes) to its CSS value. */
export type Palette = Record<string, string>;
export type ThemeTokens = Record<Mode, Palette>;

export interface ContrastPair {
  mode: Mode;
  name: string;
  ratio: number;
  target: number;
}

/** WCAG 1.4.3 for text, 1.4.11 for the edges and graphics a control needs. */
const TEXT_MINIMUM = 4.5;
const GRAPHIC_MINIMUM = 3;
export class UnsupportedColourError extends Error {
  constructor(value: string) {
    super(`cannot measure the colour "${value}": only oklch() and hex values are supported`);
    this.name = "UnsupportedColourError";
  }
}

export class UnknownTokenError extends Error {
  constructor(token: string) {
    super(`the stylesheet does not define --${token}`);
    this.name = "UnknownTokenError";
  }
}

export function measureContrast(tokens: ThemeTokens): ContrastPair[] {
  return MODES.flatMap((mode) =>
    PAIRS.map(({ name, front, back, target }) => ({
      mode,
      name,
      target,
      ratio: contrastRatio(front(tokens[mode]), back(tokens[mode])),
    })),
  );
}

export const isBelowTarget = (pair: ContrastPair) => pair.ratio < pair.target;

/** Reads the light values from `:root` and the dark overrides from `.dark` and `[data-theme="dark"]`. */
export function parseThemeTokens(css: string): ThemeTokens {
  const light: Palette = {};
  const darkOverrides: Palette = {};
  for (const [, selectorText, body] of css.replace(COMMENT, "").matchAll(RULE)) {
    const selectors = selectorText
      .split(";")
      .at(-1)!
      .split(",")
      .map((selector) => selector.trim());
    const target = selectors.includes(":root")
      ? light
      : selectors.some((selector) => DARK_SELECTORS.includes(selector))
        ? darkOverrides
        : undefined;
    if (!target) continue;
    for (const [, name, value] of body.matchAll(CUSTOM_PROPERTY)) target[name] = value.trim();
  }
  return { light, dark: { ...light, ...darkOverrides } };
}

const COMMENT = /\/\*[\s\S]*?\*\//g;
const RULE = /([^{}]+)\{([^{}]*)\}/g;
const CUSTOM_PROPERTY = /--([\w-]+)\s*:\s*([^;]+);/g;
const DARK_SELECTORS = [".dark", '[data-theme="dark"]'];

// ── The pairs ───────────────────────────────────────────────────────────────

/** Linear-light sRGB, each channel from 0 to 1. */
type Rgb = [number, number, number];
type Surface = (palette: Palette) => Rgb;

interface Pair {
  name: string;
  front: Surface;
  back: Surface;
  target: number;
}

/** A token as it appears on the card: a translucent token is seen over the card background. */
const token =
  (name: string): Surface =>
  (palette) =>
    layer(parseColour(read(palette, name)), opaque(palette, "background"));

/** The pairs a generated component can draw. The prompt names the ones below target. */
const PAIRS: Pair[] = [
  pair("Text on the card", "foreground", "background", TEXT_MINIMUM),
  pair("Secondary text on the card", "muted-foreground", "background", TEXT_MINIMUM),
  pair("Text on a field, pill or notice", "foreground", "muted", TEXT_MINIMUM),
  pair("Secondary text on a field", "muted-foreground", "muted", TEXT_MINIMUM),
  pair("Primary button label", "primary-foreground", "primary", TEXT_MINIMUM),
  pair("Chart, progress and slider fill", "primary", "background", GRAPHIC_MINIMUM),
  pair("Field edge against the card", "muted", "background", GRAPHIC_MINIMUM),
  pair("Outlined control edge against the card", "border", "background", GRAPHIC_MINIMUM),
  pair("Focus ring against the card", "ring", "background", GRAPHIC_MINIMUM),
];

function pair(name: string, front: string, back: string, target: number): Pair {
  return { name, front: token(front), back: token(back), target };
}

// ── Colour maths ────────────────────────────────────────────────────────────

interface Colour {
  rgb: Rgb;
  alpha: number;
}

function read(palette: Palette, name: string): string {
  const value = palette[name];
  if (value === undefined) throw new UnknownTokenError(name);
  return value;
}

const opaque = (palette: Palette, name: string) => parseColour(read(palette, name)).rgb;

const OKLCH = /^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+)(%?))?\s*\)$/;
const HEX = /^#([0-9a-f]{6})$/i;

function parseColour(value: string): Colour {
  const oklch = OKLCH.exec(value);
  if (oklch) {
    const [, lightness, chroma, hue, alpha, percent] = oklch;
    return {
      rgb: oklchToLinearRgb(+lightness, +chroma, +hue),
      alpha: alpha === undefined ? 1 : +alpha / (percent ? 100 : 1),
    };
  }
  const hex = HEX.exec(value);
  if (!hex) throw new UnsupportedColourError(value);
  const channels = [0, 2, 4].map((i) => toLinear(parseInt(hex[1].slice(i, i + 2), 16) / 255));
  return { rgb: channels as Rgb, alpha: 1 };
}

/** OKLCH to linear sRGB, with the matrices from the OKLab definition. Out-of-gamut values are clipped. */
function oklchToLinearRgb(lightness: number, chroma: number, hue: number): Rgb {
  const radians = (hue * Math.PI) / 180;
  const a = chroma * Math.cos(radians);
  const b = chroma * Math.sin(radians);
  const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const clip = (channel: number) => Math.min(1, Math.max(0, channel));
  return [
    clip(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    clip(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    clip(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  ];
}

const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toGamma = (c: number) => (c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055);

/** Browsers blend a translucent colour over its backdrop on gamma-encoded values. */
const layer = (front: Colour, back: Rgb): Rgb =>
  front.rgb.map((channel, i) =>
    toLinear(toGamma(channel) * front.alpha + toGamma(back[i]) * (1 - front.alpha)),
  ) as Rgb;

const luminance = ([r, g, b]: Rgb) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

function contrastRatio(a: Rgb, b: Rgb): number {
  const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (lighter + 0.05) / (darker + 0.05);
}
