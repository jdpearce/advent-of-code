import { generatePairs, Moon, tick } from '../part-1/lib';

const moonList: Moon[] = [
  {
    position: [14, 2, 8],
    velocity: [0, 0, 0]
  },
  {
    position: [7, 4, 10],
    velocity: [0, 0, 0]
  },
  {
    position: [1, 17, 16],
    velocity: [0, 0, 0]
  },
  {
    position: [-4, -1, 1],
    velocity: [0, 0, 0]
  }
];

const pairs = generatePairs(moonList);

// Axes are independent, find cycle length of each axis repeat and then find
// lowest common multiple - https://en.wikipedia.org/wiki/Least_common_multiple

let xticks: number, yticks: number, zticks: number;
let xset = new Set<string>();
let yset = new Set<string>();
let zset = new Set<string>();
let ticks = 0;
while (!xticks || !yticks || !zticks) {
  if (!xticks) {
    const xstr = moonList.reduce(
      (acc, curr) => acc + `|${curr.position[0]}>${curr.velocity[0]}`,
      ''
    );
    if (xset.has(xstr)) {
      xticks = ticks;
    }
    xset.add(xstr);
  }
  if (!yticks) {
    const ystr = moonList.reduce(
      (acc, curr) => acc + `|${curr.position[1]}>${curr.velocity[1]}`,
      ''
    );
    if (yset.has(ystr)) {
      yticks = ticks;
    }
    yset.add(ystr);
  }
  if (!zticks) {
    const zstr = moonList.reduce(
      (acc, curr) => acc + `|${curr.position[2]}>${curr.velocity[2]}`,
      ''
    );
    if (zset.has(zstr)) {
      zticks = ticks;
    }
    zset.add(zstr);
  }
  tick(moonList, pairs);
  ticks++;
}

/**
 * https://en.wikipedia.org/wiki/Least_common_multiple
 *
 * @param x
 * @param y
 */
function lcm(x: number, y: number): number {
  return (x / gcd(x, y)) * y;
}

/**
 * https://en.wikipedia.org/wiki/Greatest_common_divisor
 *
 * This is a recursive function, using Euclid's algorithm
 *
 * @param x
 * @param y
 */
function gcd(x: number, y: number): number {
  if (y === 0) {
    return x;
  }
  return gcd(y, x % y);
}

console.log(
  `Ticks before reaching an earlier state -> x:${xticks}, y:${yticks}, z:${zticks}`
);

console.log(`LCM is ${lcm(lcm(xticks, yticks), zticks)}`);
