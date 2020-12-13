/**
 * Iterate through the bus numbers and calculate the time after start time
 * that it next departs. We can do this by calculating  busId - busId % startTime
 * The mod operation gives us the remainder, we can then subtract this to find the
 * number of minutes after startTime that is the next multiple of busId.
 * @param input
 */
export function getDepartureTimeAndId(input: string): { time: number; id: number } {
  const lines = input.split('\n').filter((x) => x);
  const startTime = Number(lines[0]);
  const busIds = lines[1]
    .split(',')
    .filter((bus) => bus !== 'x')
    .map(Number);

  let time = startTime;
  let id = -1;
  for (const busId of busIds) {
    const waitingTime = busId - (startTime % busId);
    if (waitingTime < time) {
      time = waitingTime;
      id = busId;
    }
  }

  return {
    time,
    id,
  };
}
