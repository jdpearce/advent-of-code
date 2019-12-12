import { calcTotalEnergy, generatePairs, Moon, tick } from './lib';

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

for (let i = 0; i < 1000; i++) {
  tick(moonList, pairs);
}

const energy = calcTotalEnergy(moonList);

console.log(`Total energy in the system after 1000 ticks is ${energy}`);
