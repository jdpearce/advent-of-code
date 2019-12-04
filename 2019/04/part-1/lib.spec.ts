import { matchesCriteria } from './lib';

describe('2019-12-04.1', () => {
  const tests = [
    ['111111', true],
    ['223450', false],
    ['123789', false]
  ];

  tests.forEach(([input, expected]: [string, boolean]) => {
    test(`for input ${input} expect ${expected}`, () => {
      expect(matchesCriteria(input)).toEqual(expected);
    });
  });
});
