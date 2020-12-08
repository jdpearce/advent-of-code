import { runCode } from '../part-1/lib';

export function findTerminatingChange(input: string): number {
  const instructions = input.split('\n').filter((i) => i);

  let i = 0;
  for (; i < instructions.length; i++) {
    const [op, value] = instructions[i].split(' ');
    if (op === 'acc') {
      continue;
    }

    let modified = [...instructions];
    modified.splice(i, 1, `${op === 'nop' ? 'jmp' : 'nop'} ${value}`);

    const result = runCode(modified.join('\n'));
    if (result.terminated) {
      return result.accumulator;
    }
  }

  throw new Error('should not get here');
}
