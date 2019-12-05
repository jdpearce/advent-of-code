import * as readlineSync from 'readline-sync';

export enum OpCode {
  Add = 1,
  Multiply = 2,
  Input = 3,
  Output = 4,
  Halt = 99
}

export enum ParameterMode {
  Position = 0,
  Immediate = 1
}

const isImmediate = (mode: ParameterMode) => mode === ParameterMode.Immediate;
const readValue = (
  mode: ParameterMode,
  program: number[],
  pointer: number
): number => (isImmediate(mode) ? program[pointer] : program[program[pointer]]);
const writeValue = (program: number[], pointer: number, value: number) => {
  program[program[pointer]] = value;
};

export const opCodeFunctions: {
  [code in OpCode]: (
    program: number[],
    pointer: number,
    modes: ParameterMode[]
  ) => number;
} = {
  1: (program: number[], pointer: number, modes: number[]) => {
    const input1 = readValue(modes[0], program, pointer + 1);
    const input2 = readValue(modes[1], program, pointer + 2);
    writeValue(program, pointer + 3, input1 + input2);
    return pointer + 4;
  },

  2: (program: number[], pointer: number, modes: number[]) => {
    const input1 = readValue(modes[0], program, pointer + 1);
    const input2 = readValue(modes[1], program, pointer + 2);
    writeValue(program, pointer + 3, input1 * input2);
    return pointer + 4;
  },

  3: (program: number[], pointer: number) => {
    const input = readlineSync.questionInt('Please provide input:'); // TODO : not testable as is...
    writeValue(program, pointer + 1, input);
    return pointer + 2;
  },

  4: (program: number[], pointer: number, modes: number[]) => {
    const value = readValue(modes[0], program, pointer + 1);
    console.log(value);
    return pointer + 2;
  },

  99: () => -1
};

export function getInstructions(
  num: number
): { opCode: number; modes: number[] } {
  const str = num.toString();
  const opCode = Number(str.substr(-2));
  let modes = [0, 0, 0];
  if (str.length > 2) {
    modes = str
      .substr(0, str.length - 2)
      .split('')
      .map(Number)
      .reverse();
    while (modes.length < 3) {
      modes.push(0);
    }
  }
  return { opCode, modes };
}

export function runIntCode(program: number[]): number[] {
  let i = 0;
  while (i >= 0) {
    const instruction = getInstructions(program[i]);
    i = opCodeFunctions[instruction.opCode](program, i, instruction.modes);
  }
  return program;
}
