export function findTwoNumbersSummingTo(input: number[], sum: number): number[] {
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      if (input[i] + input[j] === sum) {
        return [input[i], input[j]];
      }
    }
  }
}
