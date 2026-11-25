/**
 * Wave function collapse on a grid, with the seeded randomness that makes a result reproducible.
 * Every cell starts able to hold any tile. The solver bans what the rules forbid, then repeatedly
 * decides the most constrained cell and spreads the consequences to its neighbours.
 */

// ── Seeded randomness: same seed, same result ───────────────────────────────

export type Rng = () => number;

/** Folds several numbers into one 32-bit seed. */
export function mix(...numbers: number[]): number {
  let hash = 0x811c9dc5;
  for (const n of numbers) {
    hash = Math.imul(hash ^ n, 0x01000193);
    hash ^= hash >>> 13;
    hash = Math.imul(hash, 0x5bd1e995);
    hash ^= hash >>> 15;
  }
  return hash >>> 0;
}

/** Mulberry32: a small generator that gives the same sequence in every JavaScript engine. */
export function rngFrom(seed: number): Rng {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const pick = <T>(rng: Rng, list: readonly T[]): T => list[(rng() * list.length) | 0];

/** Fisher-Yates. A sort with a random comparator gives a different order in each engine. */
export function shuffled<T>(rng: Rng, list: readonly T[]): T[] {
  const result = [...list];
  for (let i = result.length - 1; i > 0; i--) {
    const j = (rng() * (i + 1)) | 0;
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// ── The solver ──────────────────────────────────────────────────────────────

/** A cell ran out of tiles: the choices made so far cannot be completed. */
export class Contradiction extends Error {
  constructor(cell: number) {
    super(`cell ${cell} has no tiles left`);
    this.name = "Contradiction";
  }
}

export const UP = 0;
export const RIGHT = 1;
export const DOWN = 2;
export const LEFT = 3;
export type Direction = typeof UP | typeof RIGHT | typeof DOWN | typeof LEFT;

const DIRECTIONS: readonly Direction[] = [UP, RIGHT, DOWN, LEFT];
const DX = [0, 1, 0, -1];
const DY = [-1, 0, 1, 0];
const opposite = (d: Direction) => ((d + 2) % 4) as Direction;

export interface Tile {
  /** How likely the tile is to be chosen when several fit. */
  weight: number;
}

/** `compat[d][a][b]` is 1 when tile b may sit in direction d from tile a. */
export type Compat = Uint8Array[][];

export const buildCompat = <T>(
  tiles: readonly T[],
  fits: (a: T, b: T, direction: Direction) => boolean,
): Compat =>
  DIRECTIONS.map((d) => tiles.map((a) => Uint8Array.from(tiles, (b) => Number(fits(a, b, d)))));

export interface Puzzle<T extends Tile> {
  tiles: readonly T[];
  compat: Compat;
  columns: number;
  rows: number;
  rng: Rng;
  /** Rules about position (edges, first row). Called once per cell before solving. */
  constrain?: (x: number, y: number, ban: (tile: number) => void) => void;
}

/** Returns the tile index chosen for each cell, row by row. Throws Contradiction on a dead end. */
export function solve<T extends Tile>(puzzle: Puzzle<T>): number[] {
  const wave = new Wave(puzzle);
  wave.applyPositionRules();
  wave.propagate();
  for (let cell = wave.mostConstrainedCell(); cell >= 0; cell = wave.mostConstrainedCell()) {
    wave.decide(cell);
    wave.propagate();
  }
  return wave.chosenTiles();
}

class Wave<T extends Tile> {
  private readonly puzzle: Puzzle<T>;
  private readonly cellCount: number;
  private readonly tileCount: number;
  /** `options[cell][tile]` is 1 while the tile is still possible in the cell. */
  private readonly options: Uint8Array[];
  private readonly optionsLeft: Uint16Array;
  private readonly queued: Uint8Array;
  private readonly queue: number[] = [];

  constructor(puzzle: Puzzle<T>) {
    this.puzzle = puzzle;
    this.cellCount = puzzle.columns * puzzle.rows;
    this.tileCount = puzzle.tiles.length;
    this.options = Array.from({ length: this.cellCount }, () =>
      new Uint8Array(this.tileCount).fill(1),
    );
    this.optionsLeft = new Uint16Array(this.cellCount).fill(this.tileCount);
    this.queued = new Uint8Array(this.cellCount);
  }

  applyPositionRules(): void {
    const { constrain, columns } = this.puzzle;
    for (let cell = 0; cell < this.cellCount; cell++) {
      constrain?.(cell % columns, (cell / columns) | 0, (tile) => this.ban(cell, tile));
      this.enqueue(cell);
    }
  }

  /** Removes from every neighbour the tiles that no remaining tile of a changed cell supports. */
  propagate(): void {
    const { columns, rows } = this.puzzle;
    while (this.queue.length) {
      const cell = this.queue.pop()!;
      const x = cell % columns;
      const y = (cell - x) / columns;
      this.queued[cell] = 0;
      for (const d of DIRECTIONS) {
        const nx = x + DX[d];
        const ny = y + DY[d];
        if (nx < 0 || nx >= columns || ny < 0 || ny >= rows) continue;
        this.banUnsupported(cell, ny * columns + nx, d);
      }
    }
  }

  /** The undecided cell with the fewest options, ties broken at random. -1 when all are decided. */
  mostConstrainedCell(): number {
    let lowest = -1;
    let lowestScore = Infinity;
    for (let cell = 0; cell < this.cellCount; cell++) {
      if (this.optionsLeft[cell] < 2) continue;
      const score = this.optionsLeft[cell] + this.puzzle.rng();
      if (score < lowestScore) {
        lowestScore = score;
        lowest = cell;
      }
    }
    return lowest;
  }

  /** Picks one of the cell's remaining tiles, by weight, and bans the rest. */
  decide(cell: number): void {
    const { tiles, rng } = this.puzzle;
    const possible = this.options[cell];
    let total = 0;
    for (let tile = 0; tile < this.tileCount; tile++)
      if (possible[tile]) total += tiles[tile].weight;

    let roll = rng() * total;
    let chosen = -1;
    for (let tile = 0; tile < this.tileCount; tile++) {
      if (!possible[tile]) continue;
      chosen = tile;
      roll -= tiles[tile].weight;
      if (roll <= 0) break;
    }
    for (let tile = 0; tile < this.tileCount; tile++) if (tile !== chosen) this.ban(cell, tile);
  }

  chosenTiles(): number[] {
    return this.options.map((possible) => possible.indexOf(1));
  }

  private banUnsupported(cell: number, neighbour: number, direction: Direction): void {
    const allowed = this.puzzle.compat[direction];
    for (let b = 0; b < this.tileCount; b++) {
      if (!this.options[neighbour][b]) continue;
      let supported = 0;
      for (let a = 0; a < this.tileCount && !supported; a++) {
        supported = this.options[cell][a] & allowed[a][b];
      }
      if (!supported) this.ban(neighbour, b);
    }
  }

  private ban(cell: number, tile: number): void {
    if (!this.options[cell][tile]) return;
    this.options[cell][tile] = 0;
    if (--this.optionsLeft[cell] === 0) throw new Contradiction(cell);
    this.enqueue(cell);
  }

  private enqueue(cell: number): void {
    if (this.queued[cell]) return;
    this.queued[cell] = 1;
    this.queue.push(cell);
  }
}

// ── Rectangles bigger than one cell ─────────────────────────────────────────

export interface Shape extends Tile {
  /** Width and height in cells. */
  w: number;
  h: number;
}

/** One cell of a shape. Pieces fit only their own siblings, so the solver places a shape whole. */
export type Piece<S extends Shape> = S & { dx: number; dy: number; shape: number };

export const splitIntoPieces = <S extends Shape>(shapes: readonly S[]): Piece<S>[] =>
  shapes.flatMap((shape, index) => {
    const pieces: Piece<S>[] = [];
    for (let dy = 0; dy < shape.h; dy++) {
      for (let dx = 0; dx < shape.w; dx++) pieces.push({ ...shape, dx, dy, shape: index });
    }
    return pieces;
  });

/** Does this piece continue into the same shape in the given direction? */
export function continues(piece: Piece<Shape>, direction: Direction): boolean {
  if (direction === UP) return piece.dy > 0;
  if (direction === RIGHT) return piece.dx < piece.w - 1;
  if (direction === DOWN) return piece.dy < piece.h - 1;
  return piece.dx > 0;
}

/**
 * May piece b sit in the given direction from piece a? Inside a shape only the right sibling fits.
 * `mayTouch` decides for two different shapes meeting at their outer edges.
 */
export function piecesFit<S extends Shape>(
  a: Piece<S>,
  b: Piece<S>,
  direction: Direction,
  mayTouch: (a: Piece<S>, b: Piece<S>, direction: Direction) => boolean,
): boolean {
  const aContinues = continues(a, direction);
  const bContinues = continues(b, opposite(direction));
  if (!aContinues && !bContinues) return mayTouch(a, b, direction);
  return (
    aContinues &&
    bContinues &&
    a.shape === b.shape &&
    b.dx === a.dx + DX[direction] &&
    b.dy === a.dy + DY[direction]
  );
}
