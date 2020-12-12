import { calculateManhattanDistance, Position, processInstruction } from './lib';

describe('2020-12-12.1', () => {
  const input = `F10
N3
F7
R90
F11`;

  it('should perform actions properly', () => {
    const start: Position = { x: 0, y: 0, facing: 'E' };

    let actual = processInstruction('F10', start);
    expect(actual).toEqual({ x: 10, y: 0, facing: 'E' });

    actual = processInstruction('N3', actual);
    expect(actual).toEqual({ x: 10, y: 3, facing: 'E' });

    actual = processInstruction('F7', actual);
    expect(actual).toEqual({ x: 17, y: 3, facing: 'E' });

    actual = processInstruction('R90', actual);
    expect(actual).toEqual({ x: 17, y: 3, facing: 'S' });

    actual = processInstruction('F11', actual);
    expect(actual).toEqual({ x: 17, y: -8, facing: 'S' });

    expect(calculateManhattanDistance(actual)).toBe(25);
  });
});
