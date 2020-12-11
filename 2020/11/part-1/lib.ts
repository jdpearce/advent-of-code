export enum SeatState {
  Floor = '.',
  Occupied = '#',
  Empty = 'L',
}

export const directions = [
  [+1, 0],
  [+1, +1],
  [0, +1],
  [-1, +1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [+1, -1],
];

export function toGrid(input: string): string[][] {
  return input
    .split('\n')
    .filter((x) => x)
    .map((r) => r.split(''));
}

export function calcNextRound(seats: string[][]): string[][] {
  const output = [];

  for (let y = 0; y < seats.length; y++) {
    const row = seats[y];
    output[y] = [];
    for (let x = 0; x < row.length; x++) {
      output[y][x] = seats[y][x];

      let adjacentSeats = 0;
      for (const [dx, dy] of directions) {
        const [x1, y1] = [x + dx, y + dy];
        if (x1 < 0 || y1 < 0 || y1 === seats.length || x1 === row.length) {
          continue;
        }

        if (seats[y1][x1] === SeatState.Occupied) {
          adjacentSeats++;
        }
      }

      const seat = seats[y][x];
      if (seat === SeatState.Empty && adjacentSeats === 0) {
        output[y][x] = SeatState.Occupied;
      } else if (seat === SeatState.Occupied && adjacentSeats > 3) {
        output[y][x] = SeatState.Empty;
      }
    }
  }

  return output;
}

export function calcOccupiedSeatsWhenStable(
  input: string,
  calcNextRound: (seats: string[][]) => string[][]
): number {
  let seats = toGrid(input);

  let stable = false;
  while (!stable) {
    const next = calcNextRound(seats);
    if (arePlansEqual(seats, next)) {
      stable = true;
    } else {
      seats = next;
    }
  }

  let occupied = 0;
  for (let y = 0; y < seats.length; y++) {
    for (let x = 0; x < seats[y].length; x++) {
      if (seats[y][x] === SeatState.Occupied) {
        occupied++;
      }
    }
  }

  return occupied;
}

export function arePlansEqual(plan1: string[][], plan2: string[][]): boolean {
  return JSON.stringify(plan1) === JSON.stringify(plan2);
}
