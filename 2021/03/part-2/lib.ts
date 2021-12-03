export function calculateLifeSupportRating(input: string): number {
  const lines = input.split('\n');
  const length = lines[0].length;

  let o2rating = [...lines];
  for (let i = 0; i < length && o2rating.length > 1; i++) {
    const [zeroes, ones] = getBuckets(o2rating, i);
    o2rating = zeroes.length > ones.length ? [...zeroes] : [...ones];
  }

  let co2rating = [...lines];
  for (let i = 0; i < length && co2rating.length > 1; i++) {
    const [zeroes, ones] = getBuckets(co2rating, i);
    co2rating = ones.length < zeroes.length ? [...ones] : [...zeroes];
  }

  return parseInt(o2rating[0], 2) * parseInt(co2rating[0], 2);
}

function getBuckets(input: string[], bitPosition: number): [string[], string[]] {
  return input.reduce(
    (acc, curr) => {
      acc[curr[bitPosition]].push(curr);
      return acc;
    },
    [[], []]
  );
}
