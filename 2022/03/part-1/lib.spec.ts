import { calculateDuplicatePrioritySum, getDuplicatedType, getPriority } from './lib';

describe('2022-12-03.1', () => {
  const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

  it('should find the duplicated type', () => {
    expect(getDuplicatedType('vJrwpWtwJgWrhcsFMMfFFhFp')).toBe('p');
    expect(getDuplicatedType('jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL')).toBe('L');
  });

  it('should get the priority', () => {
    expect(getPriority('A')).toBe(27);
    expect(getPriority('a')).toBe(1);
  });

  it('should calculate the sum of priorities of the duplicated types', () => {
    expect(calculateDuplicatePrioritySum(input)).toBe(157);
  });
});
