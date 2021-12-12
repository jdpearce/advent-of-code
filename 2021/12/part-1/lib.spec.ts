import { findAllPaths, parseIntoGraph } from './lib';

describe('2021-12-12.1', () => {
  const input = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

  it('should parse into graph', () => {
    const start = parseIntoGraph(input);
    expect(start.connected.length).toBe(2);
  });

  it('should count the number of paths correctly', () => {
    const start = parseIntoGraph(input);
    const paths = findAllPaths(start);
    expect(paths.length).toBe(10);
  });

  it('should work with a bigger example', () => {
    const input2 = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`;

    const start = parseIntoGraph(input2);
    const paths = findAllPaths(start);
    expect(paths.length).toBe(226);
  });
});
