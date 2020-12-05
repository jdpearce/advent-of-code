/**
 *
 * @param pass A string of the form BFFFBBFRRR
 */
export function getSeatId(seat: { row: number; seat: number }): number {
  return seat.row * 8 + seat.seat;
}

export function getSeat(pass: string): { row: number; seat: number } {
  const instructions = pass.split('');
  const rows = instructions.slice(0, 7);
  const seats = instructions.slice(7);

  let upper = 127;
  let lower = 0;

  for (let r of rows) {
    const nextPartition = (upper - lower + 1) / 2;
    if (r === 'F') {
      upper -= nextPartition;
    } else {
      lower += nextPartition;
    }
  }

  const row = upper;

  upper = 7;
  lower = 0;

  for (let s of seats) {
    const nextPartition = (upper - lower + 1) / 2;
    if (s === 'L') {
      upper -= nextPartition;
    } else {
      lower += nextPartition;
    }
  }

  const seat = upper;

  return {
    row,
    seat,
  };
}
