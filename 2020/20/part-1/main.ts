import * as fs from 'fs';
import * as path from 'path';
import { parseTiles, populateMatches } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const tiles = parseTiles(input);

console.log(`There are ${tiles.length} tiles`);

populateMatches(tiles);
const corners = tiles.filter((x) => x.matches.length === 2);

console.log(
  `With luck there are ${corners.length} (4?) corners with the product ${corners.reduce(
    (acc, curr) => (acc *= curr.id),
    1
  )}`
);
