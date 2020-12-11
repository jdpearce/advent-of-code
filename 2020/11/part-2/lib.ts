import { directions, SeatState } from '../part-1/lib';

export function isDirectionOccupied(
  seats: string[][],
  [x, y]: [number, number],
  [dx, dy]: [number, number]
): boolean {
  let occupied = false;
  let [x1, y1] = [x + dx, y + dy];
  while (!occupied) {
    if (y1 === seats.length || y1 < 0 || x1 < 0 || x1 === seats[y].length) {
      break;
    }

    const space = seats[y1][x1];
    if (space === SeatState.Occupied) {
      occupied = true;
    } else if (space === SeatState.Empty) {
      break;
    }
    x1 += dx;
    y1 += dy;
  }

  return occupied;
}

export function calcNextRound(seats: string[][]): string[][] {
  const output = [];

  for (let y = 0; y < seats.length; y++) {
    const row = seats[y];
    output[y] = [];
    for (let x = 0; x < row.length; x++) {
      output[y][x] = seats[y][x];

      let adjacentSeats = 0;
      for (const [x1, y1] of directions) {
        if (isDirectionOccupied(seats, [x, y], [x1, y1])) {
          adjacentSeats++;
        }
        if (adjacentSeats > 4) {
          break;
        }
      }

      const seat = seats[y][x];
      if (seat === SeatState.Empty && adjacentSeats === 0) {
        output[y][x] = SeatState.Occupied;
      } else if (seat === SeatState.Occupied && adjacentSeats > 4) {
        output[y][x] = SeatState.Empty;
      }
    }
  }

  return output;
}
