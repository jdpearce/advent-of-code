import { numberOfQuestions, sumOfCounts } from './lib';

describe('2020-12-06.1', () => {
  const input = `abc

a
b
c

ab
ac

a
a
a
a

b`;

  it('sumOfCounts should work', () => {
    expect(sumOfCounts(input)).toBe(11);
  });

  it('numberOfQuestions should work', () => {
    let group = `ab
ac`;

    expect(numberOfQuestions(group)).toBe(3);

    group = `a
a
a
a`;

    expect(numberOfQuestions(group)).toBe(1);
  });
});
