export interface BingoBoard {
  lines: Set<number>[];
  winningNumber?: number;
}

export function createBingoBoards(input: string): BingoBoard[] {
  const bingoBoards: BingoBoard[] = [];

  const lines = input.split('\n');
  for (let i = 2; i < lines.length; i++) {
    if (lines[i] === '') {
      continue;
    }

    const bingoBoard: BingoBoard = { lines: [] };
    const columns: Set<number>[] = [
      new Set<number>(),
      new Set<number>(),
      new Set<number>(),
      new Set<number>(),
      new Set<number>(),
    ];
    for (let j = i; j < i + 5; j++) {
      const nums = lines[j]
        .split(' ')
        .filter((x) => !!x)
        .map(Number);
      if (nums.length != 5) {
        throw new Error('Did not expect weird row length');
      }
      bingoBoard.lines.push(new Set<number>(nums));
      nums.forEach((num, index) => columns[index].add(num));
    }
    bingoBoard.lines.push(...columns);
    bingoBoards.push(bingoBoard);

    i += 5;
  }

  return bingoBoards;
}

export function findWinningBoard(nums: number[], boards: BingoBoard[]): BingoBoard | null {
  for (const num of nums) {
    for (const board of boards) {
      for (const line of board.lines) {
        line.delete(num);
        if (line.size === 0) {
          board.winningNumber = num;
          return board;
        }
      }
    }
  }

  throw new Error('No winning board found');
}

export function scoreBoard(board: BingoBoard): number {
  let sum = 0;
  for (let i = 0; i < 5; i++) {
    sum += [...board.lines[i].values()].reduce((acc, curr) => (acc += curr), 0);
  }

  return sum * board.winningNumber;
}
