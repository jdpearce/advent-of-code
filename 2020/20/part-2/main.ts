import * as fs from 'fs';
import * as path from 'path';
import { buildImage, calculateRoughness, getCorrectOrientation } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const output = buildImage(input);
const { image, monsters } = getCorrectOrientation(output.split('\n'));

console.log(`The roughness of the monster-infested area is ${calculateRoughness(image, monsters)}`);
