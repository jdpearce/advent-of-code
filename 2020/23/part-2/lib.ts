export interface Game {
  current: number;
  next: Map<number, number>;
  round: number;
}

/**
 * We now have to create a million cups... oh no.
 * @param input
 */
export function parseInput(input: string): Game {
  const cups = input.split('').map(Number);
  const next = new Map<number, number>();

  let current = cups[0];
  for (let i = 1; i < 1e6; i++) {
    const nextValue = i < cups.length ? cups[i] : i + 1;
    next.set(current, nextValue);
    current = nextValue;
  }
  next.set(current, cups[0]);

  return {
    current: cups[0],
    next,
    round: 0,
  };
}

export function playRound(game: Game) {
  // pick up three cups clockwise from current
  // get the indices of those three cups:
  const a = game.next.get(game.current);
  const b = game.next.get(a);
  const c = game.next.get(b);

  // take them out of the list
  game.next.set(game.current, game.next.get(c));

  const set = new Set<number>([a, b, c]);

  // get the destination cup
  let destination = game.current - 1;
  while (true) {
    if (destination === 0) {
      destination = game.next.size;
      continue;
    }

    if (set.has(destination)) {
      destination--;
      continue;
    }

    break;
  }

  // find the destination and insert the picked up cups
  game.next.set(c, game.next.get(destination));
  game.next.set(destination, a);

  game.current = game.next.get(game.current);
  game.round += 1;
}

export function playGame(game: Game, rounds: number): [number, number] {
  while (game.round < rounds) {
    playRound(game);
  }

  return [game.next.get(1), game.next.get(game.next.get(1))];
}
