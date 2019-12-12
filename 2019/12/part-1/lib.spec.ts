import {
  calcKineticEnergy,
  calcPotentialEnergy,
  calcTotalEnergy,
  generatePairs,
  Moon,
  tick
} from './lib';

describe('mooooooons', () => {
  let moonList: Moon[];

  beforeEach(() => {
    moonList = [
      {
        position: [-1, 0, 2],
        velocity: [0, 0, 0]
      },
      {
        position: [2, -10, -7],
        velocity: [0, 0, 0]
      },
      {
        position: [4, -8, 8],
        velocity: [0, 0, 0]
      },
      {
        position: [3, 5, -1],
        velocity: [0, 0, 0]
      }
    ];
  });

  test('after one tick', () => {
    const pairs = generatePairs(moonList);
    tick(moonList, pairs);

    expect(moonList[0].position).toEqual([2, -1, 1]);
    expect(moonList[1].position).toEqual([3, -7, -4]);
    expect(moonList[2].position).toEqual([1, -7, 5]);
    expect(moonList[3].position).toEqual([2, 2, 0]);
  });

  test('energy', () => {
    const moon: Moon = {
      position: [2, 1, -3],
      velocity: [-3, -2, 1]
    };

    expect(calcPotentialEnergy(moon)).toBe(6);
    expect(calcKineticEnergy(moon)).toBe(6);
    expect(calcTotalEnergy([moon])).toBe(36);
  });
});
