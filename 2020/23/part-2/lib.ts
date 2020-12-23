export interface Game {
  current: number;
  next: number[];
  round: number;
}

/**
 * We now have to create a million cups... oh no.
 * @param input
 */
export function parseInput(input: string): Game {
  const cups = input.split('').map(Number);
  const next = new Array(1e6 + 1);

  let current = cups[0];
  for (let i = 1; i < 1e6; i++) {
    const nextValue = i < cups.length ? cups[i] : i + 1;
    next[current] = nextValue;
    current = nextValue;
  }
  next[current] = cups[0];

  return {
    current: cups[0],
    next,
    round: 0,
  };
}

export function playRound(game: Game) {
  // pick up three cups clockwise from current
  // get the indices of those three cups:
  const a = game.next[game.current];
  const b = game.next[a];
  const c = game.next[b];

  // take them out of the list
  game.next[game.current] = game.next[c];

  const set = new Set<number>([a, b, c]);

  // get the destination cup
  let destination = game.current - 1;
  while (true) {
    if (destination === 0) {
      destination = Object.keys(game.next).length;
      continue;
    }

    if (set.has(destination)) {
      destination--;
      continue;
    }

    break;
  }

  // find the destination and insert the picked up cups
  game.next[c] = game.next[destination];
  game.next[destination] = a;

  game.current = game.next[game.current];
  game.round += 1;
}

export function playGame(game: Game, rounds: number): [number, number] {
  while (game.round < rounds) {
    playRound(game);
  }

  return [game.next[1], game.next[game.next[1]]];
}
