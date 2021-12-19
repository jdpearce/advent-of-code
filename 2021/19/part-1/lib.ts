import { rotate, rotationMatrices } from './rotations';

export type Point = [number, number, number];

export function parseInputToScanners(input: string): Point[][] {
  return input.split('\n\n').map((s) =>
    s
      .split('\n')
      .slice(1)
      .filter((l) => !!l)
      .map((s) => s.split(',').map(Number) as Point)
  );
}

/**
 * Let's just build up the entire map starting from s0
 *
 * This will get slower as we add more scanner maps, but...whatevs :)
 */
export function buildScannerWorld(maps: Point[][]): [Point[], Point[]] {
  let world = [...maps[0]];
  let scanners: Point[] = [[0, 0, 0]];
  let remaining = maps.slice(1);

  findOverlapping: while (remaining.length > 0) {
    for (let i = 0; i < remaining.length; i++) {
      const overlap = findOverlap(world, remaining[i]);
      if (overlap) {
        scanners.push(overlap[0]);
        world = union(world, overlap[1]);
        remaining.splice(i, 1);
        continue findOverlapping;
      }
    }
    throw new Error(`Didn't find an overlap! ${remaining.length} maps remaining.`);
  }

  return [scanners, world];
}

/**
 * We only need to check when the points coincide. So, check when s1[0] coincides with s0[0...n]
 * All the way up to s1[n] tested against s0[0...n]
 * That's a lot of comparisons though...
 */
export function findOverlap(s0: Point[], s1: Point[]): [Point, Point[]] | null {
  for (const matrix of rotationMatrices) {
    const rotation = s1.map((point) => rotate(matrix, point));
    // for each point in s0, try to fit each point of the rotation to it
    // if 12 or more points coincide after being translated, then we have an overlap
    for (const [x0, y0, z0] of s0) {
      for (const [x1, y1, z1] of rotation) {
        // we need the origin offset to translate the other points
        const [origin_x, origin_y, origin_z] = [x0 - x1, y0 - y1, z0 - z1];
        const translated = rotation.map(
          ([x, y, z]) => [x + origin_x, y + origin_y, z + origin_z] as Point
        );
        const intersection = getIntersection(s0, translated);
        if (intersection > 11) {
          return [[origin_x, origin_y, origin_z], translated];
        }
      }
    }
  }

  return null;
}

export function getIntersection(a1: Point[], a2: Point[]): number {
  const matching: Point[] = a1.reduce((acc, [xc, yc, zc]) => {
    if (a2.some(([x, y, z]) => xc === x && yc === y && zc === z)) {
      acc.push([xc, yc, zc]);
    }
    return acc;
  }, [] as Point[]);

  return matching.length;
}

export function union(first: Point[], second: Point[]): Point[] {
  const unionSet = new Set<string>([
    ...first.map(([x, y, z]) => `${x}:${y}:${z}`),
    ...second.map(([x, y, z]) => `${x}:${y}:${z}`),
  ]);
  return [...unionSet.values()].map((x) => x.split(':').map(Number) as Point);
}
