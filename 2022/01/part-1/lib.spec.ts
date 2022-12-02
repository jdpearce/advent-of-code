import { getCalorieCounts, sortDescending } from './lib';

describe('2022-12-01.1', () => {
  const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

  it('should find elf calories', () => {
    const totals = getCalorieCounts(input);
    expect(totals).toEqual([6000, 4000, 11000, 24000]);
  });

  it('should get the largets calorie total', () => {
    const totals = getCalorieCounts(input);
    const largest = totals.sort(sortDescending)[0];
    expect(largest).toBe(24000);
  });
});
