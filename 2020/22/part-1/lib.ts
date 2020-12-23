export interface Game {
  p1: number[];
  p2: number[];
  rounds: number;
  prior: Set<string>;
  depth: number;
  winner?: number;
}

export function parseGame(input: string): Game {
  const [p1lines, p2lines] = input.split('\n\n');

  const p1 = p1lines
    .split('\n')
    .filter((x) => x)
    .filter((_, i) => i > 0)
    .map(Number);
  const p2 = p2lines
    .split('\n')
    .filter((x) => x)
    .filter((_, i) => i > 0)
    .map(Number);

  return {
    p1,
    p2,
    prior: new Set<string>(),
    rounds: 0,
    depth: 0,
  };
}

export function playRound(game: Game): Game {
  if (game.rounds % 1000 === 0 && game.rounds > 0) {
    console.log(`Round ${game.rounds}...`);
  }

  const cardP1 = game.p1.shift();
  const cardP2 = game.p2.shift();
  const rounds = game.rounds + 1;

  if (cardP1 > cardP2) {
    return {
      p1: [...game.p1, cardP1, cardP2],
      p2: [...game.p2],
      prior: game.prior,
      depth: game.depth,
      rounds,
    };
  }

  return {
    p1: [...game.p1],
    p2: [...game.p2, cardP2, cardP1],
    prior: game.prior,
    depth: game.depth,
    rounds,
  };
}

export function getWinner(game: Game): number | undefined {
  if (game.p1.length === 0) {
    return 2;
  }

  if (game.p2.length === 0) {
    return 1;
  }
}

export function playGame(game: Game): Game {
  while (!game.winner) {
    game = playRound(game);
    game.winner = getWinner(game);
  }
  console.log(`Winning round: ${game.rounds}`);
  return game;
}

export function calculateWinningScore(game: Game): number {
  const cards = [...game.p1, ...game.p2];
  cards.reverse();
  return cards.reduce((acc, curr, i) => (acc += curr * (i + 1)), 0);
}
