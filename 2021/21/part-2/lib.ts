/**
 * possible rolls are:
 * 111, 112, 113,
 * 121, 122, 123,
 * 131, 132, 133
 * etc.
 *
 * [possible outcome]: number of universes
 *
 */
const dirac_rolls: { [total: number]: number } = {
  3: 1,
  4: 3,
  5: 6,
  6: 7,
  7: 6,
  8: 3,
  9: 1,
};

const rolls = [1, 2, 3];

export function solve2(input) {
  let positions = input.split('\n').map((line) => +line.split(': ')[1]);
  let scores = [0, 0];

  const wins = [0, 0];

  let gameCounts = {
    [[positions, scores].join(';')]: 1,
  };

  let wibble = 0;
  while (Object.entries(gameCounts).length > 0) {
    wibble++;
    for (const i of [0, 1]) {
      const nextGameCounts = {};
      for (const [state, gameCount] of Object.entries(gameCounts)) {
        [positions, scores] = state.split(';').map((s) => s.split(',').map(Number));

        for (const r1 of rolls) {
          for (const r2 of rolls) {
            for (const r3 of rolls) {
              const nextPositions = [...positions];
              nextPositions[i] = ((positions[i] + r1 + r2 + r3 - 1) % 10) + 1;

              const nextScores = [...scores];
              nextScores[i] += nextPositions[i];

              if (nextScores[i] >= 21) {
                wins[i] += gameCount;
                continue;
              }

              const nextState = [nextPositions, nextScores].join(';');
              nextGameCounts[nextState] = (nextGameCounts[nextState] ?? 0) + gameCount;
            }
          }
        }
      }
      gameCounts = nextGameCounts;
    }
  }

  console.log(wibble, Math.max(...wins));
}
