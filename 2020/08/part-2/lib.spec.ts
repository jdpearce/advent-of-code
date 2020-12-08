import { findTerminatingChange } from './lib';

describe('2020-12-08.2', () => {
  const input = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

  it('should identify instruction to terminate the program and return accumulator', () => {
    expect(findTerminatingChange(input)).toBe(8);
  });
});
