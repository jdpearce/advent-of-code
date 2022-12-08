import { buildDirMap, getDirSize } from '../part-1/lib';

export function findSizeOfSmallestDirToDelete(input: string): number {
  const dirs = buildDirMap(input);
  const diskTotal = 70000000;
  const diskRequired = 30000000;
  const diskUsed = getDirSize(dirs, '/');

  const diskFree = diskTotal - diskUsed;
  const toFree = diskRequired - diskFree;

  const dirSizes: number[] = [];
  for (const name of dirs.keys()) {
    const size = getDirSize(dirs, name);
    if (size > toFree) {
      dirSizes.push(size);
    }
  }

  dirSizes.sort((a, b) => a - b);
  return dirSizes[0];
}
