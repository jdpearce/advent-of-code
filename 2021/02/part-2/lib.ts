export function calculateFinalPositionWithAim(input: string): {
  horizontal: number;
  depth: number;
} {
  return input.split('\n').reduce(
    (position, instruction) => {
      const [direction, valueStr] = instruction.split(' ');
      const value = Number(valueStr);
      switch (direction) {
        case 'forward':
          position.horizontal += value;
          position.depth += position.aim * value;
          break;
        case 'down':
          position.aim += value;
          break;
        case 'up':
          position.aim -= value;
          break;
      }
      return position;
    },
    { horizontal: 0, depth: 0, aim: 0 }
  );
}
