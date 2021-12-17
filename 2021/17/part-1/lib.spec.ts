import { doesProbeLandInTargetArea, findBestTrajectoryHighpoint, parseTargetArea } from './lib';

describe('2021-12-17.1', () => {
  const input = `target area: x=20..30, y=-10..-5`;

  it('should parse input to numbers', () => {
    expect(parseTargetArea(input)).toEqual([
      [20, 30],
      [-10, -5],
    ]);
  });

  it('should determine landing area correctly', () => {
    const target = parseTargetArea(input);
    expect(doesProbeLandInTargetArea([7, 2], target)).toEqual([true, 3]);
    expect(doesProbeLandInTargetArea([6, 9], target)).toEqual([true, 45]);
    expect(doesProbeLandInTargetArea([17, -4], target)).toEqual([false, 0]);
  });

  it('should find the best trajectory', () => {
    expect(findBestTrajectoryHighpoint(input)).toBe(45);
  });
});
