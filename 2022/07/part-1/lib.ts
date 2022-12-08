export interface Dir {
  name: string;
  size?: number;
  files: string[];
  dirs: string[];
}

export function buildDirMap(input: string): Map<string, Dir> {
  const dirs = new Map<string, Dir>();
  let currentDirName: string[] = ['/'];
  let readingDir = false;
  dirs.set(currentDirName[currentDirName.length - 1], { name: '/', files: [], dirs: [] } as Dir);
  input
    .split('\n')
    .filter((x) => x)
    .forEach((line) => {
      if (readingDir && line.startsWith('$')) {
        readingDir = false;
      }

      if (line.startsWith('$ cd ')) {
        const command = line.substring(5);
        if (command === '..') {
          currentDirName.pop();
        } else if (command === '/') {
          currentDirName = ['/'];
        } else {
          currentDirName.push(command);
        }
        const name = currentDirName.join('/');
        // console.log(`current directory is ${name}`);
        if (!dirs.has(name)) {
          dirs.set(name, { name, files: [], dirs: [] } as Dir);
        }
        return;
      }

      if (line.startsWith('$ ls')) {
        readingDir = true;
        return;
      }

      const name = currentDirName.join('/');
      const dir = dirs.get(name);

      if (line.startsWith('dir')) {
        dir.dirs.push(name + '/' + line.split(' ')[1]);
        return;
      }

      // console.log(`Processing line: ${line}`);
      dir.files.push(line);
    });

  return dirs;
}

export function sumDirsWithSizeAtMost(input: string, atMostSize: number): number {
  const dirs = buildDirMap(input);

  let total = 0;
  for (const name of dirs.keys()) {
    const size = getDirSize(dirs, name);
    if (size <= atMostSize) {
      total += size;
    }
  }

  return total;
}

export function getDirSize(dirs: Map<string, Dir>, dirName: string): number {
  const dir = dirs.get(dirName);
  if (dir.size !== undefined) {
    return dir.size;
  }

  let size = 0;
  for (const file of dir.files) {
    size += Number(file.split(' ')[0]);
  }

  for (const name of dir.dirs) {
    size += getDirSize(dirs, name);
  }

  dir.size = size;
  return size;
}
