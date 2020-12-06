import { intersection, numberOfQuestions, sumOfCounts } from './lib';

describe('2020-12-06.2', () => {
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
    expect(sumOfCounts(input)).toBe(6);
  });

  it('numberOfQuestions should work', () => {
    let group = `a
b
c`;

    expect(numberOfQuestions(group)).toBe(0);

    group = `a
a
a
a`;

    expect(numberOfQuestions(group)).toBe(1);

    group = `abc`;

    expect(numberOfQuestions(group)).toBe(3);
  });

  it('intersection should work', () => {
    const first = new Set(['a', 'b', 'c']);
    const second = ['a', 'b', 'd'];
    expect(intersection(first, second)).toEqual(new Set(['a', 'b']));
  });
});
