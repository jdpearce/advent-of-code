export function calculateState(input: string, n: number): number[] {
  let fishes = input.split(',').map(Number);

  let state: number[] = [];
  for (const fish of fishes) {
    state[fish] = (state[fish] || 0) + 1;
  }

  for (let i = 0; i < n; i++) {
    state = calculateNextState(state);
  }
  return state;
}

export function calculateNextState(state: number[]): number[] {
  const next: number[] = [];
  next[8] = state[0] || 0;
  next[7] = state[8] || 0;
  next[6] = (state[0] || 0) + (state[7] || 0);
  for (let i = 1; i < 7; i++) {
    next[i - 1] = state[i] || 0;
  }
  return next;
}

export function calculateNumberOfFish(state: number[]): number {
  return state.reduce((sum, curr) => sum + curr, 0);
}
