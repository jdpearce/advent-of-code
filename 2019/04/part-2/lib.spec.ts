import { matchesNewCriteria } from './lib';

describe('2019-12-04.1', () => {
  const tests = [
    ['112233', true],
    ['123444', false],
    ['111122', true]
  ];

  tests.forEach(([input, expected]: [string, boolean]) => {
    test(`for input ${input} expect ${expected}`, () => {
      expect(matchesNewCriteria(input)).toEqual(expected);
    });
  });
});
