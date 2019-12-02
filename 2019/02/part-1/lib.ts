export enum OpCode {
  Add = 1,
  Multiply = 2,
  Halt = 99
}

export function runIntCode(program: number[]): number[] {
  let i = 0;
  while (true) {
    const opCode = program[i];
    const input1 = program[program[i + 1]];
    const input2 = program[program[i + 2]];
    let destination = program[i + 3];
    switch (opCode) {
      case OpCode.Add:
        program[destination] = input1 + input2;
        i += 4;
        continue;
      case OpCode.Multiply:
        program[destination] = input1 * input2;
        i += 4;
        continue;
      case OpCode.Halt:
        break;
    }
    break;
  }
  return program;
}
