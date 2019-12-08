import {
  getInstructions,
  ProgramState,
  runIntCode,
  tryPermutation
} from './lib';

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
      const state = new ProgramState([...program]);
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
        const state = new ProgramState([...program]);
        state.input.push(8);
        runIntCode(state);
        expect(state.output).toEqual([1]);
        expect(state.input).toEqual([]);
      });

      test('0 when is not equal to 8', () => {
        const state = new ProgramState([...program]);
        state.input.push(2);
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
        const state = new ProgramState([...program]);
        state.input.push(4);
        runIntCode(state);
        expect(state.output).toEqual([1]);
      });

      test('0 when is not less than 8', () => {
        const state = new ProgramState([...program]);
        state.input.push(10);
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
        const state = new ProgramState([...program]);
        state.input.push(0);
        runIntCode(state);
        expect(state.output).toEqual([0]);
      });

      test('1 when input is not zero', () => {
        const state = new ProgramState([...program]);
        state.input.push(1);
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
        const state = new ProgramState([...program]);
        state.input.push(7);
        runIntCode(state);
        expect(state.output).toEqual([999]);
      });

      test('1000 when input is equal to 8', () => {
        const state = new ProgramState([...program]);
        state.input.push(8);
        runIntCode(state);
        expect(state.output).toEqual([1000]);
      });

      test('1001 when input is greater than 8', () => {
        const state = new ProgramState([...program]);
        state.input.push(9);
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

  describe('tryPermutation', () => {
    test('phase setting 98765 gives 139629729', () => {
      const program = [
        3,
        26,
        1001,
        26,
        -4,
        26,
        3,
        27,
        1002,
        27,
        2,
        27,
        1,
        27,
        26,
        27,
        4,
        27,
        1001,
        28,
        -1,
        28,
        1005,
        28,
        6,
        99,
        0,
        0,
        5
      ];
      const actual = tryPermutation(program, [9, 8, 7, 6, 5]);
      expect(actual).toBe(139629729);
    });

    test('phase setting 97856 gives 18216', () => {
      const program = [
        3,
        52,
        1001,
        52,
        -5,
        52,
        3,
        53,
        1,
        52,
        56,
        54,
        1007,
        54,
        5,
        55,
        1005,
        55,
        26,
        1001,
        54,
        -5,
        54,
        1105,
        1,
        12,
        1,
        53,
        54,
        53,
        1008,
        54,
        0,
        55,
        1001,
        55,
        1,
        55,
        2,
        53,
        55,
        53,
        4,
        53,
        1001,
        56,
        -1,
        56,
        1005,
        56,
        6,
        99,
        0,
        0,
        0,
        0,
        10
      ];
      const actual = tryPermutation(program, [9, 7, 8, 5, 6]);
      expect(actual).toBe(18216);
    });
  });
});
