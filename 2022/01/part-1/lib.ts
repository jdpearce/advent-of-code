export function getCalorieCounts(input: string): number[] {
  const totals: number[] = [];

  const calories = input.split('\n').map((line) => Number(line));
  var current = 0;
  for (const calorie of calories) {
    if (calorie === 0) {
      totals.push(current);
      current = 0;
    } else {
      current += calorie;
    }
  }

  return totals;
}

export const sortDescending = (a: number, b: number): number => b - a;
