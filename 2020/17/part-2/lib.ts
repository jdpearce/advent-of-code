const neighbours = [];
export function getNeighbours(): number[][] {
  if (neighbours.length > 0) {
    return neighbours;
  }

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        for (let w = -1; w <= 1; w++) {
          if (x === 0 && y === 0 && z === 0 && w === 0) {
            continue;
          }
          neighbours.push([x, y, z, w]);
        }
      }
    }
  }

  return neighbours;
}

export interface Space {
  max: [number, number, number, number];
  min: [number, number, number, number];
  cubeMap: Set<string>;
}

export function parseInput(input: string): Space {
  const space: Space = {
    max: [0, 0, 0, 0],
    min: [0, 0, 0, 0],
    cubeMap: new Set<string>(),
  };

  const lines = input.split('\n').filter((x) => x);
  let xmax = 0;
  let ymax = lines.length;
  let z = 0;
  let w = 0;
  for (let y = 0; y < ymax; y++) {
    xmax = lines[y].length;
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] === '#') {
        space.cubeMap.add([x, y, z, w].toString());
      }
    }
  }

  space.min = [-1, -1, -1, -1];
  space.max = [xmax, ymax, 1, 1];
  return space;
}

export function isActive(coord: [number, number, number, number], map: Set<string>): boolean {
  return map.has(coord.toString());
}

export function setPoint(
  coord: [number, number, number, number],
  map: Set<string>,
  active: boolean
) {
  if (active) {
    map.add(coord.toString());
  } else {
    map.delete(coord.toString());
  }
}

export function getNextCycle(space: Space): Space {
  const next = new Set<string>();
  const [xmax, ymax, zmax, wmax] = space.max;
  const [xmin, ymin, zmin, wmin] = space.min;

  let [xmaxNew, ymaxNew, zmaxNew, wmaxNew] = [0, 0, 0, 0];
  let [xminNew, yminNew, zminNew, wminNew] = [0, 0, 0, 0];

  for (let x = xmin; x <= xmax; x++) {
    for (let y = ymin; y <= ymax; y++) {
      for (let z = zmin; z <= zmax; z++) {
        for (let w = wmin; w <= wmax; w++) {
          let activeNeighbours = 0;
          for (const [dx, dy, dz, dw] of getNeighbours()) {
            const [x1, y1, z1, w1] = [x + dx, y + dy, z + dz, w + dw];

            activeNeighbours += isActive([x1, y1, z1, w1], space.cubeMap) ? 1 : 0;

            if (activeNeighbours > 3) {
              break;
            }
          }

          let active = isActive([x, y, z, w], space.cubeMap);
          if (active) {
            if (activeNeighbours < 2 || activeNeighbours > 3) {
              active = false;
            }
          } else {
            if (activeNeighbours === 3) {
              active = true;
            }
          }

          setPoint([x, y, z, w], next, active);

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
            if (w >= wmaxNew) {
              wmaxNew = w + 1;
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
            if (w <= wminNew) {
              wminNew = w - 1;
            }
          }
        }
      }
    }
  }

  return {
    max: [xmaxNew, ymaxNew, zmaxNew, wmaxNew],
    min: [xminNew, yminNew, zminNew, wminNew],
    cubeMap: next,
  };
}
