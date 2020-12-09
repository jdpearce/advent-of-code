export function findContiguousRange(input: number[], target: number): number[] {
  let start = 0;
  let end = 0;
  let sum = 0;
  let found = false;
  while (!found) {
    if (start === end && end === input.length - 1) {
      throw Error('argh');
    }

    sum = 0;
    for (end = start; end < input.length; end++) {
      sum += input[end];
      if (sum === target) {
        found = true;
        break;
      }
      if (sum > target) {
        start++;
        break;
      }
    }
  }
  return input.slice(start, end + 1);
}
