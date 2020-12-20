/**
 * Passed in input like:
 *
 * 0: 4 1 5
 * 1: 2 3 | 3 2
 * 2: 4 4 | 5 5
 * 3: 4 5 | 5 4
 * 4: "a"
 * 5: "b"
 *
 * It will reduce it into an array of strings to match against
 * @param input
 */
export function buildRules(input: string): string[] {
  let rules = input
    .split('\n')
    .filter((x) => !!x)
    .map((rule) => rule.split(': ')[1])
    .map((rule) => {
      if (rule.startsWith('"')) {
        rule = `${rule.split('"')[1]}`;
      }
      return rule;
    });

  for (let i = 0; i < rules.length; i++) {
    const match = new RegExp(`\\b(${i})\\b`, 'g');
    const replacement = `(${rules[i]})`;
    for (let j = 0; j < rules.length; j++) {
      if (i === j) {
        continue;
      }

      /**
       * Unfortunately JS runs out of memory here when running against the puzzle input.
       *
       * ALSO: Rules are not in order!
       */
      rules[j] = rules[j].replace(match, replacement);
    }
  }

  return rules.map((rule) => rule.replace(/\s/g, ''));
}

// it('should build the rules correctly', () => {
//   const ruleInput = input.split('\n\n')[0];
//   expect(buildRules(ruleInput)).toEqual([
//     '(a)(((a)(a)|(b)(b))((a)(b)|(b)(a))|((a)(b)|(b)(a))((a)(a)|(b)(b)))(b)',
//     '((a)(a)|(b)(b))((a)(b)|(b)(a))|((a)(b)|(b)(a))((a)(a)|(b)(b))',
//     '(a)(a)|(b)(b)',
//     '(a)(b)|(b)(a)',
//     'a',
//     'b',
//   ]);
// });
