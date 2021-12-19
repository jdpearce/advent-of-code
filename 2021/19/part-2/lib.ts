import { Point } from '../part-1/lib';

export function calculateManhattanDistance([x0, y0, z0]: Point, [x1, y1, z1]: Point) {
  return Math.abs(x0 - x1) + Math.abs(y0 - y1) + Math.abs(z0 - z1);
}

export function findLargestManhattanDistance(points: Point[]): number {
  let largest = 0;
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const distance = calculateManhattanDistance(points[i], points[j]);
      if (distance > largest) {
        largest = distance;
      }
    }
  }
  return largest;
}
