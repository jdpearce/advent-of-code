/**
 * For a sliding window of size 3 in A, B, C, D
 *
 *     B + C + D
 * is greater than
 * A + B + C
 *  only if D is greater than A
 *
 * So we can just check the numbers that aren't in both windows.
 */
export function countSlidingWindowIncreases(nums: number[], windowSize: number): number {
  let count = 0;
  for (let i = windowSize; i < nums.length; i++) {
    if (nums[i] > nums[i - windowSize]) {
      count++;
    }
  }
  return count;
}
