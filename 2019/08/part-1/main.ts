import * as fs from 'fs';
import * as path from 'path';
import { parseLayers } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const pixels = input
  .split('\n')[0]
  .split('')
  .map(Number);

const layers = parseLayers(pixels, 25, 6);

let fewestZeros = layers[0];
for (let i = 1; i < layers.length; i++) {
  if (layers[i][0] < fewestZeros[0]) {
    fewestZeros = layers[i];
  }
}

console.log(
  `Number of 1 digits * number of 2 digits on layer with fewest zeros === ${fewestZeros[1] *
    fewestZeros[2]}`
);
