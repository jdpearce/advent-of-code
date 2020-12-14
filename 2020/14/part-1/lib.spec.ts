import { dtob, operations, runProgram, sumValues } from './lib';

describe('2020-12-14.1', () => {
  const input = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`;

  it('should set the values correctly', () => {
    const mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X';
    expect(operations.mask({ mask: '', mem: {} }, mask)).toEqual({
      mask: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
      mem: {},
    });
  });

  it('should convert decimal to binary', () => {
    expect(dtob(11)).toEqual('000000000000000000000000000000001011');
    expect(dtob(101)).toEqual('000000000000000000000000000001100101');
  });

  it('should apply the mask properly', () => {
    const state = { mask: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X', mem: {} };

    let result = operations.mem(state, 11, 8);
    expect(result).toEqual({
      mask: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
      mem: {
        8: '000000000000000000000000000001001001',
      },
    });
  });

  it('should run the program', () => {
    const result = runProgram(input);
    expect(result).toEqual({
      mask: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
      mem: {
        7: '000000000000000000000000000001100101',
        8: '000000000000000000000000000001000000',
      },
    });
  });

  it('should sum the values properly', () => {
    const output = {
      mask: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
      mem: {
        7: '000000000000000000000000000001100101',
        8: '000000000000000000000000000001000000',
      },
    };

    expect(sumValues(output)).toBe(165);
  });
});
