import { runCode } from './lib';

describe('2020-12-08.1', () => {
  const input = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

  it('should recognise an infinite loop where acc = 5', () => {
    expect(runCode(input)).toBe(5);
  });
});
