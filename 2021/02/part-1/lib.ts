export function calculateFinalPosition(input: string): { horizontal: number; depth: number } {
  return input.split('\n').reduce(
    (position, instruction) => {
      const [direction, valueStr] = instruction.split(' ');
      const value = Number(valueStr);
      switch (direction) {
        case 'forward':
          position.horizontal += value;
          break;
        case 'down':
          position.depth += value;
          break;
        case 'up':
          position.depth -= value;
          break;
      }
      return position;
    },
    { horizontal: 0, depth: 0 }
  );
}
