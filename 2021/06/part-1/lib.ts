export function calculateState(input: string, n: number): number[] {
  let state = input.split(',').map(Number);
  for (let i = 0; i < n; i++) {
    state = calculateNextState(state);
  }
  return state;
}

export function calculateNextState(state: number[]): number[] {
  const next: number[] = [];
  const babes: number[] = [];
  for (const num of state) {
    switch (num) {
      case 0:
        next.push(6);
        babes.push(8);
        break;
      default:
        next.push(num - 1);
        break;
    }
  }
  return [...next, ...babes];
}
