import * as fs from 'fs';
import * as path from 'path';
import { layerToLines, mergeLayers, pixelsToLayers } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const pixels = input
  .split('\n')[0]
  .split('')
  .map(Number);

const finalImage = layerToLines(mergeLayers(pixelsToLayers(pixels, 25, 6)), 25);

for (let line of finalImage) {
  console.log(line.join(''));
}
