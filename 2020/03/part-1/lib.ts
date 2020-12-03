export function countTrajectoryTrees(input: string[], vector: number[]): number {
  const [x, y] = vector;

  let [currentX, currentY] = [0, 0];
  let trees = 0;
  let width = input[0].length;
  for (; currentY < input.length; currentY += y) {
    if (input[currentY][currentX % width] === '#') {
      trees++;
    }
    currentX += x;
  }
  return trees;
}
