import {
  Contradiction,
  DOWN,
  LEFT,
  RIGHT,
  UP,
  buildCompat,
  continues,
  mix,
  pick,
  piecesFit,
  rngFrom,
  shuffled,
  solve,
  splitIntoPieces,
  type Piece,
  type Rng,
  type Shape,
} from "../../../shared/lib/wfc";
import {
  FAMILIES,
  NETWORKS,
  TOKENS,
  money,
  TWO_DECIMALS,
  shortAddress,
  whole,
  type Family,
  type FamilyId,
} from "./families";
import {
  CLOSERS,
  OPENER,
  PARTS,
  PART_NAMES,
  type Detail,
  type Part,
  type PartData,
  type PartName,
} from "./parts";

/** A page is fully decided by its seed and its width in columns. */
export interface PageKey {
  seed: number;
  columns: number;
}

/** Where a card sits on the page grid, in cells. Rows count from the top of the page. */
export interface CardSlot {
  family: FamilyId;
  col: number;
  row: number;
  w: number;
  h: number;
}

export interface GeneratedComponent extends CardSlot {
  id: string;
  /** PascalCase name for the React component, as in SwapCard. */
  name: string;
  /** Top to bottom. Together the parts fill the card exactly. */
  parts: Part[];
}

/** A band of the endless page. The next chunk continues from the last row of this one. */
export interface Chunk {
  index: number;
  /** The card piece in each cell, row by row. */
  cells: number[];
  /** The cards whose top left corner is in this chunk. */
  components: GeneratedComponent[];
}

export const CHUNK_ROWS = 6;
/** One grid cell of card height holds this many rows of parts. */
export const PART_ROWS_PER_CELL = 3;
export const MIN_COLUMNS = 2;
export const MAX_COLUMNS = 8;
/** Cards wider than this many cells get the wide layout width in their prompt. */
export const NARROW_CARD_WIDTH = 2;
const MAX_ATTEMPTS = 100;

export class LayoutNotFoundError extends Error {
  constructor(chunkIndex: number) {
    super(`chunk ${chunkIndex}: no card layout found in ${MAX_ATTEMPTS} attempts`);
    this.name = "LayoutNotFoundError";
  }
}

export class MissingFamilyCopyError extends Error {
  constructor(key: keyof Family) {
    super(`a part needs "${key}" copy that its family does not define`);
    this.name = "MissingFamilyCopyError";
  }
}

export function generateChunk(page: PageKey, previous?: Chunk): Chunk {
  const index = previous ? previous.index + 1 : 0;
  const cells = layOutCards(page, index, previous?.cells.slice(-page.columns));
  const components = cells.flatMap((pieceIndex, cell) => {
    const piece = CARD_PIECES[pieceIndex];
    if (piece.dx !== 0 || piece.dy !== 0) return [];
    const col = cell % page.columns;
    const row = index * CHUNK_ROWS + Math.floor(cell / page.columns);
    return [composeComponent({ family: piece.family, col, row, w: piece.w, h: piece.h }, page)];
  });
  return { index, cells, components };
}

// ── Outer layout: which card goes where on the page ─────────────────────────

interface CardShape extends Shape {
  family: FamilyId;
}

const CARD_SIZES: readonly (readonly [family: FamilyId, w: number, h: number])[] = [
  ["trade", 2, 3],
  ["trade", 2, 4],
  ["trade", 3, 3],
  ["earn", 2, 3],
  ["earn", 2, 4],
  ["earn", 3, 3],
  ["wallet", 2, 2],
  ["wallet", 2, 3],
  ["wallet", 3, 2],
  ["nft", 2, 3],
  ["nft", 2, 4],
  ["nft", 3, 4],
  ["data", 2, 2],
  ["data", 3, 2],
  ["data", 3, 3],
];
const CARD_PIECES = splitIntoPieces<CardShape>(
  CARD_SIZES.map(([family, w, h]) => ({ family, w, h, weight: 2 })),
);
/** Rule: two cards of the same family never touch. */
const CARD_COMPAT = buildCompat(CARD_PIECES, (a, b, direction) =>
  piecesFit(a, b, direction, (one, other) => one.family !== other.family),
);

