/**
 * Given input like:
 * 0: 1 2
 * 1: 2 3 | 3 2
 * 2: a
 * 3: b
 *
 * It will parse it to a dictionary like:
 *
 * 0 => [[1, 2]]
 * 1 => [[2, 3], [3, 2]]
 * 2 => a
 * 3 => b
 * @param input
 */

export function parseRules(input: string): Map<number, string | number[][]> {
  const rules = input.split('\n').filter((x) => x);

  const map = new Map<number, string | number[][]>();
  for (let rule of rules) {
    const [n, r] = rule.split(': ');
    const index = Number(n);
    if (!r.startsWith('"')) {
      map.set(
        index,
        r.split(' | ').map((part) => part.split(' ').map(Number))
      );
      map[index] = r.split(' | ').map((part) => part.split(' ').map(Number));
    } else {
      map.set(index, r[1]);
    }
  }

  return map;
}

export function checkString(
  map: Map<number, string | number[][]>,
  s: string,
  rules: number[]
): boolean {
  if (s === '' || rules.length === 0) {
    return s === '' && rules.length === 0;
  }

  const r = map.get(rules[0]);
  if (typeof r === 'string') {
    if (s[0] === r) {
      return checkString(map, s.substr(1), rules.slice(1));
    }

    return false;
  }

  // expand the left-most rule
  const toCheck = r.map((x) => [...x, ...rules.slice(1)]);
  return toCheck.map((expanded) => checkString(map, s, expanded)).some((x: boolean) => x);
}
