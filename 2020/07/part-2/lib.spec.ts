import { parseRules } from '../part-1/lib';
import { countInside } from './lib';

describe('2020-12-07.2', () => {
  const input = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`;

  it('should count the inside bags', () => {
    const rules = parseRules(input);
    expect(countInside(rules, 'shiny gold') - 1).toBe(126);
  });
});
