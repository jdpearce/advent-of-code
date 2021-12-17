interface ProbeData {
  velocity: [number, number];
  position: [number, number];
}

export type TargetArea = [[number, number], [number, number]];
export type Velocity = [number, number];

/**
 * Parses something of the form `target area: x=207..263, y=-115..-63` into [[xmin, xmax], [ymin, ymax]]
 */
export function parseTargetArea(input: string): TargetArea {
  return input
    .substring(13)
    .split(', ')
    .map((c) => c.substring(2).split('..').map(Number)) as TargetArea;
}

export function probeStep(data: ProbeData): ProbeData {
  const [vx, vy] = data.velocity;
  const [x, y] = data.position;

  return {
    velocity: [vx > 0 ? vx - 1 : vx < 0 ? vx + 1 : 0, vy - 1],
    position: [x + vx, y + vy],
  };
}

export function doesProbeLandInTargetArea(
  [xv, yv]: Velocity,
  target: TargetArea
): [boolean, number] {
  const [[xmin, xmax], [ymin, ymax]] = target;
  let data: ProbeData = { velocity: [xv, yv], position: [0, 0] };
  let highpoint = 0;

  while (data.position[0] <= xmax && data.position[1] >= ymin) {
    // is it in the box?
    if (data.position[0] >= xmin && data.position[1] <= ymax) {
      return [true, highpoint];
    }

    data = probeStep(data);
    if (data.position[1] > highpoint) {
      highpoint = data.position[1];
    }
  }

  return [false, 0];
}

export function findBestTrajectoryHighpoint(input: string): number {
  const [[xmin, xmax], [ymin, ymax]] = parseTargetArea(input);

  let highpoint = 0;

  for (let x = 1; x < xmax; x++) {
    for (let y = 1; y < Math.abs(ymin); y++) {
      const [_, high] = doesProbeLandInTargetArea(
        [x, y],
        [
          [xmin, xmax],
          [ymin, ymax],
        ]
      );
      if (high > highpoint) {
        highpoint = high;
      }
    }
  }

  return highpoint;
}
