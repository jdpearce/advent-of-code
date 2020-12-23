export interface Game {
  current: Cup;
  cups: Map<number, Cup>;
  round: number;
}

export interface Cup {
  value: number;
  next?: Cup;
}

export function parseInput(input: string): Game {
  const cups = input.split('').map(Number);
  const start: Cup = {
    value: cups[0],
  };

  const map = new Map<number, Cup>();
  map.set(start.value, start);

  let current = start;
  for (let i = 1; i < cups.length; i++) {
    const next = {
      value: cups[i],
    };
    map.set(next.value, next);

    current.next = next;
    current = next;
  }
  current.next = start;

  return {
    current: start,
    cups: map,
    round: 0,
  };
}

export function playGame(game: Game, rounds: number): string {
  while (game.round < rounds) {
    playRound(game);
  }

  // find the cup with value 1
  const one = game.cups.get(1);

  const result: number[] = [];
  let next = one.next;
  while (next.value !== 1) {
    result.push(next.value);
    next = next.next;
  }

  return result.join('');
}

export function playRound(game: Game) {
  // pick up three cups clockwise from current
  // get the indices of those three cups:
  const a = game.current.next;
  const b = a.next;
  const c = b.next;

  // take them out of the list
  game.current.next = c.next;

  const set = new Set<number>([a.value, b.value, c.value]);

  // get the destination cup
  let destination = game.current.value - 1;
  while (true) {
    if (destination === 0) {
      destination = game.cups.size;
      continue;
    }

    if (set.has(destination)) {
      destination--;
      continue;
    }

    break;
  }

  // find the destination and insert the picked up cups
  const dest = game.cups.get(destination);
  c.next = dest.next;
  dest.next = a;

  game.current = game.current.next;
  game.round += 1;
}
