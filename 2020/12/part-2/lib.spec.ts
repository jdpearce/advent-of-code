import { calculateManhattanDistance, Position, processInstruction } from './lib';

describe('2020-12-12.2', () => {
  it('should perform actions properly', () => {
    const start: Position = { ship: { x: 0, y: 0 }, waypoint: { x: 10, y: 1 } };

    let actual = processInstruction('F10', start);
    expect(actual).toEqual({ ship: { x: 100, y: 10 }, waypoint: { x: 10, y: 1 } });

    actual = processInstruction('N3', actual);
    expect(actual).toEqual({ ship: { x: 100, y: 10 }, waypoint: { x: 10, y: 4 } });

    actual = processInstruction('F7', actual);
    expect(actual).toEqual({ ship: { x: 170, y: 38 }, waypoint: { x: 10, y: 4 } });

    actual = processInstruction('R90', actual);
    expect(actual).toEqual({ ship: { x: 170, y: 38 }, waypoint: { x: 4, y: -10 } });

    actual = processInstruction('F11', actual);
    expect(actual).toEqual({ ship: { x: 214, y: -72 }, waypoint: { x: 4, y: -10 } });

    expect(calculateManhattanDistance(actual)).toBe(286);
  });
});
