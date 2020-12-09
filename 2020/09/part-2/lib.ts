export function findContiguousRange(input: number[], target: number): number[] {
  let start = 0;
  let end = 0;
  let sum = 0;
  let found = false;

  for (end = start; end < input.length; end++) {
    if (sum === target) {
      found = true;
      break;
    }

    sum += input[end];

    if (sum > target) {
      sum -= input[start];
      start++;
      for (; end > start && sum > target; end--) {
        sum -= input[end];
      }
    }
  }

  return input.slice(start, end);
}
