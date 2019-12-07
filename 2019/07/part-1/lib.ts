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

export interface ProgramState {
  pointer: number;
  program: number[];
  output: number[];
  input: number[];
  modes: number[];
}

export const opCodeFunctions: {
  [code in OpCode]: (state: ProgramState) => void;
} = {
  [OpCode.Add]: (state: ProgramState) => {
    const input1 = readValue(state.modes[0], state.program, state.pointer + 1);
    const input2 = readValue(state.modes[1], state.program, state.pointer + 2);
    writeValue(state.program, state.pointer + 3, input1 + input2);
    state.pointer += 4;
  },

  [OpCode.Multiply]: (state: ProgramState) => {
    const input1 = readValue(state.modes[0], state.program, state.pointer + 1);
    const input2 = readValue(state.modes[1], state.program, state.pointer + 2);
    writeValue(state.program, state.pointer + 3, input1 * input2);
    state.pointer += 4;
  },

  [OpCode.Input]: (state: ProgramState) => {
    const input = state.input.pop();
    writeValue(state.program, state.pointer + 1, input);
    state.pointer += 2;
  },

  [OpCode.Output]: (state: ProgramState) => {
    const value = readValue(state.modes[0], state.program, state.pointer + 1);
    state.output.push(value);
    state.pointer += 2;
  },

  [OpCode.JumpIfTrue]: (state: ProgramState) => {
    const input1 = readValue(state.modes[0], state.program, state.pointer + 1);
    const input2 = readValue(state.modes[1], state.program, state.pointer + 2);
    state.pointer = input1 === 0 ? state.pointer + 3 : input2;
  },

  [OpCode.JumpIfFalse]: (state: ProgramState) => {
    const input1 = readValue(state.modes[0], state.program, state.pointer + 1);
    const input2 = readValue(state.modes[1], state.program, state.pointer + 2);
    state.pointer = input1 === 0 ? input2 : state.pointer + 3;
  },

  [OpCode.LessThan]: (state: ProgramState) => {
    const input1 = readValue(state.modes[0], state.program, state.pointer + 1);
    const input2 = readValue(state.modes[1], state.program, state.pointer + 2);
    writeValue(state.program, state.pointer + 3, input1 < input2 ? 1 : 0);
    state.pointer += 4;
  },

  [OpCode.Equals]: (state: ProgramState) => {
    const input1 = readValue(state.modes[0], state.program, state.pointer + 1);
    const input2 = readValue(state.modes[1], state.program, state.pointer + 2);
    writeValue(state.program, state.pointer + 3, input1 === input2 ? 1 : 0);
    state.pointer += 4;
  },

  [OpCode.Halt]: (state: ProgramState) => (state.pointer = -1)
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

export function runIntCode(state: ProgramState): ProgramState {
  while (state.pointer >= 0) {
    const instruction = getInstructions(state.program[state.pointer]);
    state.modes = instruction.modes;
    opCodeFunctions[instruction.opCode](state);
  }
  return state;
}
