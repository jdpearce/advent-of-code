type Range = [number, number];

type Cube = [Range, Range, Range];

/**
 * We can no longer track each reactor node individually
 * we need to track reactor volumes instead.
 * @param instructions
 */
export function rebootTheReactor(instructions: [string, Range, Range, Range][]) {
  let count = 0;
  let added: Cube[] = [];
  let removed: Cube[] = [];
}

export function getOverlap(a: Cube, b: Cube) {
  const [[x0min, x0max], [y0min, y0max], [z0min, z0max]] = a;
  const [[x1min, x1max], [y1min, y1max], [z1min, z1max]] = b;

  return [[Math.max()]];
}