/** Dead ends are retried with a new seed derived from the attempt, so the result stays reproducible. */
function layOutCards({ seed, columns }: PageKey, index: number, rowAbove?: number[]): number[] {
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    try {
      return solve({
        tiles: CARD_PIECES,
        compat: CARD_COMPAT,
        columns,
        rows: CHUNK_ROWS,
        rng: rngFrom(mix(seed, columns, index, attempt)),
        constrain(x, y, ban) {
          CARD_PIECES.forEach((piece, i) => {
            if (crossesWall(piece, x, columns) || (y === 0 && clashesAbove(i, rowAbove?.[x]))) {
              ban(i);
            }
          });
        },
      });
    } catch (error) {
      if (!(error instanceof Contradiction)) throw error;
    }
  }
  throw new LayoutNotFoundError(index);
}

const crossesWall = (piece: Piece<CardShape>, x: number, columns: number) =>
  (x === 0 && continues(piece, LEFT)) || (x === columns - 1 && continues(piece, RIGHT));

/** The first row of a chunk must fit the last row of the chunk above, or start fresh on a new page. */
const clashesAbove = (pieceIndex: number, above?: number) =>
  above === undefined
    ? continues(CARD_PIECES[pieceIndex], UP)
    : !CARD_COMPAT[DOWN][above][pieceIndex];

// ── Inner layout: which parts a component is made of ────────────────────────

interface PartShape extends Shape {
  part: PartName;
}

const PART_PIECES = splitIntoPieces<PartShape>(
  PART_NAMES.map((part) => ({ part, w: 1, h: PARTS[part].rows, weight: PARTS[part].weight })),
);
const mayFollow = (above: PartName, below: PartName) => PARTS[above].next.includes(below);
const PART_COMPAT = buildCompat(PART_PIECES, (a, b, direction) =>
  piecesFit(a, b, direction, () => {
    if (direction === DOWN) return mayFollow(a.part, b.part);
    if (direction === UP) return mayFollow(b.part, a.part);
    return true;
  }),
);

/** The parts, top to bottom, of one component that is exactly `rows` rows tall. */
function choosePartNames(family: FamilyId, rows: number, rng: Rng): PartName[] {
  const cells = solve({
    tiles: PART_PIECES,
    compat: PART_COMPAT,
    columns: 1,
    rows,
    rng,
    constrain(_x, y, ban) {
      PART_PIECES.forEach(({ part }, i) => {
        const wrongFamily = !PARTS[part].families.includes(family);
        const wrongEnd = (part === OPENER) !== (y === 0) || (y === rows - 1 && !CLOSERS.has(part));
        if (wrongFamily || wrongEnd) ban(i);
      });
    },
  });
  return cells
    .map((pieceIndex) => PART_PIECES[pieceIndex])
    .filter((piece) => piece.dy === 0)
    .map((piece) => piece.part);
}

// ── Sample content for each part ────────────────────────────────────────────

function composeComponent(slot: CardSlot, page: PageKey): GeneratedComponent {
  const rng = rngFrom(mix(page.seed, page.columns, slot.row, slot.col));
  const copy = sampleCopy(rng, slot.family);
  const names = choosePartNames(slot.family, slot.h * PART_ROWS_PER_CELL, rng);
  return {
    ...slot,
    id: `${slot.row}-${slot.col}`,
    name: componentName(copy.title, copy.family.suffix),
    parts: names.map((name) => ({ name, ...MAKERS[name](copy) }) as Part),
  };
}

const componentName = (title: string, suffix: string) =>
  title.replace(/(^| )(\w)/g, (_match, _space, letter: string) => letter.toUpperCase()) + suffix;

/** What the part makers draw on, so the parts of one component agree with each other. */
interface SampleCopy {
  rng: Rng;
  familyId: FamilyId;
  family: Family;
  title: string;
  action: string;
  network: string;
  /** The first is the token paid, the second the token received. Lists use them in order. */
  tokens: string[];
  /** Rows in the list part, once one has been made. The footer counts them. */
  listed: number;
  nextStat(): Detail;
}

