import { goInDirection, MapPoint, MapPointType, ShipMap } from '../part-1/lib';

export function calcDistance(point: MapPoint): number {
  let steps = 0;
  let current = point;
  while (!!current) {
    current = current.parent;
    steps++;
  }
  return steps - 1;
}

/**
 * We already generated the map in part one
 *
 * Just need to calculate the longest distance
 * from the oxygen to a terminator using a kind of flood fill.
 *
 * https://en.wikipedia.org/wiki/Flood_fill#Stack-based_recursive_implementation_(four-way)
 *
 */
export function timeToFlood(shipMap: ShipMap, from: MapPoint): number {
  let time = 0;

  const q: MapPoint[][] = [[from]];

  while (q.length > 0) {
    const nodes = q.shift();
    const frontier: MapPoint[] = [];
    for (const node of nodes) {
      for (const direction of [1, 2, 3, 4]) {
        const [x1, y1] = goInDirection(direction, [node.x, node.y]);
        const coord = `${x1}|${y1}`;
        const next = shipMap[coord];
        if (next.type === MapPointType.Empty) {
          next.type = MapPointType.OxygenSystem;
          frontier.push(next);
        }
      }
    }
    if (frontier.length > 0) {
      q.push(frontier);
      time++;
    }
  }

  return time;
}
