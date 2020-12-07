import { Rules } from '../part-1/lib';

export function countInside(rules: Rules, color: string): number {
  let total = 1;
  for (const inner of Object.keys(rules[color].inside)) {
    const count = rules[color].inside[inner];
    total += count * countInside(rules, inner);
  }
  return total;
}
