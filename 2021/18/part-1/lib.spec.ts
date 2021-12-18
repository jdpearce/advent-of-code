import {
  addLeft,
  addRight,
  addSnailNumbers,
  explodePairOrNumber,
  magnitude,
  parsePairOrNumber,
  printPairOrNumber,
  reduceSnailNumber,
  splitPairOrNumber,
} from './lib';

describe('2021-12-18.1', () => {
  it('should parse and the print', () => {
    const snailNumber = `[[[[1,1],[2,2]],[3,3]],[4,4]]`;
    const parsed = parsePairOrNumber(JSON.parse(snailNumber));
    expect(printPairOrNumber(parsed)).toBe(snailNumber);
  });

  it('should add left properly', () => {
    let snailNumber = '[1,2]';
    let parsed = parsePairOrNumber(JSON.parse(snailNumber));
    let result = addLeft(parsed, 1);
    expect(printPairOrNumber(result)).toBe(`[2,2]`);

    snailNumber = '[[1,2],3]';
    parsed = parsePairOrNumber(JSON.parse(snailNumber));
    result = addLeft(parsed, 1);
    expect(printPairOrNumber(result)).toBe(`[[2,2],3]`);

    snailNumber = '[[[1, 2],3],4]';
    parsed = parsePairOrNumber(JSON.parse(snailNumber));
    result = addLeft(parsed, 1);
    expect(printPairOrNumber(result)).toBe(`[[[2,2],3],4]`);
  });

  it('should add right properly', () => {
    let snailNumber = '[1,2]';
    let parsed = parsePairOrNumber(JSON.parse(snailNumber));
    let result = addRight(parsed, 1);
    expect(printPairOrNumber(result)).toBe(`[1,3]`);

    snailNumber = '[1,[2,3]]';
    parsed = parsePairOrNumber(JSON.parse(snailNumber));
    result = addRight(parsed, 1);
    expect(printPairOrNumber(result)).toBe(`[1,[2,4]]`);

    snailNumber = '[1,[2,[3,4]]]';
    parsed = parsePairOrNumber(JSON.parse(snailNumber));
    result = addRight(parsed, 1);
    expect(printPairOrNumber(result)).toBe(`[1,[2,[3,5]]]`);
  });

  it('should explode a number properly', () => {
    let snailNumber = `[[[[[9,8],1],2],3],4]`;
    let parsed = parsePairOrNumber(JSON.parse(snailNumber));
    let [exploded, left, right, result] = explodePairOrNumber(parsed);
    expect(printPairOrNumber(result)).toBe(`[[[[0,9],2],3],4]`);

    snailNumber = `[7,[6,[5,[4,[3,2]]]]]`;
    parsed = parsePairOrNumber(JSON.parse(snailNumber));
    [exploded, left, right, result] = explodePairOrNumber(parsed);
    expect(printPairOrNumber(result)).toBe(`[7,[6,[5,[7,0]]]]`);

    snailNumber = `[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]`;
    parsed = parsePairOrNumber(JSON.parse(snailNumber));
    [exploded, left, right, result] = explodePairOrNumber(parsed);
    expect(printPairOrNumber(result)).toBe(`[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]`);
  });

  it('should split a number properly', () => {
    let snailNumber = `[[[[0,7],4],[15,[0,13]]],[1,1]]`;
    let parsed = parsePairOrNumber(JSON.parse(snailNumber));
    let [splitted, result] = splitPairOrNumber(parsed);
    expect(printPairOrNumber(result)).toBe(`[[[[0,7],4],[[7,8],[0,13]]],[1,1]]`);

    snailNumber = `[[[[0,7],4],[[7,8],[0,13]]],[1,1]]`;
    parsed = parsePairOrNumber(JSON.parse(snailNumber));
    [splitted, result] = splitPairOrNumber(parsed);
    expect(printPairOrNumber(result)).toBe(`[[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]`);
  });

  it('should reduce a number properly', () => {
    let snailNumber = `[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]`;
    let parsed = parsePairOrNumber(JSON.parse(snailNumber));
    let result = reduceSnailNumber(parsed);
    expect(printPairOrNumber(result)).toBe(`[[[[0,7],4],[[7,8],[6,0]]],[8,1]]`);
  });

  it('should add snail numbers', () => {
    const input = `[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]
[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]
[7,[5,[[3,8],[1,4]]]]
[[2,[2,2]],[8,[8,1]]]
[2,9]
[1,[[[9,3],9],[[9,0],[0,7]]]]
[[[5,[7,4]],7],1]
[[[[4,2],2],6],[8,7]]`;
    let result = addSnailNumbers(input);
    expect(printPairOrNumber(result)).toBe(`[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]`);
  });

  it('should calculate the magnitude', () => {
    let input = `[[1,2],[[3,4],5]]`;
    expect(magnitude(parsePairOrNumber(JSON.parse(input)))).toBe(143);

    input = `[[[[0,7],4],[[7,8],[6,0]]],[8,1]]`;
    expect(magnitude(parsePairOrNumber(JSON.parse(input)))).toBe(1384);

    input = `[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]`;
    expect(magnitude(parsePairOrNumber(JSON.parse(input)))).toBe(3488);
  });

  it('should work on a homework problem', () => {
    const input = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`;

    let sum = addSnailNumbers(input);
    expect(magnitude(sum)).toBe(4140);
  });
});
