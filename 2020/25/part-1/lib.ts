export function findLoopSize(key: number, subject: number): number {
  let i = 0;
  let value = 1;
  while (value !== key) {
    value *= subject;
    value = value % 20201227;
    i++;
  }
  return i;
}

export function transform(subject: number, loopsize: number): number {
  let value = 1;
  for (let i = 0; i < loopsize; i++) {
    value *= subject;
    value = value % 20201227;
  }
  return value;
}
