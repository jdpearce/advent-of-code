export enum Direction {
  North,
  East,
  South,
  West,
}

export interface Tile {
  id: number;
  edges: string[];
  matches?: Tile[];
}

/**
 * Parse the tiles and only keep track of the edges
 *
 * @param input
 */
export function parseTiles(input: string): Tile[] {
  const tiles: Tile[] = [];
  const tileInput = input.split('\n\n');

  for (const tileStr of tileInput) {
    const lines = tileStr.split('\n');
    const id = Number(lines[0].match(/\d+/)[0]);
    const last = lines[0].length - 1;

    const east: string[] = [];
    const west: string[] = [];
    for (let i = 1; i < lines.length; i++) {
      east.push(lines[i][last]);
      west.push(lines[i][0]);
    }

    tiles.push({
      id,
      edges: [lines[1], east.join(''), lines[lines.length - 1], west.join('')],
    });
  }

  return tiles;
}

/**
 * For each tile find the tiles that share an edge.
 *
 * Tiles can be flipped and rotated, so edges can match forwards or backwards.
 *
 * @param tiles
 */
export function populateMatches(tiles: Tile[]): Tile[] {
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    tile.matches = [];
    for (let j = 0; j < tiles.length; j++) {
      if (i === j) {
        continue;
      }

      const possible = [...tiles[j].edges, ...tiles[j].edges.map((x) => reverse(x))];
      if (possible.some((x) => tile.edges.includes(x))) {
        tile.matches.push(tiles[j]);
      }
    }
  }
  return tiles;
}

export function reverse(s: string): string {
  return s.split('').reverse().join('');
}
