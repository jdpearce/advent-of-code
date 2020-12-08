const operations = {
  nop: (accumulator, index, value) => ({ accumulator, index: index + 1 }),
  jmp: (accumulator, index, value) => ({ accumulator, index: index + Number(value) }),
  acc: (accumulator, index, value) => ({
    accumulator: accumulator + Number(value),
    index: index + 1,
  }),
};

export function runCode(
  input: string
): { accumulator: number; index: number; terminated: boolean } {
  let accumulator = 0;

  let instructions = input.split('\n').filter((i) => i);

  const visited = new Set<number>();
  let index = 0;
  let terminated = false;
  while (true) {
    if (index === instructions.length) {
      terminated = true;
      break;
    }

    if (visited.has(index)) {
      break;
    }
    visited.add(index);

    const [op, value] = instructions[index].split(' ');
    let result = operations[op](accumulator, index, value);
    accumulator = result.accumulator;
    index = result.index;
  }

  return { accumulator, index, terminated };
}
