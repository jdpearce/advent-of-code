import { Dir, getDirSize, sumDirsWithSizeAtMost } from './lib';

describe('2022-12-07.1', () => {
  const input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

  it('should find all the directories with size at most X', () => {
    expect(sumDirsWithSizeAtMost(input, 100000)).toBe(95437);
  });

  it('should get the size of a directory', () => {
    const dirs = new Map<string, Dir>();
    dirs.set('/', { name: '/', files: ['14848514 b.txt', '8504156 c.dat'], dirs: ['a'] });
    dirs.set('a', { name: 'a', files: ['29116 f', '2557 g', '62596 h.lst'], dirs: [] });
    expect(getDirSize(dirs, '/')).toBe(14848514 + 8504156 + 29116 + 2557 + 62596);
  });
});
