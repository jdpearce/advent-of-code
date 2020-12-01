export function findThreeNumbersSummingTo(input: number[], sum: number): number[] {
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      if (input[i] + input[j] > sum) {
        continue;
      }

      for (let k = j + 1; k < input.length; k++) {
        if (input[i] + input[j] + input[k] === sum) {
          return [input[i], input[j], input[k]];
        }
      }
    }
  }
}
