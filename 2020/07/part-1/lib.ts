export function getBagCount(input: string, color: string): number {
  const rules = parseRules(input);

  const set = new Set();
  countContainers(rules, color, set);

  return set.size;
}

export function parseRules(input: string) {
  const rules = {};

  input
    .split('\n')
    .filter((x) => x)
    .forEach((line) => {
      const [outsideType, contains] = line.split(' bags contain ');

      if (!rules[outsideType]) {
        rules[outsideType] = { inside: {}, outside: new Set() };
      }

      if (contains === 'no other bags.') {
        return;
      }

      contains.split(', ').forEach((quantity) => {
        const [count, adjective, color] = quantity.split(' ');
        const insideType = `${adjective} ${color}`;
        rules[outsideType].inside[insideType] = Number(count);

        if (!rules[insideType]) {
          rules[insideType] = { inside: {}, outside: new Set() };
        }
        rules[insideType].outside.add(outsideType);
      });
    });

  return rules;
}

export function countContainers(rules, color, set) {
  for (const outer of rules[color].outside.keys()) {
    set.add(outer);
    countContainers(rules, outer, set);
  }
}
