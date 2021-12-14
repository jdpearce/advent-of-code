import { findMinMaxElementCounts, getNextStep, getStarterAndRules } from './lib';

describe('2021-12-14.1', () => {
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

  it('calculate the next polymer after n steps', () => {
    const [starter, rules] = getStarterAndRules(input);
    let next = getNextStep(starter, rules);
    expect(next.join('')).toBe('NCNBCHB');

    next = getNextStep(next, rules);
    expect(next.join('')).toBe('NBCCNBBBCBHCB');

    next = getNextStep(next, rules);
    expect(next.join('')).toBe('NBBBCNCCNBBNBNBBCHBHHBCHB');

    next = getNextStep(next, rules);
    expect(next.join('')).toBe('NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB');
  });

  it('should find the most common and least common elements after 10 steps', () => {
    const [starter, rules] = getStarterAndRules(input);
    let next = starter;
    for (let i = 0; i < 10; i++) {
      next = getNextStep(next, rules);
    }

    const [min, max] = findMinMaxElementCounts(next);
    expect([min, max]).toEqual([161, 1749]);
  });
});
