import { getBagCount, parseRules } from './lib';

describe('2020-12-07.1', () => {
  const input = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

  it('should parse rules', () => {
    const rules = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
faded blue bags contain no other bags.`;

    const expected = {
      'faded blue': {
        inside: {},
        outside: new Set(),
      },
      'light red': {
        inside: { 'bright white': 1, 'muted yellow': 2 },
        outside: new Set(),
      },
      'bright white': {
        inside: {},
        outside: new Set(['light red', 'dark orange']),
      },
      'muted yellow': {
        inside: {},
        outside: new Set(['light red', 'dark orange']),
      },
      'dark orange': {
        inside: { 'bright white': 3, 'muted yellow': 4 },
        outside: new Set(),
      },
    };

    expect(parseRules(rules)).toEqual(expected);
  });

  it('should work', () => {
    expect(getBagCount(input, 'shiny gold')).toBe(4);
  });
});
