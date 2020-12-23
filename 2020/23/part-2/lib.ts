/**
 * We now have to create a million cups... oh no.
 * @param input
 */

import { Cup, Game, playRound } from '../part-1/lib';

export function parseInput(input: string): Game {
  const cups = input.split('').map(Number);
  const start: Cup = {
    value: cups[0],
  };

  const map = new Map<number, Cup>();
  map.set(start.value, start);

  let current = start;
  for (let i = 1; i < 1e6; i++) {
    const next = {
      value: i < cups.length ? cups[i] : i + 1,
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

export function playGame(game: Game, rounds: number): [number, number] {
  while (game.round < rounds) {
    playRound(game);
  }

  // find the cup with value 1
  const one = game.cups.get(1);
  return [one.next.value, one.next.next.value];
}
