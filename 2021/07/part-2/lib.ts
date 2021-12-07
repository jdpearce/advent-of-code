/**
 * Lets try using the mean
 * @param input
 * @returns
 */
export function calculateBestUseOfFuel(input: string): number {
  const nums = input.split(',').map(Number).sort();

  const mean = nums.reduce((acc, curr) => acc + curr, 0) / nums.length;

  const f1 = calculateFuelUsed(nums, Math.ceil(mean));
  const f2 = calculateFuelUsed(nums, Math.floor(mean));

  return Math.min(f1, f2);
}

export function calculateBestUseOfFuel_BruteForce(input: string): number {
  const nums = input.split(',').map(Number).sort();
  const max = nums[nums.length - 1];
  const min = nums[0];

  let best: { fuelUsed: number; position: number };
  for (let i = min; i < max; i++) {
    let fuelUsed = calculateFuelUsed(nums, i);
    if (i === min || fuelUsed < best.fuelUsed) {
      best = { fuelUsed, position: i };
    }
  }

  return best.fuelUsed;
}

/**
 * now using an arithmetic sequence for fuel consumption
 * sum to n terms in series 1, 2, 3, 4, 5....n
 * is (n/2)(1 + n)
 *
 * These are the Triangular Numbers - https://en.wikipedia.org/wiki/Triangular_number
 */
export function calculateFuelUsed(nums: number[], destination: number): number {
  return nums.reduce((acc, curr) => {
    const n = Math.abs(destination - curr);
    acc += (n / 2) * (1 + n);
    return acc;
  }, 0);
}
