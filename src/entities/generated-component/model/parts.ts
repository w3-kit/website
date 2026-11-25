import { FAMILY_IDS, type Family, type FamilyId, type ListRow } from "./families";

export interface Detail {
  label: string;
  value: string;
}

/** What each part shows. The views draw it and the prompt describes it, from the same data. */
export interface PartData {
  header: { family: FamilyId; title: string; network: string };
  tabs: { options: readonly string[] };
  search: { placeholder: string };
  chart: { price: string; change: string; prices: number[] };
  artwork: { collection: string; tokenId: string; angle: number };
  gallery: { items: { name: string; price: string; angle: number }[] };
  list2: { rows: ListRow[] };
  list3: { rows: ListRow[] };
  list4: { rows: ListRow[] };
  recipient: { address: string };
  amount: { value: string; symbol: string; balance: string; tokens: string[] };
  flip: object;
  result: { value: string; symbol: string };
  quickAmounts: object;
  slider: {
    label: string;
    prop: string;
    value: number;
    max: number;
    step: number;
    unit: string;
    percent: number;
  };
  statGrid: { stats: Detail[] };
  progress: { label: string; percent: number };
  details1: { rows: Detail[] };
  details2: { rows: Detail[] };
  details3: { rows: Detail[] };
  signers: { signers: { address: string; signed: boolean }[] };
  notice: { text: string };
  button: { label: string };
  footer: { text: string };
}

export type PartName = keyof PartData;
export type Part = { [K in PartName]: { name: K } & PartData[K] }[PartName];
export type PartOf<K extends PartName> = Extract<Part, { name: K }>;

interface PartRule {
  /** Rows the part takes inside a card. */
  rows: number;
  weight: number;
  families: readonly FamilyId[];
  /** Parts allowed directly below this one. */
  next: readonly PartName[];
  /** Copy the part reads from its family, so every listed family must define it. */
  needs?: keyof Family;
}

const LISTS = ["list2", "list3", "list4"] as const;
/** One to three rows of label and value. */
const DETAILS = ["details1", "details2", "details3"] as const;

/**
 * The design system for structure: which part may sit below which.
 * Listed top to bottom, and every `next` points further down the list, so no part appears twice.
 */
export const PARTS: Record<PartName, PartRule> = {
  header: {
    rows: 1,
    weight: 1,
    families: FAMILY_IDS,
    next: [
      "tabs",
      "search",
      "chart",
      "artwork",
      "gallery",
      ...LISTS,
      "recipient",
      "amount",
      "statGrid",
      "progress",
      ...DETAILS,
      "signers",
    ],
  },
  tabs: {
    rows: 1,
    weight: 1.2,
    families: FAMILY_IDS,
    next: ["search", "chart", "gallery", ...LISTS, "recipient", "amount", "statGrid"],
  },
  search: {
    rows: 1,
    weight: 1,
    families: ["wallet", "nft", "data"],
    next: ["gallery", ...LISTS],
    needs: "search",
  },
  chart: {
    rows: 3,
    weight: 2,
    families: ["data", "trade"],
    next: [...LISTS, "amount", "statGrid", ...DETAILS, "button", "footer"],
  },
  artwork: {
    rows: 3,
    weight: 3,
    families: ["nft"],
    next: ["amount", "statGrid", "progress", ...DETAILS, "button"],
  },
  gallery: { rows: 3, weight: 2, families: ["nft"], next: ["progress", "button", "footer"] },
  list2: listRule(2, 2),
  list3: listRule(3, 2.5),
  list4: listRule(4, 2.5),
  recipient: {
    rows: 2,
    weight: 2,
    families: ["wallet"],
    // Quick amounts fill an amount field, so they only follow one.
    next: ["amount", ...DETAILS, "notice", "button"],
  },
  amount: {
    rows: 2,
    weight: 2.5,
    families: ["trade", "earn", "wallet", "nft"],
    next: ["flip", "quickAmounts", "slider", "statGrid", ...DETAILS, "notice", "button"],
  },
  flip: { rows: 1, weight: 2, families: ["trade"], next: ["result"] },
  result: {
    rows: 2,
    weight: 2,
    families: ["trade"],
    next: ["quickAmounts", "slider", ...DETAILS, "notice", "button"],
  },
  quickAmounts: {
    rows: 1,
    weight: 1,
    families: ["earn", "trade", "wallet"],
    next: ["slider", ...DETAILS, "notice", "button"],
  },
  slider: {
    rows: 1,
    weight: 1.5,
    families: ["earn", "trade"],
    next: ["statGrid", "progress", ...DETAILS, "notice", "button"],
    needs: "slider",
  },
  statGrid: {
    rows: 2,
    weight: 1.5,
    families: ["data", "earn", "nft", "trade"],
    next: ["progress", ...DETAILS, "button", "footer"],
  },
  progress: {
    rows: 1,
    weight: 1,
    families: ["earn", "nft", "data"],
    next: [...DETAILS, "notice", "button", "footer"],
    needs: "progress",
  },
  details1: detailRule(1, 1),
  details2: detailRule(2, 1.5),
  details3: detailRule(3, 1.5),
  signers: { rows: 1, weight: 1, families: ["wallet"], next: ["notice", "button", "footer"] },
  notice: {
    rows: 1,
    weight: 0.8,
    families: ["trade", "earn", "wallet", "nft"],
    next: ["button"],
    needs: "notices",
  },
  button: { rows: 1, weight: 1.5, families: FAMILY_IDS, next: ["footer"] },
  footer: { rows: 1, weight: 1.2, families: FAMILY_IDS, next: [] },
};

function listRule(rows: number, weight: number): PartRule {
  return { rows, weight, families: FAMILY_IDS, next: ["progress", "signers", "button", "footer"] };
}

function detailRule(rows: number, weight: number): PartRule {
  return { rows, weight, families: FAMILY_IDS, next: ["signers", "notice", "button", "footer"] };
}

export const PART_NAMES = Object.keys(PARTS) as PartName[];
/** Every component starts with this part. */
export const OPENER: PartName = "header";
/** Every component ends with one of these. */
export const CLOSERS: ReadonlySet<PartName> = new Set(["button", "footer"]);
