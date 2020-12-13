export function getDepartureTimeAndId(input: string): { time: number; id: number } {
  const [earliest, buses] = input.split('\n').filter((x) => x);
  const busIds = buses
    .split(',')
    .filter((bus) => bus !== 'x')
    .map(Number);

  console.log(earliest, busIds);

  const map = new Map<number, number>();
  const max = Number(earliest) * 10;

  for (let i = 0; i < busIds.length; i++) {
    for (let j = busIds[i]; j < max; j += busIds[i]) {
      map.set(j, busIds[i]);
    }
  }

  let i = Number(earliest);
  for (; i < max; i++) {
    if (map.has(i)) {
      break;
    }
  }

  // console.log(map);

  return {
    time: i - Number(earliest),
    id: map.get(i),
  };
}
