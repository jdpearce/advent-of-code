import { calculateFFT, calculateFFTPhase } from './lib';

describe('Flawed Frequency Transmission algorithm', () => {
  const tests100 = [
    [`80871224585914546619083218645595`, `24176176`],
    [`19617804207202209144916044189917`, `73745418`],
    [`69317163492948606335995924319873`, `52432133`]
  ];

  tests100.forEach(([input, expected]) => {
    test(`for input ${input} expect ${expected}`, () => {
      const numbers = input.split('').map(Number);
      expect(
        calculateFFTPhase(numbers, 100)
          .join('')
          .substr(0, 8)
      ).toEqual(expected);
    });
  });

  const tests1 = [
    ['12345678', '48226158'],
    ['48226158', '34040438'],
    ['34040438', '03415518'],
    ['03415518', '01029498']
  ];

  tests1.forEach(([input, expected]) => {
    test(`for input ${input} expect ${expected}`, () => {
      const numbers = input.split('').map(Number);
      expect(calculateFFT(numbers).join('')).toEqual(expected);
    });
  });
});
