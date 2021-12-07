export function calculateMapWithDiagonals(input: string): { [coord: string]: number } {
  const map: { [coord: string]: number } = {};

  const lines = input.split('\n').filter((l) => !!l);
  for (const line of lines) {
    // const coordPair = line.split(' -> ').map((c) => c.split(',').map(Number)) as [
    //   [number, number],
    //   [number, number]
    // ];

    // for (const [x, y] of getPoints(coordPair)) {
    //   map[`${x}:${y}`] = (map[`${x}:${y}`] || 0) + 1;
    // }

    const [[x1, y1], [x2, y2]] = line.split(' -> ').map((c) => c.split(',').map(Number));

    for (const { x, y } of pointsInLine(x1, y1, x2, y2)) {
      map[`${x}:${y}`] = (map[`${x}:${y}`] || 0) + 1;
    }
  }

  return map;
}

function* getPoints([[x1, y1], [x2, y2]]: [[number, number], [number, number]]): Generator<
  [number, number]
> {
  const dx = x1 === x2 ? 0 : x2 > x1 ? 1 : -1;
  const dy = y1 === y2 ? 0 : y2 > y1 ? 1 : -1;

  for (let x = x1, y = y1; x != x2 + dx || y != y2 + dy; x += dx, y += dy) {
    yield [x, y];
  }
}

function* pointsInLine(x1, y1, x2, y2): Generator<{ x: number; y: number }> {
  if (x1 == x2) {
    // vertical line
    for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
      yield { x: x1, y };
    }
  } else if (y1 == y2) {
    // horizontal line
    for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
      yield { x, y: y1 };
    }
  } else {
    // diagonal line
    const length = Math.abs(x2 - x1);
    for (let idx = 0; idx <= length; idx++) {
      const x = x2 > x1 ? x1 + idx : x1 - idx;
      const y = y2 > y1 ? y1 + idx : y1 - idx;
      yield { x, y };
    }
  }
}
