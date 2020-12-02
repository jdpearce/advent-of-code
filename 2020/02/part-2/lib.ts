export function hasValidPassword(line: string): boolean {
  const [policy, password] = line.split(': ');
  const [limits, char] = policy.split(' ');
  const [first, second] = limits.split('-').map(Number);
  return (
    (password[first - 1] === char && password[second - 1] !== char) ||
    (password[first - 1] !== char && password[second - 1] === char)
  );
}
