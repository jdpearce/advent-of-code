export const operations = {
  mask: (state, value) => ({ ...state, mask: value }),
  mem: (state, value, loc) => {
    const addresses = bitmask(dtob(Number(loc)), state.mask);
    for (const address of addresses) {
      state.mem[parseInt(address, 2)] = Number(value);
    }
    return state;
  },
};

const start = {
  mask: '',
  mem: {},
};

/**
 * This now returns an array of memory addresses
 * and we have to update each of them with the value (above)
 * @param value
 * @param mask
 */
export function bitmask(value: string, mask: string): string[] {
  if (value.length !== mask.length) {
    throw new Error('uh oh');
  }

  let result = [];
  for (let i = 0; i < value.length; i++) {
    switch (mask[i]) {
      case 'X':
        result[i] = 'X';
        break;

      case '0':
        result[i] = value[i];
        break;

      case '1':
        result[i] = '1';
        break;
    }
  }

  const paths = [];
  getPaths(result, 0, [], paths);
  return paths;
}

/**
 * recurse through the string and build up
 * the array of addresses
 */
export function getPaths(value: string[], index: number, currentPath: string[], paths: string[]) {
  if (index >= value.length) {
    paths.push(currentPath.join(''));
    return;
  }

  if (value[index] === 'X') {
    getPaths(value, index + 1, [...currentPath, '0'], paths);
    getPaths(value, index + 1, [...currentPath, '1'], paths);
  } else {
    getPaths(value, index + 1, [...currentPath, value[index]], paths);
  }
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
  let values = Object.values<number>(state.mem);
  return values.reduce((acc, curr) => (acc += curr), 0);
}
