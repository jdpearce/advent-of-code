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
  cubeMap: number[][][];
}

export function parseInput(input: string): Space {
  const space: Space = {
    max: [0, 0, 0],
    cubeMap: [],
  };

  const lines = input.split('\n').filter((x) => x);
  let xmax = 0;
  let ymax = lines.length;
  space.cubeMap[0] = [];
  for (let y = 0; y < ymax; y++) {
    xmax = lines[y].length;
    if (!space.cubeMap[0][y]) {
      space.cubeMap[0][y] = [];
    }
    for (let x = 0; x < lines[y].length; x++) {
      space.cubeMap[0][y][x] = lines[y][x] === '#' ? 1 : 0;
    }
  }

  space.max = [xmax, ymax, 1];
  return space;
}

export function calculateCubes(input: string, cycle: number): number {
  let space = parseInput(input);

  let next: number[][][] = [];
  const [xmax, ymax, zmax] = space.max;
  let [xmaxNew, ymaxNew, zmaxNew] = space.max;
  for (let x = -xmax; x <= xmax; x++) {
    for (let y = -ymax; y <= ymax; y++) {
      for (let z = -zmax; z <= zmax; z++) {
        if (!space.cubeMap[z]) {
          space.cubeMap[z] = [];
        }

        if (!space.cubeMap[z][y]) {
          space.cubeMap[z][y] = [];
        }

        let activeNeighbours = 0;
        for (const [dz, dy, dx] of neighbours) {
          const [z1, y1, x1] = [z + dz, y + dy, x + dx];

          if (!space.cubeMap[z1]) {
            space.cubeMap[z1] = [];
          }

          if (!space.cubeMap[z1][y1]) {
            space.cubeMap[z1][y1] = [];
          }

          const neighbour = space.cubeMap[z1][y1][x1];
          if (neighbour) {
            activeNeighbours++;
          }
          if (activeNeighbours > 3) {
            break;
          }
        }

        let current = space.cubeMap[z][y][x];
        if (current) {
          space.cubeMap[z][y][x] = activeNeighbours === 2 || activeNeighbours === 3 ? 1 : 0;
        } else {
          space.cubeMap[z][y][x] = activeNeighbours === 3 ? 1 : 0;
        }

        if (space.cubeMap[z][y][x]) {
          if (Math.abs(z) === zmax) {
            zmaxNew = zmax + 1;
          }
          if (Math.abs(y) === ymax) {
            ymaxNew = ymax + 1;
          }
          if (Math.abs(x) === xmax) {
            xmaxNew = xmax + 1;
          }
        }
      }
    }
  }

  console.log(space.cubeMap);

  return 0;
}
