export function hasValidPassword(line: string): boolean {
  const [policy, password] = line.split(': ');
  const [limits, char] = policy.split(' ');
  const [lower, upper] = limits.split('-').map(Number);
  const numchars = password.split(char).length - 1;
  return numchars >= lower && numchars <= upper;
}
