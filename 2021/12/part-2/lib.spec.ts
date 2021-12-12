import { parseIntoGraph } from '../part-1/lib';
import { findAllPaths } from './lib';

describe('2021-12-12.2', () => {
  const input = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

  it('should count the number of paths correctly', () => {
    const start = parseIntoGraph(input);
    const paths = findAllPaths(start);

    expect(paths.length).toEqual(36);
  });
});