function sampleCopy(rng: Rng, familyId: FamilyId): SampleCopy {
  const family: Family = FAMILIES[familyId];
  const [title, action] = pick(rng, family.verbs);
  const tokens = shuffled(rng, TOKENS);
  const stats = shuffled(rng, family.stats);
  let statsUsed = 0;
  return {
    rng,
    familyId,
    family,
    title,
    action,
    network: pick(rng, NETWORKS),
    tokens,
    listed: 0,
    nextStat() {
      const [label, value] = stats[statsUsed++ % stats.length];
      return { label, value: value(rng, tokens) };
    },
  };
}

const CHART_POINTS = 24;
const GALLERY_SIZE = 2;

const details = (copy: SampleCopy, count: number) => ({
  rows: Array.from({ length: count }, () => copy.nextStat()),
});

function list(copy: SampleCopy, count: number) {
  copy.listed = count;
  return {
    rows: Array.from({ length: count }, (_, i) => copy.family.row(copy.rng, copy.tokens, i)),
  };
}

function familyCopy<K extends keyof Family>(family: Family, key: K): NonNullable<Family[K]> {
  const value = family[key];
  if (value == null) throw new MissingFamilyCopyError(key);
  return value;
}

const MAKERS: { [K in PartName]: (copy: SampleCopy) => PartData[K] } = {
  header: ({ familyId, title, network }) => ({ family: familyId, title, network }),
  tabs: ({ family }) => ({ options: family.tabs }),
  search: ({ family }) => ({ placeholder: familyCopy(family, "search") }),
  chart: ({ rng }) => ({
    prices: Array.from(
      { length: CHART_POINTS },
      (_, i) => +(50 + 30 * Math.sin(i / 3 + rng() * 2) + rng() * 14).toFixed(1),
    ),
    price: `$${money(rng, 4000)}`,
    change: `${rng() < 0.5 ? "+" : "-"}${(rng() * 9).toFixed(2)}%`,
  }),
  artwork: ({ rng, title }) => ({
    collection: title,
    tokenId: `#${whole(rng, 9999)}`,
    angle: Math.floor(rng() * 360),
  }),
  gallery: ({ rng }) => ({
    items: Array.from({ length: GALLERY_SIZE }, () => ({
      name: `Noun #${whole(rng, 999)}`,
      price: `${money(rng, 50)} ETH`,
      angle: Math.floor(rng() * 360),
    })),
  }),
  list2: (copy) => list(copy, 2),
  list3: (copy) => list(copy, 3),
  list4: (copy) => list(copy, 4),
  recipient: ({ rng }) => ({ address: shortAddress(rng) }),
  amount: ({ rng, tokens }) => {
    // The sample amount stays within the balance, so a tried component opens without an error.
    const balance = 1 + rng() * 60;
    return {
      value: money(rng, balance),
      symbol: tokens[0],
      balance: balance.toLocaleString("en", TWO_DECIMALS),
      tokens: tokens.slice(0, 4),
    };
  },
  flip: () => ({}),
  result: ({ rng, tokens }) => ({ value: money(rng, 9000), symbol: tokens[1] }),
  quickAmounts: () => ({}),
  slider: ({ rng, family }) => {
    const { label, prop, max, unit } = familyCopy(family, "slider");
    const percent = Math.round(10 + rng() * 80);
    return { label, prop, max, unit, percent, value: +((max * percent) / 100).toFixed(1) };
  },
  statGrid: (copy) => ({ stats: details(copy, 3).rows }),
  progress: ({ rng, family }) => ({
    label: pick(rng, familyCopy(family, "progress")),
    percent: Math.round(5 + rng() * 90),
  }),
  details1: (copy) => details(copy, 1),
  details2: (copy) => details(copy, 2),
  details3: (copy) => details(copy, 3),
  signers: ({ rng }) => {
    const total = 3 + Math.floor(rng() * 3);
    const signed = 1 + Math.floor(rng() * (total - 1));
    return {
      signers: Array.from({ length: total }, (_, i) => ({
        address: shortAddress(rng),
        signed: i < signed,
      })),
    };
  },
  notice: ({ rng, family }) => ({ text: pick(rng, familyCopy(family, "notices")) }),
  button: ({ action }) => ({ label: action }),
  footer: ({ rng, family, listed }) => ({
    text: listed ? `${listed} ${family.items}` : pick(rng, family.footnotes),
  }),
};
