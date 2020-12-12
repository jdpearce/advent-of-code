import { calculateManhattanDistance, Position, processInstruction } from './lib';

describe('2020-12-12.1', () => {
  it('should perform actions properly', () => {
    const start: Position = { x: 0, y: 0, facing: { x: 1, y: 0 } };

    let actual = processInstruction('F10', start);
    expect(actual).toEqual({ x: 10, y: 0, facing: { x: 1, y: 0 } });

    actual = processInstruction('N3', actual);
    expect(actual).toEqual({ x: 10, y: 3, facing: { x: 1, y: 0 } });

    actual = processInstruction('F7', actual);
    expect(actual).toEqual({ x: 17, y: 3, facing: { x: 1, y: 0 } });

    actual = processInstruction('R90', actual);
    expect(actual).toEqual({ x: 17, y: 3, facing: { x: 0, y: -1 } });

    actual = processInstruction('F11', actual);
    expect(actual).toEqual({ x: 17, y: -8, facing: { x: 0, y: -1 } });

    expect(calculateManhattanDistance(actual)).toBe(25);
  });
});
