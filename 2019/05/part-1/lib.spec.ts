import readlineSync from 'readline-sync';
import { getInstructions, runIntCode } from './lib';

jest.mock('readline-sync');

describe('2019-12-05.1', () => {
  const tests = [
    [
      [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50],
      [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]
    ],
    [
      [1, 0, 0, 0, 99],
      [2, 0, 0, 0, 99]
    ],
    [
      [2, 3, 0, 3, 99],
      [2, 3, 0, 6, 99]
    ],
    [
      [2, 4, 4, 5, 99, 0],
      [2, 4, 4, 5, 99, 9801]
    ],
    [
      [1, 1, 1, 4, 99, 5, 6, 0, 99],
      [30, 1, 1, 4, 2, 5, 6, 0, 99]
    ]
  ];

  beforeEach(() => {
    jest.spyOn(global.console, 'log').mockImplementation(() => {});
  });

  tests.forEach(([input, expected]) => {
    test(`for input ${input} expect ${expected}`, () => {
      expect(runIntCode(input)).toEqual(expected);
    });
  });

  describe('Input and Output', () => {
    const program = [3, 0, 4, 0, 99];

    test('outputs the input', () => {
      const input = 5;
      (readlineSync as any).questionInt.mockImplementation(() => input);
      runIntCode(program);
      expect(global.console.log).toHaveBeenCalledWith(input);
    });
  });

  describe('getInstructions', () => {
    test('should convert value to instructions', () => {
      const input = 1002;

      expect(getInstructions(input)).toEqual({
        opCode: 2,
        modes: [0, 1, 0]
      });
    });
  });
});
