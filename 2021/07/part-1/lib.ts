export function calculateBestUseOfFuel(input: string): number {
  const nums = input
    .split(',')
    .map(Number)
    .sort((a, b) => a - b);

  const medianIndex = nums.length / 2;
  if ((nums.length - 1) % 2 === 0) {
    return calculateFuelUsed(nums, nums[medianIndex]);
  } else {
    const f1 = calculateFuelUsed(nums, nums[Math.ceil(medianIndex)]);
    const f2 = calculateFuelUsed(nums, nums[Math.floor(medianIndex)]);

    return Math.min(f1, f2);
  }
}

// Brute Force method
export function calculateBestUseOfFuel_BruteForce(input: string): number {
  const nums = input.split(',').map(Number).sort();
  const max = nums[nums.length - 1];
  const min = nums[0];

  let best: { fuelUsed: number; position: number };

  for (let i = min; i < max; i++) {
    let fuelUsed = 0;
    for (const num of nums) {
      fuelUsed += Math.abs(i - num);
    }

    if (i === min || fuelUsed < best.fuelUsed) {
      best = { fuelUsed, position: i };
    }
  }

  return best.fuelUsed;
}

export function calculateFuelUsed(nums: number[], destination: number): number {
  return nums.reduce((acc, curr) => acc + Math.abs(destination - curr), 0);
}
