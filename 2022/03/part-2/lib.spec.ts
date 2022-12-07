import { getBadge, getSumOfPriorities } from './lib';

describe('2022-12-03.2', () => {
  const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg`;

  const input2 = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

  it('should calculate the intersection of all three elves', () => {
    const lines = input.split('\n');
    const badge = getBadge(lines);
    expect(badge).toBe('r');
  });

  it('should calculate the sum of the priorities', () => {
    const sum = getSumOfPriorities(input2);
    expect(sum).toBe(70);
  });
});
