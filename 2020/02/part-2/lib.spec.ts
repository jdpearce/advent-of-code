import { hasValidPassword } from './lib';

describe('2020-12-02.2', () => {
  test('should find valid passwords', () => {
    let input = '1-3 a: abcde';
    expect(hasValidPassword(input)).toBe(true);

    input = '1-3 b: cdefg';
    expect(hasValidPassword(input)).toBe(false);

    input = '1-3 b: cdbfg';
    expect(hasValidPassword(input)).toBe(true);

    input = '2-9 c: ccccccccc';
    expect(hasValidPassword(input)).toBe(false);
  });
});
