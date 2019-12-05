import readlineSync from 'readline-sync';
import { getInstructions, runIntCode } from './lib';

jest.mock('readline-sync');

describe('2019-12-05.2', () => {
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

  describe('Equal', () => {
    const programs = [
      [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
      [3, 3, 1108, -1, 8, 3, 4, 3, 99]
    ];

    programs.forEach(program => {
      test('1 when is equal to 8', () => {
        (readlineSync as any).questionInt.mockImplementation(() => 8);
        runIntCode(program);
        expect(global.console.log).toHaveBeenCalledWith(1);
      });

      test('0 when is not equal to 8', () => {
        (readlineSync as any).questionInt.mockImplementation(() => 2);
        runIntCode(program);
        expect(global.console.log).toHaveBeenCalledWith(0);
      });
    });
  });

  describe('LessThan', () => {
    const programs = [
      [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8],
      [3, 3, 1107, -1, 8, 3, 4, 3, 99]
    ];

    programs.forEach(program => {
      test('1 when is less than 8', () => {
        (readlineSync as any).questionInt.mockImplementation(() => 4);
        runIntCode(program);
        expect(global.console.log).toHaveBeenCalledWith(1);
      });

      test('0 when is not less than 8', () => {
        (readlineSync as any).questionInt.mockImplementation(() => 10);
        runIntCode(program);
        expect(global.console.log).toHaveBeenCalledWith(0);
      });
    });
  });

  describe('Jump', () => {
    const programs = [
      [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9],
      [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1]
    ];

    programs.forEach(program => {
      test('0 when input is zero', () => {
        (readlineSync as any).questionInt.mockImplementation(() => 0);
        runIntCode(program);
        expect(global.console.log).toHaveBeenCalledWith(0);
      });

      test('1 when input is not zero', () => {
        (readlineSync as any).questionInt.mockImplementation(() => 1);
        runIntCode(program);
        expect(global.console.log).toHaveBeenCalledWith(1);
      });
    });
  });

  describe('a bigger program...', () => {
    const programs = [
      [
        3,
        21,
        1008,
        21,
        8,
        20,
        1005,
        20,
        22,
        107,
        8,
        21,
        20,
        1006,
        20,
        31,
        1106,
        0,
        36,
        98,
        0,
        0,
        1002,
        21,
        125,
        20,
        4,
        20,
        1105,
        1,
        46,
        104,
        999,
        1105,
        1,
        46,
        1101,
        1000,
        1,
        20,
        4,
        20,
        1105,
        1,
        46,
        98,
        99
      ]
    ];

    programs.forEach(program => {
      test('999 when input is less than 8', () => {
        (readlineSync as any).questionInt.mockImplementation(() => 7);
        runIntCode(program);
        expect(global.console.log).toHaveBeenCalledWith(999);
      });

      test('1000 when input is equal to 8', () => {
        (readlineSync as any).questionInt.mockImplementation(() => 8);
        runIntCode(program);
        expect(global.console.log).toHaveBeenCalledWith(1000);
      });

      test('1001 when input is greater than 8', () => {
        (readlineSync as any).questionInt.mockImplementation(() => 9);
        runIntCode(program);
        expect(global.console.log).toHaveBeenCalledWith(1001);
      });
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
