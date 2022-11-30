export function parseInstructions(
  input: string
): [string, [number, number], [number, number], [number, number]][] {
  return input
    .split('\n')
    .filter((l) => !!l)
    .map((l) => {
      const [onOff, ranges] = l.split(' ');

      return [
        onOff,
        ...ranges.split(',').map((r) => r.substring(2).split('..').map(Number) as [number, number]),
      ] as [string, [number, number], [number, number], [number, number]];
    });
}

export function startTheReactor(
  instructions: [string, [number, number], [number, number], [number, number]][]
) {
  const reactor = new Set<string>();
  for (const [onOrOff, [xmin, xmax], [ymin, ymax], [zmin, zmax]] of instructions) {
    for (let x = Math.max(-50, xmin); x <= Math.min(50, xmax); x++) {
      for (let y = Math.max(-50, ymin); y <= Math.min(50, ymax); y++) {
        for (let z = Math.max(-50, zmin); z <= Math.min(50, zmax); z++) {
          const coord = `${x}:${y}:${z}`;
          if (onOrOff === 'off') {
            reactor.delete(coord);
          } else {
            reactor.add(coord);
          }
        }
      }
    }
  }
  return reactor.size;
}
