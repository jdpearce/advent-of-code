const playScores = {
  A: 1,
  B: 2,
  C: 3,
};

const gameScores = {
  X: 0,
  Y: 3,
  Z: 6,
};

const whatToPlay = {
  A: { X: 'C', Y: 'A', Z: 'B' },
  B: { X: 'A', Y: 'B', Z: 'C' },
  C: { X: 'B', Y: 'C', Z: 'A' },
};

export function calculateFinalScore(input: string): number {
  let score = 0;
  input
    .split('\n')
    .filter((x) => x)
    .forEach((line) => {
      const [theirs, winLoseDraw] = line.split(' ');

      const play = whatToPlay[theirs][winLoseDraw];

      score += playScores[play];
      score += gameScores[winLoseDraw];
    });

  return score;
}
