import { getInstructions, ProgramState, runIntCode } from './lib';

describe('2019-12-07.1', () => {
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

  tests.forEach(([program, expected]) => {
    test(`for input ${program} expect ${expected}`, () => {
      const state: ProgramState = {
        program: [...program],
        pointer: 0,
        input: [],
        output: [],
        modes: []
      };
      expect(runIntCode(state).program).toEqual(expected);
    });
  });

  describe('Equal', () => {
    const programs = [
      [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
      [3, 3, 1108, -1, 8, 3, 4, 3, 99]
    ];

    programs.forEach(program => {
      test('1 when is equal to 8', () => {
        const state: ProgramState = {
          program: [...program],
          pointer: 0,
          input: [8],
          output: [],
          modes: []
        };
        runIntCode(state);
        expect(state.output).toEqual([1]);
        expect(state.input).toEqual([]);
      });

      test('0 when is not equal to 8', () => {
        const state: ProgramState = {
          program: [...program],
          pointer: 0,
          input: [2],
          output: [],
          modes: []
        };
        runIntCode(state);
        expect(state.output).toEqual([0]);
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
        const state: ProgramState = {
          program: [...program],
          pointer: 0,
          input: [4],
          output: [],
          modes: []
        };
        runIntCode(state);
        expect(state.output).toEqual([1]);
      });

      test('0 when is not less than 8', () => {
        const state: ProgramState = {
          program: [...program],
          pointer: 0,
          input: [10],
          output: [],
          modes: []
        };
        runIntCode(state);
        expect(state.output).toEqual([0]);
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
        const state: ProgramState = {
          program: [...program],
          pointer: 0,
          input: [0],
          output: [],
          modes: []
        };
        runIntCode(state);
        expect(state.output).toEqual([0]);
      });

      test('1 when input is not zero', () => {
        const state: ProgramState = {
          program: [...program],
          pointer: 0,
          input: [1],
          output: [],
          modes: []
        };
        runIntCode(state);
        expect(state.output).toEqual([1]);
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
        const state: ProgramState = {
          program: [...program],
          pointer: 0,
          input: [7],
          output: [],
          modes: []
        };
        runIntCode(state);
        expect(state.output).toEqual([999]);
      });

      test('1000 when input is equal to 8', () => {
        const state: ProgramState = {
          program: [...program],
          pointer: 0,
          input: [8],
          output: [],
          modes: []
        };
        runIntCode(state);
        expect(state.output).toEqual([1000]);
      });

      test('1001 when input is greater than 8', () => {
        const state: ProgramState = {
          program: [...program],
          pointer: 0,
          input: [9],
          output: [],
          modes: []
        };
        runIntCode(state);
        expect(state.output).toEqual([1001]);
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
