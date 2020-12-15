export function calculateNumberOnTurn(input: number[], turn: number): number {
  const lastSeen = new Map<number, number>();

  let last = input[0];
  for (let i = 1; i < turn; i++) {
    let next = 0;
    if (i < input.length) {
      next = input[i];
    } else if (lastSeen.has(last)) {
      const turn = lastSeen.get(last);
      next = i - turn;
    }

    lastSeen.set(last, i);
    last = next;
  }

  return last;
}
