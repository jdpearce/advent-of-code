import { findSizeOfSmallestDirToDelete } from './lib';

describe('2022-12-07.2', () => {
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

  it('calculate the size of the smallest dir to free enough space', () => {
    expect(findSizeOfSmallestDirToDelete(input)).toBe(24933642);
  });
});
