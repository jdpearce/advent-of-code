import { hasValidPassword } from './lib';

describe('2020-12-02.1', () => {
  test('should find valid passwords', () => {
    let input = '1-3 a: abcde';
    expect(hasValidPassword(input)).toBe(true);

    input = '1-3 b: cdefg';
    expect(hasValidPassword(input)).toBe(false);

    input = '9-10 l: lllllllllk';
    expect(hasValidPassword(input)).toBe(true);

    input = '2-3 k: kakaka';
    expect(hasValidPassword(input)).toBe(true);
  });
});
