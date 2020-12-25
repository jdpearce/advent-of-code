import { findLoopSize, transform } from './lib';

describe('2020-12-25.1', () => {
  const card = 5764801;
  const door = 17807724;

  it('find the card loop size', () => {
    expect(findLoopSize(card, 7)).toBe(8);
    expect(findLoopSize(door, 7)).toBe(11);
  });

  it('should find the encryption key', () => {
    let key = transform(card, 11);
    expect(key).toBe(14897079);

    key = transform(door, 8);
    expect(key).toBe(14897079);
  });
});
