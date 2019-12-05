import readlineSync from 'readline-sync';

export enum OpCode {
  Add = 1,
  Multiply = 2,
  Input = 3,
  Output = 4,
  JumpIfTrue = 5,
  JumpIfFalse = 6,
  LessThan = 7,
  Equals = 8,
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
  [OpCode.Add]: (program: number[], pointer: number, modes: number[]) => {
    const input1 = readValue(modes[0], program, pointer + 1);
    const input2 = readValue(modes[1], program, pointer + 2);
    writeValue(program, pointer + 3, input1 + input2);
    return pointer + 4;
  },

  [OpCode.Multiply]: (program: number[], pointer: number, modes: number[]) => {
    const input1 = readValue(modes[0], program, pointer + 1);
    const input2 = readValue(modes[1], program, pointer + 2);
    writeValue(program, pointer + 3, input1 * input2);
    return pointer + 4;
  },

  [OpCode.Input]: (program: number[], pointer: number) => {
    const input = readlineSync.questionInt('Please provide input:');
    writeValue(program, pointer + 1, input);
    return pointer + 2;
  },

  [OpCode.Output]: (program: number[], pointer: number, modes: number[]) => {
    const value = readValue(modes[0], program, pointer + 1);
    console.log(value);
    return pointer + 2;
  },

  [OpCode.JumpIfTrue]: (
    program: number[],
    pointer: number,
    modes: number[]
  ) => {
    const input1 = readValue(modes[0], program, pointer + 1);
    const input2 = readValue(modes[1], program, pointer + 2);
    return input1 === 0 ? pointer + 3 : input2;
  },

  [OpCode.JumpIfFalse]: (
    program: number[],
    pointer: number,
    modes: number[]
  ) => {
    const input1 = readValue(modes[0], program, pointer + 1);
    const input2 = readValue(modes[1], program, pointer + 2);
    return input1 === 0 ? input2 : pointer + 3;
  },

  [OpCode.LessThan]: (program: number[], pointer: number, modes: number[]) => {
    const input1 = readValue(modes[0], program, pointer + 1);
    const input2 = readValue(modes[1], program, pointer + 2);
    writeValue(program, pointer + 3, input1 < input2 ? 1 : 0);
    return pointer + 4;
  },

  [OpCode.Equals]: (program: number[], pointer: number, modes: number[]) => {
    const input1 = readValue(modes[0], program, pointer + 1);
    const input2 = readValue(modes[1], program, pointer + 2);
    writeValue(program, pointer + 3, input1 === input2 ? 1 : 0);
    return pointer + 4;
  },

  [OpCode.Halt]: () => -1
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
