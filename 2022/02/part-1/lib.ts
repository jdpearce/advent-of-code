const playScores = {
  X: 1,
  Y: 2,
  Z: 3,
};

const gameScores = {
  X: { A: 3, B: 0, C: 6 },
  Y: { A: 6, B: 3, C: 0 },
  Z: { A: 0, B: 6, C: 3 },
};

export function calculateFinalScore(input: string): number {
  let score = 0;
  input
    .split('\n')
    .filter((x) => x)
    .forEach((line) => {
      const [theirs, yours] = line.split(' ');

      score += playScores[yours];
      score += gameScores[yours][theirs];
    });

  return score;
}
