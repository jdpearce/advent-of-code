export function getBagCount(input: string, color: string): number {
  const rules = parseRules(input);

  const set = new Set<string>();
  countContainers(rules, color, set);

  return set.size;
}

export interface Rules {
  [color: string]: { inside: { [color: string]: number }; outside: Set<string> };
}

export function parseRules(input: string): Rules {
  const rules: Rules = {};

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

export function countContainers(rules: Rules, color: string, set: Set<string>) {
  for (const outer of rules[color].outside.keys()) {
    set.add(outer);
    countContainers(rules, outer, set);
  }
}
