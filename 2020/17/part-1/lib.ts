const neighbours = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
  [1, 1, 0],
  [1, 0, 1],
  [0, 1, 1],
  [-1, 0, 0],
  [0, -1, 0],
  [0, 0, -1],
  [-1, -1, 0],
  [-1, 0, -1],
  [0, -1, -1],
  [1, -1, 0],
  [1, 0, -1],
  [0, 1, -1],
  [-1, 1, 0],
  [-1, 0, 1],
  [0, -1, 1],
  [1, 1, 1],
  [-1, -1, -1],
  [1, -1, 1],
  [1, 1, -1],
  [-1, 1, 1],
  [-1, -1, 1],
  [-1, 1, -1],
  [1, -1, -1],
];

export interface Space {
  max: [number, number, number];
  min: [number, number, number];
  cubeMap: Map<number, Map<number, Set<number>>>;
}

export function parseInput(input: string): Space {
  const space: Space = {
    max: [0, 0, 0],
    min: [0, 0, 0],
    cubeMap: new Map<number, Map<number, Set<number>>>(),
  };

  const lines = input.split('\n').filter((x) => x);
  let xmax = 0;
  let ymax = lines.length;
  let z = 0;
  for (let y = 0; y < ymax; y++) {
    xmax = lines[y].length;
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] === '#') {
        setPoint(x, y, z, space.cubeMap, true);
      }
    }
  }

  space.min = [-1, -1, -1];
  space.max = [xmax, ymax, 1];
  return space;
}

export function isActive(
  x: number,
  y: number,
  z: number,
  map: Map<number, Map<number, Set<number>>>
): boolean {
  if (!map.get(z)) {
    map.set(z, new Map<number, Set<number>>());
  }

  const yspace = map.get(z);

  if (!yspace.get(y)) {
    yspace.set(y, new Set<number>());
  }

  const xspace = yspace.get(y);
  return xspace.has(x);
}

export function setPoint(
  x: number,
  y: number,
  z: number,
  map: Map<number, Map<number, Set<number>>>,
  active: boolean
) {
  if (!map.get(z)) {
    map.set(z, new Map<number, Set<number>>());
  }

  const yspace = map.get(z);

  if (!yspace.get(y)) {
    yspace.set(y, new Set<number>());
  }

  const xspace = yspace.get(y);
  if (active) {
    xspace.add(x);
  } else {
    xspace.delete(x);
  }
}

export function getNextCycle(space: Space): Space {
  const next = new Map<number, Map<number, Set<number>>>();
  const [xmax, ymax, zmax] = space.max;
  const [xmin, ymin, zmin] = space.min;

  let [xmaxNew, ymaxNew, zmaxNew] = [0, 0, 0];
  let [xminNew, yminNew, zminNew] = [0, 0, 0];

  for (let x = xmin; x <= xmax; x++) {
    for (let y = ymin; y <= ymax; y++) {
      for (let z = zmin; z <= zmax; z++) {
        let activeNeighbours = 0;
        for (const [dz, dy, dx] of neighbours) {
          const [z1, y1, x1] = [z + dz, y + dy, x + dx];

          activeNeighbours += isActive(x1, y1, z1, space.cubeMap) ? 1 : 0;

          if (activeNeighbours > 3) {
            break;
          }
        }

        let active = isActive(x, y, z, space.cubeMap);
        if (active) {
          if (activeNeighbours < 2 || activeNeighbours > 3) {
            active = false;
          }
        } else {
          if (activeNeighbours === 3) {
            active = true;
          }
        }

        setPoint(x, y, z, next, active);

        if (active) {
          // update maxes
          if (z >= zmaxNew) {
            zmaxNew = z + 1;
          }
          if (y >= ymaxNew) {
            ymaxNew = y + 1;
          }
          if (x >= xmaxNew) {
            xmaxNew = x + 1;
          }

          // update mins
          if (z <= zminNew) {
            zminNew = z - 1;
          }
          if (y <= yminNew) {
            yminNew = y - 1;
          }
          if (x <= xminNew) {
            xminNew = x - 1;
          }
        }
      }
    }
  }

  return {
    max: [xmaxNew, ymaxNew, zmaxNew],
    min: [xminNew, yminNew, zminNew],
    cubeMap: next,
  };
}

export function countCubes(map: Map<number, Map<number, Set<number>>>): number {
  let size = 0;
  for (const z of map.values()) {
    for (const y of z.values()) {
      size += y.size;
    }
  }
  return size;
}

export function cubeToLayers(space: Space): string[] {
  const [xmax, ymax, zmax] = space.max;
  const [xmin, ymin, zmin] = space.min;
  const zlayers = [];
  for (let z = zmin; z <= zmax; z++) {
    let grid = [];
    for (let y = ymin; y <= ymax; y++) {
      const line = [];
      for (let x = xmin; x <= xmax; x++) {
        line.push(isActive(x, y, z, space.cubeMap) ? '#' : '.');
      }
      grid.push(line.join(''));
    }
    zlayers.push(grid.join('\n'));
  }
  return zlayers;
}
