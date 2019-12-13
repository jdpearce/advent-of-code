export enum OpCode {
  Add = 1,
  Multiply = 2,
  Input = 3,
  Output = 4,
  JumpIfTrue = 5,
  JumpIfFalse = 6,
  LessThan = 7,
  Equals = 8,
  RelativeBaseOffset = 9,
  Halt = 99
}

export enum ParameterMode {
  Position = 0,
  Immediate = 1,
  Relative = 2
}

export const readValue = (state: ProgramState, param: number): number => {
  const mode = state.next.modes[param - 1];
  const paramValue = state.program[state.pointer + param];
  switch (mode) {
    case ParameterMode.Position:
      if (state.program[paramValue] === undefined) {
        state.program[paramValue] = 0;
      }
      return state.program[paramValue];
    case ParameterMode.Immediate:
      return paramValue;
    case ParameterMode.Relative:
      if (state.program[paramValue + state.relativeBase] === undefined) {
        state.program[paramValue + state.relativeBase] = 0;
      }
      return state.program[paramValue + state.relativeBase];
  }
};

export const writeValue = (
  state: ProgramState,
  param: number,
  value: number
) => {
  const mode = state.next.modes[param - 1];
  const paramValue = state.program[state.pointer + param];
  switch (mode) {
    case ParameterMode.Position:
      state.program[paramValue] = value;
      break;
    case ParameterMode.Relative:
      state.program[paramValue + state.relativeBase] = value;
      break;
  }
};

export class ProgramState {
  pointer: number = 0;
  output: number[] = [];
  input: number[] = [];
  relativeBase: number = 0;
  next?: {
    opCode: OpCode;
    modes: number[];
  };

  constructor(public program: number[]) {
    this.next = this.getNextInstruction();
  }

  tick() {
    const opCode = this.next.opCode;
    opCodeFunctions[opCode](this);
    if (opCode !== OpCode.Halt) {
      this.next = this.getNextInstruction();
    }
  }

  getNextInstruction(): { opCode: number; modes: number[] } {
    const str = this.program[this.pointer].toString();
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

  get hasNotHalted(): boolean {
    return this.next.opCode !== OpCode.Halt;
  }
}

export const opCodeFunctions: {
  [code in OpCode]: (state: ProgramState) => void;
} = {
  [OpCode.Add]: (state: ProgramState) => {
    const input1 = readValue(state, 1);
    const input2 = readValue(state, 2);
    writeValue(state, 3, input1 + input2);
    state.pointer += 4;
  },

  [OpCode.Multiply]: (state: ProgramState) => {
    const input1 = readValue(state, 1);
    const input2 = readValue(state, 2);
    writeValue(state, 3, input1 * input2);
    state.pointer += 4;
  },

  [OpCode.Input]: (state: ProgramState) => {
    const input = state.input.pop();
    writeValue(state, 1, input);
    state.pointer += 2;
  },

  [OpCode.Output]: (state: ProgramState) => {
    const value = readValue(state, 1);
    state.output.push(value);
    state.pointer += 2;
  },

  [OpCode.JumpIfTrue]: (state: ProgramState) => {
    const input1 = readValue(state, 1);
    const input2 = readValue(state, 2);
    state.pointer = input1 === 0 ? state.pointer + 3 : input2;
  },

  [OpCode.JumpIfFalse]: (state: ProgramState) => {
    const input1 = readValue(state, 1);
    const input2 = readValue(state, 2);
    state.pointer = input1 === 0 ? input2 : state.pointer + 3;
  },

  [OpCode.LessThan]: (state: ProgramState) => {
    const input1 = readValue(state, 1);
    const input2 = readValue(state, 2);
    writeValue(state, 3, input1 < input2 ? 1 : 0);
    state.pointer += 4;
  },

  [OpCode.Equals]: (state: ProgramState) => {
    const input1 = readValue(state, 1);
    const input2 = readValue(state, 2);
    writeValue(state, 3, input1 === input2 ? 1 : 0);
    state.pointer += 4;
  },

  [OpCode.RelativeBaseOffset]: (state: ProgramState) => {
    const input1 = readValue(state, 1);
    state.relativeBase += input1;
    state.pointer += 2;
  },

  [OpCode.Halt]: (state: ProgramState) => (state.pointer = -1)
};
