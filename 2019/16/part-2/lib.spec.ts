import { calculateMessage } from './lib';

describe('real decoding?', () => {
  const tests = [
    [`03036732577212944063491565474664`, `84462026`],
    [`02935109699940807407585447034323`, `78725270`],
    [`03081770884921959731165446850517`, `53553731`]
  ];

  tests.forEach(([input, expected]) => {
    test(`for input ${input} expect ${expected}`, () => {
      const numbers = input.split('').map(Number);
      expect(calculateMessage(numbers)).toEqual(expected);
    });
  });
});
