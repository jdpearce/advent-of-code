import { BingoBoard } from '../part-1/lib';

export function findLosingBoard(nums: number[], boards: BingoBoard[]): BingoBoard | null {
  for (const num of nums) {
    const losingBoards = boards.filter((board) => !board.winningNumber);
    for (const board of losingBoards) {
      for (const line of board.lines) {
        line.delete(num);
        if (line.size === 0) {
          board.winningNumber = num;
        }
      }
    }
    if (losingBoards.length === 1 && losingBoards[0].winningNumber) {
      return losingBoards[0];
    }
  }

  throw new Error('No losing board found. HOW?');
}
