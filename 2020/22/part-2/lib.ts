import { Game, getWinner } from '../part-1/lib';

export function playRound(game: Game): Game {
  const prior = game.prior;
  const state = `${game.p1.join()}|${game.p2.join()}`;
  if (prior.has(state)) {
    return {
      ...game,
      winner: 1,
    };
  } else {
    prior.add(state);
  }

  const cardP1 = game.p1.shift();
  const cardP2 = game.p2.shift();
  const rounds = game.rounds + 1;
  let next: Game;
  let roundWinner: number;

  if (game.p1.length >= cardP1 && game.p2.length >= cardP2) {
    // play subgame to find the round winner
    let subGame: Game = {
      p1: game.p1.slice(0, cardP1),
      p2: game.p2.slice(0, cardP2),
      rounds: 0,
      depth: game.depth + 1,
      prior: new Set<string>(),
    };
    while (!subGame.winner) {
      subGame = playRound(subGame);
    }
    roundWinner = subGame.winner;
  } else {
    roundWinner = cardP1 > cardP2 ? 1 : 2;
  }

  if (roundWinner === 1) {
    next = {
      p1: [...game.p1, cardP1, cardP2],
      p2: [...game.p2],
      prior,
      depth: game.depth,
      rounds,
    };
  } else {
    next = {
      p1: [...game.p1],
      p2: [...game.p2, cardP2, cardP1],
      prior,
      depth: game.depth,
      rounds,
    };
  }

  next.winner = getWinner(next);
  return next;
}

export function playGame(game: Game): Game {
  while (!game.winner) {
    game = playRound(game);
  }
  console.log(`Winning round: ${game.rounds}`);
  return game;
}
