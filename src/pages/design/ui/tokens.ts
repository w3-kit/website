/** What the design page documents. Values are read from the live CSS, so this lists names and roles only. */

export const COLOURS = [
  {
    name: "Ground",
    token: "--w3-ground",
    share: 55,
    use: "The page. Half of every screen or more.",
  },
  { name: "Ink", token: "--w3-ink", share: 25, use: "Text, the footer field, dark tiles." },
  {
    name: "Tone",
    token: "--w3-tone",
    share: 10,
    use: "One step off the ground: panels, menus, fields.",
  },
  {
    name: "Tone 2",
    token: "--w3-tone-2",
    share: 4,
    use: "The second step: hover, alternate rows.",
  },
  { name: "Soft ink", token: "--w3-ink-soft", share: 3, use: "Secondary notes and captions only." },
  {
    name: "Purple",
    token: "--w3-accent",
    share: 3,
    use: "The logo and the one action on a screen.",
  },
] as const;

export const TYPE_STEPS = [
  {
    token: "text-w3-display",
    range: "44–96 px",
    sample: "Web3 components",
  },
  {
    token: "text-w3-title",
    range: "36–72 px",
    sample: "Every address typed.",
  },
  {
    token: "text-w3-statement",
    range: "24–32 px",
    sample: "Every state of a transaction, handled.",
  },
  {
    token: "text-w3-body",
    range: "18 px",
    sample: "Swap 0.5 ETH for 958.75 USDC on Base, confirmed in block 21,904,113.",
  },
  {
    token: "text-w3-small",
    range: "15 px",
    sample: "Navigation, labels and captions.",
  },
] as const;

export const SPACING = [8, 16, 24, 32, 48, 64, 96, 160] as const;

export const MOTION = [
  { name: "Rise", value: "700 ms, 24 px", use: "Each part of a section entering, 80 ms apart." },
  { name: "Drop", value: "200 ms, 8 px", use: "Header panels opening." },
  { name: "Press", value: "160 ms, 97 %", use: "Every button when pressed." },
  { name: "Shutter", value: "1100 ms", use: "Once per page, on the hero stage." },
] as const;

export const RULES = [
  {
    title: "Purple means act",
    body: "It sits on the logo and the one action. Nothing decorative is purple.",
  },
  {
    title: "No lines, no shadows",
    body: "Surfaces step in tone. Only floating menus cast a shadow.",
  },
  {
    title: "Two lines at most",
    body: "Every headline, at every width. Cut words before shrinking type.",
  },
  {
    title: "Real data only",
    body: "Numbers, addresses and counts come from the registry and the build.",
  },
] as const;
