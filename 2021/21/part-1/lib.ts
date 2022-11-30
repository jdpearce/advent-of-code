export function playGame(players: number[]) {
  players = players.map((p) => p - 1);
  let scores = players.map((_) => 0);
  let die = deterministicDie();
  playing: while (true) {
    for (let i = 0; i < players.length; i++) {
      // roll three times, move and add the score
      const roll1 = die.next().value[0];
      const roll2 = die.next().value[0];
      const roll3 = die.next().value[0];
      players[i] = (players[i] + roll1 + roll2 + roll3) % 10;
      scores[i] += players[i] + 1;
      if (scores[i] >= 1000) {
        break playing;
      }
    }
  }

  return [scores.find((p) => p < 1000), die.next().value[1] - 1];
}

export function* deterministicDie(): Generator<[number, number]> {
  let roll = 1;
  while (true) {
    yield [roll % 100, roll];
    roll += 1;
  }
}
