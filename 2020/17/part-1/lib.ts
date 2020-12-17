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
  cubeMap: Set<string>;
}

export function parseInput(input: string): Space {
  const space: Space = {
    max: [0, 0, 0],
    min: [0, 0, 0],
    cubeMap: new Set<string>(),
  };

  const lines = input.split('\n').filter((x) => x);
  let xmax = 0;
  let ymax = lines.length;
  let z = 0;
  for (let y = 0; y < ymax; y++) {
    xmax = lines[y].length;
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] === '#') {
        space.cubeMap.add([x, y, z].toString());
      }
    }
  }

  space.min = [-1, -1, -1];
  space.max = [xmax, ymax, 1];
  return space;
}

export function isActive(coord: [number, number, number], map: Set<string>): boolean {
  return map.has(coord.toString());
}

export function setPoint(coord: [number, number, number], map: Set<string>, active: boolean) {
  if (active) {
    map.add(coord.toString());
  } else {
    map.delete(coord.toString());
  }
}

export function getNextCycle(space: Space): Space {
  const next = new Set<string>();
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

          activeNeighbours += isActive([x1, y1, z1], space.cubeMap) ? 1 : 0;

          if (activeNeighbours > 3) {
            break;
          }
        }

        let active = isActive([x, y, z], space.cubeMap);
        if (active) {
          if (activeNeighbours < 2 || activeNeighbours > 3) {
            active = false;
          }
        } else {
          if (activeNeighbours === 3) {
            active = true;
          }
        }

        setPoint([x, y, z], next, active);

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

export function countCubes(map: Set<string>): number {
  return map.size;
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
        line.push(isActive([x, y, z], space.cubeMap) ? '#' : '.');
      }
      grid.push(line.join(''));
    }
    zlayers.push(grid.join('\n'));
  }
  return zlayers;
}
