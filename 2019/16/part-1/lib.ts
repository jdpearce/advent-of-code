export function calculateFFT(input: number[]): number[] {
  const output = [];

  for (let i = 0; i < input.length; i++) {
    let value: number = 0;
    for (let j = 0; j < input.length; j++) {
      value += input[j] * getMultiplier(i + 1, j);
    }
    output[i] = Math.abs(value) % 10;
  }

  return output;
}

const BASE_PATTERN = [0, 1, 0, -1];

const getMultiplier = (repeat: number, index: number) => {
  return BASE_PATTERN[Math.floor(((index + 1) % (4 * repeat)) / repeat)];
};

export function calculateFFTPhase(input: number[], phase: number): number[] {
  let output: number[] = [...input];
  for (let i = 0; i < phase; i++) {
    output = calculateFFT(output);
  }
  return output;
}
