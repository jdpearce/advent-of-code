import { Direction, parseTiles, populateMatches, reverse, Tile } from '../part-1/lib';

export function rotateContent(content: string[]): string[] {
  const grid = content.map((line) => line.split(''));

  const N = grid.length;

  // Traverse each cycle
  for (let i = 0; i < N / 2; i++) {
    for (let j = i; j < N - i - 1; j++) {
      // Swap elements of each cycle
      // in clockwise direction
      const temp = grid[i][j];
      grid[i][j] = grid[N - 1 - j][i];
      grid[N - 1 - j][i] = grid[N - 1 - i][N - 1 - j];
      grid[N - 1 - i][N - 1 - j] = grid[j][N - 1 - i];
      grid[j][N - 1 - i] = temp;
    }
  }

  return grid.map((row) => row.join(''));
}

export function flipContent(content: string[]): string[] {
  const grid = content.map((line) => line.split(''));

  const N = grid.length;

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N / 2; x++) {
      const temp = grid[y][x];
      grid[y][x] = grid[y][N - x];
      grid[y][N - x] = temp;
    }
  }

  return grid.map((row) => row.join(''));
}

export function flipTile(tile: Tile): Tile {
  return {
    ...tile,
    content: flipContent(tile.content),
    edges: [
      reverse(tile.edges[0]),
      reverse(tile.edges[3]),
      reverse(tile.edges[2]),
      reverse(tile.edges[1]),
    ],
  };
}

export function rotateTile(tile: Tile): Tile {
  return {
    ...tile,
    content: rotateContent(tile.content),
    edges: [tile.edges[3], ...tile.edges.slice(0, 3)],
  };
}

export function findMatchingTile(tiles: Tile[], edge: string): Tile {
  for (const tile of tiles) {
    if (tile.edges.includes(edge)) {
      return tile;
    }
  }

  throw new Error('no tile found');
}

export function drawGrid(grid: Map<number, Tile[]>): string {
  const image: string[] = [];
  for (let i = 0; i < grid.size; i++) {
    if (!grid.has(i)) {
      break;
    }
    const row = grid.get(i);
    const N = row[0].content.length;
    for (let j = 0; j < N; j++) {
      const line: string[] = [];
      for (const tile of row) {
        line.push(...tile.content[j]);
      }
      image[i * N + j] = line.join('');
    }
  }
  return image.join('\n');
}

/**
 * Gets the tile in the correct orientation matching the edge of the given tile.
 * Assume matches has already been populated.
 *
 * @param tile
 * @param direction
 */
export function getTileOnEdge(tile: Tile, direction: Direction): Tile {
  const edge = tile.edges[direction];

  let match = tile.matches.find((x) =>
    [...x.edges, ...x.edges.map((x) => reverse(x))].includes(edge)
  );

  if (!match) {
    return null;
  }

  // Since the edges are read out clockwise,
  // (invariant under rotation)
  // a matching edge has to be in reverse
  if (!match.edges.map(reverse).includes(edge)) {
    match = flipTile(match);
  }

  const target = reverse(edge);
  switch (direction) {
    case Direction.North:
    case Direction.West:
      throw new Error('not implemented');

    case Direction.East:
      while (match.edges[Direction.West] !== target) {
        match = rotateTile(match);
      }
      break;
    case Direction.South:
      while (match.edges[Direction.North] !== target) {
        match = rotateTile(match);
      }
      break;
  }

  return match;
}

export function buildImage(input: string): string {
  let tiles = parseTiles(input);
  tiles = populateMatches(tiles);
  const N = Math.sqrt(tiles.length);
  const corners = tiles.filter((x) => x.matches.length === 2);

  // lets find the corner in the top-left, i.e. 0,0
  // we can flip & rotate the entire image afterwards to find monsters

  const grid = new Map<number, Tile[]>();
  for (const corner of corners) {
    const eastTile = getTileOnEdge(corner, Direction.East);
    const southTile = getTileOnEdge(corner, Direction.South);
    if (eastTile && southTile) {
      grid.set(0, [corner, eastTile]);
      grid.set(1, [southTile]);
      break;
    }
  }

  // finish each row
  // (lets assume edges are unique,
  // so if we match one, it will match the others)
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (!grid.has(y)) {
        grid.set(y, []);
      }

      const row = grid.get(y);
      if (row[x]) {
        continue;
      }

      if (x === 0) {
        // match on the top one
        const north = grid.get(y - 1)[0];
        row.push(getTileOnEdge(north, Direction.South));
      } else {
        // match both north and west
        const west = row[x - 1];
        row.push(getTileOnEdge(west, Direction.East));
      }
    }
  }

  return drawGrid(grid);
}

// const monster = ['                  # ', '#    ##    ##    ###', ' #  #  #  #  #  #   '];
const monster = [/.{18}(#).{1}/, /(#).{4}(##).{4}(##).{4}(###)/, /.#..#..#..#..#..#.../];

/**
 * Finds monsters in an image.
 * Assumes they don't overlap and are always fully in view
 */
export function findMonsters(image: string[]): [number, number][] {
  const list: [number, number][] = [];

  const width = 20;
  const height = 3;

  for (let y = 0; y < image.length - height; y++) {
    for (let x = 0; x < image[y].length - width; x++) {
      const block = [
        image[y].substr(x, 20),
        image[y + 1].substr(x, 20),
        image[y + 2].substr(x, 20),
      ];
      if (monster[0].test(block[0]) && monster[1].test(block[1]) && monster[2].test(block[2])) {
        list.push([x, y]);
      }
    }
  }

  return list;
}

const searchSpace = [
  rotateContent,
  rotateContent,
  rotateContent,
  flipContent,
  rotateContent,
  rotateContent,
  rotateContent,
];

/**
 * Assumes the correct orientation has monsters
 * and that it only ever has *whole* monsters.
 * @param image
 */
export function getCorrectOrientation(
  image: string[]
): { image: string[]; monsters: [number, number][] } {
  let monsters = findMonsters(image);

  let index = 0;
  while (monsters.length === 0 && index < searchSpace.length) {
    image = searchSpace[index](image);
    monsters = findMonsters(image);
    index++;
  }

  if (monsters.length === 0) {
    throw new Error('no monsters in this image however you slice it');
  }

  return {
    image,
    monsters,
  };
}

export function calculateRoughness(image: string[], monsters: [number, number][]): number {
  // there are 15 #s in a monster, so we should be able to
  // count the number of #s then subtract 15 * monsters.length?

  const total = image
    .map((x) => x.split('').filter((x) => x === '#'))
    .reduce((acc, curr) => (acc += curr.length), 0);

  return total - monsters.length * 15;
}
