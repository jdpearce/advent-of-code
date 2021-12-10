import { getFileCompletionMiddleScore } from './lib';

describe('2021-12-10.2', () => {
  const input = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;

  it('calculate the completion score for uncorrupted lines', () => {
    expect(getFileCompletionMiddleScore(input)).toBe(288957);
  });
});
