import { getInvalidNumbers, getSumInvalidNumbers, getValidationRules } from './lib';

describe('2020-12-16.1', () => {
  const input = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`;

  it('parse input into validators', () => {
    const validatorInput = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50`;

    const validators = getValidationRules(validatorInput);
    expect(validators).toEqual({
      class: [
        [1, 3],
        [5, 7],
      ],
      row: [
        [6, 11],
        [33, 44],
      ],
      seat: [
        [13, 40],
        [45, 50],
      ],
    });
  });

  it('should check ticket against validation rules', () => {
    const rules = {
      class: [
        [1, 3],
        [5, 7],
      ],
      row: [
        [6, 11],
        [33, 44],
      ],
      seat: [
        [13, 40],
        [45, 50],
      ],
    };

    expect(getInvalidNumbers([40, 4, 50], rules)).toEqual([4]);
    expect(getInvalidNumbers([55, 2, 20], rules)).toEqual([55]);
  });

  it('should sum invalid numbers', () => {
    expect(getSumInvalidNumbers(input)).toBe(71);
  });
});
