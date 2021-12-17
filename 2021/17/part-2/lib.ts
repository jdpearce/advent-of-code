import { doesProbeLandInTargetArea, parseTargetArea, Velocity } from '../part-1/lib';

/**
 * BRUTE FORCE POWER...There might be a smarter way to do this 🤷‍♀️
 * @param input
 * @returns
 */
export function findWorkingTrajectories(input: string): Velocity[] {
  const [[xmin, xmax], [ymin, ymax]] = parseTargetArea(input);

  let working: [number, number][] = [];

  for (let x = 1; x < 1000; x++) {
    for (let y = -1000; y < 1000; y++) {
      const [did, _] = doesProbeLandInTargetArea(
        [x, y],
        [
          [xmin, xmax],
          [ymin, ymax],
        ]
      );
      if (did) {
        working.push([x, y]);
      }
    }
  }

  return working;
}
