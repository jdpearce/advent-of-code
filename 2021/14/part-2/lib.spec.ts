import { getStarterAndRules } from '../part-1/lib';
import { findMinMaxElementCounts, getInitialLetterCounts, getNextStep, getPairCounts } from './lib';

describe('2021-12-14.2', () => {
  const input = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C
`;

  it('should calculate the pair counts after 40 steps', () => {
    const [starter, rules] = getStarterAndRules(input);

    const pairCounts = getPairCounts(starter, rules);

    let letterCounts = getInitialLetterCounts(starter);
    let next = pairCounts;
    for (let i = 0; i < 40; i++) {
      [letterCounts, next] = getNextStep(letterCounts, next, rules);
    }

    const [min, max] = findMinMaxElementCounts(letterCounts);
    expect(max - min).toEqual(2188189693529);
  });
});
