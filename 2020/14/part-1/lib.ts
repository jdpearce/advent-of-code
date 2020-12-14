export const operations = {
  mask: (state, value) => ({ ...state, mask: value }),
  mem: (state, value, loc) => ({
    ...state,
    mem: {
      ...state.mem,
      [loc]: bitmask(dtob(Number(value)), state.mask),
    },
  }),
};

const start = {
  mask: '',
  mem: {},
};

export function bitmask(value: string, mask: string): string {
  if (value.length !== mask.length) {
    throw new Error('uh oh');
  }

  let result = [];
  for (let i = 0; i < value.length; i++) {
    if (mask[i] === 'X') {
      result[i] = value[i];
      continue;
    } else {
      result[i] = mask[i];
    }
  }

  return result.join('');
}

const base = '000000000000000000000000000000000000';
export function dtob(input: number): string {
  const asString = input.toString(2);
  return base.slice(0, base.length - asString.length) + asString;
}

export function runProgram(input: string) {
  const lines = input.split('\n').filter((x) => x);
  let state = { ...start };
  for (const line of lines) {
    const [instruction, value] = line.split(' = ');
    const [op, loc] = instruction.split(/[\[\]]/);
    state = operations[op](state, value, Number(loc));
  }
  return state;
}

export function sumValues(state): number {
  let values = Object.values<string>(state.mem).map((x: string) => parseInt(x, 2));
  return values.reduce((acc, curr) => (acc += curr), 0);
}
